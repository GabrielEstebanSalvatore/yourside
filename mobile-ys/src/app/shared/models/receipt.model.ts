import { Cliente } from "./client.model";

export interface ReceiptModel {
    id? : number
    number : number
    date : Date
    state : number
    price : number
    receiptDetail : object
    client : Cliente
    createdat?: Date
    updatedat?: Date
}