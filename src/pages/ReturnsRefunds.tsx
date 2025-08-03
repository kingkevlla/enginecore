import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, RefreshCw } from "lucide-react";

const ReturnsRefunds = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Returns & Refunds
            </h1>
            <p className="text-muted-foreground text-lg">
              Easy returns and hassle-free refunds for your peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Return Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">30-Day Return Window</h4>
                    <p className="text-sm text-muted-foreground">Returns accepted within 30 days of delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Original Condition Required</h4>
                    <p className="text-sm text-muted-foreground">Items must be unused and in original packaging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Custom Orders</h4>
                    <p className="text-sm text-muted-foreground">Special orders cannot be returned unless defective</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Refund Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Return Processing</span>
                      <Badge variant="secondary">1-2 business days</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Quality Inspection</span>
                      <Badge variant="secondary">2-3 business days</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Refund Issued</span>
                      <Badge variant="secondary">3-5 business days</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span>Bank Processing</span>
                      <Badge variant="secondary">5-10 business days</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <Badge className="min-w-[2rem] h-8 flex items-center justify-center">1</Badge>
                  <div>
                    <h4 className="font-semibold">Contact Support</h4>
                    <p className="text-muted-foreground">Email us at support@aclassverifiedengine.com or call +1 (555) 123-4567</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Badge className="min-w-[2rem] h-8 flex items-center justify-center">2</Badge>
                  <div>
                    <h4 className="font-semibold">Receive Return Label</h4>
                    <p className="text-muted-foreground">We'll email you a prepaid return shipping label</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Badge className="min-w-[2rem] h-8 flex items-center justify-center">3</Badge>
                  <div>
                    <h4 className="font-semibold">Package & Ship</h4>
                    <p className="text-muted-foreground">Pack the item securely and attach the return label</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Badge className="min-w-[2rem] h-8 flex items-center justify-center">4</Badge>
                  <div>
                    <h4 className="font-semibold">Track Your Return</h4>
                    <p className="text-muted-foreground">We'll send you updates as we process your return</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">What if my item arrived damaged?</h4>
                <p className="text-muted-foreground">Contact us immediately with photos. We'll arrange a free return and replacement.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I exchange an item instead of returning it?</h4>
                <p className="text-muted-foreground">Yes! Contact support to arrange an exchange for a different model or size.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Who pays for return shipping?</h4>
                <p className="text-muted-foreground">We provide free return labels for defective items. Customer pays for other returns.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnsRefunds;