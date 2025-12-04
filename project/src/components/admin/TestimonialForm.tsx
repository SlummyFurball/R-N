import React, { useState, useEffect } from 'react';
import { X, Upload, User, Briefcase, MessageSquare, Star, Trash2 } from 'lucide-react';
import { useTestimonials } from '../../hooks/useTestimonials';
import { supabase } from '../../lib/supabase';
import { Testimonial } from '../../types';

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onClose: () => void;
  onSave: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial, onClose, onSave }) => {
  const { createTestimonial, updateTestimonial } = useTestimonials();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: ''
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: testimonial.rating,
        image: testimonial.image
      });
    }
  }, [testimonial]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona solo archivos de imagen');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `testimonial-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(data.path);

      setFormData(prev => ({
        ...prev,
        image: publicUrl
      }));

      console.log(`Imagen "${file.name}" subida exitosamente`);
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
      if (testimonial) {
        await updateTestimonial(testimonial.id, formData);
      } else {
        await createTestimonial(formData);
      }

      onSave();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert(`Error al ${testimonial ? 'actualizar' : 'crear'} el testimonio: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {testimonial ? 'Editar Testimonio' : 'Nuevo Testimonio'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {formData.image && (
              <div className="text-center">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
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
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo/Profesión *
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
                    placeholder="Ej: Empresario"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Foto de Perfil *
              </label>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors duration-200 flex items-center justify-center space-x-2 bg-gray-50 hover:bg-yellow-50">
                      <Upload size={16} className="text-gray-400" />
                      <span className="text-gray-700">
                        {uploadingImage ? 'Subiendo...' : 'Seleccionar imagen'}
                      </span>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="O pega la URL de una imagen (fallback)"
                  />
                  {formData.image && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                Sube una imagen directamente (máx 5MB) o pega una URL. Las imágenes subidas se guardan de forma permanente.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calificación *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
                <span className="text-gray-600 ml-2">{formData.rating} de 5 estrellas</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonio *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                  placeholder="Escribe el testimonio del cliente..."
                />
              </div>
            </div>

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
                {loading ? 'Guardando...' : (testimonial ? 'Actualizar' : 'Crear')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
