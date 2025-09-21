import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { scrollToElement, createWhatsAppUrl } from '../utils/formatters';
import { useScrollspy } from '../hooks/useScrollspy';

const navigation = [
  { name: 'Inicio', href: 'hero' },
  { name: 'Propiedades', href: 'properties' },
  { name: 'Servicios', href: 'services' },
  { name: 'Equipo', href: 'team' },
  { name: 'Blog', href: 'blog' },
  { name: 'Contacto', href: 'contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useScrollspy(navigation.map(item => item.href));

  const handleNavClick = (href: string) => {
    scrollToElement(href);
    setIsMenuOpen(false);
  };

  const handleConsultaClick = () => {
    const whatsappUrl = createWhatsAppUrl('+1-809-798-5428', 'Hola, me interesa obtener más información sobre sus servicios inmobiliarios');
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="bg-[#002430] shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/LogoR&N - Lateral.png"
              alt="R&N Paradisse Real Estate"
              className="h-20 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-white hover:text-yellow-400 transition-colors duration-200 ${
                  activeSection === item.href ? 'text-yellow-400' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <button
            onClick={handleConsultaClick}
            className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
          >
            <Phone size={18} />
            <span>Consulta Gratis</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white hover:text-yellow-400 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-white hover:text-yellow-400 transition-colors duration-200 text-left ${
                    activeSection === item.href ? 'text-yellow-400' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={handleConsultaClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 w-fit"
              >
                <Phone size={18} />
                <span>Consulta Gratis</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;