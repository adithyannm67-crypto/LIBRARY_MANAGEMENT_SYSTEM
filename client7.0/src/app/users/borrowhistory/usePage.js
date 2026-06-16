import { useEffect, useMemo, useState } from "react";

import fetchBorrowedBooks from "#root/components/usersHome/Actions/BorrowedBooks";
import { getAuthorString } from "#root/common";
import {
  getBooksByGroup,
  getFilteredBooks,
} from "#root/components/usersHome/utils/borrowhistory.utils";

import { useAppData } from "#root/context/AppDataContext";
export const usePage = () => {
  const { loading } = useAppData();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [filter, setFilter] = useState([]);
  const [booksLoading, setBooksLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  useEffect(() => {
    if (loading) return;
    let mounted = true;
    async function fetchData() {
      setBooksLoading(true);
      try {
        const data = await fetchBorrowedBooks();
        const formattedData = data.map((book) => ({
          ...book,
          authorString: getAuthorString(book.authors),
        }));
        if (mounted) setBorrowedBooks(formattedData);
      } catch (err) {
        console.error(err.message);
      } finally {
        if (mounted) setBooksLoading(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [loading]);

  //Filtering books based
  const filteredBooks = useMemo(
    () =>
      getFilteredBooks({
        borrowedBooks,
        filter,
        searchTerm,
      }),
    [searchTerm, filter, borrowedBooks],
  );

  //Grouping books based on borrow time
  const groupedBooks = useMemo(
    () => getBooksByGroup(filteredBooks, sortBy),
    [filteredBooks, sortBy],
  );

  //Closing popup
  const closePopup = () => {
    setSelectedBook(null);
    document.body.style.overflow = "auto";
  };

  const isLoading = loading || booksLoading;

  return {
    isLoading,
    groupedBooks,
    selectedBook,
    setSelectedBook,
    borrowedBooks,
    setBorrowedBooks,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    closePopup,
  };
};
