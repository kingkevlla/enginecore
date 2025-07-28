import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CustomerReviews } from "@/components/CustomerReviews";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { SearchResults } from "@/components/SearchResults";
import { useProducts } from "@/hooks/useProducts";

const Index = () => {
  const { filteredProducts, searchQuery, setSearchQuery } = useProducts();
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setShowSearchResults(query.trim().length > 0);
  };

  const handleShowAllProducts = () => {
    setShowAllProducts(true);
  };

  const handleCloseAllProducts = () => {
    setShowAllProducts(false);
  };

  const handleCloseSearchResults = () => {
    setShowSearchResults(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      {showSearchResults && (
        <SearchResults 
          products={filteredProducts} 
          onClose={handleCloseSearchResults} 
        />
      )}
      
      {showAllProducts && (
        <SearchResults 
          products={filteredProducts} 
          onClose={handleCloseAllProducts} 
        />
      )}
      
      {!showSearchResults && !showAllProducts && (
        <>
          <main>
            <Hero />
            <Categories />
            <FeaturedProducts onShowAllProducts={handleShowAllProducts} />
            <CustomerReviews />
            <Newsletter />
          </main>
          <Footer />
          <AIChatAssistant />
        </>
      )}
    </div>
  );
};

export default Index;
