import { getLocationData } from "./WeatherService";
import { getWeatherData } from "./WeatherService";
const AUCKLAND_COORDS = { lat: -36.85, lon: 174.76 };
// simple functions for testing the fetches
let city = "notAuckland";
let country = "notNZ";
let isError = true;
let icon;
let main;
let temp;
let maxTemp;
let minTemp;
let dailyData;
let hourlyData;

function setCity(newCity) {
    city = newCity;
}
function setCountry(newCountry) {
    country = newCountry;
}
function setIsError(newError) {
    isError = newError;
}
function setIcon(newIcon) {
    icon = newIcon;
}
function setMain(newMain) {
    main = newMain;
}
function setTemp(newTemp) {
    temp = newTemp;
}
function setMaxTemp(newMax) {
    maxTemp = newMax;
}
function setMinTemp(newMin) {
    minTemp = newMin;
}
function setDailyData(newDailyData) {
    dailyData = newDailyData;
}
function setHourlyData(newHourlyData) {
    hourlyData = newHourlyData;
}

test("Testing location endpoints", () => {
    return getLocationData(
        AUCKLAND_COORDS.lat,
        AUCKLAND_COORDS.lon,
        setCity,
        setCountry,
        setIsError
    ).then(() => {
        //Tests can only be ran in auckland, nz.
        expect(city).toEqual("Auckland");
        expect(isError).toEqual(false);
        expect(country).toEqual("NZ");
    });
});

test("Testing the weather endpoints", () => {
    return getWeatherData(
        AUCKLAND_COORDS.lat,
        AUCKLAND_COORDS.lon,
        setIcon,
        setMain,
        setTemp,
        setMaxTemp,
        setMinTemp,
        setDailyData,
        setHourlyData,
        setIsError
    ).then(() => {
        // tests simply ensure that the endpoints are working. Cannot test deeper without mocking, but snapshot
        // should handle everything we need to mock.
        expect(icon).not.toEqual(undefined);
        expect(main).not.toEqual(undefined);
        expect(temp).not.toEqual(undefined);
        expect(maxTemp).not.toEqual(undefined);
        expect(minTemp).not.toEqual(undefined);
        expect(hourlyData).not.toEqual(undefined);
        expect(dailyData).not.toEqual(undefined);
    });
});
