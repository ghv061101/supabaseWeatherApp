import React, { useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';

const Inputs = ({ setQuery, setUnits, units }) => {
  const [city, setCity] = useState('');

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  // Return different text colors only for the buttons (inside Inputs card)
  const getButtonClass = (unit) => {
    const baseClass = "transition ease-out hover:scale-125 cursor-pointer font-medium";
    if (units === unit) {
      switch (unit) {
        case "metric":
          return baseClass + " text-blue-600";
        case "imperial":
          return baseClass + " text-red-600";
        case "standard":
          return baseClass + " text-green-600";
        default:
          return baseClass;
      }
    } else {
      return baseClass + " text-gray-400 hover:text-gray-700";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center my-6 space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex flex-row w-full sm:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search by City"
          className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none"
        />
        <BiSearch
          className="cursor-pointer transition ease-out hover:scale-125 hover:text-black"
          size={30}
          aria-label="Search"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          className="cursor-pointer transition ease-out hover:scale-125 hover:text-black"
          size={30}
          aria-label="Current Location"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-full sm:w-1/4 items-center justify-center space-x-3">
        <button
          className={getButtonClass("metric")}
          onClick={() => setUnits("metric")}
          aria-label="Set Celsius"
        >
          °C
        </button>

        <span className="text-gray-400 select-none">|</span>

        <button
          className={getButtonClass("imperial")}
          onClick={() => setUnits("imperial")}
          aria-label="Set Fahrenheit"
        >
          °F
        </button>

        <span className="text-gray-400 select-none">|</span>

        <button
          className={getButtonClass("standard")}
          onClick={() => setUnits("standard")}
          aria-label="Set Kelvin"
        >
          °K
        </button>
      </div>
    </div>
  );
};

export default Inputs;
