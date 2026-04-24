import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
export const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h2 className="font-serif text-3xl font-bold mb-6">
              FEMOUS<span className="text-brand-gold">.</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-sm">
              Redefining Fashion, Worldwide. Classic, elegant, and high-end
              fashion for every occasion.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/femous.fashion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors">
                
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@femous.fashion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-gold transition-colors font-bold flex items-center justify-center w-5 h-5">
                
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5">
                  
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-brand-gold transition-colors">
                  
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-brand-gold transition-colors">
                  
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-400 hover:text-brand-gold transition-colors">
                  
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin size={20} className="shrink-0 mt-1 text-brand-gold" />
                <span>
                  Ado Ekiti, Nigeria
                  <br />
                  (Worldwide Delivery)
                </span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone size={20} className="shrink-0 text-brand-gold" />
                <a
                  href="https://wa.me/2348104038155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors">
                  
                  +234 810 403 8155
                </a>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} className="shrink-0 text-brand-gold" />
                <a
                  href="mailto:femousfashion@gmail.com"
                  className="hover:text-brand-gold transition-colors">
                  
                  femousfashion@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Femous Fashion. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>);

};