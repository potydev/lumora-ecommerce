import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Leaf, 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Globe,
  Sparkles,
  Target,
  Eye,
  HandHeart
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Lumora | Sustainable Beauty & Skincare',
  description: 'Discover Lumora\'s mission to revolutionize beauty with sustainable, eco-friendly skincare products. Learn about our values, commitment to the environment, and the team behind the brand.',
}

export default function AboutPage() {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'Every product is designed with the environment in mind, using biodegradable materials and zero-waste packaging.'
    },
    {
      icon: Heart,
      title: 'Natural Ingredients',
      description: 'We use only the finest natural ingredients, carefully sourced and tested for effectiveness and safety.'
    },
    {
      icon: Shield,
      title: 'Cruelty-Free',
      description: 'All our products are certified cruelty-free and never tested on animals.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We believe in building a community of conscious consumers who care about their skin and the planet.'
    }
  ]

  const milestones = [
    {
      year: '2023',
      title: 'Brand Founded',
      description: 'Lumora was born from a vision to create sustainable beauty products.'
    },
    {
      year: '2024',
      title: 'First Product Launch',
      description: 'Successfully launched our signature solid cleanser line.'
    },
    {
      year: '2024',
      title: 'Eco-Certification',
      description: 'Achieved multiple environmental certifications for our products.'
    },
    {
      year: '2025',
      title: 'Expansion',
      description: 'Growing our product range and reaching more conscious consumers.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former beauty industry executive with 15+ years experience. Passionate about sustainable beauty and environmental conservation.',
      image: '/images/team/sarah-chen.jpg'
    },
    {
      name: 'Dr. Maya Patel',
      role: 'Head of Formulation',
      bio: 'PhD in Cosmetic Science with expertise in natural ingredients and sustainable formulations.',
      image: '/images/team/maya-patel.jpg'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Sustainability Director',
      bio: 'Environmental scientist dedicated to reducing beauty industry waste and carbon footprint.',
      image: '/images/team/alex-rodriguez.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-sage/10 to-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Revolutionizing Beauty,{' '}
              <span className="text-sage">One Product at a Time</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              At Lumora, we believe beauty shouldn't cost the earth. Our mission is to create 
              effective, sustainable skincare products that nourish your skin while protecting 
              our planet for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Creating a More Beautiful World
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We're on a mission to transform the beauty industry by proving that sustainable 
                products can be just as effective, luxurious, and accessible as conventional ones. 
                Every decision we make is guided by our commitment to environmental stewardship.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Eliminate single-use plastic from beauty routines
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Use only natural, biodegradable ingredients
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2"></div>
                  <p className="text-gray-600">
                    Create products that actually work for your skin
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-sage/20 to-gold/20 rounded-2xl p-8">
                <div className="text-center">
                  <Globe className="w-24 h-24 text-sage mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Environmental Impact
                  </h3>
                  <p className="text-gray-600">
                    Since our launch, we've prevented over 10,000 plastic bottles 
                    from entering landfills and oceans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make, from product development 
              to customer service and beyond.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-sage" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Award className="w-4 h-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Milestones That Define Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every step of our journey has been about pushing boundaries and 
              proving that sustainable beauty is not just possible, but superior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <Card key={index} className="text-center border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="w-20 h-20 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{milestone.year}</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Meet Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              The People Behind Lumora
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together expertise in beauty, science, and 
              sustainability to create products that make a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-sage/20 to-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-sage">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sage to-gold">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Us in Making Beauty Sustainable
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every purchase supports our mission to create a more beautiful, 
            sustainable world. Start your journey with Lumora today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-sage font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Eye className="w-5 h-5 mr-2" />
              Explore Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-sage transition-colors duration-200"
            >
              <HandHeart className="w-5 h-5 mr-2" />
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
