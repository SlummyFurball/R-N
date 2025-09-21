import React, { useState } from 'react';
import { Property } from '../types';
import { formatPrice, formatArea, createWhatsAppUrl } from '../utils/formatters';
import { Bed, Bath, Square, Car, ChevronLeft, ChevronRight, MessageCircle, Eye } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en la propiedad: ${property.title} - ${formatPrice(property.price, property.currency)}`;
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', message);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative h-64 group">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            property.type === 'venta' 
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {property.type === 'venta' ? 'En Venta' : 'En Alquiler'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{property.title}</h3>
          <span className="text-2xl font-bold text-[#002430]">
            {formatPrice(property.price, property.currency)}
            {property.type === 'alquiler' && <span className="text-sm font-normal">/mes</span>}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{property.location}</p>

        {/* Features */}
        <div className="flex justify-between items-center mb-6 text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed size={18} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath size={18} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Square size={18} />
            <span>{formatArea(property.area)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Car size={18} />
            <span>{property.parking}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(property)}
            className="flex-1 bg-[#002430] text-white py-2 px-4 rounded-full font-medium hover:bg-[#003440] transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Eye size={18} />
            <span>Ver Detalles</span>
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="bg-green-500 text-white py-2 px-4 rounded-full font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;