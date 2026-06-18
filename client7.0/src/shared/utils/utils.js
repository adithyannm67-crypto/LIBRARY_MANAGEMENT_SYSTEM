export function getAuthorString(authors) {
  const values = Object.values(authors ?? {}).filter(Boolean);

  return values.length ? values.join(" and ") : "Unknown Author";
}

export function formatDate(date) {
  if (!date) return "";

  //YYYY
  if (/^\d{4}$/.test(date)) return date;

  //YYYY-MM
  if (/^\d{4}-\d{2}$/.test(date)) {
    const [year, month] = date.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
    });
  }

  //YYYY-MM-DD
  const d = new Date(date);
  if (isNaN(d)) return date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateandTime(date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function getCoverUrl(coverid) {
  return coverid
    ? `https://covers.openlibrary.org/b/id/${coverid}-M.jpg`
    : null;
}
