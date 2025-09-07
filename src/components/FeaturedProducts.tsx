import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";

interface FeaturedProductsProps {
  onShowAllProducts?: () => void;
}

export const FeaturedProducts = ({ onShowAllProducts }: FeaturedProductsProps) => {
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: parseFloat(product.price.replace('$', '').replace(',', '')),
      image: product.image || '/placeholder.svg',
      category: product.category || 'Featured Product'
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId.toString());
  };

  const handleViewProduct = (productName: string) => {
    toast({
      title: "Product Details",
      description: `Viewing details for ${productName}`,
    });
  };

  const products = [
    {
      id: 1,
      name: "BMW B58 3.0L Turbo Engine",
      category: "Car Engine",
      price: "$8,500",
      originalPrice: "$9,200",
      rating: 4.9,
      reviews: 127,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
      compatibility: "BMW X3, X4, Z4, 340i",
      specs: "340 HP • Turbo • Gasoline"
    },
    {
      id: 2,
      name: "Honda CBR1000RR Engine",
      category: "Motorcycle Engine",
      price: "$4,200",
      originalPrice: "$4,800",
      rating: 4.8,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      compatibility: "CBR1000RR, CBR1000RR-R",
      specs: "215 HP • 1000cc • 4-Cylinder"
    },
    {
      id: 3,
      name: "Mercedes AMG M177 V8 Engine",
      category: "Car Engine",
      price: "$15,500",
      originalPrice: "$17,000",
      rating: 5.0,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop",
      compatibility: "AMG GT, C63, E63, S63",
      specs: "630 HP • Twin-Turbo • V8"
    },
    {
      id: 4,
      name: "Kawasaki Ninja H2 Engine",
      category: "Motorcycle Engine",
      price: "$6,800",
      originalPrice: "$7,500",
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1585159812596-9644167984b4?w=400&h=300&fit=crop",
      compatibility: "Ninja H2, H2R, H2 SX",
      specs: "310 HP • Supercharged • 998cc"
    }
  ];

  return (
    <section className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron'] text-gradient">
            Featured Engines
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hand-picked premium engines with verified performance and quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                    variant={isInCart(product.id) ? "secondary" : "futuristic"}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Sale
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-primary font-semibold">{product.category}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 font-['Orbitron'] group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3">{product.compatibility}</p>
                
                <p className="text-sm text-muted-foreground mb-4">{product.specs}</p>

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
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                  </div>
                </div>

                {/* Add to Cart */}
                <Button 
                  variant={isInCart(product.id) ? "secondary" : "futuristic"} 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  {isInCart(product.id) ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="tech" 
            size="lg" 
            onClick={() => navigate('/products')}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};