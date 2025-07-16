// services/weatherService.js
export const getWeather = async (lat, lng) => {
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=pm2_5`
  );
  return {
    temp: response.data.current_weather.temperature,
    pollution: response.data.hourly.pm2_5[0]
  };
};