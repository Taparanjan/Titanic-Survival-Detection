import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-surface-container w-full py-unit-xl border-t border-outline/10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto gap-unit-md">
        {/* Brand */}
        <Link to="/" className="font-geist font-bold text-lg text-primary hover:text-secondary transition-colors">
          Titanic AI
        </Link>

        {/* Copyright */}
        <p className="text-body-sm text-on-surface-variant text-center">
          Copyright 2024 Titanic AI. Made with Machine Learning.
        </p>

        {/* Links */}
        <div className="flex items-center gap-unit-md">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
          <Link
            to="/contact"
            className="text-body-sm text-on-surface-variant hover:text-secondary transition-colors"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}
