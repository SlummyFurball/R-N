import React from 'react';
import { MessageCircle, Mail, Phone, Target, Eye, Heart, Lightbulb } from 'lucide-react';
import { useAgents } from '../hooks/useAgents';
import { createWhatsAppUrl } from '../utils/formatters';

const values = [
  {
    icon: Eye,
    title: 'Transparencia',
    description: 'Información clara y honesta en cada transacción'
  },
  {
    icon: Target,
    title: 'Excelencia',
    description: 'Superamos expectativas con servicios de calidad'
  },
  {
    icon: Heart,
    title: 'Compromiso',
    description: 'Dedicación total al éxito de nuestros clientes'
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Soluciones modernas para el mercado actual'
  }
];

const Team: React.FC = () => {
  const { agents: teamMembers, loading } = useAgents();

  const handleWhatsAppClick = (phone: string, name: string) => {
    const message = `Hola ${name}, me interesa obtener más información sobre sus servicios inmobiliarios`;
    const whatsappUrl = createWhatsAppUrl(phone, message);
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = (email: string, name: string) => {
    const subject = encodeURIComponent(`Consulta de servicios inmobiliarios`);
    const body = encodeURIComponent(`Hola ${name},\n\nMe interesa obtener más información sobre sus servicios.\n\nSaludos.`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <section id="team" className="py-20 bg-[#f4f4f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestro{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Equipo
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profesionales expertos comprometidos con tu éxito inmobiliario
          </p>
        </div>

        {/* Team Members */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002430] mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando equipo...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-[#002430] font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.description || 'Profesional especializado en servicios inmobiliarios'}</p>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {member.experience}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleWhatsAppClick(member.phone, member.name)}
                      className="flex-1 bg-green-500 text-white py-2 px-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <MessageCircle size={16} />
                    </button>
                    <button
                      onClick={() => handleEmailClick(member.email, member.name)}
                      className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Mail size={16} />
                    </button>
                    <button
                      onClick={() => window.open(`tel:${member.phone}`, '_self')}
                      className="flex-1 bg-[#002430] text-white py-2 px-3 rounded-lg font-medium hover:bg-[#003440] transition-colors duration-200 flex items-center justify-center"
                    >
                      <Phone size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Company Values */}
        <div className="bg-white rounded-xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Nuestros Valores</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-[#002430]" size={32} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
