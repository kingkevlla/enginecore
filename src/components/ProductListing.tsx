import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star, Zap, Fuel, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

// Import engine images
import heroEngines from "@/assets/hero-engines.jpg";
import toyotaEngine from "@/assets/toyota-4cyl-engine.jpg";
import bmwEngine from "@/assets/bmw-v6-engine.jpg";
import mercedesEngine from "@/assets/mercedes-v8-engine.jpg";
import hondaBikeEngine from "@/assets/honda-bike-engine.jpg";
import fordEngine from "@/assets/ford-v8-engine.jpg";
import nissanGtrEngine from "@/assets/nissan-gtr-engine.jpg";

const products = [
  // Car Engines - Toyota (2000-2024)
  { id: 1, name: "Toyota 2AZ-FE Engine", brand: "Toyota", model: "2AZ-FE", year: "2000-2008", price: 3500, originalPrice: 4200, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.4L", power: "158 HP", torque: "162 lb-ft", image: toyotaEngine, rating: 4.8, reviews: 124, compatibility: ["Camry", "RAV4"], condition: "Refurbished", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 15 },
  { id: 2, name: "Toyota 1ZZ-FE Engine", brand: "Toyota", model: "1ZZ-FE", year: "2000-2005", price: 2800, originalPrice: 3400, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.8L", power: "130 HP", torque: "125 lb-ft", image: toyotaEngine, rating: 4.6, reviews: 89, compatibility: ["Corolla", "Matrix"], condition: "Used", warranty: "9 months", shipping: "Free", inStock: true, stockCount: 22 },
  { id: 3, name: "Toyota 2GR-FE V6", brand: "Toyota", model: "2GR-FE", year: "2005-2018", price: 5200, originalPrice: 6800, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.5L", power: "268 HP", torque: "248 lb-ft", image: toyotaEngine, rating: 4.9, reviews: 156, compatibility: ["Camry", "Avalon"], condition: "Refurbished", warranty: "18 months", shipping: "Free", inStock: true, stockCount: 8 },
  { id: 4, name: "Toyota Dynamic Force", brand: "Toyota", model: "A25A-FKS", year: "2018-2024", price: 5200, originalPrice: 6800, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.5L", power: "203 HP", torque: "184 lb-ft", image: toyotaEngine, rating: 4.7, reviews: 145, compatibility: ["Camry", "RAV4"], condition: "New", warranty: "36 months", shipping: "Free", inStock: true, stockCount: 12 },

  // BMW Engines (2000-2024)
  { id: 5, name: "BMW N55B30 TwinPower", brand: "BMW", model: "N55B30", year: "2009-2016", price: 8500, originalPrice: 12000, category: "Car Engine", type: "Gasoline", cylinders: "6-Cylinder", displacement: "3.0L", power: "300 HP", torque: "300 lb-ft", image: bmwEngine, rating: 4.6, reviews: 87, compatibility: ["335i", "535i"], condition: "Refurbished", warranty: "24 months", shipping: "$150", inStock: true, stockCount: 5 },
  { id: 6, name: "BMW B58B30 Engine", brand: "BMW", model: "B58B30", year: "2015-2024", price: 8800, originalPrice: 11500, category: "Car Engine", type: "Gasoline", cylinders: "6-Cylinder", displacement: "3.0L", power: "335 HP", torque: "330 lb-ft", image: bmwEngine, rating: 4.8, reviews: 167, compatibility: ["340i", "Z4"], condition: "Refurbished", warranty: "30 months", shipping: "$160", inStock: true, stockCount: 7 },
  { id: 7, name: "BMW S65B40 V8", brand: "BMW", model: "S65B40", year: "2008-2013", price: 15000, originalPrice: 22000, category: "Car Engine", type: "Gasoline", cylinders: "V8", displacement: "4.0L", power: "414 HP", torque: "295 lb-ft", image: bmwEngine, rating: 4.9, reviews: 45, compatibility: ["M3"], condition: "Refurbished", warranty: "36 months", shipping: "$200", inStock: true, stockCount: 2 },

  // Mercedes Engines (2000-2024)
  { id: 8, name: "Mercedes OM651 Diesel", brand: "Mercedes", model: "OM651", year: "2008-2018", price: 7200, originalPrice: 9500, category: "Car Engine", type: "Diesel", cylinders: "4-Cylinder", displacement: "2.1L", power: "170 HP", torque: "295 lb-ft", image: mercedesEngine, rating: 4.5, reviews: 134, compatibility: ["C-Class", "E-Class"], condition: "Used", warranty: "18 months", shipping: "$150", inStock: true, stockCount: 9 },
  { id: 9, name: "Mercedes M156 V8 AMG", brand: "Mercedes", model: "M156", year: "2006-2014", price: 18000, originalPrice: 25000, category: "Car Engine", type: "Gasoline", cylinders: "V8", displacement: "6.2L", power: "457 HP", torque: "465 lb-ft", image: mercedesEngine, rating: 4.9, reviews: 56, compatibility: ["C63 AMG"], condition: "Refurbished", warranty: "36 months", shipping: "$250", inStock: true, stockCount: 3 },

  // Honda Engines (2000-2024)
  { id: 10, name: "Honda K20A2 VTEC", brand: "Honda", model: "K20A2", year: "2002-2006", price: 4200, originalPrice: 5400, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "200 HP", torque: "142 lb-ft", image: toyotaEngine, rating: 4.8, reviews: 167, compatibility: ["Civic Si"], condition: "Used", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 11 },
  { id: 11, name: "Honda J35A V6", brand: "Honda", model: "J35A", year: "2005-2014", price: 5800, originalPrice: 7200, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.5L", power: "280 HP", torque: "254 lb-ft", image: toyotaEngine, rating: 4.6, reviews: 123, compatibility: ["Pilot", "Odyssey"], condition: "Refurbished", warranty: "15 months", shipping: "$120", inStock: true, stockCount: 8 },

  // Ford Engines (2000-2024)
  { id: 12, name: "Ford 3.5L EcoBoost", brand: "Ford", model: "3.5L EcoBoost", year: "2010-2020", price: 7500, originalPrice: 9800, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.5L", power: "365 HP", torque: "420 lb-ft", image: fordEngine, rating: 4.5, reviews: 198, compatibility: ["F-150", "Explorer"], condition: "Used", warranty: "18 months", shipping: "$150", inStock: true, stockCount: 13 },
  { id: 13, name: "Ford Coyote V8", brand: "Ford", model: "5.0L Coyote", year: "2011-2023", price: 11000, originalPrice: 15000, category: "Car Engine", type: "Gasoline", cylinders: "V8", displacement: "5.0L", power: "435 HP", torque: "400 lb-ft", image: fordEngine, rating: 4.9, reviews: 267, compatibility: ["Mustang GT"], condition: "Refurbished", warranty: "30 months", shipping: "$200", inStock: true, stockCount: 4 },

  // Nissan Engines (2000-2024)
  { id: 14, name: "Nissan VR38DETT", brand: "Nissan", model: "VR38DETT", year: "2009-2024", price: 18000, originalPrice: 25000, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.8L", power: "565 HP", torque: "467 lb-ft", image: nissanGtrEngine, rating: 5.0, reviews: 89, compatibility: ["GT-R"], condition: "Refurbished", warranty: "36 months", shipping: "$250", inStock: true, stockCount: 1 },
  { id: 15, name: "Nissan QR25DE", brand: "Nissan", model: "QR25DE", year: "2002-2018", price: 3200, originalPrice: 4100, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.5L", power: "175 HP", torque: "180 lb-ft", image: nissanGtrEngine, rating: 4.3, reviews: 156, compatibility: ["Altima", "Sentra"], condition: "Used", warranty: "10 months", shipping: "Free", inStock: true, stockCount: 19 },

  // Motorcycle Engines - Honda (2000-2024)
  { id: 16, name: "Honda CBR1000RR", brand: "Honda", model: "CBR1000RR", year: "2004-2019", price: 4800, originalPrice: 6200, category: "Motorcycle Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.0L", power: "189 HP", torque: "85 lb-ft", image: hondaBikeEngine, rating: 4.9, reviews: 234, compatibility: ["CBR1000RR"], condition: "Used", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 14 },
  { id: 17, name: "Honda CBR600RR", brand: "Honda", model: "CBR600RR", year: "2007-2012", price: 3500, originalPrice: 4500, category: "Motorcycle Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "0.6L", power: "118 HP", torque: "46 lb-ft", image: hondaBikeEngine, rating: 4.7, reviews: 298, compatibility: ["CBR600RR"], condition: "Used", warranty: "10 months", shipping: "$60", inStock: true, stockCount: 16 },

  // Yamaha Engines (2000-2024)
  { id: 18, name: "Yamaha YZF-R1", brand: "Yamaha", model: "YZF-R1", year: "2009-2019", price: 5200, originalPrice: 6800, category: "Motorcycle Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.0L", power: "200 HP", torque: "85 lb-ft", image: hondaBikeEngine, rating: 4.8, reviews: 267, compatibility: ["YZF-R1"], condition: "Used", warranty: "12 months", shipping: "$90", inStock: true, stockCount: 11 },
  { id: 19, name: "Yamaha MT-09", brand: "Yamaha", model: "MT-09", year: "2014-2023", price: 3800, originalPrice: 4900, category: "Motorcycle Engine", type: "Gasoline", cylinders: "3-Cylinder", displacement: "0.85L", power: "115 HP", torque: "64 lb-ft", image: hondaBikeEngine, rating: 4.7, reviews: 189, compatibility: ["MT-09"], condition: "Used", warranty: "10 months", shipping: "$70", inStock: true, stockCount: 13 },

  // Kawasaki Engines (2000-2024)
  { id: 20, name: "Kawasaki ZX-10R", brand: "Kawasaki", model: "ZX-10R", year: "2008-2020", price: 4900, originalPrice: 6400, category: "Motorcycle Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.0L", power: "210 HP", torque: "84 lb-ft", image: hondaBikeEngine, rating: 4.9, reviews: 198, compatibility: ["ZX-10R"], condition: "Refurbished", warranty: "18 months", shipping: "$85", inStock: true, stockCount: 8 },

  // Spare Parts
  { id: 21, name: "Universal Turbocharger", brand: "Generic", model: "T3/T4", year: "2000-2024", price: 650, originalPrice: 890, category: "Spare Parts", type: "Turbo", cylinders: "Universal", displacement: "Universal", power: "+150 HP", torque: "+120 lb-ft", image: heroEngines, rating: 4.3, reviews: 234, compatibility: ["Most engines"], condition: "New", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 25 },
  { id: 22, name: "Performance Radiator", brand: "Mishimoto", model: "MMRAD", year: "2005-2024", price: 420, originalPrice: 580, category: "Spare Parts", type: "Cooling", cylinders: "Universal", displacement: "Universal", power: "Better Cooling", torque: "N/A", image: heroEngines, rating: 4.6, reviews: 189, compatibility: ["Honda Civic"], condition: "New", warranty: "24 months", shipping: "$50", inStock: true, stockCount: 18 }
];

export const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const categoryMapping: Record<string, string> = {
        'Car Engines': 'Car Engine',
        'Motorcycle Engines': 'Motorcycle Engine',
        'Spare Parts': 'Spare Parts'
      };
      
      const mappedCategory = categoryMapping[categoryParam] || categoryParam;
      setSelectedCategory(mappedCategory);
    }
  }, [searchParams]);

  const brands = ["All", "Toyota", "BMW", "Mercedes", "Honda", "Ford", "Nissan", "Volkswagen", "Audi", "Chevrolet", "Yamaha", "Kawasaki", "Suzuki", "Ducati", "KTM"];
  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);
  const categories = ["All", "Car Engine", "Motorcycle Engine", "Spare Parts"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !selectedBrand || selectedBrand === "All" || product.brand === selectedBrand;
    const matchesCategory = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    const matchesYear = !selectedYear || product.year.includes(selectedYear) || 
                       (product.year.includes("-") && 
                        parseInt(selectedYear) >= parseInt(product.year.split("-")[0]) && 
                        parseInt(selectedYear) <= parseInt(product.year.split("-")[1]));

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice && matchesYear;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      case "newest": return b.id - a.id;
      default: return 0;
    }
  });

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron'] text-gradient">
            Engine Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium engines and parts for all vehicle types (2000-2024)
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                placeholder="Search engines, brands, models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-background/50 border-white/20"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="glass-card border-white/10 hover-glow group transition-all duration-300">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                  {product.condition}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.brand}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{product.model} • {product.year}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-3 w-3 text-primary" />
                  <span className="text-xs">{product.power}</span>
                  <Fuel className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{product.displacement}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">${product.price.toLocaleString()}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button size="sm" className="flex-1" variant="futuristic">
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
                <Button size="sm" variant="outline">
                  <Heart className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No engines found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};