
export interface Deposit {
    id: string;
    userId: string;
    valor: number;
    status: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
    balance: number;
    depositos: Deposit[];
    compras: { descricao: string; valor: number; date: string }[];
}
  

