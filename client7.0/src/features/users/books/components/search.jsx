"use client";

import SearchContainer from "@/features/users/shared/components/searchContainer.jsx";

import { usePage } from "../providers/books.provider";

const SearchComponent = () => {
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filterOptions,
    sortBy,
    setSortBy,
    SORT_OPTIONS,
  } = usePage();
  return (
    <SearchContainer
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filter={filter}
      setFilter={setFilter}
      filterOptions={filterOptions}
      searchBarPlaceholder="Search by title, author, or genre..."
      sortBy={sortBy}
      setSortBy={setSortBy}
      sortOptions={SORT_OPTIONS}
    />
  );
};

export default SearchComponent;
