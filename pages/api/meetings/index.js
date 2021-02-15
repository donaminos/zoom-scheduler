import axios from "axios";

import { options, ZOOM_API_USERS_ENDPOINT } from "./config";

export default (req, res) => {
  return axios
    .get(`${ZOOM_API_USERS_ENDPOINT}/meetings`, options)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.status(500).send(`API call failed, reason : ${err.message} `);
    });
};
