import axios from "axios";

import { options, ZOOM_API_ENDPOINT } from "./config";

export default (req, res) => {
  if (req.method === "PATCH" && req.body) {
    const meetingId = req.body.id;
    console.log("meetingId >>> ", req.body);
    return axios
      .patch(
        `${ZOOM_API_ENDPOINT}/meetings/${meetingId}`,
        JSON.stringify(req.body),
        options
      )
      .then(() => {
        res.status(204).send("updated");
      });
  } else {
    throw "Bad request";
  }
};
