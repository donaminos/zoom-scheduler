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

import {
  addMeeting,
  formatToApi,
  formatToClient,
  editMeeting,
} from "../../utils/api";
import { MeetingModal } from "../MeetingModal";
import { reducer, ACTIONS } from "./calendar.reducer";

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
      type: ACTIONS.SELECT_SLOT,
      payload: {
        meeting: e,
      },
    });
  };

  const onDoubleClickEvent = (e) => {
    dispatch({
      type: ACTIONS.EDIT_MEETING,
      payload: {
        meeting: e,
      },
    });
  };

  const closeModal = () => {
    dispatch({ type: ACTIONS.CLOSE_MODAL });
  };

  const handleAdd = (values) => {
    const meeting = formatToApi(values);
    addMeeting({ meeting }).then(({ data }) => {
      dispatch({
        type: ACTIONS.SAVE_MEETING_SUCCESS,
        payload: {
          meeting: formatToClient(data),
        },
      });
    });
  };

  const handleUpdate = (values) => {
    const meeting = formatToApi(values);
    editMeeting({ meeting }).then(() => {
      dispatch({
        type: ACTIONS.EDIT_MEETING_SUCCESS,
        payload: {
          meeting: formatToClient(meeting),
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
        onSave={state.selectedSlot?.id ? handleUpdate : handleAdd}
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
        onSelectSlot={onSelectSlot}
        onDoubleClickEvent={onDoubleClickEvent}
        style={{ width: "80vw", height: "80vh" }}
      />
    </Fragment>
  );
};
