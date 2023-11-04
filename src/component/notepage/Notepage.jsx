import React, { useState } from "react";
import Note from "../notes details/Note";
import "./Notepage.css";

export default function Notepage({ groups, groupNum, backToGrpSec }) {
  const [userNote, setUserNote] = useState("");

  function createAbbreviation(groupName) {
    const abbreviation = groupName.slice(0, 2).toUpperCase();
    return abbreviation;
  }
  const abbreviation = createAbbreviation(groups[groupNum].name);

  const saveNotes = () => {
    if (!userNote.length) return;

    let currentDateTime = new Date();
    let time = currentDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const currentDate = new Date();
    const day = currentDate.getDate().toString();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    const date = `${day} ${month} ${year}`;

    let userNotes = {};
    userNotes.note = userNote;
    userNotes.time = time;
    userNotes.date = date;

    if (groups[groupNum].notes) {
      groups[groupNum].notes = [...groups[groupNum].notes, userNotes];
      localStorage.setItem("allGrpDetails", JSON.stringify(groups));
    } else {
      groups[groupNum].notes = [userNotes];
      localStorage.setItem("allGrpDetails", JSON.stringify(groups));
    }
    setUserNote("");
  };

  const storeUserNotes = (e) => {
    setUserNote(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      let text = userNote + "\n";
      setUserNote(text);
    } else if (e.key === "Enter") {
      e.preventDefault();
      saveNotes();
    }
  };

  const backToGrp = () => {
    backToGrpSec();
    const grpsec = document.querySelector(".grp-sec");
    const notesec = document.querySelector(".note-sec");
    grpsec.classList.remove("hide");
    notesec.style.display = "none";
  };

  return (
    <div className="note-section">
      <nav>
        <ul className="nav-items">
          {window.screen.width >= 320 && window.screen.width <= 425 ? (
            <img src="img/back.png" alt="back" onClick={backToGrp} />
          ) : null}
          <li
            className="ns-group-icon"
            style={{ backgroundColor: groups[groupNum].col }}
          >
            {abbreviation}
          </li>
          <li className="ns-group-name">{groups[groupNum].name}</li>
        </ul>
      </nav>
      <div className="note-box">
        <ul>
          {groups[groupNum].notes?.map((note, i) => (
            <Note text={note} key={i} />
          ))}
        </ul>
      </div>
      <div className="user-input">
        <div className="input-box">
          <textarea
            rows={6}
            cols={86}
            placeholder="Enter your text here.........."
            className="myTextarea"
            value={userNote}
            onChange={storeUserNotes}
            onKeyDown={handleKeyPress}
          />
          <img src="img/Enter.png" alt="Enter" onClick={saveNotes} />
        </div>
      </div>
    </div>
  );
}
