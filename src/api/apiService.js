import axios from "axios";
import store from "../store";

// connect my api

// new api 2
const apiConsumer = axios.create({
  baseURL: "https://disease.sh/",
  timeout: 15000
});
// end new api 2

apiConsumer.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

// get the response information from the API
apiConsumer.interceptors.response.use(
  res => res,
  error => {
    if (error.response) {
      return Promise.reject(error);
    } else {
      store.commit("snackbar/show", {
        message: "Internet is down",
        type: "error"
      });
      return Promise.reject(error);
    }
  }
);

export default apiConsumer;
