import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, FileText, Shield, Cookie } from 'lucide-react';
import { scrollToElement, createWhatsAppUrl } from '../utils/formatters';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const Footer: React.FC = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleNavigation = (sectionId: string) => {
    scrollToElement(sectionId);
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', 'Hola, me interesa obtener más información sobre sus servicios inmobiliarios');
    window.open(whatsappUrl, '_blank');
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#002430] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src="/LogoR&N - Lateral.png"
                  alt="R&N Paradisse Real Estate"
                  className="h-20 w-auto"
                />
              </div>
              
              <p className="text-gray-300 text-sm leading-relaxed">
                Tu socio de confianza en el mercado inmobiliario dominicano. 
                Más de 15 años ayudando a familias a encontrar su hogar ideal.
              </p>

              <div className="flex space-x-3">
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation('hero')}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('properties')}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    Propiedades
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('services')}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('team')}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    Equipo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('blog')}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('contact')}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-left"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Servicios Principales</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-300">Venta de Propiedades</li>
                <li className="text-gray-300">Alquiler de Inmuebles</li>
                <li className="text-gray-300">Tasación Profesional</li>
                <li className="text-gray-300">Asesoría Financiera</li>
                <li className="text-gray-300">Administración</li>
                <li className="text-gray-300">Proyectos Turísticos</li>
                <li>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                  >
                    Ver todos los servicios →
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone className="text-yellow-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-gray-300">(809) 798-5428</p>
                    <p className="text-gray-400 text-xs">WhatsApp disponible</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="text-yellow-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-gray-300">info@rnparadisse.com</p>
                    <p className="text-gray-400 text-xs">Respuesta en 24h</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-yellow-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-gray-300">Santo Domingo Este</p>
                    <p className="text-gray-400 text-xs">República Dominicana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-600 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} R&N Paradisse Real Estate. Todos los derechos reservados.
              </div>
              
              <div className="flex flex-wrap items-center space-x-6 text-sm">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center space-x-1"
                >
                  <Shield size={14} />
                  <span>Política de Privacidad</span>
                </button>
                
                <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center space-x-1">
                  <FileText size={14} />
                  <span>Términos y Condiciones</span>
                </button>
                
                <button className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center space-x-1">
                  <Cookie size={14} />
                  <span>Política de Cookies</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />
    </>
  );
};

export default Footer;