import { API } from "./dotenv.js";
// import http from "http";
import followRedirects from "follow-redirects";

function makeAPICall(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API,
      //   port: 80,
      path: "/api/v2/getlastpost_id/" + path,
      method: "GET",
    };

    const { http, https } = followRedirects;

    const req = http.request(options, (res: any) => {
      let data = "";

      res.on("data", (chunk: Buffer) => {
        data += chunk.toString();
      });

      res.on("end", () => {
        resolve(data); // Resolve with the response data
      });
    });

    req.on("error", (error: Error) => {
      reject(error); // Reject with the error
    });

    req.end();
  });
}

export default makeAPICall;
