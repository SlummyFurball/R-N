import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Properties from './components/Properties';
import Services from './components/Services';
import MortgageCalculator from './components/MortgageCalculator';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import AdminRoute from './components/admin/AdminRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/" element={
            <>
              <Header />
              <main>
                <Hero />
                <Properties />
                <Services />
                <MortgageCalculator />
                <Testimonials />
                <Team />
                <Blog />
                <Contact />
              </main>
              <Footer />
              <WhatsAppWidget />
            </>
          } />
        </Routes>
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
