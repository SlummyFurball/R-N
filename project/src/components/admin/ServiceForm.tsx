import React, { useState, useEffect } from 'react';
import { X, Settings, FileText, Lightbulb } from 'lucide-react';
import { useServices } from '../../hooks/useServices';
import { Service } from '../../types';

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
  onSave: () => void;
}

const iconOptions = [
  { value: 'Calculator', label: 'Calculadora', icon: '🧮' },
  { value: 'FileText', label: 'Documento', icon: '📄' },
  { value: 'Palmtree', label: 'Palmera', icon: '🌴' },
  { value: 'Shield', label: 'Escudo', icon: '🛡️' },
  { value: 'Blueprint', label: 'Planos', icon: '📐' },
  { value: 'MapPin', label: 'Ubicación', icon: '📍' },
  { value: 'DollarSign', label: 'Dinero', icon: '💰' },
  { value: 'Settings', label: 'Configuración', icon: '⚙️' },
  { value: 'Drafting', label: 'Diseño', icon: '✏️' },
  { value: 'CreditCard', label: 'Tarjeta', icon: '💳' },
];

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onClose, onSave }) => {
  const { createService, updateService } = useServices();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Settings'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon
      });
    }
  }, [service]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (service) {
        await updateService(service.id, formData);
      } else {
        await createService(formData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving service:', error);
      alert(`Error al ${service ? 'actualizar' : 'crear'} el servicio: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {service ? 'Editar Servicio' : 'Nuevo Servicio'}
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
            {/* Icon Preview */}
            <div className="text-center">
              <div className="bg-[#002430] w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">
                  {iconOptions.find(opt => opt.value === formData.icon)?.icon || '⚙️'}
                </span>
              </div>
              <p className="text-sm text-gray-600">Vista previa del icono</p>
            </div>

            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Servicio *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Ej: Tasación de Inmuebles"
                />
              </div>
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icono del Servicio *
              </label>
              <div className="relative">
                <Lightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Servicio *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Describe detalladamente qué incluye este servicio..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length}/500 caracteres
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
                {loading ? 'Guardando...' : (service ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
