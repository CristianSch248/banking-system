export interface Deposit {
    valor: number;
    status: string;
}

export interface Deposit {
    id: string;
    userId: string;
    valor: number;
    status: string;
}

export interface User {
    id: string;
    name: string;
    depositos: Deposit[];
}

