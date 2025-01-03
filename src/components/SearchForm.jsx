import React, { useEffect, useState } from "react";
 

const MY_WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

function SearchForm() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${MY_WEATHER_KEY}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          setWeatherData(data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      });
    }
  }, []);

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  async function weather(event) {
    event.preventDefault();
    
    if (!location) return alert("Please enter a location.");

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${MY_WEATHER_KEY}`);
      const data = await response.json();
      if (data.cod !== 200) {
        alert("Invalid location. Please try again.");
        return;
      }
      console.log(data);
      setWeatherData(data); 
      setLocation(""); 
      
      // console.log("Sending data to backend:", {
      //   city_name: data.name,
      //   temperature: (data.main.temp - 273.15).toFixed(2),
      //   weather_condition: data.weather[0].description,
      // });
      const backend = await fetch('https://weather-app-0k57.onrender.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          city_name: data.name,
          temperature: (data.main.temp - 273.15).toFixed(2),
          weather_condition: data.weather[0].description,
        })
      });
  
      if (!backend.ok) {
        console.error("Error in saving weather data :");
      } else {
        console.log("Weather data saved successfully");
      }
  

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">🌤 Weather App</h1>
        <form onSubmit={weather} className="flex flex-col gap-4">
          <label htmlFor="location" className="text-gray-600">
            Enter Your Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter city name"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Get Info
          </button>
        </form>

        {weatherData && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800">Weather in {weatherData.name}:</h2>
            <p className="text-gray-600">🌡 Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p className="text-gray-600">☁️ Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
