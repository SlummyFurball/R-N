/*
  # Initial Schema for R&N Paradisse Real Estate

  1. New Tables
    - `agents`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `phone` (text)
      - `email` (text, unique)
      - `photo` (text)
      - `experience` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `price` (numeric)
      - `currency` (text)
      - `type` (text) - 'venta' or 'alquiler'
      - `location` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `area` (numeric)
      - `parking` (integer)
      - `images` (text array)
      - `description` (text)
      - `features` (text array)
      - `agent_id` (uuid, foreign key)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public read access to active properties
*/

-- Create agents table
CREATE TABLE IF NOT EXISTS agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  phone text NOT NULL,
  email text UNIQUE NOT NULL,
  photo text NOT NULL DEFAULT '',
  experience text NOT NULL DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  type text NOT NULL CHECK (type IN ('venta', 'alquiler')),
  location text NOT NULL,
  bedrooms integer NOT NULL DEFAULT 0,
  bathrooms integer NOT NULL DEFAULT 0,
  area numeric NOT NULL DEFAULT 0,
  parking integer NOT NULL DEFAULT 0,
  images text[] DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  features text[] DEFAULT '{}',
  agent_id uuid REFERENCES agents(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create policies for agents table
CREATE POLICY "Public can read active agents"
  ON agents
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage agents"
  ON agents
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for properties table
CREATE POLICY "Public can read active properties"
  ON properties
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage properties"
  ON properties
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial agents data
INSERT INTO agents (id, name, role, phone, email, photo, experience) VALUES
  ('1', 'Roberto Núñez', 'Director Ejecutivo', '+1-809-798-5428', 'roberto@rnparadisse.com', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400', '15+ años'),
  ('2', 'Natalia Pérez', 'Especialista en Ventas', '+1-809-798-5428', 'natalia@rnparadisse.com', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400', '8+ años'),
  ('3', 'Carlos Martínez', 'Especialista en Tasaciones', '+1-809-798-5428', 'carlos@rnparadisse.com', 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400', '12+ años'),
  ('4', 'María González', 'Especialista en Financiamiento', '+1-809-798-5428', 'maria@rnparadisse.com', 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400', '10+ años')
ON CONFLICT (id) DO NOTHING;