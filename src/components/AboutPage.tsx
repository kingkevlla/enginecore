import { Users, Award, Shield, Wrench, Target, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AboutPage = () => {
  const stats = [
    { label: "Years of Experience", value: "25+", icon: Award },
    { label: "Engines Sold", value: "50,000+", icon: Wrench },
    { label: "Happy Customers", value: "15,000+", icon: Heart },
    { label: "Expert Technicians", value: "100+", icon: Users }
  ];

  const values = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every engine undergoes rigorous testing and inspection before delivery."
    },
    {
      icon: Target,
      title: "Precision Engineering",
      description: "We source only the highest quality engines from trusted manufacturers."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority with dedicated support and warranties."
    }
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-['Orbitron'] text-gradient mb-6">
            About EngineCore
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            For over two decades, EngineCore has been the leading provider of premium automotive engines, 
            serving mechanics, dealerships, and car enthusiasts worldwide with unmatched quality and expertise.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-white/10 text-center hover-glow">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold font-['Orbitron'] text-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold font-['Orbitron'] mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 1999 by automotive engineer Marcus Thompson, EngineCore began as a small 
                workshop specializing in engine rebuilds. Today, we've grown into a global leader 
                in engine distribution and remanufacturing.
              </p>
              <p>
                Our journey started with a simple belief: every vehicle deserves a reliable, 
                high-performance engine. This philosophy has driven us to establish partnerships 
                with leading manufacturers and develop cutting-edge testing facilities.
              </p>
              <p>
                From classic muscle car restorations to modern hybrid systems, we've powered 
                millions of miles on roads worldwide, earning the trust of professionals and 
                enthusiasts alike.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="w-full h-80 glass-card rounded-2xl bg-gradient-tech flex items-center justify-center">
              <div className="text-center">
                <Wrench className="h-20 w-20 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold">25 Years of Excellence</p>
                <p className="text-muted-foreground">Powering the Future of Automotive</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-['Orbitron'] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card border-white/10 hover-glow">
                <CardContent className="p-8 text-center">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold font-['Orbitron'] mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-['Orbitron'] mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our expert team combines decades of automotive experience with cutting-edge technology 
            to deliver exceptional service and support.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { name: "Marcus Thompson", role: "Founder & CEO", experience: "25+ years" },
              { name: "Sarah Chen", role: "Head of Engineering", experience: "15+ years" },
              { name: "David Rodriguez", role: "Quality Assurance", experience: "20+ years" }
            ].map((member, index) => (
              <Card key={index} className="glass-card border-white/10 hover-glow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold font-['Orbitron'] mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card border-white/10 p-12">
            <h2 className="text-3xl font-bold font-['Orbitron'] mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust EngineCore for their automotive needs. 
              Experience the difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="futuristic" size="lg">
                Browse Engines
              </Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};