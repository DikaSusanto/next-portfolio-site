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
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Centralized Email Service for PT. Bank Pembangunan Daerah Bali',
    description: 'A RESTful email service and centralized dashboard for managing and monitoring emails; supporting both standard and Excel-based sending via RabbitMQ, with comprehensive logging to Elasticsearch.',
    detailedDescription: 'This comprehensive email service was developed for PT. Bank Pembangunan Daerah Bali to streamline and centralize their email communications. The system features a robust Laravel backend with RESTful APIs, message queuing via RabbitMQ for reliable and prioritized email delivery, and Elasticsearch for advanced logging and monitoring. The admin dashboard provides real-time insights into email delivery status, queue management, and analytics, supporting both manual and bulk (Excel-imported) email sending. Security, audit trails, and template management are integrated for enterprise-grade operations.',
    image: '/img/Login-SMES.png',
    images: [
      '/img/Login-SMES.png',
      '/img/Dashboard-SMES.png',
      '/img/Email-Queue-SMES.png',
      '/img/Email-Sending-SMES.png'
    ],
    category: ['Web Development'],
    technologies: [
      'Laravel',
      'RabbitMQ',
      'Elasticsearch',
      'MySQL',
      'Redis',
      'Docker',
      'Vue.js',
      'Tailwind CSS'
    ],
    features: [
      'RESTful API for email management',
      'Bulk email sending with Excel import',
      'Real-time queue monitoring with RabbitMQ',
      'Comprehensive logging with Elasticsearch',
      'Email delivery status and analytics dashboard',
      'Admin dashboard with user and application management',
      'Template management system',
      'Rate limiting and throttling',
      'Role-based access control (RBAC)',
      'Retry and error handling for failed emails'
    ],
    duration: 'October 2024 - February 2025',
    liveUrl: '',
    githubUrl: 'https://github.com/DikaSusanto/email-service-web-app'
  },
  {
    id: 2,
    title: 'Personal Portfolio Website',
    description: 'A feature-rich portfolio website highlighting my expertise as a backend developer and aspiring full stack engineer, built with Next.js, TypeScript, and Tailwind CSS.',
    detailedDescription: 'This portfolio website is a comprehensive showcase of my technical journey, skills, and projects. It features a dynamic project gallery with filtering, animated transitions using Framer Motion, and a responsive, mobile-first layout. The site includes an interactive About section, a skills carousel, and a detailed project view with image galleries and feature lists. Built with Next.js 14 for optimal performance and SEO, styled with Tailwind CSS for rapid UI development, and deployed on Vercel for seamless CI/CD. The contact form is integrated with NodeMailer for direct email communication. The design supports smooth scrolling and modern UI/UX best practices, ensuring a professional and engaging experience for visitors.',
    image: '/img/Hero-portfolio.png',
    images: [
      '/img/Hero-portfolio.png',
      '/img/Portfolio-About.png',
      '/img/Portfolio-Projects.png',
      '/img/Portfolio-Contact.png'
    ],
    category: ['Web Development'],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'NodeMailer',
      'Vercel'
    ],
    features: [
      'Dynamic project gallery with category filtering',
      'Animated transitions and interactive UI (Framer Motion)',
      'Responsive, mobile-first design with dark mode',
      'Detailed project pages with image galleries',
      'Skills carousel and About section',
      'Contact form with NodeMailer integration',
      'SEO optimized with metadata and Open Graph',
      'Deployed with Vercel for CI/CD and global CDN'
    ],
    duration: 'June 2025 - Present',
    liveUrl: 'https://dika-portfolio-seven.vercel.app/',
    githubUrl: 'https://github.com/DikaSusanto/next-portfolio-site'
  },
  {
    id: 3,
    title: 'Bali Pisang Sale Website',
    description: 'A modern e-commerce platform for Bali Pisang Sale, offering a seamless pre-order experience, dynamic product catalog, real-time shipping calculation, and multi-language support. Built with Next.js, TypeScript, Tailwind CSS, and integrated with Midtrans and RajaOngkir APIs.',
    detailedDescription: 'A robust e-commerce solution for Bali Pisang Sale, specializing in traditional Pisang Sale products. The site features a pre-order system with no upfront payment, dynamic product catalog, shopping cart, real-time shipping cost estimation using RajaOngkir, and secure payment via Midtrans. Includes an admin dashboard for order and product management, automated transactional emails, and full support for English and Indonesian. Designed for transparency, convenience, and customer trust.',
    image: '/img/Home-PisangSale.png',
    images: [
      '/img/Home-PisangSale.png',
      '/img/Products-PisangSale.png',
      '/img/About-PisangSale.png',
      '/img/HowItWorks-PisangSale.png'
    ],
    category: ['Web Development', 'E-commerce'],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Midtrans Payment Gateway',
      'RajaOngkir API',
      'Prisma',
      'NodeMailer'
    ],
    features: [
      'Pre-order system with no upfront payment',
      'Dynamic product catalog and shopping cart',
      'Real-time shipping cost calculation (RajaOngkir)',
      'Secure payment integration (Midtrans)',
      'Multi-language support (English & Indonesian)',
      'Admin dashboard for order & product management',
      'Automated email notifications',
      'Responsive mobile-first design',
      'Product image gallery',
      'Order status tracking for customers'
    ],
    duration: 'July 2025 - August 2025',
    liveUrl: 'https://bali-pisang-sale.vercel.app/',
    githubUrl: 'https://github.com/DikaSusanto/bali-pisang-sale'
  },
];