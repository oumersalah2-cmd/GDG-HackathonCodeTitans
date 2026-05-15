import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Filter, Sparkles, MapPin, ChevronRight, Check } from 'lucide-react';

export default function Marketplace() {
  const { user, listings, placeOrder } = useAppContext();
  
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [paymentAccount, setPaymentAccount] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const activeListings = listings.filter(l => l.status === 'active');

  const filteredListings = useMemo(() => {
    return activeListings.filter(l => {
      const matchesType = filterType === 'All' || l.cropType === filterType;
      const matchesSearch = l.cropType.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            l.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activeListings, filterType, searchQuery]);

  // Mock Smart Match
  const smartMatches = useMemo(() => {
    return [...activeListings]
      .sort((a, b) => a.pricePerKg - b.pricePerKg)
      .slice(0, 3);
  }, [activeListings]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!orderQuantity || !selectedListing) return;

    placeOrder({
      buyerId: user.id,
      buyerName: user.name || user.businessName,
      listingId: selectedListing.id,
      farmerId: selectedListing.farmerId,
      cropType: selectedListing.cropType,
      quantity: Number(orderQuantity),
      totalPrice: Number(orderQuantity) * selectedListing.pricePerKg,
      paymentMethod
    });

    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedListing(null);
      setOrderQuantity('');
      setPaymentAccount('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Marketplace</h1>
          <p className="text-slate-500">Find the freshest produce directly from farmers.</p>
        </div>
      </div>

      {/* Smart Match Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-emerald-500" />
          <h2 className="text-xl font-bold text-slate-900">AI Smart Matches for You</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {smartMatches.map(listing => (
            <div key={`smart-${listing.id}`} className="bg-gradient-to-b from-emerald-50 to-white rounded-2xl border border-emerald-100 p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img src={listing.image} alt={listing.cropType} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-slate-900">{listing.cropType}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {listing.location}
                    </p>
                  </div>
                </div>
                <div className="bg-white px-2 py-1 rounded text-emerald-700 font-bold text-sm shadow-sm border border-emerald-50">
                  {listing.pricePerKg} ETB
                </div>
              </div>
              <div className="text-sm text-slate-600 mb-4">
                <p>Farmer: <span className="font-medium text-slate-900">{listing.farmerName}</span></p>
                <p>Available: <span className="font-medium text-slate-900">{listing.quantity} kg</span></p>
              </div>
              <button 
                onClick={() => setSelectedListing(listing)}
                className="w-full py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2"
              >
                Place Order <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Browse Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white shadow-sm"
            placeholder="Search by crop or location..."
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Teff', 'Coffee', 'Wheat', 'Maize'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-colors ${
                filterType === type 
                  ? 'bg-slate-900 text-white' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredListings.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500">No listings found matching your criteria.</p>
          </div>
        ) : (
          filteredListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm card-hover flex flex-col">
              <div className="h-40 overflow-hidden relative">
                <img src={listing.image} alt={listing.cropType} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900">{listing.cropType}</h3>
                  <span className="font-bold text-primary-700">{listing.pricePerKg} ETB/kg</span>
                </div>
                <div className="text-sm text-slate-500 mb-4 space-y-1">
                  <p className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {listing.location}</p>
                  <p>Farmer: {listing.farmerName}</p>
                  <p>Qty: {listing.quantity} kg</p>
                </div>
                <button 
                  onClick={() => setSelectedListing(listing)}
                  className="mt-auto w-full py-2.5 bg-slate-100 hover:bg-primary-600 hover:text-white text-slate-700 rounded-xl font-medium transition-colors"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order Modal */}
      {selectedListing && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            {orderSuccess ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Order Placed!</h3>
                <p className="text-slate-500 mb-6">Your payment has been secured and the farmer has been notified.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-lg">Complete Order</h3>
                  <button onClick={() => setSelectedListing(null)} className="text-slate-400 hover:text-slate-600">&times;</button>
                </div>
                
                <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                    <img src={selectedListing.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                    <div>
                      <h4 className="font-bold text-slate-900">{selectedListing.cropType}</h4>
                      <p className="text-sm text-slate-500">{selectedListing.pricePerKg} ETB / kg</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Quantity (kg) <span className="text-slate-400 font-normal">Max: {selectedListing.quantity}</span></label>
                    <input 
                      type="number" 
                      required 
                      max={selectedListing.quantity}
                      value={orderQuantity} 
                      onChange={e => setOrderQuantity(e.target.value)} 
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-primary-500" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div 
                        onClick={() => setPaymentMethod('telebirr')}
                        className={`border rounded-xl p-3 cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentMethod === 'telebirr' ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">TB</div>
                        <span className="text-sm font-medium">Telebirr</span>
                      </div>
                      <div 
                        onClick={() => setPaymentMethod('cbe')}
                        className={`border rounded-xl p-3 cursor-pointer flex flex-col items-center gap-2 transition-all ${paymentMethod === 'cbe' ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-slate-200 hover:border-slate-300'}`}
                      >
                        <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xs">CBE</div>
                        <span className="text-sm font-medium">CBE Birr</span>
                      </div>
                    </div>
                    <input 
                      type="text" 
                      required
                      value={paymentAccount}
                      onChange={e => setPaymentAccount(e.target.value)}
                      placeholder={paymentMethod === 'telebirr' ? 'Enter Telebirr Number (e.g. 0911...)' : 'Enter CBE Account Number'} 
                      className="w-full p-3 border border-slate-200 rounded-xl focus:ring-primary-500 text-sm" 
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-slate-500">Total Amount</p>
                      <p className="text-2xl font-bold text-slate-900">
                        {orderQuantity ? (Number(orderQuantity) * selectedListing.pricePerKg).toLocaleString() : 0} ETB
                      </p>
                    </div>
                    <button 
                      type="submit" 
                      disabled={!orderQuantity || Number(orderQuantity) <= 0 || Number(orderQuantity) > selectedListing.quantity || !paymentAccount.trim()}
                      className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      Pay Now
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
