import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Property, Agent } from '../types';
import { createWhatsAppUrl } from '../utils/formatters';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  agent: Agent;
}

const consultationTypes = [
  { value: 'visita', label: 'Visita a Propiedad' },
  { value: 'compra', label: 'Consulta de Compra' },
  { value: 'venta', label: 'Consulta de Venta' },
  { value: 'evaluacion', label: 'Evaluación/Tasación' },
  { value: 'inversion', label: 'Oportunidades de Inversión' },
  { value: 'financiamiento', label: 'Consulta de Financiamiento' },
  { value: 'general', label: 'Consulta General' }
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, property, agent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    // Create WhatsApp message
    let message = `Hola ${agent.name}, me gustaría agendar una cita:\n\n`;
    message += `Nombre: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Tipo de consulta: ${consultationTypes.find(t => t.value === formData.consultationType)?.label}\n`;
    message += `Fecha preferida: ${formData.preferredDate}\n`;
    message += `Hora preferida: ${formData.preferredTime}\n`;
    
    if (property) {
      message += `Propiedad de interés: ${property.title}\n`;
    }
    
    if (formData.message) {
      message += `Mensaje adicional: ${formData.message}\n`;
    }

    // Simulate form submission
    setTimeout(() => {
      const whatsappUrl = createWhatsAppUrl(agent.phone, message);
      window.open(whatsappUrl, '_blank');
      
      setFormStatus('success');
      setTimeout(() => {
        onClose();
        setFormStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          consultationType: '',
          preferredDate: '',
          preferredTime: '',
          message: ''
        });
      }, 2000);
    }, 1000);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Agendar Cita</h3>
            <p className="text-gray-600">
              Agenda una consulta personalizada con {agent.name}
              {property && ` sobre ${property.title}`}
            </p>
          </div>

          {formStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="text-green-600" size={32} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">¡Cita Solicitada!</h4>
              <p className="text-gray-600 mb-4">
                Tu solicitud de cita se ha enviado por WhatsApp. {agent.name} te contactará pronto para confirmar.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="(809) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="consultationType" className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Consulta *
                  </label>
                  <select
                    id="consultationType"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                    <option value="">Selecciona el tipo</option>
                    {consultationTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha Preferida *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={today}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Hora Preferida *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none"
                    >
                      <option value="">Selecciona la hora</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje Adicional (Opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  placeholder="Compártenos cualquier detalle adicional que consideres importante..."
                />
              </div>

              {/* Agent Info */}
              <div className="bg-[#f4f4f2] p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                    <p className="text-sm text-gray-600">{agent.role}</p>
                    <p className="text-sm text-gray-500">Experiencia: {agent.experience}</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'loading'}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-3 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>
                  {formStatus === 'loading' ? 'Enviando...' : 'Solicitar Cita por WhatsApp'}
                </span>
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al enviar esta solicitud, se abrirá WhatsApp con tu información para confirmar la cita directamente con el agente.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;