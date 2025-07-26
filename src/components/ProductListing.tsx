import { useState } from "react";
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
  {
    id: 1,
    name: "Toyota 4-Cylinder DOHC Engine",
    brand: "Toyota",
    model: "2AZ-FE",
    year: "2000-2008",
    price: 3500,
    originalPrice: 4200,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "4-Cylinder",
    displacement: "2.4L",
    power: "158 HP",
    torque: "162 lb-ft",
    image: toyotaEngine,
    rating: 4.8,
    reviews: 124,
    compatibility: ["Camry", "RAV4", "Highlander", "Sienna"],
    condition: "Refurbished",
    warranty: "12 months",
    shipping: "Free",
    inStock: true,
    stockCount: 15
  },
  {
    id: 2,
    name: "BMW TwinPower V6 Engine",
    brand: "BMW",
    model: "N55B30",
    year: "2009-2016",
    price: 8500,
    originalPrice: 12000,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "6-Cylinder",
    displacement: "3.0L",
    power: "300 HP",
    torque: "300 lb-ft",
    image: bmwEngine,
    rating: 4.9,
    reviews: 89,
    compatibility: ["3 Series", "5 Series", "X3", "X5", "Z4"],
    condition: "Used",
    warranty: "6 months",
    shipping: "$150",
    inStock: true,
    stockCount: 8
  },
  {
    id: 3,
    name: "Mercedes-Benz V8 AMG Engine",
    brand: "Mercedes",
    model: "M156",
    year: "2006-2014",
    price: 15000,
    originalPrice: 22000,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "8-Cylinder",
    displacement: "6.2L",
    power: "457 HP",
    torque: "465 lb-ft",
    image: mercedesEngine,
    rating: 4.7,
    reviews: 56,
    compatibility: ["C63 AMG", "E63 AMG", "S63 AMG", "CLS63 AMG"],
    condition: "Refurbished",
    warranty: "18 months",
    shipping: "$200",
    inStock: true,
    stockCount: 3
  },
  {
    id: 4,
    name: "Honda CBR Sport Engine",
    brand: "Honda",
    model: "CBR600RR",
    year: "2007-2012",
    price: 2800,
    originalPrice: 3500,
    category: "Motorcycle Engine",
    type: "Gasoline",
    cylinders: "4-Cylinder",
    displacement: "599cc",
    power: "118 HP",
    torque: "48 lb-ft",
    image: hondaBikeEngine,
    rating: 4.9,
    reviews: 203,
    compatibility: ["CBR600RR", "CBR600F"],
    condition: "Used",
    warranty: "9 months",
    shipping: "Free",
    inStock: true,
    stockCount: 12
  },
  {
    id: 5,
    name: "Ford Mustang V8 Coyote",
    brand: "Ford",
    model: "5.0L Coyote",
    year: "2011-2023",
    price: 7200,
    originalPrice: 9800,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "8-Cylinder",
    displacement: "5.0L",
    power: "460 HP",
    torque: "420 lb-ft",
    image: fordEngine,
    rating: 4.8,
    reviews: 167,
    compatibility: ["Mustang GT", "F-150"],
    condition: "Refurbished",
    warranty: "12 months",
    shipping: "$180",
    inStock: true,
    stockCount: 6
  },
  {
    id: 6,
    name: "Nissan GTR Twin-Turbo V6",
    brand: "Nissan",
    model: "VR38DETT",
    year: "2008-2022",
    price: 18500,
    originalPrice: 25000,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "6-Cylinder",
    displacement: "3.8L",
    power: "565 HP",
    torque: "467 lb-ft",
    image: nissanGtrEngine,
    rating: 4.9,
    reviews: 78,
    compatibility: ["GT-R"],
    condition: "Used",
    warranty: "12 months",
    shipping: "$250",
    inStock: true,
    stockCount: 2
  },
  // Additional engines for more variety
  {
    id: 7,
    name: "Toyota Supra 2JZ-GTE",
    brand: "Toyota",
    model: "2JZ-GTE",
    year: "1993-2002",
    price: 12000,
    originalPrice: 16000,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "6-Cylinder",
    displacement: "3.0L",
    power: "320 HP",
    torque: "315 lb-ft",
    image: toyotaEngine,
    rating: 4.9,
    reviews: 245,
    compatibility: ["Supra", "Aristo"],
    condition: "Refurbished",
    warranty: "18 months",
    shipping: "$200",
    inStock: true,
    stockCount: 4
  },
  {
    id: 8,
    name: "Honda VTEC B16A",
    brand: "Honda",
    model: "B16A",
    year: "1989-2001",
    price: 4500,
    originalPrice: 6200,
    category: "Car Engine",
    type: "Gasoline",
    cylinders: "4-Cylinder",
    displacement: "1.6L",
    power: "170 HP",
    torque: "111 lb-ft",
    image: hondaBikeEngine,
    rating: 4.8,
    reviews: 189,
    compatibility: ["Civic Type R", "Integra Type R"],
    condition: "Used",
    warranty: "9 months",
    shipping: "Free",
    inStock: true,
    stockCount: 9
  }
];

export const ProductListing = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const brands = ["All", "Toyota", "BMW", "Mercedes", "Honda", "Ford", "Nissan"];
  const years = Array.from({ length: 25 }, (_, i) => 2024 - i); // 2024 to 2000
  const categories = ["All", "Car Engine", "Motorcycle Engine", "Spare Parts"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !selectedBrand || selectedBrand === "All" || product.brand === selectedBrand;
    const matchesCategory = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Year matching - check if product year range includes selected year
    const matchesYear = !selectedYear || product.year.includes(selectedYear) || 
                       (product.year.includes("-") && 
                        parseInt(selectedYear) >= parseInt(product.year.split("-")[0]) && 
                        parseInt(selectedYear) <= parseInt(product.year.split("-")[1]));

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice && matchesYear;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron'] text-gradient">
            Engine Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium engines and parts for all vehicle types
          </p>
        </div>

        {/* Search and Controls */}
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
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex border border-white/20 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger>
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
                <SelectItem value="">All Years</SelectItem>
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

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              {sortedProducts.length} results
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={25000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {sortedProducts.map((product) => (
            <Card key={product.id} className="glass-card border-white/10 overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant={product.condition === "New" ? "default" : "secondary"}>
                    {product.condition}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                {product.originalPrice > product.price && (
                  <div className="absolute bottom-3 left-3">
                    <Badge className="bg-red-500 hover:bg-red-600">
                      Save ${(product.originalPrice - product.price).toLocaleString()}
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.brand} {product.model}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">${product.price.toLocaleString()}</div>
                    {product.originalPrice > product.price && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Year:</span>
                    <span>{product.year}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Power:</span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      {product.power}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="flex items-center gap-1">
                      <Fuel className="h-3 w-3" />
                      {product.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {product.compatibility.slice(0, 3).map((comp, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {comp}
                    </Badge>
                  ))}
                  {product.compatibility.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.compatibility.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-green-400">✓ {product.shipping === "Free" ? "Free Shipping" : product.shipping}</span>
                  <span className="text-blue-400">{product.stockCount} in stock</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="flex gap-2 w-full">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  <Button variant="futuristic" size="sm" className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No engines found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </section>
  );
};