export function formatDate(dateStr) {
  const date = new Date(dateStr + "T12:00:00");
  return date.toLocaleDateString("es-BO", { weekday: "short", day: "numeric", month: "short" });
}

export function formatDayShort(dateStr) {
  const date = new Date(dateStr + "T12:00:00");
  const weekday = date.toLocaleDateString("es-BO", { weekday: "short" });
  const day = date.toLocaleDateString("es-BO", { day: "numeric", month: "short" });
  return { weekday: weekday.replace(".", ""), day };
}

export function isToday(dateStr) {
  const now = new Date();
  const localDate = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  return dateStr === localDate;
}

export function getHourlyForDay(hourly, dayIndex) {
  const start = dayIndex * 24;
  const slice = hourly.time.slice(start, start + 24);
  return slice.map((t, i) => ({
    hour: t.slice(11, 16),
    temp: Math.round(hourly.temperature_2m[start + i]),
    precip: hourly.precipitation ? +(hourly.precipitation[start + i] ?? 0).toFixed(1) : 0,
  }));
}
