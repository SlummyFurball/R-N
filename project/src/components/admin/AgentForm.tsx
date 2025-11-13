import React, { useState, useEffect } from 'react';
import { X, Upload, User, Mail, Phone, Briefcase } from 'lucide-react';
import { useAgents } from '../../hooks/useAgents';
import { Agent } from '../../types';

interface AgentFormProps {
  agent?: Agent | null;
  onClose: () => void;
  onSave: () => void;
}

const AgentForm: React.FC<AgentFormProps> = ({ agent, onClose, onSave }) => {
  const { createAgent, updateAgent } = useAgents();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    photo: '',
    experience: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        role: agent.role,
        phone: agent.phone,
        email: agent.email,
        photo: agent.photo,
        experience: agent.experience,
        description: agent.description || ''
      });
    }
  }, [agent]);

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
      if (agent) {
        await updateAgent(agent.id, formData);
      } else {
        await createAgent(formData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving agent:', error);
      alert(`Error al ${agent ? 'actualizar' : 'crear'} el agente: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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
              {agent ? 'Editar Agente' : 'Nuevo Agente'}
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
            {/* Photo Preview */}
            {formData.photo && (
              <div className="text-center">
                <img
                  src={formData.photo}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Ej: Roberto Núñez"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo/Posición *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Ej: Director Ejecutivo"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="roberto@rnparadisse.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="+1-809-798-5428"
                  />
                </div>
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiencia *
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Ej: 15+ años"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Descripción profesional del agente, especialidades, logros, etc."
              />
              <p className="text-sm text-gray-500 mt-1">
                Opcional: Describe la experiencia y especialidades del agente
              </p>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la Foto *
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="https://ejemplo.com/foto.jpg"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Ingresa la URL de una imagen profesional del agente. Recomendamos usar imágenes de Pexels.
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
                {loading ? 'Guardando...' : (agent ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentForm;
