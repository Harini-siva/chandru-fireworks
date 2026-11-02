import { Navigate, Route, Routes } from 'react-router-dom'
import { ArtDefs } from './components/ProductArt.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx'
import ScrollToHash from './components/ScrollToHash.jsx'
import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import PriceListPage from './pages/PriceListPage.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ArtDefs />
      <ScrollToHash />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Navigate to="/#categories" replace />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/price-list" element={<PriceListPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
