import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Try to load user from localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agri_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('agri_listings');
    return saved ? JSON.parse(saved) : [
      { id: 1, farmerId: 1, farmerName: 'Abebe Bikila', cropType: 'Teff', quantity: 50, pricePerKg: 120, location: 'Oromia', status: 'active', image: 'https://image.pollinations.ai/prompt/Teff%20grain%20harvest%20Ethiopian%20golden%20seeds%20close%20up%20professional%20food%20photography?width=600&height=400&nologo=true' },
      { id: 2, farmerId: 2, farmerName: 'Tirunesh Dibaba', cropType: 'Coffee', quantity: 20, pricePerKg: 450, location: 'SNNPR', status: 'active', image: 'https://image.pollinations.ai/prompt/Ethiopian%20coffee%20beans%20fresh%20roasted%20close%20up%20professional%20photography?width=600&height=400&nologo=true' },
      { id: 3, farmerId: 1, farmerName: 'Abebe Bikila', cropType: 'Wheat', quantity: 100, pricePerKg: 80, location: 'Oromia', status: 'active', image: 'https://image.pollinations.ai/prompt/Golden%20wheat%20grain%20harvest%20close%20up%20professional%20food%20photography?width=600&height=400&nologo=true' },
      { id: 4, farmerId: 3, farmerName: 'Haile Gebrselassie', cropType: 'Maize', quantity: 200, pricePerKg: 65, location: 'Amhara', status: 'active', image: 'https://image.pollinations.ai/prompt/Fresh%20yellow%20maize%20corn%20cobs%20harvest%20professional%20food%20photography?width=600&height=400&nologo=true' },
      { id: 5, farmerId: 2, farmerName: 'Tirunesh Dibaba', cropType: 'Sorghum', quantity: 150, pricePerKg: 70, location: 'SNNPR', status: 'active', image: 'https://image.pollinations.ai/prompt/Red%20sorghum%20grain%20seeds%20close%20up%20professional%20food%20photography?width=600&height=400&nologo=true' },
      { id: 6, farmerId: 3, farmerName: 'Haile Gebrselassie', cropType: 'Barley', quantity: 80, pricePerKg: 75, location: 'Amhara', status: 'active', image: 'https://image.pollinations.ai/prompt/Barley%20grain%20seeds%20golden%20harvest%20professional%20food%20photography?width=600&height=400&nologo=true' }
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('agri_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agri_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agri_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('agri_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const addListing = (listing) => {
    setListings([...listings, { ...listing, id: Date.now(), status: 'active' }]);
  };

  const updateListing = (id, updates) => {
    setListings(listings.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteListing = (id) => {
    setListings(listings.filter(l => l.id !== id));
  };

  const placeOrder = (order) => {
    setOrders([...orders, { ...order, id: Date.now(), date: new Date().toISOString(), status: 'pending' }]);
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      listings,
      addListing,
      updateListing,
      deleteListing,
      orders,
      placeOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};
