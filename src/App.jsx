import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ui/ProtectedRoute';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public pages
import Home from './pages/public/Home';
import Vocacao from './pages/public/Vocacao';
import Seminario from './pages/public/Seminario';
import Comunidade from './pages/public/Comunidade';
import Formacao from './pages/public/Formacao';
import Ajudar from './pages/public/Ajudar';
import Contactos from './pages/public/Contactos';
import Noticias from './pages/public/Noticias';
import NoticiaDetalhe from './pages/public/NoticiaDetalhe';

// Auth
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboard
import DashboardHome from './pages/dashboard/DashboardHome';
import Propinas from './pages/dashboard/Propinas';
import Horarios from './pages/dashboard/Horarios';
import Materiais from './pages/dashboard/Materiais';
import Comunicados from './pages/dashboard/Comunicados';
import Forum from './pages/dashboard/Forum';
import Perfil from './pages/dashboard/Perfil';

// Admin
import AdminHome from './pages/admin/AdminHome';
import AdminSeminaristas from './pages/admin/AdminSeminaristas';
import AdminPagamentos from './pages/admin/AdminPagamentos';
import AdminComunicados from './pages/admin/AdminComunicados';
import AdminRelatorios from './pages/admin/AdminRelatorios';
import AdminMateriais from './pages/admin/AdminMateriais';
import AdminDefinicoes from './pages/admin/AdminDefinicoes';

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { fontSize: '14px' } }} />
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vocacao" element={<Vocacao />} />
          <Route path="/seminario" element={<Seminario />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/formacao" element={<Formacao />} />
          <Route path="/ajudar" element={<Ajudar />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaDetalhe />} />
          <Route path="/privacidade" element={<div className="max-w-3xl mx-auto py-16 px-4 prose"><h1>Política de Privacidade</h1><p>Esta página está em construção.</p></div>} />
          <Route path="/termos" element={<div className="max-w-3xl mx-auto py-16 px-4 prose"><h1>Termos de Uso</h1><p>Esta página está em construção.</p></div>} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard (seminaristas + todos) */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="propinas" element={<Propinas />} />
          <Route path="horarios" element={<Horarios />} />
          <Route path="materiais" element={<Materiais />} />
          <Route path="comunicados" element={<Comunicados />} />
          <Route path="forum" element={<Forum />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        {/* Compat alias */}
        <Route path="/propinas" element={<Navigate to="/dashboard/propinas" replace />} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute roles={['admin', 'staff']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminHome />} />
          <Route path="seminaristas" element={<AdminSeminaristas />} />
          <Route path="pagamentos" element={<AdminPagamentos />} />
          <Route path="comunicados" element={<AdminComunicados />} />
          <Route path="relatorios" element={<AdminRelatorios />} />
          <Route path="materiais" element={<AdminMateriais />} />
          <Route path="definicoes" element={<AdminDefinicoes />} />
        </Route>

        <Route path="*" element={<div className="min-h-screen flex flex-col items-center justify-center gap-4"><h1 className="text-4xl font-bold text-gray-900">404</h1><p className="text-gray-500">Página não encontrada</p><a href="/" className="btn-primary">Ir para o início</a></div>} />
      </Routes>
    </AuthProvider>
  );
}
