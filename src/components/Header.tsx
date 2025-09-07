import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartSidebar } from "@/components/ShoppingCartSidebar";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full bg-black">
      {/* Top Banner */}
      <div className="bg-gray-800 text-white py-1 px-4">
        <div className="flex items-center justify-between text-xs max-w-7xl mx-auto">
          <span>FREE SHIPPING ON SELECT ITEMS!</span>
          <span>PHONE: 719-630-3236</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-black py-3 px-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white mr-4"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <span className="text-xl">☰</span>}
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="SEARCH"
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Logo - Center */}
          <div className="text-center mx-8">
            <span className="text-orange-400 text-xl lg:text-2xl font-bold">verified engine</span>
            <p className="text-xs text-gray-400 hidden sm:block">JOIN THE FUN !!</p>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-white hover:text-orange-400 transition-colors hidden sm:block">
              <span className="text-sm font-medium">WISHLIST</span>
            </Link>
            <ShoppingCartSidebar />
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden md:block bg-black px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link to="/brand-new-engines" className="menu-item block py-2">
            BRAND NEW ENGINES
          </Link>
          <Link to="/rebuilt-engines" className="menu-item block py-2">
            REBUILT ENGINES
          </Link>
          <Link to="/heads" className="menu-item block py-2">
            HEADS
          </Link>
          <Link to="/timing-components" className="menu-item block py-2">
            TIMING COMPONENTS
          </Link>
          <Link to="/shipping" className="menu-item block py-2">
            PREMIER SHIPPING
          </Link>
          <Link to="/parts" className="menu-item block py-2">
            PARTS
          </Link>
          <Link to="/warranty" className="menu-item block py-2">
            PREMIER WARRANTIES
          </Link>
          <Link to="/login" className="menu-item block py-2 mt-8">
            SIGN IN
          </Link>
          <Link to="/register" className="menu-item block py-2">
            REGISTER
          </Link>
          <Link to="/cart" className="menu-item block py-2">
            CART
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black px-4 py-6">
          <div className="space-y-4">
            <Link to="/brand-new-engines" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              BRAND NEW ENGINES
            </Link>
            <Link to="/rebuilt-engines" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              REBUILT ENGINES
            </Link>
            <Link to="/heads" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              HEADS
            </Link>
            <Link to="/timing-components" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              TIMING COMPONENTS
            </Link>
            <Link to="/shipping" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              PREMIER SHIPPING
            </Link>
            <Link to="/parts" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              PARTS
            </Link>
            <Link to="/warranty" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              PREMIER WARRANTIES
            </Link>
            <Link to="/login" className="menu-item block py-2 mt-6" onClick={() => setIsMobileMenuOpen(false)}>
              SIGN IN
            </Link>
            <Link to="/register" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              REGISTER
            </Link>
            <Link to="/cart" className="menu-item block py-2" onClick={() => setIsMobileMenuOpen(false)}>
              CART
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};