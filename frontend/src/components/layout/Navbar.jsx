import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/predict', label: 'Prediction' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 border-b border-outline/10 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-xl shadow-md'
          : 'bg-surface/70 backdrop-blur-xl shadow-sm'
      }`}
    >
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>sailing</span>
          <span className="font-geist font-bold text-xl text-primary">Titanic AI</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-unit-lg">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-geist text-label-md transition-colors ${
                  isActive
                    ? 'text-secondary border-b-2 border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-secondary'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-unit-sm">
          <button
            aria-label="Toggle Dark Mode"
            className="p-2 text-on-surface-variant hover:text-secondary transition-colors rounded-full active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>dark_mode</span>
          </button>
          {/* Mobile hamburger */}
          <button
            aria-label="Toggle Menu"
            className="md:hidden p-2 text-on-surface-variant"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-outline/10 py-4 px-margin-mobile flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-geist text-label-md py-2 transition-colors ${
                  isActive ? 'text-secondary font-semibold' : 'text-on-surface-variant'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
