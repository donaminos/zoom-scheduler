import axios from "axios";

import { options, ZOOM_API_USERS_ENDPOINT } from "./config";

export default (req, res) => {
  if (req.method === "POST" && req.body) {
    axios
      .post(
        `${ZOOM_API_USERS_ENDPOINT}/meetings`,
        JSON.stringify(req.body),
        options
      )
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        res.status(500).send(`API call failed, reason : ${err.message} `);
      });
  } else {
    res.status(400).send("Bad request");
  }
};
