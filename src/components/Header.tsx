import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="w-full bg-black">
      {/* Top Banner */}
      <div className="bg-gray-800 text-white py-2 px-4 text-center">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span>FREE SHIPPING ON SELECT ITEMS!</span>
          <span>PHONE: 719-630-3236</span>
        </div>
      </div>

      {/* Mobile menu toggle */}
      <div className="md:hidden bg-black px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <span className="text-2xl">☰</span>}
        </button>
        <div className="text-center">
          <span className="text-orange-400 text-lg font-bold">APR AUTO</span>
          <p className="text-xs text-gray-400">JOIN THE FUN !!</p>
        </div>
      </div>

      {/* Desktop Logo */}
      <div className="hidden md:block bg-black py-6 text-center">
        <div className="text-center">
          <span className="text-orange-400 text-2xl font-bold">APR AUTO</span>
          <p className="text-sm text-gray-400 mt-1">JOIN THE FUN !!</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-gray-900 py-6 px-4">
        <div className="search-container">
          <Input
            placeholder="SEARCH THE STORE"
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
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
          </div>
        </nav>
      )}
    </header>
  );
};