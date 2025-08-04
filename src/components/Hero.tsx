import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-engines.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Premium Automotive
          <span className="block text-orange-400">
            Engines & Parts
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover our premium collection of automotive engines, parts, and components. 
          Quality guaranteed with professional installation support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 h-auto">
            <Link to="/products">
              Browse Engines
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto">
            <Link to="/contact">
              Get Quote
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};