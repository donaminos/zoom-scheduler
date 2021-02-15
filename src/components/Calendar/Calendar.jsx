import React, { Fragment, useReducer } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS, fr } from "date-fns/locale";

import { MeetingModal } from "../MeetingModal";

const locales = {
  "en-US": enUS,
  "fr-FR": fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(BigCalendar);

const reducer = (state, action) => {
  switch (action.type) {
    case "select_slot":
      return {
        ...state,
        isModalOpen: true,
        isEditing: true,
        meeting: action.payload.meeting,
      };
    case "save_meeting":
      return {
        ...state,
        isModalOpen: true,
        isEditing: false,
      };
    case "close_modal":
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};

const initialState = {
  isModalOpen: false,
  selectedSlot: undefined,
};
export const Calendar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSelectSlot = (e) => {
    dispatch({
      type: "select_slot",
      payload: {
        meeting: e,
      },
    });
  };

  const onEventDrop = (e) => console.log("onEventDrop >> ", e);
  const onEventResize = (e) => console.log("onEventResize >> ", e);
  const onDragStart = (e) => console.log("onDragStart >> ", e);
  const dragFromOutsideItem = (e) => console.log("dragFromOutsideItem >> ", e);
  const onDropFromOutside = (e) => console.log("onDropFromOutside >> ", e);
  const handleDragStart = (e) => console.log("handleDragStart >> ", e);

  const closeModal = () => {
    dispatch({ type: "close_modal" });
  };
  const handleSubmit = (values) => {
    console.log("handle submit :", values);
    dispatch({ type: "save_meeting" });
  };

  return (
    <Fragment>
      <MeetingModal
        isOpen={state.isModalOpen}
        meeting={state.meeting}
        onCancel={closeModal}
        onSave={handleSubmit}
        isEditing={state.isEditing}
      />
      <DnDCalendar
        localizer={localizer}
        events={[]}
        selectable
        resizable
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        views={[Views.WEEK]}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        onSelectSlot={onSelectSlot}
        onDragStart={onDragStart}
        dragFromOutsideItem={dragFromOutsideItem}
        onDropFromOutside={onDropFromOutside}
        handleDragStart={handleDragStart}
        style={{ width: "80vw", height: "80vh" }}
      />
    </Fragment>
  );
};
