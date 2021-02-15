export const reducer = (state, action) => {
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
