import Icon from "../Icon";
import styles from "./style.module.scss";

function DayCard(props) {
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dayNum = new Date(props.day.dt * 1000).getDay();
    var result = days[dayNum];

    return (
        <div className={styles.card}>
            <div className={styles.day}>{result}</div>
            <div className={styles.iconContainer}>
                <Icon icon={props.day.weather[0].icon} />
            </div>

            <div className={styles.lowTemp}>{Math.floor(props.day.temp.min)}°C</div>
            <div className={styles.highTemp}>{Math.floor(props.day.temp.max)}°C</div>
        </div>
    );
}

export default DayCard;
