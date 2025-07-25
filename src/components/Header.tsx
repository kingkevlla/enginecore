import { Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCartSidebar } from "@/components/ShoppingCartSidebar";

export const Header = () => {
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
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Car Engines
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Motorcycle Engines
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Spare Parts
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex relative max-w-md flex-1 mx-8">
            <Input
              placeholder="Search engines, parts, or vehicle models..."
              className="pl-10 bg-muted/50 border-white/10 text-foreground placeholder:text-muted-foreground"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <ShoppingCartSidebar />
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Input
              placeholder="Search engines, parts, or vehicle models..."
              className="pl-10 bg-muted/50 border-white/10 text-foreground placeholder:text-muted-foreground"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};