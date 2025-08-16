'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, Heart, Settings, LogOut, Edit, Save, X } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  full_name?: string
  phone?: string
  avatar_url?: string
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  })
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)
      
      // Get user profile from metadata or create default
      const userProfile: UserProfile = {
        id: user.id,
        email: user.email || '',
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        avatar_url: user.user_metadata?.avatar_url || '',
      }
      
      setProfile(userProfile)
      setEditForm({
        first_name: userProfile.first_name || '',
        last_name: userProfile.last_name || '',
        phone: userProfile.phone || '',
      })
      
      setIsLoading(false)
    }

    getUser()
  }, [router, supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({
      first_name: profile?.first_name || '',
      last_name: profile?.last_name || '',
      phone: profile?.phone || '',
    })
  }

  const handleSaveProfile = async () => {
    if (!user) return
    
    setIsSaving(true)
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          full_name: `${editForm.first_name} ${editForm.last_name}`,
          phone: editForm.phone,
        }
      })

      if (error) {
        console.error('Error updating profile:', error)
      } else {
        // Update local state
        setProfile(prev => prev ? {
          ...prev,
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          full_name: `${editForm.first_name} ${editForm.last_name}`,
          phone: editForm.phone,
        } : null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your profile and view your orders</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {profile.full_name || profile.first_name || 'User'}
                  </h3>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sage bg-sage/10 rounded-lg">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Package className="w-5 h-5" />
                  <span>Orders</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </nav>

              <Separator className="my-6" />

              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                {!isEditing ? (
                  <Button onClick={handleEditProfile} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveProfile} disabled={isSaving} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editForm.first_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.first_name || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editForm.last_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.last_name || 'Not provided'}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <p className="mt-1 text-gray-900">{profile.email}</p>
                  <p className="text-sm text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+62 812 3456 7890"
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{profile.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Orders</h2>
              
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven&apos;t placed any orders yet. Start shopping to see your orders here.
                </p>
                <Button className="bg-sage hover:bg-sage/90">
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Security</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Password</h4>
                    <p className="text-sm text-gray-600">Last updated 30 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Badge variant="outline">Not enabled</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

