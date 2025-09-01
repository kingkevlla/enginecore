import { useState } from "react";
import { Header } from "@/components/Header";
import { ContactPage as ContactContent } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";
import { ImageCardsSection } from "@/components/ImageCardsSection";

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <ContactContent />
        <ImageCardsSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;