const API_KEY = "2d6026fb2c6a6ef3bbbc1f81c56baf04";

function getWeatherData(
    lat,
    lon,
    setIcon,
    setMain,
    setTemp,
    setMaxTemp,
    setMinTemp,
    setDailyData,
    setHourlyData,
    setIsError
) {
    // Get all the weather data (current, hourly for current day, and daily)
    return fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts,minutely&appid=${API_KEY}`
    )
        .then((res) => res.json())
        .then((response) => {
            // Current weather
            setIsError(false);
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
        })
        .catch(() => {
            setIsError(true);
        });
}

function getLocationData(lat, lon, setCity, setCountry, setIsError) {
    // Get the city and country name for the requested coordinates
    return fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    )
        .then((res) => res.json())
        .then((response) => {
            setIsError(false);
            setCity(response[0].name);
            setCountry(response[0].country);
        })
        .catch(() => {
            setIsError(true);
        });
}

export { getWeatherData, getLocationData };
