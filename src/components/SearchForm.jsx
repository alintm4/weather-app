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
    <div className="h-screen bg-stone-500 flex justify-center">
      <div className="w-auto bg-purple-400 p-6 rounded-lg shadow-md mb-auto mt-4">
        <p className="text-white text-xl mb-4">Weather App</p>
        <form method="POST"className="flex flex-col gap-4" onSubmit={weather}>
          <span className="text-white">Enter Your Location:</span>
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            placeholder="Enter your location"
            className="p-2 rounded-md border border-gray-300"
          />

          <button
            type="submit"
            className="bg-orange-200 p-2 rounded-sm hover:bg-orange-300 transition"
          >
            Get Info
          </button>
        </form>

        {weatherData && (
          <div className="mt-4 text-white">
            <h2>Weather in {weatherData.name}:</h2>
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchForm;
