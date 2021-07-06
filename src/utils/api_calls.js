import axios from "axios";
import CONSTANTS from "./constants";
import { HANDLING, SUCCESS_HANDLING } from "./error_handling";
const instance = axios.create({
  baseURL: CONSTANTS.API_URL,
  //   timeout: 1000,
  //   headers: { 'X-Custom-Header': 'foobar' },
});
const getHeader = (token, contentType) => {
  let header = {};
  header["Content-Type"] = contentType || "application/json";
  if (token) {
    header["Authorization"] = `Bearer ${token}`;
  }
  console.log("Header", header);
  return header;
};
export const PUT = (path, data, token) => {
  return instance
    .put(path, data, { headers: getHeader(token) })
    .then(({ data }) => {
      return SUCCESS_HANDLING(data);
    })
    .catch((err) => {
      return HANDLING(err);
    });
};
export const POST = (path, data, token) => {
  return instance
    .post(path, data, { headers: getHeader(token) })
    .then(({ data }) => {
      return SUCCESS_HANDLING(data);
    })
    .catch((err) => {
      return HANDLING(err);
    });
};
export const ImageUpload = (data, token) => {
  return instance
    .post("image", data, { headers: getHeader(token) })
    .then(({ data }) => {
      return SUCCESS_HANDLING(data);
    })
    .catch((err) => {
      return HANDLING(err);
    });
};
export const GET = (path, token) => {
  let header = { headers: getHeader(token, null) };

  return instance
    .get(path, header)
    .then(({ data }) => {
      return SUCCESS_HANDLING(data);
    })
    .catch((err) => {
      return HANDLING(err);
    });
};
export const DELETE = (path, token) => {
  return instance
    .delete(path, { headers: getHeader(token) })
    .then(({ data }) => {
      return SUCCESS_HANDLING(data);
    })
    .catch((err) => {
      return HANDLING(err);
    });
};
