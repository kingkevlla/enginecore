import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Json } from "@/integrations/supabase/types";
import { ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentGateway } from "./PaymentGateway";

interface Product {
  id: string;
  name: string;
  short_description: string | null;
  description: string | null;
  price: number;
  compare_price: number | null;
  images: Json | null;
  brand: string | null;
  stock_quantity: number | null;
  specifications: Json | null;
}

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const { toast } = useToast();
  const [showPayment, setShowPayment] = useState(false);

  if (!product) return null;

  const getImageUrls = (images: Json | null): string[] => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return ["/placeholder.svg"];
    }
    return images.map((img: any) => img?.url || "/placeholder.svg");
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleBuyNow = () => {
    if (product && (product.stock_quantity || 0) > 0) {
      setShowPayment(true);
    } else {
      toast({
        title: "Out of Stock",
        description: `${product?.name} is currently out of stock.`,
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: "Payment Successful!",
      description: `Your order has been processed. Payment ID: ${paymentId}`,
    });
    setShowPayment(false);
    onClose();
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const imageUrls = getImageUrls(product.images);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="space-y-4">
            <Carousel className="w-full">
              <CarouselContent>
                {imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={url}
                        alt={`${product.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {imageUrls.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {product.brand && (
              <Badge variant="outline" className="text-sm">
                {product.brand}
              </Badge>
            )}

            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toLocaleString()}
                </span>
                {product.compare_price && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.compare_price.toLocaleString()}
                  </span>
                )}
              </div>

              {product.stock_quantity !== null && (
                <div className="mb-4">
                  <Badge 
                    variant={product.stock_quantity > 0 ? "default" : "destructive"}
                  >
                    {product.stock_quantity > 0 
                      ? `${product.stock_quantity} in stock` 
                      : "Out of stock"
                    }
                  </Badge>
                </div>
              )}
            </div>

            {product.short_description && (
              <p className="text-lg text-muted-foreground">
                {product.short_description}
              </p>
            )}

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && typeof product.specifications === 'object' && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Specifications</h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1 border-b border-border">
                      <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleBuyNow}
                className="flex-1"
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              <Button 
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={handleAddToWishlist}
                className="px-4"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* Payment Gateway */}
            {showPayment && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Complete Your Purchase</h3>
                <PaymentGateway
                  amount={product.price}
                  description={product.name}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
                <Button
                  variant="ghost"
                  onClick={() => setShowPayment(false)}
                  className="w-full mt-4"
                >
                  Cancel Payment
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};