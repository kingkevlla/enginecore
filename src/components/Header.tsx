import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCartSidebar } from "@/components/ShoppingCartSidebar";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl font-['Orbitron']">E</span>
            </div>
            <h1 className="text-2xl font-bold font-['Orbitron'] text-gradient">
              EngineCore
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              All Engines
            </Link>
            <Link to="/used-engines" className="text-foreground hover:text-primary transition-colors">
              Used Engines
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex relative max-w-md flex-1 mx-8">
            <Input
              placeholder="Search engines, parts, or vehicle models..."
              className="pl-10 bg-muted/50 border-white/10 text-foreground placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <ShoppingCartSidebar />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 animate-fade-in">
            <nav className="flex flex-col space-y-2 pt-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-muted/50 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>Home</span>
              </Link>
              <Link 
                to="/products" 
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-muted/50 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span>All Engines</span>
              </Link>
              <Link 
                to="/used-engines" 
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-muted/50 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span>Used Engines</span>
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-muted/50 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                <span>About</span>
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-all duration-300 py-3 px-4 rounded-lg hover:bg-muted/50 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="w-2 h-2 bg-destructive rounded-full"></span>
                <span>Contact</span>
              </Link>
            </nav>
          </div>
        )}

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Input
              placeholder="Search engines, parts, or vehicle models..."
              className="pl-10 bg-muted/50 border-white/10 text-foreground placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};