import React from "react";
import "./Note.css";

export default function Note({ text }) {
  return (
    <li className="note-details">
      <div className="date-time">
        <div className="time">{text.time}</div>
        <div className="date">{text.date}</div>
      </div>
      <pre className="text">{text.note}</pre>
    </li>
  );
}
