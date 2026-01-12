// app/api/products/count/route.js

import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    if (!category) {
      return Response.json({ error: 'Category parameter is required' }, { status: 400 });
    }
    
    // Category folder mapping
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
    
    const folderName = categoryFolders[category];
    if (!folderName) {
      return Response.json({ error: 'Invalid category' }, { status: 400 });
    }
    
    // Path to category folder
    const categoryPath = path.join(process.cwd(), 'public', 'images', 'category', folderName);
    
    // Check if folder exists
    if (!fs.existsSync(categoryPath)) {
      return Response.json({ count: 0, products: [] });
    }
    
    // Read all items in folder
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });
    
    // Filter only directories that start with 'product'
    const productFolders = items
      .filter(item => item.isDirectory() && item.name.startsWith('product'))
      .map(folder => {
        const folderName = folder.name;
        const productNumber = parseInt(folderName.replace('product', ''));
        
        // Check images in this product folder
        const productPath = path.join(categoryPath, folderName);
        const imageFiles = fs.readdirSync(productPath);
        
        // Filter image files (1.jpg, 2.jpg, etc.)
        const images = imageFiles
          .filter(file => {
            const ext = path.extname(file).toLowerCase();
            const nameWithoutExt = path.basename(file, ext);
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && 
                   /^\d+$/.test(nameWithoutExt); // Only numbers like 1, 2, 3
          })
          .sort((a, b) => {
            const numA = parseInt(path.basename(a, path.extname(a)));
            const numB = parseInt(path.basename(b, path.extname(b)));
            return numA - numB;
          })
          .map(file => `/images/category/${folderName}/${folder.name}/${file}`);
        
        return {
          productNumber: productNumber,
          imageCount: images.length,
          images: images
        };
      })
      .sort((a, b) => a.productNumber - b.productNumber);
    
    return Response.json({
      count: productFolders.length,
      products: productFolders
    });
    
  } catch (error) {
    console.error('Error counting products:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}