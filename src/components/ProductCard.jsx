'use client';

import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product, category }) {
  const whatsappMessage = `Hello, I'm interested in ${product.name} (${product.price}). Please provide more details.`;

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        <Link href={`/products/${category}/${product.id}`}>
          <div className="relative w-full h-full">
            {/* Placeholder for actual image */}
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
              <div className="text-center">
                <div className="text-4xl mb-2">🚪</div>
                <p className="text-amber-800 font-semibold">{product.name}</p>
              </div>
            </div>
            {/* In actual implementation, use:
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            */}
          </div>
        </Link>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={14} className="fill-amber-500 text-amber-500" />
          <span className="font-semibold text-gray-800">{product.rating}</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <Link href={`/products/${category}/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
          {product.desc}
        </p>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Wood Type</p>
            <p className="text-sm font-semibold text-gray-800">{product.woodtype}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg">
            <p className="text-xs text-gray-500">Size</p>
            <p className="text-sm font-semibold text-gray-800">{product.size}</p>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-2xl font-bold text-amber-700">{product.price}</p>
          </div>
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors group/btn"
          >
            <ShoppingCart size={18} />
            <span className="font-semibold">Buy Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}