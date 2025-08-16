'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Droplets, Shield, Recycle, Heart, Sparkles } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate feature cards on scroll
    gsap.utils.toArray('.feature-card').forEach((card: HTMLElement, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Animate section title
    gsap.fromTo(
      '.features-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.features-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate background image with parallax
    gsap.to('.features-bg-image', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

  }, [])

  const features = [
    {
      icon: Leaf,
      title: '100% Natural Ingredients',
      description: 'Dibuat dari bahan-bahan alami pilihan tanpa bahan kimia berbahaya. Aman untuk semua jenis kulit.',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Droplets,
      title: 'Deep Cleansing Formula',
      description: 'Membersihkan kotoran dan minyak berlebih secara mendalam tanpa membuat kulit kering.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Shield,
      title: 'Gentle & Safe',
      description: 'Formula lembut yang cocok untuk kulit sensitif. Telah teruji dermatologi dan hypoallergenic.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Recycle,
      title: 'Zero Waste Packaging',
      description: 'Kemasan ramah lingkungan tanpa plastik. Berkontribusi untuk bumi yang lebih bersih.',
      color: 'text-sage',
      bgColor: 'bg-sage/10',
    },
    {
      icon: Heart,
      title: 'Skin Nourishing',
      description: 'Menutrisi kulit dengan vitamin dan mineral alami untuk kulit yang sehat dan bercahaya.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: Sparkles,
      title: 'Long Lasting',
      description: 'Satu bar dapat digunakan hingga 2-3 bulan. Lebih ekonomis dibanding pembersih cair.',
      color: 'text-gold',
      bgColor: 'bg-gold/10',
    },
  ]

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="features-bg-image absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3 h-full opacity-5">
        <Image
          src="/images/natural-skincare-routine.jpg"
          alt="Natural skincare background"
          fill
          className="object-cover"
          sizes="33vw"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="features-title space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Why Choose 
              <span className="text-sage"> Lumora</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Lebih dari sekadar pembersih wajah. Lumora adalah komitmen untuk kulit sehat 
              dan lingkungan yang berkelanjutan.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="feature-card group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-sage/20 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-sage transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-gold/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="animate-on-scroll bg-gradient-to-r from-sage to-gold p-8 rounded-3xl text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Transform Your Skincare Routine?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Bergabunglah dengan ribuan customer yang sudah merasakan manfaat Lumora
            </p>
            <button className="bg-white text-sage px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sage/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl"></div>
    </section>
  )
}

