import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import './index.css'
import { LangProvider } from './i18n.jsx'
import { CartProvider } from './lib/cart.jsx'
import { ScrollReset, SmoothScroll } from './components/Motion.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { CartToast, CookieBanner, PreviewBanner, WhatsAppButton } from './components/Overlays.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Legal from './pages/Legal.jsx'
import NotFound from './pages/NotFound.jsx'
import { About, Contact, Login, Repairs, Wholesale } from './pages/Info.jsx'

function Layout() {
  return (
    <>
      <ScrollReset />
      <PreviewBanner />
      <Header />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CartToast />
      <CookieBanner />
    </>
  )
}

const legalPages = ['terms', 'privacy', 'cookies', 'returns', 'gdpr', 'shipping', 'payment']

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <CartProvider>
        <BrowserRouter>
          <SmoothScroll>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="category/:slug" element={<Shop />} />
                <Route path="product/:id" element={<Product />} />
                <Route path="cart" element={<Cart />} />
                <Route path="repairs" element={<Repairs />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="wholesale" element={<Wholesale />} />
                <Route path="login" element={<Login />} />
                {legalPages.map((p) => (
                  <Route key={p} path={p} element={<Legal page={p} />} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </SmoothScroll>
        </BrowserRouter>
      </CartProvider>
    </LangProvider>
  </StrictMode>
)
