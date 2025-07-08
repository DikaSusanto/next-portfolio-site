export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
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
    image: '/img/Login-SMES.png',
    category: 'Web Development',
    technologies: ['Laravel', 'RabbitMQ', 'Elasticsearch'],
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
    image: '/img/Portfolio.png',
    category: 'Web Development',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NodeMailer'],
    duration: '1 month',
    views: '2.5k',
    rating: 4.5,
    liveUrl: 'https://dika-portfolio-seven.vercel.app/',
    githubUrl: 'https://github.com/DikaSusanto/next-portfolio-site'
  },
];