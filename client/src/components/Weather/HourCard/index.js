import Icon from "../Icon";
import styles from "./style.module.scss";

var moment = require("moment");

function HourCard(props) {
    let dt = props.hour.dt;
    let date = new Date(dt * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return (
        <div className={styles.hourCard}>
            <div className={styles.time}>{moment(formattedTime, "HH:mm:ss").format("hh:mma")}</div>
            <div className={styles.icon}>
                <Icon icon={props.hour.weather[0].icon} />
            </div>
            <div className={styles.temp}>{Math.floor(props.hour.temp)}°C</div>
        </div>
    );
}

export default HourCard;
