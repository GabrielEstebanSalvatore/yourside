export interface ClientModel{
    id? : string;
    name : string;
    address : string;
    cell : string;
    email: string;
    password : string;
    role: string;
    state : number;
    createdat? : Date;
    updatedat? : Date;
}