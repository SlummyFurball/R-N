import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Users, Award } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestros{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Clientes
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor logro. Descubre por qué confían en nosotros.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-[#f4f4f2] rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="text-[#002430]" size={32} />
            </div>
            <div className="text-3xl font-bold text-[#002430] mb-2">98%</div>
            <div className="text-gray-600">Satisfacción del Cliente</div>
          </div>
          
          <div className="text-center p-6 bg-[#f4f4f2] rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <Users className="text-[#002430]" size={32} />
            </div>
            <div className="text-3xl font-bold text-[#002430] mb-2">500+</div>
            <div className="text-gray-600">Clientes Atendidos</div>
          </div>
          
          <div className="text-center p-6 bg-[#f4f4f2] rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <Award className="text-[#002430]" size={32} />
            </div>
            <div className="text-3xl font-bold text-[#002430] mb-2">15+</div>
            <div className="text-gray-600">Años de Experiencia</div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-[#002430] text-white p-8 md:p-12 rounded-xl relative">
            <div className="absolute top-4 left-4 text-6xl text-yellow-400 opacity-50">"</div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                </div>
                
                <div className="md:w-2/3 text-center md:text-left">
                  <p className="text-lg md:text-xl mb-6 leading-relaxed">
                    {currentTestimonial.content}
                  </p>
                  
                  <div className="flex justify-center md:justify-start items-center mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                    <p className="text-gray-300">{currentTestimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-[#002430]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;