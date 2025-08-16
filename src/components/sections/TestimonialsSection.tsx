'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  comment: string
  product: string
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Putri',
      location: 'Jakarta',
      avatar: '/images/avatar-1.jpg',
      rating: 5,
      comment: 'Lumora benar-benar mengubah rutinitas skincare saya! Kulit jadi lebih bersih dan lembut, plus saya merasa berkontribusi untuk lingkungan. Highly recommended!',
      product: 'Lumora Solid Cleanser — Unscented'
    },
    {
      id: 2,
      name: 'Maya Sari',
      location: 'Bandung',
      avatar: '/images/avatar-2.jpg',
      rating: 5,
      comment: 'Awalnya skeptis dengan solid cleanser, tapi setelah coba Lumora, saya jatuh cinta! Wangi herbalnya segar banget dan kulit tidak kering setelah pakai.',
      product: 'Lumora Solid Cleanser — Herbal'
    },
    {
      id: 3,
      name: 'Rina Dewi',
      location: 'Surabaya',
      avatar: '/images/avatar-3.jpg',
      rating: 5,
      comment: 'Starter bundle-nya worth it banget! Dapat cleanser, bamboo dish, dan travel pouch. Packaging-nya juga cantik, cocok buat gift.',
      product: 'Lumora Starter Bundle'
    },
    {
      id: 4,
      name: 'Dinda Ayu',
      location: 'Yogyakarta',
      avatar: '/images/avatar-4.jpg',
      rating: 5,
      comment: 'Sudah 3 bulan pakai Lumora dan hasilnya amazing! Jerawat berkurang, kulit lebih glowing. Yang paling suka, zero waste jadi lebih mudah.',
      product: 'Lumora Solid Cleanser — Unscented'
    },
    {
      id: 5,
      name: 'Fitri Handayani',
      location: 'Medan',
      avatar: '/images/avatar-5.jpg',
      rating: 5,
      comment: 'Bamboo dish-nya kualitas premium! Desainnya minimalis dan fungsional. Sabun jadi awet karena drainase-nya bagus.',
      product: 'Lumora Facial Bar Dish'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate section title
    gsap.fromTo(
      '.testimonials-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonials-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate testimonial cards
    gsap.fromTo(
      '.testimonial-card',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonial-card',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-sage rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gold rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="testimonials-title space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              What Our 
              <span className="text-sage"> Customers Say</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Ribuan customer telah merasakan manfaat Lumora. 
              Dengarkan cerita mereka tentang transformasi kulit dan gaya hidup yang lebih sustainable.
            </p>
          </div>
        </div>

        {/* Main Testimonial */}
        <div className="testimonial-card max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-sage/5 to-gold/5 rounded-3xl p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-sage" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Customer Info */}
              <div className="text-center lg:text-left">
                <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 rounded-full overflow-hidden bg-gray-200">
                  <div className="w-full h-full bg-gradient-to-br from-sage to-gold flex items-center justify-center text-white text-2xl font-bold">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 mb-3">{testimonials[currentIndex].location}</p>
                <div className="flex justify-center lg:justify-start space-x-1 mb-3">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <p className="text-sm text-sage font-medium">
                  {testimonials[currentIndex].product}
                </p>
              </div>

              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                  &quot;{testimonials[currentIndex].comment}&quot;
                </blockquote>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full p-0 border-sage/20 hover:border-sage hover:bg-sage hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full p-0 border-sage/20 hover:border-sage hover:bg-sage hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-sage w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center animate-on-scroll">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-sage" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-sage">10K+</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Reviews</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-sage">98%</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Satisfaction</div>
            <div className="text-gray-600">Rate</div>
          </div>

          <div className="text-center animate-on-scroll">
            <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="text-2xl font-bold text-sage">95%</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">Repurchase</div>
            <div className="text-gray-600">Rate</div>
          </div>
        </div>
      </div>
    </section>
  )
}

