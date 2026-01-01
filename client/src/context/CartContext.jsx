import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        const existItem = cartItems.find((x) => x._id === item._id);
        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, qty: 1 }]);
        }
    };

    const decreaseQty = (id) => {
        const existItem = cartItems.find((x) => x._id === id);
        if (existItem.qty === 1) {
            removeFromCart(id);
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x._id === id ? { ...x, qty: x.qty - 1 } : x
                )
            );
        }
    }

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, decreaseQty, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
