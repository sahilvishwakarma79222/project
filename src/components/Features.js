// 'use client'
// import { useEffect, useState, useRef } from 'react'
// import './Features.css'

// const featuresData = [
//   {
//     icon: '🪵',
//     title: '50+ Wood Types',
//     description: 'Teak, Sagwan, Sheesham, Burma Teak & more premium varieties',
//     color: '#c8a97e'
//   },
//   {
//     icon: '🎨',
//     title: 'Custom Designs',
//     description: 'Personalized carvings, finishes & bespoke solutions',
//     color: '#b8941f'
//   },
//   {
//     icon: '🛡️',
//     title: '10 Years Warranty',
//     description: 'Comprehensive quality assurance guarantee',
//     color: '#a87815'
//   },
//   {
//     icon: '🚚',
//     title: 'All India Delivery',
//     description: 'Free shipping & professional installation',
//     color: '#8b6b3c'
//   }
// ]

// export default function Features() {
//   const [currentStats, setCurrentStats] = useState({
//     categories: 0,
//     customers: 0,
//     experience: 0,
//     states: 0
//   })
//   const [isVisible, setIsVisible] = useState(false)
//   const sectionRef = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true)
//             startCounterAnimation()
//             observer.unobserve(entry.target)
//           }
//         })
//       },
//       { threshold: 0.2 }
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   const startCounterAnimation = () => {
//     const duration = 2000
//     const steps = 60
//     const stepDuration = duration / steps

//     const counters = {
//       categories: 0,
//       customers: 0,
//       experience: 0,
//       states: 0
//     }

//     const stepsValue = {
//       categories: 50 / steps,
//       customers: 1000 / steps,
//       experience: 15 / steps,
//       states: 28 / steps
//     }

//     const counterInterval = setInterval(() => {
//       counters.categories += stepsValue.categories
//       counters.customers += stepsValue.customers
//       counters.experience += stepsValue.experience
//       counters.states += stepsValue.states

//       if (counters.categories >= 50) counters.categories = 50
//       if (counters.customers >= 1000) counters.customers = 1000
//       if (counters.experience >= 15) counters.experience = 15
//       if (counters.states >= 28) counters.states = 28

//       setCurrentStats({
//         categories: Math.floor(counters.categories),
//         customers: Math.floor(counters.customers),
//         experience: Math.floor(counters.experience),
//         states: Math.floor(counters.states)
//       })

//       if (
//         counters.categories >= 50 &&
//         counters.customers >= 1000 &&
//         counters.experience >= 15 &&
//         counters.states >= 28
//       ) {
//         clearInterval(counterInterval)
//       }
//     }, stepDuration)
//   }

//   return (
//     <section className="features-section" ref={sectionRef}>
//       {/* Background Elements */}
//       <div className="features-background">
//         <div className="bg-pattern"></div>
//       </div>

//       <div className="features-container">
//         {/* Section Header */}
//         <div className="section-header">
//           <span className="section-tag">WHY CHOOSE US</span>
//           <h2 className="section-title">
//             Premium <span className="highlight">Features</span> That Set Us Apart
//           </h2>
//           <div className="title-decoration">
//             <div className="deco-line"></div>
//             <div className="deco-dot"></div>
//             <div className="deco-line"></div>
//           </div>
//           <p className="section-description">
//             Experience excellence with our commitment to quality, craftsmanship, and customer satisfaction
//           </p>
//         </div>

//         {/* Features Grid - Mobile: 2 per row, Desktop: 4 per row */}
//         <div className="features-grid">
//           {featuresData.map((feature, index) => (
//             <div
//               key={index}
//               className={`feature-card ${isVisible ? 'visible' : ''}`}
//               style={{ '--card-index': index, '--color': feature.color }}
//             >
//               {/* Card Glow */}
//               <div className="card-glow"></div>

//               {/* Icon Container */}
//               <div className="icon-container">
//                 <div className="icon-bg"></div>
//                 <span className="icon">{feature.icon}</span>
//               </div>

//               {/* Feature Content */}
//               <div className="feature-content">
//                 <h3 className="feature-title">{feature.title}</h3>
//                 <p className="feature-description">{feature.description}</p>
//               </div>

//               {/* Hover Effect */}
//               <div className="hover-effect"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }



// 'use client'
// import { useEffect, useState, useRef } from 'react'
// import './Features.css'

// const featuresData = [
//   {
//     icon: '🪵',
//     title: '50+ Premium Wood Types',
//     description: 'Teak, Sagwan, Sheesham, Burma Teak & more exclusive varieties for lasting beauty',
//     color: '#c8a97e'
//   },
//   {
//     icon: '🎨',
//     title: 'Bespoke Custom Designs',
//     description: 'Personalized carvings, custom finishes & unique bespoke furniture solutions',
//     color: '#b8941f'
//   },
//   {
//     icon: '🛡️',
//     title: '15-Year Warranty',
//     description: 'Comprehensive quality assurance with industry-leading warranty coverage',
//     color: '#a87815'
//   },
//   {
//     icon: '🚚',
//     title: 'Pan-India Delivery',
//     description: 'Free shipping across India with professional installation service',
//     color: '#8b6b3c'
//   }
// ]

// const statsData = [
//   { value: 50, label: 'Wood Types', suffix: '+' },
//   { value: 1500, label: 'Happy Customers', suffix: '+' },
//   { value: 15, label: 'Years Experience', suffix: '' },
//   { value: 28, label: 'States Covered', suffix: '' }
// ]

// export default function Features() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [animatedStats, setAnimatedStats] = useState(statsData.map(() => 0))
//   const sectionRef = useRef(null)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true)
//             startCounterAnimation()
//             observer.unobserve(entry.target)
//           }
//         })
//       },
//       { 
//         threshold: 0.1,
//         rootMargin: '50px'
//       }
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current)
//       }
//     }
//   }, [])

