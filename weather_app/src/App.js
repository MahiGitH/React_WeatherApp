
import React, { useState } from 'react';

const api = {
  key: "92443a69f31a3fb5a0339dc045da1ad5",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery]= useState('');
  const [weather, setWeather] =useState({});

  const search = evt => {
    if (evt.key === "Enter") {
     fetch(`${api.base}weather?zip=${query}&units=imperial&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');   

       });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day =days[d.getDay()];
    let date = d.getDate();
    let month =months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();
    
  return `${day} ${date} ${month} ${year} 
          
          ${hour}:${min}:${sec}`

}
  return (
    <div className="app">
      <header className='App-header'>
        <h1>React Weather App</h1>
        </header>
        <main>
        <div className='search-box'>
          <input type='text'
          className='search-bar'
          placeholder='search weather by zipcode'
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
        <div className='location-container'>
          <div className='city'>{weather.name}, {weather.sys.country}</div>
          <div className='date'>{dateBuilder(new Date())}</div>
        </div>
        <div className='weather-container'>
          <div className='temp'>
          {Math.round(weather.main.temp)}<span>°F</span>
          </div>
          <div className='icon'>
            <img className='weather-icon'
            src={'https://openweathermap.org/img/wn/' + weather.weather[0].icon + '.png'}
            alt={weather.weather[0].main}
            />
          </div>
          <div className='weather-condition'>{weather.weather[0].main}</div>
          <div className='hi-lo'>L:{Math.round(weather.main.temp_min)}°F / H:{Math.round(weather.main.temp_max)}°F</div>
          <div className='humidity'>Humidity:{weather.main.humidity}%</div>
          <div className='windspeed'> Wind Speed: {weather.wind.speed}mph</div>
          <div className='feelslike'>Feels Like: {weather.main.feels_like}</div>
        </div>
        </div>
        ) : ('')}
        </main>
        
        <footer>Page Created by Mahlite Tsegaye</footer>
    </div>
  );
}

export default App;
