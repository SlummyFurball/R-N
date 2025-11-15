import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface SiteConfiguration {
  id: string;
  key: string;
  value: string;
  category: 'contact' | 'social' | 'general';
  description?: string;
}

export const useConfiguration = () => {
  const [configurations, setConfigurations] = useState<SiteConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfigurations = async () => {
    try {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured');
        setConfigurations([]);
        setError(null);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('site_configuration')
        .select('*')
        .order('category', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setConfigurations(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching configurations:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const updateConfiguration = async (key: string, value: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('site_configuration')
      .update({ value })
      .eq('key', key)
      .select()
      .single();

    if (error) throw error;

    await fetchConfigurations();
    return data;
  };

  const getConfigValue = (key: string, defaultValue: string = ''): string => {
    const config = configurations.find(c => c.key === key);
    return config?.value || defaultValue;
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  return {
    configurations,
    loading,
    error,
    refetch: fetchConfigurations,
    updateConfiguration,
    getConfigValue,
  };
};
