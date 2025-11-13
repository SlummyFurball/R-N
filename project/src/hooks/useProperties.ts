import { useState, useEffect } from 'react';
import { supabase, DatabaseProperty, DatabaseAgent, isSupabaseConfigured } from '../lib/supabase';
import { Property } from '../types';
import { properties as staticProperties } from '../data/properties';

export const useProperties = (shouldRefetch = false) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // If Supabase is not configured, use static data
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setProperties(staticProperties);
        setError(null);
        setLoading(false);
        return;
      }

      // Only attempt Supabase request if properly configured
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select(`
          *,
          agents (*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (propertiesError) {
        // If tables don't exist, fall back to static data
        if (propertiesError.code === 'PGRST116' || 
            propertiesError.message?.includes('table') ||
            propertiesError.message?.includes('schema cache')) {
          console.warn('Supabase tables not found, using static data:', propertiesError.message);
          setProperties(staticProperties);
          setError(null);
          setLoading(false);
          return;
        }
        throw propertiesError;
      }

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
      console.warn('Error fetching properties from Supabase, falling back to static data:', err);
      // Always fall back to static data on any error
      setProperties(staticProperties);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [shouldRefetch]);

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    createProperty: async (propertyData: Omit<Property, 'id'>) => {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase no está configurado');
      }

      console.log('Creating property with data:', propertyData);

      const { data, error } = await supabase
        .from('properties')
        .insert([{
          title: propertyData.title,
          price: propertyData.price,
          currency: propertyData.currency,
          type: propertyData.type,
          location: propertyData.location,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          area: propertyData.area,
          parking: propertyData.parking,
          images: propertyData.images,
          description: propertyData.description,
          features: propertyData.features,
          agent_id: propertyData.agent.id,
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Property created successfully:', data);
      return data;
    },
    updateProperty: async (id: string, propertyData: Partial<Property>) => {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase no está configurado');
      }

      const updateData: any = {};
      if (propertyData.title) updateData.title = propertyData.title;
      if (propertyData.price) updateData.price = propertyData.price;
      if (propertyData.currency) updateData.currency = propertyData.currency;
      if (propertyData.type) updateData.type = propertyData.type;
      if (propertyData.location) updateData.location = propertyData.location;
      if (propertyData.bedrooms !== undefined) updateData.bedrooms = propertyData.bedrooms;
      if (propertyData.bathrooms !== undefined) updateData.bathrooms = propertyData.bathrooms;
      if (propertyData.area !== undefined) updateData.area = propertyData.area;
      if (propertyData.parking !== undefined) updateData.parking = propertyData.parking;
      if (propertyData.images) updateData.images = propertyData.images;
      if (propertyData.description) updateData.description = propertyData.description;
      if (propertyData.features) updateData.features = propertyData.features;
      if (propertyData.agent?.id) updateData.agent_id = propertyData.agent.id;

      const { data, error } = await supabase
        .from('properties')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      await fetchProperties();
      return data;
    },
    deleteProperty: async (id: string) => {
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase no está configurado');
      }

      const { error } = await supabase
        .from('properties')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
      await fetchProperties();
    }
  };
};
