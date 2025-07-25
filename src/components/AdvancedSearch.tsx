import { useState } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export const AdvancedSearch = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [searchQuery, setSearchQuery] = useState("");

  const carMakes = ["BMW", "Mercedes", "Audi", "Toyota", "Honda", "Ford", "Chevrolet"];
  const engineTypes = ["Gasoline", "Diesel", "Hybrid", "Electric"];
  const cylinders = ["4-Cylinder", "6-Cylinder", "8-Cylinder", "12-Cylinder"];

  return (
    <section className="py-12 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Orbitron'] text-gradient">
              AI-Powered Engine Search
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect engine with intelligent compatibility matching
            </p>
          </div>

          {/* Main Search Bar */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Input
                  placeholder="Search by engine model, vehicle, or part number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/50 border-white/20"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-40 h-14 bg-background/50 border-white/20">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car-engines">Car Engines</SelectItem>
                    <SelectItem value="motorcycle-engines">Motorcycle Engines</SelectItem>
                    <SelectItem value="spare-parts">Spare Parts</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="tech"
                  size="lg"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="h-14 px-6"
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                </Button>

                <Button variant="futuristic" size="lg" className="h-14 px-8">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {isFiltersOpen && (
            <div className="glass-card p-6 rounded-2xl border border-white/10 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-['Orbitron']">Advanced Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Vehicle Make */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Vehicle Make</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {carMakes.map((make) => (
                      <div key={make} className="flex items-center space-x-2">
                        <Checkbox id={make} />
                        <label htmlFor={make} className="text-sm cursor-pointer">
                          {make}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engine Type */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Engine Type</label>
                  <div className="space-y-2">
                    {engineTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cylinders */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">Cylinders</label>
                  <div className="space-y-2">
                    {cylinders.map((cylinder) => (
                      <div key={cylinder} className="flex items-center space-x-2">
                        <Checkbox id={cylinder} />
                        <label htmlFor={cylinder} className="text-sm cursor-pointer">
                          {cylinder}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-semibold mb-3 block">
                    Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    min={0}
                    step={500}
                    className="mt-6"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <Button variant="ghost">
                  Clear All Filters
                </Button>
                <div className="flex gap-3">
                  <Button variant="outline">
                    Save Search
                  </Button>
                  <Button variant="futuristic">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold mb-4 font-['Orbitron']">AI Suggestions</h4>
            <div className="flex flex-wrap gap-3">
              {[
                "BMW 3 Series Compatible Engines",
                "High Performance V8 Engines",
                "Motorcycle Sport Engines",
                "Diesel Engine Upgrades",
                "Turbo Engine Systems"
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  size="sm"
                  className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};