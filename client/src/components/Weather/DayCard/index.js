import Icon from "../Icon/index";
import styles from "./DayCard.module.scss";

var moment = require("moment");

function DayCard(props) {
    const toCelsius = (temp) => {
        const kelvinToCelsiusDiff = 273.15;
        return Math.floor(temp - kelvinToCelsiusDiff);
    };

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayNum = new Date(props.day.dt * 1000).getDay();
    var result = days[dayNum];

    return (
        <div className={styles.card}>
            <div className={styles.day}>{result}</div>
            <div className={styles.iconContainer}>
                <Icon icon={props.day.weather[0].icon} />
            </div>

            <div className={styles.lowTemp}>{toCelsius(props.day.temp.min)}°C</div>
            <div className={styles.highTemp}>{toCelsius(props.day.temp.max)}°C</div>
        </div>
    );
}

export default DayCard;
