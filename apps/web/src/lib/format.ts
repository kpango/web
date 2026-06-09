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
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
      return iso;
    }
    return DISPLAY_DATE_FORMATTER.format(date);
  } catch (error) {
    return iso;
  }
}
