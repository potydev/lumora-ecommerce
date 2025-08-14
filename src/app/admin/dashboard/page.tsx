'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  Star,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils/format'

interface StatCard {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: React.ElementType
}

interface RecentOrder {
  id: string
  customer: string
  product: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Total Revenue',
      value: 'Rp 2,450,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign
    },
    {
      title: 'Total Orders',
      value: '156',
      change: '+8.2%',
      changeType: 'increase',
      icon: ShoppingCart
    },
    {
      title: 'Total Products',
      value: '24',
      change: '+2',
      changeType: 'increase',
      icon: Package
    },
    {
      title: 'Total Customers',
      value: '89',
      change: '+15.3%',
      changeType: 'increase',
      icon: Users
    }
  ])

  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([
    {
      id: 'ORD-001',
      customer: 'Sarah Johnson',
      product: 'Lumora Solid Cleanser — Herbal',
      amount: 85000,
      status: 'processing',
      date: '2025-01-13'
    },
    {
      id: 'ORD-002',
      customer: 'Michael Chen',
      product: 'Lumora Starter Bundle',
      amount: 250000,
      status: 'shipped',
      date: '2025-01-13'
    },
    {
      id: 'ORD-003',
      customer: 'Emily Davis',
      product: 'Lumora Solid Cleanser — Unscented',
      amount: 75000,
      status: 'delivered',
      date: '2025-01-12'
    },
    {
      id: 'ORD-004',
      customer: 'David Wilson',
      product: 'Lumora Travel Pouch',
      amount: 45000,
      status: 'pending',
      date: '2025-01-12'
    },
    {
      id: 'ORD-005',
      customer: 'Lisa Anderson',
      product: 'Lumora Facial Bar Dish',
      amount: 65000,
      status: 'processing',
      date: '2025-01-11'
    }
  ])

  const [topProducts, setTopProducts] = useState<TopProduct[]>([
    {
      id: '1',
      name: 'Lumora Solid Cleanser — Herbal',
      sales: 45,
      revenue: 3825000,
      image: '/images/product-herbal.jpg'
    },
    {
      id: '2',
      name: 'Lumora Solid Cleanser — Unscented',
      sales: 38,
      revenue: 2850000,
      image: '/images/product-unscented.jpg'
    },
    {
      id: '3',
      name: 'Lumora Starter Bundle',
      sales: 22,
      revenue: 5500000,
      image: '/images/product-bundle.jpg'
    },
    {
      id: '4',
      name: 'Lumora Travel Pouch',
      sales: 31,
      revenue: 1395000,
      image: '/images/product-pouch.jpg'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPrice(order.amount)}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPrice(product.revenue)}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Add New Product</p>
                  <p className="text-sm text-gray-600">Create a new product listing</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">View All Orders</p>
                  <p className="text-sm text-gray-600">Manage customer orders</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Moderate Reviews</p>
                  <p className="text-sm text-gray-600">Review customer feedback</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

