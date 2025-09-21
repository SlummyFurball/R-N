import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 bg-[#f4f4f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contáctanos{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Hoy
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos listos para ayudarte con tus necesidades inmobiliarias. Múltiples formas de contactarnos para tu comodidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-[#002430] text-white p-8 rounded-xl h-full">
              <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <Phone className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Teléfono</h4>
                    <p className="text-gray-300">(809) 798-5428</p>
                    <p className="text-sm text-gray-400">Llamadas y WhatsApp</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">info@rnparadisse.com</p>
                    <p className="text-sm text-gray-400">Respuesta en 24 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Ubicación</h4>
                    <p className="text-gray-300">Santo Domingo Este</p>
                    <p className="text-sm text-gray-400">República Dominicana</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1">Horarios</h4>
                    <p className="text-gray-300">Lun - Vie: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-300">Sáb: 9:00 AM - 2:00 PM</p>
                    <p className="text-sm text-gray-400">WhatsApp 24/7</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-6">
                <h4 className="font-semibold mb-3">¿Por qué elegir contactarnos por email?</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Respuesta detallada y documentada</li>
                  <li>• Adjuntar documentos e imágenes</li>
                  <li>• Historial de conversación</li>
                  <li>• Ideal para consultas complejas</li>
                </ul>
                
                <div className="mt-6 p-4 bg-yellow-600 rounded-lg">
                  <p className="text-[#002430] font-semibold text-sm">
                    💬 Para respuestas inmediatas, usa WhatsApp
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un Mensaje</h3>
              
              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">¡Mensaje Enviado!</h4>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Te responderemos en un máximo de 24 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="(809) 000-0000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Asunto *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="compra">Interés en Comprar</option>
                        <option value="venta">Quiero Vender mi Propiedad</option>
                        <option value="alquiler">Busco en Alquiler</option>
                        <option value="tasacion">Solicitar Tasación</option>
                        <option value="inversion">Oportunidades de Inversión</option>
                        <option value="financiamiento">Consulta de Financiamiento</option>
                        <option value="otros">Otros Servicios</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                      placeholder="Cuéntanos más detalles sobre lo que buscas..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-3 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>
                      {formStatus === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
                    </span>
                  </button>
                </form>
              )}

              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Al enviar este formulario, aceptas que podemos contactarte 
                  por email o teléfono para dar seguimiento a tu consulta. Tu información está protegida 
                  según nuestra política de privacidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;