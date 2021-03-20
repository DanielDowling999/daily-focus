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
    Thunderstorm: <FontAwesomeIcon icon={faBolt} className={styles.faColor} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} className={styles.faColor} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} className={styles.faColor} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} className={styles.faColor} />,
    Clear: <FontAwesomeIcon icon={faSun} className={styles.faColor} />,
    Clouds: <FontAwesomeIcon icon={faCloud} className={styles.faColor} />,
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
        const kelvinToCelsiusDiff = 273.15;
        let cell = Math.floor(temp - kelvinToCelsiusDiff);
        return cell;
    };

    var i = 0;
    var data = { list: [{ dt: 1522666800 }] };

    var days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    var dayNum = new Date(props.day.dt * 1000).getDay();
    var result = days[dayNum];
    console.log(result);

    useEffect(() => {
        getWeatherIcon(props.day.weather[0].id);
    });

    return (
        <div className={styles.card}>
            <div className={styles.day}>{result}</div>
            <div className={styles.iconContainer}>{icon}</div>

            <div className={styles.lowTemp}>{toCelsius(props.day.main.temp_min)} °C</div>
            <div className={styles.highTemp}>{toCelsius(props.day.main.temp_max)} °C</div>
        </div>
    );
}

export default DayCard;
