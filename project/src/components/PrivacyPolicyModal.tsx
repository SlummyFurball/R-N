import React from 'react';
import { X, Shield, Eye, Lock, UserCheck, Bell, Trash2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-[#002430] p-2 rounded-lg">
                <Shield className="text-yellow-400" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Política de Privacidad</h2>
            </div>
            <p className="text-gray-600">
              En R&N Paradisse Real Estate, respetamos y protegemos tu privacidad. 
              Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Última actualización: Enero 2024
            </p>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto space-y-6">
            {/* Información que Recopilamos */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="text-[#002430]" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">1. Información que Recopilamos</h3>
              </div>
              <div className="pl-7 space-y-2 text-sm text-gray-700">
                <p><strong>Información Personal:</strong></p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Nombre completo, email y número de teléfono</li>
                  <li>Información de contacto y preferencias de comunicación</li>
                  <li>Información sobre tus necesidades inmobiliarias</li>
                  <li>Historial de consultas y transacciones</li>
                </ul>
                
                <p className="pt-2"><strong>Información Técnica:</strong></p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  <li>Dirección IP y datos de navegación</li>
                  <li>Cookies y tecnologías similares</li>
                  <li>Información del dispositivo y navegador</li>
                </ul>
              </div>
            </section>

            {/* Cómo Usamos tu Información */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <UserCheck className="text-[#002430]" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">2. Cómo Usamos tu Información</h3>
              </div>
              <div className="pl-7 text-sm text-gray-700 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Proporcionar servicios inmobiliarios personalizados</li>
                  <li>Comunicarnos contigo sobre propiedades y servicios</li>
                  <li>Procesar tus solicitudes y consultas</li>
                  <li>Mejorar nuestros servicios y experiencia del usuario</li>
                  <li>Enviar newsletter y actualizaciones del mercado (con tu consentimiento)</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                </ul>
              </div>
            </section>

            {/* Protección de Datos */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Lock className="text-[#002430]" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">3. Protección de tus Datos</h3>
              </div>
              <div className="pl-7 text-sm text-gray-700 space-y-2">
                <p>Implementamos medidas de seguridad apropiadas para proteger tu información:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Encriptación de datos sensibles</li>
                  <li>Acceso restringido solo a personal autorizado</li>
                  <li>Sistemas seguros de almacenamiento</li>
                  <li>Auditorías regulares de seguridad</li>
                  <li>Capacitación continua del equipo en protección de datos</li>
                </ul>
              </div>
            </section>

            {/* Compartir Información */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Bell className="text-[#002430]" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">4. Compartir Información</h3>
              </div>
              <div className="pl-7 text-sm text-gray-700 space-y-2">
                <p>No vendemos ni alquilamos tu información personal. Podemos compartirla solo en estos casos:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Con tu consentimiento explícito</li>
                  <li>Con socios comerciales para completar transacciones</li>
                  <li>Para cumplir con requerimientos legales</li>
                  <li>Para proteger nuestros derechos o seguridad</li>
                </ul>
              </div>
            </section>

            {/* Tus Derechos */}
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Trash2 className="text-[#002430]" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">5. Tus Derechos</h3>
              </div>
              <div className="pl-7 text-sm text-gray-700 space-y-2">
                <p>Tienes derecho a:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
                  <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato portable</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                  <li><strong>Limitación:</strong> Restringir el procesamiento de tu información</li>
                </ul>
                
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>Para ejercer estos derechos:</strong> Contáctanos en info@rnparadisse.com 
                    o llama al (809) 798-5428. Responderemos dentro de 30 días.
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Política de Cookies</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>Utilizamos cookies y tecnologías similares para:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Mejorar la funcionalidad del sitio web</li>
                  <li>Analizar el uso del sitio</li>
                  <li>Personalizar tu experiencia</li>
                  <li>Recordar tus preferencias</li>
                </ul>
                <p>Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar algunas funcionalidades.</p>
              </div>
            </section>

            {/* Menores de Edad */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Menores de Edad</h3>
              <div className="text-sm text-gray-700">
                <p>Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos intencionalmente información de menores de edad.</p>
              </div>
            </section>

            {/* Cambios a la Política */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Cambios a esta Política</h3>
              <div className="text-sm text-gray-700">
                <p>Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios significativos por email o a través de nuestro sitio web. La fecha de la última actualización se muestra al inicio de este documento.</p>
              </div>
            </section>

            {/* Contacto */}
            <section className="bg-[#f4f4f2] p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Contacto para Privacidad</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Para consultas sobre privacidad:</strong></p>
                <p>📧 Email: privacidad@rnparadisse.com</p>
                <p>📞 Teléfono: (809) 798-5428</p>
                <p>📍 Dirección: Santo Domingo Este, República Dominicana</p>
                
                <p className="mt-3 font-medium">
                  Nos comprometemos a resolver tus consultas de privacidad dentro de 5 días hábiles.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Esta política cumple con las leyes de protección de datos de República Dominicana.
              </p>
              <button
                onClick={onClose}
                className="bg-[#002430] text-white px-6 py-2 rounded-lg hover:bg-[#003440] transition-colors duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;