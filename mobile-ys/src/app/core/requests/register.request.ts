import { UserRoleEnum } from 'src/app/shared/enums/user-role.enum'

export interface RegisterRequest {
    name: string
    address: string
    email: string
    password: string
    cell: string
    role: UserRoleEnum
    state: number
}
