import React, { useState } from "react";
import "./Form.css";

export default function Form({ closeWindow, toggleModal, pushNewGrp }) {
  const [colorArr, setColorArr] = useState([
    { color: "#b38bfa", bColor: "none" },
    { color: "#ff79f2", bColor: "none" },
    { color: "#43e6fc", bColor: "none" },
    { color: "#f19576", bColor: "none" },
    { color: "#0047ff", bColor: "none" },
    { color: "#6691ff", bColor: "none" },
  ]);
  const [groupName, setGroupName] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);

  const saveName = (e) => {
    setGroupName(e.target.value);
  };

  const saveColor = (col, i) => {
    let arr = [
      { color: "#b38bfa", bColor: "none" },
      { color: "#ff79f2", bColor: "none" },
      { color: "#43e6fc", bColor: "none" },
      { color: "#f19576", bColor: "none" },
      { color: "#0047ff", bColor: "none" },
      { color: "#6691ff", bColor: "none" },
    ];
    arr[i].bColor = `3px solid ${arr.color}`;
    setColor(col);
    setColorArr(arr);
  };

  const onCreateGrp = (e) => {
    e.preventDefault();
    if (color.length === 0 || groupName.length === 0) {
      setError(true);
      return;
    }
    toggleModal(e);

    let group = {};
    group.name = groupName;
    group.col = color;

    let allGrpDetails = JSON.parse(localStorage.getItem("allGrpDetails")) || [];
    allGrpDetails.push(group);
    localStorage.setItem("allGrpDetails", JSON.stringify(allGrpDetails));

    pushNewGrp();
    setGroupName("");
    setColor("");
  };

  const closePopup = () => {
    closeWindow();
  };

  return (
    <div className="modal">
      <div className="overlay" onClick={closePopup}></div>
      <div className="form">
        <p className="form-title">Create New Notes Group</p>
        <div className="grp-name">
          <span className="grp-title">Group Name</span>
          <div className="container">
            <input
              type="text"
              placeholder="Enter your group name..."
              onChange={saveName}
            />
            {error && groupName.length === 0 ? (
              <label>Name is required</label>
            ) : null}
          </div>
        </div>

        <div className="color-name">
          <span className="color-title">Choose colour</span>
          <div className="container">
            <ul className="color-container">
              {colorArr.map((colorObj, i) => (
                <li
                  style={{
                    backgroundColor: colorObj.color,
                    border: colorObj.bColor,
                  }}
                  key={i}
                  onClick={() => saveColor(colorObj.color, i)}
                ></li>
              ))}
            </ul>
            {error && color.length === 0 ? <label>Choose a color</label> : null}
          </div>
        </div>

        <button className="create-btn" onClick={onCreateGrp}>
          Create
        </button>
      </div>
    </div>
  );
}
