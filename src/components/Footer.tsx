import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, CreditCard, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import engineLogo from "@/assets/engine-logo.png";

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
              <div className="flex items-center space-x-3">
                <img 
                  src={engineLogo} 
                  alt="A class Verified Engine Logo" 
                  className="w-12 h-12 object-contain"
                />
                <h3 className="text-2xl font-bold font-['Orbitron'] text-gradient">
                  A class Verified Engine
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
                  <span>support@aclassverifiedengine.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-['Orbitron']">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "All Engines", href: "/products" },
                  { label: "Used Engines", href: "/used-engines" }, 
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Checkout", href: "/checkout" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-['Orbitron']">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", href: "/help-center" },
                  { label: "Contact Support", href: "/contact" },
                  { label: "Returns & Refunds", href: "/returns-refunds" },
                  { label: "Shipping Info", href: "/shipping-info" },
                  { label: "Payment Methods", href: "/payment-methods" },
                  { label: "Technical Support", href: "/technical-support" },
                  { label: "Live Chat", href: "/live-chat" },
                  { label: "FAQs", href: "/faqs" }
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
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
              © {currentYear} A class Verified Engine. All rights reserved. | 
              <Link to="/about" className="hover:text-primary ml-1">Privacy Policy</Link> | 
              <Link to="/contact" className="hover:text-primary ml-1">Terms of Service</Link>
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