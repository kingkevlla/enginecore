import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  compare_price: number | null;
  brand: string;
  model: string;
  engine_type: string;
  displacement: string;
  fuel_type: string;
  condition: string;
  stock_quantity: number;
  images: any;
}

export default function RebuiltEngines() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', '22222222-2222-2222-2222-222222222222')
        .eq('is_active', true);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rebuilt Engines</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional rebuilt engines with comprehensive warranty. 
            Each engine undergoes rigorous testing and quality control procedures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="h-full flex flex-col">
              <CardHeader className="p-0">
                {product.images && Array.isArray(product.images) && product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {product.brand}
                  </Badge>
                  <Badge variant="outline" className="ml-2">
                    {product.condition}
                  </Badge>
                </div>
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {product.name}
                </CardTitle>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {product.short_description}
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <div><strong>Model:</strong> {product.model}</div>
                  <div><strong>Type:</strong> {product.engine_type}</div>
                  <div><strong>Displacement:</strong> {product.displacement}</div>
                  <div><strong>Fuel:</strong> {product.fuel_type}</div>
                  <div><strong>Stock:</strong> {product.stock_quantity} available</div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        ${product.price.toLocaleString()}
                      </div>
                      {product.compare_price && (
                        <div className="text-sm text-gray-500 line-through">
                          ${product.compare_price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Add to Cart
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}