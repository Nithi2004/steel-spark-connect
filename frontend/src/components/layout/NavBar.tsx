import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import DashboardMenu from '@/pages/DashboardMenu';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Enquiry', path: '/enquiry' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-steelblue-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-white text-xl font-bold font-heading">
            SS STEEL INDIA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path) ? 'nav-link-active' : 'nav-link-default'
                } nav-link`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {!isAdmin && (
                  <Link to="/cart" className="text-white hover:text-steelgray-200">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-white">
                    <User className="h-4 w-4 mr-1" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <DashboardMenu />
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-steelred-500 hover:bg-steelred-600">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-steelgray-200 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-steelblue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path)
                    ? 'bg-steelblue-700 text-white'
                    : 'text-steelgray-100 hover:bg-steelblue-600 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <div className="flex items-center px-3 py-2 text-steelgray-100">
                  <User className="h-4 w-4 mr-2" />
                  <span>{user.name}</span>
                </div>
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/customer/dashboard'}
                  className="block px-3 py-2 rounded-md text-base font-medium text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {!isAdmin && (
                  <Link
                    to="/cart"
                    className="block px-3 py-2 rounded-md text-base font-medium text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Cart
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-steelgray-100 hover:bg-steelblue-600 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-1 px-3 py-2">
                <Link
                  to="/login"
                  className="text-steelgray-100 hover:bg-steelblue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-steelred-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;