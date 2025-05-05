
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-steelblue-900 hero-gradient py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Learn more about SS STEEL INDIA CORPORATION and our commitment to quality products and service excellence.
          </p>
        </div>
      </section>
      
      {/* Company History */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-steelblue-900">Our Company History</h2>
              <p className="text-steelgray-700 mb-4 leading-relaxed">
                Founded in 2015, SS STEEL INDIA CORPORATION has rapidly established itself as a leading retail and wholesale supplier of iron and steel products in Hosur, Tamil Nadu. Located just 40 KM from Bengaluru, our strategic position allows us to efficiently serve clients across multiple regions.
              </p>
              <p className="text-steelgray-700 mb-4 leading-relaxed">
                Under the expert guidance of professionals with over 20 years of industry experience, our company has consistently expanded its product range and customer base. We take pride in catering to diverse customer segments including construction fabricators, industrial users, and exporters.
              </p>
              <p className="text-steelgray-700 mb-4 leading-relaxed">
                Over the years, we have built a reputation for reliability, competitive pricing, and exceptional customer service. Our business philosophy is centered around the belief that "A satisfied client is our best referral," which drives our commitment to excellence in every aspect of our operations.
              </p>
            </div>
            <div className="bg-steelgray-100 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-5 text-steelblue-900">Our Mission</h3>
              <p className="text-steelgray-700 mb-6 leading-relaxed">
                To deliver high-quality iron and steel products at affordable prices while maintaining exceptional service standards and building long-term relationships with our customers.
              </p>
              
              <h3 className="text-2xl font-bold mb-5 text-steelblue-900">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-steelgray-900">Quality Assurance</h4>
                    <p className="text-steelgray-700">We ensure all our products meet the highest quality standards and specifications.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-steelgray-900">Customer Satisfaction</h4>
                    <p className="text-steelgray-700">We prioritize understanding and fulfilling our customers' requirements promptly and efficiently.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-steelgray-900">Integrity & Transparency</h4>
                    <p className="text-steelgray-700">We conduct our business with honesty, ethical practices, and clear communication.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-steelblue-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-steelgray-900">Competitive Pricing</h4>
                    <p className="text-steelgray-700">We strive to offer the most competitive prices in the market without compromising on quality.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-steelgray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-steelblue-900 text-center">Why Choose SS STEEL INDIA CORPORATION</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-steelblue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-steelblue-900">Extensive Product Range</h3>
              <p className="text-steelgray-700">
                We offer a comprehensive selection of iron and steel products to meet diverse industrial and construction needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-steelblue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-steelblue-900">Experienced Team</h3>
              <p className="text-steelgray-700">
                Our team of professionals brings over 20 years of industry expertise to ensure you get the right products and advice.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-steelblue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-steelblue-900">Competitive Pricing</h3>
              <p className="text-steelgray-700">
                We offer the most competitive rates in the market while maintaining the highest product quality standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-steelblue-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-steelblue-900">Timely Delivery</h3>
              <p className="text-steelgray-700">
                We understand the importance of deadlines and ensure prompt delivery of your orders to keep your projects on schedule.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-steelblue-600">5</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-steelblue-900">Customer Support</h3>
              <p className="text-steelgray-700">
                Our dedicated customer service team is always ready to assist you with inquiries, orders, and after-sales support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-steelblue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-steelblue-600">6</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-steelblue-900">Strategic Location</h3>
              <p className="text-steelgray-700">
                Located in Hosur, just 40 KM from Bengaluru, we're ideally positioned to serve customers across multiple regions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-steelblue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference of working with a trusted iron and steel supplier. Browse our products or contact our team today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button className="bg-steelred-500 hover:bg-steelred-600 text-white px-6 py-2 text-lg">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-steelblue-800 px-6 py-2 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
