// 'use client'
// import { useEffect, useState, useRef } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay, EffectFade, Navigation, Parallax } from 'swiper/modules'
// import 'swiper/css'
// import 'swiper/css/effect-fade'
// import 'swiper/css/navigation'
// import 'swiper/css/parallax'

// export default function Hero() {
//   const [displayText, setDisplayText] = useState('')
//   const [currentStat, setCurrentStat] = useState({ categories: 0, customers: 0, experience: 0 })
//   const [isVisible, setIsVisible] = useState(false)
//   const [currentDescription, setCurrentDescription] = useState(0) // 0 for English, 1 for Hindi
//   const statsRef = useRef(null)
//   const typewriterRef = useRef(null)

//   // Texts for typewriter
//   const englishText = "Sagwan Doors & Frames"
//   const hindiText = "सागवान दरवाज़े व चौखटें"

//   // SLOWER TIMING FOR BETTER VISIBILITY
//   const typeSpeed = 150 // Slower typing
//   const eraseSpeed = 80 // Slower erasing
//   const pauseTime = 3000 // Longer pause

//   // Description texts in both languages
//   const descriptions = [
//     {
//       id: 0,
//       text: "We create <span class='highlight-text'>finely crafted sagwan doors</span> using traditional handwork and modern CNC 2D/3D design — bringing <span class='highlight-text'>natural elegance</span> to every home.",
//       language: "en"
//     },
//     {
//       id: 1,
//       text: "हम <span class='highlight-text'>हाथ की कारीगरी</span> और आधुनिक CNC 2D/3D डिज़ाइन के साथ सागवान के दरवाज़े बनाते हैं, जो हर घर में <span class='highlight-text'>प्राकृतिक सुंदरता</span> जोड़ते हैं।",
//       language: "hi"
//     }
//   ]

//   useEffect(() => {
//     // Start animations
//     setIsVisible(true)
//     setupIntersectionObserver()

//     // Start typewriter
//     startTypewriter()

//     // Start description rotation - LONGER INTERVAL
//     const descriptionInterval = setInterval(() => {
//       setCurrentDescription(prev => (prev === 0 ? 1 : 0))
//     }, 6000) // Change every 6 seconds (doubled)

//     return () => {
//       clearInterval(descriptionInterval)
//       if (typewriterRef.current) {
//         clearTimeout(typewriterRef.current)
//       }
//     }
//   }, [])

//   // Jab description change ho, typewriter bhi change ho
//   useEffect(() => {
//     if (typewriterRef.current) {
//       clearTimeout(typewriterRef.current)
//     }

//     // Jab description change ho, typewriter reset karo aur naye text ke saath start karo
//     const currentFullText = currentDescription === 0 ? englishText : hindiText
//     setDisplayText('') // Pehle text clear karo

//     // Thoda delay ke baad naya text start karo
//     typewriterRef.current = setTimeout(() => {
//       startTypewriterForLanguage(currentDescription)
//     }, 500) // Increased delay

//   }, [currentDescription])

//   const startTypewriter = () => {
//     // Pehle English se start karo
//     startTypewriterForLanguage(0)
//   }

//   const startTypewriterForLanguage = (languageIndex) => {
//     const fullText = languageIndex === 0 ? englishText : hindiText
//     let currentIndex = 0
//     let isDeleting = false
//     let currentText = ''

//     const type = () => {
//       if (isDeleting) {
//         currentText = fullText.substring(0, currentIndex - 1)
//         currentIndex--
//       } else {
//         currentText = fullText.substring(0, currentIndex + 1)
//         currentIndex++
//       }

//       setDisplayText(currentText)

//       let typeDelay = isDeleting ? eraseSpeed : typeSpeed

//       if (!isDeleting && currentText === fullText) {
//         // Typing complete, pause - LONGER PAUSE
//         typeDelay = pauseTime
//         isDeleting = true
//       } else if (isDeleting && currentText === '') {
//         // Deleting complete, wait for description to change
//         // DON'T restart automatically - wait for description change
//         isDeleting = false
//         currentIndex = 0
//         // Description automatically changes via interval, so we wait
//         return
//       }

//       typewriterRef.current = setTimeout(type, typeDelay)
//     }

//     type()
//   }

//   const setupIntersectionObserver = () => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             startCounterAnimation()
//           }
//         })
//       },
//       { threshold: 0.5 }
//     )

//     if (statsRef.current) {
//       observer.observe(statsRef.current)
//     }
//   }

//   const startCounterAnimation = () => {
//     const duration = 2000
//     const steps = 60
//     const stepDuration = duration / steps

//     let categoriesCount = 0
//     const categoriesStep = 50 / steps

//     let customersCount = 0
//     const customersStep = 1000 / steps

//     let experienceCount = 0
//     const experienceStep = 15 / steps

//     const counterInterval = setInterval(() => {
//       categoriesCount += categoriesStep
//       customersCount += customersStep
//       experienceCount += experienceStep

