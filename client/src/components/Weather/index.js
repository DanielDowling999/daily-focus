import React from 'react';
import ReactDOM from 'react-dom';


//import reportWebVitals from './reportWebVitals';


function Weather(){
    fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "03362c6895mshe01f021e4d96355p11c191jsn9742ca4cc8ad",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
	}
    })
    .then(response => {
	console.log(response);
    })
    .catch(err => {
	console.error(err);
    });
    return (
        <div className="weather">
            <h1> Today's Weather</h1>
        </div>
    
    )
}






export default Weather;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
