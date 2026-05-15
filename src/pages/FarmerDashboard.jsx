import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Edit2, Trash2, CheckCircle2, TrendingUp, Copy, Sparkles, Brain, Zap, Gift, Users, BarChart3, Package } from 'lucide-react';

export default function FarmerDashboard() {
  const { user, listings, addListing, updateListing, deleteListing } = useAppContext();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [cropType, setCropType] = useState('Teff');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState(user.region || 'Addis Ababa');
  
  const [suggestedPrice, setSuggestedPrice] = useState(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const farmerListings = listings.filter(l => l.farmerId === user.id);

  // Calculate Referral Rewards
  const allUsers = JSON.parse(localStorage.getItem('agri_users') || '[]');
  const referredCount = allUsers.filter(u => u.referredBy === user.referralCode).length;
  const totalRewards = referredCount * 50;

  const handleGetAIPricing = () => {
    setIsGeneratingPrice(true);
    setAiAnalysis(null);
    // Mocking Claude AI call
    setTimeout(() => {
      let base = 100;
      let demandLevel = 'Moderate';
      let trend = 'Stable';
      let confidence = 87;
      
      if (cropType === 'Teff') { base = 120; demandLevel = 'High'; trend = 'Rising'; confidence = 92; }
      if (cropType === 'Coffee') { base = 400; demandLevel = 'Very High'; trend = 'Rising'; confidence = 95; }
      if (cropType === 'Wheat') { base = 80; demandLevel = 'Moderate'; trend = 'Stable'; confidence = 88; }
      if (cropType === 'Maize') { base = 65; demandLevel = 'Low'; trend = 'Declining'; confidence = 82; }
      
      const suggested = base + Math.floor(Math.random() * 20);
      const minPrice = Math.floor(suggested * 0.85);
      const maxPrice = Math.floor(suggested * 1.15);
      
      setSuggestedPrice(suggested);
      setFinalPrice(suggested);
      setAiAnalysis({
        demandLevel,
        trend,
        confidence,
        minPrice,
        maxPrice,
        reasoning: `Based on current ${cropType} market data in ${location}, seasonal demand patterns, and regional supply levels.`
      });
      setIsGeneratingPrice(false);
    }, 2000);
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
    setAiAnalysis(null);
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
        <button 
          onClick={() => setShowAddModal(true)}
          className="group relative bg-gradient-to-r from-primary-600 via-primary-600 to-emerald-600 text-white pl-5 pr-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-0.5 flex items-center gap-3 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative flex items-center gap-3">
            <span className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Plus className="h-4.5 w-4.5" />
            </span>
            <span className="text-[15px]">List New Produce</span>
          </span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{farmerListings.filter(l => l.status === 'active').length}</p>
          <p className="text-sm text-slate-500 mt-1">Active Listings</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Total</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
          <p className="text-sm text-slate-500 mt-1">Total Sold (kg)</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <Users className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">{referredCount}</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{referredCount}</p>
          <p className="text-sm text-slate-500 mt-1">Referrals Made</p>
        </div>

        {/* Referral Card - Featured */}
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-emerald-600 p-6 rounded-2xl shadow-lg shadow-primary-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-4 -mb-4"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <Gift className="h-5 w-5 text-white/80" />
              <button onClick={copyReferral} className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white" title="Copy referral link">
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="text-2xl font-bold text-white font-mono tracking-wider">{user.referralCode || 'FARM-1234'}</p>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-white/70">Earned Rewards</p>
              <p className="text-sm font-bold text-white">{totalRewards} ETB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Listings */}
      <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
        Your Listings
        <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">{farmerListings.length}</span>
      </h2>
      {farmerListings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-slate-500 mb-2">You haven't listed any produce yet.</p>
          <p className="text-sm text-slate-400">Click "List New Produce" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmerListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-48 overflow-hidden relative">
                <img src={listing.image} alt={listing.cropType} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                  {listing.pricePerKg} ETB/kg
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{listing.cropType}</h3>
                    <p className="text-slate-500 text-sm">{listing.location}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${listing.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                    {listing.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="text-slate-700 font-medium">{listing.quantity} kg</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">Listed {new Date(listing.id).toLocaleDateString()}</span>
                </div>
                
                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button onClick={() => updateListing(listing.id, { status: listing.status === 'active' ? 'sold' : 'active' })} className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-medium transition-colors">
                    Mark {listing.status === 'active' ? 'Sold' : 'Active'}
                  </button>
                  <button onClick={() => deleteListing(listing.id)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== ADD LISTING MODAL ===== */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200/50">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-slate-900">List New Produce</h3>
                <p className="text-sm text-slate-500">Get AI-powered pricing suggestions</p>
              </div>
              <button onClick={() => { setShowAddModal(false); setAiAnalysis(null); setSuggestedPrice(null); }} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors text-xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleAddListing} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Crop Type</label>
                  <input 
                    list="crop-options" 
                    value={cropType} 
                    onChange={e => setCropType(e.target.value)} 
                    className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" 
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
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity (kg)</label>
                  <input type="number" required value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" placeholder="e.g. 100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Pickup Location</label>
                <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 text-slate-900 transition-all" />
              </div>

              {/* ===== AI SUGGESTION SECTION ===== */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* Animated border glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-400 to-violet-600 rounded-2xl opacity-20 ai-shimmer"></div>
                
                <div className="relative bg-gradient-to-br from-violet-50 via-white to-purple-50 border-2 border-violet-200 rounded-2xl p-5">
                  {/* AI Header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30 ai-pulse">
                        <Brain className="h-5.5 w-5.5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                          AI Suggestion
                          <Sparkles className="h-5 w-5 text-violet-500" />
                        </h4>
                        <p className="text-xs text-violet-600 font-medium">Powered by Claude AI Engine</p>
                      </div>
                    </div>
                    {!suggestedPrice && (
                      <button 
                        type="button" 
                        onClick={handleGetAIPricing}
                        disabled={isGeneratingPrice || !cropType}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/35 flex items-center gap-2"
                      >
                        {isGeneratingPrice ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4" />
                            Get AI Price
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Loading State */}
                  {isGeneratingPrice && (
                    <div className="space-y-3 py-4">
                      <div className="flex items-center gap-3 text-sm text-violet-700">
                        <div className="w-5 h-5 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin"></div>
                        <span className="font-medium">Analyzing market data for {cropType} in {location}...</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-violet-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full ai-shimmer" style={{width: '70%'}}></div>
                        </div>
                        <div className="flex gap-3 text-xs text-violet-500 font-medium">
                          <span className="sparkle-dot">● Regional supply</span>
                          <span className="sparkle-dot" style={{animationDelay: '0.5s'}}>● Seasonal trends</span>
                          <span className="sparkle-dot" style={{animationDelay: '1s'}}>● Demand scoring</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* AI Results */}
                  {suggestedPrice && aiAnalysis && (
                    <div className="space-y-4">
                      {/* Price Display */}
                      <div className="bg-white rounded-xl p-4 border border-violet-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-violet-600">AI Suggested Price</span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-xs font-semibold text-emerald-600">{aiAnalysis.confidence}% confidence</span>
                          </div>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-4xl font-extrabold text-slate-900">{suggestedPrice}</span>
                          <span className="text-lg font-semibold text-slate-400 mb-1">ETB/kg</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-400">Range:</span>
                            <span className="text-xs font-semibold text-slate-600">{aiAnalysis.minPrice} – {aiAnalysis.maxPrice} ETB</span>
                          </div>
                        </div>
                      </div>

                      {/* Analysis Grid */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                          <p className="text-xs text-slate-400 mb-0.5">Demand</p>
                          <p className={`text-sm font-bold ${aiAnalysis.demandLevel === 'Very High' || aiAnalysis.demandLevel === 'High' ? 'text-emerald-600' : aiAnalysis.demandLevel === 'Moderate' ? 'text-amber-600' : 'text-red-500'}`}>
                            {aiAnalysis.demandLevel}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                          <p className="text-xs text-slate-400 mb-0.5">Trend</p>
                          <p className={`text-sm font-bold ${aiAnalysis.trend === 'Rising' ? 'text-emerald-600' : aiAnalysis.trend === 'Stable' ? 'text-blue-600' : 'text-red-500'}`}>
                            {aiAnalysis.trend} {aiAnalysis.trend === 'Rising' ? '↑' : aiAnalysis.trend === 'Declining' ? '↓' : '→'}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-3 border border-slate-100 text-center">
                          <p className="text-xs text-slate-400 mb-0.5">Region</p>
                          <p className="text-sm font-bold text-slate-700">{location}</p>
                        </div>
                      </div>

                      {/* AI Reasoning */}
                      <div className="bg-violet-50 rounded-lg px-4 py-3 border border-violet-100">
                        <div className="flex items-start gap-2">
                          <Brain className="h-4 w-4 text-violet-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-violet-700 leading-relaxed">{aiAnalysis.reasoning}</p>
                        </div>
                      </div>

                      {/* Final Price Input */}
                      <div className="bg-white rounded-xl p-4 border-2 border-primary-200">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Your Final Price (ETB/kg)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            required 
                            value={finalPrice} 
                            onChange={e => setFinalPrice(e.target.value)} 
                            className="w-full p-3 pr-16 border border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-slate-50 transition-all" 
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">ETB/kg</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5">You can adjust the AI suggestion to set your own price.</p>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {!isGeneratingPrice && !suggestedPrice && (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-3 float-animation">
                        <Sparkles className="h-6 w-6 text-violet-500" />
                      </div>
                      <p className="text-sm text-slate-500">Click <span className="font-semibold text-violet-600">"Get AI Price"</span> to receive an intelligent pricing suggestion based on real-time market analysis.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => { setShowAddModal(false); setAiAnalysis(null); setSuggestedPrice(null); }} className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!finalPrice} className="px-6 py-3 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
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

