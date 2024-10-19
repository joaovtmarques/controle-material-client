import type { Equipment } from "./equipment";
import type { Item } from "./item";
import type { Lender } from "./lender";
import type { Receiver } from "./receiver";

export interface Loan {
  id: number;
  amount: number;
  date: string;
  observation: string;
  devolutionDate: string;
  status: string;
  type: string;
  alteration: boolean;
  receiver: Receiver;
  lender: Lender;
  items: Item[] | null | [];
  equipments: Equipment[] | null | [];
}
