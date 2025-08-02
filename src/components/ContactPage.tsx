import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Showroom",
      details: ["1247 Engine Boulevard", "Detroit, MI 48201", "United States"],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Toll-free: 1-800-ENGINE"],
      color: "text-accent"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["sales@enginecore.com", "support@enginecore.com", "info@enginecore.com"],
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM", "Sunday: Closed"],
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-['Orbitron'] text-gradient mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions about our engines or need expert advice? Our team is here to help. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold font-['Orbitron'] mb-6">Contact Information</h2>
            
            {contactInfo.map((info, index) => (
              <Card key={index} className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-muted/20 ${info.color}`}>
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-['Orbitron'] mb-2">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground mb-1">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <Card className="glass-card border-primary/20 hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Live Chat Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get instant help from our AI assistant or connect with a human expert.
                  </p>
                  <Button variant="futuristic" size="sm" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-card border-accent/20 hover-glow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Emergency Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need urgent assistance? Our emergency line is available 24/7.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl font-['Orbitron'] flex items-center gap-2">
                  <Send className="h-6 w-6 text-primary" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        className="mt-1"
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        className="mt-1"
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        className="mt-1"
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+1 (555) 123-4567" 
                        className="mt-1" 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sales">Sales Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="warranty">Warranty Claim</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="vehicle">Vehicle Information (Optional)</Label>
                      <Input 
                        id="vehicle" 
                        placeholder="e.g., 2018 Honda Civic" 
                        className="mt-1" 
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      placeholder="Brief description of your inquiry" 
                      className="mt-1"
                      required 
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide as much detail as possible about your inquiry..."
                      className="mt-1 min-h-[120px]"
                      required 
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="privacy" className="mt-1" required />
                    <Label htmlFor="privacy" className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <span className="text-primary hover:underline cursor-pointer">
                        Privacy Policy
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline cursor-pointer">
                        Terms of Service
                      </span>
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    variant="futuristic" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="glass-card border-white/10">
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-tech rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold font-['Orbitron'] mb-2">Find Our Location</h3>
                  <p className="text-muted-foreground">Interactive map will be loaded here</p>
                  <Button variant="outline" className="mt-4">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};