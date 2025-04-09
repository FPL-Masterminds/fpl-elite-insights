import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../../supabase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, logo should link to dashboard
  const logoLink = user ? "/dashboard" : "/";

  const mobileMenuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to={logoLink} className="flex items-center">
            <img 
              src="/banner_logo.png" 
              alt="FPL Elite Insights"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Mobile Menu */}
                <div className="md:hidden">
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
                          {mobileMenuItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="text-lg px-2 py-1 hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          ))}
                          <Button 
                            variant="ghost" 
                            className="justify-start px-2 hover:bg-transparent"
                            onClick={() => signOut()}
                          >
                            Log out
                          </Button>
                        </nav>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/icon.png" alt={user.email} />
                          <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuItem className="flex items-center">
                        <span className="truncate">{user.email}</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="hidden md:block">
                  <Link to="/login">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                </div>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
                {/* Mobile Menu for non-authenticated users */}
                <div className="md:hidden">
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
}