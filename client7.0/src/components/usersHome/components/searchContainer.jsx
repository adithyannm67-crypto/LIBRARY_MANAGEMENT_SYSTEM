import { useState, useEffect, useRef, useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Search, Filter, X } from "lucide-react";

import styles from "./component.module.css";

export default function SearchContainer({
  loading,
  loadinglocal,
  setSearchTerm,
  searchTerm,
  setFilter,
  filter,
  filterOptions,
  searchBarPlaceholder,
}) {
  const [draftFilters, setDraftFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

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
  return (
    <div className={styles.searchBarContainer}>
      {loading || loadinglocal ? (
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
            className={styles.filterWrapper}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            <Filter className={styles.filterIcon} />
          </button>
        </>
      )}
      {isOpen && (
        <div
          ref={filterRef}
          onClick={(e) => e.stopPropagation()}
          className={styles.filterContainer}
        >
          <header className={styles.filterHeader}>
            <h2>Filter By </h2>

            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </header>

          <div className={styles.filterSection}>
            {filterOptions.map((filterOption) => (
              <details className={styles.filterOption} key={filterOption.name}>
                <summary>{filterOption.name}</summary>
                <ul>
                  {filterOption.options.map((option) => (
                    <li
                      className={styles.filterCheckbox}
                      key={`${filterOption.name}-${option}`}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={draftFilters.includes(option)}
                          onChange={() => {
                            addFilter(option);
                          }}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          <footer className={styles.filterFooter}>
            {draftFilters.length > 0 && (
              <div className={styles.filterSelected}>
                {draftFilters.map((f) => {
                  return (
                    <div key={f} className={styles.filter}>
                      <span>{f}</span>
                      <div
                        className={styles.filterXWrapper}
                        onClick={() => {
                          removeFilter(f);
                        }}
                      >
                        <X className={styles.filterX} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className={styles.filterButtons}>
              <button
                className={styles.btn1}
                onClick={() => {
                  setDraftFilters([]);
                  setFilter([]);
                  setIsOpen(false);
                }}
              >
                Clear All Filters
              </button>
              <button
                className={styles.btn1}
                onClick={() => {
                  setFilter(draftFilters);
                  setIsOpen(false);
                }}
              >
                Apply Filters
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
