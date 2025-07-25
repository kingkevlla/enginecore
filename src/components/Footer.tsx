import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, CreditCard, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-muted/20 to-background border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl font-['Orbitron']">E</span>
                </div>
                <h3 className="text-2xl font-bold font-['Orbitron'] text-gradient">
                  EngineCore
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                The future of automotive commerce. AI-powered engine marketplace 
                connecting enthusiasts with premium automotive components worldwide.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>1234 Tech Drive, San Francisco, CA 94107</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@enginecore.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-['Orbitron']">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "Car Engines",
                  "Motorcycle Engines", 
                  "Spare Parts",
                  "AI Engine Finder",
                  "Compatibility Checker",
                  "Installation Services",
                  "Warranty Info",
                  "Track Order"
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-['Orbitron']">Support</h4>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Contact Support",
                  "Returns & Refunds",
                  "Shipping Info",
                  "Payment Methods",
                  "Technical Support",
                  "Live Chat",
                  "FAQs"
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust & Security */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-['Orbitron']">Trust & Security</h4>
              
              {/* Trust Badges */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard className="h-5 w-5 text-blue-400" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-purple-400" />
                  <span>Global Shipping</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Headphones className="h-5 w-5 text-orange-400" />
                  <span>24/7 Support</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="font-semibold mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Twitter, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Youtube, href: "#" }
                  ].map(({ icon: Icon, href }, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-primary/20 hover:text-primary"
                      asChild
                    >
                      <a href={href}>
                        <Icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} EngineCore. All rights reserved. | 
              <a href="#" className="hover:text-primary ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-primary ml-1">Terms of Service</a>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-muted-foreground">
                Powered by AI Technology
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};