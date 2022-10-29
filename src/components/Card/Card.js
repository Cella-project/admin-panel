import React from "react";
import '../../assets/styles/mainStyles.css';
import './Card.css';

const Card = (props) => {
    return(
        props.cards.map( (card, index) => {
            return (
                <div key={index} className="card shadow inline-block white-bg">
                    <p className="card-header inter weight600 mint-green-bg white-color flex align-items-center justify-content-center font15">{card.title}</p>
                    <span className="card-content flex align-items-center justify-content-center font30 open-sans weight700">
                        {card.icon}
                        <p className="card-header">
                            {card.content}
                        </p>
                    </span>
                </div>
            );      
        })
    )

}

export default Card;