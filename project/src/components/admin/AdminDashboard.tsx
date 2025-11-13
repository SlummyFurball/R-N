import React, { useState, useEffect, useCallback } from 'react';
import { Home, Users, Settings, LogOut, Plus, BarChart3, Eye, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { initializeStorage } from '../../lib/supabase';
import { useProperties } from '../../hooks/useProperties';
import { useAgents } from '../../hooks/useAgents';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { useServices } from '../../hooks/useServices';
import PropertyForm from './PropertyForm';
import AgentForm from './AgentForm';
import BlogPostForm from './BlogPostForm';
import ServiceForm from './ServiceForm';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { properties, loading, refetch, createProperty, updateProperty, deleteProperty } = useProperties();
  const { agents, loading: agentsLoading, refetch: refetchAgents, createAgent, updateAgent, deleteAgent } = useAgents();
  const { blogPosts, loading: blogLoading, refetch: refetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } = useBlogPosts();
  const { services: allServices, loading: servicesLoading, refetch: refetchServices, createService, updateService, deleteService } = useServices();
  
  const [activeTab, setActiveTab] = useState('properties');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Initialize Supabase Storage on component mount
  useEffect(() => {
    initializeStorage();
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleEditProperty = useCallback((property: any) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  }, []);

  const handleDeleteProperty = useCallback(async (propertyId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
      try {
        await deleteProperty(propertyId);
      } catch (error) {
        console.error('Error deleting property:', error);
        alert(`Error al eliminar la propiedad: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  }, [deleteProperty]);
  
  const handleEditAgent = useCallback((agent: any) => {
    setEditingAgent(agent);
    setShowAgentForm(true);
  }, []);

  const handleDeleteAgent = useCallback(async (agentId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este agente?')) {
      try {
        await deleteAgent(agentId);
      } catch (error) {
        console.error('Error deleting agent:', error);
        alert(`Error al eliminar el agente: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  }, [deleteAgent]);
  
  const handleEditBlogPost = useCallback((post: any) => {
    setEditingBlogPost(post);
    setShowBlogForm(true);
  }, []);

  const handleDeleteBlogPost = useCallback(async (postId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      try {
        await deleteBlogPost(postId);
      } catch (error) {
        console.error('Error deleting blog post:', error);
        alert(`Error al eliminar el post: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  }, [deleteBlogPost]);
  
  const handleEditService = useCallback((service: any) => {
    setEditingService(service);
    setShowServiceForm(true);
  }, []);

  const handleDeleteService = useCallback(async (serviceId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      try {
        await deleteService(serviceId);
      } catch (error) {
        console.error('Error deleting service:', error);
        alert(`Error al eliminar el servicio: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
  }, [deleteService]);

  const handlePropertySave = useCallback(async (propertyData: any, isEdit: boolean) => {
    try {
      console.log('Dashboard onSave called with:', { propertyData, isEdit });
      if (isEdit && editingProperty) {
        await updateProperty(editingProperty.id, propertyData);
        console.log('Property updated successfully');
      } else {
        await createProperty(propertyData);
        console.log('Property created successfully');
      }
      await refetch();
      console.log('Properties refreshed');
    } catch (error) {
      console.error('Error saving property:', error);
      throw error;
    }
  }, [editingProperty, updateProperty, createProperty, refetch]);

  const handleAgentSave = useCallback(async () => {
    setShowAgentForm(false);
    setEditingAgent(null);
    await refetchAgents();
  }, [refetchAgents]);

  const handleBlogSave = useCallback(async () => {
    setShowBlogForm(false);
    setEditingBlogPost(null);
    await refetchBlogPosts();
  }, [refetchBlogPosts]);

  const handleServiceSave = useCallback(async () => {
    setShowServiceForm(false);
    setEditingService(null);
    await refetchServices();
  }, [refetchServices]);
  
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
        agents={agents}
        onClose={() => {
          setShowPropertyForm(false);
          setEditingProperty(null);
        }}
        onSave={handlePropertySave}
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
                onClick={() => setActiveTab('services')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Servicios
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

              {agentsLoading ? (
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

              {blogLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002430] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Cargando posts...</p>
                </div>
              ) : (
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
              )}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Gestión de Servicios</h2>
                <button
                  onClick={() => setShowServiceForm(true)}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#002430] px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Nuevo Servicio</span>
                </button>
              </div>

              {servicesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002430] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Cargando servicios...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allServices.map((service) => (
                    <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="bg-[#002430] w-12 h-12 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-400 text-xl">
                            {service.icon === 'Calculator' ? '🧮' :
                             service.icon === 'FileText' ? '📄' :
                             service.icon === 'Palmtree' ? '🌴' :
                             service.icon === 'Shield' ? '🛡️' :
                             service.icon === 'Blueprint' ? '📐' :
                             service.icon === 'MapPin' ? '📍' :
                             service.icon === 'DollarSign' ? '💰' :
                             service.icon === 'Settings' ? '⚙️' :
                             service.icon === 'Drafting' ? '✏️' :
                             service.icon === 'CreditCard' ? '💳' : '⚙️'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{service.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {service.description}
                      </p>
                      
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditService(service)}
                          className="flex-1 bg-blue-500 text-white py-2 px-3 rounded text-sm hover:bg-blue-600 transition-colors duration-200"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDeleteService(service.id)}
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

          {/* Settings Tab - sin cambios */}
          {activeTab === 'settings' && (
            <div className="p-6">
              {/* ... mismo contenido ... */}
            </div>
          )}
        </div>
      </div>
      
      {/* Modals - CORREGIDOS */}
      {showAgentForm && (
        <AgentForm
          agent={editingAgent}
          onClose={() => {
            setShowAgentForm(false);
            setEditingAgent(null);
          }}
          onSave={handleAgentSave}
        />
      )}
      
      {showServiceForm && (
        <ServiceForm
          service={editingService}
          onClose={() => {
            setShowServiceForm(false);
            setEditingService(null);
          }}
          onSave={handleServiceSave}
        />
      )}
      
      {showBlogForm && (
        <BlogPostForm
          post={editingBlogPost}
          onClose={() => {
            setShowBlogForm(false);
            setEditingBlogPost(null);
          }}
          onSave={handleBlogSave}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
