import { useState } from "react";
import { LuTriangleAlert, LuArrowLeft } from "react-icons/lu";
import { getWeatherInfo } from "../utils/weatherCodes";
import { formatDate, getHourlyForDay } from "../utils/dateHelpers";
import locations from "../../utils/departaments.locations";
import DayCard from "./DayCard";
import HourlyChart from "./HourlyChart";
import SkeletonCard from "./SkeletonCard";

export default function CityDetail({
  cityKey,
  weatherData,
  loading,
  error,
  accentColor = "#818cf8",
  onBack,
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
        <LuTriangleAlert size={32} className="text-red-400" />
        <p className="text-sm text-red-400">{error}</p>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/7 px-4 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-white/15 cursor-pointer"
        >
          <LuArrowLeft size={14} /> Volver
        </button>
      </div>
    );
  }

  if (!weatherData) return null;

  const location = locations[cityKey];
  const daily = weatherData.daily;
  const hourly = weatherData.hourly;

  const isSelectedToday = selectedDayIndex === 0;
  const selectedCode = daily.weather_code[selectedDayIndex];
  const selectedInfo = getWeatherInfo(selectedCode);
  const SelectedIcon = selectedInfo.Icon;

  const selectedMax = Math.round(daily.temperature_2m_max[selectedDayIndex]);
  const selectedMin = Math.round(daily.temperature_2m_min[selectedDayIndex]);

  const displayTemp = isSelectedToday
    ? Math.round(hourly.temperature_2m[new Date().getHours()] ?? selectedMax)
    : selectedMax;

  const selectedDayDate = formatDate(daily.time[selectedDayIndex]);
  const hourlyForDay = getHourlyForDay(hourly, selectedDayIndex);

  return (
    <section
      aria-label={`Pronóstico de ${location?.name}`}
      className="flex flex-col gap-3.5 h-full"
    >
      <header className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/7 px-3 py-1.5 text-xs font-semibold text-slate-400 transition-all duration-150 hover:bg-white/12 hover:text-white cursor-pointer"
        >
          <LuArrowLeft size={14} /> Volver
        </button>
        <div className="text-right">
          <h2 className="text-base font-bold text-white leading-tight">
            {location?.name}
          </h2>
          <p className="text-[11px] text-slate-500">Bolivia</p>
        </div>
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 8px 2px ${accentColor}88`,
          }}
        />
      </header>

      <div
        className="relative overflow-hidden rounded-[20px] border bg-gradient-to-br from-[#0d1228]/95 to-[#060918]/98 p-4.5"
        style={{
          borderColor: `${accentColor}30`,
          boxShadow: `0 4px 32px -8px ${accentColor}30`,
        }}
      >
        <div
          className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full"
          style={{
            background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SelectedIcon
              size={48}
              color={selectedInfo.color}
              className="shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
            />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                {isSelectedToday ? "Temperatura actual" : "Temperatura máxima"}
              </p>
              <div className="mt-1 text-4xl font-extrabold text-white leading-none">
                {displayTemp}°C
              </div>
              <div className="mt-1.5 text-sm text-slate-300">
                {selectedInfo.label}
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Máx. {selectedMax}° · Mín. {selectedMin}°
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-right">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 capitalize">
              {isSelectedToday ? "Hoy" : selectedDayDate}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Pronóstico de 7 días
        </h3>
        <div className="flex gap-1.5">
          {daily.time.map((date, idx) => (
            <DayCard
              key={date}
              date={date}
              maxTemp={Math.round(daily.temperature_2m_max[idx])}
              minTemp={Math.round(daily.temperature_2m_min[idx])}
              code={daily.weather_code[idx]}
              isSelected={selectedDayIndex === idx}
              onClick={() => setSelectedDayIndex(idx)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 rounded-[18px] border border-white/7 bg-white/[0.03] p-3.5 pb-2.5">
        <div className="mb-2.5 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Temperatura por hora
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 capitalize">
              {selectedDayDate}
            </span>
            <SelectedIcon size={16} color={selectedInfo.color} />
          </div>
        </div>
        <HourlyChart hourlyData={hourlyForDay} accentColor={accentColor} />

        <div className="mt-1.5 flex gap-4 pl-1">
          <div className="flex items-center gap-1.5">
            <div
              className="h-0.5 w-5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-[10px] text-slate-500">Temperatura</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-0.5 w-5 rounded-full bg-sky-400" />
            <span className="text-[10px] text-slate-500">
              Precipitación (mm)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
