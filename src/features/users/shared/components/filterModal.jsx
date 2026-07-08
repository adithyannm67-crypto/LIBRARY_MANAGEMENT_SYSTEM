"use client";

import styles from "../styles/search.styles.module.css";
import BtnStyles from "./component.module.css";

import { X } from "lucide-react";

export default function FilterModal({ filterOptions, filterState }) {
  const {
    filterRef,
    draftFilters,
    setIsOpen,

    applyFilters,
    clearFilters,
    toggleDraftFilter,
  } = filterState;
  return (
    <div ref={filterRef} className={styles.filterContainer}>
      <header className={styles.filterHeader}>
        <h2>Filter By </h2>

        <button aria-label="Close filter" onClick={() => setIsOpen(false)}>
          <X />
        </button>
      </header>

      <div className={styles.filterSection}>
        {filterOptions.map((filterGroup, index) => {
          const key = filterGroup.name || `filterGroup-${index}`;
          const hasGroupName = Boolean(filterGroup.name);
          return hasGroupName ? (
            <details className={styles.filterOption} key={key}>
              <summary>{filterGroup.name}</summary>
              <FilterCheckBoxList
                filterName={filterGroup.name}
                options={filterGroup.options}
                filterState={filterState}
              />
            </details>
          ) : (
            <div className={styles.filterGroup} key={key}>
              <FilterCheckBoxList
                filterName={filterGroup.name}
                options={filterGroup.options}
                filterState={filterState}
              />
            </div>
          );
        })}
      </div>
      <footer className={styles.filterFooter}>
        {draftFilters.length > 0 && (
          <div className={styles.filterSelected}>
            {draftFilters.map((f) => {
              return (
                <div key={f} className={styles.filter}>
                  <span>{f}</span>
                  <button
                    aria-label="Remove filter"
                    className={styles.filterXWrapper}
                    onClick={() => toggleDraftFilter(f)}
                  >
                    <X className={styles.filterX} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.filterButtons}>
          <button className={BtnStyles.btn1} onClick={clearFilters}>
            Clear All Filters
          </button>
          <button className={BtnStyles.btn1} onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </footer>
    </div>
  );
}

const FilterCheckBoxList = ({ filterName, options, filterState }) => {
  const { draftFilters, toggleDraftFilter } = filterState;
  return (
    <ul className={styles.filterCheckboxContainer}>
      {options.map((option) => (
        <li className={styles.filterCheckbox} key={`${filterName}-${option}`}>
          <label>
            <input
              type="checkbox"
              checked={draftFilters.includes(option)}
              onChange={() => toggleDraftFilter(option)}
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
};
