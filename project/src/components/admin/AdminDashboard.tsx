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
  Trash2
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useProperties } from '../../hooks/useProperties';
import PropertyForm from './PropertyForm';

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { properties, loading, refetch } = useProperties();
  const [activeTab, setActiveTab] = useState('properties');
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

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
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestión de Agentes</h2>
              <p className="text-gray-600">Funcionalidad de agentes en desarrollo...</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración</h2>
              <p className="text-gray-600">Configuración del sistema en desarrollo...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;