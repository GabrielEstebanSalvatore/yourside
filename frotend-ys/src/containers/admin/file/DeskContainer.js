import React from 'react'
import { Link } from 'react-router-dom'

const DeskContainer = () => {
    return (
        <div class="col-6">
            <form action="escritorio" target="_blank">
                <input name="escritorio" type="number" class="form-control" placeholder="Escritorio" autofocus required/>

                <button type="submit" class="btn btn-primary">
                    Ingresar
                </button>
            </form>
            <Link className="nav-item" target="_blank"to="/publico">
                    Publico 
            </Link>
        </div>
    )
}

export default DeskContainer;