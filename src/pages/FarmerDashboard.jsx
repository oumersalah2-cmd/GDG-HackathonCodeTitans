import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2, CheckCircle2, TrendingUp, Copy } from 'lucide-react';

export default function FarmerDashboard() {
  const { user, listings, addListing, updateListing, deleteListing } = useAppContext();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [cropType, setCropType] = useState('Teff');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState(user.region || 'Addis Ababa');
  
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false);

  const farmerListings = listings.filter(l => l.farmerId === user.id);

  // Calculate Referral Rewards
  const allUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
  const referredCount = allUsers.filter(u => u.referredBy === user.referralCode).length;
  const totalRewards = referredCount * 50;

  const handleGetAIPricing = () => {
    setIsGeneratingPrice(true);
    // Mocking Claude AI call
    setTimeout(() => {
      let base = 100;
      if (cropType === 'Teff') base = 120;
      if (cropType === 'Coffee') base = 400;
      if (cropType === 'Wheat') base = 80;
      
      const suggested = base + Math.floor(Math.random() * 20);
      setSuggestedPrice(suggested);
      setFinalPrice(suggested);
      setIsGeneratingPrice(false);
    }, 1500);
  };

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
    setSuggestedPrice(null);
    setFinalPrice('');
  };

  const copyReferral = () => {
    const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied to clipboard!\n\n' + referralLink);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Farmer Dashboard</h1>
          <p className="text-slate-500">Welcome back, {user.name} 👋</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="h-5 w-5" />
          List New Produce
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 font-medium mb-1">Active Listings</h3>
          <p className="text-3xl font-bold text-slate-900">{farmerListings.filter(l => l.status === 'active').length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-500 font-medium mb-1">Total Sold (kg)</h3>
          <p className="text-3xl font-bold text-slate-900">0</p>
        </div>
        <div className="bg-gradient-to-br from-primary-50 to-emerald-50 p-6 rounded-2xl border border-primary-100 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-primary-800 font-medium mb-1">Referral Code</h3>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-primary-900 font-mono tracking-wider">{user.referralCode || 'FARM-1234'}</p>
              <button onClick={copyReferral} className="p-2 bg-white/50 hover:bg-white rounded-lg transition-colors text-primary-700 shadow-sm" title="Copy code">
                <Copy className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-between bg-white/60 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium text-primary-800">Earned Rewards</span>
              <span className="font-bold text-emerald-600">{totalRewards} ETB</span>
            </div>
            <p className="text-xs text-primary-600 mt-2">Earn 50 ETB for every farmer who signs up with your code!</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-4">Your Listings</h2>
      {farmerListings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-500">You haven't listed any produce yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
              <div className="h-48 overflow-hidden relative">
                <img src={listing.image} alt={listing.cropType} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-slate-900">
                  {listing.pricePerKg} ETB/kg
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{listing.cropType}</h3>
                    <p className="text-slate-500 text-sm">{listing.location}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${listing.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                    {listing.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-slate-700 font-medium">{listing.quantity} kg</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 text-sm">Listed {new Date(listing.id).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button onClick={() => updateListing(listing.id, { status: listing.status === 'active' ? 'sold' : 'active' })} className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                    Mark {listing.status === 'active' ? 'Sold' : 'Active'}
                  </button>
                  <button onClick={() => deleteListing(listing.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg">List Produce</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            
            <form onSubmit={handleAddListing} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Crop Type</label>
                  <input 
                    list="crop-options" 
                    value={cropType} 
                    onChange={e => setCropType(e.target.value)} 
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-primary-500 bg-white" 
                    placeholder="e.g. Tomato"
                    required
                  />
                  <datalist id="crop-options">
                    <option value="Teff" />
                    <option value="Coffee" />
                    <option value="Wheat" />
                    <option value="Maize" />
                    <option value="Chat" />
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity (kg)</label>
                  <input type="number" required value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-primary-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Location</label>
                <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-primary-500" />
              </div>

              {/* AI Pricing Section */}
              <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 text-primary-800 font-medium">
                    <TrendingUp className="h-5 w-5" />
                    AI Price Suggestion
                  </div>
                  {!suggestedPrice && (
                    <button 
                      type="button" 
                      onClick={handleGetAIPricing}
                      disabled={isGeneratingPrice || !cropType}
                      className="text-xs bg-primary-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50"
                    >
                      {isGeneratingPrice ? 'Analyzing...' : 'Get Suggestion'}
                    </button>
                  )}
                </div>
                
                {suggestedPrice && (
                  <div className="space-y-3">
                    <p className="text-sm text-primary-700">Claude AI suggests <strong className="text-lg">{suggestedPrice} ETB/kg</strong> based on current demand in {location}.</p>
                    <div>
                      <label className="block text-xs font-medium text-primary-800 mb-1">Your Final Price (ETB/kg)</label>
                      <input 
                        type="number" 
                        required 
                        value={finalPrice} 
                        onChange={e => setFinalPrice(e.target.value)} 
                        className="w-full p-2 border border-primary-200 rounded-lg bg-white" 
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!finalPrice} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 disabled:opacity-50 transition-colors shadow-sm">
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
