import { useState, useEffect } from "react";
import getWeatherForecastByLatAndLon from "../services/forecast.service";
import locations from "../../utils/departaments.locations";
import { getWeatherInfo } from "../utils/weatherCodes";


const CITY_COLORS = {
  sucre: "#ec4899",
  laPaz: "#a855f7",
  cochabamba: "#10b981",
  oruro: "#eab308",
  potosi: "#ef4444",
  tarija: "#14b8a6",
  santaCruz: "#3b82f6",
  trinidad: "#06b6d4",
  cobija: "#f97316",
};


function extractTodaySummary(apiData, cityKey) {
  const daily = apiData.daily;
  const hourly = apiData.hourly;

  const currentHourIndex = Math.min(new Date().getHours(), hourly.temperature_2m.length - 1);
  const currentTemp = Math.round(hourly.temperature_2m[currentHourIndex]);
  const maxTemp = Math.round(daily.temperature_2m_max[0]);
  const minTemp = Math.round(daily.temperature_2m_min[0]);
  const code = daily.weather_code[0];
  const { label, Icon, color: codeColor } = getWeatherInfo(code);

  return {
    cityKey,
    name: locations[cityKey].name,
    temperature: currentTemp,
    maxTemp,
    minTemp,
    condition: label,
    Icon,
    color: CITY_COLORS[cityKey] ?? codeColor,
  };
}

export function useAllCitiesWeather() {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setErrors([]);

      const cityKeys = Object.keys(locations);

      const results = await Promise.allSettled(
        cityKeys.map((key) =>
          getWeatherForecastByLatAndLon({
            lat: locations[key].lat,
            lon: locations[key].lon,
            forecastDays: 1,
            hourly: "temperature_2m,weather_code",
            daily: "temperature_2m_max,temperature_2m_min,weather_code",
          })
        )
      );

      const successData = [];
      const failedErrors = [];

      results.forEach((result, idx) => {
        const key = cityKeys[idx];
        if (result.status === "fulfilled") {
          successData.push(extractTodaySummary(result.value, key));
        } else {
          failedErrors.push(`${locations[key].name}: ${result.reason?.message}`);
        }
      });

      setCitiesData(successData);
      setErrors(failedErrors);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return { citiesData, loading, errors };
}
