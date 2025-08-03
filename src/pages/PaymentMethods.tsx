import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote, Shield, Clock } from "lucide-react";

const PaymentMethods = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const paymentOptions = [
    {
      type: "Credit Cards",
      icon: CreditCard,
      methods: ["Visa", "Mastercard", "American Express", "Discover"],
      fees: "No additional fees",
      processing: "Instant"
    },
    {
      type: "Digital Wallets",
      icon: CreditCard,
      methods: ["PayPal", "Apple Pay", "Google Pay", "Amazon Pay"],
      fees: "No additional fees",
      processing: "Instant"
    },
    {
      type: "Bank Transfer",
      icon: Banknote,
      methods: ["ACH Transfer", "Wire Transfer"],
      fees: "Wire: $25 fee",
      processing: "1-3 business days"
    },
    {
      type: "Financing",
      icon: Clock,
      methods: ["Affirm", "Klarna", "Shop Pay Installments"],
      fees: "Interest may apply",
      processing: "Instant approval"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Payment Methods
            </h1>
            <p className="text-muted-foreground text-lg">
              Secure and flexible payment options for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {paymentOptions.map((option, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <option.icon className="h-5 w-5 text-primary" />
                    {option.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Available Methods:</h4>
                      <div className="flex flex-wrap gap-1">
                        {option.methods.map((method, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Fees:</span>
                      <span>{option.fees}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Processing:</span>
                      <span>{option.processing}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security & Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Payment Security</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• SSL encryption for all transactions</li>
                    <li>• PCI DSS compliant payment processing</li>
                    <li>• Fraud detection and prevention</li>
                    <li>• Secure tokenization of card data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Buyer Protection</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Chargeback protection</li>
                    <li>• Purchase dispute resolution</li>
                    <li>• Refund guarantee policy</li>
                    <li>• 24/7 fraud monitoring</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Financing Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Buy Now, Pay Later</h4>
                  <p className="text-muted-foreground mb-2">Split your purchase into manageable payments with our financing partners.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <h5 className="font-medium">Affirm</h5>
                      <p className="text-sm text-muted-foreground">3, 6, or 12 months</p>
                      <p className="text-sm text-muted-foreground">0-30% APR</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h5 className="font-medium">Klarna</h5>
                      <p className="text-sm text-muted-foreground">4 interest-free payments</p>
                      <p className="text-sm text-muted-foreground">Every 2 weeks</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <h5 className="font-medium">Shop Pay</h5>
                      <p className="text-sm text-muted-foreground">4 installments</p>
                      <p className="text-sm text-muted-foreground">No interest</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Payment FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">When is my card charged?</h4>
                <p className="text-muted-foreground">Your payment method is charged when your order is processed, typically within 24 hours of placing the order.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I use multiple payment methods?</h4>
                <p className="text-muted-foreground">Currently, we accept one payment method per order. Contact support for special arrangements on large orders.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is my payment information stored?</h4>
                <p className="text-muted-foreground">We use secure tokenization. Your actual card details are never stored on our servers.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What currencies do you accept?</h4>
                <p className="text-muted-foreground">All prices are in USD. International cards are accepted, but your bank may charge currency conversion fees.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentMethods;