import styles from "./component.module.css";

import { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Search, Filter } from "lucide-react";

import { FilterModal } from "../utils/components.utils";

export default function SearchContainer({
  isLoading: loading,
  setSearchTerm,
  searchTerm,
  setFilter,
  filter,
  filterOptions,
  searchBarPlaceholder,
  sortBy,
  setSortBy,
  sortOptions,
}) {
  const filterState = useFilters(filter, setFilter);

  return (
    <div className={styles.searchBarContainer}>
      {loading ? (
        <Skeleton height={50} />
      ) : (
        <>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder={searchBarPlaceholder}
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            aria-label="Open filters"
            className={styles.filterWrapper}
            onClick={filterState.toggleFilters}
          >
            <Filter className={styles.filterIcon} />
          </button>

          {sortBy && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortContainer}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </>
      )}

      {filterState.isOpen && (
        <FilterModal filterOptions={filterOptions} filterState={filterState} />
      )}
    </div>
  );
}

function useFilters(filter, setFilter) {
  const [draftFilters, setDraftFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setDraftFilters(filter);
    }
  }, [isOpen, filter]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isOpen]);

  const addFilter = (option) => {
    setDraftFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option],
    );
  };

  const removeFilter = (option) => {
    setDraftFilters((prev) => prev.filter((f) => f !== option));
  };

  const clearFilters = () => {
    setDraftFilters([]);
    setFilter([]);
    setIsOpen(false);
  };

  const applyFilters = () => {
    setFilter(draftFilters);
    setIsOpen(false);
  };

  const toggleFilters = () => setIsOpen((prev) => !prev);
  return {
    draftFilters,
    isOpen,
    addFilter,
    removeFilter,
    applyFilters,
    clearFilters,
    setIsOpen,
    filterRef,
    toggleFilters,
  };
}
