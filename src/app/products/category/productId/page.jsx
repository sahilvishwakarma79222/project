'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Truck,
  Shield,
  Star,
  Maximize2
} from 'lucide-react';
import { categories, getProductDetails, getProductImagePaths } from '@/utils/productData';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { category, productId } = params;
  
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductDetails(category, productId);
        setProduct(productData);
        
        // Simulate related products
        if (productData) {
          const related = [];
          for (let i = 1; i <= 4; i++) {
            const relatedId = `product${(parseInt(productId.replace('product', '')) + i) % 70}`;
            const relatedProduct = await getProductDetails(category, relatedId);
            if (relatedProduct) related.push(relatedProduct);
          }
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [category, productId]);

  const handlePreviousImage = () => {
    if (product?.images) {
      setCurrentImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  const handleNextImage = () => {
    if (product?.images) {
      setCurrentImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleWhatsAppBuy = () => {
    if (!product) return;
    
    const message = `Hello, I want to buy this product:\n\n*${product.name}*\nPrice: ${product.price}\nWood Type: ${product.woodtype}\nSize: ${product.size}\nRating: ${product.rating}/5\n\nPlease contact me for further details.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    if (!product) return;
    
    const message = `Check out this beautiful wooden product:\n\n${product.name} - ${product.price}\n\nView it here: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={20} 
          className={i < fullStars ? "fill-amber-500 text-amber-500" : "text-gray-300"} 
        />
      );
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <button
            onClick={() => router.back()}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-700"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-4">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🚪</div>
                        <p className="text-gray-800 font-bold text-xl">Product Image {currentImageIndex + 1}</p>
                        <p className="text-gray-600">(4 angles available)</p>
                      </div>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 0 && (
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-amber-500' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <div className="text-2xl">🚪</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              {/* Product Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    {renderStars(parseFloat(product.rating))}
                    <span className="font-semibold text-gray-700">{product.rating}/5</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{product.woodtype}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-bold text-amber-700">{product.price}</span>
                  <span className="text-gray-500">Inclusive of all taxes</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-500 text-sm">Wood Type</p>
                    <p className="font-semibold text-gray-800">{product.woodtype}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-500 text-sm">Size</p>
                    <p className="font-semibold text-gray-800">{product.size}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check size={18} className="text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.desc}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsAppBuy}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
                >
                  <ShoppingCart size={24} />
                  Buy Now on WhatsApp
                </button>
                <button
                  onClick={handleWhatsAppShare}
                  className="flex-1 bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50 py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-colors"
                >
                  <Share2 size={24} />
                  Share Product
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div 
                  key={relatedProduct.id} 
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/products/${category}/${relatedProduct.id}`)}
                >
                  <div className="h-40 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">🚪</div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-700 font-bold">{relatedProduct.price}</span>
                    <span className="text-sm text-gray-500">View →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}