'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Leaf, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate CTA content
    gsap.fromTo(
      '.cta-content',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate floating elements
    gsap.to('.floating-element', {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.5,
    })

    // Parallax background
    gsap.to('.cta-bg', {
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
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="cta-bg absolute inset-0 bg-gradient-to-br from-sage via-sage/90 to-gold"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/images/sustainable-beauty.jpg"
          alt="Sustainable beauty background"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-element absolute top-20 left-10 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <div className="floating-element absolute top-40 right-20 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <div className="floating-element absolute bottom-20 right-1/3 w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <Leaf className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cta-content text-center text-white">
          {/* Main CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Start Your 
              <span className="block">Zero Waste Journey</span>
              <span className="text-gold">Today</span>
            </h2>
            
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Bergabunglah dengan ribuan orang yang sudah memilih skincare yang lebih baik 
              untuk kulit dan planet kita. Mulai dengan Lumora sekarang.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-sage hover:bg-gray-100 px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                className="border-2 border-white text-white hover:bg-white hover:text-sage px-10 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <Link href="/quiz">
                  Take Skin Quiz
                </Link>
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Natural</h3>
              <p className="opacity-90">
                Bahan-bahan alami pilihan tanpa bahan kimia berbahaya untuk kulit yang sehat.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skin Loving</h3>
              <p className="opacity-90">
                Formula lembut yang menutrisi dan melindungi kulit dari kerusakan lingkungan.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Zero Waste</h3>
              <p className="opacity-90">
                Kemasan ramah lingkungan tanpa plastik untuk masa depan yang berkelanjutan.
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 lg:mt-20 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20">
              <h3 className="text-2xl font-semibold mb-4">
                Get Exclusive Offers & Tips
              </h3>
              <p className="opacity-90 mb-6">
                Dapatkan tips skincare, promo eksklusif, dan update produk terbaru langsung ke email Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
                <Button className="bg-white text-sage hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300">
                  Subscribe
                </Button>
              </div>
              
              <p className="text-sm opacity-70 mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

