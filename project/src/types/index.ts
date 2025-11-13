export interface Property {
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
  agent: Agent;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  photo: string;
  experience: string;
  description?: string; // Campo opcional agregado
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'Mercado' | 'Consejos' | 'Inversión';
  date: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

// ❌ TeamMember eliminado - usa Agent en su lugar
