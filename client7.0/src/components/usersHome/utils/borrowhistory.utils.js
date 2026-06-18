export function getFilteredBooks({
  borrowedBooks,
  filter = [],
  searchTerm = "",
}) {
  const filters = Array.isArray(filter) ? filter : filter ? [filter] : [];
  return borrowedBooks.filter((book) => {
    const authorString = book.authorString.toLowerCase();
    const title = book.title.toLowerCase();
    const search = searchTerm?.toLowerCase();

    const matchesSearch =
      title.includes(search) || authorString.includes(search);
    const matchesFilter =
      filters?.length === 0 ||
      filters?.some((f) => authorString.includes(f.toLowerCase()));

    return matchesSearch && matchesFilter;
  });
}

export function getBooksByGroup(books, sortBy) {
  const groups = {
    Active: [],
    "Last week": [],
    "Last month": [],
    "Last year": [],
    Older: [],
  };

  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(now.getDate() - 7);
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(now.getMonth() - 1);
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);

  const oneWeekAgoTimestamp = oneWeekAgo.getTime();
  const oneMonthAgoTimestamp = oneMonthAgo.getTime();
  const oneYearAgoTimestamp = oneYearAgo.getTime();

  const getGroup = (returnDate) => {
    if (returnDate == null) return "Active";

    const date = new Date(returnDate).getTime();

    if (date >= oneWeekAgoTimestamp) return "Last week";
    if (date >= oneMonthAgoTimestamp) return "Last month";
    if (date >= oneYearAgoTimestamp) return "Last year";
    return "Older";
  };

  books.forEach((book) => {
    groups[getGroup(book.returndate)].push(book);
  });
  for (const [groupName, group] of Object.entries(groups)) {
    sortGroup(group, groupName, sortBy);
  }
  return groups;
}

export function getFilterOptions(books) {
  return [
    {
      name: "Authors",
      options: [
        ...new Set(
          books?.flatMap((book) => Object.values(book.authors)).filter(Boolean),
        ),
      ],
    },
    // Add more filter options as needed
  ];
}

export const SORT_OPTIONS = [
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

function sortGroup(group, groupName, sortBy) {
  switch (sortBy) {
    case "title-asc":
      group.sort((a, b) => a.title.localeCompare(b.title));
      break;

    case "title-desc":
      group.sort((a, b) => b.title.localeCompare(a.title));
      break;

    case "author-asc":
      group.sort((a, b) => a.authorString.localeCompare(b.authorString));
      break;
    case "author-desc":
      group.sort((a, b) => b.authorString.localeCompare(a.authorString));
      break;
    case "default":
    default:
      if (groupName === "Active") {
        group.sort((a, b) => new Date(a.duedate) - new Date(b.duedate));
      } else {
        group.sort((a, b) => new Date(b.returndate) - new Date(a.returndate));
      }
  }
}
