'use client'
import { useRef, useEffect } from 'react'

const MaterialsSection = () => {
  const scrollContainerRef = useRef(null)

  const materialCategories = [
    {
      category: 'Wood Types',
      materials: [
        { name: 'Teak Wood', image: '/images/materials/w1.jpg' },
        { name: 'Sheesham Wood', image: '/images/materials/w2.jpg' },
        { name: 'Sagwan Wood', image: '/images/materials/w3.jpg' },
      ]
    },
    {
      category: 'Metal Types',
      materials: [
        { name: 'Aluminium', image: '/images/materials/aluminium.jpg' },
        { name: 'Steel', image: '/images/materials/Iron.jpg' },
        { name: 'Brass', image: '/images/materials/m1.jpg' },
        { name: 'Copper', image: '/images/materials/Plastic.jpg' }
      ]
    },
    {
      category: 'Other Materials',
      materials: [
        { name: 'PVC', image: '/images/materials/pvc.jpg' },
        { name: 'Glass', image: '/images/materials/Frosted-Glass-Interior-Sliding-Room-Divider.jpg' },
        { name: 'Fiber', image: '/images/materials/Fiberglass-Door.jpg' },
        { name: 'Acrylic', image: '/images/materials/glass1.jpg' },
      ]
    }
  ];

  // Flatten all materials for scrolling
  const allMaterials = materialCategories.flatMap(category =>
    category.materials.map(material => ({
      ...material,
      category: category.category
    }))
  );

  // Duplicate for infinite scroll
  const duplicatedMaterials = [...allMaterials, ...allMaterials, ...allMaterials];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="materials-showcase">
      <div className="showcase-container">
        {/* Left Side - 30% Content */}
        <div className="showcase-content">
          <div className="content-wrapper">
            <h2 className="showcase-title">
              Explore Our <span className="gradient-text">Best Seller</span>
            </h2>

            <p className="showcase-description">
             From beautifully crafted doors and beds to divine wooden temples and elegant frames—our best sellers reflect timeless craftsmanship and premium quality.
            </p>
          </div>
        </div>

        {/* Right Side - 70% Infinite Scroll */}
        <div className="showcase-slider">
          <div
            className="scroll-container"
            ref={scrollContainerRef}
          >
            <div className="scroll-content">
              {duplicatedMaterials.map((material, index) => (
                <div key={index} className="material-card">
                  <div className="material-category">{material.category}</div>

                  <div className="material-image-wrapper">
                    <img
                      src={material.image}
                      alt={material.name}
                      className="material-image"
                    />
                  </div>

                  <h3 className="material-name">{material.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;