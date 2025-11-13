import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Service } from '../types';
import { services as staticServices } from '../data/services';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setServices(staticServices);
        setError(null);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        if (fetchError.code === 'PGRST116' || fetchError.message?.includes('table')) {
          console.warn('Services table not found, using static data');
          setServices(staticServices);
          setError(null);
          setLoading(false);
          return;
        }
        throw fetchError;
      }

      setServices(data || []);
      setError(null);
    } catch (err) {
      console.warn('Error fetching services, falling back to static data:', err);
      setServices(staticServices);
      setError(null);
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
  }, []);

  return {
    services,
    loading,
    error,
    refetch: fetchServices,
    createService,
    updateService,
    deleteService,
  };
};
