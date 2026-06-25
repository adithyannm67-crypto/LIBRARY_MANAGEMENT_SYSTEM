import { getAuthorString, getCoverUrl } from "./utils";

export default function (book) {
  return {
    ...book,
    authorString: getAuthorString(book.authors),
    coverurl: getCoverUrl(book.coverid),
  };
}
