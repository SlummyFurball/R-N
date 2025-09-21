import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { properties as staticProperties } from '../data/properties';
import { useProperties } from '../hooks/useProperties';
import { Property } from '../types';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';

const Properties: React.FC = () => {
  const { properties: dbProperties, loading: dbLoading, error: dbError } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'todas' | 'venta' | 'alquiler'>('todas');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Use database properties if available, otherwise fallback to static
  const properties = dbProperties.length > 0 ? dbProperties : staticProperties;

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'todas' || property.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <section id="properties" className="py-20 bg-[#f4f4f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Propiedades{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Destacadas
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección exclusiva de propiedades en las mejores ubicaciones de República Dominicana
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por título o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-600" size={20} />
            <div className="flex space-x-2">
              {[
                { key: 'todas', label: 'Todas' },
                { key: 'venta', label: 'Venta' },
                { key: 'alquiler', label: 'Alquiler' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key as 'todas' | 'venta' | 'alquiler')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedType === key
                      ? 'bg-[#002430] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron propiedades que coincidan con tu búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('todas');
              }}
              className="mt-4 text-[#002430] hover:text-yellow-600 font-medium"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </div>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Properties;