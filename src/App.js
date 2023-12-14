import { useState } from "react";
import "./App.css";

function App() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");

  const handleChangeCityName = () => {
    console.log("city name change");
  };

  const handleChangeCountryName = () => {
    console.log("country name change");
  };

  return (
    <div className="App flex flex-col p-5">
      <div className="Header py-2 w-full border-b-2 border-black ">
        <h1 className="App-title text-left font-bold">Today's Weather</h1>
      </div>
      <div className="Search-box py-4 w-full flex flex-row justify-start space-x-4">
        <div>
          <label htmlFor="city" className="font-bold">
            City:{" "}
          </label>
          <input
            className="border border-gray-300 rounded-md"
            id="city"
            type="text"
            value={cityName}
            onChange={handleChangeCityName}
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
            onChange={handleChangeCountryName}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
            onClick={console.log("click 1")}
          >
            Search
          </button>
          <button
            className="bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-md"
            onClick={console.log("click 2")}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
