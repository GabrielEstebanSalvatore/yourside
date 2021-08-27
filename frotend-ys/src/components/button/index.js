import React from 'react'

const Button = ({title, onClick, disabled}) => {
    return (
        <div className='button' onClick={onClick} disabled={disabled}>
            {title} 
        </div>
    )
}

export const ButtonCancel = ({title, onClick,icon}) => {
    return (
        <div className='button_cancel' onClick={onClick}>
           {icon} {title}
        </div>
    )
}
export const ButtonNav = ({title, onClick,classN }) => {
    return (
        <div className={classN} onClick={onClick}>
            {title}
        </div>
    )
}

export const ButtonPrincipal = ({title, onClick }) => {
    return (
        <div className='button_Principal' onClick={onClick}>
            {title}
        </div>
    )
}

export const ButtonItemView = ({icon, onClick,title }) => {
    return (
        <div className='button_ItemView' onClick={onClick} >
            {icon} <strong>{title}</strong>
        </div>
    )
}

export const ButtonSubmit = ({icon, onClick,title,type }) => {
    return (
        <button className='button_submit' onClick={onClick} type={type}>
            {icon} <strong>{title}</strong>
        </button>
    )
}

export default Button;