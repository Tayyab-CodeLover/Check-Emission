import React, { useState } from "react";

const EmissionCalculator = () => {
  // State for user inputs
  const [vehicle, setVehicle] = useState("gasoline_car");
  const [distance, setDistance] = useState("");
  const [emissions, setEmissions] = useState(null);

  // Emission factors (grams CO2 per km)
  const EMISSION_FACTORS = {
    gasoline_car: 120,
    diesel_car: 130,
    electric_car: 50,
    hybrid_car: 80,
    bus: 800,
    motorcycle: 80,
  };

  // Calculate emissions
  const calculateCO2 = () => {
    const trafficFactor = 1.3; // Could be dynamic from API
    const weatherFactor = 1.1; // Could be dynamic from API

    const baseEmission = EMISSION_FACTORS[vehicle] || 120;
    const calculated = distance * baseEmission * trafficFactor * weatherFactor;
    setEmissions(calculated);
  };

  return (
    <div className="calculator-container">
      <h2>Transport Emission Calculator</h2>

      <div className="input-group">
        <label htmlFor="vehicle">Vehicle Type:</label>
        <select
          id="vehicle"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        >
          <option value="gasoline_car">Gasoline Car</option>
          <option value="diesel_car">Diesel Car</option>
          <option value="electric_car">Electric Car</option>
          <option value="hybrid_car">Hybrid Car</option>
          <option value="bus">Bus</option>
          <option value="motorcycle">Motorcycle</option>
        </select>
      </div>

      <div className="input-group">
        <label htmlFor="distance">Distance (km):</label>
        <input
          id="distance"
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          placeholder="Enter distance"
          min="0"
        />
      </div>

      <button onClick={calculateCO2}>Calculate CO₂ Emissions</button>

      {emissions !== null && (
        <div className="result">
          <h3>Result:</h3>
          <p>
            This trip emits <strong>{(emissions / 1000).toFixed(2)} kg</strong>{" "}
            of CO₂
          </p>
          <p className="eco-tip">
            {emissions < 1000
              ? "🌱 Eco-friendly choice!"
              : "💡 Consider walking, cycling, or public transport for shorter distances"}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmissionCalculator;
