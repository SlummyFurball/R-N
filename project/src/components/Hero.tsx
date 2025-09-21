import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { scrollToElement, createWhatsAppUrl } from '../utils/formatters';

const Hero: React.FC = () => {
  const handleViewPropertiesClick = () => {
    scrollToElement('properties');
  };

  const handleSolicitarTasacionClick = () => {
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', 'Hola, me interesa solicitar una tasación gratuita de mi propiedad');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="hero" className="bg-gradient-to-br from-white to-[#f8f8f6] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tu Hogar{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Perfecto
            </span>{' '}
            Te Espera
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Con más de una década de experiencia en el mercado inmobiliario dominicano, 
            te ayudamos a encontrar la propiedad de tus sueños o maximizar el valor de tu inversión.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleViewPropertiesClick}
              className="bg-[#002430] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#003440] transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <span>Ver Propiedades</span>
              <ArrowRight size={20} />
            </button>
            
            <button
              onClick={handleSolicitarTasacionClick}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
            >
              <Calculator size={20} />
              <span>Solicitar Tasación</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#002430]">500+</div>
              <div className="text-gray-600">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#002430]">15+</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#002430]">98%</div>
              <div className="text-gray-600">Satisfacción Cliente</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#002430]">24/7</div>
              <div className="text-gray-600">Atención al Cliente</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;