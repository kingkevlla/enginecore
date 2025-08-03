import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Wrench, Phone, MessageCircle, FileText, Video } from "lucide-react";

const TechnicalSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const supportServices = [
    {
      title: "Engine Compatibility Check",
      icon: Settings,
      description: "Verify if an engine will work with your vehicle",
      availability: "24/7 Online Tool"
    },
    {
      title: "Installation Guidance",
      icon: Wrench,
      description: "Step-by-step installation assistance",
      availability: "Business Hours"
    },
    {
      title: "Troubleshooting Support",
      icon: Phone,
      description: "Diagnose and resolve engine issues",
      availability: "24/7 Chat & Phone"
    },
    {
      title: "Warranty Claims",
      icon: FileText,
      description: "Process warranty and repair claims",
      availability: "Business Hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Technical Support
            </h1>
            <p className="text-muted-foreground text-lg">
              Expert technical assistance for all your engine needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {supportServices.map((service, index) => (
              <Card key={index} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <service.icon className="h-5 w-5 text-primary" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{service.description}</p>
                  <Badge variant="outline">{service.availability}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Contact Technical Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-muted-foreground text-sm mb-3">Speak with a technical expert</p>
                  <p className="font-mono text-sm">+1 (555) 123-4567</p>
                  <p className="text-xs text-muted-foreground">24/7 Available</p>
                </div>
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-muted-foreground text-sm mb-3">Instant chat with technicians</p>
                  <Button size="sm">Start Chat</Button>
                  <p className="text-xs text-muted-foreground mt-2">Average wait: 2 minutes</p>
                </div>
                <div className="text-center">
                  <Video className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Video Support</h4>
                  <p className="text-muted-foreground text-sm mb-3">Screen sharing assistance</p>
                  <Button size="sm" variant="outline">Schedule Call</Button>
                  <p className="text-xs text-muted-foreground mt-2">By appointment</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Common Technical Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Engine Won't Start</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Check fuel system connections</li>
                    <li>• Verify electrical connections</li>
                    <li>• Inspect starter motor operation</li>
                    <li>• Test ignition system components</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Poor Performance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Check air filter condition</li>
                    <li>• Inspect fuel injectors</li>
                    <li>• Verify timing settings</li>
                    <li>• Test compression levels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Unusual Noises</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Check oil level and pressure</li>
                    <li>• Inspect belts and pulleys</li>
                    <li>• Examine exhaust system</li>
                    <li>• Test bearing conditions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Resources & Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Installation Guides</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-primary hover:underline">V6 Engine Installation Manual</a></li>
                    <li><a href="#" className="text-primary hover:underline">V8 Engine Setup Guide</a></li>
                    <li><a href="#" className="text-primary hover:underline">4-Cylinder Engine Instructions</a></li>
                    <li><a href="#" className="text-primary hover:underline">Motorcycle Engine Installation</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Video Tutorials</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-primary hover:underline">Engine Removal Process</a></li>
                    <li><a href="#" className="text-primary hover:underline">Wiring Harness Connection</a></li>
                    <li><a href="#" className="text-primary hover:underline">First Startup Procedure</a></li>
                    <li><a href="#" className="text-primary hover:underline">Troubleshooting Common Issues</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TechnicalSupport;