import { useState, useEffect } from 'react';
import { supabase, DatabaseProperty, DatabaseAgent, isSupabaseConfigured } from '../lib/supabase';
import { Property } from '../types';
import { staticProperties } from '../data/properties';

export const useProperties = (shouldRefetch = false) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    console.log('🔄 useProperties: Starting fetch...');
    try {
      setLoading(true);
      setError(null);
      
      // If Supabase is not configured, use static data
      if (!isSupabaseConfigured()) {
        console.log('🔧 useProperties: Supabase not configured, using static data');
        setProperties(staticProperties);
        setLoading(false);
        return;
      }

      console.log('🔄 useProperties: Fetching from Supabase...');
      
      // Attempt to fetch from Supabase first
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select(`
          *,
          agents (*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (propertiesError) {
        console.warn('⚠️ useProperties: Supabase error:', propertiesError.message);
        
        // If tables don't exist or JWT expired, fall back to static data
        if (propertiesError.code === 'PGRST116' || 
            propertiesError.code === 'PGRST303' ||
            propertiesError.message?.includes('table') ||
            propertiesError.message?.includes('schema cache')) {
          console.log('📋 useProperties: Using static data as fallback');
          setProperties(staticProperties);
          setLoading(false);
          return;
        }
        throw propertiesError;
      }

      // If no data returned, try to initialize with static data
      if (!propertiesData || propertiesData.length === 0) {
        console.log('📝 useProperties: No properties found, initializing...');
        await initializePropertiesData();
        
        // Try fetching again after initialization
        const { data: newData } = await supabase
          .from('properties')
          .select(`
            *,
            agents (*)
          `)
          .eq('is_active', true)
          .order('created_at', { ascending: false });
        
        if (newData && newData.length > 0) {
          const transformedProperties = transformPropertiesData(newData);
          setProperties(transformedProperties);
          console.log('✅ useProperties: Initialized and loaded from database:', transformedProperties.length);
          setLoading(false);
          return;
        }
        
        // If initialization failed, use static data
        console.log('📋 useProperties: Initialization failed, using static data');
        setProperties(staticProperties);
        setLoading(false);
        return;
      }
      // Transform database properties to frontend format
      const transformedProperties = transformPropertiesData(propertiesData);
      setProperties(transformedProperties);
      console.log(`✅ useProperties: Loaded ${transformedProperties.length} properties from database`);
      
    } catch (err) {
      console.warn('❌ useProperties: Error fetching, falling back to static data:', err);
      setProperties(staticProperties);
      setError(null); // Don't show error to user, fallback is normal
    } finally {
      setLoading(false);
    }
  };

  // Helper function to transform database data
  const transformPropertiesData = (data: any[]): Property[] => {
    return data.map((prop: any) => ({
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
      }));
  };

  // Helper function to initialize properties data
  const initializePropertiesData = async () => {
    if (!isSupabaseConfigured()) return false;
    
    try {
      // First, ensure agents exist
      const { data: agents } = await supabase
        .from('agents')
        .select('id, name')
        .eq('is_active', true);
      
      if (!agents || agents.length === 0) {
        console.warn('No agents found, cannot initialize properties');
        return false;
      }
      
      // Map static properties to use real agent IDs
      const propertiesWithRealAgents = staticProperties.map(prop => ({
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
        images: prop.images,
        description: prop.description,
        features: prop.features,
        agent_id: agents[0]?.id || prop.agent.id, // Use first available agent
        is_active: true
      }));
      
      const { error: insertError } = await supabase
        .from('properties')
        .upsert(propertiesWithRealAgents, { 
          onConflict: 'id',
          ignoreDuplicates: true 
        });
      
      if (insertError) {
        console.warn('Could not initialize properties:', insertError);
        return false;
      }
      
      console.log('✅ Properties initialized successfully');
      return true;
    } catch (err) {
      console.warn('Error initializing properties:', err);
      return false;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [shouldRefetch]);

  // Debug: Log current state
  useEffect(() => {
    console.log('🎯 useProperties state:', { 
      propertiesCount: properties.length, 
      loading, 
      error,
      firstPropertyTitle: properties[0]?.title 
    });
  }, [properties, loading, error]);
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
