import { DynamicProductPage } from "@/components/DynamicProductPage";
import { ImageCardsSection } from "@/components/ImageCardsSection";
import { Settings, Star, Calendar } from "lucide-react";

export default function Heads() {
  const features = [
    {
      icon: Settings,
      title: "Precision Machined",
      description: "All cylinder heads are precision machined to exact specifications."
    },
    {
      icon: Star,
      title: "Tested Performance",
      description: "Comprehensive pressure testing ensures optimal performance and reliability."
    },
    {
      icon: Calendar,
      title: "Professional Service",
      description: "Expert rebuilding and reconditioning services available."
    }
  ];

  return (
    <DynamicProductPage
      categorySlug="heads"
      title="Cylinder Heads"
      description="High-quality cylinder heads and head components for optimal engine performance. Professional rebuilding and reconditioning services available."
      features={features}
    />
  );
}