import React, { useState, useEffect } from "react";
import DayCard from "./DayCard/index.js";
import HourCard from "./HourCard/index.js";
import Icon from "./Icon/index.js";
import styles from "./style.module.scss";

const API_KEY = "2d6026fb2c6a6ef3bbbc1f81c56baf04";

const aucklandCoords = { lat: -36.85, lon: 174.76 };

function Weather() {
    const [rangeId, setRangeId] = useState(undefined);
    const [main, setMain] = useState(undefined);
    const [celsius, setCelsius] = useState(undefined);
    const [maxTemp, setMaxTemp] = useState(null);
    const [minTemp, setMinTemp] = useState(null);
    const [description, setDescription] = useState("");
    const [dailyData, setDailyData] = useState([]);
    const [hourlyData, SetHourlyData] = useState([]);
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [isNight, setIsNight] = useState(false);

    /* the getWeatherIcon functions set the weather icon based on the weather condition codes
       see https://openweathermap.org/weather-conditions for more details
       cloud drizzle icon needs pro plan, so the cloud rain icon is used instead
    */

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

    const getWeatherData = (lat, lon) => {
        // get all the weather data (current, hourly for current day, and daily)
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&appid=${API_KEY}`
        )
            .then((res) => res.json())
            .then((response) => {
                console.log(response);
                setMain(response.current.weather[0].main);
                console.log(response.current.weather[0].main);
                setCelsius(toCelsius(response.current.temp));
                setMaxTemp(toCelsius(response.daily[0].temp.max));
                setMinTemp(toCelsius(response.daily[0].temp.min));
                setDescription(response.current.weather[0].description);
                //getWeatherIcon(response.current.weather[0].id);
                setRangeId(response.current.weather[0].description);
                setIsNight(response.current.weather[0].icon.charAt(2) == "n");
                // setIconURL(
                //     `http://openweathermap.org/img/wn/${response.current.weather[0].icon}@2x.png`
                // );

                let hourArray = response.hourly.slice(0, 6);
                SetHourlyData(hourArray);

                const dailyData = response.daily.slice(1, 6);
                setDailyData(dailyData);
            });

        // get the city and country name for the requested coordinates
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
        let lat = 0;
        let lon = 0;
        // problem with putting number into api string instead of string
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;

                    getWeatherData(lat, lon);
                },
                function onError() {
                    getWeatherData(aucklandCoords.lat, aucklandCoords.lon);
                }
            );
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
                        <div className={styles.iconContainer}>
                            <Icon rangeId={rangeId} />
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
