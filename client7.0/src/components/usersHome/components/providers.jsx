
export const useBorrowedBookCard = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isUserHome = pathSegments.length === 1;
};
