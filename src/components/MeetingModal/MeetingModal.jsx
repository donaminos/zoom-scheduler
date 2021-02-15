import React from "react";
import ReactModal from "react-modal";
import { Formik, Form, Field } from "formik";
import format from "date-fns/format";
import differenceInMinutes from "date-fns/differenceInMinutes";

import { MeetingForm } from "../MeetingForm";
import { Alert } from "../Alert";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  content: {
    position: "absolute",
    width: "30rem",
    height: "25rem",
    top: "25%",
    margin: "0 auto",

    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "2rem",
  },
};

export const MeetingModal = ({
  meeting,
  isOpen,
  isEditing,
  onCancel,
  onSave,
}) => {
  if (!meeting) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      // TODO: remove after setting app id
      ariaHideApp={false}
      style={modalStyle}
    >
      {isEditing ? (
        <MeetingForm meeting={meeting} onCancel={onCancel} onSave={onSave} />
      ) : (
        <Alert onClick={onCancel} message="Your meeting is saved" />
      )}
    </ReactModal>
  );
};
