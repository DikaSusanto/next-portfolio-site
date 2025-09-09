//src/app/page.tsx

import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import PortfolioSection from '../components/PortfolioSection'
import ContactSection from '../components/ContactSection'
import FooterSection from '@/components/FooterSection'
import ClientScrollHandler from '@/components/ScrollHandler'

export default function Home() {
  return (
    <main>
      <ClientScrollHandler />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}