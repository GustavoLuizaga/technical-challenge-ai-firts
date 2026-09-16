import { useState } from "react";
import CardInformation from "./CardInformation";
import { MOCK_DATA } from "../mocks/mock";

export default function InformationSection() {
  const [selectedStation, setSelectedStation] = useState("trinidad");

  return (
    <section 
      aria-labelledby="stations-heading"
      className="flex flex-col rounded-2xl border border-white/10 bg-[#050813]/95 p-4 shadow-xl backdrop-blur-md"
    >
      <header className="flex items-start justify-between pb-3">
        <div>
          <h2 id="stations-heading" className="text-base font-bold tracking-tight text-white">
            Estaciones departamentales
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Selecciona una para ver su pronóstico
          </p>
        </div>
        <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-amber-400">
          MOCK
        </span>
      </header>

      <ul role="list" className="flex flex-col gap-2 overflow-y-auto pr-0.5 list-none m-0 p-0">
        {MOCK_DATA.map((station) => (
          <li key={station.id}>
            <CardInformation
              city={station.city}
              condition={station.condition}
              temperature={station.temperature}
              minTemp={station.minTemp}
              maxTemp={station.maxTemp}
              color={station.color}
              icon={station.icon}
              isSelected={selectedStation === station.id}
              onClick={() => setSelectedStation(station.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}