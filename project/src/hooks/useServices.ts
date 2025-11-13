import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Service } from '../types';
import { services as staticServices } from '../data/services';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const initializeServicesData = async () => {
    if (!isSupabaseConfigured()) return false;
    
    try {
      console.log('🔄 Initializing services data in Supabase...');
      
      // Insertar servicios estáticos si no existen
      const { data: insertedServices, error: insertError } = await supabase
        .from('services')
        .upsert(
          staticServices.map(service => ({
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
            is_active: true
          })),
          { 
            onConflict: 'id',
            ignoreDuplicates: true // No sobrescribir si ya existe
          }
        )
        .select();

      if (insertError) {
        console.warn('Could not initialize services data:', insertError);
        return false;
      }

      console.log('✅ Services data initialized successfully:', insertedServices?.length);
      return true;
    } catch (err) {
      console.warn('Error initializing services data:', err);
      return false;
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setServices(staticServices);
        setError(null);
        setInitialized(true);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        if (fetchError.code === 'PGRST116' || 
            fetchError.message?.includes('table') ||
            fetchError.message?.includes('schema')) {
          console.warn('Services table not found, using static data');
          setServices(staticServices);
          setError(null);
          setInitialized(true);
          setLoading(false);
          return;
        }
        
        if (fetchError.code === 'PGRST303') {
          console.log('JWT expired, using static data (normal for public pages)');
          setServices(staticServices);
          setError(null);
          setInitialized(true);
          setLoading(false);
          return;
        }
        
        console.warn('Error fetching services:', fetchError);
      }

      // Si no hay datos, inicializar con datos estáticos
      if (!data || data.length === 0) {
        console.log('No services found in database, initializing...');
        const initSuccess = await initializeServicesData();
        
        if (initSuccess) {
          // Volver a intentar obtener los datos
          const { data: newData } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (newData && newData.length > 0) {
            setServices(newData.filter(service => service.is_active !== false));
            setInitialized(true);
            setLoading(false);
            return;
          }
        }
        
        // Si falla la inicialización, usar datos estáticos
        setServices(staticServices);
        setInitialized(true);
        setLoading(false);
        return;
      }

      // Filtrar solo servicios activos
      const activeServices = data.filter(service => service.is_active !== false);
      setServices(activeServices);
      setInitialized(true);
      setError(null);
    } catch (err) {
      console.warn('Error fetching services, falling back to static data:', err);
      setServices(staticServices);
      
      setError(null); // No mostrar error, es normal usar fallback
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: Omit<Service, 'id'>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('services')
      .insert([serviceData])
      .select()
      .single();

    if (error) throw error;
    
    await fetchServices();
    return data;
  };

  const updateService = async (id: string, serviceData: Partial<Service>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('services')
      .update(serviceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    await fetchServices();
    return data;
  };

  const deleteService = async (id: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { error } = await supabase
      .from('services')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    
    await fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, []); // Ejecutar solo una vez al montar el componente

  // Refetch cuando la página se enfoca (usuario regresa de otra pestaña)
  useEffect(() => {
    const handleFocus = () => {
      fetchServices();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return {
    services,
    loading,
    error,
    initialized,
    refetch: fetchServices,
    createService,
    updateService,
    deleteService,
  };
};
