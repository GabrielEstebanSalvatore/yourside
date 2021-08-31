import ClientConstant from './clientConstant'

export default (state, action) => {
    switch (action.type) {
        case ClientConstant.SIGNUP_SUCCEEDED:
        case ClientConstant.LOGIN_SUCCEEDED:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authenticated: true,
                message: null,
                token: action.payload.token,
                loading: false,
            }
        case ClientConstant.CLOSE_SESION:
        case ClientConstant.LOGIN_ERROR:
        case ClientConstant.SIGNUP_ERROR:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                client: null,
                authenticated: null,
                message: action.payload,
                loading: false,
                email: null,
                trolley: [],
            }
        case ClientConstant.GET_USER:
            return {
                ...state,
                authenticated: true,
                //message: null,
                client: action.payload.client[0],
                loading: false,
                admin:
                    action.payload.client.role == 'ADMIN_ROLE' ? true : false,
                email: action.payload.client[0].email,
                trolley: action.payload.client[0].trolley.articles,
            }
        case ClientConstant.ADD_ARTICLE_TO_TROLLEY:
            return {
                ...state,
                trolley: [...state.trolley, action.payload],
            }
        case ClientConstant.SUCCESSFULL_PURCHASE_CLIENT:
            return {
                ...state,
                trolley: [],
            }
        default:
            return state
    }
}
