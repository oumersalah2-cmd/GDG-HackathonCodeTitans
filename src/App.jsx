import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Marketplace from './pages/Marketplace';
import { useAppContext } from './context/AppContext';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAppContext();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'farmer' ? '/farmer' : '/buyer'} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === 'farmer' ? '/farmer' : '/buyer'} />} />
          
          {/* Marketplace for buyers */}
          <Route path="/marketplace" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <Marketplace />
            </ProtectedRoute>
          } />
          
          {/* Farmer Routes */}
          <Route path="/farmer/*" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } />
          
          {/* Buyer Routes */}
          <Route path="/buyer/*" element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
