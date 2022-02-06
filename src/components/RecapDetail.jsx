import { useState } from "react";

import '../App.scss';


const RecapDetail = ({ month, documents, percentage, amount, ...props }) => {

    return (
        <div className="recap-detail" style={props.style} {...props}>
            <div className="recap-detail__month">
                <p>{month}</p>
            </div>
            <div className="recap-detail__invoice">
                <p className="recap-detail__docs">{documents} doc.</p>
                <p className="recap-detail__amount">{amount}€</p>
                <div className="recap-detail__level"></div>
            </div>
        </div>
    );
}

export default RecapDetail;