//       if (categoriesCount >= 50) categoriesCount = 50
//       if (customersCount >= 1000) customersCount = 1000
//       if (experienceCount >= 15) experienceCount = 15

//       setCurrentStat({
//         categories: Math.floor(categoriesCount),
//         customers: Math.floor(customersCount),
//         experience: Math.floor(experienceCount)
//       })

//       if (categoriesCount >= 50 && customersCount >= 1000 && experienceCount >= 15) {
//         clearInterval(counterInterval)
//       }
//     }, stepDuration)
//   }

//   const scrollToCategories = () => {
//     const categoriesSection = document.getElementById('categories')
//     if (categoriesSection) {
//       categoriesSection.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       })
//     }
//   }

//   // Premium door images data
//   const doorImages = [
//     {
//       id: 1,
//       src: '/images/doors/1.png',
//       alt: 'Luxury Wooden Door 1',
//       title: 'Executive Series',
//       subtitle: 'Handcrafted Teak Wood'
//     },
//     {
//       id: 2,
//       src: '/images/doors/2.png',
//       alt: 'Luxury Wooden Door 2',
//       title: 'Heritage Collection',
//       subtitle: 'Traditional Carving'
//     },
//     {
//       id: 3,
//       src: '/images/doors/5.png',
//       alt: 'Luxury Wooden Door 3',
//       title: 'Modern Elegance',
//       subtitle: 'Contemporary Design'
//     },
//     {
//       id: 4,
//       src: '/images/doors/4.png',
//       alt: 'Luxury Wooden Door 4',
//       title: 'Royal Oak Series',
//       subtitle: 'Premium Finish'
//     },
//     {
//       id: 5,
//       src: '/images/doors/3.png',
//       alt: 'Luxury Wooden Door 5',
//       title: 'Designer Edition',
//       subtitle: 'Custom Made'
//     },
//     {
//       id: 6,
//       src: '/images/doors/6.png',
//       alt: 'Luxury Wooden Door 6',
//       title: 'Designer Edition',
//       subtitle: 'Custom Made'
//     },
//     {
//       id: 7,
//       src: '/images/doors/45.png',
//       alt: 'Luxury Wooden Door 7',
//       title: 'Classic Mahogany',
//       subtitle: 'Timeless Beauty'
//     }
//   ]

//   return (
//     <section className="hero">
//       {/* Animated Background Elements */}
//       <div className="hero-bg-pattern"></div>
//       <div className="hero-gold-overlay"></div>
//       <div className="floating-shapes">
//         <div className="shape shape-1"></div>
//         <div className="shape shape-2"></div>
//         <div className="shape shape-3"></div>
//         <div className="shape shape-4"></div>
//       </div>

//       <div className="hero-container">
//         {/* Left Side - Premium Content */}
//         <div className="hero-content">

//           {/* Main Heading with Typewriter */}
//           <div className="hero-heading">
//             <h1 className="typewriter-text">
//               {displayText}
//               <span className="cursor">|</span>
//             </h1>
//             <div className="heading-glow"></div>
//           </div>

//           {/* Premium Description with Language Rotation */}
//           <div className="description-container">
//             <p
//               className="fade-in-text premium-description"
//               key={currentDescription}
//               dangerouslySetInnerHTML={{
//                 __html: descriptions[currentDescription].text
//               }}
//             />
//           </div>

//           {/* Premium CTA Button */}
//           <div className="cta-container">
//             <button
//               className="cta-button premium-cta pulse-animation"
//               onClick={scrollToCategories}
//             >
//               <span className="cta-text">
//                 Explore Collection <i className="fas fa-arrow-right"></i>
//               </span>
//               <div className="cta-icon"></div>
//               <div className="cta-glow"></div>
//             </button>
//           </div>

//           {/* Premium Stats */}
//           <div className="hero-stats premium-stats" ref={statsRef}>
//             <div className="hero-stat">
//               <div className="stat-icon">
//                 <i className="fas fa-door-open"></i>
//               </div>
//               <span className="hero-stat-number count-animation">
//                 {currentStat.categories}+
//               </span>
//               <div className="hero-stat-label">
//                 Premium Categories
//               </div>
//             </div>
//             <div className="hero-stat">
//               <div className="stat-icon">
//                 <i className="fas fa-smile"></i>
//               </div>
//               <span className="hero-stat-number count-animation">
//                 {currentStat.customers}+
//               </span>
//               <div className="hero-stat-label">
//                 Satisfied Clients
//               </div>
//             </div>
//             <div className="hero-stat">
//               <div className="stat-icon">
//                 <i className="fas fa-award"></i>
//               </div>
//               <span className="hero-stat-number count-animation">
//                 {currentStat.experience}+
//               </span>
//               <div className="hero-stat-label">
//                 Years Excellence
//               </div>
//             </div>
//           </div>

