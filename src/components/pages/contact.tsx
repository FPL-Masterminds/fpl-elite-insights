import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Button } from "../ui/button";

export default function Contact() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-[#37003C] mb-8">Contact Us</h1>
            
            <p className="text-gray-600 mb-8">
              Have a question or need help? We're here to assist you. Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#01FF87] focus:border-transparent outline-none transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#01FF87] focus:border-transparent outline-none transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#01FF87] focus:border-transparent outline-none transition"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#01FF87] focus:border-transparent outline-none transition"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-[#01FF87] text-[#37003C]">
                Send Message
              </Button>
            </form>

            <div className="mt-12 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[#37003C] mb-4">Other Ways to Reach Us</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-[#37003C]">Email:</strong> support@fpleliteinsights.com
                </p>
                <p>
                  <strong className="text-[#37003C]">Response Time:</strong> We aim to respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}