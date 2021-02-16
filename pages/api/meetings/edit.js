import axios from "axios";

import { options, ZOOM_API_ENDPOINT } from "./config";

export default (req, res) => {
  if (req.method === "PATCH" && req.body && req.body.id) {
    return axios
      .patch(
        `${ZOOM_API_ENDPOINT}/meetings/${req.body.id}`,
        JSON.stringify(req.body),
        options
      )
      .then(() => {
        res.status(204).send("updated");
      });
  } else {
    res.status(400).send("Bad request");
  }
};
