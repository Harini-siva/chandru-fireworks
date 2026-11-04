import { useEffect } from 'react'
import Hero from '../components/Hero.jsx'
import TrustBar from '../components/TrustBar.jsx'
import Categories from '../components/Categories.jsx'
import CategorySpotlights from '../components/CategorySpotlights.jsx'
import PriceListTeaser from '../components/PriceListTeaser.jsx'
import Collections from '../components/Collections.jsx'
import ShopAd from '../components/ShopAd.jsx'
import GiftShowcase from '../components/GiftShowcase.jsx'
import Festival from '../components/Festival.jsx'
import About from '../components/About.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import Safety from '../components/Safety.jsx'
import Store from '../components/Store.jsx'
import Contact from '../components/Contact.jsx'

export default function HomePage() {
  useEffect(() => { document.title = 'Chandru Crackers | Crackers & Fireworks Catalogue, Cuddalore' }, [])
  const explore = () => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
  return (
    <>
      <Hero onExplore={explore} />
      <About />
      <WhyChoose />
      
      <Categories />
      <CategorySpotlights />
      <Collections />
      <ShopAd />
      <PriceListTeaser />
      <GiftShowcase />
      <Festival />
      
      <Safety />
      <Store />
      <Contact />
    </>
  )
}
