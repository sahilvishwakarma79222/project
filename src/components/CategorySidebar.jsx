'use client';

import { useState, useEffect } from 'react';
import { categories } from '@/utils/productData';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function CategorySidebar({ activeCategory }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (categoryName) => {
    router.push(`/products/${categoryName}`);
    setIsMobileOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileOpen && !event.target.closest('.sidebar')) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-amber-700 text-white p-4 rounded-full shadow-2xl hover:bg-amber-800 transition-all duration-300 hover:scale-110"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0 sidebar">
        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-amber-500">
            Product Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.name)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center ${activeCategory === category.name
                    ? 'bg-amber-100 text-amber-800 border-l-4 border-amber-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                    }`}
                >
                  <span className="font-medium">{category.displayName}</span>
                  <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* WhatsApp Contact Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Our experts are ready to assist you with custom designs
            </p>
            <a
              href="https://wa.me/918007747733?text=Hello%2C%20I'm%20interested%20in%20your%20wooden%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span className="font-semibold">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="absolute top-0 left-0 h-full w-72 bg-white shadow-2xl sidebar p-6 transform transition-transform">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Categories</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex justify-between items-center ${activeCategory === category.name
                      ? 'bg-amber-100 text-amber-800 border-l-4 border-amber-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                  >
                    <span className="font-medium">{category.displayName}</span>
                    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}