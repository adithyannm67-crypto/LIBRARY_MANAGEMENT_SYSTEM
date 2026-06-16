import { useEffect, useMemo, useState } from "react";
import {fetchAvailableBooks} from "#root/components/usersHome/Actions/AvailableBooks";
import { getAuthorString } from "#root/common";
import {
  getFilteredBooks,
  sortBooks,
} from "#root/components/usersHome/utils/books.utils";
import { useAppData } from "#root/context/AppDataContext";

export default function usePage() {
  const { loading, stats } = useAppData();
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loadinglocal, setLoadingLocal] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [filter, setFilter] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const borrowedBookIds = useMemo(
    () => new Set((stats?.activeBorrows ?? []).map((b) => b.bookid)),
    [stats?.activeBorrows],
  );

  useEffect(() => {
    if (loading) return;
    let mounted = true;
    async function fetchData() {
      setLoadingLocal(true);
      try {
        const data = await fetchAvailableBooks();
        const formattedData = data.map((book) => ({
          ...book,
          authorString: getAuthorString(book.authors),
        }));
        if (mounted) setAvailableBooks(formattedData);
      } catch (err) {
        console.error(err.message);
      } finally {
        if (mounted) setLoadingLocal(false);
      }
    }
    fetchData();
    return () => {
      mounted = false;
    };
  }, [loading]);

  //Filtering books based on search and filters
  const filteredBooks = useMemo(
    () => getFilteredBooks(availableBooks, filter, searchTerm, borrowedBookIds),
    [availableBooks, searchTerm, filter, borrowedBookIds],
  );

  //sorting books
  const sortedBooks = useMemo(
    () => sortBooks(filteredBooks, sortBy),
    [filteredBooks, sortBy],
  );
  const isLoading = loading || loadinglocal;

  return {
    borrowedBookIds,
    isLoading,
    sortedBooks,
    selectedBook,
    setSelectedBook,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    sortBy,
    setSortBy,
  };
}
