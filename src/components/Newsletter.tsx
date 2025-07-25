import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive the latest engine updates and exclusive offers.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Content */}
          <div className="glass-card p-12 rounded-3xl border border-white/20">
            <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Mail className="h-10 w-10 text-primary-foreground" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Orbitron'] text-gradient">
              Stay Engine-Powered
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get exclusive access to new engine arrivals, AI-powered recommendations, 
              and expert automotive insights delivered directly to your inbox.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 bg-background/50 border-white/20 text-lg placeholder:text-muted-foreground"
                  required
                />
                <Button
                  type="submit"
                  variant="futuristic"
                  size="lg"
                  className="h-14 px-8 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">🚀</span>
                </div>
                <h4 className="font-semibold mb-2">Early Access</h4>
                <p className="text-sm text-muted-foreground">Be first to see new engine releases</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">💰</span>
                </div>
                <h4 className="font-semibold mb-2">Exclusive Deals</h4>
                <p className="text-sm text-muted-foreground">Member-only discounts and offers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">🧠</span>
                </div>
                <h4 className="font-semibold mb-2">AI Insights</h4>
                <p className="text-sm text-muted-foreground">Personalized engine recommendations</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};