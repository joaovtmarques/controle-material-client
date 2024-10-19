import type { Authorities } from "./authorities";
import type { Role } from "./role";

export interface Lender {
  id: number;
  name: string;
  warName: string;
  rank: string;
  company: string;
  cpf: string;
  telephone: string;
  email: string;
  type: string;
  roles: Role[];
  authorities: Authorities[];
  username: string;
}
