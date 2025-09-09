//src/data/projects.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  image: string; // Main image for portfolio grid
  images: string[]; // Array of images for detail page
  category: string[];
  technologies: string[];
  features: string[];
  duration: string;
  views: string;
  rating: number;
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Centralized Email Service for PT. Bank Pembangunan Daerah Bali',
    description: 'A RESTful email service and centralized dashboard for managing and monitoring emails; supporting both standard and Excel-based sending via RabbitMQ, with comprehensive logging to Elasticsearch.',
    detailedDescription: 'This comprehensive email service was developed for PT. Bank Pembangunan Daerah Bali to streamline their email communications. The system features a robust backend API built with Laravel, implementing message queuing with RabbitMQ for reliable email delivery, and Elasticsearch for comprehensive logging and monitoring. The dashboard provides real-time insights into email delivery status, queue management, and system performance metrics.',
    image: '/img/Login-SMES.png',
    images: [
      '/img/Login-SMES.png',
      '/img/Dashboard-SMES.png',
      '/img/Email-Queue-SMES.png',
      '/img/Analytics-SMES.png'
    ],
    category: ['Web Development'],
    technologies: ['Laravel', 'RabbitMQ', 'Elasticsearch', 'MySQL', 'Redis', 'Docker'],
    features: [
      'RESTful API for email management',
      'Bulk email sending with Excel import',
      'Real-time queue monitoring with RabbitMQ',
      'Comprehensive logging with Elasticsearch',
      'Email delivery status tracking',
      'Admin dashboard with analytics',
      'Template management system',
      'Rate limiting and throttling'
    ],
    duration: '3 months',
    views: '1.2k',
    rating: 5,
    liveUrl: '',
    githubUrl: 'https://github.com/DikaSusanto/email-service-web-app'
  },
  {
    id: 2,
    title: 'Personal Portfolio Website',
    description: 'A personal portfolio website showcasing my skills, projects, and experiences as a backend developer and aspiring full stack engineer, using Next.js and Tailwind CSS.',
    detailedDescription: 'A modern, responsive portfolio website built to showcase my journey as a developer. The site features smooth animations, dark mode design, and optimized performance. Built with Next.js 14 for server-side rendering and enhanced SEO, styled with Tailwind CSS for rapid development, and includes a contact form with email integration using NodeMailer.',
    image: '/img/Portfolio.png',
    images: [
      '/img/Portfolio.png',
      '/img/Portfolio-About.png',
      '/img/Portfolio-Projects.png',
      '/img/Portfolio-Contact.png'
    ],
    category: ['Web Development'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NodeMailer', 'Vercel', 'Framer Motion'],
    features: [
      'Responsive design for all devices',
      'Smooth scroll animations',
      'Interactive project showcase',
      'Contact form with email integration',
      'SEO optimized with metadata',
      'Fast loading with Next.js optimization',
      'Modern UI/UX design',
      'Mobile-first approach'
    ],
    duration: '1 month',
    views: '2.5k',
    rating: 4.5,
    liveUrl: 'https://dika-portfolio-seven.vercel.app/',
    githubUrl: 'https://github.com/DikaSusanto/next-portfolio-site'
  },
  {
    id: 3,
    title: 'Bali Pisang Sale Website',
    description: 'A modern e-commerce site for Bali Pisang Sale, featuring a dynamic product catalog, secure checkout, multi-language support, and brand storytelling. Built with Next.js, TypeScript, Tailwind CSS, and NodeMailer for transactional emails.',
    detailedDescription: 'A full-featured e-commerce platform designed for Bali Pisang Sale, showcasing traditional Balinese banana chips. The platform includes a complete shopping experience with product catalog, shopping cart, secure payment integration via Midtrans, shipping calculation with RajaOngkir API, and order management. The site also features multi-language support and brand storytelling to connect with customers.',
    image: '/img/Home-PisangSale.png',
    images: [
      '/img/Home-PisangSale.png',
      '/img/Products-PisangSale.png',
      '/img/About-PisangSale.png',
      '/img/HowItWorks-PisangSale.png'
    ],
    category: ['Web Development', 'E-commerce'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Midtrans Payment Gateway', 'RajaOngkir API', 'Supabase', 'NodeMailer'],
    features: [
      'Dynamic product catalog with filtering',
      'Shopping cart with real-time updates',
      'Secure payment processing with Midtrans',
      'Shipping cost calculation via RajaOngkir',
      'Multi-language support (ID/EN)',
      'Order management system',
      'Email notifications for orders',
      'Responsive design for mobile commerce',
      'Product image gallery',
      'Customer review system'
    ],
    duration: '1 month',
    views: '2.5k',
    rating: 4.5,
    liveUrl: 'https://bali-pisang-sale.vercel.app/',
    githubUrl: 'https://github.com/DikaSusanto/bali-pisang-sale'
  },
];