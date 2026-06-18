
export function getCoverUrl(coverid) {
  return coverid
    ? `https://covers.openlibrary.org/b/id/${coverid}-M.jpg`
    : null;
}
