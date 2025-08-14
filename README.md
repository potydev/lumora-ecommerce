# Lumora E-commerce Website

Modern e-commerce website untuk brand Lumora - pembersih wajah padat yang ramah lingkungan. Dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan Supabase.

![Lumora Hero](./public/images/hero-image.jpg)

## 🌟 Features

### 🛍️ E-commerce Core
- **Product Catalog** dengan filter, search, dan sorting
- **Product Detail Pages** dengan galeri gambar dan variasi produk
- **Shopping Cart** dengan drawer interface
- **Checkout Process** dengan guest checkout support
- **Order Management** untuk admin dan customer

### 🔐 Authentication & User Management
- **Email/Password Authentication** dengan Supabase Auth
- **Google OAuth Integration** untuk login cepat
- **User Account Management** dengan profile editing
- **Admin Dashboard** dengan role-based access

### 🎨 Design & UX
- **Responsive Design** untuk desktop, tablet, dan mobile
- **Modern UI** dengan shadcn/ui components
- **Smooth Animations** menggunakan GSAP
- **Accessibility** compliant (WCAG AA)
- **SEO Optimized** dengan proper meta tags

### 🌱 Sustainability Focus
- **Zero Waste Messaging** yang konsisten
- **Eco-friendly Branding** dengan color palette natural
- **Educational Content** tentang sustainability
- **Product Benefits** yang fokus pada lingkungan

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework dengan App Router
- **TypeScript** - Type safety dan better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **GSAP** - Animation library
- **Zustand** - State management untuk cart

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database (via Supabase)
- **Supabase Auth** - Authentication service
- **Supabase Storage** - File storage untuk gambar produk

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Supabase account (untuk production)

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd lumora-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` dengan konfigurasi Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Setup Supabase Database**
   
   Jalankan SQL schema di Supabase SQL Editor:
   ```bash
   # File: supabase-schema.sql
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
lumora-ecommerce/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── products/          # Product pages
│   │   ├── checkout/          # Checkout flow
│   │   └── account/           # User account
│   ├── components/            # Reusable components
│   │   ├── layout/           # Layout components
│   │   ├── product/          # Product-related components
│   │   ├── cart/             # Shopping cart components
│   │   ├── auth/             # Authentication components
│   │   └── sections/         # Landing page sections
│   ├── lib/                  # Utility libraries
│   │   ├── supabase/         # Supabase configuration
│   │   ├── store/            # State management
│   │   └── utils/            # Helper functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
│   └── images/              # Product images
├── supabase-schema.sql      # Database schema
└── README.md               # Project documentation
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--sage: #84A98C;           /* Primary brand color */
--gold: #C5A880;           /* Secondary accent */

/* Neutral Colors */
--white: #FFFFFF;
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-900: #111827;
```

## 📱 Key Pages

- **Homepage** (`/`) - Landing page dengan hero, features, products, testimonials
- **Products** (`/products`) - Katalog produk dengan filter dan search
- **Product Detail** (`/products/[id]`) - Detail produk dengan galeri dan reviews
- **Cart** (drawer) - Shopping cart dengan checkout flow
- **Checkout** (`/checkout`) - Proses checkout dengan form dan payment
- **Login** (`/auth/login`) - Authentication dengan email/password dan OAuth
- **Register** (`/auth/register`) - User registration
- **Account** (`/account`) - User profile dan order history
- **Admin Dashboard** (`/admin/dashboard`) - Admin overview dan statistics
- **Admin Products** (`/admin/products`) - Product management interface

## 🔧 Configuration

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Payment Gateway (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository ke Vercel
2. Set environment variables
3. Deploy automatically

### Manual Deployment
```bash
# Build production
npm run build

# Start production server
npm start
```

## 📊 Testing Results

✅ **Landing Page** - Hero, features, products, testimonials  
✅ **Product Catalog** - Filter, search, pagination  
✅ **Product Detail** - Gallery, variations, reviews  
✅ **Shopping Cart** - Add/remove/update items  
✅ **Checkout** - Form validation, payment integration  
✅ **Authentication** - Login/register/account management  
✅ **Admin Dashboard** - Product CRUD, order management  
✅ **Responsive Design** - Mobile, tablet, desktop  
✅ **Performance** - Optimized loading dan animations  
✅ **Security** - Authentication dan data protection  

## 📞 Support

Untuk pertanyaan atau support:
- Email: hello@lumora.id
- Phone: +62 21 1234 5678
- Address: Jakarta, Indonesia

---

**Made with ❤️ in Indonesia**
