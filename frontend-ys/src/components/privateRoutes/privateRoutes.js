import React, { useContext, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import ClientContext from '../../context/client/clientContext'

const PrivateRoute = ({ component: Component, ...props }) => {
    const clientContext = useContext(ClientContext)
    const { authenticated, authenticatedClient, loading } = clientContext

    useEffect(() => {
        authenticatedClient()
        //eslint-disable-next-line
    }, [])

    return (
        <Route
            {...props}
            render={(props) =>
                !authenticated && !loading ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}
export default PrivateRoute
