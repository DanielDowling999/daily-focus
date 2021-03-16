import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import './weatherStyle.css';




const API_KEY = "8e20c3b423d1a8139959af74dcb9cba2";
//const BASE = "https://api.openweathermap.org/data/2.5/";


class Weather extends React.Component {
    constructor() {
      super();
      this.state = {
        icon: undefined,
        main: undefined,
        celsius: undefined,
        temp_max: null,
        temp_min: null,
        description: "",
        error: false
      };
  
      this.weatherIcon = {
        Thunderstorm: <FontAwesomeIcon icon={faBolt} />,
        //Drizzle: "wi-sleet",
        Rain: <FontAwesomeIcon icon = {faCloudRain} />,
        Snow:  <FontAwesomeIcon icon={faSnowflake} />,
        Atmosphere: <FontAwesomeIcon icon={faSmog} />,
        Clear: <FontAwesomeIcon icon={faSun} />,
        Clouds: <FontAwesomeIcon icon={faCloud} />,
      };
    }
    
    /* the get_WeatherIcon functions set the weather icon based on the weather condition codes
       see https://openweathermap.org/weather-conditions for more details
    */
    get_WeatherIcon(icons, rangeId) {
      switch (true) {
        case rangeId >= 200 && rangeId < 232:
          this.setState({ icon: icons.Thunderstorm });
          break;
        case rangeId >= 300 && rangeId <= 321:
          this.setState({ icon: icons.Rain });
          break;
        case rangeId >= 500 && rangeId <= 521:
          this.setState({ icon: icons.Rain });
          break;
        case rangeId >= 600 && rangeId <= 622:
          this.setState({ icon: icons.Snow });
          break;
        case rangeId >= 701 && rangeId <= 781:
          this.setState({ icon: icons.Atmosphere });
          break;
        case rangeId === 800:
          this.setState({ icon: icons.Clear });
          break;
        case rangeId >= 801 && rangeId <= 804:
          this.setState({ icon: icons.Clouds });
          break;
        default:
          this.setState({ icon: icons.Clouds });
      }
    }
  
    toCelsius(temp) {
      let cell = Math.floor(temp - 273.15);
      return cell;
    }

  
  
    componentDidMount() {
        let response = null;
        fetch( `http://api.openweathermap.org/data/2.5/weather?q=Auckland&appid=${API_KEY}` )
            .then(res => res.json())
            .then(response => {
                this.setState({
          
                    main: response.weather[0].main,
                    celsius: this.toCelsius(response.main.temp),
                    temp_max: this.toCelsius(response.main.temp_max),
                    temp_min: this.tpCelsius(response.main.temp_min),
                    description: response.weather[0].description,
                    error: false
                  });
                this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
        });
  
       
    } 
    
  
    render() {
     
      return (
        <div className="container">
            
                <div className="weather-text-box">
                    <div className="weather-text">Weather</div>
                </div>

                <div className="current-weather-box">
            
                    <div className="icon-container">
                        
                        {this.state.icon}
                    </div>

                    <div className="discription">
                        <div className="weather-NZ">{this.state.description}|Auckland, NZ</div>
                        <div className="temp">{this.state.celsius}°C</div>
                        <div className = "temp-bounds">L:{this.state.temp_min}°C|H:{this.state.temp_max}°C</div>
                    </div>
                   
                </div>
        </div>
        

    
     )
    }
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