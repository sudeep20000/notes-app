import React from "react";
import "./Group.css";

export default function Group({
  groupObj,
  groupNo,
  selectedGrp,
  isActive,
  handelOpenNoteAndGrpNo,
}) {
  function createAbbreviation(name) {
    const abbreviation = name.slice(0, 2).toUpperCase();
    return abbreviation;
  }
  const abbreviation = createAbbreviation(groupObj.name);

  let color = {};
  if (selectedGrp === groupNo && isActive) {
    color.bgCol = "#f7ecdc";
  } else {
    color.bgCol = "#fff";
  }

  const openNote = () => {
    handelOpenNoteAndGrpNo(groupNo);
  };

  return (
    <li
      className="group"
      onClick={openNote}
      style={{ backgroundColor: color.bgCol }}
    >
      <div className="icon" style={{ backgroundColor: groupObj.col }}>
        {abbreviation}
      </div>
      <p className="groupTitle">{groupObj.name}</p>
    </li>
  );
}
