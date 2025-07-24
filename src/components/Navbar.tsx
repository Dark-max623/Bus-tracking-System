import { Button } from "@/components/ui/button";
import { Bus, User, Menu, Bell } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">LBTBS</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#tracking" className="text-foreground hover:text-primary transition-colors">
              Live Tracking
            </a>
            <a href="#bookings" className="text-foreground hover:text-primary transition-colors">
              Book Ride
            </a>
            <a href="/driver" className="text-foreground hover:text-primary transition-colors">
              Driver
            </a>
            <a href="/admin" className="text-foreground hover:text-primary transition-colors">
              Admin
            </a>
          </div>
          
          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="outline">
              <User className="w-4 h-4" />
              Sign In
            </Button>
            <Button variant="default">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-foreground hover:text-primary">
                Home
              </a>
              <a href="#tracking" className="block px-3 py-2 text-foreground hover:text-primary">
                Live Tracking
              </a>
              <a href="#bookings" className="block px-3 py-2 text-foreground hover:text-primary">
                Book Ride
              </a>
              <a href="/driver" className="block px-3 py-2 text-foreground hover:text-primary">
                Driver
              </a>
              <a href="/admin" className="block px-3 py-2 text-foreground hover:text-primary">
                Admin
              </a>
              <div className="border-t border-border pt-4 pb-2">
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4" />
                    Sign In
                  </Button>
                  <Button variant="default" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;