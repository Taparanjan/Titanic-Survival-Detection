import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Predict from './pages/Predict'
import Result from './pages/Result'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/predict"   element={<Predict />} />
            <Route path="/result"    element={<Result />} />
            <Route path="/about"     element={<About />} />
            <Route path="/contact"   element={<Contact />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                <span className="material-symbols-outlined text-[64px] text-on-surface-variant">sailing</span>
                <h1 className="font-geist text-headline-lg text-primary">404 - Page Not Found</h1>
                <a href="/" className="btn-primary px-6 py-2 rounded-md">Go Home</a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
