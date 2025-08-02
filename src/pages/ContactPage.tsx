import { useState } from "react";
import { Header } from "@/components/Header";
import { ContactPage as ContactContent } from "@/components/ContactPage";
import { Footer } from "@/components/Footer";

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;