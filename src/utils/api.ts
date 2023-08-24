import { API } from "../config/dotenv.js";

import axios from "axios";

function makeAPICall(path: string) {
  const url = `${API}/api/v2/getlastpost_id/${path}`;

  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export default makeAPICall;
