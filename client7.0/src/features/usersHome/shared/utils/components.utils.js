export function getBadge(duedate, returndate) {
  const today = new Date();
  const daysLeft = (duedate - today) / (1000 * 60 * 60 * 24);

  if (returndate) {
    return returndate > duedate
      ? { badge: "Returned Late", cls: "returned-late" }
      : { badge: "Returned", cls: "returned" };
  }

  if (duedate < today) {
    return { badge: "Overdue", cls: "overdue" };
  }

  if (daysLeft <= 3) {
    return { badge: "Due Soon", cls: "due-soon" };
  }

  return { badge: "Active", cls: "active" };
}
import { X } from "lucide-react";
import styles from "@/features/usersHome/components/component.module.css";

export function FilterModal({ filterOptions, filterState }) {
  const {
    filterRef,
    draftFilters,
    setIsOpen,
    removeFilter,
    applyFilters,
    clearFilters,
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
                    onClick={() => removeFilter(f)}
                  >
                    <X className={styles.filterX} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <div className={styles.filterButtons}>
          <button className={styles.btn1} onClick={clearFilters}>
            Clear All Filters
          </button>
          <button className={styles.btn1} onClick={applyFilters}>
            Apply Filters
          </button>
        </div>
      </footer>
    </div>
  );
}

const FilterCheckBoxList = ({ filterName, options, filterState }) => {
  const { draftFilters, addFilter } = filterState;
  return (
    <ul className={styles.filterCheckboxContainer}>
      {options.map((option) => (
        <li className={styles.filterCheckbox} key={`${filterName}-${option}`}>
          <label>
            <input
              type="checkbox"
              checked={draftFilters.includes(option)}
              onChange={() => addFilter(option)}
            />
            {option}
          </label>
        </li>
      ))}
    </ul>
  );
};
