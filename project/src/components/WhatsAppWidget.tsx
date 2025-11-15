import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/formatters';
import { useConfiguration } from '../hooks/useConfiguration';

const WhatsAppWidget: React.FC = () => {
  const { getConfigValue } = useConfiguration();
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = 'Hola, me interesa obtener más información sobre sus servicios inmobiliarios';
    const whatsappNumber = getConfigValue('whatsapp_number', '+18097985428');
    const whatsappUrl = createWhatsAppUrl(whatsappNumber, message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-lg p-4 max-w-xs animate-in slide-in-from-right duration-200">
          <div className="flex items-start space-x-3">
            <img
              src="https://scontent.fhex5-1.fna.fbcdn.net/v/t39.30808-1/358151758_9738737036167560_4402602201050439314_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeHl2ARj7aYOOXL6VS_pV7uwuR-QpJoWiLS5H5CkmhaItNwxMmJKVA3WOcSR06hILphAkB2VU3nPVGzbt0xdQDB6&_nc_ohc=2exfjWLNdP0Q7kNvwEZOFIB&_nc_oc=AdktnDgaHT8C1QkzXNV3jIWdqFZJREqrqea2Ooume_6lXJLF1vuumqj5JFZCyuYYUWA&_nc_zt=24&_nc_ht=scontent.fhex5-1.fna&_nc_gid=M15-e1x5qxA_PuhwKv84UQ&oh=00_AfhuaBPIXFtNmlaunJ_MTZYENGqOoP5jl1F5suOgbaPx4g&oe=691B50DD"
              alt="R&N Paradisse"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-800">
                  ¡Hola! 👋 Soy Ruben de R&N Paradisse. ¿En qué puedo ayudarte hoy?
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Respuesta en unos minutos
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
