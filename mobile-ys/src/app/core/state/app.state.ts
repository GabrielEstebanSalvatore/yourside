import { ClientModel } from 'src/app/shared/models/client.model'
import { TrolleyModel } from 'src/app/shared/models/trolley.model'
import { InitStatusEnum } from '../enums/init-status.enum'
import { AuthRequest } from '../requests/auth.request'

export interface State {
    user: AuthRequest
    token: string
    loggedIn: boolean
    isLoading: boolean
    errorMessage: string
    hasError: boolean
    clientAuth: boolean
    client: ClientModel
    trolley?: TrolleyModel
    moduleStatus?: InitStatusEnum
}