//   const startCounterAnimation = () => {
//     const duration = 2000
//     const steps = 60
//     const stepDuration = duration / steps

//     const increments = statsData.map(stat => stat.value / steps)
//     const currentValues = statsData.map(() => 0)

//     const counterInterval = setInterval(() => {
//       let allComplete = true

//       const newValues = statsData.map((stat, index) => {
//         if (currentValues[index] < stat.value) {
//           currentValues[index] += increments[index]
//           if (currentValues[index] > stat.value) {
//             currentValues[index] = stat.value
//           }
//           allComplete = false
//         }
//         return Math.floor(currentValues[index])
//       })

//       setAnimatedStats(newValues)

//       if (allComplete) {
//         clearInterval(counterInterval)
//       }
//     }, stepDuration)
//   }

//   return (
//     <section className="features-section" ref={sectionRef}>
//       {/* Background Elements */}
//       <div className="features-background">
//         <div className="bg-pattern"></div>
//         <div className="gold-particle particle-1"></div>
//         <div className="gold-particle particle-2"></div>
//         <div className="gold-particle particle-3"></div>
//       </div>

//       <div className="features-container">
//         {/* Section Header */}
//         <div className="section-header">
//           <span className="section-tag">WHY CHOOSE US</span>
//           <h2 className="section-title">
//             Premium <span className="highlight">Features</span> That Set Us Apart
//           </h2>
//           <p className="section-description">
//             Experience excellence with our commitment to quality craftsmanship, premium materials, 
//             and unparalleled customer satisfaction that defines luxury furniture
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="features-grid">
//           {featuresData.map((feature, index) => (
//             <div
//               key={index}
//               className={`feature-card ${isVisible ? 'visible' : ''}`}
//               style={{ 
//                 '--card-index': index,
//                 '--color': feature.color,
//                 animationDelay: `${index * 0.15}s`
//               }}
//             >
//               {/* Background Pattern */}
//               <div className="card-bg-pattern"></div>

