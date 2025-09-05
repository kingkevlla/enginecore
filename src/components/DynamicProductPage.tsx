import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { QuickBuyModal } from "@/components/QuickBuyModal";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";
import { useCart } from "@/hooks/useCart";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, ShoppingCart, Calendar, Gauge, Fuel, Settings, Heart, Zap, Eye } from "lucide-react";

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
  images: any;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
}

interface DynamicProductPageProps {
  categorySlug: string;
  title: string;
  description: string;
  features?: Array<{
    icon: React.ComponentType<any>;
    title: string;
    description: string;
  }>;
}

export const DynamicProductPage = ({ 
  categorySlug, 
  title, 
  description, 
  features 
}: DynamicProductPageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategoryAndProducts();
  }, [categorySlug]);

  const fetchCategoryAndProducts = async () => {
    try {
      let productsData;
      let categoryData = null;

      // Handle "all-products" specially to show all products
      if (categorySlug === 'all-products') {
        // Fetch all active products when categorySlug is "all-products"
        const { data, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;
        productsData = data;

        // Set a virtual category for "all-products"
        categoryData = {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'All Products',
          description: 'Complete selection of all automotive engines, parts, and accessories',
          slug: 'all-products'
        };
      } else {
        // First fetch the category by slug
        const { data: catData, error: categoryError } = await supabase
          .from('categories')
          .select('*')
          .eq('slug', categorySlug)
          .eq('is_active', true)
          .single();

        if (categoryError) throw categoryError;
        categoryData = catData;
        
        // Then fetch products for this specific category
        const { data, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', categoryData.id)
          .eq('is_active', true)
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;
        productsData = data;
      }

      setCategory(categoryData);

      // Transform the data to ensure images is always an array
      const transformedProducts = (productsData || []).map(product => ({
        ...product,
        images: Array.isArray(product.images) ? product.images : (product.images ? [product.images] : [])
      }));

      setProducts(transformedProducts);
      console.log('Loaded products:', transformedProducts.length, 'for category:', categorySlug);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    if ((product.stock_quantity || 0) <= 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: Array.isArray(product.images) ? product.images[0] : product.images,
      category: category?.name,
      productId: product.id
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: Product) => {
    if ((product.stock_quantity || 0) <= 0) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedProduct(product);
    setShowQuickBuy(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleAddToWishlist = (productName: string) => {
    toast({
      title: "Added to Wishlist",
      description: `${productName} has been added to your wishlist.`,
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-['Orbitron'] text-gradient">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {description}
            </p>
            {features && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span>{feature.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Stats */}
          <div className="mb-8 text-center">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
              {category && ` in ${category.name}`}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const productImages = Array.isArray(product.images) ? product.images : [product.images];
              
              return (
                <Card key={product.id} className="group glass-card border-white/10 overflow-hidden hover-glow hover-scale">
                  <div className="relative">
                    {/* Image Carousel */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {productImages.length > 1 ? (
                        <Carousel className="w-full h-full">
                          <CarouselContent>
                            {productImages.map((image, index) => (
                              <CarouselItem key={index}>
                                <div 
                                  className="relative h-48 cursor-pointer"
                                  onClick={() => handleViewDetails(product)}
                                >
                                  <img
                                    src={image || "/placeholder.svg"}
                                    alt={`${product.name} - Image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    onError={(e) => {
                                      e.currentTarget.src = "/placeholder.svg";
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                    <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {productImages.length > 1 && (
                            <>
                              <CarouselPrevious className="left-2" />
                              <CarouselNext className="right-2" />
                            </>
                          )}
                        </Carousel>
                      ) : (
                        <div 
                          className="relative h-48 cursor-pointer"
                          onClick={() => handleViewDetails(product)}
                        >
                          <img
                            src={productImages[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <Eye className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-accent/90 text-accent-foreground">
                        {product.brand}
                      </Badge>
                      <Badge variant={product.condition === "new" ? "default" : 
                                    product.condition === "refurbished" ? "secondary" : "outline"}>
                        {product.condition}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 bg-background/80"
                        onClick={() => handleAddToWishlist(product.name)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {product.model}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">4.8</span>
                        <span className="text-xs text-muted-foreground">(156)</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-sm mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {product.short_description || product.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Gauge className="h-3 w-3 text-primary" />
                        <span>{product.engine_type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-muted-foreground" />
                        <span>{product.displacement}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-primary">
                          ${product.price.toLocaleString()}
                        </div>
                        {product.compare_price && (
                          <div className="text-xs text-muted-foreground line-through">
                            ${product.compare_price.toLocaleString()}
                          </div>
                        )}
                      </div>
                      <Badge variant={(product.stock_quantity || 0) > 0 ? "default" : "destructive"} className="text-xs">
                        {(product.stock_quantity || 0) > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(product)}
                        className="text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddToCart(product)}
                        disabled={(product.stock_quantity || 0) <= 0}
                        className="text-xs"
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Cart
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleBuyNow(product)}
                        disabled={(product.stock_quantity || 0) <= 0}
                        className="text-xs"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No products found in this category.
              </p>
            </div>
          )}

          {/* Info Section */}
          {features && (
            <div className="mt-16 glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-4 font-['Orbitron'] text-center">
                Why Choose Our {title}?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <AIChatAssistant />
      
      {/* Quick Buy Modal */}
      {selectedProduct && showQuickBuy && (
        <QuickBuyModal
          isOpen={showQuickBuy}
          onClose={() => {
            setShowQuickBuy(false);
            setSelectedProduct(null);
          }}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: Array.isArray(selectedProduct.images) ? selectedProduct.images[0] : selectedProduct.images
          }}
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && showProductDetails && (
        <ProductDetailsModal
          isOpen={showProductDetails}
          onClose={() => {
            setShowProductDetails(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
};