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
    liveUrl: '#',
    githubUrl: 'https://github.com/DikaSusanto/email-service-web-app'
  },

];