import { useState } from "react";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PaymentGateway } from "@/components/PaymentGateway";
import { useToast } from "@/hooks/use-toast";

export const Checkout = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: "Toyota 4-Cylinder DOHC Engine",
      model: "2AZ-FE",
      price: 3500,
      quantity: 1,
      shipping: "Free"
    },
    {
      id: 2,
      name: "BMW TwinPower V6 Engine",
      model: "N55B30",
      price: 8500,
      quantity: 1,
      shipping: "$150"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingTotal = 150; // Only BMW engine has shipping cost
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shippingTotal + tax;

  const steps = [
    { id: 1, title: "Shipping", icon: Truck },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Review", icon: Check }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold font-['Orbitron'] text-gradient">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                currentStep >= step.id 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "border-muted-foreground text-muted-foreground"
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-medium">
                {step.title}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 ml-6 transition-all duration-300 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-['Orbitron']">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main Street" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" className="mt-1" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="saveAddress" />
                    <Label htmlFor="saveAddress" className="text-sm">
                      Save this address for future orders
                    </Label>
                  </div>

                  <Button 
                    onClick={() => setCurrentStep(2)} 
                    className="w-full" 
                    variant="futuristic"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-['Orbitron']">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "card" ? "border-primary bg-primary/10" : "border-white/20"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit Card</span>
                        </div>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "paypal" ? "border-primary bg-primary/10" : "border-white/20"
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-600 rounded"></div>
                          <span>PayPal</span>
                        </div>
                      </div>
                      <div 
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "crypto" ? "border-primary bg-primary/10" : "border-white/20"
                        }`}
                        onClick={() => setPaymentMethod("crypto")}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-orange-500 rounded"></div>
                          <span>Crypto</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          className="mt-1" 
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" className="mt-1" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="savePayment" />
                    <Label htmlFor="savePayment" className="text-sm">
                      Save payment method for future purchases
                    </Label>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => setCurrentStep(1)} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)} 
                      className="flex-1" 
                      variant="futuristic"
                    >
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review & Payment */}
            {currentStep === 3 && (
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-['Orbitron']">
                    <Check className="h-5 w-5" />
                    Review & Complete Payment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.model}</p>
                          <p className="text-sm text-green-400">Shipping: {item.shipping}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${item.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-2 text-green-400">
                      <Shield className="h-5 w-5" />
                      <span className="text-sm">Your order is protected by our guarantee</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Gateway Integration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Complete Your Payment</h3>
                    <PaymentGateway
                      amount={total}
                      description={`Order for ${cartItems.length} item(s)`}
                      onSuccess={(paymentId) => {
                        toast({
                          title: "Payment Successful!",
                          description: `Your order has been placed. Payment ID: ${paymentId}`,
                        });
                        // Navigate to success page
                        window.location.href = `/payment-success?payment_id=${paymentId}`;
                      }}
                      onError={(error) => {
                        toast({
                          title: "Payment Failed",
                          description: error,
                          variant: "destructive",
                        });
                      }}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => setCurrentStep(2)} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Back to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card border-white/10 sticky top-8">
              <CardHeader>
                <CardTitle className="font-['Orbitron']">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${item.price.toLocaleString()}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shippingTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${total.toLocaleString()}</span>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  * Estimated delivery: 3-7 business days
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};