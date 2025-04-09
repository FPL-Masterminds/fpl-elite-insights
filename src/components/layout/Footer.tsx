import { Link } from "react-router-dom";
import { Trophy, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span className="font-bold text-xl">FPL Elite Insights</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Premium analytics and insights for serious Fantasy Premier League managers.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4">About</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Social</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Follow us on X
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Follow us on Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} FPL Elite Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}