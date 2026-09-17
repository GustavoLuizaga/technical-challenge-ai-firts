import { getWeatherInfo } from "../utils/weatherCodes";
import { formatDayShort, isToday } from "../utils/dateHelpers";

export default function DayCard({ date, maxTemp, minTemp, code, isSelected, onClick }) {
  const { Icon, color } = getWeatherInfo(code);
  const { weekday, day } = formatDayShort(date);
  const today = isToday(date);

  return (
    <button
      onClick={onClick}
      className={`flex flex-1 min-w-0 flex-col items-center gap-1 rounded-2xl border p-2.5 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-indigo-500/50 bg-gradient-to-br from-indigo-500/25 to-purple-500/15 shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]"
          : "border-white/7 bg-white/[0.04] hover:border-white/15 hover:bg-white/[0.07]"
      }`}
    >
      <span
        className={`text-[11px] font-semibold capitalize ${
          today ? "text-indigo-400" : "text-slate-400"
        }`}
      >
        {today ? "Hoy" : weekday}
      </span>
      <span className="text-[10px] text-slate-500">{day}</span>
      <Icon size={22} color={color} className="shrink-0" />
      <span className="text-sm font-bold text-white">{maxTemp}°</span>
      <span className="text-[11px] text-slate-500">{minTemp}°</span>
    </button>
  );
}
