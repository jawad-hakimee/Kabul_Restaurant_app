import React, { useEffect, useState } from 'react';
import { fetchFoodItems } from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [filter, setFilter] = useState('All');
    const { addToCart } = useCart();
    const { user } = useAuth();

    useEffect(() => {
        const mockData = [
            {
                _id: 'afg_001',
                name: 'Kabuli Pulao',
                description: 'The crown jewel of Afghan cuisine. Fragrant basmati rice topped with tender lamb, sweet raisins, and caramelized carrots.',
                price: 18,
                image: 'https://www.thedeliciouscrescent.com/wp-content/uploads/2024/08/Kabuli-Pulao-1.jpg',
                category: 'Rice'
            },
            {
                _id: 'afg_002',
                name: 'Mantu',
                description: 'Hand-crafted steamed dumplings filled with spiced ground beef and onions, topped with a garlic yogurt sauce and lentil gravy.',
                price: 14,
                image: 'https://www.healthyfood.com/wp-content/uploads/2016/11/Afghani-lamb-mantu.jpg',
                category: 'Appetizer'
            },
            {
                _id: 'afg_003',
                name: 'Lamb Tikka Kebab',
                description: 'Succulent chunks of lamb marinated in a secret blend of Afghan spices, char-grilled to juicy perfection.',
                price: 20,
                image: 'https://cookingorgeous.com/wp-content/uploads/2021/06/lamb-shish-kebab-20.jpg',
                category: 'Kebab'
            },
            {
                _id: 'afg_004',
                name: 'Chicken Kebab',
                description: 'Tender chicken breast marinated in yogurt and saffron, grilled on skewers for a delicate, smoky flavor.',
                price: 16,
                image: 'https://images.unsplash.com/photo-1532636875304-0c89119d9b4d?q=80&w=2070&auto=format&fit=crop',
                category: 'Kebab'
            },
            {
                _id: 'afg_005',
                name: 'Bolani',
                description: 'Thin, crispy stuffed flatbread. Filled with seasoned potatoes and leeks, served with a tangy cilantro yogurt dip.',
                price: 10,
                image: 'https://saffronandherbs.com/wp-content/uploads/2022/01/Bolani-stuffed-with-Sweet-Potato-Leek-e1707402724178-500x500.jpg?crop=1',
                category: 'Appetizer'
            },
            {
                _id: 'afg_006',
                name: 'Kabul Burger',
                description: 'A Kabul street food icon. A juicy patty topped with crispy fries, fresh veggies, and our signature spicy sauce inside a soft bun.',
                price: 12,
                image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop',
                category: 'Fast Food'
            },
            {
                _id: 'afg_007',
                name: 'Juices',
                description: 'Freshly pressed seasonal fruit juices, chilled and served with a hint of mint. A refreshing accompaniment to any meal.',
                price: 6,
                image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=1974&auto=format&fit=crop',
                category: 'Beverage'
            },
            {
                _id: 'afg_008',
                name: 'Aushak',
                description: 'Leek-filled dumplings boiled and topped with a hearty ground meat sauce and smooth garlic yogurt sauce.',
                price: 13,
                image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1984&auto=format&fit=crop',
                category: 'Appetizer'
            },
            {
                _id: 'afg_009',
                name: 'Shawarma',
                description: 'Traditional spiced meat wraps, grilled to perfection and served with fresh salad and special garlic sauce.',
                price: 15,
                image: 'https://i.ytimg.com/vi/lx-ZAmC3j4M/maxresdefault.jpg',
                category: 'Fast Food'
            },
            {
                _id: 'afg_010',
                name: 'Chapli Kebab',
                description: 'Spiced ground beef patty, pan-fried with herbs and pomegranate seeds for a unique, tangy-savory crunch.',
                price: 17,
                image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1935&auto=format&fit=crop',
                category: 'Kebab'
            },
            {
                _id: 'afg_011',
                name: 'Sheer Yakh',
                description: 'Afghan "frozen milk" ice cream, rich with rosewater and cardamom, topped with thick cream and pistachios.',
                price: 8,
                image: 'https://i.pinimg.com/videos/thumbnails/originals/e4/ba/44/e4ba44049042576e13df0d393f07e529.0000000.jpg',
                category: 'Dessert'
            },
            {
                _id: 'afg_012',
                name: 'Ferni',
                description: 'A velvety, chilled milk pudding delicately infused with cardamom and garnished with finely crushed pistachios.',
                price: 7,
                image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1974&auto=format&fit=crop',
                category: 'Dessert'
            },
            {
                _id: 'afg_013',
                name: 'Afghan Kofta',
                description: 'Spiced meatballs simmered in a rich tomato and onion sauce with split peas, served with fresh naan.',
                price: 15,
                image: 'https://cdn.tasteatlas.com/images/dishes/b12ba277496d4c2098350105c2fa6366.jpg?m=facebook',
                category: 'Kebab'
            },
            {
                _id: 'afg_014',
                name: 'Sabzi Chalau',
                description: 'Sautéed spinach with leeks and coriander, served with aromatic white basmati rice and tender pieces of lamb.',
                price: 17,
                image: 'https://afghanfood.ch/wp-content/uploads/2022/10/Sabzi-Chalau-with-Chicken-or-meat.jpeg',
                category: 'Rice'
            },
            {
                _id: 'afg_015',
                name: 'Baghlava',
                description: 'Layers of golden, crispy filo pastry filled with crushed nuts and sweet honey syrup, dusted with cardamom.',
                price: 8,
                image: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png',
                category: 'Dessert'
            }
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
                            <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition duration-500 hover:scale-110" />
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
                                {(!user || !user.isAdmin) && (
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="btn-primary py-2 px-4 shadow-md hover:shadow-lg"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
