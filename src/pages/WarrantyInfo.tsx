import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, CheckCircle, Phone, FileText, Calendar } from "lucide-react";

const WarrantyInfo = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const warrantyTypes = [
    {
      name: "Brand New Engines",
      period: "12-36 Months",
      coverage: "Manufacturer Full",
      description: "Complete manufacturer warranty with parts and labor coverage",
      color: "bg-green-500"
    },
    {
      name: "Rebuilt Engines", 
      period: "12-24 Months",
      coverage: "Comprehensive",
      description: "Professional rebuild warranty covering major components",
      color: "bg-blue-500"
    },
    {
      name: "Used Engines",
      period: "90 Days",
      coverage: "Limited",
      description: "Coverage for major internal components and functionality",
      color: "bg-yellow-500"
    },
    {
      name: "Extended Warranty",
      period: "Up to 5 Years",
      coverage: "Premium Plus",
      description: "Optional extended coverage with roadside assistance",
      color: "bg-purple-500"
    }
  ];

  const coverageDetails = [
    "Engine block and internal components",
    "Cylinder heads and valvetrain",
    "Pistons, rings, and connecting rods",
    "Crankshaft and bearings",
    "Oil pump and timing components",
    "Gaskets and seals (major)"
  ];

  const exclusions = [
    "Normal wear and tear items",
    "Fluids and filters",
    "Damage from improper installation", 
    "Modifications or alterations",
    "Damage from overheating or lack of maintenance",
    "External accessories and sensors"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Premier Warranties
            </h1>
            <p className="text-muted-foreground text-lg">
              Comprehensive warranty protection for your peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {warrantyTypes.map((warranty, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      {warranty.name}
                    </span>
                    <Badge variant="outline" className={`text-white ${warranty.color}`}>
                      {warranty.period}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{warranty.coverage} Coverage</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{warranty.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  What's Covered
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {coverageDetails.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <FileText className="h-5 w-5" />
                  Exclusions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-4 w-4 mt-0.5 flex-shrink-0 rounded-full bg-red-500/20 flex items-center justify-center">
                        <div className="h-1.5 w-1.5 bg-red-500 rounded-full" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Warranty Claims Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Contact Support</h4>
                  <p className="text-sm text-muted-foreground">Call our warranty department at 719-630-3236 or submit a claim online</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Documentation</h4>
                  <p className="text-sm text-muted-foreground">Provide purchase receipt, installation details, and failure description</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Resolution</h4>
                  <p className="text-sm text-muted-foreground">Receive replacement, repair authorization, or refund per warranty terms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Important Warranty Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Registration Required</h4>
                <p className="text-muted-foreground">Warranties must be registered within 30 days of purchase with proof of professional installation.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Professional Installation</h4>
                <p className="text-muted-foreground">Installation must be performed by a certified mechanic. DIY installation may void warranty.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Maintenance Requirements</h4>
                <p className="text-muted-foreground">Regular maintenance per manufacturer specifications required. Keep all service records.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Transferable Coverage</h4>
                <p className="text-muted-foreground">Warranties are transferable to subsequent owners with proper documentation and transfer fee.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Warranty FAQs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How do I register my warranty?</h4>
                <p className="text-muted-foreground">Complete the warranty registration card included with your engine or register online within 30 days of purchase.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What if I need warranty service away from home?</h4>
                <p className="text-muted-foreground">Our warranty is honored at authorized service centers nationwide. Contact us for nearest location.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Are labor costs covered?</h4>
                <p className="text-muted-foreground">Yes, reasonable labor costs are covered for warranty repairs at authorized facilities.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I extend my warranty?</h4>
                <p className="text-muted-foreground">Extended warranty options are available for purchase before your original warranty expires.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WarrantyInfo;