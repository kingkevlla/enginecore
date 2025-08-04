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
    <div className="min-h-screen bg-black">
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
      
      {/* Hide other components to match the reference minimalist design */}
      {!showSearchResults && !showAllProducts && (
        <main className="bg-black">
          {/* Content area - keeping minimal like the reference */}
        </main>
      )}
    </div>
  );
};

export default Index;
