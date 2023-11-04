import React, { useState } from "react";
import "./NoteApp.css";
import Group from "../group/Group";
import Default from "../default BgImg/Default";
import Notepage from "../notepage/Notepage";
import Form from "../form/Form";

export default function NoteApp() {
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("allGrpDetails"))
  );
  const [modal, setModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [groupNum, setGroupNum] = useState(null);
  const [active, setActive] = useState(false);

  const pushNewGrp = () => {
    setGroups(JSON.parse(localStorage.getItem("allGrpDetails")));
  };

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const closePopup = () => {
    setModal(!modal);
  };

  const openNoteAndsetGrpNo = (num) => {
    const grpsec = document.querySelector(".grp-sec");
    const notesec = document.querySelector(".note-sec");
    if (window.screen.width >= 320 && window.screen.width <= 425) {
      grpsec.classList.add("hide");
      notesec.style.display = "block";
      notesec.style.width = "100vw";
    }

    if (num === groupNum) {
      setShowNotes(!showNotes);
      setActive(!active);
    } else {
      setShowNotes(true);
      setActive(true);
    }
    setGroupNum(num);
  };

  const backToGrpSec = () => {
    setShowNotes(!showNotes);
    setActive(!active);
  };

  return (
    <>
      <div className="grp-sec">
        <div className="group-container">
          <h2 className="title">Pocket Notes</h2>
          <button onClick={toggleModal} className="btn">
            <img src="img/+.png" alt="add" />
            <span>Create Notes group</span>
          </button>
          <ul className="grp-container">
            {groups?.map((groupObj, i) => (
              <Group
                groupObj={groupObj}
                groupNo={i}
                selectedGrp={groupNum}
                isActive={active}
                handelOpenNoteAndGrpNo={openNoteAndsetGrpNo}
                key={i}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="note-sec">
        {showNotes ? (
          <Notepage
            groups={groups}
            groupNum={groupNum}
            backToGrpSec={backToGrpSec}
          />
        ) : (
          <Default />
        )}
      </div>
      {modal && (
        <Form
          closeWindow={closePopup}
          toggleModal={toggleModal}
          pushNewGrp={pushNewGrp}
        />
      )}
    </>
  );
}
