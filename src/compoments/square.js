import React from 'react';
import ReactDOM from 'react-dom';

function Square(props) {
    return (
        <button 
            key={props.index} 
            className="square" 
            onClick={() => props.onClick()}
            style={props.highlight ? {backgroundColor: "yellow"} : {}}>
            {props.value}
        </button>
    );
}

export {Square};