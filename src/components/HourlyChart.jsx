import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LuDroplets } from "react-icons/lu";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/12 bg-[#060814]/95 px-3.5 py-2 shadow-2xl backdrop-blur-md">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-0.5 text-base font-bold text-white">
        {payload[0].value}°C
      </p>
      {payload[1] && payload[1].value > 0 && (
        <p className="mt-0.5 flex items-center gap-1 text-xs text-sky-400">
          <LuDroplets size={12} /> {payload[1].value} mm
        </p>
      )}
    </div>
  );
}

export default function HourlyChart({ hourlyData, accentColor }) {
  const minTemp = Math.min(...hourlyData.map((d) => d.temp)) - 2;
  const maxTemp = Math.max(...hourlyData.map((d) => d.temp)) + 2;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={hourlyData} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={accentColor} stopOpacity={0.35} />
            <stop offset="95%" stopColor={accentColor} stopOpacity={0.0} />
          </linearGradient>
          <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="hour"
          tick={{ fill: "#cbd5e1", fontSize: 12, fontWeight: 500 }}
          tickLine={false}
          axisLine={false}
          interval={2}
        />
        <YAxis
          domain={[minTemp, maxTemp]}
          tick={{ fill: "#cbd5e1", fontSize: 12, fontWeight: 500 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${v}°`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="temp"
          stroke={accentColor}
          strokeWidth={2}
          fill="url(#tempGradient)"
          dot={false}
          activeDot={{ r: 4, fill: accentColor, stroke: "#fff", strokeWidth: 2 }}
        />
        <Area
          type="monotone"
          dataKey="precip"
          stroke="#38bdf8"
          strokeWidth={1.5}
          fill="url(#precipGradient)"
          dot={false}
          activeDot={{ r: 3, fill: "#38bdf8" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
