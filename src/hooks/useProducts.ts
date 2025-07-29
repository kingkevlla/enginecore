import { useState, useMemo } from 'react';

// Import engine images
import toyotaEngine from "@/assets/toyota-4cyl-engine.jpg";
import bmwEngine from "@/assets/bmw-v6-engine.jpg";
import mercedesEngine from "@/assets/mercedes-v8-engine.jpg";
import hondaBikeEngine from "@/assets/honda-bike-engine.jpg";
import fordEngine from "@/assets/ford-v8-engine.jpg";
import nissanGtrEngine from "@/assets/nissan-gtr-engine.jpg";
import v12Engine from "@/assets/v12-engine.jpg";
import electricMotor from "@/assets/electric-motor.jpg";
import dieselEngine from "@/assets/diesel-engine.jpg";

export const products = [
  // Car Engines - Toyota (2000-2024)
  { id: 1, name: "Toyota 2AZ-FE Engine", brand: "Toyota", model: "2AZ-FE", year: "2000-2008", price: 3500, originalPrice: 4200, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.4L", power: "158 HP", torque: "162 lb-ft", image: toyotaEngine, rating: 4.8, reviews: 124, compatibility: ["Camry", "RAV4"], condition: "Refurbished", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 15 },
  { id: 2, name: "Toyota 1ZZ-FE Engine", brand: "Toyota", model: "1ZZ-FE", year: "2000-2005", price: 2800, originalPrice: 3400, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.8L", power: "130 HP", torque: "125 lb-ft", image: toyotaEngine, rating: 4.6, reviews: 89, compatibility: ["Corolla", "Matrix"], condition: "Used", warranty: "9 months", shipping: "Free", inStock: true, stockCount: 22 },
  { id: 3, name: "Toyota 2GR-FE V6", brand: "Toyota", model: "2GR-FE", year: "2005-2018", price: 5200, originalPrice: 6800, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.5L", power: "268 HP", torque: "248 lb-ft", image: toyotaEngine, rating: 4.9, reviews: 156, compatibility: ["Camry", "Avalon"], condition: "Refurbished", warranty: "18 months", shipping: "Free", inStock: true, stockCount: 8 },
  { id: 4, name: "Toyota Dynamic Force", brand: "Toyota", model: "A25A-FKS", year: "2018-2024", price: 5200, originalPrice: 6800, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.5L", power: "203 HP", torque: "184 lb-ft", image: toyotaEngine, rating: 4.7, reviews: 145, compatibility: ["Camry", "RAV4"], condition: "New", warranty: "36 months", shipping: "Free", inStock: true, stockCount: 12 },

  // BMW Engines (2000-2024)
  { id: 5, name: "BMW N55B30 TwinPower", brand: "BMW", model: "N55B30", year: "2009-2016", price: 8500, originalPrice: 12000, category: "Car Engine", type: "Gasoline", cylinders: "6-Cylinder", displacement: "3.0L", power: "300 HP", torque: "300 lb-ft", image: bmwEngine, rating: 4.6, reviews: 87, compatibility: ["335i", "535i"], condition: "Refurbished", warranty: "24 months", shipping: "$150", inStock: true, stockCount: 5 },
  { id: 6, name: "BMW B58B30 Engine", brand: "BMW", model: "B58B30", year: "2015-2024", price: 8800, originalPrice: 11500, category: "Car Engine", type: "Gasoline", cylinders: "6-Cylinder", displacement: "3.0L", power: "335 HP", torque: "330 lb-ft", image: bmwEngine, rating: 4.8, reviews: 167, compatibility: ["340i", "Z4"], condition: "Refurbished", warranty: "30 months", shipping: "$160", inStock: true, stockCount: 7 },
  { id: 7, name: "BMW S65B40 V8", brand: "BMW", model: "S65B40", year: "2008-2013", price: 15000, originalPrice: 22000, category: "Car Engine", type: "Gasoline", cylinders: "V8", displacement: "4.0L", power: "414 HP", torque: "295 lb-ft", image: bmwEngine, rating: 4.9, reviews: 45, compatibility: ["M3"], condition: "Refurbished", warranty: "36 months", shipping: "$200", inStock: true, stockCount: 2 },

  // Mercedes Engines (2000-2024)
  { id: 8, name: "Mercedes OM651 Diesel", brand: "Mercedes", model: "OM651", year: "2008-2018", price: 7200, originalPrice: 9500, category: "Car Engine", type: "Diesel", cylinders: "4-Cylinder", displacement: "2.1L", power: "170 HP", torque: "295 lb-ft", image: mercedesEngine, rating: 4.5, reviews: 134, compatibility: ["C-Class", "E-Class"], condition: "Used", warranty: "18 months", shipping: "$150", inStock: true, stockCount: 9 },
  { id: 9, name: "Mercedes M156 V8 AMG", brand: "Mercedes", model: "M156", year: "2006-2014", price: 18000, originalPrice: 25000, category: "Car Engine", type: "Gasoline", cylinders: "V8", displacement: "6.2L", power: "457 HP", torque: "465 lb-ft", image: mercedesEngine, rating: 4.9, reviews: 56, compatibility: ["C63 AMG"], condition: "Refurbished", warranty: "36 months", shipping: "$250", inStock: true, stockCount: 3 },

  // Honda Engines (2000-2024)
  { id: 10, name: "Honda K20A2 VTEC", brand: "Honda", model: "K20A2", year: "2002-2006", price: 4200, originalPrice: 5400, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "200 HP", torque: "142 lb-ft", image: toyotaEngine, rating: 4.8, reviews: 167, compatibility: ["Civic Si"], condition: "Used", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 11 },
  { id: 11, name: "Honda J35A V6", brand: "Honda", model: "J35A", year: "2005-2014", price: 5800, originalPrice: 7200, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.5L", power: "280 HP", torque: "254 lb-ft", image: toyotaEngine, rating: 4.6, reviews: 123, compatibility: ["Pilot", "Odyssey"], condition: "Refurbished", warranty: "15 months", shipping: "$120", inStock: true, stockCount: 8 },

  // Ford Engines (2000-2024)
  { id: 12, name: "Ford 3.5L EcoBoost", brand: "Ford", model: "3.5L EcoBoost", year: "2010-2020", price: 7500, originalPrice: 9800, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.5L", power: "365 HP", torque: "420 lb-ft", image: fordEngine, rating: 4.5, reviews: 198, compatibility: ["F-150", "Explorer"], condition: "Used", warranty: "18 months", shipping: "$150", inStock: true, stockCount: 13 },
  { id: 13, name: "Ford Coyote V8", brand: "Ford", model: "5.0L Coyote", year: "2011-2023", price: 11000, originalPrice: 15000, category: "Car Engine", type: "Gasoline", cylinders: "V8", displacement: "5.0L", power: "435 HP", torque: "400 lb-ft", image: fordEngine, rating: 4.9, reviews: 267, compatibility: ["Mustang GT"], condition: "Refurbished", warranty: "30 months", shipping: "$200", inStock: true, stockCount: 4 },

  // Nissan Engines (2000-2024)
  { id: 14, name: "Nissan VR38DETT", brand: "Nissan", model: "VR38DETT", year: "2009-2024", price: 18000, originalPrice: 25000, category: "Car Engine", type: "Gasoline", cylinders: "V6", displacement: "3.8L", power: "565 HP", torque: "467 lb-ft", image: nissanGtrEngine, rating: 5.0, reviews: 89, compatibility: ["GT-R"], condition: "Refurbished", warranty: "36 months", shipping: "$250", inStock: true, stockCount: 1 },
  { id: 15, name: "Nissan QR25DE", brand: "Nissan", model: "QR25DE", year: "2002-2018", price: 3200, originalPrice: 4100, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.5L", power: "175 HP", torque: "180 lb-ft", image: nissanGtrEngine, rating: 4.3, reviews: 156, compatibility: ["Altima", "Sentra"], condition: "Used", warranty: "10 months", shipping: "Free", inStock: true, stockCount: 19 },

  // Motorcycle Engines - Honda (2000-2024)
  { id: 16, name: "Honda CBR1000RR", brand: "Honda", model: "CBR1000RR", year: "2004-2019", price: 4800, originalPrice: 6200, category: "Motorcycle Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.0L", power: "189 HP", torque: "85 lb-ft", image: hondaBikeEngine, rating: 4.9, reviews: 234, compatibility: ["CBR1000RR"], condition: "Used", warranty: "12 months", shipping: "Free", inStock: true, stockCount: 14 },
  
  // Supercar Engines - Lamborghini (2011-2024)
  { id: 17, name: "Lamborghini V12 L539", brand: "Lamborghini", model: "L539", year: "2011-2024", price: 45000, originalPrice: 65000, category: "Supercar Engine", type: "Gasoline", cylinders: "V12", displacement: "6.5L", power: "740 HP", torque: "509 lb-ft", image: v12Engine, rating: 5.0, reviews: 34, compatibility: ["Aventador"], condition: "New", warranty: "48 months", shipping: "$500", inStock: true, stockCount: 2 },
  
  // Electric Motors - Tesla (2012-2024)  
  { id: 18, name: "Tesla Model S Plaid Motor", brand: "Tesla", model: "Model S Plaid", year: "2021-2024", price: 12000, originalPrice: 18000, category: "Electric Motor", type: "Electric", cylinders: "N/A", displacement: "N/A", power: "670 HP", torque: "850 lb-ft", image: electricMotor, rating: 4.8, reviews: 127, compatibility: ["Model S", "Model X"], condition: "New", warranty: "60 months", shipping: "$200", inStock: true, stockCount: 6 },
  
  // Diesel Engines - Cummins (2007-2024)
  { id: 19, name: "Cummins ISX15 Diesel", brand: "Cummins", model: "ISX15", year: "2010-2024", price: 28000, originalPrice: 35000, category: "Diesel Engine", type: "Diesel", cylinders: "6-Cylinder", displacement: "15.0L", power: "500 HP", torque: "1850 lb-ft", image: dieselEngine, rating: 4.7, reviews: 89, compatibility: ["Heavy Trucks"], condition: "Rebuilt", warranty: "36 months", shipping: "$400", inStock: false, stockCount: 0 },

  // Budget Used Engines (2003-2010) - Affordable Options
  { id: 20, name: "Honda Civic D17A1", brand: "Honda", model: "D17A1", year: "2003-2005", price: 1200, originalPrice: 1800, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.7L", power: "115 HP", torque: "110 lb-ft", image: toyotaEngine, rating: 4.2, reviews: 87, compatibility: ["Civic"], condition: "Used", warranty: "6 months", shipping: "Free", inStock: true, stockCount: 25 },
  { id: 21, name: "Toyota Corolla 1ZZ-FE", brand: "Toyota", model: "1ZZ-FE", year: "2003-2008", price: 1450, originalPrice: 2100, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "1.8L", power: "130 HP", torque: "125 lb-ft", image: toyotaEngine, rating: 4.4, reviews: 156, compatibility: ["Corolla", "Matrix"], condition: "Used", warranty: "6 months", shipping: "Free", inStock: true, stockCount: 18 },
  { id: 22, name: "Ford Focus Zetec 2.0L", brand: "Ford", model: "Zetec", year: "2005-2010", price: 1350, originalPrice: 1950, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "140 HP", torque: "135 lb-ft", image: fordEngine, rating: 4.1, reviews: 93, compatibility: ["Focus"], condition: "Used", warranty: "6 months", shipping: "Free", inStock: true, stockCount: 22 },
  { id: 23, name: "Chevrolet Malibu Ecotec", brand: "Chevrolet", model: "Ecotec L61", year: "2004-2008", price: 1100, originalPrice: 1600, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.2L", power: "144 HP", torque: "155 lb-ft", image: toyotaEngine, rating: 3.9, reviews: 67, compatibility: ["Malibu", "Cobalt"], condition: "Used", warranty: "3 months", shipping: "$50", inStock: true, stockCount: 15 },
  { id: 24, name: "Nissan Altima QR20DE", brand: "Nissan", model: "QR20DE", year: "2003-2006", price: 1250, originalPrice: 1750, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "140 HP", torque: "147 lb-ft", image: nissanGtrEngine, rating: 4.0, reviews: 78, compatibility: ["Altima", "Sentra"], condition: "Used", warranty: "6 months", shipping: "Free", inStock: true, stockCount: 12 },
  { id: 25, name: "Hyundai Elantra Beta II", brand: "Hyundai", model: "Beta II", year: "2007-2010", price: 950, originalPrice: 1400, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "138 HP", torque: "136 lb-ft", image: toyotaEngine, rating: 3.8, reviews: 45, compatibility: ["Elantra"], condition: "Used", warranty: "3 months", shipping: "$75", inStock: true, stockCount: 8 },
  { id: 26, name: "Mazda 3 MZR 2.0L", brand: "Mazda", model: "MZR LF", year: "2004-2009", price: 1400, originalPrice: 2000, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "148 HP", torque: "135 lb-ft", image: toyotaEngine, rating: 4.3, reviews: 112, compatibility: ["Mazda3", "Mazda6"], condition: "Used", warranty: "9 months", shipping: "Free", inStock: true, stockCount: 14 },
  { id: 27, name: "Subaru Impreza EJ20", brand: "Subaru", model: "EJ20", year: "2005-2008", price: 1800, originalPrice: 2600, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "165 HP", torque: "166 lb-ft", image: toyotaEngine, rating: 4.5, reviews: 89, compatibility: ["Impreza"], condition: "Used", warranty: "12 months", shipping: "$100", inStock: true, stockCount: 7 },
  { id: 28, name: "Volkswagen Jetta 2.0L FSI", brand: "Volkswagen", model: "BPY", year: "2006-2010", price: 1650, originalPrice: 2300, category: "Car Engine", type: "Gasoline", cylinders: "4-Cylinder", displacement: "2.0L", power: "150 HP", torque: "147 lb-ft", image: bmwEngine, rating: 4.1, reviews: 73, compatibility: ["Jetta", "Golf"], condition: "Used", warranty: "9 months", shipping: "$90", inStock: true, stockCount: 11 },
];

export const useProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.model.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.compatibility.some(comp => comp.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  return {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery
  };
};