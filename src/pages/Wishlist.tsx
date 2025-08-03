import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { Heart, Trash2, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Wishlist() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock wishlist data
  const wishlistItems = [
    {
      id: 1,
      name: "Toyota 2JZ-GTE Twin Turbo Engine",
      price: "$8,500",
      originalPrice: "$12,000",
      image: "/src/assets/toyota-4cyl-engine.jpg",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      discount: "30% OFF"
    },
    {
      id: 2,
      name: "BMW S54 3.2L Inline-6 Engine",
      price: "$6,200",
      originalPrice: "$8,500",
      image: "/src/assets/bmw-v6-engine.jpg",
      rating: 4.9,
      reviews: 89,
      inStock: true,
      discount: "27% OFF"
    },
    {
      id: 3,
      name: "Honda K20A Type-R Engine",
      price: "$4,800",
      originalPrice: "$6,200",
      image: "/src/assets/honda-bike-engine.jpg",
      rating: 4.7,
      reviews: 203,
      inStock: false,
      discount: "23% OFF"
    }
  ];

  const removeFromWishlist = (id: number) => {
    // Handle remove from wishlist
    console.log(`Remove item ${id} from wishlist`);
  };

  const addToCart = (id: number) => {
    // Handle add to cart
    console.log(`Add item ${id} to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Favorites</h1>
          <p className="text-muted-foreground">
            {wishlistItems.length} items in your wishlist
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">Start adding engines you love to keep track of them</p>
            <Button asChild>
              <a href="/products">Browse Engines</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {item.discount && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        {item.discount}
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>

                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(item.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.rating} ({item.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">{item.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {item.originalPrice}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={item.inStock ? "default" : "secondary"}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!item.inStock}
                      onClick={() => addToCart(item.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.inStock ? "Add to Cart" : "Notify When Available"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}