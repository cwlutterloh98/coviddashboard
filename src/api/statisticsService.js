import apiConsumer from "./apiService";
import store from "../store";

// getSummary is the four cards that display case informatin
export default {
  async getSummary() {
    try {
      const res = await apiConsumer({
        url: `v3/covid-19/states/Ohio?yesterday=true`,
        method: "GET"
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        store.commit("snackbar/show", {
          message: `${error.response.data}`,
          type: "error"
        });
      }
      return Promise.reject(error);
    }
  },

  // gets data for the counties statistics data chart
  async getUnitedStatesData() {
    try {
      const res = await apiConsumer({
        url: "v3/covid-19/jhucsse/counties",
        method: "GET"
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        store.commit("snackbar/show", {
          message: `${error.response.data}`,
          type: "error"
        });
      }
      return Promise.reject(error);
    }
  }
};
