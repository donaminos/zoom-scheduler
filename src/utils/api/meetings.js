import axios from "axios";
import differenceInMinutes from "date-fns/differenceInMinutes";
import add from "date-fns/add";
import format from "date-fns/format";

export const API_ENDPOINT = "http://localhost:3000/api";
export const MEETING_ENDPOINT = `${API_ENDPOINT}/meetings`;

const config = {
  headers: { "content-type": "application/json" },
};

export const addMeeting = ({ meeting }) => {
  return axios.post(`${MEETING_ENDPOINT}/add`, JSON.stringify(meeting), config);
};

export const editMeeting = ({ meeting }) => {
  return axios.patch(
    `${MEETING_ENDPOINT}/edit`,
    JSON.stringify(meeting),
    config
  );
};

export const formatToApi = (values) => {
  const duration = differenceInMinutes(values.end, values.start);
  const start_time = format(values.start, "yyyy-MM-dd'T'HH:mm:ss");

  return {
    ...(values.id ? { id: values.id } : {}),
    topic: values.topic || "Untitled",
    type: 2,
    start_time,
    duration: parseInt(duration),
    timezone: "Europe/Paris",
  };
};

export const formatToClient = (apiValues) => {
  const endDate = add(new Date(apiValues.start_time), {
    minutes: apiValues.duration,
  });

  return {
    ...apiValues,
    start: new Date(apiValues.start_time),
    end: endDate,
    title: apiValues.topic,
  };
};
