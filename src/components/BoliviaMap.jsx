import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { LuMapPin } from "react-icons/lu";
import boGeoJson from "../assets/bo.json";

const DEPARTMENT_CONFIG = {
  BON: {
    stationId: "cobija",
    name: "PANDO",
    color: "#f97316",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOB: {
    stationId: "trinidad",
    name: "BENI",
    color: "#06b6d4",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOL: {
    stationId: "laPaz",
    name: "LA PAZ",
    color: "#a855f7",
    centerOffset: [-6, 12],
    labelOffset: [0, 18],
  },
  BOC: {
    stationId: "cochabamba",
    name: "COCHABAMBA",
    color: "#10b981",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOO: {
    stationId: "oruro",
    name: "ORURO",
    color: "#eab308",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOP: {
    stationId: "potosi",
    name: "POTOSÍ",
    color: "#ef4444",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOH: {
    stationId: "sucre",
    name: "CHUQUISACA",
    color: "#ec4899",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOS: {
    stationId: "santaCruz",
    name: "SANTA CRUZ",
    color: "#3b82f6",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
  BOT: {
    stationId: "tarija",
    name: "TARIJA",
    color: "#14b8a6",
    centerOffset: [0, 0],
    labelOffset: [0, 18],
  },
};

export default function BoliviaMap({
  selectedStation = "trinidad",
  onSelectStation = () => {},
  className = "",
}) {
  const [hoveredStation, setHoveredStation] = useState(null);

  const { pathGenerator, departmentCenters } = useMemo(() => {
    const proj = geoMercator().fitExtent(
      [
        [30, 30],
        [670, 770],
      ],
      boGeoJson
    );
    const pathGen = geoPath().projection(proj);

    // Calcular el centroide geométrico de cada departamento
    const centers = {};
    boGeoJson.features.forEach((feature) => {
      const code = feature.properties.id;
      const centroid = pathGen.centroid(feature);
      if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
        centers[code] = centroid;
      }
    });

    return { pathGenerator: pathGen, departmentCenters: centers };
  }, []);

  return (
    <div
      className={`flex flex-col h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#030712]/90 p-4 shadow-2xl backdrop-blur-xl ${className}`}
    >
      {/* Header / Banner en su propia fila superior (sin sobreponerse al mapa) */}
      <div className="flex w-full items-center justify-center pb-2">
        <div className="flex items-center gap-2.5 rounded-xl border border-cyan-500/20 bg-[#060814]/80 px-4 py-2 shadow-md backdrop-blur-md">
          <LuMapPin size={16} className="text-cyan-400 shrink-0" />
          <span className="text-sm font-medium tracking-wide text-slate-200">
            Selecciona un departamento para consultar el pronóstico
          </span>
        </div>
      </div>

      {/* Contenedor del mapa SVG */}
      <div className="flex-1 min-h-0 flex items-center justify-center w-full">
        <svg
          viewBox="0 0 700 800"
          className="h-full w-full max-h-[78vh] select-none"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Polígonos de los departamentos */}
          <g className="departments">
            {boGeoJson.features.map((feature) => {
              const code = feature.properties.id;
              const config = DEPARTMENT_CONFIG[code] || {
                stationId: code,
                name: feature.properties.name,
                color: "#38bdf8",
              };

              const isSelected = selectedStation === config.stationId;
              const isHovered = hoveredStation === config.stationId;

              return (
                <path
                  key={code}
                  d={pathGenerator(feature)}
                  stroke={config.color}
                  strokeWidth={isSelected || isHovered ? 2 : 1}
                  strokeOpacity={isSelected ? 1 : isHovered ? 0.9 : 0.4}
                  fill={
                    isSelected
                      ? `${config.color}28`
                      : isHovered
                        ? `${config.color}1c`
                        : `${config.color}09`
                  }
                  filter={isSelected ? "url(#glow)" : undefined}
                  className="cursor-pointer transition-all duration-300 ease-out"
                  onMouseEnter={() => setHoveredStation(config.stationId)}
                  onMouseLeave={() => setHoveredStation(null)}
                  onClick={() => onSelectStation(config.stationId)}
                />
              );
            })}
          </g>

          {/* Localizadores y nombres centrados en cada departamento */}
          <g className="stations">
            {boGeoJson.features.map((feature) => {
              const code = feature.properties.id;
              const config = DEPARTMENT_CONFIG[code];
              const centroid = departmentCenters[code];
              if (!config || !centroid) return null;

              const [ox, oy] = config.centerOffset || [0, 0];
              const x = centroid[0] + ox;
              const y = centroid[1] + oy;

              const [lox, loy] = config.labelOffset || [0, 18];
              const labelX = x + lox;
              const labelY = y + loy;

              const isSelected = selectedStation === config.stationId;
              const isHovered = hoveredStation === config.stationId;

              return (
                <g
                  key={`station-${code}`}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredStation(config.stationId)}
                  onMouseLeave={() => setHoveredStation(null)}
                  onClick={() => onSelectStation(config.stationId)}
                >
                  {/* Pin localizador */}
                  <g transform={`translate(${x}, ${y})`}>
                    <circle
                      r={isSelected ? 18 : 12}
                      fill={config.color}
                      opacity={isSelected ? 0.35 : 0.18}
                      className="animate-ping"
                    />

                    <circle
                      r={isSelected ? 9 : 6}
                      fill={config.color}
                      opacity={isSelected ? 0.5 : 0.28}
                    />

                    <circle
                      r={4}
                      fill={config.color}
                      filter={isSelected ? "url(#glow)" : undefined}
                    />

                    <circle
                      r={2}
                      fill="#ffffff"
                      opacity={isSelected || isHovered ? 1 : 0.85}
                    />
                  </g>

                  {/* Etiqueta del departamento */}
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={config.color}
                    opacity={isSelected ? 1 : isHovered ? 0.95 : 0.75}
                    className="font-mono text-[11px] font-bold tracking-widest pointer-events-none"
                    style={{
                      textShadow: isSelected
                        ? `0 0 8px ${config.color}, 0 0 2px black`
                        : "0 0 3px black",
                    }}
                  >
                    {config.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
