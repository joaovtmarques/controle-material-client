import type { Category } from "./category";

export interface Equipment {
  id: number;
  name: string;
  serialNumber: string;
  amount: number;
  price: string;
  observation: string;
  condition: string;
  state: string;
  type: string;
  isInCharge: boolean;
  owner?: string;
  isTemporary: boolean;
  amountOut: number;
  category: Category;
  lender: string;
  receiver: string;
  loanDate: string;
}
