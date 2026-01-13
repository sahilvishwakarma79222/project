// // utils/productData.js

// const categories = [
//   { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors' },
//   { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames' },
//   { id: '3', name: 'safetyDoors', displayName: 'Safety Doors' },
//   { id: '4', name: 'woodenBed', displayName: 'Wooden Beds' },
//   { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples' },
//   { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows' },
//   { id: '7', name: 'woodenArt', displayName: 'Wooden Art' },
//   { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs' }
// ];

// // Category folder mapping
// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// // Function to get actual product count from server
// const getActualProductCount = async (categoryName) => {
//   try {
//     const response = await fetch(`/api/products/count?category=${categoryName}`);
//     const data = await response.json();
    
//     if (data.error) {
//       console.error('Error fetching product count:', data.error);
//       return 0;
//     }
    
//     return data.count || 0;
//   } catch (error) {
//     console.error('Error getting product count:', error);
//     return 0;
//   }
// };

// // Function to get products with images
// const getProductsByCategory = async (categoryName) => {
//   try {
//     // First get count and product info from API
//     const response = await fetch(`/api/products/count?category=${categoryName}`);
//     const data = await response.json();
    
//     if (data.error || !data.products) {
//       console.error('Error fetching products:', data.error);
//       return [];
//     }
    
//     const productCount = data.count;
//     const productFolders = data.products;
    
//     if (productCount === 0) {
//       return [];
//     }
    
//     const products = [];
//     const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
//     const woodTypes = ['Teak Wood', 'Sheesham Wood', 'Mango Wood', 'Pine Wood', 'Oak Wood'];
//     const sizes = ['7x3 ft', '6x2.5 ft', '7x4 ft', '6x3 ft', '8x4 ft', '5x2 ft'];
    
//     for (let i = 0; i < productCount; i++) {
//       const productFolder = productFolders[i];
//       const productNumber = productFolder.productNumber;
      
//       const rating = (4 + Math.random() * 1).toFixed(1);
//       const productType = productTypes[i % 5];
//       const woodType = woodTypes[i % 5];
//       const size = sizes[i % 6];
//       const priceBase = 12999 + (i * 799);
      
//       // Use actual images from API response
//       const images = productFolder.images || [];
      
//       products.push({
//         id: `${categoryName}_product${productNumber}`,
//         name: `${categories.find(c => c.name === categoryName)?.displayName} ${productType} ${productNumber}`,
//         price: `₹${priceBase.toLocaleString()}`,
//         rating: rating,
//         woodtype: woodType,
//         size: size,
//         productNumber: productNumber,
//         images: images, // Actual image paths
//         imageCount: images.length
//       });
//     }
    
//     return products;
//   } catch (error) {
//     console.error('Error loading products:', error);
//     return [];
//   }
// };

// export { 
//   categories, 
//   getProductsByCategory, 
//   getActualProductCount 
// };

// utils/productData.js

// const categories = [
//   { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors' },
//   { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames' },
//   { id: '3', name: 'safetyDoors', displayName: 'Safety Doors' },
//   { id: '4', name: 'woodenBed', displayName: 'Wooden Beds' },
//   { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples' },
//   { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows' },
//   { id: '7', name: 'woodenArt', displayName: 'Wooden Art' },
//   { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs' }
// ];

// // SIMPLE VERSION - Manual counts
// const getActualProductCount = async (categoryName) => {
//   const counts = {
//     woodenDoor: 10,  // Temporary - change these based on your actual folders
//     woodenFrame: 5,
//     safetyDoors: 8,
//     woodenBed: 6,
//     woodenMandir: 7,
//     woodenWindow: 2,
//     woodenArt: 3,
//     sofaChair: 4
//   };
//   return counts[categoryName] || 0;
// };

// // Simple image generator
// const generateProductImages = (categoryName, productNumber) => {
//   const folderNames = {
//     woodenDoor: '1_woodenDoor',
//     woodenFrame: '2_WoodenFream',
//     safetyDoors: '3_safetyDoors',
//     woodenBed: '4_woodenBed',
//     woodenMandir: '5_woodenMandir',
//     woodenWindow: '6_woodenWindow',
//     woodenArt: '7_woodenArt',
//     sofaChair: '8_sofaChair'
//   };
  
//   const folderName = folderNames[categoryName];
//   if (!folderName) return [];
  
//   // Try first image
//   return [`/images/category/${folderName}/product${productNumber}/1.jpg`];
// };

// const getProductsByCategory = async (categoryName) => {
//   try {
//     const count = await getActualProductCount(categoryName);
//     if (count === 0) return [];
    
