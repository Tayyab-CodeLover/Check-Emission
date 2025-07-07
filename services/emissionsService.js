// This will be your backend API integration point
export const calculateEmissions = async (distance, vehicleType) => {
  // TODO: Replace with actual API call
  // const response = await axios.post(`YOUR_BACKEND_API_ENDPOINT`, {
  //   distance,
  //   vehicleType
  // });
  // return response.data;

  // Mock calculation based on vehicle type
  const rates = {
    car: 250,
    bike: 0,
    train: 50,
  };
  return Math.round(distance * (rates[vehicleType] || 250));
};
