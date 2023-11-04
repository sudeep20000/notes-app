import React from "react";
import "./Default.css";

export default function Default() {
  return (
    <div className="default">
      <div className="first">
        <img src="img/pic1.png" alt="pic1" className="pic1" />
        <img src="img/Notes.png" alt="note" className="notes" />
        <img src="img/des.png" alt="des" className="des" />
      </div>
      <div className="second">
        <img src="img/lock.png" alt="lock" className="lock" />
        <img src="img/ete.png" alt="ete" className="ete" />
      </div>
    </div>
  );
}
