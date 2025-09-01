import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentGateway } from "./PaymentGateway";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
}

interface QuickBuyModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickBuyModal = ({ product, isOpen, onClose }: QuickBuyModalProps) => {
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [showPayment, setShowPayment] = useState(false);

  if (!product) return null;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    toast({
      title: "Payment Successful!",
      description: `Your order has been processed. Payment ID: ${paymentId}`,
    });
    onClose();
    // Navigate to success page
    window.location.href = `/payment-success?payment_id=${paymentId}`;
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Buy - {product.name}</DialogTitle>
        </DialogHeader>

        {!showPayment ? (
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={customerInfo.firstName}
                  onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={customerInfo.lastName}
                  onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              />
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="font-semibold text-lg">${product.price.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total (including $150 shipping & tax)</p>
            </div>

            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-2xl font-bold text-primary">${product.price.toLocaleString()}</p>
            </div>
            
            <PaymentGateway
              amount={product.price + 150} // Add shipping
              description={`${product.name} - Quick Purchase`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            
            <Button 
              variant="outline" 
              onClick={() => setShowPayment(false)}
              className="w-full"
            >
              Back to Details
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};