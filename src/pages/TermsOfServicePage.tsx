import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="border-[4px] border-white p-6 mb-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4 text-[10px]">
                  Welcome to TradeDotFun. These Terms of Service govern your use
                  of our website and services. By accessing or using our
                  platform, you agree to be bound by these Terms.
                </p>
                <p className="mb-4 text-[10px]">
                  Please read these Terms carefully before using our platform.
                  If you do not agree with any part of these Terms, you must not
                  use our services. By using TradeDotFun, you represent that you
                  are at least 18 years old and capable of forming a binding
                  contract.
                </p>
                <p className="mb-4 text-[10px]">
                  These Terms constitute a legally binding agreement between you
                  and TradeDotFun regarding your use of our platform and
                  services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">2. Services</h2>
                <p className="mb-4 text-[10px]">
                  TradeDotFun provides a trading simulation platform. Our
                  services are for educational and entertainment purposes only.
                </p>
                <p className="mb-4 text-[10px]">
                  Our platform allows users to:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                  <li>Simulate cryptocurrency trading with virtual funds</li>
                  <li>Learn about market mechanics and trading strategies</li>
                  <li>Participate in trading competitions and leaderboards</li>
                  <li>Track simulated portfolio performance</li>
                </ul>
                <p className="mb-4 text-[10px]">
                  We reserve the right to modify, suspend, or discontinue any
                  aspect of our services at any time without notice. We are not
                  liable for any modification, suspension, or discontinuation of
                  our services.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <p className="mb-4 text-[10px]">
                  To use certain features of our platform, you may need to
                  create an account.
                </p>
                <p className="mb-4 text-[10px]">
                  When creating an account, you agree to:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Keep your account credentials secure</li>
                  <li>Not share your account with anyone else</li>
                  <li>
                    Notify us immediately of any unauthorized use of your
                    account
                  </li>
                </ul>
                <p className="mb-4 text-[10px]">
                  You are solely responsible for all activities that occur under
                  your account. We may suspend or terminate your account at our
                  discretion if we suspect any violations of these Terms or
                  fraudulent, abusive, or harmful activity.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  4. Risks and Disclaimers
                </h2>
                <p className="mb-4 text-[10px]">
                  Trading cryptocurrencies involves significant risks. Our
                  platform is for simulation purposes only.
                </p>
                <p className="mb-4 text-[10px]">
                  You acknowledge and agree that:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                  <li>
                    Our platform is for educational and entertainment purposes
                    only
                  </li>
                  <li>
                    Virtual trading simulations do not guarantee similar results
                    in real markets
                  </li>
                  <li>
                    Market data used in our simulations may differ from
                    real-time market data
                  </li>
                  <li>
                    We do not provide financial, investment, or trading advice
                  </li>
                  <li>
                    Any decisions made based on information from our platform
                    are at your own risk
                  </li>
                </ul>
                <p className="mb-4 text-[10px]">
                  TradeDotFun is provided "as is" and "as available" without any
                  warranties of any kind, whether express or implied. We do not
                  guarantee the accuracy, completeness, or timeliness of
                  information available on our platform.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  5. Intellectual Property
                </h2>
                <p className="mb-4 text-[10px]">
                  All content on TradeDotFun is owned by us or our licensors and
                  is protected by copyright and other intellectual property
                  laws.
                </p>
                <p className="mb-4 text-[10px]">
                  This includes, but is not limited to:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                  <li>The TradeDotFun name, logo, and branding</li>
                  <li>Website design, layout, and graphics</li>
                  <li>Software, code, and algorithms</li>
                  <li>Text, images, and audiovisual content</li>
                </ul>
                <p className="mb-4 text-[10px]">
                  You may not use, copy, reproduce, distribute, transmit,
                  broadcast, display, sell, license, or otherwise exploit any
                  content from our platform for any commercial purpose without
                  our prior written consent.
                </p>
                <p className="mb-4 text-[10px]">
                  We respect the intellectual property rights of others and
                  expect users to do the same. If you believe that your work has
                  been copied in a way that constitutes copyright infringement,
                  please contact us.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">6. Privacy Policy</h2>
                <p className="mb-4 text-[10px]">
                  Your privacy is important to us. Please review our{" "}
                  <Link to="/privacy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  to understand how we collect and use your information.
                </p>
                <p className="mb-4 text-[10px]">
                  By using TradeDotFun, you consent to our collection, use, and
                  disclosure of your information as described in our Privacy
                  Policy.
                </p>
                <p className="mb-4 text-[10px]">
                  We may use cookies and similar technologies to enhance your
                  experience on our platform. You can manage your cookie
                  preferences through your browser settings.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="mb-4 text-[10px]">
                  TradeDotFun and its affiliates will not be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages.
                </p>
                <p className="mb-4 text-[10px]">
                  To the maximum extent permitted by law, in no event shall
                  TradeDotFun, its directors, employees, partners, agents,
                  suppliers, or affiliates be liable for:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                  <li>
                    Any direct, indirect, incidental, special, consequential, or
                    punitive damages
                  </li>
                  <li>
                    Loss of profits, data, use, goodwill, or other intangible
                    losses
                  </li>
                  <li>
                    Any damages resulting from your use or inability to use our
                    platform
                  </li>
                  <li>
                    Any unauthorized access to or use of our servers or any
                    personal information stored therein
                  </li>
                  <li>
                    Any interruption or cessation of transmission to or from our
                    platform
                  </li>
                  <li>
                    Any damages resulting from trading decisions made based on
                    information from our platform
                  </li>
                </ul>
                <p className="mb-4 text-[10px]">
                  These limitations apply regardless of whether the damages are
                  based on breach of contract, tort (including negligence), or
                  any other legal theory, even if we have been advised of the
                  possibility of such damages.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="mb-4 text-[10px]">
                  We may update these Terms of Service from time to time. We
                  will notify users of any significant changes.
                </p>
                <p className="mb-4 text-[10px]">
                  We reserve the right to modify these Terms at any time.
                  Changes will be effective immediately upon posting on our
                  website. We will provide notice of material changes by:
                </p>
                <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                  <li>Posting a notice on our website</li>
                  <li>
                    Sending an email to the address associated with your account
                    (if applicable)
                  </li>
                  <li>
                    Displaying a notification when you next access our platform
                  </li>
                </ul>
                <p className="mb-4 text-[10px]">
                  Your continued use of our platform after changes to these
                  Terms constitutes your acceptance of the new Terms. If you do
                  not agree to the changes, you must stop using our services.
                </p>
                <p className="mb-4 text-[10px]">
                  If you have any questions about these Terms, please contact us
                  at support@tradedotfun.com.
                </p>
                <p className="text-sm italic mt-6">
                  Last Updated: March 17, 2025
                </p>
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
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
