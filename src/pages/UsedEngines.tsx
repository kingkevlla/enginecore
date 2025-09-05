import { DynamicProductPage } from "@/components/DynamicProductPage";
import { ImageCardsSection } from "@/components/ImageCardsSection";
import { Settings, Star, Calendar } from "lucide-react";

export default function UsedEngines() {
  const features = [
    {
      icon: Settings,
      title: "Fully Inspected",
      description: "Every engine undergoes comprehensive testing and inspection before listing."
    },
    {
      icon: Star,
      title: "Warranty Included",
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
        categorySlug="used-engines"
        title="Used Engines (2000-2020)"
        description="Quality pre-owned engines at affordable prices. Each engine is thoroughly inspected and comes with detailed history and warranty coverage."
        features={features}
      />
      <ImageCardsSection />
    </>
  );
}