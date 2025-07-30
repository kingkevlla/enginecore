import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Calendar, Gauge, Fuel, Settings, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import engine images
import toyotaEngine from "@/assets/toyota-4cyl-engine.jpg";
import bmwEngine from "@/assets/bmw-v6-engine.jpg";
import fordEngine from "@/assets/ford-v8-engine.jpg";
import nissanGtrEngine from "@/assets/nissan-gtr-engine.jpg";

const UsedEngines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleAddToCart = (engineName: string) => {
    toast({
      title: "Added to Cart",
      description: `${engineName} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (engineName: string) => {
    toast({
      title: "Added to Wishlist",
      description: `${engineName} has been added to your wishlist.`,
    });
  };

  const usedEngines = [
    {
      id: 1,
      name: "Honda Civic D16Y7 VTEC",
      year: 2001,
      brand: "Honda",
      model: "D16Y7",
      price: 1850,
      originalPrice: 2400,
      image: toyotaEngine,
      rating: 4.3,
      reviews: 89,
      mileage: "89,000 miles",
      displacement: "1.6L",
      power: "127 HP",
      torque: "107 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder",
      condition: "Good",
      compatibility: ["Honda Civic", "Honda CRX"],
      warranty: "6 months",
      description: "Reliable VTEC engine from a well-maintained Civic. Known for excellent fuel economy and Honda's legendary reliability. Perfect for daily driving or project builds."
    },
    {
      id: 2,
      name: "Toyota Camry 2AZ-FE",
      year: 2005,
      brand: "Toyota",
      model: "2AZ-FE",
      price: 2200,
      originalPrice: 2800,
      image: toyotaEngine,
      rating: 4.6,
      reviews: 156,
      mileage: "112,000 miles",
      displacement: "2.4L",
      power: "158 HP",
      torque: "162 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder",
      condition: "Excellent",
      compatibility: ["Toyota Camry", "Toyota RAV4", "Toyota Solara"],
      warranty: "12 months",
      description: "Well-maintained engine from a reliable Camry. Toyota's 2AZ-FE is known for its durability and smooth operation. Comes with complete service records."
    },
    {
      id: 3,
      name: "BMW E46 M54B30",
      year: 2003,
      brand: "BMW",
      model: "M54B30",
      price: 3800,
      originalPrice: 4800,
      image: bmwEngine,
      rating: 4.4,
      reviews: 73,
      mileage: "95,000 miles",
      displacement: "3.0L",
      power: "231 HP",
      torque: "221 lb-ft",
      fuelType: "Gasoline",
      cylinders: "6-Cylinder",
      condition: "Very Good",
      compatibility: ["BMW 330i", "BMW Z4", "BMW X3"],
      warranty: "9 months",
      description: "Smooth inline-6 from BMW's E46 generation. Recently serviced with new gaskets and fluids. Known for its balanced power delivery and characteristic BMW sound."
    },
    {
      id: 4,
      name: "Ford Focus Zetec-E",
      year: 2004,
      brand: "Ford",
      model: "Zetec-E",
      price: 1650,
      originalPrice: 2100,
      image: fordEngine,
      rating: 4.1,
      reviews: 94,
      mileage: "108,000 miles",
      displacement: "2.0L",
      power: "130 HP",
      torque: "135 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder",
      condition: "Good",
      compatibility: ["Ford Focus", "Ford Escort"],
      warranty: "6 months",
      description: "Reliable European Ford engine with good power characteristics. Well-suited for daily driving with decent fuel economy. Recent timing belt service completed."
    },
    {
      id: 5,
      name: "Nissan SR20DET Turbo",
      year: 2000,
      brand: "Nissan",
      model: "SR20DET",
      price: 4200,
      originalPrice: 5500,
      image: nissanGtrEngine,
      rating: 4.8,
      reviews: 167,
      mileage: "85,000 miles",
      displacement: "2.0L",
      power: "205 HP",
      torque: "203 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder Turbo",
      condition: "Excellent",
      compatibility: ["Nissan Silvia S14", "Nissan 200SX"],
      warranty: "12 months",
      description: "Legendary JDM turbocharged engine in excellent condition. Perfect for performance builds or replacements. Includes turbocharger and intercooler setup."
    },
    {
      id: 6,
      name: "Subaru EJ205 WRX",
      year: 2006,
      brand: "Subaru",
      model: "EJ205",
      price: 3200,
      originalPrice: 4100,
      image: bmwEngine,
      rating: 4.5,
      reviews: 128,
      mileage: "78,000 miles",
      displacement: "2.0L",
      power: "227 HP",
      torque: "217 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder Turbo",
      condition: "Very Good",
      compatibility: ["Subaru WRX", "Subaru Forester XT"],
      warranty: "10 months",
      description: "Iconic boxer engine from the WRX. Recently rebuilt with forged internals. Perfect for AWD performance applications. Includes ECU and wiring harness."
    },
    {
      id: 7,
      name: "Volkswagen 1.8T AWP",
      year: 2002,
      brand: "Volkswagen",
      model: "1.8T AWP",
      price: 2400,
      originalPrice: 3200,
      image: fordEngine,
      rating: 4.2,
      reviews: 112,
      mileage: "115,000 miles",
      displacement: "1.8L",
      power: "150 HP",
      torque: "155 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder Turbo",
      condition: "Good",
      compatibility: ["VW Golf", "VW Jetta", "Audi A4"],
      warranty: "8 months",
      description: "Popular tuner-friendly engine with great modification potential. Recent timing belt and water pump service. Known for responding well to ECU tuning."
    },
    {
      id: 8,
      name: "Mazda B6-ZE DOHC",
      year: 2001,
      brand: "Mazda",
      model: "B6-ZE",
      price: 1450,
      originalPrice: 1900,
      image: toyotaEngine,
      rating: 4.0,
      reviews: 67,
      mileage: "125,000 miles",
      displacement: "1.6L",
      power: "103 HP",
      torque: "100 lb-ft",
      fuelType: "Gasoline",
      cylinders: "4-Cylinder",
      condition: "Fair",
      compatibility: ["Mazda Miata", "Mazda 323"],
      warranty: "3 months",
      description: "Classic Miata engine perfect for restoration projects. Runs well but shows normal wear for age. Great starting point for a fun roadster build."
    }
  ];

  const filteredEngines = usedEngines.filter(engine =>
    engine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    engine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    engine.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Orbitron'] text-gradient">
              Used Engines (2000-2020)
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Quality pre-owned engines at affordable prices. Each engine is thoroughly inspected 
              and comes with detailed history and warranty coverage.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>2000-2020 Models</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                <span>Fully Inspected</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span>Warranty Included</span>
              </div>
            </div>
          </div>

          {/* Filter Stats */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              Showing {filteredEngines.length} of {usedEngines.length} used engines
            </p>
          </div>

          {/* Engines Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEngines.map((engine) => (
              <Card key={engine.id} className="group glass-card border-white/10 overflow-hidden hover-glow">
                <div className="relative overflow-hidden">
                  <img
                    src={engine.image}
                    alt={engine.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                      {engine.year}
                    </Badge>
                    <Badge variant={engine.condition === "Excellent" ? "default" : 
                                  engine.condition === "Very Good" ? "secondary" : "outline"}>
                      {engine.condition}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      size="sm"
                      variant="glass"
                      className="h-8 w-8 p-0"
                      onClick={() => handleAddToWishlist(engine.name)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {engine.brand}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{engine.rating}</span>
                      <span className="text-xs text-muted-foreground">({engine.reviews})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm mb-1 line-clamp-2">{engine.name}</h3>
                  <p className="text-xs text-muted-foreground">{engine.model} • {engine.mileage}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Gauge className="h-3 w-3 text-primary" />
                      <span>{engine.power}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-3 w-3 text-muted-foreground" />
                      <span>{engine.displacement}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {engine.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-primary">
                        ${engine.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground line-through">
                        ${engine.originalPrice.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-center">
                      <div className="text-muted-foreground">Warranty</div>
                      <div className="font-semibold text-primary">{engine.warranty}</div>
                    </div>
                  </div>

                  <Button 
                    variant="futuristic" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleAddToCart(engine.name)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 font-['Orbitron'] text-center">
              Why Choose Our Used Engines?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Settings className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Thorough Inspection</h3>
                <p className="text-sm text-muted-foreground">
                  Every engine undergoes comprehensive testing and inspection before listing.
                </p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  All engines come with warranty coverage and detailed condition reports.
                </p>
              </div>
              <div className="text-center">
                <Calendar className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Service History</h3>
                <p className="text-sm text-muted-foreground">
                  Complete maintenance records and mileage verification included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <AIChatAssistant />
    </div>
  );
};

export default UsedEngines;