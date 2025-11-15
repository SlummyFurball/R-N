import React from 'react';
import { useServices } from '../hooks/useServices';
import {
  Calculator,
  FileText,
  Palmtree,
  Shield,
  Building,
  MapPin,
  DollarSign,
  Settings,
  PenTool,
  CreditCard
} from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

const iconMap = {
  Calculator: Calculator,
  FileText: FileText,
  Palmtree: Palmtree,
  Shield: Shield,
  Blueprint: Building,
  MapPin: MapPin,
  DollarSign: DollarSign,
  Settings: Settings,
  Drafting: PenTool,
  CreditCard: CreditCard,
};

const Services: React.FC = () => {
  const { services, loading } = useServices();

  if (loading) {
    return (
      <section className="py-20 bg-[#f4f4f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002430]"></div>
            <span className="ml-2 text-gray-600">Cargando servicios...</span>
          </div>
        </div>
      </section>
    );
  }
  const handleServiceClick = (serviceName: string) => {
    const message = `Hola, me interesa obtener más información sobre el servicio de ${serviceName}`;
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Servicios
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios inmobiliarios para satisfacer todas tus necesidades, 
            desde tasaciones hasta financiamiento y administración de propiedades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Calculator;
            
            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.title)}
                className="bg-[#f4f4f2] p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
              >
                <div className="text-[#002430] mb-4 group-hover:text-yellow-600 transition-colors duration-200">
                  <IconComponent size={32} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#002430] transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            ¿No encuentras el servicio que buscas? Contáctanos para una consulta personalizada.
          </p>
          <button
            onClick={() => handleServiceClick('consulta personalizada')}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            Consulta Personalizada
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
