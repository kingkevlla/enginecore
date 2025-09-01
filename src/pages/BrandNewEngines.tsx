import { DynamicProductPage } from "@/components/DynamicProductPage";
import { ImageCardsSection } from "@/components/ImageCardsSection";
import { Settings, Star, Calendar } from "lucide-react";

export default function BrandNewEngines() {
  const features = [
    {
      icon: Star,
      title: "Factory New",
      description: "Brand new engines directly from manufacturers with full warranties."
    },
    {
      icon: Settings,
      title: "Professional Installation",
      description: "Expert installation support and comprehensive technical documentation."
    },
    {
      icon: Calendar,
      title: "Extended Warranty",
      description: "Full manufacturer warranty coverage with extended protection options."
    }
  ];

  return (
    <DynamicProductPage
      categorySlug="brand-new-engines"
      title="Brand New Engines"
      description="Discover our premium collection of brand new automotive engines. Each engine comes with full manufacturer warranty and professional installation support."
      features={features}
    />
  );
}