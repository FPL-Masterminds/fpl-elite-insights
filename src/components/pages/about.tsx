import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#37003C] mb-8">About FPL Elite Insights</h1>
            
            <div className="prose prose-lg">
              <p className="text-gray-600 mb-6">
                FPL Elite Insights was created by a team of passionate Fantasy Premier League managers who wanted to bring professional-level analytics to everyone who plays the game.
              </p>

              <p className="text-gray-600 mb-6">
                Our mission is to democratize access to high-quality FPL data analysis, making it possible for every manager to make informed decisions based on what the very best players are doing.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                We believe that success in Fantasy Premier League shouldn't be limited to those who can spend hours analyzing data. Our platform brings you instant access to the strategies and decisions of the top 50 FPL managers, helping you make better choices for your team.
              </p>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">What We Offer</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li className="mb-2">Real-time analysis of the top 50 FPL managers' decisions</li>
                <li className="mb-2">Ownership trends and pattern recognition</li>
                <li className="mb-2">Transfer market insights</li>
                <li className="mb-2">Captaincy analysis</li>
                <li className="mb-2">Differential player identification</li>
              </ul>

              <h2 className="text-2xl font-bold text-[#37003C] mt-12 mb-4">Join Our Community</h2>
              <p className="text-gray-600 mb-6">
                Whether you're fighting for the top 10k or just want to win your mini-league, FPL Elite Insights gives you the tools you need to succeed. Join thousands of managers who are already using our platform to improve their FPL performance.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}