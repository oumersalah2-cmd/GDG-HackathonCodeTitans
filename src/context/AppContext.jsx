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
      { id: 1, farmerId: 1, farmerName: 'Abebe Bikila', cropType: 'Teff', quantity: 50, pricePerKg: 120, location: 'Oromia', status: 'active', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80' },
      { id: 2, farmerId: 2, farmerName: 'Tirunesh Dibaba', cropType: 'Coffee', quantity: 20, pricePerKg: 450, location: 'SNNPR', status: 'active', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=500&q=80' },
      { id: 3, farmerId: 1, farmerName: 'Abebe Bikila', cropType: 'Wheat', quantity: 100, pricePerKg: 80, location: 'Oromia', status: 'active', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80' }
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
