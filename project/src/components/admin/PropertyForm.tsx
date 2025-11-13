import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Property, Agent } from '../../types';
import { supabase } from '../../lib/supabase';

interface PropertyFormProps {
  property?: Property | null;
  agents: Agent[];
  onClose: () => void;
  onSave: (propertyData: any, isEdit: boolean) => Promise<void>;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ property, agents, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    currency: 'USD',
    type: 'venta' as 'venta' | 'alquiler',
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    parking: 0,
    description: '',
    features: [''],
    images: [''],
    agent_id: '1', // Default agent
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        price: property.price,
        currency: property.currency,
        type: property.type,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        parking: property.parking,
        description: property.description,
        features: property.features.length > 0 ? property.features : [''],
        images: property.images.length > 0 ? property.images : [''],
        agent_id: property.agent.id,
      });
    }
  }, [property]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'area' || name === 'parking'
        ? Number(value)
        : value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona solo archivos de imagen');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    setUploadingImage(true);
    
    try {

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(data.path);
      
      // Add to images array
      setFormData(prev => ({
        ...prev,
        images: [...prev.images.filter(img => img.trim() !== ''), publicUrl, '']
      }));
      
      console.log(`Imagen "${file.name}" subida exitosamente`);
      
      // Reset file input
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Error al subir la imagen: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty features and images
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        images: formData.images.filter(img => img.trim() !== ''),
      };

      // Validate required fields
      if (!cleanedData.title || !cleanedData.location || !cleanedData.description) {
        throw new Error('Por favor completa todos los campos requeridos');
      }

      if (cleanedData.images.length === 0) {
        throw new Error('Debes agregar al menos una imagen');
      }

      // Find the selected agent
      const selectedAgent = agents.find(agent => agent.id === cleanedData.agent_id);
      if (!selectedAgent) {
        throw new Error('Agente seleccionado no encontrado');
      }

      const propertyData = {
        title: cleanedData.title,
        price: cleanedData.price,
        currency: cleanedData.currency,
        type: cleanedData.type,
        location: cleanedData.location,
        bedrooms: cleanedData.bedrooms,
        bathrooms: cleanedData.bathrooms,
        area: cleanedData.area,
        parking: cleanedData.parking,
        images: cleanedData.images,
        description: cleanedData.description,
        features: cleanedData.features,
        agent: selectedAgent
      };
      await onSave(propertyData, !!property);
      
      // Close form on success
      onClose();
    } catch (error) {
      console.error('Error saving property:', error);
      alert(`Error al ${property ? 'actualizar' : 'crear'} la propiedad: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ej: Villa Moderna en Punta Cana"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ej: Punta Cana, La Altagracia"
                />
              </div>
            </div>

            {/* Price and Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moneda
                </label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="USD">USD</option>
                  <option value="DOP">DOP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agente Asignado *
                </label>
                <select
                  name="agent_id"
                  value={formData.agent_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.name} - {agent.role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <option value="venta">Venta</option>
                <option value="alquiler">Alquiler</option>
              </select>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Habitaciones
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baños
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área (m²)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estacionamientos
                </label>
                <input
                  type="number"
                  name="parking"
                  value={formData.parking}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Describe la propiedad en detalle..."
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Características
              </label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Ej: Piscina privada"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-[#002430] hover:text-yellow-600"
                >
                  <Plus size={18} />
                  <span>Agregar característica</span>
                </button>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imágenes
              </label>
              
              {/* Image Upload Button */}
              <div className="mb-4">
                <label className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002430] mb-2"></div>
                        <p className="text-sm text-gray-500">Subiendo imagen...</p>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Haz clic para subir</span> una imagen
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
              </div>
              
              {/* URL Input Fields */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-2">O ingresa URLs manualmente:</p>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {image && (
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-12 h-12 object-cover rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                        image ? 'bg-green-50' : ''
                      }`}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                      disabled={formData.images.length <= 1}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImage}
                  className="flex items-center space-x-2 text-[#002430] hover:text-yellow-600"
                >
                  <Plus size={18} />
                  <span>Agregar imagen</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Importante:</strong> Debes tener al menos 1 imagen. Recomendamos 3+ imágenes de alta calidad. La primera será la imagen principal.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? 'Guardando...' : (property ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
