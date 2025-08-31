import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface Product {
  id: string;
  name: string;
  short_description: string | null;
  price: number;
  images: Json | null;
  brand: string | null;
}

export const ImageCardsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, short_description, price, images, brand')
          .eq('is_featured', true)
          .eq('is_active', true)
          .limit(6);

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const getImageUrl = (images: Json | null) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return "/placeholder.svg";
    }
    const firstImage = images[0] as { url?: string };
    return firstImage?.url || "/placeholder.svg";
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our premium collection of automotive engines and components
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card rounded-xl h-80 shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">Featured Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our premium collection of automotive engines and components
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Background */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  {/* Brand Badge */}
                  {product.brand && (
                    <div className="mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      <span className="inline-block px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-sm font-medium border border-accent/30">
                        {product.brand}
                      </span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  {product.short_description && (
                    <p className="text-sm text-gray-200 mb-4 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200 opacity-0 group-hover:opacity-100">
                      {product.short_description}
                    </p>
                  )}
                  
                  {/* Price */}
                  <div className="flex items-center justify-between transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-250">
                    <span className="text-2xl font-bold text-accent">
                      ${product.price.toLocaleString()}
                    </span>
                    
                    {/* Call to Action */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button className="group px-8 py-4 bg-card border border-border rounded-xl font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            <span className="mr-2">View All Products</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};