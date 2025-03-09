export interface WoodProduct {
  id: number;
  name: string;
  origin: string;
  description: string;
  price: number;
  priceUnit: string;
  type: "hardwood" | "softwood";
  category: "zambian" | "african";
  image: string;
}
