
import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-steelblue-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">SS STEEL INDIA CORPORATION</h3>
            <p className="text-steelgray-200 mb-4">
              A leading retail and wholesale supplier of iron and steel products catering to construction fabricators, industrial users, and exporters.
            </p>
            <div className="flex items-center text-steelgray-200 space-x-2 mb-2">
              <Clock className="h-5 w-5" />
              <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link to="/enquiry" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Enquiry</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Product Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products/structural-materials" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Structural Materials</span>
                </Link>
              </li>
              <li>
                <Link to="/products/steel-pipes" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Steel Pipes</span>
                </Link>
              </li>
              <li>
                <Link to="/products/sheets-plates" className="text-steelgray-200 hover:text-white inline-flex items-center">
                  <ArrowRight className="h-4 w-4 mr-1" />
                  <span>Sheets / Plates</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-steelgray-200" />
                <p className="text-steelgray-200">
                  756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-steelgray-200" />
                <div>
                  <p className="text-steelgray-200">+91 63820 85337</p>
                  <p className="text-steelgray-200">+91 87540 10925</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-steelgray-200" />
                <a href="mailto:sales@sssteelindia.com" className="text-steelgray-200 hover:text-white">
                  sales@sssteelindia.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-steelblue-700 my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left text-steelgray-300 mb-2 md:mb-0">
            &copy; {currentYear} SS STEEL INDIA CORPORATION. All Rights Reserved.
          </div>
          <div className="text-center md:text-right text-steelgray-300">
            Powered by <span className="text-white font-semibold">Best Webmasterz</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
