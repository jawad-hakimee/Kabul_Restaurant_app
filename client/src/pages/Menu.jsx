import React, { useEffect, useState } from 'react';
import { fetchFoodItems } from '../api';
import { useCart } from '../context/CartContext';

const Menu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [filter, setFilter] = useState('All');
    const { addToCart } = useCart();

    useEffect(() => {
        // Enhanced Mock Data
        const mockData = [
            { _id: '64f8c6e7d9c1e0a2b0b1a001', name: 'Kabuli Pulao', description: 'National dish of Afghanistan. Steamed rice mixed with raisins, carrots, and lamb.', price: 18, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop', category: 'Rice' },
            { _id: '64f8c6e7d9c1e0a2b0b1a002', name: 'Mantu', description: 'Steamed dumplings filled with spiced ground beef and onions, topped with yogurt and lentils.', price: 14, image: 'https://images.unsplash.com/photo-1599354605996-5fc185075671?q=80&w=1974&auto=format&fit=crop', category: 'Appetizer' },
            { _id: '64f8c6e7d9c1e0a2b0b1a003', name: 'Lamb Tikka Kebab', description: 'Tender chunks of lamb marinated in Afghan spices and grilled to perfection.', price: 20, image: 'https://images.unsplash.com/photo-1599021406646-3b957551062f?q=80&w=2074&auto=format&fit=crop', category: 'Kebab' },
            { _id: '64f8c6e7d9c1e0a2b0b1a004', name: 'Chicken Kebab', description: 'Juicy chicken breast skewers marinated in yogurt and spices.', price: 16, image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6f54262?q=80&w=2070&auto=format&fit=crop', category: 'Kebab' },
            { _id: '64f8c6e7d9c1e0a2b0b1a005', name: 'Bolani', description: 'Crispy flatbread filled with potatoes, scallions, and herbs. Served with yogurt sauce.', price: 10, image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=2080&auto=format&fit=crop', category: 'Appetizer' },
            { _id: '64f8c6e7d9c1e0a2b0b1a006', name: 'Qabuli Burger', description: 'Afghan style street burger with fries and special sauce.', price: 12, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop', category: 'Fast Food' },
        ];
        setFoodItems(mockData);
    }, []);

    const filteredItems = filter === 'All' ? foodItems : foodItems.filter(item => item.category === filter);
    const categories = ['All', ...new Set(foodItems.map(item => item.category))];

    return (
        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">Our Authentic Menu</h1>

            {/* Category Filter */}
            <div className="flex justify-center space-x-4 mb-10 overflow-x-auto">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full font-semibold transition ${filter === cat ? 'bg-primary text-secondary' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                    <div key={item._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden flex flex-col">
                        <div className="h-56 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition duration-500 hover:scale-110" />
                        </div>
                        <div className="p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">{item.category}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{item.description}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                <span className="text-2xl font-bold text-primary">${item.price}</span>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="btn-primary py-2 px-4 shadow-md hover:shadow-lg"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
