import { useState } from "react";
import "./App.css";
import Weather from "./Weather";
import moment from "moment";

function App() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [weatherData, setWeatherData] = useState({
    city: "",
    country: "",
    weather: "",
    weather_description: "",
    temp_max: "",
    temp_min: "",
    humidity: ""
  });

  const [weatherDataErrors, setWeatherDataErrors] = useState("");

  const [weatherDataHistories, setWeatherDataHistories] = useState([]);

  const handleChangeCityName = e => {
    setCityName(e.target.value);
  };

  const handleChangeCountryName = e => {
    setCountryName(e.target.value);
  };

  const handleClearButton = () => {
    setCityName("");
    setCountryName("");
    setWeatherDataErrors("");
    setWeatherData({
      city: "",
      country: "",
      weather: "",
      weather_description: "",
      temp_max: "",
      temp_min: "",
      humidity: ""
    });
  };

  const historyLog = (cityData) => {
    const currentWeatherData = {
      city: cityData.name,
      country: cityData.sys.country,
      time: moment().format('h:mm:ss a'),
    }

    setWeatherDataHistories([...weatherDataHistories, currentWeatherData]);
  }

  const handleSearchButton = city => {
    setWeatherData({
      city: "",
      country: "",
      weather: "",
      weather_description: "",
      temp_max: "",
      temp_min: "",
      humidity: ""
    });
    Weather.getWeatherData(city).then(respond => {
      if (respond.error) {
        setWeatherDataErrors(respond.error);
      } else {
        setWeatherDataErrors("");
        setWeatherData({
          city: respond.name,
          country: respond.sys.country,
          weather: respond.weather[0].main,
          weather_description: respond.weather[0].description,
          temp_max: respond.main.temp_max,
          temp_min: respond.main.temp_min,
          humidity: respond.main.humidity
        });

        historyLog(respond);
      }
    });
  };

  const handleDeleteHistory = (index) => {
    setWeatherDataHistories((prevState) => prevState.filter((item, i) => i !== index))
  }

  return (
    <div className="App flex flex-col p-5">
      <div className="Header py-2 w-full border-b-2 border-black ">
        <h1 className="App-title text-left font-bold">Today's Weather</h1>
      </div>
      <div className="Search-box py-4 w-full flex flex-row justify-start items-center space-x-4">
        <div>
          <label htmlFor="city" className="font-bold">
            City:{" "}
          </label>
          <input
            className="border border-gray-300 rounded-md"
            id="city"
            type="text"
            value={cityName}
            onChange={e => handleChangeCityName(e)}
          />
        </div>
        <div>
          <label htmlFor="country" className="font-bold">
            Country:{" "}
          </label>
          <input
            className="border border-gray-300 rounded-md"
            id="country"
            type="text"
            value={countryName}
            onChange={e => handleChangeCountryName(e)}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
            onClick={() => handleSearchButton(cityName)}
          >
            Search
          </button>
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
            onClick={() => handleClearButton()}
          >
            Clear
          </button>
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
            onClick={() => console.log(weatherDataHistories)}
          >
            test
          </button>
        </div>
      </div>
      <div className="Weather-info-wrapper py-4 w-full flex flex-column justify-start">
        {weatherDataErrors
          ? <div className="Weather-info-error border-2 border-red-700 bg-red-300 w-full">
              <p className="text-black text-left p-2">
                {weatherDataErrors}
              </p>
            </div>
          : <></>}
        {
          weatherData.city ? <div className="Weather-info-box text-left">
          <p className="text-sm text-slate-500">
            {weatherData.city}, {weatherData.country}
          </p>
          <h1 className="font-bold text-6xl pb-5">
            {weatherData.weather}
          </h1>
          <p className="text-sm text-slate-500">
            Description: {weatherData.weather_description}
          </p>
          <p className="text-sm text-slate-500">
            Tempature: {weatherData.temp_max}°C ~ {weatherData.temp_min}°C
          </p>
          <p className="text-sm text-slate-500">
            Humidity: {weatherData.humidity}%
          </p>
        </div> : <></>
        }
      </div>
      {
        weatherDataHistories.length > 0 ? 
        <>
          <div className="History-title py-2 w-full border-b-2 border-black ">
            <h1 className="App-title text-left font-bold">Search History</h1>
          </div>
          <div className="History-list flex flex-col w-full items-center">
          {weatherDataHistories.map((weatherData, index) => {
            return (
              <div key={index} className="History-item flex flex-row w-full borber-b-2 border-slate-400 py-2 justify-between">
                <p>{weatherData && weatherData.city}, {weatherData && weatherData.country}</p>
                <div className="Button-group flex flex-row space-x-3">
                  <p>{weatherData.time}</p>
                  <button
                    className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
                    onClick={() => handleSearchButton(weatherData.city)}
                  >
                    Search
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
                    onClick={() => handleDeleteHistory(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
          </div>
        </> :
        <></>
      }
    </div>
  );
}

export default App;