//               {/* Icon Container */}
//               <div className="icon-container" style={{ background: feature.color }}>
//                 <div className="icon-wrapper">
//                   <div className="icon-bg"></div>
//                   <span className="icon">{feature.icon}</span>
//                 </div>
//               </div>

//               {/* Feature Content */}
//               <div className="feature-content">
//                 <h3 className="feature-title">{feature.title}</h3>
//                 <p className="feature-description">{feature.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Counter */}
//         <div className="stats-container">
//           {statsData.map((stat, index) => (
//             <div key={index} className="stat-item">
//               <span className="stat-number">
//                 {animatedStats[index]}
//                 {stat.suffix}
//               </span>
//               <span className="stat-label">{stat.label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'
import { useEffect, useState, useRef } from 'react'
import './Features.css'

const featuresData = [
  {
    icon: '🪵',
    title: '100% Pure Sagwan Wood',
    description: 'Genuine Sagwan (Teak) wood only - natural, durable, and premium quality furniture',
    color: '#c8a97e'
  },
  {
    icon: '🎨',
    title: 'Custom Design Service',
    description: 'Personalized furniture designs tailored to your specific needs and preferences',
    color: '#b8941f'
  },
  {
    icon: '🔧',
    title: 'Expert Craftsmanship',
    description: 'Handcrafted by skilled artisans with decades of traditional woodworking experience',
    color: '#a87815'
  },
  {
    icon: '🚚',
    title: 'Pan-India Delivery',
    description: 'Safe and secure delivery across all states in India with professional installation',
    color: '#8b6b3c'
  }
]

const statsData = [
  { value: 26, label: 'Years Experience', suffix: '+' },
  { value: 1000, label: 'Happy Customers', suffix: '+' },
  { value: 1, label: 'Premium Wood Type', suffix: '' },
  { value: 28, label: 'States Covered', suffix: '' }
]

export default function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedStats, setAnimatedStats] = useState(statsData.map(() => 0))
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            startCounterAnimation()
            observer.unobserve(entry.target)
          }
        })
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const startCounterAnimation = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const increments = statsData.map(stat => stat.value / steps)
    const currentValues = statsData.map(() => 0)

    const counterInterval = setInterval(() => {
      let allComplete = true

      const newValues = statsData.map((stat, index) => {
        if (currentValues[index] < stat.value) {
          currentValues[index] += increments[index]
          if (currentValues[index] > stat.value) {
            currentValues[index] = stat.value
          }
          allComplete = false
        }
        return Math.floor(currentValues[index])
      })

      setAnimatedStats(newValues)

      if (allComplete) {
        clearInterval(counterInterval)
      }
    }, stepDuration)
  }

  return (
    <section className="features-section" ref={sectionRef}>
      {/* Background Elements */}
      <div className="features-background">
        <div className="bg-pattern"></div>
        <div className="gold-particle particle-1"></div>
        <div className="gold-particle particle-2"></div>
        <div className="gold-particle particle-3"></div>
      </div>

      <div className="features-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">WHY CHOOSE US</span>
          <h2 className="section-title">
            Premium <span className="highlight">Sagwan Wood</span> Excellence
          </h2>
          <p className="section-description">
            Experience authentic craftsmanship with 100% pure Sagwan wood furniture, 
            handcrafted by skilled artisans for generations of durability
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${isVisible ? 'visible' : ''}`}
              style={{ 
                '--card-index': index,
                '--color': feature.color,
                animationDelay: `${index * 0.15}s`
              }}
            >
              {/* Background Pattern */}
              <div className="card-bg-pattern"></div>

              {/* Icon Container */}
              <div className="icon-container" style={{ background: feature.color }}>
                <div className="icon-wrapper">
                  <div className="icon-bg"></div>
                  <span className="icon">{feature.icon}</span>
                </div>
              </div>

              {/* Feature Content */}
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Counter */}
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-number">
                {animatedStats[index]}
                {stat.suffix}
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}