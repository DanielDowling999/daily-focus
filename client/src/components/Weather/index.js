import React, { useState, useEffect } from "react";
import DayCard from "./DayCard";
import HourCard from "./HourCard";
import Icon from "./Icon";
import styles from "./style.module.scss";

const API_KEY = "2d6026fb2c6a6ef3bbbc1f81c56baf04";

const AUCKLAND_COORDS = { lat: -36.85, lon: 174.76 };

function Weather() {
    const [icon, setIcon] = useState(null);
    const [main, setMain] = useState(null);
    const [temp, setTemp] = useState(null);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [dailyData, setDailyData] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);

    const formatDayCards = (dailyData) => {
        return dailyData.map((day, index) => <DayCard day={day} key={index} />);
    };

    const formatHourCards = (hourlyData) => {
        let hourArray = hourlyData.map((hour, index) => <HourCard hour={hour} key={index} />);
        return hourArray;
    };

    const getWeatherData = (lat, lon) => {
        // Get all the weather data (current, hourly for current day, and daily)
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts,minutely&appid=${API_KEY}`
        )
            .then((res) => res.json())
            .then((response) => {
                // Current weather
                setMain(response.current.weather[0].main);
                setTemp(Math.floor(response.current.temp));
                setMaxTemp(Math.floor(response.daily[0].temp.max));
                setMinTemp(Math.floor(response.daily[0].temp.min));
                setIcon(response.current.weather[0].icon);

                // Hourly weather for next 6 hours
                const hourlyData = response.hourly.slice(0, 6);
                setHourlyData(hourlyData);

                // Daily weather for next 5 days
                const dailyData = response.daily.slice(1, 6);
                setDailyData(dailyData);
            });

        // Get the city and country name for the requested coordinates
        fetch(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
            .then((res) => res.json())
            .then((response) => {
                setName(response[0].name);
                setCountry(response[0].country);
            });
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    getWeatherData(lat, lon);
                },
                // Permission not given to access location, so default to Auckland coordinates
                function onError() {
                    getWeatherData(AUCKLAND_COORDS.lat, AUCKLAND_COORDS.lon);
                }
            );
        } else {
            getWeatherData(AUCKLAND_COORDS.lat, AUCKLAND_COORDS.lon);
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
                        <div className={styles.iconContainer}>
                            <Icon icon={icon} />
                        </div>
                        <div className={styles.description}>
                            <div className={styles.weatherNZ}>
                                {main} | {name}, {country}
                            </div>
                            <div className={styles.temp}>{temp}°C</div>
                            <div className={styles.tempBounds}>
                                L:{minTemp}°C | H:{maxTemp}°C
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
