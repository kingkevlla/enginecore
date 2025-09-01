import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";

export const ShoppingCartSidebar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  const removeItem = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    removeFromCart(id);
    
    if (item) {
      toast({
        title: "Item Removed",
        description: `${item.name} has been removed from your cart.`,
      });
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/checkout');
  };

  const subtotal = getTotalPrice();
  const shipping = 150; // $150 shipping
  const total = subtotal + shipping;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="glass-card border-l border-white/10 w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="font-['Orbitron'] text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some engines to get started!</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto space-y-4 my-6">
              {cartItems.map((item) => (
                <div key={item.id} className="glass-card p-4 rounded-lg">
                  <div className="flex gap-4">
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{item.category || 'Engine Part'}</p>
                      <p className="text-primary font-bold">${item.price.toLocaleString()}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="font-bold">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-4">
                <span>Total</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
              
              <Button 
                variant="futuristic" 
                size="lg" 
                className="w-full"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};