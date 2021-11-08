import { ClientModel } from "./client.model";

export interface ReceiptModel {
    _id? : number
    number : number
    date : Date
    state : number
    price : number
    receiptDetail : object
    client : ClientModel
    createdat?: Date
    updatedat?: Date
}