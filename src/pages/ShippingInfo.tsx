import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const ShippingInfo = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const shippingMethods = [
    {
      name: "Standard Shipping",
      time: "5-7 business days",
      cost: "$15.99",
      description: "Reliable ground shipping"
    },
    {
      name: "Express Shipping",
      time: "2-3 business days", 
      cost: "$29.99",
      description: "Faster delivery option"
    },
    {
      name: "Overnight",
      time: "1 business day",
      cost: "$59.99",
      description: "Next business day delivery"
    },
    {
      name: "Freight Shipping",
      time: "7-14 business days",
      cost: "Calculated",
      description: "For heavy engines and large orders"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Shipping Information
            </h1>
            <p className="text-muted-foreground text-lg">
              Fast, secure shipping for all your automotive needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {shippingMethods.map((method, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      {method.name}
                    </span>
                    <Badge variant="outline">{method.cost}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{method.time}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{method.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Shipping Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Domestic (USA)</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All 50 states</li>
                    <li>• Alaska & Hawaii (additional fees)</li>
                    <li>• Free shipping on orders $500+</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Canada</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All provinces</li>
                    <li>• Duties & taxes may apply</li>
                    <li>• Extended delivery times</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">International</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contact for quote</li>
                    <li>• Custom clearance required</li>
                    <li>• Customer pays duties</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Packaging & Handling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Secure Packaging</h4>
                <p className="text-muted-foreground">All engines are professionally packaged with protective materials and custom crating for heavy items.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Processing Time</h4>
                <p className="text-muted-foreground">Orders are processed within 1-2 business days. Custom orders may require additional time.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tracking Information</h4>
                <p className="text-muted-foreground">You'll receive tracking details via email once your order ships. Track your package in real-time.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Shipping FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Can I change my shipping address after ordering?</h4>
                <p className="text-muted-foreground">Contact us immediately if you need to change the address. Changes may not be possible once the item ships.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What if I'm not home for delivery?</h4>
                <p className="text-muted-foreground">The carrier will attempt delivery and leave a notice. You can schedule redelivery or pick up at a local facility.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you ship to PO Boxes?</h4>
                <p className="text-muted-foreground">Small parts only. Engines and heavy items require a physical address for freight delivery.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What about damaged packages?</h4>
                <p className="text-muted-foreground">Inspect your package upon delivery. Report any damage to the carrier and contact us immediately.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingInfo;