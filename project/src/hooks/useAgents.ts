import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Agent } from '../types';
import { teamMembers } from '../data/team';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setAgents(teamMembers);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('agents')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        if (fetchError.code === 'PGRST116' || fetchError.message?.includes('table')) {
          console.warn('Agents table not found, using static data');
          setAgents(teamMembers);
          return;
        }
        throw fetchError;
      }

      setAgents(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.warn('Error fetching agents, falling back to static data:', err);
      setAgents(teamMembers);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []); // Sin dependencias ya que no usa props ni state

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
  }, [fetchAgents]); // Ahora incluye la dependencia

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent,
  };
};
