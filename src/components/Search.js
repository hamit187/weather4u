import { useState, useEffect } from "react";

import classes from './search.module.scss';

const apiKey = process.env.REACT_APP_API_KEY;

let initialRender = true;

const Search = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeather = async() => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`);
    const data = await response.json();
    setWeather(data);
    console.log(data);
  }

  useEffect(() => {
    if(initialRender){
        initialRender = false;
        return;
    }

    if(!city){
        return;
    }
    let timer = setTimeout(() => getWeather(), 500);

    return () => {
        clearTimeout(timer);
    };
  }, [city]);

  return (
  <div className={classes.container}>
    <main>
      <div className={classes.search}>
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div className={classes.weather_box}>
            <div className={classes.location}>
              {weather.name}, {weather.sys.country}
            </div>
          <div className={classes.weather_stats}>
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].description}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  </div>
  );
};

export default Search;
