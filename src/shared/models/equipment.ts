import type { Category } from "./category";

export interface Equipment {
  id: number;
  name: string;
  serialNumber: string;
  amount: number;
  price: string;
  observation: string;
  condition: string;
  type: string;
  isInCharge: boolean;
  amountOut: number;
  category: Category;
}
