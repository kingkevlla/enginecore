import { Header } from "@/components/Header";
import { Checkout } from "@/components/Checkout";
import { Footer } from "@/components/Footer";

const CheckoutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Checkout />
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;