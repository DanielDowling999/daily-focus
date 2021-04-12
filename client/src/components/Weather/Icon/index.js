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

function Icon(rangeId) {
    //const [iconImage, setIconImage] = useState(weatherIcon.Thunderstorm);

    let icon;
    switch (true) {
        case rangeId >= 200 && rangeId < 232:
            icon = weatherIcon.Thunderstorm;
            break;
        case rangeId >= 300 && rangeId <= 321:
            icon = weatherIcon.Rain;
            break;
        case rangeId >= 500 && rangeId <= 521:
            icon = weatherIcon.Rain;
            break;
        case rangeId >= 600 && rangeId <= 622:
            icon = weatherIcon.Snow;
            break;
        case rangeId >= 701 && rangeId <= 781:
            icon = weatherIcon.Atmosphere;
            break;
        case rangeId === 800:
            icon = weatherIcon.Clear;
            break;
        case rangeId >= 801 && rangeId <= 804:
            icon = weatherIcon.Clouds;
            break;
        default:
            icon = weatherIcon.Clouds;
    }
    // setIconImage(icon);

    return <div>{icon}</div>;
}

export default Icon;
