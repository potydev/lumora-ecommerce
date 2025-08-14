'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils/format'
import { Product } from '@/types/database'

interface ProductCardProps {
  product: Product
  layout?: 'grid' | 'list'
}

export default function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // For products with variations, redirect to product page
    if (product.skin_type.length > 1 || product.scent !== 'none') {
      window.location.href = `/products/${product.id}`
      return
    }

    // Add to cart directly for simple products
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      skinType: product.skin_type[0] || 'all',
      scent: product.scent,
      image: product.images[0] || '/images/placeholder.svg',
    })
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLiked(!isLiked)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cleanser':
        return 'bg-sage/10 text-sage'
      case 'accessory':
        return 'bg-blue-50 text-blue-600'
      case 'bundle':
        return 'bg-gold/10 text-gold'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'cleanser':
        return 'Cleanser'
      case 'accessory':
        return 'Accessory'
      case 'bundle':
        return 'Bundle'
      default:
        return category
    }
  }

  if (layout === 'list') {
    return (
      <Link href={`/products/${product.id}`}>
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="flex">
            {/* Image */}
            <div className="relative w-48 h-48 flex-shrink-0">
              <Image
                src={product.images[0] || '/images/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="192px"
              />
              {product.stock < 10 && product.stock > 0 && (
                <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                  Low Stock
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-2">
                <Badge className={getCategoryColor(product.category)}>
                  {getCategoryLabel(product.category)}
                </Badge>
                <button
                  onClick={handleToggleLike}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center space-x-1 mb-3">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating} ({product.review_count})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </div>
                  {product.scent && product.scent !== 'none' && (
                    <div className="text-sm text-gray-500">
                      Scent: {product.scent}
                    </div>
                  )}
                  {product.skin_type.length > 0 && !product.skin_type.includes('all') && (
                    <div className="text-sm text-gray-500">
                      For: {product.skin_type.join(', ')} skin
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="bg-sage hover:bg-sage/90 text-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid layout (default)
  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || '/images/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className={getCategoryColor(product.category)}>
              {getCategoryLabel(product.category)}
            </Badge>
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="bg-orange-500 text-white">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="bg-red-500 text-white">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <button
              onClick={handleToggleLike}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-red-500"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-red-500' : ''}`} />
            </button>
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 text-gray-400 hover:text-sage">
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-white text-sage hover:bg-gray-100 shadow-lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-sage transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.review_count})
            </span>
          </div>

          {/* Product Details */}
          <div className="space-y-1 mb-3">
            {product.scent && product.scent !== 'none' && (
              <div className="text-sm text-gray-500">
                Scent: {product.scent}
              </div>
            )}
            {product.skin_type.length > 0 && !product.skin_type.includes('all') && (
              <div className="text-sm text-gray-500">
                For: {product.skin_type.join(', ')} skin
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </div>
        </div>
      </div>
    </Link>
  )
}

