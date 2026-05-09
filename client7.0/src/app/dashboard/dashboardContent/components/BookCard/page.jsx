import { Clock, AlertCircle, CheckCircle, Dot } from "lucide-react";
import "./page.css";

export function BookCard({ title, author, duedate, returndate, borrowdate }) {
  const isOverdue = new Date(duedate) < new Date() && !returndate;
  const returnedLate = returndate && new Date(returndate) > new Date(duedate);
  const StatusIcon = returndate
    ? returnedLate
      ? AlertCircle
      : CheckCircle
    : isOverdue
      ? AlertCircle
      : Clock;
  return (
    <div className="book-card">
      <div className="book-row">
        <div className="book-cover" />

        <div className="book-content">
          <h3 className="book-title">{title}</h3>

          <p className="book-author">{author}</p>

          <div className={`book-status`}>
            <div className="icon-wrapper">
              <StatusIcon />
            </div>
            <span>Borrowed on {borrowdate}</span>

            {!returndate && (
              <>
                <Dot />
                <span className={`${isOverdue ? "overdue" : ""}`}>
                  {isOverdue ? "Overdue since " : "Due on "} {duedate}
                </span>
              </>
            )}

            {returndate && (
              <>
                <Dot />
                <span className="returned">Returned on {returndate}</span>

                {returnedLate && (
                  <>
                    <Dot />
                    <span className="late">Returned late</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
