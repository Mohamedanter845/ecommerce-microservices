import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.slice(0, 4))) // أول 4 منتجات بس
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner */}
      <section className="bg-red-700 text-white py-20 flex flex-col items-center justify-center text-center px-4 md:px-0">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to M3 Shop</h1>
        <p className="text-lg max-w-xl">
          Discover the best products with amazing prices. Quality guaranteed and fast shipping.
        </p>
        <button className="mt-8 bg-gray-900 hover:bg-gray-800 px-6 py-3 rounded-md text-white font-semibold transition duration-300">
          Shop Now
        </button>
      </section>

      {/* Featured Products */}
      <section className="flex-1 bg-gray-50 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-700">Featured Products</h2>
        {error && <p className="text-center text-red-600 mb-6">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Why Shop With Us?</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-red-700 mb-4 text-5xl">🚚</div>
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-gray-600">Fast and reliable delivery on all orders over $50.</p>
          </div>
          <div>
            <div className="text-red-700 mb-4 text-5xl">💬</div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our friendly support team is here to help anytime.</p>
          </div>
          <div>
            <div className="text-red-700 mb-4 text-5xl">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-gray-600">We ensure your data is safe with our encrypted payments.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        © {new Date().getFullYear()} M3 Shop. All rights reserved.
      </footer>
    </div>
  );
}
