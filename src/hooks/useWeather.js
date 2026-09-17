import { useState, useEffect, useRef } from "react";
import getWeatherForecastByLatAndLon from "../services/forecast.service";
import locations from "../../utils/departaments.locations";


export function useWeather(cityKey) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cache = useRef({});

  useEffect(() => {
    if (!cityKey) return;

    const location = locations[cityKey];
    if (!location) {
      setError(`Ciudad "${cityKey}" no encontrada.`);
      return;
    }


    if (cache.current[cityKey]) {
      setData(cache.current[cityKey]);
      setError(null);
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getWeatherForecastByLatAndLon({
          lat: location.lat,
          lon: location.lon,
          forecastDays: 7,
          hourly: "temperature_2m,weather_code,precipitation",
          daily: "temperature_2m_max,temperature_2m_min,weather_code",
        });

        cache.current[cityKey] = result;
        setData(result);
      } catch (err) {
        setError(err.message ?? "Error al obtener el pronóstico.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityKey]);

  return { data, loading, error };
}
