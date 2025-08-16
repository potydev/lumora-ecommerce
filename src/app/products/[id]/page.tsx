'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight, Shield, Truck, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils/format'
import { Product } from '@/types/database'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSkinType, setSelectedSkinType] = useState('')
  const [selectedScent, setSelectedScent] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const addItem = useCartStore((state) => state.addItem)

  // Mock product data - in real app this would fetch from Supabase
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Lumora Solid Cleanser — Unscented',
        description: 'Pembersih wajah padat yang lembut dan efektif untuk semua jenis kulit. Formulasi bebas plastik dengan bahan-bahan alami pilihan yang telah teruji secara dermatologi. Cocok untuk penggunaan sehari-hari dan tidak menyebabkan iritasi.',
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
        description: 'Pembersih wajah padat dengan aroma herbal yang menyegarkan. Diperkaya dengan ekstrak tumbuhan alami seperti tea tree dan eucalyptus yang membantu membersihkan pori-pori secara mendalam.',
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
        description: 'Tempat sabun wajah dari bambu alami yang sustainable. Desain minimalis dengan drainase yang baik untuk menjaga sabun tetap kering dan awet. Terbuat dari bambu berkualitas tinggi yang tahan lama.',
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
    ]

    const foundProduct = mockProducts.find(p => p.id === productId)
    setProduct(foundProduct || null)
    setLoading(false)

    if (foundProduct) {
      setSelectedSkinType(foundProduct.skin_type[0] || '')
      setSelectedScent(foundProduct.scent || '')
    }
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      skinType: selectedSkinType,
      scent: selectedScent,
      image: product.images[0] || '/images/placeholder.svg',
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const nextImage = () => {
    if (product) {
      setSelectedImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product) {
      setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-sage">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-sage">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border">
              <Image
                src={product.images[selectedImageIndex] || '/images/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      index === selectedImageIndex ? 'border-sage' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-sage/10 text-sage capitalize">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-red-300 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-sage transition-colors">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-lg font-medium text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-600">
                  ({product.review_count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              {/* Skin Type Selection */}
              {product.skin_type.length > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Skin Type
                  </label>
                  <Select value={selectedSkinType} onValueChange={setSelectedSkinType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.skin_type.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)} Skin
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Scent Selection */}
              {product.scent && product.scent !== 'none' && (
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Scent
                  </label>
                  <div className="text-gray-700 capitalize">
                    {product.scent}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-sage transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-sage transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 10 ? (
                <Badge className="bg-green-100 text-green-800">In Stock</Badge>
              ) : product.stock > 0 ? (
                <Badge className="bg-orange-100 text-orange-800">
                  Only {product.stock} left
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-sage hover:bg-sage/90 text-white py-4 text-lg font-semibold"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - {formatPrice(product.price * quantity)}
              </Button>

              <Button
                variant="outline"
                className="w-full border-sage text-sage hover:bg-sage hover:text-white py-4 text-lg font-semibold"
                size="lg"
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="w-8 h-8 text-sage mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Safe & Natural</div>
                <div className="text-xs text-gray-600">Dermatologically tested</div>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-sage mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Free Shipping</div>
                <div className="text-xs text-gray-600">Orders over Rp 100k</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-sage mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">30-Day Return</div>
                <div className="text-xs text-gray-600">Money back guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.review_count})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {product.description}
                </p>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-3">How to Use</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Basahi wajah dengan air hangat</li>
                  <li>Gosokkan solid cleanser di telapak tangan hingga berbusa</li>
                  <li>Aplikasikan busa ke wajah dengan gerakan memutar lembut</li>
                  <li>Bilas dengan air bersih hingga tidak ada sisa sabun</li>
                  <li>Keringkan wajah dengan handuk bersih</li>
                </ol>
              </div>
            </TabsContent>

            <TabsContent value="ingredients" className="mt-8">
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Natural Ingredients</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Ingredients:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Coconut Oil - Melembapkan dan menutrisi kulit</li>
                      <li>• Olive Oil - Antioksidan alami</li>
                      <li>• Shea Butter - Menenangkan kulit sensitif</li>
                      <li>• Essential Oils - Aromaterapi alami</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Free From:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Sulfates (SLS/SLES)</li>
                      <li>• Parabens</li>
                      <li>• Artificial fragrances</li>
                      <li>• Plastic packaging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                
                {/* Review Summary */}
                <div className="flex items-center space-x-8 mb-8 pb-8 border-b">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      {renderStars(product.rating)}
                    </div>
                    <div className="text-sm text-gray-600">{product.review_count} reviews</div>
                  </div>
                  
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-600 w-8">{star}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: 'Sarah M.',
                      rating: 5,
                      date: '2 weeks ago',
                      comment: 'Produk yang luar biasa! Kulit saya jadi lebih bersih dan tidak kering setelah pakai. Wanginya juga enak dan tidak menyengat.',
                      verified: true
                    },
                    {
                      name: 'Rina D.',
                      rating: 5,
                      date: '1 month ago',
                      comment: 'Suka banget sama konsep zero waste-nya. Sabunnya awet banget, udah 2 bulan masih ada setengah. Recommended!',
                      verified: true
                    },
                    {
                      name: 'Maya K.',
                      rating: 4,
                      date: '1 month ago',
                      comment: 'Bagus sih, tapi butuh waktu untuk terbiasa pakai solid cleanser. Overall satisfied dengan hasilnya.',
                      verified: false
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center text-white font-semibold">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{review.name}</div>
                            <div className="text-sm text-gray-600">{review.date}</div>
                          </div>
                          {review.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

