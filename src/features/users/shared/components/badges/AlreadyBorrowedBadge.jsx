"use client";

import { useAppData } from "#root/context/AppDataContext.jsx";

const AlreadyBorrowedBadge = ({ bookid }) => {
  const { borrowedBookIds } = useAppData();

  return (
    borrowedBookIds.has(Number(bookid)) && (
      <span className="badge borrowed-badge">Borrowed</span>
    )
  );
};

export default AlreadyBorrowedBadge;