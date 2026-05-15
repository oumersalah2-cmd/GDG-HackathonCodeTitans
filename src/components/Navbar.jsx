import { Link, useNavigate } from 'react-router-dom';
import { Sprout, LogOut, User, LayoutDashboard, Store, BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-500 p-2 rounded-xl group-hover:bg-primary-600 transition-colors shadow-sm">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                Agri<span className="text-primary-600">Gate</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/impact" className="text-slate-600 hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors">
              <BarChart3 className="h-4 w-4" />
              Impact
            </Link>

            {user ? (
              <>
                {user.role === 'buyer' && (
                  <Link to="/marketplace" className="text-slate-600 hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors">
                    <Store className="h-4 w-4" />
                    Marketplace
                  </Link>
                )}
                <Link 
                  to={user.role === 'farmer' ? '/farmer' : '/buyer'} 
                  className="text-slate-600 hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                
                <div className="h-8 w-px bg-slate-200 mx-2"></div>
                
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-800">{user.name}</span>
                    <span className="text-xs text-primary-600 font-medium capitalize">{user.role}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium text-sm transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary-600 text-white px-5 py-2 rounded-full font-medium text-sm hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
