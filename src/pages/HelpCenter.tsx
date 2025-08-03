import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Book, MessageCircle, Settings, Truck, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      icon: Book,
      articles: [
        "How to search for engines",
        "Understanding engine specifications", 
        "Creating your first order",
        "Account setup guide"
      ]
    },
    {
      title: "Orders & Shipping",
      icon: Truck,
      articles: [
        "Track your order",
        "Shipping timeframes",
        "International shipping",
        "Order modifications"
      ]
    },
    {
      title: "Payments",
      icon: CreditCard,
      articles: [
        "Accepted payment methods",
        "Payment security",
        "Billing questions",
        "Refund processing"
      ]
    },
    {
      title: "Technical Support",
      icon: Settings,
      articles: [
        "Engine compatibility",
        "Installation guides",
        "Troubleshooting",
        "Warranty information"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-['Orbitron'] text-gradient mb-4">
              Help Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Find answers to your questions and get the support you need
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Input
              placeholder="Search for help articles..."
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Link to="/contact">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold">Contact Support</h3>
                  <p className="text-sm text-muted-foreground">Get direct help</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/live-chat">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Chat with us now</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/returns-refunds">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Returns</h3>
                  <p className="text-sm text-muted-foreground">Return policy</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/faqs">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Book className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold">FAQs</h3>
                  <p className="text-sm text-muted-foreground">Common questions</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Card key={category.title} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article, index) => (
                      <li key={index}>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter;