import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002430]"></div>
      </div>
    );
  }

  return user ? <AdminDashboard /> : <AdminLogin />;
};

export default AdminRoute;