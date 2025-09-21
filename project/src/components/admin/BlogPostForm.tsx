import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogPostFormProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSave: () => void;
}

const categories = ['Mercado', 'Consejos', 'Inversión'];

const BlogPostForm: React.FC<BlogPostFormProps> = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Consejos' as 'Mercado' | 'Consejos' | 'Inversión',
    readTime: '5 min'
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        readTime: post.readTime
      });
    }
  }, [post]);

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
      // TODO: Implement actual save to Supabase
      console.log('Saving blog post:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave();
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {post ? 'Editar Post' : 'Nuevo Post'}
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
            {/* Image Preview */}
            {formData.image && (
              <div className="text-center">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg mx-auto mb-4"
                />
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Post *
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
                    placeholder="Ej: Tendencias del Mercado Inmobiliario 2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Read Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de Lectura
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Ej: 5 min"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la Imagen *
              </label>
              <div className="relative">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="https://images.pexels.com/photos/..."
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Recomendamos usar imágenes de Pexels con dimensiones 800x600px
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extracto/Resumen *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Breve descripción del contenido del post (máximo 200 caracteres)..."
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.excerpt.length}/200 caracteres
              </p>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido del Post *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                placeholder="Escribe aquí el contenido completo del post. Puedes usar párrafos separados por líneas en blanco..."
              />
              <p className="text-sm text-gray-500 mt-1">
                Tip: Usa párrafos cortos y separados para mejor legibilidad
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
                {loading ? 'Guardando...' : (post ? 'Actualizar' : 'Publicar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
