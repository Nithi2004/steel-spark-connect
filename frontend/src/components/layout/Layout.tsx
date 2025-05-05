
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import Chatbot from '../chatbot/Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Chatbot />
      <Footer />
      
      {/* Global styles added as a style element correctly */}
      <style dangerouslySetInnerHTML={{ __html: `
        .product-card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
        }
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .hero-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        }
      `}} />
    </div>
  );
};

export default Layout;
