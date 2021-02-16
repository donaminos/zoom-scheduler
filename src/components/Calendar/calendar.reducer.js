export const ACTIONS = {
  SELECT_SLOT: "select_slot",
  SAVE_MEETING_SUCCESS: "save_meeting_success",
  EDIT_MEETING: "edit_meeting",
  EDIT_MEETING_SUCCESS: "edit_meeting_success",
  CLOSE_MODAL: "close_modal",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_SLOT:
      return {
        ...state,
        isModalOpen: true,
        isEditing: true,
        selectedSlot: action.payload.meeting,
      };
    case ACTIONS.SAVE_MEETING_SUCCESS:
      return {
        ...state,
        isModalOpen: true,
        isEditing: false,
        meetings: [...state.meetings, action.payload.meeting],
        selectedSlot: action.payload.meeting,
      };
    case ACTIONS.EDIT_MEETING:
      return {
        ...state,
        isModalOpen: true,
        isEditing: true,
        selectedSlot: action.payload.meeting,
      };
    case ACTIONS.EDIT_MEETING_SUCCESS:
      const updatedMeeting = state.meetings.find(
        (meeting) => meeting.id === action.payload.meeting.id
      );
      const otherMeetings = state.meetings.filter(
        (meeting) => meeting.id !== action.payload.meeting.id
      );
      return {
        ...state,
        isModalOpen: true,
        isEditing: false,
        meetings: [
          ...otherMeetings,
          { ...updatedMeeting, ...action.payload.meeting },
        ],
      };
    case ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};
