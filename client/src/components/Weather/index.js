import React, { useState, useEffect } from "react";

import DayCard from "./DayCard/index.js";
import HourCard from "./HourCard/index.js";

import ReactDOM from "react-dom";
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
    Thunderstorm: <FontAwesomeIcon icon={faBolt} />,
    Rain: <FontAwesomeIcon icon={faCloudRain} />,
    Snow: <FontAwesomeIcon icon={faSnowflake} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} />,
    Clear: <FontAwesomeIcon icon={faSun} />,
    Clouds: <FontAwesomeIcon icon={faCloud} />,
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
        let cell = Math.floor(temp - 273.15);
        return cell;
    };

    const formatDayCards = (dailyData) => {
        //return dailyData.map((day, index) => <DayCard day = {day} key={index} />);
        return dailyData.map((day) => <DayCard day={day} />);
    };

    const formatHourCards = (hourlyData) => {
        let hourArray = hourlyData.map((hour) => <HourCard hour={hour} />);
        return hourArray;
    };

    useEffect(() => {
        // get the current weather data and update state
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${API_KEY}`)
            .then((res) => res.json())
            .then((response) => {
                //console.log(response);
                setMain(response.weather[0].main);
                setCelsius(toCelsius(response.main.temp));
                setMaxTemp(toCelsius(response.main.temp_max));
                setMinTemp(toCelsius(response.main.temp_min));
                setDescription(response.weather[0].description);
                getWeatherIcon(response.weather[0].id);
            });

        // get the 5-day weather forecast data (each day at 12:00 pm) and update state
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Auckland&appid=${API_KEY}`)
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
            `https://api.openweathermap.org/data/2.5/onecall?lat=-36.85&lon=174.76&exclude=current,minutely,daily,alerts&appid=${API_KEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                //hconsole.log(data.hourly[0].dt);
                // let dt = data.hourly[0].dt;
                //var date = new Date(dt * 1000);
                // Hours part from the timestamp
                //var hours = date.getHours();
                //console.log(hours);
                let hourArray = data.hourly.slice(0, 6);
                //console.log(hourArray);
                SetHourlyData(hourArray);

                //console.log(data[0]);
            });
    }, []);

    return (
        <div className={styles.weatherWidget}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.weatherTextBox}>
                        <div className={styles.weatherText}>Weather</div>
                    </div>
                </div>

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
    );
}

export default Weather;
