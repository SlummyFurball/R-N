import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Función para crear cliente Supabase seguro
function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not configured. Using fallback.');
    
    // Cliente dummy que no falla
    return createClient(
      'https://dummy.supabase.co', 
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15IiwiaWF0IjoxNjAwMDAwMDAwLCJleHAiOjE5MTU0NTg0MDB9.dummy-key',
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            'x-dummy-mode': 'true'
          }
        }
      }
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Exportar cliente único
export const supabase = createSupabaseClient();

// Helper para verificar si Supabase está configurado
export const isSupabaseConfigured = (): boolean => {
  return !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
};

// Types for our database
export interface DatabaseProperty {
  id: string;
  title: string;
  price: number;
  currency: string;
  type: 'venta' | 'alquiler';
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  images: string[];
  description: string;
  features: string[];
  agent_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface DatabaseAgent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  photo: string;
  experience: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}
