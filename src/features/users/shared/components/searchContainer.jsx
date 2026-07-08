"use client";
import styles from "../styles/search.styles.module.css";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Search, Filter } from "lucide-react";

import FilterModal from "./filterModal";

export default function SearchContainer({
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
  const filterState = useFilters(filter, setFilter, setSearchTerm, setSortBy);

  return (
    <div className={styles.searchMain}>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder={searchBarPlaceholder}
            className={styles.searchInput}
            value={searchTerm}
            onChange={filterState.handleSearch}
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
            onChange={filterState.handleSort}
            className={styles.sortContainer}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
      {filterState.isOpen && (
        <FilterModal filterOptions={filterOptions} filterState={filterState} />
      )}
    </div>
  );
}

function useFilters(filter, setFilter, setSearchTerm, setSortBy) {
  const [draftFilters, setDraftFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterRef = useRef(null);
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const updateQueryParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (isEmpty) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };

  const updateStateAndQuery = (setter, key, value) => {
    setter(value);
    updateQueryParam(key, value);
  };

  const handleSearch = (e) => {
    updateStateAndQuery(setSearchTerm, "q", e.target.value);
  };

  const handleSort = (e) => {
    updateStateAndQuery(setSortBy, "sort", e.target.value);
  };

  const toggleDraftFilter = (option) => {
    setDraftFilters((prev) =>
      prev.includes(option)
        ? prev.filter((f) => f !== option)
        : [...prev, option],
    );
  };

  const closeAndUpdateFilters = (filters) => {
    setIsOpen(false);
    updateQueryParam("filter", filters);
  };

  const clearFilters = () => {
    setDraftFilters([]);
    setFilter([]);
    closeAndUpdateFilters([]);
  };

  const applyFilters = () => {
    setFilter(draftFilters);
    closeAndUpdateFilters(draftFilters);
  };

  const toggleFilters = () => setIsOpen((prev) => !prev);
  return {
    draftFilters,
    isOpen,
    applyFilters,
    clearFilters,
    setIsOpen,
    filterRef,
    toggleFilters,
    handleSearch,
    handleSort,
    toggleDraftFilter,
  };
}
