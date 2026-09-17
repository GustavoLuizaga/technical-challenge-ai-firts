import { API_OPEN_METEO } from "../config/env.confing";

async function getWeatherForecastByLatAndLon({
    lat,
    lon,
    forecastDays = 7,
    timezone = "auto",
    hourly = "temperature_2m,weather_code",
    daily = "temperature_2m_max,temperature_2m_min,weather_code",
}) {
    try {
        const url = new URL(API_OPEN_METEO);

        url.searchParams.set("latitude", lat);
        url.searchParams.set("longitude", lon);
        url.searchParams.set("hourly", hourly);
        url.searchParams.set("daily", daily);
        url.searchParams.set("timezone", timezone);
        url.searchParams.set("forecast_days", forecastDays);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Error al obtener el pronóstico: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(
            "Error en getWeatherForecastByLatAndLon:",
            error
        );

        throw error;
    }
}

export default getWeatherForecastByLatAndLon;