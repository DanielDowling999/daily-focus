import React, { useState, useEffect } from "react";
import DayCard from "./DayCard/index.js";
import HourCard from "./HourCard/index.js";
import Icon from "./Icon/index.js";
import styles from "./style.module.scss";

const API_KEY = "2d6026fb2c6a6ef3bbbc1f81c56baf04";

const aucklandCoords = { lat: -36.85, lon: 174.76 };

function Weather() {
    const [icon, setIcon] = useState("04d");
    const [main, setMain] = useState(undefined);
    const [celsius, setCelsius] = useState(undefined);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [description, setDescription] = useState("");
    const [dailyData, setDailyData] = useState([]);
    const [hourlyData, SetHourlyData] = useState([]);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);

    const toCelsius = (temp) => {
        const kelvinToCelsiusDiff = 273.15;
        return Math.floor(temp - kelvinToCelsiusDiff);
    };

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
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=${API_KEY}`
        )
            .then((res) => res.json())
            .then((response) => {
                // Current weather
                setMain(response.current.weather[0].main);
                setCelsius(toCelsius(response.current.temp));
                setMaxTemp(toCelsius(response.daily[0].temp.max));
                setMinTemp(toCelsius(response.daily[0].temp.min));
                setDescription(response.current.weather[0].description);
                setIcon(response.current.weather[0].icon);
                console.log(response);

                // Hourly weather for next 6 hours
                const hourArray = response.hourly.slice(0, 6);
                SetHourlyData(hourArray);

                // Daily weather for next 5 days
                const dailyData = response.daily.slice(1, 6);
                setDailyData(dailyData);
            });

        // Get the city and country name for the requested coordinates
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
            .then((res) => res.json())
            .then((response) => {
                setName(response.name);
                setCountry(response.sys.country);
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
                    getWeatherData(aucklandCoords.lat, aucklandCoords.lon);
                }
            );
        } else {
            getWeatherData(aucklandCoords.lat, aucklandCoords.lon);
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
                            <div className={styles.temp}>{celsius}°C</div>
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
