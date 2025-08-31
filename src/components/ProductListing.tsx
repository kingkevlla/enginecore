import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, Grid, List, Heart, ShoppingCart, Star, Zap, Fuel, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";

// Default image fallback
const defaultImage = "/placeholder.svg";

interface Product {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_price: number | null;
  brand: string | null;
  model: string | null;
  engine_type: string | null;
  displacement: string | null;
  fuel_type: string | null;
  condition: string | null;
  stock_quantity: number | null;
  is_active: boolean | null;
  is_featured: boolean | null;
  images: any;
  created_at: string;
}

export const ProductListing = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from Supabase
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure images is always an array
      const transformedProducts = (data || []).map(product => ({
        ...product,
        images: Array.isArray(product.images) ? product.images : (product.images ? [product.images] : [])
      }));
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Extract unique values from products for filters
  const brands = ["All", ...Array.from(new Set(products.map(p => p.brand).filter(Boolean)))];
  const years = Array.from({ length: 25 }, (_, i) => 2024 - i);
  const categories = ["All", "Car Engine", "Motorcycle Engine", "Spare Parts"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.model?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBrand = !selectedBrand || selectedBrand === "All" || product.brand === selectedBrand;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesBrand && matchesPrice;
  });

  const handleAddToCart = (productName: string, stockQuantity: number | null) => {
    if ((stockQuantity || 0) <= 0) {
      toast({
        title: "Out of Stock",
        description: `${productName} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (productName: string) => {
    toast({
      title: "Added to Wishlist",
      description: `${productName} has been added to your wishlist.`,
    });
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "newest": return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default: return 0;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron'] text-gradient">
            Engine Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Premium engines and parts for all vehicle types
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

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
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
                  src={(Array.isArray(product.images) ? product.images[0] : product.images) || defaultImage}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = defaultImage;
                  }}
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
                    <span className="text-xs">4.8</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{product.model}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-3 w-3 text-primary" />
                  <span className="text-xs">{product.engine_type}</span>
                  <Fuel className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{product.displacement}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-primary">${product.price.toLocaleString()}</span>
                    {product.compare_price && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        ${product.compare_price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Badge variant={(product.stock_quantity || 0) > 0 ? "default" : "destructive"} className="text-xs">
                    {(product.stock_quantity || 0) > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                  </Badge>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleAddToCart(product.name, product.stock_quantity || 0)}
                  disabled={(product.stock_quantity || 0) <= 0}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleAddToWishlist(product.name)}
                >
                  <Heart className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};