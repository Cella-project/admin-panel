import React from "react";
import '../../../assets/styles/style.scss';
import './Card.scss';

const Card = (props) => {
    return(
        props.cards.map( (card, index) => {
            return (
                <div key={index} className="card shadow-2px radius-15px white-bg">
                    <p className="card-header no-margin inter font-bold mint-green-bg white flex-row-center size-14px">{card.title}</p>
                    <span className="card-content flex-row-center size-30px open-sans font-bold">
                        {card.icon}
                        <p className="card-header no-margin">
                            {card.content}
                        </p>
                    </span>
                </div>
            );      
        })
    )

}

export default Card;