import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#37003C] mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg">
              <p className="text-gray-600 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-6">
                FPL Elite Insights ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you use our service.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-6">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-2">Create an account</li>
                <li className="mb-2">Subscribe to our service</li>
                <li className="mb-2">Contact us for support</li>
                <li className="mb-2">Sign up for our newsletter</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-6">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-2">Provide and maintain our service</li>
                <li className="mb-2">Process your payments</li>
                <li className="mb-2">Send you important updates</li>
                <li className="mb-2">Respond to your requests</li>
                <li className="mb-2">Improve our service</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Data Security</h2>
              <p className="text-gray-600 mb-6">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-6">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-2">Access your personal data</li>
                <li className="mb-2">Correct inaccurate data</li>
                <li className="mb-2">Request deletion of your data</li>
                <li className="mb-2">Object to our use of your data</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy, please contact us at privacy@fpleliteinsights.com
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}