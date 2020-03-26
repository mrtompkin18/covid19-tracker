import React from "react";
import numeral from "numeral";
import moment from "moment";

function Card({ className = "", type, title, number = 0, lastUpdate }) {
    var cardStyle = `covid-number-card ${className} `;
    if (type == "confirmed") {
        cardStyle = `${cardStyle} covid-confirmed-card`;
    }

    const getIconType = (type) => {
        switch (type) {
            case "confirmed":
                return "images/confirmed.svg";
            case "recovered":
                return "images/recovered.svg";
            case "deaths":
                return "images/deaths.svg";
        }
    }

    return (
        <div className={cardStyle}>
            <div className="row">
                <div className="col-lg-3">
                    <img src={getIconType(type)} />
                </div>
                <div className="col-lg-9 pl-4">
                    <div className="d-flex flex-column">
                        <div className="covid-type-title">{title}</div>
                        <div className="covid-type-number">{numeral(number).format('0,0')}</div>
                        <div className="covid-type-updated">อัพเดตล่าสุด {moment(lastUpdate).format('DD-MM-YYYY HH:MM')}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Card);