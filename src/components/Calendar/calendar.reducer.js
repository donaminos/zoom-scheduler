export const reducer = (state, action) => {
  switch (action.type) {
    case "select_slot":
      return {
        ...state,
        isModalOpen: true,
        isEditing: true,
        selectedSlot: action.payload.meeting,
      };
    case "save_meeting_success":
      return {
        ...state,
        isModalOpen: true,
        isEditing: false,
        meetings: [...state.meetings, action.payload.meeting],
      };
    case "edit_meeting":
      return {
        ...state,
        isModalOpen: true,
        isEditing: true,
        selectedSlot: action.payload.meeting,
      };
    case "edit_meeting_success":
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
    case "close_modal":
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};