//     const products = [];
//     const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
//     const woodTypes = ['Teak Wood', 'Sheesham Wood', 'Mango Wood', 'Pine Wood'];
//     const sizes = ['7x3 ft', '6x2.5 ft', '7x4 ft', '6x3 ft'];
    
//     for (let i = 1; i <= count; i++) {
//       const rating = (4 + Math.random() * 1).toFixed(1);
//       const priceBase = 12999 + (i * 799);
      
//       products.push({
//         id: `${categoryName}_product${i}`,
//         name: `${categories.find(c => c.name === categoryName)?.displayName} ${productTypes[i % 5]} ${i}`,
//         price: `₹${priceBase.toLocaleString()}`,
//         rating: rating,
//         woodtype: woodTypes[i % 4],
//         size: sizes[i % 4],
//         productNumber: i,
//         images: generateProductImages(categoryName, i)
//       });
//     }
    
//     return products;
//   } catch (error) {
//     console.error('Error in getProductsByCategory:', error);
//     return [];
//   }
// };

// export { categories, getProductsByCategory, getActualProductCount };

// utils/productData.js

// const categories = [
//   { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors' },
//   { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames' },
//   { id: '3', name: 'safetyDoors', displayName: 'Safety Doors' },
//   { id: '4', name: 'woodenBed', displayName: 'Wooden Beds' },
//   { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples' },
//   { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows' },
//   { id: '7', name: 'woodenArt', displayName: 'Wooden Art' },
//   { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs' }
// ];

// // Allowed image extensions
// const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP'];

// // Simple image finder function
// const findProductImage = (categoryName, productNumber) => {
//   const folderNames = {
//     woodenDoor: '1_woodenDoor',
//     woodenFrame: '2_WoodenFream',
//     safetyDoors: '3_safetyDoors',
//     woodenBed: '4_woodenBed',
//     woodenMandir: '5_woodenMandir',
//     woodenWindow: '6_woodenWindow',
//     woodenArt: '7_woodenArt',
//     sofaChair: '8_sofaChair'
//   };
  
//   const folderName = folderNames[categoryName];
//   if (!folderName) return [];
  
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   // Try all extensions for image 1
//   const images = [];
//   ALLOWED_EXTENSIONS.forEach(ext => {
//     images.push(`${basePath}1${ext}`);
//   });
  
//   // Also try without number (just "image.jpg")
//   ALLOWED_EXTENSIONS.forEach(ext => {
//     images.push(`${basePath}image${ext}`);
//     images.push(`${basePath}Image${ext}`);
//     images.push(`${basePath}product${ext}`);
//   });
  
//   return images;
// };

// // Function to get actual product images from server
// const getProductImages = async (categoryName, productNumber) => {
//   try {
//     // You can implement API call here later
//     // For now, return the possible image paths
//     return findProductImage(categoryName, productNumber);
//   } catch (error) {
//     console.error('Error getting images:', error);
//     return findProductImage(categoryName, productNumber);
//   }
// };

// const getActualProductCount = async (categoryName) => {
//   // Temporary counts - update based on your actual folders
//   const counts = {
//     woodenDoor: 70,
//     woodenFrame: 21,
//     safetyDoors: 39,
//     woodenBed: 31,
//     woodenMandir: 27,
//     woodenWindow: 2,
//     woodenArt: 9,
//     sofaChair: 28
//   };
//   return counts[categoryName] || 0;
// };

// const getProductsByCategory = async (categoryName) => {
//   try {
//     const count = await getActualProductCount(categoryName);
//     if (count === 0) return [];
    
//     const products = [];
//     const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
//     const woodTypes = ['Teak Wood', 'Sheesham Wood', 'Mango Wood', 'Pine Wood', 'Oak Wood'];
//     const sizes = ['7x3 ft', '6x2.5 ft', '7x4 ft', '6x3 ft', '8x4 ft'];
    
//     for (let i = 1; i <= count; i++) {
//       const rating = (4 + Math.random() * 1).toFixed(1);
//       const priceBase = 12999 + (i * 799);
      
//       // Get all possible image paths
//       const imagePaths = await getProductImages(categoryName, i);
      
//       products.push({
//         id: `${categoryName}_product${i}`,
//         name: `${categories.find(c => c.name === categoryName)?.displayName} ${productTypes[i % 5]} ${i}`,
//         price: `₹${priceBase.toLocaleString()}`,
//         rating: rating,
//         woodtype: woodTypes[i % 5],
//         size: sizes[i % 5],
//         productNumber: i,
//         images: imagePaths // All possible image paths
//       });
//     }
    
