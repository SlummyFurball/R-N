import React, { useState } from 'react';
import { Property } from '../types';
import { formatPrice, formatArea, createWhatsAppUrl } from '../utils/formatters';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle,
  Calendar,
  CheckCircle
} from 'lucide-react';
import AppointmentModal from './AppointmentModal';

interface PropertyModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en la propiedad: ${property.title} - ${formatPrice(property.price, property.currency)}`;
    const whatsappUrl = createWhatsAppUrl(property.agent.phone, message);
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${property.agent.phone}`, '_self');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Consulta sobre: ${property.title}`);
    const body = encodeURIComponent(`Hola ${property.agent.name},\n\nEstoy interesado en la propiedad: ${property.title}\nPrecio: ${formatPrice(property.price, property.currency)}\nUbicación: ${property.location}\n\nMe gustaría obtener más información.\n\nSaludos.`);
    window.open(`mailto:${property.agent.email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

          {/* Modal panel */}
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X size={24} />
            </button>

            {/* Image Gallery */}
            <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute bottom-2 left-2">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  property.type === 'venta' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {property.type === 'venta' ? 'En Venta' : 'En Alquiler'}
                </span>
              </div>

              {property.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Property Details */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h2>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-1" />
                  <span>{property.location}</span>
                </div>

                <div className="text-3xl font-bold text-[#002430] mb-6">
                  {formatPrice(property.price, property.currency)}
                  {property.type === 'alquiler' && <span className="text-lg font-normal">/mes</span>}
                </div>

                {/* Features */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bed size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Habitaciones</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bath size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Baños</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Square size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{formatArea(property.area)}</div>
                    <div className="text-sm text-gray-600">Área</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Car size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{property.parking}</div>
                    <div className="text-sm text-gray-600">Estacionamientos</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Features List */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Características</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Agent Info & Actions */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-semibold mb-4">Agente Asignado</h3>
                  
                  <div className="flex items-center mb-4">
                    <img
                      src={property.agent.photo}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{property.agent.name}</h4>
                      <p className="text-gray-600">{property.agent.role}</p>
                      <p className="text-sm text-gray-500">{property.agent.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button
                      onClick={handleCallClick}
                      className="w-full bg-[#002430] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#003440] transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Phone size={18} />
                      <span>Llamar</span>
                    </button>

                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <MessageCircle size={18} />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={handleEmailClick}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </button>

                    <button
                      onClick={() => setShowAppointmentModal(true)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-2 px-4 rounded-lg font-medium hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Calendar size={18} />
                      <span>Agendar Cita</span>
                    </button>
                  </div>

                  <div className="text-center text-sm text-gray-500">
                    <p>Respuesta garantizada en menos de 2 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        property={property}
        agent={property.agent}
      />
    </>
  );
};

export default PropertyModal;