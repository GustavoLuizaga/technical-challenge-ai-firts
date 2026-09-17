import { useState, useEffect } from "react";
import { LuCloudSun, LuClock } from "react-icons/lu";

export default function Header() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString("es-BO", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("es-BO", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-transparent backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-9xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-400">
            <LuCloudSun size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-wider text-slate-100">
            Pronóstico del Clima Bolivia
          </h1>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 font-mono">
          <LuClock size={13} className="text-cyan-400" />
          <span>{time}</span>
        </div>
      </div>
    </header>
  );
}