import { ClientModel } from './client.model'
import { ReceiptDetailModel } from './receiptDetails.model'

export interface ReceiptModel {
    id?: number
    number: number
    date: Date
    state: number
    price: number
    receiptDetail: ReceiptDetailModel
    client: ClientModel
    createdat?: Date
    updatedat?: Date
}
