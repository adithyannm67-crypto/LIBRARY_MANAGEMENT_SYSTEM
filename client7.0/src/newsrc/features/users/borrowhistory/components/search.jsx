

export const SearchComponent = () => {
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