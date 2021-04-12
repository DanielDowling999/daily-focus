import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.scss";

const weatherIcon = {
    Thunderstorm: <FontAwesomeIcon icon={faBolt} className={styles.faColor} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} className={styles.faColor} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} className={styles.faColor} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} className={styles.faColor} />,
    ClearDay: <FontAwesomeIcon icon={faSun} className={styles.faColor} />,
    ClearNight: <FontAwesomeIcon icon={faMoon} className={styles.faColor} />,
    Clouds: <FontAwesomeIcon icon={faCloud} className={styles.faColor} />,
};

/* the getWeatherIcon functions set the weather icon based on the weather condition codes
   see https://openweathermap.org/weather-conditions for more details
   cloud drizzle icon needs pro plan, so the cloud rain icon is used instead
*/
function Icon(props) {
    // the last character of the icon string is 'n' or 'd' where n means its night
    const isNight = props.icon.charAt(2) == "n";

    let icon;
    switch (true) {
        case props.rangeId >= 200 && props.rangeId < 232:
            icon = weatherIcon.Thunderstorm;
            break;
        case props.rangeId >= 300 && props.rangeId <= 321:
            icon = weatherIcon.Rain;
            break;
        case props.rangeId >= 500 && props.rangeId <= 521:
            icon = weatherIcon.Rain;
            break;
        case props.rangeId >= 600 && props.rangeId <= 622:
            icon = weatherIcon.Snow;
            break;
        case props.rangeId >= 701 && props.rangeId <= 781:
            icon = weatherIcon.Atmosphere;
            break;
        case props.rangeId === 800:
            console.log("hey");
            if (isNight) {
                icon = weatherIcon.ClearNight;
            } else {
                icon = weatherIcon.ClearDay;
            }
            break;
        case props.rangeId >= 801 && props.rangeId <= 804:
            icon = weatherIcon.Clouds;
            break;
        default:
            console.log(props.rangeId);
            icon = weatherIcon.Clouds;
    }
    const [iconImage, setIconImage] = useState(icon);

    return <div>{iconImage}</div>;
}

export default Icon;
