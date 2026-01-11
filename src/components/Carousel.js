'use client'
import { useState, useEffect } from 'react'

const carouselStyles = {
  carousel: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '12px'
  },
  carouselTrack: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
    gap: '1.5rem'
  },
  carouselItem: {
    flex: '0 0 auto',
    minWidth: '280px'
  },
  carouselNav: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'var(--primary-gold)',
    border: 'none',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.5rem',
    color: 'var(--primary-black)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  carouselNavHover: {
    background: 'var(--secondary-gold)',
    transform: 'translateY(-50%) scale(1.1)'
  },
  prev: { left: '-25px' },
  next: { right: '-25px' },
  carouselDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '2rem'
  },
  carouselDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'var(--medium-gray)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  activeDot: {
    background: 'var(--primary-gold)',
    transform: 'scale(1.2)'
  }
}

export default function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showNav = true
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const minSwipeDistance = 50

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, autoPlayInterval])

  const getTransform = () => {
    return `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem))`
  }

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ ...carouselStyles.carouselTrack, transform: getTransform() }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, index) => (
          <div key={index} className="carousel-item" style={carouselStyles.carouselItem}>
            {item}
          </div>
        ))}
      </div>

      {showNav && (
        <>
          <button
            className="carousel-nav prev"
            onClick={prevSlide}
            style={{ ...carouselStyles.carouselNav, ...carouselStyles.prev }}
          >
            ‹
          </button>
          <button
            className="carousel-nav next"
            onClick={nextSlide}
            style={{ ...carouselStyles.carouselNav, ...carouselStyles.next }}
          >
            ›
          </button>
        </>
      )}

      {showDots && (
        <div className="carousel-dots" style={carouselStyles.carouselDots}>
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              style={{
                ...carouselStyles.carouselDot,
                ...(index === currentIndex ? carouselStyles.activeDot : {})
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .carousel {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 12px;
        }
        
        .carousel-track {
          display: flex;
          transition: transform 0.5s ease-in-out;
          gap: 1.5rem;
        }
        
        .carousel-item {
          flex: 0 0 auto;
          min-width: 280px;
        }
        
        .carousel-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: var(--primary-gold);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          color: var(--primary-black);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .carousel-nav:hover {
          background: var(--secondary-gold);
          transform: translateY(-50%) scale(1.1);
        }
        
        .carousel-nav.prev {
          left: -25px;
        }
        
        .carousel-nav.next {
          right: -25px;
        }
        
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }
        
        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--medium-gray);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .carousel-dot.active {
          background: var(--primary-gold);
          transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
          .carousel-nav {
            display: none;
          }
          
          .carousel-item {
            min-width: 250px;
          }
        }
      `}</style>
    </div>
  )
}