//           {/* Trust Badges */}
//           <div className="trust-badges">
//             <div className="trust-badge">
//               <i className="fas fa-shield-alt"></i>
//               <span>10 Years Warranty</span>
//             </div>
//             <div className="trust-badge">
//               <i className="fas fa-truck"></i>
//               <span>Free Installation</span>
//             </div>
//             <div className="trust-badge">
//               <i className="fas fa-star"></i>
//               <span>Premium Quality</span>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Premium Swiper Slider */}
//         <div className="hero-slider premium-slider">
//           <div className="slider-frame"></div>
//           <Swiper
//             modules={[Autoplay, EffectFade, Navigation, Parallax]}
//             spaceBetween={0}
//             slidesPerView={1}
//             effect="fade"
//             speed={1500}
//             autoplay={{
//               delay: 4000,
//               disableOnInteraction: false,
//             }}
//             navigation={{
//               nextEl: '.swiper-button-next',
//               prevEl: '.swiper-button-prev',
//             }}
//             parallax={true}
//             loop={true}
//             className="door-swiper premium-swiper"
//           >
//             {doorImages.map((door) => (
//               <SwiperSlide key={door.id}>
//                 <div
//                   className="slide-image premium-slide"
//                   data-swiper-parallax="-100"
//                 >
//                   <img
//                     src={door.src}
//                     alt={door.alt}
//                     loading="eager"
//                     className="premium-door-image"
//                   />
//                   <div className="slide-overlay">
//                     <div className="slide-content">
//                       <h3 className="slide-title" data-swiper-parallax="-200">
//                         {door.title}
//                       </h3>
//                       <p className="slide-subtitle" data-swiper-parallax="-300">
//                         {door.subtitle}
//                       </p>
//                       <div className="slide-badge" data-swiper-parallax="-400">
//                         Premium
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}

//             {/* Premium Navigation Buttons */}
//             <div className="swiper-button-prev premium-nav">
//               <i className="fas fa-chevron-left"></i>
//               <div className="nav-glow"></div>
//             </div>
//             <div className="swiper-button-next premium-nav">
//               <i className="fas fa-chevron-right"></i>
//               <div className="nav-glow"></div>
//             </div>

//             {/* Swiper Pagination */}
//             <div className="swiper-pagination premium-pagination"></div>
//           </Swiper>
//         </div>
//       </div>

//       {/* Premium Scroll Indicator */}
//       <div className="scroll-indicator premium-scroll">
//         <div className="scroll-text">
//           Scroll Down
//         </div>
//         <div className="scroll-line">
//           <div className="scroll-glow"></div>
//         </div>
//       </div>

//       {/* Background Decorative Elements */}
//       <div className="corner-decoration corner-tl"></div>
//       <div className="corner-decoration corner-tr"></div>
//       <div className="corner-decoration corner-bl"></div>
//       <div className="corner-decoration corner-br"></div>
//     </section>
//   )
// }





'use client'
import { useEffect, useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/parallax'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentStat, setCurrentStat] = useState({ categories: 0, customers: 0, experience: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const statsRef = useRef(null)
  const fullText = "Wooden Doors & Windows"
  const typeSpeed = 100
  const eraseSpeed = 50
  const pauseTime = 2000

  useEffect(() => {
    // Start animations
    setIsVisible(true)
    startTypewriter()
    setupIntersectionObserver()
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

      setTimeout(type, typeDelay)
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
    const categoriesStep = 50 / steps

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
      if (experienceCount >= 15) experienceCount = 28

      setCurrentStat({
        categories: Math.floor(categoriesCount),
        customers: Math.floor(customersCount),
        experience: Math.floor(experienceCount)
      })

      if (categoriesCount >= 8 && customersCount >= 1000 && experienceCount >= 15) {
        clearInterval(counterInterval)
      }
    }, stepDuration)
  }

  const scrollToCategories = () => {
    const categoriesSection = document.getElementById('categories')
    if (categoriesSection) {
      categoriesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
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
        {/* Left Side - Premium Content */}
        <div className="hero-content">
          {/* Main Heading with Gradient */}
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
              onClick={scrollToCategories}
            >
              <span className="cta-text">Explore Collection <i className="fas fa-arrow-right"></i></span>
              <div className="cta-icon">
              </div>
              <div className="cta-glow"></div>
            </button>
          </div>
          {/* 👇 YAHAN ADD KARO - EXACT POSITION */}
          {/* <div className="hero-badges">
            <div className="badge-group">
              <div className="badge since-badge">
                <span className="badge-icon">🎯</span>
                <span className="badge-text">Trusted Since 1996</span>
              </div>

              <div className="badge natural-badge">
                <span className="badge-icon">🍃</span>
                <span className="badge-text">100% Natural Wood</span>
              </div>
            </div>
          </div> */}
          {/* 👆 YAHAN TAK ADD KARO */}

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

        {/* Right Side - Premium Swiper Slider */}
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

            {/* Premium Navigation Buttons */}
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

      {/* Premium Scroll Indicator */}
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
  )
}