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

import { addMeeting, formatToApi, formatToClient } from "../../utils/api";
import { MeetingModal } from "../MeetingModal";
import { reducer } from "./calendar.reducer";

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

export const Calendar = ({ meetings }) => {
  const [state, dispatch] = useReducer(reducer, {
    isModalOpen: false,
    selectedSlot: undefined,
    meetings,
  });

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
    const meeting = formatToApi(values);
    addMeeting({ meeting }).then(({ data }) => {
      dispatch({
        type: "save_meeting",
        payload: {
          meeting: formatToClient(data),
        },
      });
    });
  };

  return (
    <Fragment>
      <MeetingModal
        isOpen={state.isModalOpen}
        meeting={state.selectedSlot}
        onCancel={closeModal}
        onSave={handleSubmit}
        isEditing={state.isEditing}
      />
      <DnDCalendar
        localizer={localizer}
        events={state.meetings}
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
