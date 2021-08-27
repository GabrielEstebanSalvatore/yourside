import React from 'react'

const Input = ({title, onChange, currency, value, type, disabled,readOnly,placeholder,data,name,className}) => {

    return ( <div className='input'>
            <span>{title}</span>
            <div className='input__button'>
                <input  className={className}
                    type={type}
                    disabled = {disabled}
                    onChange={onChange}
                    value={value}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    data={data}
                    name={name}
                    />
                {currency && <span>{currency}</span>}
            </div>
        </div>
    )
}

export default Input;