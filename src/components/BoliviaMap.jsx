import { useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import boGeoJson from "../assets/bo.json";

const DEPARTMENT_CONFIG = {
  BON: {
    stationId: "cobija",
    name: "PANDO",
    color: "#f97316",
    coordinates: [-68.7588, -11.0267],
    labelOffset: [15, 0],
  },
  BOB: {
    stationId: "trinidad",
    name: "BENI",
    color: "#06b6d4",
    coordinates: [-64.9000, -14.8333],
    labelOffset: [0, -35],
  },
  BOL: {
    stationId: "la-paz",
    name: "LA PAZ",
    color: "#a855f7",
    coordinates: [-68.1193, -16.5000],
    labelOffset: [0, -35],
  },
  BOC: {
    stationId: "cochabamba",
    name: "COCHABAMBA",
    color: "#10b981",
    coordinates: [-66.1568, -17.3895],
    labelOffset: [25, -6],
  },
  BOO: {
    stationId: "oruro",
    name: "ORURO",
    color: "#eab308",
    coordinates: [-67.1100, -17.9667],
    labelOffset: [-10, 0],
  },
  BOP: {
    stationId: "potosi",
    name: "POTOSÍ",
    color: "#ef4444",
    coordinates: [-65.7550, -19.5836],
    labelOffset: [18, 8],
  },
  BOH: {
    stationId: "sucre",
    name: "CHUQUISACA",
    color: "#ec4899",
    coordinates: [-65.2627, -19.0333],
    labelOffset: [22, 6],
  },
  BOS: {
    stationId: "santa-cruz",
    name: "SANTA CRUZ",
    color: "#3b82f6",
    coordinates: [-63.1800, -17.7863],
    labelOffset: [20, -25],
  },
  BOT: {
    stationId: "tarija",
    name: "TARIJA",
    color: "#14b8a6",
    coordinates: [-64.7300, -21.5300],
    labelOffset: [10, 5],
  },
};

export default function BoliviaMap({
  selectedStation = "trinidad",
  onSelectStation = () => { },
  className = "",
}) {
  const [hoveredStation, setHoveredStation] = useState(null);

  const { projection, pathGenerator } = useMemo(() => {
    const proj = geoMercator().fitExtent(
      [
        [30, 30],
        [670, 770],
      ],
      boGeoJson
    );
    const pathGen = geoPath().projection(proj);
    return { projection: proj, pathGenerator: pathGen };
  }, []);

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#030712]/90 p-4 shadow-2xl backdrop-blur-xl ${className}`}
    >
      <svg
        viewBox="0 0 700 800"
        className="h-full w-full max-h-[85vh] select-none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

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

        <g className="labels pointer-events-none">
          {boGeoJson.features.map((feature) => {
            const code = feature.properties.id;
            const config = DEPARTMENT_CONFIG[code];
            if (!config) return null;

            const centroid = pathGenerator.centroid(feature);
            if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return null;

            const [ox, oy] = config.labelOffset || [0, 0];
            const x = centroid[0] + ox;
            const y = centroid[1] + oy;
            const isSelected = selectedStation === config.stationId;
            const isHovered = hoveredStation === config.stationId;

            return (
              <text
                key={`label-${code}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={config.color}
                opacity={isSelected ? 1 : isHovered ? 0.95 : 0.6}
                className="font-mono text-[11px] font-bold tracking-widest transition-opacity duration-200"
                style={{
                  textShadow: isSelected
                    ? `0 0 8px ${config.color}, 0 0 2px black`
                    : "0 0 3px black",
                }}
              >
                {config.name}
              </text>
            );
          })}
        </g>

        <g className="stations">
          {Object.entries(DEPARTMENT_CONFIG).map(([code, config]) => {
            const point = projection(config.coordinates);
            if (!point) return null;

            const [x, y] = point;
            const isSelected = selectedStation === config.stationId;
            const isHovered = hoveredStation === config.stationId;

            return (
              <g
                key={`station-${code}`}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredStation(config.stationId)}
                onMouseLeave={() => setHoveredStation(null)}
                onClick={() => onSelectStation(config.stationId)}
              >

                <circle
                  r={isSelected ? 18 : 13}
                  fill={config.color}
                  opacity={isSelected ? 0.35 : 0.2}
                  className="animate-ping"
                />

                <circle
                  r={isSelected ? 10 : 7}
                  fill={config.color}
                  opacity={isSelected ? 0.5 : 0.3}
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
            );
          })}
        </g>
      </svg>
    </div>
  );
}
