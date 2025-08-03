import { Search, User, Menu, X, Heart, ShoppingCart, Car, Wrench, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCartSidebar } from "@/components/ShoppingCartSidebar";
import { useState } from "react";
import { Link } from "react-router-dom";
import engineLogo from "@/assets/engine-logo.png";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center text-sm font-medium">
          <span className="mr-4">🔥 ALL ENGINES 30% OFF</span>
          <Button 
            size="sm" 
            variant="secondary" 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-1 text-xs"
          >
            VIEW STOCK »
          </Button>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Menu + Logo */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:bg-muted"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Menu</span>
              </Button>
              
              <Link to="/" className="flex items-center space-x-2">
                <img 
                  src={engineLogo} 
                  alt="A class Verified Engine Logo" 
                  className="w-8 h-8 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary uppercase tracking-wide">A CLASS</span>
                  <span className="text-lg font-bold text-foreground font-['Orbitron'] -mt-1">
                    VERIFIED ENGINE
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Favorites, Login, Cart */}
            <div className="flex items-center space-x-6">
              {/* Favorites */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Heart className="h-6 w-6 text-foreground" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">Favorites</span>
              </div>

              {/* Login */}
              <div className="flex flex-col items-center">
                <User className="h-6 w-6 text-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Login</span>
              </div>

              {/* Cart */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-foreground" />
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">Cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-muted/30 py-3 px-4">
        <div className="container mx-auto">
          <div className="relative max-w-2xl mx-auto">
            <Input
              placeholder="Search for Auto Parts, Engines..."
              className="pl-4 pr-12 py-3 bg-white border-border text-foreground placeholder:text-muted-foreground rounded-lg"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Button 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-6"
            >
              <Search className="h-4 w-4 mr-2" />
              SEARCH
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <nav className="flex items-center justify-between">
            {/* Left Navigation */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/used-engines" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2"
              >
                <Car className="h-5 w-5" />
                <span className="font-medium">Used Engines</span>
              </Link>
              
              <Link 
                to="/products" 
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2"
              >
                <Wrench className="h-5 w-5" />
                <div className="flex flex-col">
                  <span className="text-xs text-green-600 font-medium">New & Used</span>
                  <span className="font-medium -mt-1">Auto Parts</span>
                </div>
              </Link>
            </div>

            {/* Right Navigation */}
            <Link 
              to="/contact" 
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">Contact</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background border-b border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link 
              to="/" 
              className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Engines
            </Link>
            <Link 
              to="/used-engines" 
              className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Used Engines
            </Link>
            <Link 
              to="/about" 
              className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};