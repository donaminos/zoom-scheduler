import React from "react";

export const Alert = ({ onClick, message, meeting }) => {
  return (
    <div>
      <h3>{message}</h3>
      {meeting && meeting.url && <p>Url:&nbsp;{meeting.url}</p>}
      <button
        style={{
          width: "10rem",
          height: "2.5rem",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          appearance: "none",
          outline: "none",
          backgroundColor: "grey",
        }}
        onClick={onClick}
      >
        Close
      </button>
    </div>
  );
};
