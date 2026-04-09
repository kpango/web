const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDate(date: string | null): string {
  if (!date) return "Present";
  const [year, month] = date.split("-");
  const idx = Number.parseInt(month ?? "1", 10) - 1;
  return `${SHORT_MONTHS[idx]} ${year}`;
}

export function formatDisplayDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
