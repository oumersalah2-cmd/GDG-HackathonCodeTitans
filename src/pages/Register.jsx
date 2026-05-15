import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Sprout, Store, MapPin, Phone, User, Briefcase, Building, Leaf } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAppContext();
  
  const [role, setRole] = useState('farmer'); // 'farmer' or 'buyer'
  
  // Common
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Farmer specific
  const [region, setRegion] = useState('Oromia');
  const [cropTypes, setCropTypes] = useState('');
  const [referredBy, setReferredBy] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || '';
  });
  
  // Buyer specific
  const [businessName, setBusinessName] = useState('');
  const [subCity, setSubCity] = useState('');
  const [volume, setVolume] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Create mock user object based on role
    const newUser = {
      id: Date.now(),
      role,
      name,
      phone,
      ...(role === 'farmer' ? {
        region,
        cropTypes: cropTypes.split(',').map(c => c.trim()),
        referralCode: `FARM-${Math.floor(1000 + Math.random() * 9000)}`,
        referredBy: referredBy.trim() || null,
        rewards: 0
      } : {
        businessName,
        subCity,
        volume,
        referredBy: referredBy.trim() || null
      })
    };

    // Save to global users list
    const existingUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
    localStorage.setItem('agri_users', JSON.stringify([...existingUsers, newUser]));

    login(newUser);
    navigate(role === 'farmer' ? '/farmer' : '/buyer');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-200/50 blur-[80px]"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-emerald-200/50 blur-[80px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="glass p-8 rounded-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create an Account</h2>
            <p className="text-slate-500">Join AgriGate to buy or sell produce.</p>
          </div>

          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'farmer' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Sprout className="h-4 w-4" />
              I'm a Farmer
            </button>
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'buyer' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Store className="h-4 w-4" />
              I'm a Buyer
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                  placeholder="Abebe Bikila"
                />
              </div>
            </div>

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
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                  placeholder="0911234567"
                />
              </div>
            </div>

            {role === 'farmer' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Region</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-colors"
                    >
                      <option>Addis Ababa</option>
                      <option>Amhara</option>
                      <option>Oromia</option>
                      <option>SNNPR</option>
                      <option>Tigray</option>
                      <option>Sidama</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Crop Types</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={cropTypes}
                      onChange={(e) => setCropTypes(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                      placeholder="e.g. Teff, Coffee, Wheat"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Referral Code (Optional)</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={referredBy}
                      onChange={(e) => setReferredBy(e.target.value)}
                      className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                      placeholder="e.g. FARM-1234"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Business Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                      placeholder="Bikila Groceries"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sub-City</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building className="h-5 w-5" />
                    </div>
                    <select
                      value={subCity}
                      onChange={(e) => setSubCity(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-colors"
                    >
                      <option value="">Select Sub-city</option>
                      <option>Bole</option>
                      <option>Kirkos</option>
                      <option>Yeka</option>
                      <option>Lideta</option>
                      <option>Nifas Silk-Lafto</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Volume Needed</label>
                  <input
                    type="text"
                    required
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="block w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 placeholder-slate-400 transition-colors"
                    placeholder="e.g. 500 kg"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 hover:shadow-lg hover:-translate-y-0.5 transition-all mt-4"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
