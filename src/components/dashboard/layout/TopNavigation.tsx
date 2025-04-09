import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../supabase/auth";

interface TopNavigationProps {
  onSearch?: (query: string) => void;
}

const TopNavigation = ({
  onSearch = () => {},
}: TopNavigationProps) => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-black">
          Dashboard
        </Link>
      </div>

      <Button 
        variant="ghost" 
        onClick={() => signOut()}
        className="text-gray-700 hover:text-black"
      >
        Log out
      </Button>
    </div>
  );
};

export default TopNavigation;