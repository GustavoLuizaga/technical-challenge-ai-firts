import { LuCloudSun } from "react-icons/lu";

export default function CardInformation({
  city,
  condition,
  temperature,
  minTemp,
  maxTemp,
  color,
  icon = <LuCloudSun size={13} className="text-amber-300" />,
  isSelected = false,
  className = "",
  onClick,
}) {
  const formattedTemp =
    typeof temperature === "number" ? `${temperature}°` : temperature;
  const formattedMin = typeof minTemp === "number" ? `${minTemp}°` : minTemp;
  const formattedMax = typeof maxTemp === "number" ? `${maxTemp}°` : maxTemp;

  return (
    <article
      onClick={onClick}
      style={{
        borderColor: isSelected ? color : "rgba(255, 255, 255, 0.07)",
        boxShadow: isSelected ? `0 0 14px -3px ${color}35` : "none",
      }}
      className={`group relative flex w-full cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2 transition-all duration-200 ${
        isSelected
          ? "bg-[#081525]/90"
          : "bg-[#070d19]/80 hover:border-white/15 hover:bg-[#0b1424]"
      } ${className}`}
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 7px 1.5px ${color}bb`,
          }}
        />

        <div className="flex flex-col leading-tight">
          <h3 className="text-sm font-semibold tracking-tight text-white">
            {city}
          </h3>

          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
            {icon && (
              <span
                aria-hidden="true"
                className="flex shrink-0 items-center text-slate-400"
              >
                {icon}
              </span>
            )}
            <span className="capitalize">{condition}</span>
          </p>
        </div>
      </header>

      <div className="flex flex-col items-end leading-none">
        <data
          value={temperature}
          className="text-base font-bold tracking-tight text-white"
        >
          {formattedTemp}
        </data>
        <p className="mt-1 text-[11px] font-normal tracking-wide text-slate-400">
          <data value={minTemp}>{formattedMin}</data> /{" "}
          <data value={maxTemp}>{formattedMax}</data>
        </p>
      </div>
    </article>
  );
}