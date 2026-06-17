export function getFilteredBooks({
  availableBooks,
  filter=[],
  searchTerm="",
  borrowedBookIds,
}) {
   const filters = Array.isArray(filter)
    ? filter
    : filter
      ? [filter]
      : [];
  const search = searchTerm?searchTerm.toLowerCase():"";
  return availableBooks?.filter((book) => {
    const authorString = book.authorString.toLowerCase();
    const title = book.title.toLowerCase();
    const genre = book.genre.toLowerCase();

    const matchesSearch =
      title.includes(search) ||
      authorString.includes(search) ||
      genre.includes(search);
    const matchesFilter =
      filters?.length === 0 ||
      filters?.some((f) => {
        const value = f.toLowerCase();
        return (
          authorString.includes(value) ||
          genre.includes(value) ||
          (value === "available" && book.availablecopies > 0) ||
          (value === "out of stock" && book.availablecopies <= 0)
          // ||(value === "borrowed" && borrowedBookIds.has(book.bookid))
        );
      });

    return matchesSearch && matchesFilter;
  });
}

export function sortBooks(group, sortBy) {
  console.log(
    "sortBooks",
    group,
    sortBy,
    typeof window === "undefined" ? "SERVER" : "CLIENT"
  );


  const sorted = [...group];
  switch (sortBy) {
    case "title-asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "title-desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case "author-asc":
      sorted.sort((a, b) => a.authorString.localeCompare(b.authorString));
      break;
    case "author-desc":
      sorted.sort((a, b) => b.authorString.localeCompare(a.authorString));
      break;
    default:
      return sorted;
  }
  return sorted;
}

export function getFilterOptions(books) {
  return [
    {
      name: "Genres",
      options: [...new Set(books?.map((book) => book.genre).filter(Boolean))],
    },
    {
      name: "Authors",
      options: [
        ...new Set(
          books?.flatMap((book) => Object.values(book.authors)).filter(Boolean),
        ),
      ],
    },
    {
      options: ["Available", "Out of Stock", "Borrowed"],
    },

    // Add more filter options as needed
  ];
}

export const SORT_OPTIONS = [
  { label: "Default", value: "default" },
  {
    label: "Title (A-Z)",
    value: "title-asc",
  },
  {
    label: "Title (Z-A)",
    value: "title-desc",
  },
  {
    label: "Author (A-Z)",
    value: "author-asc",
  },
  {
    label: "Author (Z-A)",
    value: "author-desc",
  },
];
