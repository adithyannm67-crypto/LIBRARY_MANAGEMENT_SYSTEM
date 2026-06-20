"use client";
import SearchContainer from "#root/components/usersHome/components/searchContainer.jsx";
import { SORT_OPTIONS } from "#root/components/usersHome/utils/books.utils.js";
import { usePage } from "../books.provider";


 const SearchComponent = () => {
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filterOptions,
    sortBy,
    setSortBy,
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