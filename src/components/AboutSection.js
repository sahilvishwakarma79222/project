
'use client'

import { useState, useEffect, useRef } from 'react'
import { FaLeaf, FaAward, FaHeart, FaHistory, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function AboutSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const slides = [
        {
            icon: FaLeaf,
            title: "Natural Excellence",
            desc: "100% natural wood, zero chemicals. Pure craftsmanship that stands the test of time.",
            color: "#8B4513"
        },
        {
            icon: FaAward,
            title: "Legacy Quality",
            desc: "28+ years of uncompromising quality. Every piece carries our family legacy.",
            color: "#D4AF37"
        },
        {
            icon: FaHeart,
            title: "Art With Heart",
            desc: "\"Maa Kripa\" - Mother's Blessing guides our craftsmanship with love and care.",
            color: "#8B4513"
        }
    ]

    const autoPlayRef = useRef(null)

    // Auto-swipe functionality ONLY for mobile
    useEffect(() => {
        // Check if mobile screen
        const isMobile = window.innerWidth <= 768
        
        if (!isAutoPlaying || !isMobile) return

        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 3000)

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current)
            }
        }
    }, [isAutoPlaying, slides.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    return (
        <>
            <section className="about-section">
                <div className="wood-pattern"></div>
                
                <div className="container">
                    {/* Header - Same for both */}
                    <div className="about-header">
                        <div className="badge">
                            <FaHistory />
                            <span>Since 1996</span>
                        </div>
                        
                        <h2>
                            Welcome to <span className="brand-name">Maa Kripa Wood Art</span>
                        </h2>
                        
                        <p className="subtitle">
                            Where <strong>heritage craftsmanship</strong> meets <strong>modern elegance</strong>. 
                            Crafting timeless wooden masterpieces for 28+ years.
                        </p>
                    </div>

                    {/* Desktop View - Original Grid */}
                    <div className="desktop-view">
                        <div className="philosophy-grid">
                            <div className="philosophy-card">
                                <div className="icon-wrapper">
                                    <FaLeaf />
                                </div>
                                <h3>Natural Excellence</h3>
                                <p>100% natural wood, zero chemicals. Pure craftsmanship that stands the test of time.</p>
                            </div>

                            <div className="philosophy-card">
                                <div className="icon-wrapper">
                                    <FaAward />
                                </div>
                                <h3>Legacy Quality</h3>
                                <p>28+ years of uncompromising quality. Every piece carries our family legacy.</p>
                            </div>

                            <div className="philosophy-card">
                                <div className="icon-wrapper">
                                    <FaHeart />
                                </div>
                                <h3>Art With Heart</h3>
                                <p>"Maa Kripa" - Mother's Blessing guides our craftsmanship with love and care.</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile View - Carousel */}
                    <div className="mobile-view">
                        <div className="carousel-container">
                            <div className="carousel-header">
                                <h3></h3>
                                <div className="auto-play-indicator">
                                    {/* <div className={`indicator-dot ${isAutoPlaying ? 'active' : ''}`}></div> */}
                                    <span></span>
                                </div>
                            </div>

                            <div className="carousel-wrapper">
                                <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous">
                                    <FaChevronLeft />
                                </button>
                                
                                <div className="carousel">
                                    {slides.map((slide, index) => {
                                        const Icon = slide.icon
                                        return (
                                            <div 
                                                key={index}
                                                className={`slide ${index === currentSlide ? 'active' : ''}`}
                                            >
                                                <div className="icon-wrapper" style={{background: `linear-gradient(135deg, rgba(${slide.color === '#8B4513' ? '139, 69, 19' : '212, 175, 55'}, 0.1) 0%, rgba(${slide.color === '#8B4513' ? '212, 175, 55' : '139, 69, 19'}, 0.1) 100%)`}}>
                                                    <Icon style={{color: slide.color}} />
                                                </div>
                                                <h3>{slide.title}</h3>
                                                <p>{slide.desc}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next">
                                    <FaChevronRight />
                                </button>
                            </div>

                            <div className="dots-indicator">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                                        onClick={() => goToSlide(index)}
                                        aria-label={`Go to slide ${index + 1}`}
                                    >
                                        <div className="dot-inner"></div>
                                    </button>
                                ))}
                            </div>

                    
                        </div>
                    </div>

                    {/* Story Section - Same for both */}
                    <div className="compact-story">
                        <div className="story-content">
                            <div className="text-content">
                                <h3>Our Journey</h3>
                                <p>
                                    Founded in 1996, <strong>Maa Kripa Wood Art</strong> began as a passion project 
                                    and grew into a trusted name through dedication to quality and customer 
                                    satisfaction. Our name reflects the divine blessing that guides our craft.
                                </p>
                            </div>
                            
                            <div className="years-badge">
                                <div className="years-number">28+</div>
                                <div className="years-label">Years of Excellence</div>
                                <div className="years-range">1996 - Present</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .about-section {
                    padding: 80px 20px;
                    position: relative;
                    background: #FFFFFF;
                    overflow: hidden;
                }

                .wood-pattern {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238B4513' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
                    opacity: 0.3;
                    pointer-events: none;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                /* Header Styles - Common */
                .about-header {
                    text-align: center;
                    margin-bottom: 50px;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%);
                    padding: 8px 25px;
                    border-radius: 25px;
                    margin-bottom: 20px;
                    border: 1px solid rgba(139, 69, 19, 0.15);
                }

                .badge svg {
                    color: #8B4513;
                    font-size: 14px;
                }

                .badge span {
                    color: #8B4513;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                }

                h2 {
                    font-size: 36px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 15px;
                    line-height: 1.2;
                }

                .brand-name {
                    color: #8B4513;
                    position: relative;
                    display: inline-block;
                }

                .brand-name::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #8B4513, #D4AF37, #8B4513);
                    border-radius: 2px;
                }

                .subtitle {
                    font-size: 16px;
                    color: #6B7280;
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                /* Desktop View - ALWAYS SHOW */
                .desktop-view {
                    display: block;
                }

                .philosophy-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 25px;
                    margin-bottom: 50px;
                }

                .philosophy-card {
                    background: white;
                    padding: 30px;
                    border-radius: 1px 35px 1px 35px;
                    box-shadow: 0 10px 30px rgba(139, 69, 19, 0.08);
                    border: 1px solid rgba(139, 69, 19, 0.1);
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .philosophy-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(139, 69, 19, 0.12);
                }

                .philosophy-card .icon-wrapper {
                    background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%);
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: #8B4513;
                    font-size: 24px;
                }

                .philosophy-card h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 10px;
                }

                .philosophy-card p {
                    font-size: 14px;
                    color: #6B7280;
                    line-height: 1.6;
                }

                /* Mobile View - HIDE BY DEFAULT */
                .mobile-view {
                    display: none;
                }

                /* Story Section - Common */
                .compact-story {
                    background: linear-gradient(135deg, #FDF8F3 0%, #FFFFFF 100%);
                    border-radius: 15px;
                    padding: 40px;
                    border: 1px solid rgba(139, 69, 19, 0.1);
                    position: relative;
                }

                .story-content {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }

                .text-content {
                    flex: 1;
                }

                .text-content h3 {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1F2937;
                    margin-bottom: 15px;
                }

                .text-content p {
                    font-size: 15px;
                    line-height: 1.7;
                    color: #4B5563;
                }

                .years-badge {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    border: 1px solid rgba(139, 69, 19, 0.1);
                    text-align: center;
                    min-width: 140px;
                }

                .years-number {
                    font-size: 48px;
                    font-weight: 800;
                    color: #8B4513;
                    margin-bottom: 10px;
                    line-height: 1;
                }

                .years-label {
                    font-size: 16px;
                    font-weight: 600;
                    color: #1F2937;
                    margin-bottom: 5px;
                }

                .years-range {
                    font-size: 14px;
                    color: #6B7280;
                }

                /* ===== MOBILE STYLES (768px se neeche) ===== */
                @media (max-width: 768px) {
                    /* Hide Desktop View on Mobile */
                    .desktop-view {
                        display: none;
                    }
                    
                    /* Show Mobile View on Mobile */
                    .mobile-view {
                        display: block;
                    }
                    
                    /* Mobile Specific Styles */
                    .about-section {
                        padding: 40px 12px 30px;
                    }
                    
                    h2 {
                        font-size: 20px;
                    }
                    
                    .subtitle {
                        font-size: 13px;
                        max-width: 280px;
                    }
                    
                    /* Mobile Carousel Styles */
                    .carousel-container {
                        margin-bottom: 30px;
                    }
                    
                    .carousel-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 15px;
                    }
                    
                    .carousel-header h3 {
                        font-size: 16px;
                        font-weight: 700;
                        color: #1F2937;
                        margin: 0;
                    }
                    
                    .auto-play-indicator {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    
                    .indicator-dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background-color: #D4AF37;
                        animation: pulse 2s infinite;
                    }
                    
                    .indicator-dot.active {
                        background-color: #8B4513;
                    }
                    
                    .auto-play-indicator span {
                        font-size: 10px;
                        color: #6B7280;
                    }
                    
                    .carousel-wrapper {
                        display: flex;
                        align-items: center;
                        gap: 5px;
                    }
                    
                    .nav-btn {
                        background: white;
                        border: 1px solid rgba(139, 69, 19, 0.1);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #8B4513;
                        cursor: pointer;
                        transition: all 0.2s;
                        flex-shrink: 0;
                        z-index: 2;
                    }
                    
                    .nav-btn:active {
                        transform: scale(0.95);
                        background: rgba(139, 69, 19, 0.05);
                    }
                    
                    .carousel {
                        flex: 1;
                        position: relative;
                        height: 220px;
                        overflow: hidden;
                    }
                    
                    .slide {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 4px 16px rgba(139, 69, 19, 0.08);
                        border: 1px solid rgba(139, 69, 19, 0.1);
                        padding: 20px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        transition: transform 0.5s ease, opacity 0.5s ease;
                    }
                    
                    .slide.active {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    
                    .slide:not(.active) {
                        opacity: 0;
                        pointer-events: none;
                    }
                    
                    .mobile-view .icon-wrapper {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 15px;
                        font-size: 24px;
                    }
                    
                    .slide h3 {
                        font-size: 18px;
                        font-weight: 700;
                        color: #1F2937;
                        margin-bottom: 8px;
                    }
                    
                    .slide p {
                        font-size: 13px;
                        color: #6B7280;
                        line-height: 1.4;
                    }
                    
                    /* Dots Indicator */
                    .dots-indicator {
                        display: flex;
                        justify-content: center;
                        gap: 8px;
                        margin-top: 15px;
                    }
                    
                    .dot {
                        background: none;
                        border: none;
                        padding: 5px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .dot-inner {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background: rgba(139, 69, 19, 0.2);
                        transition: all 0.3s;
                    }
                    
                    .dot.active .dot-inner {
                        width: 24px;
                        border-radius: 4px;
                        background: #8B4513;
                    }
                    
                    /* Swipe Hint */
                    .swipe-hint {
                        margin-top: 10px;
                        text-align: center;
                    }
                    
                    .swipe-arrows {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        opacity: 0.7;
                    }
                    
                    .swipe-arrows .arrow {
                        color: #8B4513;
                        font-size: 12px;
                        animation: bounce 2s infinite;
                    }
                    
                    .swipe-arrows span {
                        font-size: 11px;
                        color: #6B7280;
                    }
                    
                    /* Mobile Story Section */
                    .compact-story {
                        padding: 20px 16px;
                        border-radius: 10px;
                    }
                    
                    .story-content {
                        flex-direction: column;
                        gap: 16px;
                    }
                    
                    .text-content h3 {
                        font-size: 15px;
                    }
                    
                    .text-content p {
                        font-size: 11px;
                    }
                    
                    .years-badge {
                        padding: 12px;
                        min-width: 80px;
                    }
                    
                    .years-number {
                        font-size: 24px;
                    }
                    
                    .years-label {
                        font-size: 11px;
                    }
                    
                    .years-range {
                        font-size: 10px;
                    }
                }

                /* Tablet Styles (768px - 1024px) */
                @media (min-width: 768px) and (max-width: 1024px) {
                    .about-section {
                        padding: 60px 20px;
                    }
                    
                    h2 {
                        font-size: 32px;
                    }
                    
                    .philosophy-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 20px;
                    }
                    
                    .philosophy-card {
                        padding: 25px;
                    }
                    
                    .subtitle {
                        font-size: 15px;
                        max-width: 600px;
                    }
                }

                /* Animations */
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                @keyframes bounce {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(3px); }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .about-section > .container > * {
                    animation: fadeIn 0.6s ease-out;
                }

                .philosophy-card {
                    animation: fadeIn 0.6s ease-out;
                }

                .philosophy-card:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .philosophy-card:nth-child(3) {
                    animation-delay: 0.4s;
                }
            `}</style>
        </>
    )
}