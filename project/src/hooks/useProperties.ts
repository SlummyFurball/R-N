import { useState, useEffect } from 'react';
import { supabase, DatabaseProperty, DatabaseAgent } from '../lib/supabase';
import { Property } from '../types';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select(`
          *,
          agents (*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (propertiesError) throw propertiesError;

      // Transform database properties to frontend format
      const transformedProperties: Property[] = propertiesData?.map((prop: any) => ({
        id: prop.id,
        title: prop.title,
        price: prop.price,
        currency: prop.currency,
        type: prop.type,
        location: prop.location,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms,
        area: prop.area,
        parking: prop.parking,
        images: prop.images || [],
        description: prop.description,
        features: prop.features || [],
        agent: {
          id: prop.agents.id,
          name: prop.agents.name,
          role: prop.agents.role,
          phone: prop.agents.phone,
          email: prop.agents.email,
          photo: prop.agents.photo,
          experience: prop.agents.experience,
        },
      })) || [];

      setProperties(transformedProperties);
      setError(null);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err instanceof Error ? err.message : 'Error fetching properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
  };
};