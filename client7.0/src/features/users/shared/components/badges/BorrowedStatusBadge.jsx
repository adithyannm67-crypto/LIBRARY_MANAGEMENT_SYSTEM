const BorrowedStatusBadge = ({ duedate, returndate }) => {
  const today = new Date();
  const daysLeft = (duedate - today) / (1000 * 60 * 60 * 24);
  let badge = "Active";
  let cls = "active";

  if (returndate) {
    if (returndate > duedate) {
      badge = "Returned Late";
      cls = "returned-late";
    } else {
      badge = "Returned";
      cls = "returned";
    }
  }

  if (duedate < today) {
    badge = "Overdue";
    cls = "overdue";
  }

  if (daysLeft <= 3) {
    badge = "Due Soon";
    cls = "due-soon";
  }

  return <span className={`badge ${cls}`}>{badge}</span>;
};

export default BorrowedStatusBadge;
