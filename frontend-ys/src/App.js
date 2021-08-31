import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.scss'

import PrivateRoute from './components/privateRoutes/privateRoutes'
import AppState from './context/app/appState'
import ClientState from './context/client/clientState'

/*SECCIONES*/
import HomePage from './containers/homePage/HomePage'
import Configuration from './containers/configuration/ConfigurationContainer'

import ArticleType from './containers/articleType/ArticleTypeContainer'
import Articule from './containers/articule/ArticuleContainer'
import Branch from './containers/branch/BranchContainer'
import NewArticule from './containers/articule/NewArticule'
import Market from './containers/market/MarketContainer'
import Pucharse from './containers/market/Pucharse'
import Receipts from './containers/receipt/ReceiptContainer'
import ReceiptsAdmin from './containers/receiptAdmin/ReceiptAdminContainer'
import Orders from './containers/orders/Orders'
import Offers from './containers/offer/OfferContainer'
import Admin from './containers/admin/AdminContainer'
import Delivery from './containers/admin/file/DeliveryContainer'
import Public from './containers/admin/file/PublicContainer'

import Header from './containers/header/HeaderContainer'
// import Footer from './containers/footer/Footer'

const App = ({ showModal }) => {
    return (
        <AppState>
            <ClientState>
                <div className="app-container">
                    <Router>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <PrivateRoute
                                exact
                                path="/configuracion"
                                component={Configuration}
                            />
                            <PrivateRoute
                                exact
                                path="/admin"
                                component={Admin}
                            />
                            <PrivateRoute
                                exact
                                path="/tipoarticulo"
                                component={ArticleType}
                            />
                            <PrivateRoute
                                exact
                                path="/articulo"
                                component={Articule}
                            />
                            <Route exact path="/mercado" component={Market} />
                            <Route exact path="/compra" component={Pucharse} />
                            <Route exact path="/orders" component={Orders} />
                            <Route exact path="/branches" component={Branch} />
                            <PrivateRoute
                                exact
                                path="/comprobantes"
                                component={Receipts}
                            />
                            <PrivateRoute
                                exact
                                path="/comprobantesadmin"
                                component={ReceiptsAdmin}
                            />
                            <PrivateRoute
                                exact
                                path="/creararticulo"
                                component={NewArticule}
                            />
                            <PrivateRoute
                                exact
                                path="/ofertas"
                                component={Offers}
                            />
                            <Route
                                exact
                                path="/escritorio"
                                component={Delivery}
                            />
                            <Route exact path="/publico" component={Public} />
                        </Switch>
                    </Router>
                </div>
                {/* <Footer/> */}
            </ClientState>
        </AppState>
    )
}

export default App
