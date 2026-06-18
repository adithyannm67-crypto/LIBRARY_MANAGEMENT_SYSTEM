import { useBookDetails } from "../providers/usePage";

export const BorrowedBadge = () => {
  const { borrowed } = useBookDetails();
  return borrowed && <span className={styles.borrowed}>Already Borrowed</span>;
};
