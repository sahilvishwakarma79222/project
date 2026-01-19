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
                {displayText}
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