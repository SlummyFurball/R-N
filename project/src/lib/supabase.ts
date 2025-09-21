eimport { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
