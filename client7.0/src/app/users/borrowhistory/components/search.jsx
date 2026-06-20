"use client";

import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";
import { SORT_OPTIONS, getFilterOptions } from "#root/components/usersHome/utils/borrowhistory.utils.js";
import { usePage } from "../borrowhistory.provider.js";
import { useMemo } from "react";

const SearchComponent = () => {
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    borrowedBooks,
    sortBy,
    setSortBy,
  } = usePage();

  const filterOptions = useMemo(
    () => getFilterOptions(borrowedBooks),
    [borrowedBooks],
  );

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
