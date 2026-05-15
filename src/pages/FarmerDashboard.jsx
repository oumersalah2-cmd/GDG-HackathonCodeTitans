import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Plus, Trash2, TrendingUp, Copy, Sparkles, Brain, Gift, Users, BarChart3, Package, ArrowRight } from 'lucide-react';

export default function FarmerDashboard() {
  const { user, listings, addListing, updateListing, deleteListing } = useAppContext();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [cropType, setCropType] = useState('Teff');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState(user.region || 'Addis Ababa');
  const [finalPrice, setFinalPrice] = useState('');

  const farmerListings = listings.filter(l => l.farmerId === user.id);

  // Calculate Referral Rewards
  const allUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
  const referredCount = allUsers.filter(u => u.referredBy === user.referralCode).length;
  const totalRewards = referredCount * 50;

  const handleAddListing = (e) => {
    e.preventDefault();
    if (!finalPrice) return;

    addListing({
      farmerId: user.id,
      farmerName: user.name,
      cropType,
      quantity: Number(quantity),
      pricePerKg: Number(finalPrice),
      location,
      image: `https://image.pollinations.ai/prompt/${encodeURIComponent(cropType + ' fresh crop harvest professional photography')}?width=500&height=500&nologo=true`
    });

    setShowAddModal(false);
    setCropType('Teff');
    setQuantity('');
    setFinalPrice('');
  };

  const copyReferral = () => {
    const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!\n\n' + referralLink);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-1">Dashboard</p>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, {user.name} 👋</h1>
          <p className="text-slate-500 mt-1">Manage your produce listings and track your performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            to="/ai"
            className="group relative bg-gradient-to-r from-violet-600 to-purple-600 text-white pl-5 pr-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 flex items-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span className="text-[15px]">AI Pricing</span>
            </span>
          </Link>
          <button 
            onClick={() => setShowAddModal(true)}
            className="group relative bg-gradient-to-r from-primary-600 via-primary-600 to-emerald-600 text-white pl-5 pr-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-0.5 flex items-center gap-3 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative flex items-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-[15px]">List Produce</span>
            </span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"><Package className="h-5 w-5 text-blue-600" /></div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{farmerListings.filter(l => l.status === 'active').length}</p>
          <p className="text-sm text-slate-500 mt-1">Active Listings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center"><BarChart3 className="h-5 w-5 text-emerald-600" /></div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Total</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
          <p className="text-sm text-slate-500 mt-1">Total Sold (kg)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center"><Users className="h-5 w-5 text-amber-600" /></div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{referredCount}</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{referredCount}</p>
          <p className="text-sm text-slate-500 mt-1">Referrals Made</p>
        </div>

        {/* Referral Card */}
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-emerald-600 p-6 rounded-2xl shadow-lg shadow-primary-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-4 -mb-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Gift className="h-5 w-5 text-white/80" />
              <button onClick={copyReferral} className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white" title="Copy referral link"><Copy className="h-4 w-4" /></button>
            </div>
            <p className="text-2xl font-bold text-white font-mono tracking-wider">{user.referralCode || 'FARM-1234'}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-white/70">Earned Rewards</p>
              <p className="text-sm font-bold text-white">{totalRewards} ETB</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI CTA Banner */}
      <div className="mb-8 bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 border border-violet-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/20">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Need help with pricing?</h3>
            <p className="text-sm text-slate-500">Use our AI assistant to get fair price suggestions for your crops.</p>
          </div>
        </div>
        <Link to="/ai" className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all flex items-center gap-2 whitespace-nowrap">
          Open AI Assistant <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Listings */}
      <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
        Your Listings
        <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">{farmerListings.length}</span>
      </h2>
      {farmerListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><Package className="h-8 w-8 text-slate-400" /></div>
          <p className="text-slate-500 mb-2">You haven't listed any produce yet.</p>
          <p className="text-sm text-slate-400">Click "List Produce" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img src={listing.image} alt={listing.cropType} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-slate-900 shadow-sm">{listing.pricePerKg} ETB/kg</div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div><h3 className="font-bold text-lg text-slate-900">{listing.cropType}</h3><p className="text-slate-500 text-sm">{listing.location}</p></div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${listing.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>{listing.status}</span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="text-slate-700 font-medium">{listing.quantity} kg</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">Listed {new Date(listing.id).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button onClick={() => updateListing(listing.id, { status: listing.status === 'active' ? 'sold' : 'active' })} className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-medium transition-colors">Mark {listing.status === 'active' ? 'Sold' : 'Active'}</button>
                  <button onClick={() => deleteListing(listing.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"><Trash2 className="h-5 w-5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== SIMPLIFIED ADD LISTING MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200/50">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <div><h3 className="font-bold text-lg text-slate-900">List New Produce</h3><p className="text-sm text-slate-500">Set your crop details and price</p></div>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleAddListing} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Crop Type</label>
                  <input list="crop-options" value={cropType} onChange={e => setCropType(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" placeholder="e.g. Tomato" required />
                  <datalist id="crop-options"><option value="Teff" /><option value="Coffee" /><option value="Wheat" /><option value="Maize" /><option value="Chat" /></datalist>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity (kg)</label>
                  <input type="number" required value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" placeholder="e.g. 100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Pickup Location</label>
                <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price (ETB/kg)</label>
                <input type="number" required value={finalPrice} onChange={e => setFinalPrice(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" placeholder="e.g. 120" />
                <Link to="/ai" onClick={() => setShowAddModal(false)} className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-700 mt-2 transition-colors">
                  <Brain className="h-3.5 w-3.5" /> Not sure? Get AI Price Suggestion
                </Link>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-colors">Cancel</button>
                <button type="submit" disabled={!finalPrice} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all">Publish Listing</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
