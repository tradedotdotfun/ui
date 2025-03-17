import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <div className="border-[4px] border-white p-6 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to TradeDotFun. These Terms of Service govern your use of our website and services.
                By accessing or using our platform, you agree to be bound by these Terms.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Services</h2>
              <p className="mb-4">
                TradeDotFun provides a trading simulation platform. Our services are for educational and entertainment purposes only.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                To use certain features of our platform, you may need to create an account.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Risks and Disclaimers</h2>
              <p className="mb-4">
                Trading cryptocurrencies involves significant risks. Our platform is for simulation purposes only.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                All content on TradeDotFun is owned by us or our licensors and is protected by copyright and other intellectual property laws.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Privacy Policy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                TradeDotFun and its affiliates will not be liable for any indirect, incidental, special, consequential or punitive damages.
              </p>
              {/* Content will be added by the user */}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
              <p className="mb-4">
                We may update these Terms of Service from time to time. We will notify users of any significant changes.
              </p>
              {/* Content will be added by the user */}
            </div>
          </div>
          
          <div className="text-center mb-8">
            <Link 
              to="/" 
              className="inline-block border-[4px] border-white px-6 py-3 hover:bg-white hover:text-black transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage; 