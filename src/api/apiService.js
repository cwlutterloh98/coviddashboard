import axios from "axios";
import store from "../store";

// connect my api
/*
const apiConsumer = axios.create({
  baseURL: "https://covid-19-statistics.p.rapidapi.com/reports",
  timeout: 15000,
  headers: {
    'x-rapidapi-key': '3ead631de6msh47d176b4842c3a2p1b54e0jsnc17021bf1773',
    'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
  }
});

*/
// old api
/*
const apiConsumer = axios.create({
  baseURL: "https://corona.lmao.ninja/",
  timeout: 15000
});
*/
// end old api
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
