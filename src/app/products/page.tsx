'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import ProductCard from '@/components/product/ProductCard'
import { Product } from '@/types/database'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Mock products data - in real app this would come from Supabase
  useEffect(() => {
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
        name: 'Lumora Travel Pouch',
        description: 'Kantong travel dari bahan organik untuk menyimpan solid cleanser saat bepergian. Tahan air dan mudah dibersihkan.',
        price: 35000,
        category: 'accessory',
        skin_type: [],
        scent: 'none',
        images: ['/images/travel-pouch-1.jpg'],
        stock: 25,
        rating: 4.6,
        review_count: 42,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '5',
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
      {
        id: '6',
        name: 'Lumora Solid Cleanser — Lavender',
        description: 'Pembersih wajah padat dengan aroma lavender yang menenangkan. Cocok untuk rutinitas malam hari.',
        price: 85000,
        category: 'cleanser',
        skin_type: ['normal', 'dry', 'sensitive'],
        scent: 'lavender',
        images: ['/images/cleanser-unscented-1.jpg'],
        stock: 35,
        rating: 4.8,
        review_count: 73,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    setProducts(mockProducts)
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      
      const matchesSkinType = selectedSkinType === 'all' || 
                             product.skin_type.includes(selectedSkinType) ||
                             product.skin_type.includes('all')

      return matchesSearch && matchesCategory && matchesSkinType
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [products, searchQuery, selectedCategory, selectedSkinType, sortBy])

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'cleanser', label: 'Solid Cleansers' },
    { value: 'accessory', label: 'Accessories' },
    { value: 'bundle', label: 'Bundles' },
  ]

  const skinTypes = [
    { value: 'all', label: 'All Skin Types' },
    { value: 'normal', label: 'Normal' },
    { value: 'dry', label: 'Dry' },
    { value: 'oily', label: 'Oily' },
    { value: 'combination', label: 'Combination' },
    { value: 'sensitive', label: 'Sensitive' },
  ]

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ]

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={selectedCategory === category.value}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sage focus:ring-sage"
              />
              <span className="text-sm text-gray-700">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skin Type Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Skin Type</h3>
        <div className="space-y-2">
          {skinTypes.map(skinType => (
            <label key={skinType.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="skinType"
                value={skinType.value}
                checked={selectedSkinType === skinType.value}
                onChange={(e) => setSelectedSkinType(e.target.value)}
                className="text-sage focus:ring-sage"
              />
              <span className="text-sm text-gray-700">{skinType.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={() => {
          setSelectedCategory('all')
          setSelectedSkinType('all')
          setSearchQuery('')
        }}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of sustainable skincare products. 
              Clean skin, zero plastic.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Filter */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="bg-sage/10 text-sage">
                {categories.find(c => c.value === selectedCategory)?.label}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="ml-2 hover:text-sage/70"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedSkinType !== 'all' && (
              <Badge variant="secondary" className="bg-sage/10 text-sage">
                {skinTypes.find(s => s.value === selectedSkinType)?.label}
                <button
                  onClick={() => setSelectedSkinType('all')}
                  className="ml-2 hover:text-sage/70"
                >
                  ×
                </button>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="secondary" className="bg-sage/10 text-sage">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 hover:text-sage/70"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    layout={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

