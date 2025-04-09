import { Link } from "react-router-dom";
import { Trophy, Twitter, Instagram, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function LandingPage() {
  const currentYear = new Date().getFullYear().toString();

  const mobileMenuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/banner_logo.png" 
                alt="FPL Elite Insights"
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-2">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sign In
                </Link>
                <Link to="/signup" className="rounded-lg bg-[#01FF87] px-4 py-2 text-sm font-medium text-[#37003C]">
                  Get Started
                </Link>
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden flex items-center">
                <Link to="/signup" className="rounded-lg bg-[#01FF87] px-4 py-2 text-sm font-medium text-[#37003C] mr-2">
                  Get Started
                </Link>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      <nav className="flex flex-col space-y-4">
                        <Link to="/login" className="text-lg px-2 py-1 hover:text-primary">
                          Sign In
                        </Link>
                        {mobileMenuItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="text-lg px-2 py-1 hover:text-primary"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Season Badge */}
        <div className="text-center mt-12">
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-gray-50 text-gray-600">
            2024/25 Season Available
          </span>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 text-center mt-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#37003C] leading-tight mb-4">
            Elevate Your Fantasy Premier League Game<br />with Elite Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Gain access to premium analytics from the world's top 50 Fantasy Premier League managers. Climb the ranks with data-driven decisions.
          </p>
          <Link 
            to="/signup"
            className="inline-flex items-center justify-center rounded-lg bg-[#01FF87] px-6 py-3 text-[#37003C] font-medium hover:bg-[#00E578] mb-10"
          >
            Access FPL Elite Insights →
          </Link>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#01FF87] rounded-full"></span>
              <span className="text-sm text-gray-500">Easy to understand FPL Statistics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#01FF87] rounded-full"></span>
              <span className="text-sm text-gray-500">Just £4.99/month</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#01FF87] rounded-full"></span>
              <span className="text-sm text-gray-500">Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#37003C] mb-3">
              Premium FPL Analytics at Your Fingertips
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform provides exclusive insights that give you the edge in Fantasy Premier League. Used by mini-league champions and top 10k managers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#37003C]" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3 className="text-lg text-[#37003C] font-semibold mb-3">Ownership Insights</h3>
              <p className="text-gray-600">Breakdown of the most-owned players among the current Top 50 FPL managers worldwide.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#37003C]" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12L12 2l10 10M2 12l10 10 10-10M12 2v20" />
                </svg>
              </div>
              <h3 className="text-lg text-[#37003C] font-semibold mb-3">Rising & Falling Trends</h3>
              <p className="text-gray-600">Identify which assets are gaining traction and which are being dropped by the elite.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#37003C]" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-lg text-[#37003C] font-semibold mb-3">Key Differentials</h3>
              <p className="text-gray-600">Uncover under-the-radar picks that are making a difference at the top.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-[#37003C]" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-lg text-[#37003C] font-semibold mb-3">Strategic Takeaways</h3>
              <p className="text-gray-600">Actionable advice on how to adapt your squad based on the habits of the best FPL players.</p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold text-[#37003C] mb-4">
              Affordable Premium Insights
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Just £4.99 per month for full access to all our premium features and insights.
            </p>

            <div className="max-w-md mx-auto">
              {/* Single Price Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="mb-8">
                  <span className="text-sm text-gray-500">Monthly</span>
                  <div className="flex items-baseline mt-2">
                    <span className="text-4xl font-bold">£4.99</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Top 50 FPL Manager Ownership Insights
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Top 50 Squads Template Team
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Top 50 Squads Differentials
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Transfer Market Trends
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Captain Pick Trends
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Player Form Analysis
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-[#01FF87] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Expected Points
                  </li>
                </ul>
                <Link
                  to="/signup"
                  className="block w-full text-center bg-[#01FF87] text-[#37003C] rounded-lg px-4 py-2 font-medium hover:bg-[#00E578]"
                >
                  Subscribe Now →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-[#37003C] mb-4">
            Trusted by FPL Champions
          </h2>
          <p className="text-center text-gray-600 mb-12">
            See how FPL Elite Insights has helped managers climb the ranks and win their mini-leagues.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src="/icon.png"
                  alt="Chris White"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Chris White</h4>
                  <p className="text-sm text-gray-500">Mini-League Champion 2022/23</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">
                "FPL Elite Insights has completely changed the way I play Fantasy Premier League. Focusing on the Top 50 teams made me rethink my strategy, and I'm finally climbing my mini-league after years of frustration!"
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src="/icon.png"
                  alt="Sarah Chen"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-500">3-time Mini-League Champion</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">
                "The early pattern detection is a game-changer. I picked up players before they became popular thanks to FPL Elite Insights, and it's given me a huge edge over my competition this season."
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src="/icon.png"
                  alt="David Thompson"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">David Thompson</h4>
                  <p className="text-sm text-gray-500">Top 50k Finish 2023/24</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">
                "I've always struggled with making consistent transfers, but the insights from the Top 50 squads have been invaluable. My team is performing better than ever, and I feel more confident with every decision I make"
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-center text-3xl font-bold text-[#37003C] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Everything you need to know about FPL Elite Insights.
          </p>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                What is FPL Elite Insights?
              </h3>
              <p className="text-gray-600">
                FPL Elite Insights provides real-time data analysis on the Top 50 Fantasy Premier League squads. We track ownership trends, template squads, key differentials, and transfer patterns to help you stay ahead of the competition.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                How often is the data updated?
              </h3>
              <p className="text-gray-600">
                Our squad analysis pulls live updates throughout the gameweek, ensuring you have the latest insights on player ownership, transfers, and squad changes among the top-performing FPL managers.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                What kind of insights do I get?
              </h3>
              <p className="text-gray-600">
                You'll receive detailed analysis on the most-owned players in the Top 50 FPL squads, giving you a clear picture of the template team among elite managers. Our insights track rising and falling ownership trends, helping you identify popular picks before they become mainstream and avoid players on the decline. We also highlight key differentials - those overlooked gems that can set your team apart from the competition. Additionally, we provide data-driven breakdowns of captaincy choices and transfer strategies, so you can align your moves with the best-performing FPL managers and maximise your points each gameweek.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                Is this service useful for casual FPL players?
              </h3>
              <p className="text-gray-600">
                Absolutely! Whether you're a seasoned FPL veteran or just looking to improve, our insights provide an unfair advantage by revealing how the top-ranked managers are navigating the season.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                How do I use this data to improve my rank?
              </h3>
              <p className="text-gray-600">
                By studying the trends among the elite managers, you can mirror successful strategies, jump on emerging differentials early, and avoid common pitfalls. Our squad analysis breakdowns makes it easy to apply this data to your own squad.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                Is there a free version?
              </h3>
              <p className="text-gray-600">
                There is no free version, but for just £4.99 a month - roughly £1 per week - you get detailed, at-a-glance analysis of the Top 50 FPL squads. With real-time data and expert insights, you can quickly apply wisdom-of-the-crowd strategies to your team, helping you stay ahead and maximise your points every gameweek.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-[#37003C] mb-2">
                Can I get a refund?
              </h3>
              <p className="text-gray-600">
                Once your payment is processed, you'll gain full access to our live, real-time FPL data. As this is a digital product, refunds are not available. However, there are no long-term commitments, and you're free to cancel your membership at any time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#37003C] mb-4">
              Ready to Transform Your FPL Season?
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of managers who are climbing the ranks with FPL Elite Insights.<br />
              Your mini-league rivals won't know what hit them.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-[#01FF87] px-6 py-3 text-[#37003C] font-medium hover:bg-[#00E578]"
            >
              Access FPL Elite Insights →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <Link to="/" className="flex items-center">
                  <img 
                    src="/banner_logo.png" 
                    alt="FPL Elite Insights"
                    className="h-8 w-auto"
                  />
                </Link>
                <p className="mt-4 text-sm text-gray-600">
                  Premium analytics and insights for serious Fantasy Premier League managers.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                  <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Resources</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                  <li><Link to="/faq" className="text-gray-600 hover:text-gray-900">FAQ</Link></li>
                  <li><Link to="/support" className="text-gray-600 hover:text-gray-900">Support</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link to="/cookies" className="text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8">
              <p className="text-center text-sm text-gray-600">
                © {currentYear} FPL Elite Insights. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}