//     return products;
//   } catch (error) {
//     console.error('Error in getProductsByCategory:', error);
//     return [];
//   }
// };

// export { categories, getProductsByCategory, getActualProductCount };


// utils/productData.js

// const categories = [
//   { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors' },
//   { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames' },
//   { id: '3', name: 'safetyDoors', displayName: 'Safety Doors' },
//   { id: '4', name: 'woodenBed', displayName: 'Wooden Beds' },
//   { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples' },
//   { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows' },
//   { id: '7', name: 'woodenArt', displayName: 'Wooden Art' },
//   { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs' }
// ];

// // Category folder mapping
// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// // Function to generate .webp image paths
// const generateProductImages = (categoryName, productNumber) => {
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return [];
  
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   // Create array of 4 .webp images (1.webp, 2.webp, 3.webp, 4.webp)
//   const images = [];
//   for (let imgNum = 1; imgNum <= 4; imgNum++) {
//     images.push(`${basePath}${imgNum}.webp`);
//   }
  
//   return images;
// };

// // Simple product count function
// const getActualProductCount = async (categoryName) => {
//   // Check these counts match your actual folder count
//   const counts = {
//     woodenDoor: 70,
//     woodenFrame: 21,
//     safetyDoors: 39,
//     woodenBed: 31,
//     woodenMandir: 27,
//     woodenWindow: 2,
//     woodenArt: 9,
//     sofaChair: 28
//   };
  
//   return counts[categoryName] || 0;
// };

// // Main function to get products
// const getProductsByCategory = async (categoryName) => {
//   try {
//     const count = await getActualProductCount(categoryName);
//     if (count === 0) return [];
    
//     const products = [];
//     const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
//     const woodTypes = ['Teak Wood', 'Sheesham Wood', 'Mango Wood', 'Pine Wood', 'Oak Wood'];
//     const sizes = ['7x3 ft', '6x2.5 ft', '7x4 ft', '6x3 ft', '8x4 ft'];
    
//     for (let i = 1; i <= count; i++) {
//       const rating = (4 + Math.random() * 1).toFixed(1);
//       const priceBase = 12999 + (i * 799);
      
//       products.push({
//         id: `${categoryName}_product${i}`,
//         name: `${categories.find(c => c.name === categoryName)?.displayName} ${productTypes[i % 5]} ${i}`,
//         price: `₹${priceBase.toLocaleString()}`,
//         rating: rating,
//         woodtype: woodTypes[i % 5],
//         size: sizes[i % 5],
//         productNumber: i,
//         images: generateProductImages(categoryName, i) // Only .webp images
//       });
//     }
    
//     return products;
//   } catch (error) {
//     console.error('Error loading products:', error);
//     return [];
//   }
// };

// export { categories, getProductsByCategory, getActualProductCount };



// utils/productData.js - OPTIMIZED VERSION

// const categories = [
//   { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors' },
//   { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames' },
//   { id: '3', name: 'safetyDoors', displayName: 'Safety Doors' },
//   { id: '4', name: 'woodenBed', displayName: 'Wooden Beds' },
//   { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples' },
//   { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows' },
//   { id: '7', name: 'woodenArt', displayName: 'Wooden Art' },
//   { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs' }
// ];

// const categoryFolders = {
//   woodenDoor: '1_woodenDoor',
//   woodenFrame: '2_WoodenFream',
//   safetyDoors: '3_safetyDoors',
//   woodenBed: '4_woodenBed',
//   woodenMandir: '5_woodenMandir',
//   woodenWindow: '6_woodenWindow',
//   woodenArt: '7_woodenArt',
//   sofaChair: '8_sofaChair'
// };

// // Cache for performance
// const productCountCache = {};

// // Binary search to find last existing product quickly
// const findLastProductBinary = async (categoryName) => {
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return 0;
  
//   let low = 1;
//   let high = 80;
//   let lastFound = 0;
  
//   while (low <= high) {
//     const mid = Math.floor((low + high) / 2);
//     const imageUrl = `/images/category/${folderName}/product${mid}/1.webp`;
    
//     try {
//       const response = await fetch(imageUrl, { method: 'HEAD' });
//       if (response.ok) {
//         lastFound = mid;
//         low = mid + 1; // Search in higher half
//       } else {
//         high = mid - 1; // Search in lower half
//       }
//     } catch {
//       high = mid - 1;
//     }
//   }
  
//   return lastFound;
// };

// // Optimized product count
// const getActualProductCount = async (categoryName) => {
//   // Check cache first
//   if (productCountCache[categoryName] !== undefined) {
//     return productCountCache[categoryName];
//   }
  
