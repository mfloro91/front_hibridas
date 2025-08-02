import React from 'react';

const Button = ({text, style, variant, onClick}) => {
    return (
        <button style={style} className={'btn btn-'+variant} onClick={onClick}> {text} </button>
    )
}

export default Button;