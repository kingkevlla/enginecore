import { DynamicProductPage } from "@/components/DynamicProductPage";
import { Settings, Star, Calendar } from "lucide-react";

export default function TimingComponents() {
  const features = [
    {
      icon: Settings,
      title: "Precision Engineering",
      description: "High-quality timing components manufactured to exact specifications."
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "All components tested for durability and precise timing performance."
    },
    {
      icon: Calendar,
      title: "Compatibility Guide",
      description: "Detailed compatibility information for various engine models and years."
    }
  ];

  return (
    <DynamicProductPage
      categorySlug="timing-components"
      title="Timing Components"
      description="Precision timing belts, chains, and components for optimal engine performance. Essential parts for maintaining proper engine timing and reliability."
      features={features}
    />
  );
}