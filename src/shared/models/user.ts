export interface User {
  id: number;
  name: string;
  warName: string;
  rank: string;
  company: string;
  cpf: string;
  telephone: string;
  type: string;
  email: string;
  roles: [
    {
      id: number;
      role: string;
    }
  ];
  authorities: [
    {
      authority: string;
    }
  ];
  username: string;
}
