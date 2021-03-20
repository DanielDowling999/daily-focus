import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import styles from "./DayCard.module.scss";

var moment = require("moment");

const weatherIcon = {
    Thunderstorm: <FontAwesomeIcon icon={faBolt} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} />,
    Clear: <FontAwesomeIcon icon={faSun} />,
    Clouds: <FontAwesomeIcon icon={faCloud} />,
};

function DayCard(props) {
    const [icon, setIcon] = useState(undefined);

    const getWeatherIcon = (rangeId) => {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                setIcon(weatherIcon.Thunderstorm);
                break;
            case rangeId >= 300 && rangeId <= 321:
                setIcon(weatherIcon.Rain);
                break;
            case rangeId >= 500 && rangeId <= 521:
                setIcon(weatherIcon.Rain);
                break;
            case rangeId >= 600 && rangeId <= 622:
                setIcon(weatherIcon.Snow);
                break;
            case rangeId >= 701 && rangeId <= 781:
                setIcon(weatherIcon.Atmosphere);
                break;
            case rangeId === 800:
                setIcon(weatherIcon.Clear);
                break;
            case rangeId >= 801 && rangeId <= 804:
                setIcon(weatherIcon.Clouds);
                break;
            default:
                setIcon(weatherIcon.Clouds);
        }
    };

    const toCelsius = (temp) => {
        let cell = Math.floor(temp - 273.15);
        return cell;
    };

    let date = new Date();
    const weekday = props.day.dt * 1000;
    date.setTime(weekday);

    useEffect(() => {
        getWeatherIcon(props.day.weather[0].id);
    });

    return (
        <div className={styles.card}>
            <div className="day">{moment(date).format("dddd")}</div>
            <div>{icon}</div>

            <div>{toCelsius(props.day.main.temp_min)} °C</div>
            <div>{toCelsius(props.day.main.temp_max)} °C</div>
        </div>

        //<div>hi</div>
    );
}

export default DayCard;
