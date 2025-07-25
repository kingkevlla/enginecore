import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

export const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Mike Chen",
      location: "Los Angeles, CA",
      rating: 5,
      text: "Incredible AI-powered search helped me find the exact engine for my BMW. The quality exceeded expectations and shipping was lightning fast!",
      product: "BMW B58 3.0L Turbo Engine",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Sarah Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "The 3D product views and compatibility checker saved me hours of research. Found the perfect motorcycle engine with zero compatibility issues.",
      product: "Honda CBR1000RR Engine",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b05b?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "David Thompson",
      location: "Dallas, TX",
      rating: 5,
      text: "Professional installation support and genuine parts. The AI assistant answered all my technical questions instantly. Highly recommended!",
      product: "Mercedes AMG M177 V8",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-['Orbitron'] text-gradient">
            Customer Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by thousands of automotive enthusiasts worldwide
          </p>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card
              key={review.id}
              className="glass-card border-white/10 p-8 hover-glow relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Product */}
              <p className="text-sm text-primary font-semibold mb-4">
                Purchased: {review.product}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.location}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};