import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Search, Filter, ChevronRight, Mail } from 'lucide-react';
import { blogPosts } from '../data/blog';
import { BlogPost } from '../types';
import { formatDate } from '../utils/formatters';

const categories = ['Todos', 'Mercado', 'Consejos', 'Inversión'];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const featuredPost = blogPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setNewsletterStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setNewsletterStatus('success');
      setEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }, 1000);
  };

  const handleReadMore = (post: BlogPost) => {
    // In a real app, this would navigate to the full blog post
    console.log('Reading more about:', post.title);
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Blog{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Inmobiliario
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente informado con las últimas tendencias, consejos y análisis del mercado inmobiliario dominicano
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="bg-[#f4f4f2] rounded-xl overflow-hidden mb-8">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-[#002430] text-white px-3 py-1 rounded-full text-sm">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar size={16} className="mr-1" />
                      {formatDate(featuredPost.date)}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <button
                    onClick={() => handleReadMore(featuredPost)}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>Leer Más</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="text-gray-600" size={20} />
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-[#002430] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularPosts.map((post) => (
                <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        post.category === 'Mercado' ? 'bg-blue-100 text-blue-800' :
                        post.category === 'Consejos' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{formatDate(post.date)}</span>
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <button
                      onClick={() => handleReadMore(post)}
                      className="text-[#002430] hover:text-yellow-600 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>Leer más</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No se encontraron artículos que coincidan con tu búsqueda.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Newsletter */}
              <div className="bg-[#002430] text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Newsletter Inmobiliario</h3>
                <p className="text-gray-300 mb-6">
                  Recibe las últimas noticias y tendencias del mercado directamente en tu email.
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email"
                    className="w-full px-4 py-2 rounded text-gray-900"
                    required
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-2 px-4 rounded font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Mail size={18} />
                    <span>
                      {newsletterStatus === 'loading' ? 'Enviando...' : 'Suscribirse'}
                    </span>
                  </button>
                </form>

                {newsletterStatus === 'success' && (
                  <p className="text-green-400 text-sm mt-2">¡Suscripción exitosa!</p>
                )}
              </div>

              {/* Categories */}
              <div className="bg-[#f4f4f2] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categorías</h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className="block w-full text-left text-gray-700 hover:text-[#002430] py-1"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-[#f4f4f2] p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Artículos Populares</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex space-x-3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;