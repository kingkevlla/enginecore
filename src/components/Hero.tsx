import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-engines.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Futuristic Engine Workshop"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Orbitron']">
            <span className="text-gradient">Next-Gen</span>
            <br />
            <span className="text-foreground">Engine Marketplace</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AI-powered platform for premium car & motorcycle engines. 
            Find the perfect engine with intelligent matching technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="futuristic" 
              size="xl" 
              className="group"
              onClick={() => navigate('/products')}
            >
              Explore Engines
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => navigate('/used-engines')}
            >
              Used Engines
              <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass-card p-6 hover-glow">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2 font-['Orbitron']">Guaranteed Quality</h3>
              <p className="text-sm text-muted-foreground">Premium engines with comprehensive warranty</p>
            </div>
            <div className="glass-card p-6 hover-glow">
              <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2 font-['Orbitron']">AI-Powered Search</h3>
              <p className="text-sm text-muted-foreground">Smart compatibility matching technology</p>
            </div>
            <div className="glass-card p-6 hover-glow">
              <Truck className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2 font-['Orbitron']">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Global shipping with real-time tracking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
};