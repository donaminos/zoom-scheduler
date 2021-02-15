import jwt from "jsonwebtoken";

const API_KEY = process.env.ZOOM_API_KEY;
const API_SECRET = process.env.ZOOM_API_SECRET;
const userId = process.env.ZOOM_USER_ID;

export const ZOOM_API_ENDPOINT = `https://api.zoom.us/v2`;
export const ZOOM_API_USERS_ENDPOINT = `https://api.zoom.us/v2/users/${userId}`;

const payload = {
  iss: API_KEY,
  exp: new Date().getTime() + 24 * 60 * 60 * 1000, // 24h
};

const token = jwt.sign(payload, API_SECRET);

// Zoom api config
export const options = {
  params: {
    status: "active",
  },
  headers: {
    "User-Agent": "Zoom-Jwt-Request",
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
