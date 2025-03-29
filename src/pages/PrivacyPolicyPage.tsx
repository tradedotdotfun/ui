import React from "react";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <div className="border-[4px] border-white p-6 mb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. Information We Collect
              </h2>
              <p className="mb-4 text-[10px]">
                At TradeDotFun, we collect certain information to provide and
                improve our services. This includes:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>Account Information:</strong> When you create an
                  account, we collect your wallet address, username, and any
                  other information you choose to provide.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information about how
                  you interact with our platform, including trading activities,
                  positions opened/closed, and features you use.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect information
                  about the device you use to access our platform, including
                  your IP address, browser type, operating system, and device
                  settings.
                </li>
                <li>
                  <strong>Communication Data:</strong> If you contact us
                  directly, we may collect additional information about you,
                  such as your name, email address, and the contents of your
                  message.
                </li>
                <li>
                  <strong>Blockchain Data:</strong> We collect data from
                  blockchain transactions related to your wallet address when
                  you interact with our platform's smart contracts.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                2. How We Use Your Information
              </h2>
              <p className="mb-4 text-[10px]">
                We use the information we collect for various purposes,
                including:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>To Provide Our Services:</strong> We use your
                  information to operate, maintain, and improve our platform,
                  including processing transactions, maintaining your account,
                  and providing customer support.
                </li>
                <li>
                  <strong>For Analytics and Improvement:</strong> We analyze
                  user behavior to enhance our platform's functionality, user
                  experience, and security measures.
                </li>
                <li>
                  <strong>To Communicate With You:</strong> We may use your
                  contact information to send you updates about our services,
                  respond to your inquiries, or provide important notices.
                </li>
                <li>
                  <strong>For Legal Compliance:</strong> We may use your
                  information to comply with applicable laws, regulations, or
                  legal processes.
                </li>
                <li>
                  <strong>To Protect Our Rights:</strong> We may use your
                  information to detect, prevent, or address fraud, security
                  breaches, or technical issues.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p className="mb-4 text-[10px]">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>With Service Providers:</strong> We may share your
                  information with third-party vendors, service providers, or
                  contractors who perform services on our behalf.
                </li>
                <li>
                  <strong>For Legal Requirements:</strong> We may disclose your
                  information if required to do so by law or in response to
                  valid requests by public authorities.
                </li>
                <li>
                  <strong>To Protect Rights:</strong> We may share information
                  to protect the rights, property, or safety of TradeDotFun, our
                  users, or others.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your
                  information with third parties when we have your consent to do
                  so.
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of all or a portion of our assets, your
                  information may be transferred as part of that transaction.
                </li>
              </ul>
              <p className="mb-4 text-[10px]">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="mb-4 text-[10px]">
                We implement appropriate security measures to protect your
                personal information:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>Encryption:</strong> We use industry-standard
                  encryption technologies to protect your data during
                  transmission.
                </li>
                <li>
                  <strong>Access Controls:</strong> We restrict access to
                  personal information to authorized employees, contractors, and
                  agents who need that information to operate, develop, or
                  improve our services.
                </li>
                <li>
                  <strong>Regular Audits:</strong> We regularly review our
                  information collection, storage, and processing practices to
                  guard against unauthorized access.
                </li>
                <li>
                  <strong>Blockchain Security:</strong> We leverage the inherent
                  security features of blockchain technology for
                  transaction-related data.
                </li>
              </ul>
              <p className="mb-4 text-[10px]">
                Despite our efforts, no security system is impenetrable. We
                cannot guarantee the security of your information, and we are
                not responsible for unauthorized access, loss, or alteration of
                your information due to factors beyond our reasonable control.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                5. Your Rights and Choices
              </h2>
              <p className="mb-4 text-[10px]">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>Access and Update:</strong> You can access and update
                  certain personal information through your account settings.
                </li>
                <li>
                  <strong>Deletion:</strong> You can request the deletion of
                  your account and associated personal information by contacting
                  us.
                </li>
                <li>
                  <strong>Opt-Out:</strong> You can opt out of receiving
                  promotional communications from us by following the
                  instructions in those communications.
                </li>
                <li>
                  <strong>Data Portability:</strong> You can request a copy of
                  your personal information in a structured, commonly used, and
                  machine-readable format.
                </li>
                <li>
                  <strong>Objection:</strong> You can object to our processing
                  of your personal information in certain circumstances.
                </li>
              </ul>
              <p className="mb-4 text-[10px]">
                To exercise these rights, please contact us using the
                information provided at the end of this Privacy Policy.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="mb-4 text-[10px]">
                We use cookies and similar tracking technologies:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are
                  necessary for the website to function properly and cannot be
                  switched off in our systems.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These cookies allow us
                  to count visits and traffic sources so we can measure and
                  improve the performance of our site.
                </li>
                <li>
                  <strong>Functional Cookies:</strong> These cookies enable the
                  website to provide enhanced functionality and personalization.
                </li>
                <li>
                  <strong>Analytics Cookies:</strong> We use analytics tools
                  that use cookies to collect information about how visitors use
                  our site.
                </li>
              </ul>
              <p className="mb-4 text-[10px]">
                You can set your browser to refuse all or some browser cookies,
                or to alert you when websites set or access cookies. If you
                disable or refuse cookies, please note that some parts of this
                website may become inaccessible or not function properly.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
              <p className="mb-4 text-[10px]">
                Our service may contain links to third-party websites:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>External Websites:</strong> Our platform may include
                  links to other websites, applications, or services that are
                  not operated or controlled by us.
                </li>
                <li>
                  <strong>No Responsibility:</strong> This Privacy Policy does
                  not apply to third-party websites. We are not responsible for
                  the privacy practices or content of such third-party websites.
                </li>
                <li>
                  <strong>Review Their Policies:</strong> We encourage you to
                  review the privacy policies of any third-party websites you
                  visit.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                8. Changes to This Privacy Policy
              </h2>
              <p className="mb-4 text-[10px]">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes:
              </p>
              <ul className="list-disc pl-8 mb-4 space-y-2 text-[10px]">
                <li>
                  <strong>Policy Updates:</strong> We may update this Privacy
                  Policy periodically to reflect changes in our practices or for
                  other operational, legal, or regulatory reasons.
                </li>
                <li>
                  <strong>Notification:</strong> We will notify you of any
                  material changes by posting the new Privacy Policy on this
                  page and, when appropriate, by sending you a notification.
                </li>
                <li>
                  <strong>Effective Date:</strong> The "Last Updated" date at
                  the top of this Privacy Policy will indicate when the most
                  recent changes were made.
                </li>
                <li>
                  <strong>Your Continued Use:</strong> Your continued use of our
                  platform after any changes to this Privacy Policy constitutes
                  your acceptance of the updated terms.
                </li>
              </ul>
              <p className="mb-4 text-[10px]">
                If you have any questions about this Privacy Policy, please
                contact us at support@tradedotfun.com.
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
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
