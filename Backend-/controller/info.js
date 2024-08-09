import Info from "../model/info.js"; // Import using ES modules

export async function putInfo(req, res) {
  const { city_name, temperature, weather_condition } = req.body;
  
  if (!city_name) {
    return res.status(400).json({ error: "City name is required" });
  }

  const weatherData = new Info({
    city_name,
    temperature,
    weather_condition,
  });

  await weatherData.save();
  res.json({ message: "Weather data saved successfully" });
}