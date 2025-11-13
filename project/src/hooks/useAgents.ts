import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Agent } from '../types';
import { teamMembers } from '../data/team';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const initializeAgentsData = useCallback(async () => {
    if (!isSupabaseConfigured()) return false;
    
    try {
      console.log('🔄 Initializing agents data in Supabase...');
      
      // Insertar agentes estáticos si no existen
      const { data: insertedAgents, error: insertError } = await supabase
        .from('agents')
        .upsert(
          teamMembers.map(agent => ({
            id: agent.id,
            name: agent.name,
            role: agent.role,
            phone: agent.phone,
            email: agent.email,
            photo: agent.photo,
            experience: agent.experience,
            description: agent.description || 'Profesional especializado en servicios inmobiliarios',
            is_active: true
          })),
          { 
            onConflict: 'id',
            ignoreDuplicates: false // Actualizar si ya existe
          }
        )
        .select();

      if (insertError) {
        console.warn('Could not initialize agents data:', insertError);
        return false;
      }

      console.log('✅ Agents data initialized successfully:', insertedAgents?.length);
      return true;
    } catch (err) {
      console.warn('Error initializing agents data:', err);
      return false;
    }
  }, []);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setAgents(teamMembers);
        setInitialized(true);
        return;
      }

      // Intentar obtener datos de Supabase
      const { data, error: fetchError } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        // Si la tabla no existe o hay error de esquema
        if (fetchError.code === 'PGRST116' || 
            fetchError.message?.includes('table') ||
            fetchError.message?.includes('schema')) {
          console.warn('Agents table not found, using static data');
          setAgents(teamMembers);
          setInitialized(true);
          return;
        }
        
        // Si es error de JWT, usar datos estáticos
        if (fetchError.code === 'PGRST303') {
          console.log('JWT expired, using static data (normal for public pages)');
          setAgents(teamMembers);
          setInitialized(true);
          return;
        }
        
        console.warn('Error fetching agents:', fetchError);
      }

      // Si no hay datos, inicializar con datos estáticos
      if (!data || data.length === 0) {
        console.log('No agents found in database, initializing...');
        const initSuccess = await initializeAgentsData();
        
        if (initSuccess) {
          // Volver a intentar obtener los datos
          const { data: newData } = await supabase
            .from('agents')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (newData && newData.length > 0) {
            setAgents(newData.filter(agent => agent.is_active !== false));
            setInitialized(true);
            return;
          }
        }
        
        // Si falla la inicialización, usar datos estáticos
        setAgents(teamMembers);
        setInitialized(true);
        return;
      }

      // Filtrar solo agentes activos
      const activeAgents = data.filter(agent => agent.is_active !== false);
      setAgents(activeAgents);
      setInitialized(true);
      
    } catch (err) {
      console.warn('Error fetching agents, falling back to static data:', err);
      setAgents(teamMembers);
      setInitialized(true);
      setError(null); // No mostrar error, es normal usar fallback
    } finally {
      setLoading(false);
    }
  }, [initializeAgentsData]);

  const createAgent = useCallback(async (agentData: Omit<Agent, 'id'>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    try {
      const { data, error } = await supabase
        .from('agents')
        .insert([agentData])
        .select()
        .single();

      if (error) throw error;
      
      await fetchAgents();
      return data;
    } catch (err) {
      console.error('Error creating agent:', err);
      throw err;
    }
  }, [fetchAgents]);

  const updateAgent = useCallback(async (id: string, agentData: Partial<Agent>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    try {
      const { data, error } = await supabase
        .from('agents')
        .update(agentData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchAgents();
      return data;
    } catch (err) {
      console.error('Error updating agent:', err);
      throw err;
    }
  }, [fetchAgents]);

  const deleteAgent = useCallback(async (id: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    try {
      const { error } = await supabase
        .from('agents')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      
      await fetchAgents();
    } catch (err) {
      console.error('Error deleting agent:', err);
      throw err;
    }
  }, [fetchAgents]);

  useEffect(() => {
    fetchAgents();
  }, []); // Ejecutar solo una vez al montar el componente

  // Refetch cuando la página se enfoca (usuario regresa de otra pestaña)
  useEffect(() => {
    const handleFocus = () => {
      fetchAgents();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return {
    agents,
    loading,
    error,
    initialized,
    refetch: fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent,
  };
};
