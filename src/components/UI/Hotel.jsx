import React from "react";

const Hotel = ({ hotel, description }) => {
    return (
        <div>
            <h2>{hotel}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Hotel;