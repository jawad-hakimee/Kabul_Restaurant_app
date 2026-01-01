import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
                    Taste the Authentic <span className="text-primary">Afghan</span> Cuisine
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Experience the rich flavors of Kabul right at your doorstep. Fresh ingredients, traditional recipes, and unforgettable taste.
                </p>
                <Link to="/menu" className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 inline-block">
                    View Menu
                </Link>
            </div>

            {/* Featured Section */}
            <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1974&auto=format&fit=crop" alt="Kabuli Pulao" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Kabuli Pulao</h3>
                    <p className="text-gray-500 text-center">Traditional rice dish with carrots, raisins, and tender lamb.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1599021406646-3b957551062f?q=80&w=2074&auto=format&fit=crop" alt="Lamb Kebab" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Lamb Kebab</h3>
                    <p className="text-gray-500 text-center">Succulent grilled lamb marinated in traditional spices.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition flex flex-col items-center">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                        <img src="https://images.unsplash.com/photo-1599354605996-5fc185075671?q=80&w=1974&auto=format&fit=crop" alt="Mantu" className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Mantu</h3>
                    <p className="text-gray-500 text-center">Steamed dumplings filled with spiced ground beef and onions.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
