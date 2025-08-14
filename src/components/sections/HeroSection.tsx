'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ArrowRight, Leaf, Recycle, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return

    // Hero content animation
    const tl = gsap.timeline({ delay: 0.5 })
    
    tl.fromTo(
      '.hero-badge',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(
      '.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(
      '.hero-cta',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-features',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.2'
    )

    // Image animation
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, rotation: -5 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 1.2, 
        ease: 'power2.out',
        delay: 0.8
      }
    )

    // Floating animation for product image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Parallax effect
    gsap.to('.hero-bg-pattern', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

  }, [])

  return (
    <section 
      ref={sectionRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-sage/5"
    >
      {/* Background Pattern */}
      <div className="hero-bg-pattern absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gold rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-sage rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gold rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="hero-content space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center space-x-2 bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium">
              <Leaf className="w-4 h-4" />
              <span>100% Natural & Eco-Friendly</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Solid Facial Cleanser
                <span className="block text-sage">Clean Skin,</span>
                <span className="block text-gold">Zero Plastic</span>
              </h1>
              
              <p className="hero-subtitle text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Pembersih wajah padat premium yang ramah lingkungan. 
                Formulasi alami untuk kulit sehat dan bumi yang lebih baik.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="lg" 
                className="bg-sage hover:bg-sage/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-sage text-gray-700 hover:text-sage px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>

            {/* Features */}
            <div className="hero-features grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-sage" />
                </div>
                <p className="text-sm font-medium text-gray-700">100% Natural</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Recycle className="w-6 h-6 text-sage" />
                </div>
                <p className="text-sm font-medium text-gray-700">Zero Waste</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-sage" />
                </div>
                <p className="text-sm font-medium text-gray-700">Skin Loving</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-image relative">
            <div 
              ref={imageRef}
              className="relative w-full max-w-lg mx-auto"
            >
              {/* Main Product Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-sage/20 to-gold/20 p-8">
                <Image
                  src="/images/hero-woman-cleanser.jpg"
                  alt="Woman using Lumora Solid Facial Cleanser"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gold rounded-full shadow-lg flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-sage/10 rounded-3xl"></div>
              <div className="absolute -z-20 top-16 left-16 w-full h-full bg-gold/10 rounded-3xl"></div>
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-lg p-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-sage">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>

            <div className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-lg p-4 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-gold">4.9★</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

