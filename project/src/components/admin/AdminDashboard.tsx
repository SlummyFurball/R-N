import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  LogOut, 
  Plus, 
  BarChart3,
  Eye,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useProperties } from '../../hooks/useProperties';
import { teamMembers } from '../../data/team';
import { blogPosts } from '../../data/blog';
import PropertyForm from './PropertyForm';
import AgentForm from './AgentForm';
import BlogPostForm from './BlogPostForm';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { properties, loading, refetch } = useProperties();
  const agents = teamMembers; // Using team members as agents
  const [activeTab, setActiveTab] = useState('properties');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState(null);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      // TODO: Implement delete functionality
      console.log('Delete property:', propertyId);
    }
  };
  
  const handleEditAgent = (agent: any) => {
    setEditingAgent(agent);
    setShowAgentForm(true);
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este agente?')) {
      // TODO: Implement delete functionality
      console.log('Delete agent:', agentId);
    }
  };
  
  const handleEditBlogPost = (post: any) => {
    setEditingBlogPost(post);
    setShowBlogForm(true);
  };

  const handleDeleteBlogPost = async (postId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      // TODO: Implement delete functionality
      console.log('Delete blog post:', postId);
    }
  };
  
  const stats = {
    totalProperties: properties.length,
    activeProperties: properties.filter(p => p.type === 'venta').length,
    rentalProperties: properties.filter(p => p.type === 'alquiler').length,
    totalValue: properties.reduce((sum, p) => sum + p.price, 0),
  };

  if (showPropertyForm) {
    return (
      <PropertyForm
        property={editingProperty}
        onClose={() => {
          setShowPropertyForm(false);
          setEditingProperty(null);
        }}
        onSave={() => {
          setShowPropertyForm(false);
          setEditingProperty(null);
          refetch();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#002430] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src="/LogoR&N - Lateral.png"
                alt="R&N Paradisse"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold">Panel de Administración</h1>
                <p className="text-gray-300 text-sm">Bienvenido, {user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Home className="text-[#002430]" size={32} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Propiedades</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart3 className="text-green-600" size={32} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">En Venta</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeProperties}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="text-blue-600" size={32} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">En Alquiler</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rentalProperties}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Settings className="text-yellow-600" size={32} />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${(stats.totalValue / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('properties')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Propiedades
              </button>
              <button
                onClick={() => setActiveTab('agents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'agents'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Agentes
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'blog'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Configuración
              </button>
            </nav>
          </div>

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Propiedades</h2>
                <button
                  onClick={() => setShowPropertyForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Nueva Propiedad</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002430] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Cargando propiedades...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Propiedad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ubicación
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Agente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {properties.map((property) => (
                        <tr key={property.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={property.images[0]}
                                alt={property.title}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {property.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {property.bedrooms} hab • {property.bathrooms} baños
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              ${property.price.toLocaleString()} {property.currency}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              property.type === 'venta' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {property.type === 'venta' ? 'Venta' : 'Alquiler'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {property.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {property.agent.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => handleEditProperty(property)}
                                className="text-yellow-600 hover:text-yellow-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProperty(property.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Agents Tab */}
          {activeTab === 'agents' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Agentes</h2>
                <button
                  onClick={() => setShowAgentForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Nuevo Agente</span>
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002430] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Cargando agentes...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agents.map((agent) => (
                    <div key={agent.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-gray-600">{agent.role}</p>
                          <p className="text-xs text-gray-500">{agent.experience}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p>📧 {agent.email}</p>
                        <p>📞 {agent.phone}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditAgent(agent)}
                          className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors duration-200"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="flex-1 bg-red-500 text-white py-2 px-3 rounded text-sm hover:bg-red-600 transition-colors duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Blog</h2>
                <button
                  onClick={() => setShowBlogForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Nuevo Post</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded object-cover"
                              src={post.image}
                              alt={post.title}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                {post.title}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">
                                {post.excerpt}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.category === 'Mercado' ? 'bg-blue-100 text-blue-800' :
                            post.category === 'Consejos' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(post.date).toLocaleDateString('es-DO')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Publicado
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleEditBlogPost(post)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteBlogPost(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración del Sistema</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Company Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Empresa</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre de la Empresa
                      </label>
                      <input
                        type="text"
                        defaultValue="R&N Paradisse Real Estate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono Principal
                      </label>
                      <input
                        type="tel"
                        defaultValue="+1-809-798-5428"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Principal
                      </label>
                      <input
                        type="email"
                        defaultValue="info@rnparadisse.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Santo Domingo Este, República Dominicana"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-2 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200"
                    >
                      Guardar Información
                    </button>
                  </form>
                </div>
                
                {/* SEO Settings */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración SEO</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título del Sitio
                      </label>
                      <input
                        type="text"
                        defaultValue="R&N Paradisse Real Estate - Tu Hogar Perfecto Te Espera"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Descripción
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Empresa inmobiliaria líder en República Dominicana. Más de 15 años ayudando a familias a encontrar su hogar ideal."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Palabras Clave
                      </label>
                      <input
                        type="text"
                        defaultValue="inmobiliaria, propiedades, venta, alquiler, Santo Domingo, República Dominicana"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-2 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200"
                    >
                      Guardar SEO
                    </button>
                  </form>
                </div>
                
                {/* Social Media */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociales</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook
                      </label>
                      <input
                        type="url"
                        placeholder="https://facebook.com/rnparadisse"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram
                      </label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/rnparadisse"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/company/rnparadisse"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-2 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200"
                    >
                      Guardar Redes Sociales
                    </button>
                  </form>
                </div>
                
                {/* System Settings */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración del Sistema</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Modo Mantenimiento</h4>
                        <p className="text-sm text-gray-500">Activar página de mantenimiento</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Registro de Usuarios</h4>
                        <p className="text-sm text-gray-500">Permitir registro público</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Newsletter</h4>
                        <p className="text-sm text-gray-500">Activar suscripción al newsletter</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] py-2 px-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200"
                    >
                      Guardar Configuración
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      {showAgentForm && (
        <AgentForm
          agent={editingAgent}
          onClose={() => {
            setShowAgentForm(false);
            setEditingAgent(null);
          }}
          onSave={() => {
            setShowAgentForm(false);
            setEditingAgent(null);
            // TODO: Refresh agents
          }}
        />
      )}
      
      {showBlogForm && (
        <BlogPostForm
          post={editingBlogPost}
          onClose={() => {
            setShowBlogForm(false);
            setEditingBlogPost(null);
          }}
          onSave={() => {
            setShowBlogForm(false);
            setEditingBlogPost(null);
            // TODO: Refresh blog posts
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
