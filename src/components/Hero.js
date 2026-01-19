'use client'
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/parallax'
import { useRouter } from 'next/navigation'
import './hero.css'

export default function Hero() {
  const router = useRouter()

  const [displayText, setDisplayText] = useState('')
  const [currentStat, setCurrentStat] = useState({ categories: 0, customers: 0, experience: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const statsRef = useRef(null)
  const typewriterTimerRef = useRef(null)
  const fullText = "Wooden Doors & Windows"
  const typeSpeed = 100
  const eraseSpeed = 50
  const pauseTime = 2000

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Start animations
    startTypewriter()
    setupIntersectionObserver()
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      if (typewriterTimerRef.current) {
        clearTimeout(typewriterTimerRef.current)
      }
    }
  }, [])

  const startTypewriter = () => {
    let currentIndex = 0
    let isDeleting = false
    let currentText = ''

    const type = () => {
      if (isDeleting) {
        currentText = fullText.substring(0, currentIndex - 1)
        currentIndex--
      } else {
        currentText = fullText.substring(0, currentIndex + 1)
        currentIndex++
      }

      setDisplayText(currentText)

      let typeDelay = isDeleting ? eraseSpeed : typeSpeed

      if (!isDeleting && currentText === fullText) {
        typeDelay = pauseTime
        isDeleting = true
      } else if (isDeleting && currentText === '') {
        isDeleting = false
        currentIndex = 0
      }

      typewriterTimerRef.current = setTimeout(type, typeDelay)
    }

    type()
  }

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounterAnimation()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
  }

  const startCounterAnimation = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let categoriesCount = 0
    const categoriesStep = 8 / steps

    let customersCount = 0
    const customersStep = 1000 / steps

    let experienceCount = 0
    const experienceStep = 28 / steps

    const counterInterval = setInterval(() => {
      categoriesCount += categoriesStep
      customersCount += customersStep
      experienceCount += experienceStep

      if (categoriesCount >= 8) categoriesCount = 8
      if (customersCount >= 1000) customersCount = 1000
      if (experienceCount >= 28) experienceCount = 28

      setCurrentStat({
        categories: Math.floor(categoriesCount),
        customers: Math.floor(customersCount),
        experience: Math.floor(experienceCount)
      })

      if (categoriesCount >= 8 && customersCount >= 1000 && experienceCount >= 28) {
        clearInterval(counterInterval)
      }
    }, stepDuration)
  }

  // Premium door images data
  const doorImages = [
    {
      id: 1,
      src: '/images/doors/1.png',
      alt: 'Luxury Wooden Door 1',
      title: 'Executive Series',
      subtitle: 'Handcrafted Teak Wood'
    },
    {
      id: 2,
      src: '/images/doors/2.png',
      alt: 'Luxury Wooden Door 2',
      title: 'Heritage Collection',
      subtitle: 'Traditional Carving'
    },
    {
      id: 3,
      src: '/images/doors/5.png',
      alt: 'Luxury Wooden Door 3',
      title: 'Modern Elegance',
      subtitle: 'Contemporary Design'
    },
    {
      id: 4,
      src: '/images/doors/4.png',
      alt: 'Luxury Wooden Door 4',
      title: 'Royal Oak Series',
      subtitle: 'Premium Finish'
    },
    {
      id: 5,
      src: '/images/doors/3.png',
      alt: 'Luxury Wooden Door 5',
      title: 'Designer Edition',
      subtitle: 'Custom Made'
    },
    {
      id: 6,
      src: '/images/doors/6.png',
      alt: 'Luxury Wooden Door 6',
      title: 'Designer Edition',
      subtitle: 'Custom Made'
    },
    {
      id: 7,
      src: '/images/doors/45.png',
      alt: 'Luxury Wooden Door 7',
      title: 'Classic Mahogany',
      subtitle: 'Timeless Beauty'
    }
  ]

  return (
    <>
      <style jsx>{`
        /* Mobile Responsive Styles Only */
        @media (max-width: 768px) {
          /* Fix navbar overlap - Add more top padding */
          .hero {
            padding: 20px 15px !important;
            min-height: auto !important;
            padding-top: 100px !important; /* Increased from 60px */
            margin-top: 0 !important;
          }

          .hero-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
            padding: 0 !important;
          }

          /* Content on Top, Slider at Bottom */
          .hero-content {
            order: 1 !important;
            text-align: center !important;
            padding: 0 10px !important;
            margin-bottom: 20px !important;
          }

          .hero-slider {
            order: 2 !important;
            height: 280px !important;
            margin-top: 0 !important;
            margin-bottom: 20px !important;
          }

          /* Typewriter Effect Fix */
          .hero-heading {
            min-height: 60px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-bottom: 20px !important;
            margin-top: 0 !important;
          }

          .hero-heading h1 {
            font-size: 1.8rem !important;
            line-height: 1.2 !important;
            margin-bottom: 0 !important;
            background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #d4af37 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            text-align: center !important;
            display: inline-block !important;
            min-width: 280px !important;
          }

          .typewriter-text {
            display: inline !important;
            white-space: nowrap !important;
          }

          .cursor {
            display: inline !important;
            animation: blink 1s infinite !important;
            color: #d4af37 !important;
            font-weight: bold !important;
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }

          /* Compact Description */
          .premium-description {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
            padding: 0 5px !important;
          }

          .highlight-text {
            color: #d4af37 !important;
            font-weight: 600 !important;
          }

          /* Compact Stats - Single Row */
          .premium-stats {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
            margin: 20px 0 !important;
            padding: 0 5px !important;
          }

          .hero-stat {
            padding: 10px !important;
            min-width: auto !important;
          }

          .stat-icon {
            font-size: 1.2rem !important;
            margin-bottom: 5px !important;
            color: #d4af37 !important;
          }

          .hero-stat-number {
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            margin-bottom: 2px !important;
            color: #d4af37 !important;
            display: block !important;
          }

          .hero-stat-label {
            font-size: 0.7rem !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
            color: #aaa !important;
          }

          /* Compact CTA Button */
          .cta-container {
            margin: 15px 0 !important;
          }

          .cta-button {
            padding: 12px 24px !important;
            font-size: 0.9rem !important;
            width: 100% !important;
            max-width: 220px !important;
            margin: 0 auto !important;
            border-radius: 6px !important;
            background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%) !important;
            border: none !important;
            color: white !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 8px !important;
          }

          .cta-text {
            font-size: 0.9rem !important;
          }

          /* Compact Trust Badges - Single Row */
          .trust-badges {
            display: flex !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 8px !important;
            margin-top: 15px !important;
            padding: 0 5px !important;
          }

          .trust-badge {
            padding: 6px 10px !important;
            font-size: 0.7rem !important;
            border-radius: 12px !important;
            min-width: auto !important;
            flex: 1 !important;
            max-width: 110px !important;
            justify-content: center !important;
            background: rgba(212, 175, 55, 0.1) !important;
            border: 1px solid rgba(212, 175, 55, 0.3) !important;
            display: flex !important;
            align-items: center !important;
            gap: 5px !important;
          }

          .trust-badge i {
            font-size: 0.7rem !important;
            color: #d4af37 !important;
          }

          /* Compact Slider */
          .premium-slider {
            height: 280px !important;
            border-radius: 10px !important;
            margin: 0 auto !important;
            position: relative !important;
            overflow: hidden !important;
          }

          .premium-door-image {
            height: 100% !important;
            object-fit: cover !important;
            width: 100% !important;
          }

          .slide-overlay {
            padding: 15px !important;
            position: absolute !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%) !important;
          }

          .slide-title {
            font-size: 1rem !important;
            margin-bottom: 4px !important;
            color: white !important;
            font-weight: 600 !important;
          }

          .slide-subtitle {
            font-size: 0.75rem !important;
            margin-bottom: 8px !important;
            color: #d4af37 !important;
          }

          .slide-badge {
            font-size: 0.7rem !important;
            padding: 3px 8px !important;
            border-radius: 12px !important;
            background: rgba(212, 175, 55, 0.2) !important;
            color: #ffd700 !important;
            border: 1px solid rgba(212, 175, 55, 0.4) !important;
            display: inline-block !important;
          }

          /* Hide Unnecessary Elements on Mobile */
          .floating-shapes,
          .hero-bg-pattern,
          .hero-gold-overlay,
          .scroll-indicator,
          .corner-decoration,
          .heading-glow,
          .cta-glow,
          .nav-glow,
          .scroll-glow,
          .slider-frame,
          .cta-icon {
            display: none !important;
          }

          /* Show cursor and typewriter effect */
          .cursor {
            display: inline !important;
          }

          /* Adjust Swiper Pagination */
          :global(.premium-pagination) {
            bottom: 5px !important;
          }
          
          :global(.swiper-pagination-bullet) {
            width: 5px !important;
            height: 5px !important;
            margin: 0 3px !important;
            background: #d4af37 !important;
          }
          
          :global(.swiper-pagination-bullet-active) {
            transform: scale(1.2) !important;
            opacity: 1 !important;
          }

          /* Navigation buttons - show only on hover/touch */
          .premium-nav {
            width: 35px !important;
            height: 35px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(212, 175, 55, 0.9) !important;
            border-radius: 50% !important;
            color: white !important;
            position: absolute !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 10 !important;
            cursor: pointer !important;
            opacity: 0.7 !important;
          }

          .swiper-button-prev {
            left: 10px !important;
          }

          .swiper-button-next {
            right: 10px !important;
          }
        }

        @media (max-width: 480px) {
          /* Even more padding for very small screens */
          .hero {
            padding: 15px 10px !important;
            padding-top: 90px !important; /* Increased for small phones */
          }

          .hero-heading h1 {
            font-size: 1.6rem !important;
            min-width: 250px !important;
          }

          .premium-description {
            font-size: 0.85rem !important;
            margin-bottom: 15px !important;
          }

          .hero-slider {
            height: 250px !important;
          }

          .premium-stats {
            gap: 8px !important;
            margin: 15px 0 !important;
          }

          .hero-stat {
            padding: 8px 5px !important;
          }

          .hero-stat-number {
            font-size: 1.3rem !important;
          }

          .hero-stat-label {
            font-size: 0.65rem !important;
          }

          .trust-badge {
            font-size: 0.65rem !important;
            padding: 5px 8px !important;
            max-width: 100px !important;
          }

          .cta-button {
            padding: 10px 20px !important;
            font-size: 0.85rem !important;
            max-width: 200px !important;
          }

          .slide-title {
            font-size: 0.9rem !important;
          }

          .slide-subtitle {
            font-size: 0.7rem !important;
          }
        }

        /* Tablet Styles */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero {
            padding-top: 100px !important;
          }
          
          .hero-container {
            gap: 30px !important;
          }

          .hero-slider {
            height: 400px !important;
          }

          .hero-heading h1 {
            font-size: 2.5rem !important;
          }

          .premium-stats {
            gap: 15px !important;
          }

          .hero-stat-number {
            font-size: 2rem !important;
          }
        }

        /* For Desktop - Add some top padding if needed */
        @media (min-width: 1025px) {
          .hero {
            padding-top: 80px !important;
          }
        }

        /* Ensure Typewriter is Visible */
        .typewriter-text {
          display: inline-block;
          min-height: 40px;
        }

        .cursor {
          animation: blink 1s infinite;
          color: #d4af37;
          font-weight: bold;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <section className="hero">
        {/* Animated Background Elements */}
        <div className="hero-bg-pattern"></div>
        <div className="hero-gold-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="hero-container">
          {/* Content on Top */}
          <div className="hero-content">
            {/* Main Heading with Typewriter Effect */}
            <div className="hero-heading">
              <h1 className="typewriter-text">
                {displayText || "Wooden Doors & Windows"}
                <span className="cursor">|</span>
              </h1>
              <div className="heading-glow"></div>
            </div>

            {/* Premium Description */}
            <p className="fade-in-text premium-description">
              Crafting <span className="highlight-text">timeless elegance</span> with India's finest wooden doors.
              Experience unparalleled craftsmanship with <span className="highlight-text">50+ specialized categories</span>
              of premium doors and windows.
            </p>

            {/* Premium CTA Button */}
            <div className="cta-container">
              <button
                className="cta-button premium-cta pulse-animation"
                onClick={()=>{router.push('products/wooden-doors?category=woodenDoor')}}
              >
                <span className="cta-text">Explore Collection <i className="fas fa-arrow-right"></i></span>
                <div className="cta-icon"></div>
                <div className="cta-glow"></div>
              </button>
            </div>

            {/* Premium Stats */}
            <div className="hero-stats premium-stats" ref={statsRef}>
              <div className="hero-stat">
                <div className="stat-icon">
                  <i className="fas fa-door-open"></i>
                </div>
                <span className="hero-stat-number count-animation">
                  {currentStat.categories}+
                </span>
                <div className="hero-stat-label">Premium Categories</div>
              </div>
              <div className="hero-stat">
                <div className="stat-icon">
                  <i className="fas fa-smile"></i>
                </div>
                <span className="hero-stat-number count-animation">
                  {currentStat.customers}+
                </span>
                <div className="hero-stat-label">Satisfied Clients</div>
              </div>
              <div className="hero-stat">
                <div className="stat-icon">
                  <i className="fas fa-award"></i>
                </div>
                <span className="hero-stat-number count-animation">
                  {currentStat.experience}+
                </span>
                <div className="hero-stat-label">Years Excellence</div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <i className="fas fa-shield-alt"></i>
                <span>Natural Product</span>
              </div>
              <div className="trust-badge">
                <i className="fas fa-truck"></i>
                <span>Free Installation</span>
              </div>
              <div className="trust-badge">
                <i className="fas fa-star"></i>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Slider at Bottom */}
          <div className="hero-slider premium-slider">
            <div className="slider-frame"></div>
            <Swiper
              modules={[Autoplay, EffectFade, Navigation, Parallax]}
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              speed={1500}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              parallax={true}
              loop={true}
              className="door-swiper premium-swiper"
            >
              {doorImages.map((door) => (
                <SwiperSlide key={door.id}>
                  <div
                    className="slide-image premium-slide"
                    data-swiper-parallax="-100"
                  >
                    <img
                      src={door.src}
                      alt={door.alt}
                      loading="eager"
                      className="premium-door-image"
                    />
                    <div className="slide-overlay">
                      <div className="slide-content">
                        <h3 className="slide-title" data-swiper-parallax="-200">
                          {door.title}
                        </h3>
                        <p className="slide-subtitle" data-swiper-parallax="-300">
                          {door.subtitle}
                        </p>
                        <div className="slide-badge" data-swiper-parallax="-400">
                          Premium
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Navigation Buttons */}
              <div className="swiper-button-prev premium-nav">
                <i className="fas fa-chevron-left"></i>
                <div className="nav-glow"></div>
              </div>
              <div className="swiper-button-next premium-nav">
                <i className="fas fa-chevron-right"></i>
                <div className="nav-glow"></div>
              </div>

              {/* Swiper Pagination */}
              <div className="swiper-pagination premium-pagination"></div>
            </Swiper>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator premium-scroll">
          <div className="scroll-text">Scroll Down</div>
          <div className="scroll-line">
            <div className="scroll-glow"></div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="corner-decoration corner-tl"></div>
        <div className="corner-decoration corner-tr"></div>
        <div className="corner-decoration corner-bl"></div>
        <div className="corner-decoration corner-br"></div>
      </section>
    </>
  )
}