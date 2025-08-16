import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us - Lumora | Get in Touch',
  description: 'Get in touch with the Lumora team. We\'re here to help with product questions, sustainability inquiries, or just to chat about making beauty more eco-friendly.',
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@lumora.com',
      description: 'We respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+62 21 1234 5678',
      description: 'Mon-Fri, 9AM-6PM WIB'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: 'Jakarta, Indonesia',
      description: 'Sustainable Beauty Hub'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM WIB'
    }
  ]

  const socialMedia = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/lumora', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/lumora', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/lumora', color: 'hover:text-blue-400' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-sage/10 to-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let&apos;s Start a{' '}
              <span className="text-sage">Conversation</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Have questions about our products? Want to learn more about sustainable beauty? 
              Or just want to say hello? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Your last name" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="What's this about?" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..." 
                      rows={5}
                      required 
                    />
                  </div>
                  
                  <Button className="w-full bg-sage hover:bg-sage/90 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-sage" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{info.title}</h3>
                        <p className="text-sage font-medium">{info.content}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors duration-200 ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our products and sustainability practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  How long does shipping take?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Standard shipping takes 3-5 business days within Indonesia. 
                  International shipping varies by location (7-14 days).
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Are your products really plastic-free?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! All our products use biodegradable packaging and zero plastic. 
                  We&apos;re committed to 100% sustainable materials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Can I return products if they don&apos;t work for me?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! We offer a 30-day satisfaction guarantee. 
                  If a product doesn&apos;t work for your skin, we&apos;ll help you find the right solution.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  How do you ensure ingredient quality?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We source only the highest quality natural ingredients from certified 
                  organic suppliers and test every batch for purity and effectiveness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sage to-gold">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Your Sustainable Beauty Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of conscious consumers who&apos;ve already made the switch 
            to sustainable, effective skincare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-sage font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Shop Now
            </Link>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-sage transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
