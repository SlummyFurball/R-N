import { Property, Agent } from '../types';
import { useProperties } from '../hooks/useProperties';

const agents: Agent[] = [
  {
    id: '1',
    name: 'Roberto Núñez',
    role: 'Director Ejecutivo',
    phone: '+1-809-798-5428',
    email: 'roberto@rnparadisse.com',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '15+ años'
  },
  {
    id: '2',
    name: 'Natalia Pérez',
    role: 'Especialista en Ventas',
    phone: '+1-809-798-5428',
    email: 'natalia@rnparadisse.com',
    photo: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '8+ años'
  },
  {
    id: '3',
    name: 'Carlos Martínez',
    role: 'Especialista en Tasaciones',
    phone: '+1-809-798-5428',
    email: 'carlos@rnparadisse.com',
    photo: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '12+ años'
  },
  {
    id: '4',
    name: 'María González',
    role: 'Especialista en Financiamiento',
    phone: '+1-809-798-5428',
    email: 'maria@rnparadisse.com',
    photo: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400',
    experience: '10+ años'
  }
];

// Static properties for fallback when Supabase is not available
export const staticProperties: Property[] = [
  {
    id: '1',
    title: 'Villa Moderna en Punta Cana',
    price: 450000,
    currency: 'USD',
    type: 'venta',
    location: 'Punta Cana, La Altagracia',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    parking: 2,
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Espectacular villa moderna ubicada en una de las zonas más exclusivas de Punta Cana. Con acabados de lujo y vista al mar.',
    features: ['Vista al mar', 'Piscina privada', 'Jardín tropical', 'Sistema de seguridad', 'Cocina equipada'],
    agent: agents[0]
  },
  {
    id: '2',
    title: 'Apartamento Ejecutivo en Naco',
    price: 185000,
    currency: 'USD',
    type: 'venta',
    location: 'Naco, Santo Domingo',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: 1,
    images: [
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Moderno apartamento en torre exclusiva con amenidades completas. Ideal para ejecutivos y familias jóvenes.',
    features: ['Gimnasio', 'Piscina', 'Área social', 'Generador eléctrico', 'Seguridad 24/7'],
    agent: agents[1]
  },
  {
    id: '3',
    title: 'Casa Colonial en Zona Colonial',
    price: 2800,
    currency: 'USD',
    type: 'alquiler',
    location: 'Zona Colonial, Santo Domingo',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    parking: 1,
    images: [
      'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Hermosa casa colonial restaurada en el corazón histórico de Santo Domingo. Perfecta para turismo o residencia.',
    features: ['Arquitectura colonial', 'Patio interior', 'Techos altos', 'Ubicación histórica', 'Completamente amueblada'],
    agent: agents[2]
  },
  {
    id: '4',
    title: 'Penthouse de Lujo en Bella Vista',
    price: 650000,
    currency: 'USD',
    type: 'venta',
    location: 'Bella Vista, Santo Domingo',
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    parking: 3,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Exclusivo penthouse con terraza privada y vistas panorámicas de la ciudad. El epitome del lujo urbano.',
    features: ['Terraza privada', 'Vista 360°', 'Jacuzzi', 'Smart home', 'Ascensor privado'],
    agent: agents[0]
  },
  {
    id: '5',
    title: 'Casa Familiar en Los Cacicazgos',
    price: 4500,
    currency: 'USD',
    type: 'alquiler',
    location: 'Los Cacicazgos, Santo Domingo',
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    parking: 4,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Amplia casa familiar en exclusivo sector residencial. Ideal para familias que buscan comodidad y elegancia.',
    features: ['Piscina', 'Quincho', 'Jardín amplio', 'Cuarto de servicio', 'Área de juegos'],
    agent: agents[3]
  },
  {
    id: '6',
    title: 'Estudio Moderno en Gazcue',
    price: 95000,
    currency: 'USD',
    type: 'venta',
    location: 'Gazcue, Santo Domingo',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    parking: 1,
    images: [
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571459/pexels-photo-1571459.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Acogedor estudio perfecto para jóvenes profesionales o inversión de alquiler. Moderno y funcional.',
    features: ['Diseño moderno', 'Ubicación céntrica', 'Transporte público', 'Área comercial', 'Precio accesible'],
    agent: agents[1]
  }
];
