import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductListing } from "@/components/ProductListing";
import { Footer } from "@/components/Footer";
import { AIChatAssistant } from "@/components/AIChatAssistant";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <ProductListing />
      </main>
      <Footer />
      <AIChatAssistant />
    </div>
  );
};

export default Products;