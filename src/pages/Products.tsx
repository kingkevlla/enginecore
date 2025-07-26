import { Header } from "@/components/Header";
import { ProductListing } from "@/components/ProductListing";
import { Footer } from "@/components/Footer";
import { AIChatAssistant } from "@/components/AIChatAssistant";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductListing />
      </main>
      <Footer />
      <AIChatAssistant />
    </div>
  );
};

export default Products;