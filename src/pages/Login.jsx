import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Phone, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // For demo purposes, we will just login as farmer or buyer based on phone number length 
    // or just assume farmer by default if not previously registered
    const users = JSON.parse(localStorage.getItem('agri_users') || '[]');
    const existingUser = users.find(u => u.phone === phone);
    
    if (existingUser) {
      login(existingUser);
      navigate(existingUser.role === 'farmer' ? '/farmer' : '/buyer');
    } else {
      // Mock login if user not found, useful for testing
      const mockUser = {
        id: Date.now(),
        role: phone.startsWith('092') ? 'buyer' : 'farmer',
        name: 'Demo User',
        phone: phone,
        region: 'Oromia',
        cropTypes: ['Teff']
      };
      login(mockUser);
      navigate(mockUser.role === 'farmer' ? '/farmer' : '/buyer');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full bg-primary-200/50 blur-[80px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass p-8 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Log in to your AgriGate account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-colors"
                  placeholder="0911234567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all mt-4"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
