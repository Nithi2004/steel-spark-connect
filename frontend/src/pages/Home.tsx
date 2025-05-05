
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-steelblue-900 hero-gradient py-16 md:py-32">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Best Deal in Iron and Steel
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              SS STEEL INDIA CORPORATION - Your trusted partner for all iron and steel needs in Hosur, Tamil Nadu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/products">
                <Button className="bg-steelred-500 hover:bg-steelred-600 text-white px-6 py-2 text-lg">
                  Browse Products
                </Button>
              </Link>
              <Link to="/enquiry">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-steelblue-900 px-6 py-2 text-lg">
                  Send Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-steelblue-900">About Our Company</h2>
              <p className="text-steelgray-800 mb-4 leading-relaxed">
                Founded in 2015, SS STEEL INDIA CORPORATION is a dynamic company in the retail and wholesale 
                of iron and steel catering to construction fabricators, industrial users, and exporters.
              </p>
              <p className="text-steelgray-800 mb-4 leading-relaxed">
                With expert guidance from professionals with 20+ years of experience, the company is rapidly 
                growing in Hosur, near Bengaluru.
              </p>
              <p className="text-steelred-600 font-medium italic text-lg">
                "A satisfied client is our best referral."
              </p>
              <div className="mt-6">
                <Link to="/about">
                  <Button className="flex items-center gap-2 bg-steelblue-600 hover:bg-steelblue-700">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 bg-steelgray-200 rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-semibold mb-4 text-steelblue-900">Contact Information</h3>
              <div className="space-y-4 flex-grow">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-steelblue-600 mt-1" />
                  <p className="text-steelgray-800">
                    756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-steelblue-600" />
                  <div>
                    <p className="text-steelgray-800">+91 63820 85337</p>
                    <p className="text-steelgray-800">+91 87540 10925</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-steelblue-600" />
                  <a href="mailto:sales@sssteelindia.com" className="text-steelblue-600 hover:underline">
                    sales@sssteelindia.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-steelblue-600" />
                  <p className="text-steelgray-800">9:00 AM – 7:00 PM (Monday to Saturday)</p>
                </div>
              </div>
              <Link to="/contact" className="mt-4">
                <Button variant="outline" className="w-full border-steelblue-600 text-steelblue-600 hover:bg-steelblue-600 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 bg-steelgray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-steelblue-900">Our Product Categories</h2>
            <p className="text-steelgray-600 mt-2">
              Explore our wide range of iron and steel products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Structural Materials */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-r from-steelblue-800 to-steelblue-600 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Structural Materials</h3>
              </div>
              <div className="p-6">
                <ul className="mb-4 text-steelgray-700 space-y-1">
                  <li>• Angles</li>
                  <li>• Channels</li>
                  <li>• Flats</li>
                  <li>• I Beams</li>
                  <li>• TMT Bars</li>
                </ul>
                <Link to="/products/structural-materials">
                  <Button className="w-full">View Products</Button>
                </Link>
              </div>
            </div>
            
            {/* Steel Pipes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-r from-steelblue-700 to-steelblue-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Steel Pipes</h3>
              </div>
              <div className="p-6">
                <ul className="mb-4 text-steelgray-700 space-y-1">
                  <li>• MS Round Pipes</li>
                  <li>• MS Square Pipes</li>
                  <li>• MS Rectangle Pipes</li>
                </ul>
                <Link to="/products/steel-pipes">
                  <Button className="w-full">View Products</Button>
                </Link>
              </div>
            </div>
            
            {/* Sheets / Plates */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-r from-steelblue-600 to-steelblue-400 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Sheets & Plates</h3>
              </div>
              <div className="p-6">
                <ul className="mb-4 text-steelgray-700 space-y-1">
                  <li>• HR Sheets / Plates</li>
                  <li>• CR Sheets</li>
                  <li>• GI Sheets</li>
                  <li>• Roofing Sheets</li>
                  <li>• Chequered Sheets</li>
                </ul>
                <Link to="/products/sheets-plates">
                  <Button className="w-full">View Products</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-steelblue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Place an Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Register as a customer to access our full product catalog with pricing and place orders online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button className="bg-steelred-500 hover:bg-steelred-600 text-white px-6 py-2 text-lg">
                Register Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-steelblue-800 px-6 py-2 text-lg">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
