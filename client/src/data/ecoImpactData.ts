import { WoodProduct } from "../types";

export interface EcoImpactFactor {
  co2PerUnit: number; // kg of CO2 equivalent per cubic meter
  waterUsage: number; // liters per cubic meter
  landUse: number; // square meters per cubic meter
  renewability: number; // scale from 0-10 (higher is better)
  biodiversity: number; // scale from 0-10 (lower impact is better)
  transportEmissions: number; // kg of CO2 per km per cubic meter
}

// Environmental impact factors for different wood types
// These are approximated values based on industry research
export const ecoImpactFactors: Record<string, EcoImpactFactor> = {
  // Hardwoods generally have higher environmental impact but longer durability
  "Zambezi Teak": {
    co2PerUnit: 180,
    waterUsage: 1200,
    landUse: 12,
    renewability: 3, // Slow growing
    biodiversity: 5,
    transportEmissions: 0.08
  },
  "African Blackwood": {
    co2PerUnit: 230,
    waterUsage: 1500,
    landUse: 18,
    renewability: 2, // Very slow growing
    biodiversity: 7, // Higher impact due to rarity
    transportEmissions: 0.08
  },
  "Mukwa": {
    co2PerUnit: 170,
    waterUsage: 1100,
    landUse: 14,
    renewability: 4,
    biodiversity: 5,
    transportEmissions: 0.08
  },
  "African Mahogany": {
    co2PerUnit: 190,
    waterUsage: 1300,
    landUse: 16,
    renewability: 3,
    biodiversity: 6,
    transportEmissions: 0.08
  },
  // Softwoods generally have lower environmental impact and faster growth
  "African Pine": {
    co2PerUnit: 120,
    waterUsage: 800,
    landUse: 9,
    renewability: 7, // Faster growing
    biodiversity: 4, // Lower impact
    transportEmissions: 0.08
  },
  "Zambian Cedar": {
    co2PerUnit: 135,
    waterUsage: 850,
    landUse: 10,
    renewability: 6,
    biodiversity: 4,
    transportEmissions: 0.08
  },
  // Default values for any wood types not specifically defined
  "default": {
    co2PerUnit: 160,
    waterUsage: 1000,
    landUse: 12,
    renewability: 5,
    biodiversity: 5,
    transportEmissions: 0.08
  }
};

/**
 * Calculate the environmental impact score for a wood product based on quantity and distance
 */
export const calculateImpactScore = (
  product: WoodProduct,
  quantity: number = 1,
  distance: number = 100
): {
  co2Impact: number;
  waterImpact: number;
  landImpact: number;
  renewabilityScore: number;
  biodiversityImpact: number;
  transportImpact: number;
  totalScore: number;
} => {
  // Get impact factors for the specific wood type or use default if not found
  const impactFactor = ecoImpactFactors[product.name] || ecoImpactFactors.default;
  
  // Calculate individual impact components
  const co2Impact = impactFactor.co2PerUnit * quantity;
  const waterImpact = impactFactor.waterUsage * quantity;
  const landImpact = impactFactor.landUse * quantity;
  const renewabilityScore = impactFactor.renewability; // This is already a score
  const biodiversityImpact = impactFactor.biodiversity; // This is already a score
  const transportImpact = impactFactor.transportEmissions * distance * quantity;
  
  // Calculate total impact score (weighted sum)
  // Lower is better for all except renewability where higher is better
  const totalScore = 
    (co2Impact * 0.3) + 
    (waterImpact * 0.05) + 
    (landImpact * 0.1) + 
    ((10 - renewabilityScore) * 10 * 0.25) + // Invert renewability score
    (biodiversityImpact * 10 * 0.2) + 
    (transportImpact * 0.1);
  
  return {
    co2Impact,
    waterImpact,
    landImpact,
    renewabilityScore,
    biodiversityImpact,
    transportImpact,
    totalScore
  };
};

/**
 * Convert numerical score to a descriptive eco-rating
 */
export const getEcoRating = (score: number): string => {
  if (score < 80) return "Excellent";
  if (score < 120) return "Good";
  if (score < 160) return "Moderate";
  if (score < 200) return "Fair";
  return "Poor";
};

/**
 * Get color code based on eco-rating for visual representation
 */
export const getEcoRatingColor = (score: number): string => {
  if (score < 80) return "#4CAF50"; // Green
  if (score < 120) return "#8BC34A"; // Light Green
  if (score < 160) return "#FFC107"; // Amber
  if (score < 200) return "#FF9800"; // Orange
  return "#F44336"; // Red
};