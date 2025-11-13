import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Agent } from '../types';
import { teamMembers } from '../data/team';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setAgents(teamMembers);
        setError(null);
        setLoading(false);
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
          setError(null);
          setLoading(false);
          return;
        }
        throw fetchError;
      }

      setAgents(data || []);
      setError(null);
    } catch (err) {
      console.warn('Error fetching agents, falling back to static data:', err);
      setAgents(teamMembers);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agentData: Omit<Agent, 'id'>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('agents')
      .insert([agentData])
      .select()
      .single();

    if (error) throw error;
    
    await fetchAgents();
    return data;
  };

  const updateAgent = async (id: string, agentData: Partial<Agent>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('agents')
      .update(agentData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    await fetchAgents();
    return data;
  };

  const deleteAgent = async (id: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { error } = await supabase
      .from('agents')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    
    await fetchAgents();
  };

  useEffect(() => {
    fetchAgents();
  }, []);

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
