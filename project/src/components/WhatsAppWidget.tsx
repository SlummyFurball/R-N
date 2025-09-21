import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';

const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = 'Hola, me interesa obtener más información sobre sus servicios inmobiliarios';
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-in slide-in-from-right duration-200">
          <div className="flex items-start space-x-3">
            <img
              src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="R&N Paradisse"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-800">
                  ¡Hola! 👋 Soy Roberto de R&N Paradisse. ¿En qué puedo ayudarte hoy?
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Respuesta típica en unos minutos
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          
          <button
            onClick={handleWhatsAppClick}
            className="w-full mt-3 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <MessageCircle size={16} />
            <span>Iniciar Chat</span>
          </button>
        </div>
      )}

      {/* WhatsApp button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 animate-pulse"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default WhatsAppWidget;