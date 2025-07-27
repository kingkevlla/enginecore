import { Button } from "@/components/ui/button";
import { Car, Bike, Wrench, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      icon: Car,
      title: "Car Engines",
      description: "Premium automotive engines for all vehicle types",
      count: "500+ Models",
      gradient: "from-blue-500 to-cyan-500",
      categoryKey: "Car Engines"
    },
    {
      icon: Bike,
      title: "Motorcycle Engines", 
      description: "High-performance engines for bikes and motorcycles",
      count: "300+ Models",
      gradient: "from-purple-500 to-pink-500",
      categoryKey: "Motorcycle Engines"
    },
    {
      icon: Wrench,
      title: "Spare Parts",
      description: "Quality spare parts and components for all engines",
      count: "1000+ Parts",
      gradient: "from-green-500 to-emerald-500",
      categoryKey: "Spare Parts"
    }
  ];

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryKey)}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron'] text-gradient">
            Product Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our extensive collection of engines and parts, 
            carefully curated for performance and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative glass-card p-8 hover-glow cursor-pointer transition-all duration-500"
                onClick={() => handleCategoryClick(category.categoryKey)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 rounded-xl transition-opacity group-hover:opacity-10`} />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm text-primary font-semibold">{category.count}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 font-['Orbitron'] group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* CTA */}
                <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary">
                  Explore Category
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>

                {/* Hover Effect */}
                <div className="absolute inset-0 border border-transparent group-hover:border-primary/20 rounded-xl transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};