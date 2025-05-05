
import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-steelblue-900 hero-gradient py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Get in touch with our team for any questions about our products or services.
          </p>
        </div>
      </section>
      
      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-steelblue-900">Reach Out to Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Address</h3>
                    <p className="text-steelgray-700">
                      756/6-B, Opp Anand Electronics, Krishnagiri Main Road, Hosur, Tamil Nadu - 635109
                    </p>
                    <p className="text-steelgray-700 mt-1">
                      (40 KM from Bengaluru)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Phone</h3>
                    <p className="text-steelgray-700">+91 63820 85337</p>
                    <p className="text-steelgray-700">+91 87540 10925</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Email</h3>
                    <a href="mailto:sales@sssteelindia.com" className="text-steelblue-600 hover:underline">
                      sales@sssteelindia.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-steelgray-900 mb-1">Business Hours</h3>
                    <p className="text-steelgray-700">Monday to Saturday</p>
                    <p className="text-steelgray-700">9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-steelgray-900 mb-3">Website</h3>
                <a href="http://www.sssteelindia.com" target="_blank" rel="noopener noreferrer" className="text-steelblue-600 hover:underline">
                  www.sssteelindia.com
                </a>
              </div>
              
              <div className="mt-8">
                <Link to="/enquiry">
                  <Button className="flex items-center">
                    <span>Send us an Enquiry</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Google Map Embed */}
            <div className="lg:col-span-2">
              <div className="h-full bg-steelgray-100 rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <div className="text-steelgray-500 text-center p-6">
                  <h3 className="text-lg font-semibold mb-2">Google Maps Integration</h3>
                  <p>In a real implementation, an embedded Google Map would be displayed here showing the business location.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-steelgray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-steelblue-900">Looking for Specific Products?</h2>
          <p className="text-steelgray-700 mb-8 max-w-2xl mx-auto">
            Browse our comprehensive product catalog or register as a customer to access pricing and ordering features.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button className="bg-steelblue-600 hover:bg-steelblue-700">
                Browse Products
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-steelblue-600 text-steelblue-600 hover:bg-steelblue-50">
                Register as Customer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
