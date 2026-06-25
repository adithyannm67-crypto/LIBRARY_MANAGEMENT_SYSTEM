"use client";

import SearchContainer from "@/features/users/shared/components/searchContainer.jsx";

import { usePage } from "../providers/borrowhistory.provider.js";

const SearchComponent = () => {
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    filterOptions,
    SORT_OPTIONS,
  } = usePage();

  return (
    <SearchContainer
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
      setFilter={setFilter}
      filter={filter}
      sortBy={sortBy}
      setSortBy={setSortBy}
      searchBarPlaceholder="Search by title or author..."
      filterOptions={filterOptions}
      sortOptions={SORT_OPTIONS}
    />
  );
};

export default SearchComponent;