//   const count = await findLastProductBinary(categoryName);
  
//   // Cache the result
//   productCountCache[categoryName] = count;
  
//   console.log(`Dynamic count for ${categoryName}: ${count}`);
//   return count;
// };

// // Get images for product (only first image for performance)
// const getProductImages = (categoryName, productNumber) => {
//   const folderName = categoryFolders[categoryName];
//   if (!folderName) return [];
  
//   const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
//   // For now, just return first image
//   // You can enhance this to find all images if needed
//   return [`${basePath}1.webp`];
// };

// // Main function to get products
// const getProductsByCategory = async (categoryName) => {
//   try {
//     const count = await getActualProductCount(categoryName);
//     if (count === 0) {
//       console.log(`No products found for category: ${categoryName}`);
//       return [];
//     }
    
//     console.log(`Loading ${count} products for ${categoryName}`);
    
//     const products = [];
//     const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
//     const woodTypes = ['Teak Wood', 'Sheesham Wood', 'Mango Wood', 'Pine Wood', 'Oak Wood'];
//     const sizes = ['7x3 ft', '6x2.5 ft', '7x4 ft', '6x3 ft', '8x4 ft'];
    
//     // Create all products at once
//     for (let i = 1; i <= count; i++) {
//       const rating = (4 + Math.random() * 1).toFixed(1);
//       const priceBase = 12999 + (i * 799);
      
//       products.push({
//         id: `${categoryName}_product${i}`,
//         name: `${categories.find(c => c.name === categoryName)?.displayName} ${productTypes[i % 5]} ${i}`,
//         price: `₹${priceBase.toLocaleString()}`,
//         rating: rating,
//         woodtype: woodTypes[i % 5],
//         size: sizes[i % 5],
//         productNumber: i,
//         images: getProductImages(categoryName, i)
//       });
//     }
    
//     console.log(`Total products created: ${products.length}`);
//     return products;
    
//   } catch (error) {
//     console.error('Error loading products:', error);
//     return [];
//   }
// };

// // Clear cache function (if you add new products)
// const clearProductCountCache = (categoryName) => {
//   if (categoryName) {
//     delete productCountCache[categoryName];
//   } else {
//     // Clear all cache
//     Object.keys(productCountCache).forEach(key => {
//       delete productCountCache[key];
//     });
//   }
// };

// export { 
//   categories, 
//   getProductsByCategory, 
//   getActualProductCount,
//   clearProductCountCache 
// };



//   xxxxxxxxxxxxxxxxxxxx

// utils/productData.js - UPDATED WITH INFO.JSON

const categories = [
  { id: '1', name: 'woodenDoor', displayName: 'Wooden Doors' },
  { id: '2', name: 'woodenFrame', displayName: 'Wooden Frames' },
  { id: '3', name: 'safetyDoors', displayName: 'Safety Doors' },
  { id: '4', name: 'woodenBed', displayName: 'Wooden Beds' },
  { id: '5', name: 'woodenMandir', displayName: 'Wooden Temples' },
  { id: '6', name: 'woodenWindow', displayName: 'Wooden Windows' },
  { id: '7', name: 'woodenArt', displayName: 'Wooden Art' },
  { id: '8', name: 'sofaChair', displayName: 'Sofa & Chairs' }
];

const categoryFolders = {
  woodenDoor: '1_woodenDoor',
  woodenFrame: '2_WoodenFream',
  safetyDoors: '3_safetyDoors',
  woodenBed: '4_woodenBed',
  woodenMandir: '5_woodenMandir',
  woodenWindow: '6_woodenWindow',
  woodenArt: '7_woodenArt',
  sofaChair: '8_sofaChair'
};

// Cache for performance
const productCountCache = {};
const productInfoCache = {};

// Binary search to find last existing product quickly
const findLastProductBinary = async (categoryName) => {
  const folderName = categoryFolders[categoryName];
  if (!folderName) return 0;
  
  let low = 1;
  let high = 80;
  let lastFound = 0;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const infoUrl = `/images/category/${folderName}/product${mid}/info.json`;
    
    try {
      const response = await fetch(infoUrl, { method: 'HEAD' });
      if (response.ok) {
        lastFound = mid;
        low = mid + 1; // Search in higher half
      } else {
        high = mid - 1; // Search in lower half
      }
    } catch {
      high = mid - 1;
    }
  }
  
  return lastFound;
};

// Optimized product count
const getActualProductCount = async (categoryName) => {
  // Check cache first
  if (productCountCache[categoryName] !== undefined) {
    return productCountCache[categoryName];
  }
  
  const count = await findLastProductBinary(categoryName);
  
  // Cache the result
  productCountCache[categoryName] = count;
  
  console.log(`Dynamic count for ${categoryName}: ${count}`);
  return count;
};

