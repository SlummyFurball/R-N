import React from 'react';
import { X, Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { formatDate } from '../utils/formatters';

interface BlogPostModalProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 shadow-lg"
            >
              <X size={24} className="text-gray-800" />
            </button>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                post.category === 'Mercado' ? 'bg-blue-100 text-blue-800' :
                post.category === 'Consejos' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                <Tag size={14} className="inline mr-1" />
                {post.category}
              </span>

              <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={16} className="mr-1" />
                {formatDate(post.date)}
              </div>

              <div className="flex items-center text-gray-600 text-sm">
                <Clock size={16} className="mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-yellow-400 pl-4">
              {post.excerpt}
            </p>

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Publicado el {formatDate(post.date)}
                </div>

                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostModal;
