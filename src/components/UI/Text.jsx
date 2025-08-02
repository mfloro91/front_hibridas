import React from 'react';

const Text = ({text, children}) => {
    return (
        <div>
            <p> {text} </p>
            {children}
        </div>
    )
}

export default Text;