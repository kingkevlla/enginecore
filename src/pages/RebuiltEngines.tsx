import { DynamicProductPage } from "@/components/DynamicProductPage";
import { ImageCardsSection } from "@/components/ImageCardsSection";
import { Settings, Star, Calendar } from "lucide-react";

export default function RebuiltEngines() {
  const features = [
    {
      icon: Settings,
      title: "Thorough Inspection",
      description: "Every engine undergoes comprehensive testing and inspection before listing."
    },
    {
      icon: Star,
      title: "Quality Guarantee", 
      description: "All engines come with warranty coverage and detailed condition reports."
    },
    {
      icon: Calendar,
      title: "Service History",
      description: "Complete maintenance records and mileage verification included."
    }
  ];

  return (
    <>
      <DynamicProductPage
        categorySlug="rebuilt-engines"
        title="Rebuilt Engines"
        description="Professional rebuilt engines with comprehensive warranty. Each engine undergoes rigorous testing and quality control procedures."
        features={features}
      />
      <ImageCardsSection />
    </>
  );
}