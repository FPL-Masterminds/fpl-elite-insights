import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#37003C] mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing or using FPL Elite Insights, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">2. Subscriptions</h2>
              <p className="text-gray-600 mb-6">
                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (monthly). Billing cycles are set on a monthly basis.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">3. Refund Policy</h2>
              <p className="text-gray-600 mb-6">
                As FPL Elite Insights is a digital service providing real-time data and insights, we do not offer refunds on subscriptions. You may cancel your subscription at any time, and you will continue to have access to the service through the end of your billing period.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">4. Account Registration</h2>
              <p className="text-gray-600 mb-6">
                You must register for an account to access the Service. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-600 mb-6">
                You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-2">Share your account credentials</li>
                <li className="mb-2">Use the service for any illegal purpose</li>
                <li className="mb-2">Attempt to gain unauthorized access to the service</li>
                <li className="mb-2">Resell or redistribute the service content</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 mb-6">
                The Service and its original content, features, and functionality are owned by FPL Elite Insights and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">7. Termination</h2>
              <p className="text-gray-600 mb-6">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600 mb-6">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Contact</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms, please contact us at legal@fpleliteinsights.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}