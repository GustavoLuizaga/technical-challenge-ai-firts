import {
  LuSun,
  LuCloudSun,
  LuCloud,
  LuCloudFog,
  LuCloudDrizzle,
  LuCloudRain,
  LuCloudSnow,
  LuSnowflake,
  LuCloudLightning,
  LuCloudHail,
} from "react-icons/lu";

const WEATHER_CODE_MAP = {
  0: { label: "Despejado", Icon: LuSun, color: "#f59e0b" },
  1: { label: "Mayorm. despejado", Icon: LuCloudSun, color: "#f59e0b" },
  2: { label: "Parc. nublado", Icon: LuCloudSun, color: "#94a3b8" },
  3: { label: "Nublado", Icon: LuCloud, color: "#64748b" },
  45: { label: "Niebla", Icon: LuCloudFog, color: "#94a3b8" },
  48: { label: "Niebla con hielo", Icon: LuCloudFog, color: "#7dd3fc" },
  51: { label: "Llovizna leve", Icon: LuCloudDrizzle, color: "#38bdf8" },
  53: { label: "Llovizna", Icon: LuCloudDrizzle, color: "#38bdf8" },
  55: { label: "Llovizna intensa", Icon: LuCloudRain, color: "#0ea5e9" },
  61: { label: "Lluvia leve", Icon: LuCloudRain, color: "#3b82f6" },
  63: { label: "Lluvia", Icon: LuCloudRain, color: "#3b82f6" },
  65: { label: "Lluvia intensa", Icon: LuCloudRain, color: "#1d4ed8" },
  71: { label: "Nieve leve", Icon: LuCloudSnow, color: "#bae6fd" },
  73: { label: "Nieve", Icon: LuSnowflake, color: "#7dd3fc" },
  75: { label: "Nieve intensa", Icon: LuSnowflake, color: "#38bdf8" },
  77: { label: "Granizo", Icon: LuCloudHail, color: "#a5f3fc" },
  80: { label: "Chubascos leves", Icon: LuCloudDrizzle, color: "#60a5fa" },
  81: { label: "Chubascos", Icon: LuCloudRain, color: "#3b82f6" },
  82: { label: "Chubascos fuertes", Icon: LuCloudLightning, color: "#1d4ed8" },
  85: { label: "Chubascos de nieve", Icon: LuCloudSnow, color: "#7dd3fc" },
  86: { label: "Tormenta de nieve", Icon: LuSnowflake, color: "#38bdf8" },
  95: { label: "Tormenta", Icon: LuCloudLightning, color: "#8b5cf6" },
  96: { label: "Tormenta c/granizo", Icon: LuCloudLightning, color: "#7c3aed" },
  99: { label: "Tormenta intensa", Icon: LuCloudLightning, color: "#6d28d9" },
};

const FALLBACK = { label: "Desconocido", Icon: LuCloud, color: "#6b7280" };

export function getWeatherInfo(code) {
  return WEATHER_CODE_MAP[code] ?? FALLBACK;
}
