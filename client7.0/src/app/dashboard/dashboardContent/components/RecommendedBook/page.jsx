"use client";
import "./page.css";

export default function AvailableBookCard({ title, author, genre, onClick }) {
  return (
    <div className="rec-item" onClick={onClick}>
      <div className="rec-cover" />

      <div className="rec-content">
        <h4 className="rec-title">{title}</h4>

        <p className="rec-author">{author}</p>

        <div className="rec-meta">
          <span className="rec-genre">• {genre}</span>
        </div>
      </div>
    </div>
  );
}
