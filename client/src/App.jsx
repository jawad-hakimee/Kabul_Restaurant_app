import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Tracking from './pages/Tracking';
import MyOrders from './pages/MyOrders';
import VerificationSent from './pages/VerificationSent';
import VerifyAccount from './pages/VerifyAccount';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="min-h-screen bg-gray-50 text-secondary font-sans flex flex-col">
                    <Navbar />
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/tracking" element={<Tracking />} />
                            <Route path="/orders" element={<MyOrders />} />
                            <Route path="/verification-sent" element={<VerificationSent />} />
                            <Route path="/verify-account" element={<VerifyAccount />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/admin" element={<Admin />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </CartProvider>
        </AuthProvider>
    )
}

export default App;
