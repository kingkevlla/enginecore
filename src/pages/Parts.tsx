import { DynamicProductPage } from "@/components/DynamicProductPage";
import { ImageCardsSection } from "@/components/ImageCardsSection";
import { Settings, Star, Calendar } from "lucide-react";

export default function Parts() {
  const features = [
    {
      icon: Settings,
      title: "OEM Quality",
      description: "Original equipment manufacturer quality parts and accessories."
    },
    {
      icon: Star,
      title: "Wide Selection",
      description: "Comprehensive inventory of engine parts for various makes and models."
    },
    {
      icon: Calendar,
      title: "Fast Shipping",
      description: "Quick delivery of parts to keep your engine running smoothly."
    }
  ];

  return (
    <DynamicProductPage
      categorySlug="parts"
      title="Engine Parts & Accessories"
      description="Complete selection of automotive engine parts and accessories. From filters to gaskets, we have everything you need for engine maintenance and repair."
      features={features}
    />
  );
}