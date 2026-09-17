import CardInformation from "./CardInformation";
import { useAllCitiesWeather } from "../hooks/useAllCitiesWeather";

function CardSkeleton() {
  return (
    <div className="flex w-full animate-pulse items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2.5">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-white/10" />
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-20 rounded bg-white/10" />
          <div className="h-2.5 w-14 rounded bg-white/5" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div className="h-4 w-8 rounded bg-white/10" />
        <div className="h-2.5 w-12 rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function InformationSection({
  selectedStation = "trinidad",
  onSelectStation = () => {},
}) {
  const { citiesData, loading, errors } = useAllCitiesWeather();

  return (
    <section aria-labelledby="forecast-heading" className="flex flex-col h-full justify-between">
      <header className="flex items-start justify-between pb-2">
        <div>
          <h2
            id="forecast-heading"
            className="text-base font-bold tracking-tight text-white"
          >
            Panorama General
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Resumen meteorológico de los 9 departamentos
          </p>
        </div>
        <span className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-mono font-medium tracking-wider text-cyan-400">
          9 Capitales
        </span>
      </header>

      {/* Errores parciales (si alguna ciudad falló) */}
      {errors.length > 0 && (
        <div className="mb-2 rounded-xl border border-red-500/20 bg-red-500/10 p-2">
          <p className="text-xs text-red-400">
            ⚠️ {errors.length} departamento(s) no cargaron correctamente.
          </p>
        </div>
      )}

      <ul
        role="list"
        className="m-0 flex flex-1 flex-col justify-between gap-1.5 p-0 list-none"
      >
        {loading
          ? Array.from({ length: 9 }).map((_, i) => (
              <li key={i}>
                <CardSkeleton />
              </li>
            ))
          : citiesData.map((station) => (
              <li key={station.cityKey}>
                <CardInformation
                  city={station.name}
                  condition={station.condition}
                  temperature={station.temperature}
                  minTemp={station.minTemp}
                  maxTemp={station.maxTemp}
                  color={station.color}
                  icon={<station.Icon size={13} className="text-slate-300" />}
                  isSelected={selectedStation === station.cityKey}
                  onClick={() => onSelectStation(station.cityKey)}
                />
              </li>
            ))}
      </ul>
    </section>
  );
}