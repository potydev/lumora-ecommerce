'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/types/database'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Mock products data - in real app this would come from Supabase
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Lumora Solid Cleanser — Unscented',
        description: 'Pembersih wajah padat yang lembut dan efektif untuk semua jenis kulit. Formulasi bebas plastik dengan bahan-bahan alami pilihan.',
        price: 85000,
        category: 'cleanser',
        skin_type: ['all', 'sensitive', 'dry', 'combination'],
        scent: 'unscented',
        images: ['/images/cleanser-unscented-1.jpg', '/images/cleanser-unscented-2.jpg'],
        stock: 50,
        rating: 4.8,
        review_count: 124,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Lumora Solid Cleanser — Herbal',
        description: 'Pembersih wajah padat dengan aroma herbal yang menyegarkan. Diperkaya dengan ekstrak tumbuhan alami.',
        price: 85000,
        category: 'cleanser',
        skin_type: ['normal', 'oily', 'combination'],
        scent: 'herbal',
        images: ['/images/cleanser-herbal-1.jpg'],
        stock: 45,
        rating: 4.9,
        review_count: 89,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Lumora Facial Bar Dish (Bamboo)',
        description: 'Tempat sabun wajah dari bambu alami yang sustainable. Desain minimalis dengan drainase yang baik.',
        price: 45000,
        category: 'accessory',
        skin_type: [],
        scent: 'none',
        images: ['/images/bamboo-dish-1.webp', '/images/bamboo-dish-2.jpg'],
        stock: 30,
        rating: 4.7,
        review_count: 56,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '4',
        name: 'Lumora Starter Bundle',
        description: 'Paket lengkap untuk memulai rutinitas skincare zero waste. Hemat 15% dibanding beli terpisah.',
        price: 140000,
        category: 'bundle',
        skin_type: ['all'],
        scent: 'various',
        images: ['/images/cleanser-unscented-1.jpg'],
        stock: 20,
        rating: 4.9,
        review_count: 67,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    setProducts(mockProducts)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate section title
    gsap.fromTo(
      '.products-title',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.products-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Animate product cards
    gsap.utils.toArray('.product-card').forEach((card: any, index) => {
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
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // Animate CTA section
    gsap.fromTo(
      '.products-cta',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.products-cta',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

  }, [])

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="products-title space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Our 
              <span className="text-sage"> Best Sellers</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Produk-produk pilihan yang paling disukai customer. 
              Mulai perjalanan skincare zero waste Anda hari ini.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product, index) => (
            <div key={product.id} className="product-card">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="products-cta text-center">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Discover All Our Products
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap produk Lumora dan temukan yang paling cocok 
              untuk jenis kulit dan kebutuhan Anda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-sage hover:bg-sage/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-sage text-gray-700 hover:text-sage px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
              >
                <Link href="/quiz">
                  Find Your Match
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mt-20">
          <div className="text-center animate-on-scroll">
            <div className="text-3xl lg:text-4xl font-bold text-sage mb-2">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          
          <div className="text-center animate-on-scroll">
            <div className="text-3xl lg:text-4xl font-bold text-sage mb-2">4.9★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          
          <div className="text-center animate-on-scroll">
            <div className="text-3xl lg:text-4xl font-bold text-sage mb-2">100%</div>
            <div className="text-gray-600">Natural Ingredients</div>
          </div>
          
          <div className="text-center animate-on-scroll">
            <div className="text-3xl lg:text-4xl font-bold text-sage mb-2">0</div>
            <div className="text-gray-600">Plastic Waste</div>
          </div>
        </div>
      </div>
    </section>
  )
}

