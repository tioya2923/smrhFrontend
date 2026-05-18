import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'O Seminário', href: '/seminario' },
  { label: 'Deus Chama-me?', href: '/vocacao' },
  { label: 'Comunidade', href: '/comunidade' },
  { label: 'Formação', href: '/formacao' },
  { label: 'Como Ajudar', href: '/ajudar' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contactos', href: '/contactos' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAdmin, isStaff } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
    setProfileOpen(false);
  }

  return (
    <nav className="bg-dark-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center font-bold text-lg">✝</div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">Seminário Maior</div>
              <div className="text-xs text-primary-300 leading-tight">de Cristo Rei</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-dark-700 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-dark-700 hover:bg-dark-800 px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.nome?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block max-w-[120px] truncate">{user.nome?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 text-gray-800 py-1 z-50">
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                      <LayoutDashboard size={16} /> Painel
                    </Link>
                    <Link to="/dashboard/perfil" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                      <User size={16} /> Perfil
                    </Link>
                    {(isAdmin || isStaff) && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50">
                        <LayoutDashboard size={16} /> Administração
                      </Link>
                    )}
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 text-red-600 w-full">
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-1.5 px-4">
                Entrar
              </Link>
            )}
            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md hover:bg-dark-700">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-dark-800 border-t border-dark-700">
          {navItems.map(item => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm font-medium border-b border-dark-700 ${isActive ? 'text-primary-400 bg-dark-700' : 'text-gray-300'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
