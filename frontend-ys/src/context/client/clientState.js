import React, { useReducer, useContext, useEffect } from 'react'
import ClientConstant from './clientConstant'
import ClientContext from './clientContext'
import ClientReducer from './clientReducer'
import clienteAxios from '../../services/axios'
import tokenAuth from '../../config/token'

import AppContext from '../../context/app/appContext'

const ClientState = (props) => {
    const appContext = useContext(AppContext)
    const { handleModal, logOut, setMessage, getConfiguration } = appContext

    const initialState = {
        login: {},
        authenticated: localStorage.getItem('token') ? true : false,
        token: props.token ? props.token : localStorage.getItem('token'),
        client: null,
        email: null,
        admin: null,
        loading: null,
        trolley: [],
    }

    const [state, dispatch] = useReducer(ClientReducer, initialState)

    const registerUser = async (data) => {
        try {
            const response = await clienteAxios.post('/clients', data)

            if (response !== null) {
                dispatch({
                    type: ClientConstant.SIGNUP_SUCCEEDED,
                    payload: response.data,
                })
                loginUser({ email: data.email, password: data.password })
            } else {
                handleModal('MensajeRegistro', true)
                setMessage('NO SE PUEDO CREAR EL CLIENTE!!')
                console.log('error')
            }
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage(error.response.data.msg)
            console.log(error)
        }
    }

    const loginUser = async (data) => {
        try {
            const response = await clienteAxios.post('/auth', data)
            dispatch({
                type: ClientConstant.LOGIN_SUCCEEDED,
                payload: response.data,
            })
            authenticatedClient()
            handleModal('', false)
            getConfiguration()
        } catch (error) {
            handleModal('MensajeRegistro', true)
            setMessage('El cliente no esta registrado')
            console.log(error)
        }
    }

    const authenticatedClient = async () => {
        const token = localStorage.getItem('token')

        if (token) {
            tokenAuth(token)
        }

        try {
            var headers = {
                'x-auth-token': token,
            }
            const response = await clienteAxios.get('/auth', { headers })

            dispatch({
                type: ClientConstant.GET_USER,
                payload: response.data,
            })
        } catch (error) {
            dispatch({
                type: ClientConstant.LOGIN_ERROR,
            })
        }
    }

    useEffect(() => {
        authenticatedClient()
    }, [])

    const closeSesion = async () => {
        await clienteAxios.post('/clientstrolley', {
            client: state.client,
            trolleyClient: state.trolley,
        })
        dispatch({
            type: ClientConstant.CLOSE_SESION,
        })
        handleModal('', false)
        logOut()
    }

    const addArticleToSesionTrolley = async (article) => {
        // await clienteAxios.post('/addtotrolley', {
        //     client: state.client,
        //     article: article,
        // })
        dispatch({
            type: ClientConstant.ADD_ARTICLE_TO_TROLLEY,
            payload: article,
        })
    }
    const purchaseClient = async () => {
        dispatch({
            type: ClientConstant.SUCCESSFULL_PURCHASE_CLIENT,
        })

        await clienteAxios.post('/clientstrolley', {
            client: state.client,
            trolleyClient: state.trolley,
        })
    }

    return (
        <ClientContext.Provider
            value={{
                login: state.login,
                authenticated: state.authenticated,
                token: state.token,
                client: state.client,
                admin: state.admin,
                email: state.email,
                loading: state.loading,
                trolley: state.trolley,
                loginUser,
                registerUser,
                closeSesion,
                authenticatedClient,
                addArticleToSesionTrolley,
                purchaseClient,
            }}
        >
            {props.children}
        </ClientContext.Provider>
    )
}

export default ClientState
