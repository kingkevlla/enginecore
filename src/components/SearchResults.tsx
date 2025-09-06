import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  power: string;
  displacement: string;
  compatibility: string[];
  condition: string;
  inStock: boolean;
  stockCount: number;
}

interface SearchResultsProps {
  products: Product[];
  onClose: () => void;
}

export const SearchResults = ({ products, onClose }: SearchResultsProps) => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const handleAddToCart = (product: any) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: typeof product.price === 'number' ? product.price : parseFloat(product.price.toString().replace('$', '').replace(',', '')),
      image: product.image || '/placeholder.svg',
      category: 'Search Result'
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleViewProduct = (productName: string) => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${productName}`,
    });
  };
  
  if (products.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold font-['Orbitron'] text-gradient">
            Search Results ({products.length})
          </h2>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group glass-card border-white/10 overflow-hidden hover-glow">
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    variant="glass" 
                    className="backdrop-blur-md"
                    onClick={() => handleViewProduct(product.name)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="futuristic"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Condition Badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant={product.condition === "New" ? "default" : "secondary"}>
                    {product.condition}
                  </Badge>
                </div>

                {/* Stock Status */}
                <div className="absolute top-4 right-4">
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary font-semibold">{product.category}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 font-['Orbitron'] group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-2">{product.year}</p>
                <p className="text-sm text-muted-foreground mb-3">{product.compatibility.join(", ")}</p>
                <p className="text-sm text-muted-foreground mb-4">{product.power} • {product.displacement}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button 
                  variant="futuristic" 
                  size="sm" 
                  className="w-full" 
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};