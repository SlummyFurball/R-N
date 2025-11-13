import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Bed, Bath, Square, Car, User, Phone, Mail } from 'lucide-react';
import { Property } from '../../types';
import { formatPrice, formatArea } from '../../utils/formatters';

interface PropertyViewerProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyViewer: React.FC<PropertyViewerProps> = ({ property, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h2>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={18} className="mr-1" />
              <span>{property.location}</span>
            </div>
            <div className="text-3xl font-bold text-[#002430]">
              {formatPrice(property.price, property.currency)}
              {property.type === 'alquiler' && <span className="text-lg font-normal">/mes</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Images */}
            <div className="lg:col-span-2">
              <div className="relative h-96 mb-4 rounded-lg overflow-hidden">
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

              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-yellow-400' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Características</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details & Agent Info */}
            <div className="lg:col-span-1">
              {/* Property Stats */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Detalles de la Propiedad</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Bed size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Habitaciones</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Bath size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Baños</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Square size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{formatArea(property.area)}</div>
                    <div className="text-sm text-gray-600">Área</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Car size={24} className="mx-auto mb-2 text-[#002430]" />
                    <div className="font-semibold">{property.parking}</div>
                    <div className="text-sm text-gray-600">Estacionamientos</div>
                  </div>
                </div>
              </div>

              {/* Agent Info */}
              <div className="bg-[#002430] text-white rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Agente Asignado</h3>
                
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.photo}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{property.agent.name}</h4>
                    <p className="text-gray-300">{property.agent.role}</p>
                    <p className="text-sm text-gray-400">{property.agent.experience}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-yellow-400" />
                    <span>{property.agent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-yellow-400" />
                    <span>{property.agent.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyViewer;
