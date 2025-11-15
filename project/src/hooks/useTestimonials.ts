import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Testimonial } from '../types';
import { testimonials as staticTestimonials } from '../data/testimonials';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static data');
        setTestimonials(staticTestimonials);
        setError(null);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) {
        if (fetchError.code === 'PGRST116' || fetchError.message?.includes('table')) {
          console.warn('Testimonials table not found, using static data');
          setTestimonials(staticTestimonials);
          setError(null);
          setLoading(false);
          return;
        }
        throw fetchError;
      }

      const transformedTestimonials: Testimonial[] = (data || []).map(testimonial => ({
        id: testimonial.id,
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image
      }));

      setTestimonials(transformedTestimonials);
      setError(null);
    } catch (err) {
      console.warn('Error fetching testimonials, falling back to static data:', err);
      setTestimonials(staticTestimonials);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const createTestimonial = async (testimonialData: Omit<Testimonial, 'id'>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([testimonialData])
      .select()
      .single();

    if (error) throw error;

    await fetchTestimonials();
    return data;
  };

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await supabase
      .from('testimonials')
      .update(testimonialData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    await fetchTestimonials();
    return data;
  };

  const deleteTestimonial = async (id: string) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Supabase no está configurado');
    }

    const { error } = await supabase
      .from('testimonials')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;

    await fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      fetchTestimonials();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};
