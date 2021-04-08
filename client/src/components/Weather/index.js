import React, { useState, useEffect } from "react";
import DayCard from "./DayCard/index.js";
import HourCard from "./HourCard/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faCloudRain } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.scss";

const API_KEY = "2d6026fb2c6a6ef3bbbc1f81c56baf04";

const weatherIcon = {
    Thunderstorm: <FontAwesomeIcon icon={faBolt} className={styles.faColor} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} className={styles.faColor} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} className={styles.faColor} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} className={styles.faColor} />,
    Clear: <FontAwesomeIcon icon={faSun} className={styles.faColor} />,
    Clouds: <FontAwesomeIcon icon={faCloud} className={styles.faColor} />,
};

function Weather() {
    const [icon, setIcon] = useState(undefined);
    const [main, setMain] = useState(undefined);
    const [celsius, setCelsius] = useState(undefined);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [description, setDescription] = useState("");
    const [dailyData, setDailyData] = useState([]);
    const [hourlyData, SetHourlyData] = useState([]);

    /* the get_WeatherIcon functions set the weather icon based on the weather condition codes
       see https://openweathermap.org/weather-conditions for more details
       cloud drizzle icon needs pro plan, so the cloud rain icon is used instead
    */
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

    const formatDayCards = (dailyData) => {
        return dailyData.map((day, index) => <DayCard day={day} key={index} />);
    };

    const formatHourCards = (hourlyData) => {
        let hourArray = hourlyData.map((hour, index) => <HourCard hour={hour} key={index} />);
        return hourArray;
    };

    useEffect(() => {
        let lat = 0;
        let lon = 0;
        // problem with putting number into api string instead of string
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude.toFixed(2);
                lon = position.coords.longitude.toFixed(2);

                // get the current weather data and update state
                fetch(
                    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
                )
                    .then((res) => res.json())
                    .then((response) => {
                        setMain(response.weather[0].main);
                        setCelsius(toCelsius(response.main.temp));
                        setMaxTemp(toCelsius(response.main.temp_max));
                        setMinTemp(toCelsius(response.main.temp_min));
                        setDescription(response.weather[0].main);
                        getWeatherIcon(response.weather[0].id);
                    });

                // get the 5-day weather forecast data (each day at 12:00 pm) and update state
                fetch(
                    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const dailyData = data.list.filter((reading) =>
                            reading.dt_txt.includes("12:00:00")
                        );
                        //console.log(dailyData);
                        setDailyData(dailyData);
                    });

                //get the 6 hours weather forecast data and update state
                fetch(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        let hourArray = data.hourly.slice(0, 6);

                        SetHourlyData(hourArray);
                    });
            });
        } else {
            console.log("Not Available");
        }
    }, []);

    return (
        <div className={styles.weatherWidget}>
            <div className={styles.container}>
                <div className={styles.headerRectangle}>
                    <div className={styles.weatherTextBox}>Weather</div>
                </div>
                <div className={styles.content}>
                    <div className={styles.currentWeatherBox}>
                        <div className={styles.iconContainer}>{icon}</div>
                        <div className={styles.description}>
                            <div className={styles.weatherNZ}>{description}|Auckland, NZ</div>
                            <div className={styles.temp}>{celsius}°C</div>
                            <div className={styles.tempBounds}>
                                L:{minTemp}°C|H:{maxTemp}°C
                            </div>
                        </div>
                    </div>
                    <div className={styles.hourlyForecast}>{formatHourCards(hourlyData)}</div>
                    <div className={styles.dailyForecast}>{formatDayCards(dailyData)}</div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
