import { useState } from "react";
import { Header } from "@/components/Header";
import { AboutPage as AboutContent } from "@/components/AboutPage";
import { Footer } from "@/components/Footer";

const AboutPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;