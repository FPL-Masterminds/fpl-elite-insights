import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <Link to="/">
            <img 
              src="banner_logo.png" 
              alt="FPL Elite Insights"
              className="h-12 mx-auto mb-4"
            />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}