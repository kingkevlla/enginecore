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
      <div className="bg-gray-800 text-white py-2 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-1 sm:space-y-0 text-sm">
          <span>FREE SHIPPING ON SELECT ITEMS!</span>
          <span>PHONE: 719-630-3236</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-black py-4 px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 max-w-7xl mx-auto">
          
          {/* Search Bar - Mobile/Tablet First */}
          <div className="w-full lg:w-80 order-1 lg:order-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="SEARCH"
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 h-10"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Logo - Center */}
          <div className="text-center order-2 lg:order-2">
            <span className="text-orange-400 text-2xl lg:text-3xl font-bold">verified engine</span>
            <p className="text-sm text-gray-400 mt-1">JOIN THE FUN !!</p>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center space-x-4 order-3 lg:order-3">
            <Link to="/wishlist" className="text-white hover:text-orange-400 transition-colors">
              <span className="text-sm font-medium">WISHLIST</span>
            </Link>
            <ShoppingCartSidebar />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white absolute top-4 left-4"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <span className="text-2xl">☰</span>}
          </button>
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