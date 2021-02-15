import axios from "axios";

import { options, ZOOM_API_ENDPOINT } from "./config";

export default (req, res) => {
  axios
    .get(`${ZOOM_API_ENDPOINT}/meetings`, options)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).send(`API call failed, reason : ${err.message} `);
    });
};
