import { DynamicProductPage } from "@/components/DynamicProductPage";
import { ImageCardsSection } from "@/components/ImageCardsSection";
import { Settings, Star, Calendar } from "lucide-react";

export default function Products() {
  const features = [
    {
      icon: Settings,
      title: "Professional Quality",
      description: "All products meet or exceed OEM specifications and quality standards."
    },
    {
      icon: Star,
      title: "Wide Selection",
      description: "Comprehensive inventory of engines, parts, and accessories for all vehicle types."
    },
    {
      icon: Calendar,
      title: "Expert Support",
      description: "Professional installation guidance and comprehensive technical support."
    }
  ];

  return (
    <>
      <DynamicProductPage
        categorySlug="all-products"
        title="All Products"
        description="Browse our complete selection of automotive engines, parts, and accessories. From brand new to rebuilt engines, we have everything you need for your vehicle."
        features={features}
      />
      <ImageCardsSection />
    </>
  );
}