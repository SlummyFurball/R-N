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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  phone: string;
  email: string;
  experience: string;
}