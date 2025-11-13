import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Función para crear cliente Supabase seguro
function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log('🔧 Creating Supabase client:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlPreview: supabaseUrl?.substring(0, 30) + '...'
  });

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

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-client-info': 'rnparadisse-web'
      }
    }
  });
}

// Exportar cliente único
export const supabase = createSupabaseClient();

// Initialize Storage bucket if it doesn't exist
export const initializeStorage = async () => {
  try {
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, skipping storage initialization');
      return;
    }
    
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.warn('Could not list buckets:', listError);
      return;
    }
    
    const propertyImagesBucket = buckets?.find(bucket => bucket.name === 'property-images');
    
    if (!propertyImagesBucket) {
      console.warn('Property images bucket not found. Please create it manually in Supabase Dashboard:');
      console.warn('1. Go to Storage section in Supabase Dashboard');
      console.warn('2. Create a new bucket named "property-images"');
      console.warn('3. Make it public and allow image file types');
    }
  } catch (error) {
    console.warn('Storage initialization error:', error);
  }
};

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
