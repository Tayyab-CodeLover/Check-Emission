// This will be your Google Maps API integration point
// export const getRoutes = async (origin, destination) => {
//   return [
//     {
//       id: 1,
//       name: 'Fastest Route',
//       distance: 15.5,
//       duration: 25,
//       coordinates: [] // Would contain actual route coordinates
//     },
//     {
//       id: 2,
//       name: 'Eco Route',
//       distance: 18.2,
//       duration: 32,
//       coordinates: []
//     }
//   ];
// };

// services/mapService.js
export const getRoutes = async (start, end) => {
  const response = await axios.get(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?alternatives=true`
  );
  return response.data.routes.slice(0, 2); // Only 2 routes
};