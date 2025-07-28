import { useState } from "react";
import { Header } from "@/components/Header";
import { Checkout } from "@/components/Checkout";
import { Footer } from "@/components/Footer";

const CheckoutPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <Checkout />
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;