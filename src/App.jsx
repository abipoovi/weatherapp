import { useState } from 'react'
import {FaSearch,FaTint,FaWind,FaEye} from 'react-icons/fa';
import {WiThermometer,WiBarometer} from 'react-icons/wi';
import {MdAccessTime} from "react-icons/md"
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";

import './App.css'

function App() {
  const [city,setCity]=useState("")
  const [weather,setWeather]=useState(null)
  const [loading,setLoading]=useState(false)
  const getweather=async()=>{
    setWeather(null);
    setLoading(true);
    const apikey="0d06f2bc30bd4ec1bf955729262206";
    const response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=3`)
    const data=await response.json();
    if (data.error){
      setCity("");
      alert("City not found");
      setLoading(false)
      return;
    }
    setWeather(data);
    setLoading(false);
  }
  const chartdata=weather? weather.forecast.forecastday[0].hour.map((data)=>({
    temp:data.temp_c,
    time : data.time.split(" ")[1]
  })):[];



  return (
    <div className='container'>
      <div className='head'>
        <h1>Weather App</h1>
        <p>Get the latest Weather Updates</p>
        </div>
        <div className='searchbox'>
        <input type="text" placeholder='Enter a city name' value={city} onChange={(e)=>{setCity(e.target.value)}} onKeyDown={(e)=>{if(e.key=="Enter"){getweather();}}}/>
        <button onClick={getweather}><FaSearch/>Search</button>
        </div>
      
      {/* {!weather && (
        <div className='empty'>
          <h2>Weather dashboard</h2>
          <p>Search for a city to view weather details</p>
          </div>
      )} */}
      {loading ? (
  <div className="empty">
    <h2>Loading...</h2>
  </div>
) : !weather ? (
  <div className="empty">
    <h2>Weather Dashboard</h2>
    <p>Search for a city to view weather details</p>
  </div>
) : null}
      
      {weather && (
        <div className='Climatedetails'>
        <div className='Locationdetails'>
          <h2>{weather.location.name}</h2>
          <div className='weathericon'>
             <img src={weather.current.condition.icon} alt="weather icon"></img>
             <div>
             <h3><span>{weather.current.temp_c}</span><br/>degree Celsius</h3>
             <p>{weather.current.condition.text}</p>
             </div>
          </div>
           <p className='climdate'><MdAccessTime/>{weather.location.localtime}</p>
        </div>
        <div className='weatherdetails'>
          <h2>Weather Details</h2>
          <div className='detailcard'>
            <div className='cardcont'><FaTint/><h1>Humidity</h1></div><p>{weather.current.humidity}%</p>
          </div>
          <div className='detailcard'>
            <div className='cardcont'><FaWind className='img'/><h1>Wind Speed</h1></div><p>{weather.current.wind_kph}km/h</p>
          </div>
          <div className='detailcard'>
            <div className='cardcont'><WiThermometer className='img'/><h1>Feels like</h1></div><p>{weather.current.feelslike_c} degree celsius</p>
          </div>
          <div className='detailcard'>
            <div className='cardcont'><FaEye className='img'/><h1>Visibility</h1></div>
            <p>{weather.current.vis_km}</p>
          </div>
          <div className='detailcard'>
            <div className='cardcont'><WiBarometer className='img'/><h1>Pressure</h1></div>
            <p>{weather.current.pressure_mb}</p>
          </div>
          
        </div>
        </div>
      )}
      
     {weather && <div className="forecastContainer">
  { weather && weather.forecast.forecastday.map(day => (
    <div className="forecast" key={day.date}>
      <h4>{day.date}</h4>
      <img src={day.day.condition.icon} alt="" />
      <p>{day.day.avgtemp_c}°C</p>
      <p>{day.day.condition.text}</p>
    </div>
  ))}
</div>}
      {weather && (
      <div className="mapCard">
  <h2>📍 Weather Location</h2>

  <iframe
    src={`https://maps.google.com/maps?q=${weather.location.lat},${weather.location.lon}&z=10&output=embed`}
    title="map"
  ></iframe>
</div>
)}
         {weather && (
          <div className='graphcontainer'>
            <h3>24 Hours Forecast</h3>
          <ResponsiveContainer className="graph" width="90%" height={250}>
  <div className='chart'>
    <LineChart data={chartdata}>
      <XAxis dataKey="time">

      </XAxis>
      <YAxis/>
      <Tooltip/>
      <Line type='monotone' dataKey="temp"/>
    </LineChart>
    </div>
    </ResponsiveContainer>
    </div>
)}
     
    </div>
  )
}

export default App
