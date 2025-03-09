import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { woodProducts } from "../data/woodProducts";
import { 
  calculateImpactScore, 
  getEcoRating, 
  getEcoRatingColor 
} from "../data/ecoImpactData";
import { WoodProduct } from "../types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Leaf, 
  Droplets, 
  TreePine, 
  RefreshCw, 
  TreeDeciduous, 
  Truck, 
  Award 
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function EcoImpactCalculator() {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [distance, setDistance] = useState(100);
  const [impactResults, setImpactResults] = useState<{
    co2Impact: number;
    waterImpact: number;
    landImpact: number;
    renewabilityScore: number;
    biodiversityImpact: number;
    transportImpact: number;
    totalScore: number;
  } | null>(null);

  // Set default product on component mount
  useEffect(() => {
    if (woodProducts.length > 0 && !selectedProductId) {
      setSelectedProductId(woodProducts[0].id);
    }
  }, []);

  // Calculate impact when inputs change
  useEffect(() => {
    if (selectedProductId) {
      const selectedProduct = woodProducts.find(p => p.id === selectedProductId);
      if (selectedProduct) {
        const results = calculateImpactScore(selectedProduct, quantity, distance);
        setImpactResults(results);
      }
    }
  }, [selectedProductId, quantity, distance]);

  const handleProductChange = (value: string) => {
    setSelectedProductId(Number(value));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleDistanceChange = (values: number[]) => {
    setDistance(values[0]);
  };

  const getSelectedProduct = (): WoodProduct | undefined => {
    return woodProducts.find(p => p.id === selectedProductId);
  };

  const formatNumber = (num: number): string => {
    return num.toFixed(1);
  };

  const impactCard = (title: string, value: number, unit: string, icon: JSX.Element, description: string) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
    >
      <div className="flex items-center mb-2">
        <div className="p-2 rounded-full mr-3" style={{ backgroundColor: '#F5F5DC' }}>
          {icon}
        </div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="flex justify-between items-baseline">
        <p className="text-2xl font-bold" style={{ color: '#8B4513' }}>
          {formatNumber(value)}
        </p>
        <span className="text-sm text-gray-500">{unit}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">{description}</p>
    </motion.div>
  );

  return (
    <section id="eco-calculator" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-3 text-center" style={{ color: '#8B4513' }}>
            Eco-Impact Calculator
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#D2B48C' }}></div>
          <p className="text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Evaluate the environmental impact of different wood choices. Make sustainable decisions by comparing the ecological footprint of various African woods.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wood-type">Wood Type</Label>
                  <Select onValueChange={handleProductChange} defaultValue={selectedProductId?.toString() || ""}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select wood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {woodProducts.map(product => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name} ({product.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="quantity">Quantity (cubic meters)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="distance">Shipping Distance: {distance} km</Label>
                  <Slider
                    id="distance"
                    min={50}
                    max={5000}
                    step={50}
                    value={[distance]}
                    onValueChange={handleDistanceChange}
                    className="mt-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {impactResults && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-5 rounded-full shadow-lg inline-block mb-4"
                >
                  <div 
                    className="w-32 h-32 rounded-full flex items-center justify-center border-8" 
                    style={{ borderColor: getEcoRatingColor(impactResults.totalScore) }}
                  >
                    <div className="text-center">
                      <p className="text-xs text-gray-500">ECO RATING</p>
                      <h3 
                        className="text-xl font-bold" 
                        style={{ color: getEcoRatingColor(impactResults.totalScore) }}
                      >
                        {getEcoRating(impactResults.totalScore)}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {impactCard(
                  "Carbon Footprint", 
                  impactResults.co2Impact, 
                  "kg CO₂",
                  <Leaf className="text-green-600" size={20} />,
                  "Total CO₂ equivalent emissions"
                )}
                {impactCard(
                  "Water Usage", 
                  impactResults.waterImpact, 
                  "liters",
                  <Droplets className="text-blue-500" size={20} />,
                  "Water consumed during production"
                )}
                {impactCard(
                  "Land Use", 
                  impactResults.landImpact, 
                  "m²",
                  <TreePine className="text-green-700" size={20} />,
                  "Area required for cultivation"
                )}
                {impactCard(
                  "Renewability", 
                  impactResults.renewabilityScore, 
                  "/10",
                  <RefreshCw className="text-teal-600" size={20} />,
                  "How quickly the resource renews (higher is better)"
                )}
                {impactCard(
                  "Biodiversity", 
                  impactResults.biodiversityImpact, 
                  "impact",
                  <TreeDeciduous className="text-emerald-600" size={20} />,
                  "Impact on local ecosystem diversity (lower is better)"
                )}
                {impactCard(
                  "Transport", 
                  impactResults.transportImpact, 
                  "kg CO₂",
                  <Truck className="text-slate-600" size={20} />,
                  "Emissions from transportation"
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <div className="flex items-center mb-4">
                  <Award className="text-amber-500 mr-3" size={24} />
                  <h3 className="text-xl font-semibold" style={{ color: '#8B4513' }}>Sustainability Insights</h3>
                </div>
                <p className="text-gray-700 mb-3">
                  {getSelectedProduct()?.name} is a <strong>{getSelectedProduct()?.type}</strong> from <strong>{getSelectedProduct()?.origin}</strong>.
                </p>
                <p className="text-gray-700">
                  {impactResults.totalScore < 100 ? (
                    <>This wood choice has a relatively low environmental impact. It's a sustainable option due to its good renewability score and lower carbon footprint.</>
                  ) : impactResults.totalScore < 200 ? (
                    <>This wood has a moderate environmental impact. Consider reducing quantity or choosing a more sustainable alternative if available.</>
                  ) : (
                    <>This wood has a significant environmental footprint. For more eco-friendly projects, consider alternatives with better sustainability profiles.</>
                  )}
                </p>
                <p className="text-sm text-gray-500 mt-4 italic">
                  Note: These calculations are estimates based on industry averages and may vary based on specific harvesting and processing methods.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}