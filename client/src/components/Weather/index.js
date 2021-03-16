import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const API_KEY = "8e20c3b423d1a8139959af74dcb9cba2";
const weatherIcon = {
    Thunderstorm: <FontAwesomeIcon icon={faBolt} />,
    Rain: <FontAwesomeIcon icon = {faCloudRain} />,
    Snow:  <FontAwesomeIcon icon={faSnowflake} />,
    Atmosphere: <FontAwesomeIcon icon={faSmog} />,
    Clear: <FontAwesomeIcon icon={faSun} />,
    Clouds: <FontAwesomeIcon icon={faCloud} />,
}

function Weather()  {
    

    const [icon,setIcon] = useState(undefined);
    const [main,setMain] = useState(undefined);
    const [celsius, setCelsius] = useState(undefined);
    const [temp_max, setMaxTemp] = useState(null);
    const [temp_min, setMinTemp] = useState(null);
    const [description, setDescription] = useState("");
   
    /* the get_WeatherIcon functions set the weather icon based on the weather condition codes
       see https://openweathermap.org/weather-conditions for more details
       cloud drizzle icon needs pro plan, so the cloud rain icon is used instead
    */
    const get_WeatherIcon = (rangeId) => {
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
    }
    
  
    const toCelsius = (temp) => {
      let cell = Math.floor(temp - 273.15);
      return cell;
    }

   useEffect(() =>{
        fetch( `http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${API_KEY}` )
            .then(res => res.json())
            .then(response => {
                    setMain(response.weather[0].main);
                    setCelsius(toCelsius(response.main.temp));
                    setMaxTemp(toCelsius(response.main.temp_max));
                    setMinTemp(toCelsius(response.main.temp_min));
                    setDescription(response.weather[0].description);
                    get_WeatherIcon(response.weather[0].id);
                  });

    },[]);
    
    return (
        <div className="container">
            
                <div className="weather-text-box">
                    <div className="weather-text">Weather</div>
                </div>

                <div className="current-weather-box">
            
                    <div className="icon-container">
                        {icon}
                    </div>

                    <div className="discription">
                        <div className="weather-NZ">{description}|Auckland, NZ</div>
                        <div className="temp">{celsius}°C</div>
                        <div className = "temp-bounds">L:{temp_min}°C|H:{temp_max}°C</div>
                    </div>
                   
                </div>
        </div>
        
     )
    
  }


export default Weather;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


//console.log(today);
//import reportWebVitals from './reportWebVitals';


/*let today = new Date();
/*const dateFormatter = (d) =>{

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
}*/