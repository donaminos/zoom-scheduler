import React from "react";
import { Formik, Form, Field } from "formik";
import format from "date-fns/format";
import differenceInMinutes from "date-fns/differenceInMinutes";

const inputStyle = {
  border: "1px solid grey",
  width: "100%",
  height: "44px",
  appearance: "none",
  outline: "none",
};
const btnStyle = {
  width: "10rem",
  height: "2.5rem",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  appearance: "none",
  outline: "none",
};
const disabledFieldStyle = {
  border: "none",
  width: "100%",
  appearance: "none",
  outline: "none",
  margin: "1rem 0 0",
};

export const MeetingForm = ({ meeting, onCancel, onSave }) => {
  return (
    <Formik
      initialValues={{
        topic: "",
        start: meeting?.start,
        end: meeting?.end,
      }}
      onSubmit={onSave}
    >
      <Form>
        <h3>Your meeting details:</h3>

        <Field
          type="text"
          placeholder="Enter a meeting topic"
          name="topic"
          style={inputStyle}
        />

        <Field disabled name="date">
          {(field) => (
            <div style={disabledFieldStyle}>
              <input type="hidden" {...field} />
              <span>Date:</span> &nbsp;
              <span>{meeting && format(meeting.start, "dd MMM yyyy")}</span>
            </div>
          )}
        </Field>
        <Field disabled name="start">
          {(field) => (
            <div style={disabledFieldStyle}>
              <input type="hidden" {...field} />
              <span>Start:</span> &nbsp;
              <span>{meeting && format(meeting.start, "HH:mm aaaa")}</span>
            </div>
          )}
        </Field>
        <Field disabled name="end">
          {(field) => (
            <div style={disabledFieldStyle}>
              <input type="hidden" {...field} />
              <span>End:</span>&nbsp;
              <span>{meeting && format(meeting.end, "HH:mm aaaa")}</span>
            </div>
          )}
        </Field>

        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            justifyContent: "center",
            alignSelf: "flex-end",
            margin: "5rem 0 0 0",
          }}
        >
          <button
            style={{
              ...btnStyle,
              backgroundColor: "grey",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              ...btnStyle,
              backgroundColor: "green",
            }}
          >
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
};
