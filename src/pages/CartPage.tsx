import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShoppingCartSidebar } from "@/components/ShoppingCartSidebar";
import { useCart } from "@/hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const shipping = 150;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    });
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

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 font-['Orbitron'] text-gradient">
            Shopping Cart ({getTotalItems()} items)
          </h1>

          {cartItems.length === 0 ? (
            <Card className="glass-card border-white/10 text-center py-12">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                  Add some engines and parts to get started!
                </p>
                <Button onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="glass-card border-white/10">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                          <p className="text-muted-foreground mb-4">{item.category}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-12 text-center font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                ${(item.price * item.quantity).toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ${item.price.toLocaleString()} each
                              </p>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="glass-card border-white/10 sticky top-8">
                  <CardHeader>
                    <CardTitle className="font-['Orbitron']">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={handleProceedToCheckout}
                      className="w-full"
                      size="lg"
                      variant="futuristic"
                    >
                      Proceed to Checkout
                    </Button>

                    <Button 
                      onClick={() => navigate('/products')}
                      variant="outline"
                      className="w-full"
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;