// Get product info from info.json
const getProductInfo = async (categoryName, productNumber) => {
  const cacheKey = `${categoryName}_${productNumber}`;
  
  // Check cache first
  if (productInfoCache[cacheKey]) {
    return productInfoCache[cacheKey];
  }
  
  const folderName = categoryFolders[categoryName];
  if (!folderName) return null;
  
  const infoUrl = `/images/category/${folderName}/product${productNumber}/info.json`;
  
  try {
    const response = await fetch(infoUrl);
    if (!response.ok) {
      console.log(`No info.json found for ${categoryName} product${productNumber}`);
      return null;
    }
    
    const infoData = await response.json();
    
    // Cache the result
    productInfoCache[cacheKey] = infoData;
    
    console.log(`Loaded info.json for ${categoryName} product${productNumber}:`, infoData);
    return infoData;
    
  } catch (error) {
    console.error(`Error loading info.json for ${categoryName} product${productNumber}:`, error);
    return null;
  }
};

// Get images for product
const getProductImages = (categoryName, productNumber) => {
  const folderName = categoryFolders[categoryName];
  if (!folderName) return [];
  
  const basePath = `/images/category/${folderName}/product${productNumber}/`;
  
  // Check for images 1.webp to 4.webp
  const images = [];
  for (let i = 1; i <= 4; i++) {
    images.push(`${basePath}${i}.webp`);
  }
  
  return images;
};

// Main function to get products
const getProductsByCategory = async (categoryName) => {
  try {
    const count = await getActualProductCount(categoryName);
    if (count === 0) {
      console.log(`No products found for category: ${categoryName}`);
      return [];
    }
    
    console.log(`Loading ${count} products for ${categoryName}`);
    
    const products = [];
    
    for (let i = 1; i <= count; i++) {
      // Try to get info from info.json
      const infoData = await getProductInfo(categoryName, i);
      
      if (infoData) {
        // Use data from info.json
        products.push({
          id: `${categoryName}_product${i}`,
          name: infoData.name || `${categories.find(c => c.name === categoryName)?.displayName} Product ${i}`,
          price: `₹${infoData.price ? infoData.price.toLocaleString() : '0'}`,
          rating: infoData.rating || '4.0',
          woodtype: infoData.woodtype || 'Teak Wood',
          size: infoData.size || '7x3 ft',
          description: infoData.desc || '',
          sales: infoData.sales || 0,
          productNumber: i,
          images: getProductImages(categoryName, i),
          hasInfoJson: true
        });
      } else {
        // Fallback to default data if no info.json
        const productTypes = ['Design', 'Model', 'Style', 'Pattern', 'Type'];
        const woodTypes = ['Teak Wood', 'Sheesham Wood', 'Mango Wood', 'Pine Wood', 'Oak Wood'];
        const sizes = ['7x3 ft', '6x2.5 ft', '7x4 ft', '6x3 ft', '8x4 ft'];
        const priceBase = 12999 + (i * 799);
        const rating = (4 + Math.random() * 1).toFixed(1);
        
        products.push({
          id: `${categoryName}_product${i}`,
          name: `${categories.find(c => c.name === categoryName)?.displayName} ${productTypes[i % 5]} ${i}`,
          price: `₹${priceBase.toLocaleString()}`,
          rating: rating,
          woodtype: woodTypes[i % 5],
          size: sizes[i % 5],
          description: '',
          sales: 0,
          productNumber: i,
          images: getProductImages(categoryName, i),
          hasInfoJson: false
        });
      }
    }
    
    console.log(`Total products created: ${products.length}`);
    return products;
    
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

// Clear cache functions
const clearProductCountCache = (categoryName) => {
  if (categoryName) {
    delete productCountCache[categoryName];
  } else {
    Object.keys(productCountCache).forEach(key => {
      delete productCountCache[key];
    });
  }
};

const clearProductInfoCache = (categoryName, productNumber) => {
  if (categoryName && productNumber) {
    delete productInfoCache[`${categoryName}_${productNumber}`];
  } else if (categoryName) {
    Object.keys(productInfoCache).forEach(key => {
      if (key.startsWith(`${categoryName}_`)) {
        delete productInfoCache[key];
      }
    });
  } else {
    Object.keys(productInfoCache).forEach(key => {
      delete productInfoCache[key];
    });
  }
};

export { 
  categories, 
  getProductsByCategory, 
  getActualProductCount,
  clearProductCountCache,
  clearProductInfoCache
};