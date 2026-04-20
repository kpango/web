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
  return `${SHORT_MONTHS[+month - 1]} ${year}`;
}

const DISPLAY_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDisplayDate(iso: string): string {
  return DISPLAY_DATE_FORMATTER.format(new Date(iso));
}
