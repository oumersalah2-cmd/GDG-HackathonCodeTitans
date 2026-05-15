import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, LogOut, LayoutDashboard, Store, Menu, X, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const scrollToImpact = (e) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Small delay to allow navigation, then scroll
      setTimeout(() => {
        document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      e.preventDefault();
      document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
              <div className="bg-gradient-to-br from-primary-500 to-emerald-500 p-2 rounded-xl group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all duration-300">
                <Sprout className="h-5 w-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-800">
                Agri<span className="text-primary-600">Gate</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <a 
              href="#impact"
              onClick={scrollToImpact}
              className="px-4 py-2 rounded-xl font-medium text-sm text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Our Impact
            </a>

            {user ? (
              <>
                {user.role === 'buyer' && (
                  <Link 
                    to="/marketplace" 
                    className={`px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all ${
                      isActive('/marketplace') 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    Marketplace
                  </Link>
                )}
                <Link 
                  to={user.role === 'farmer' ? '/farmer' : '/buyer'} 
                  className={`px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-1.5 transition-all ${
                    isActive('/farmer') || isActive('/buyer')
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                
                <div className="h-8 w-px bg-slate-200 mx-3"></div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800 leading-tight">{user.name}</span>
                      <span className="text-xs text-primary-600 font-medium capitalize leading-tight">{user.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-3">
                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium text-sm transition-colors px-4 py-2 rounded-xl hover:bg-slate-50">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-primary-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            <a href="#impact" onClick={scrollToImpact} className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium cursor-pointer">
              Our Impact
            </a>
            {user ? (
              <>
                {user.role === 'buyer' && (
                  <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium">
                    <Store className="h-5 w-5 text-slate-400" /> Marketplace
                  </Link>
                )}
                <Link to={user.role === 'farmer' ? '/farmer' : '/buyer'} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium">
                  <LayoutDashboard className="h-5 w-5 text-slate-400" /> Dashboard
                </Link>
                <div className="border-t border-slate-100 my-2"></div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{user.name}</p>
                      <p className="text-xs text-primary-600 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-medium">
                  <User className="h-5 w-5 text-slate-400" /> Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block text-center bg-gradient-to-r from-primary-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold mt-2">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
