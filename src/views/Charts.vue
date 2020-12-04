<template>
  <div class="container">
    <div v-if="arrPositive.length > 0">
      <div class="row mt-3">
        <div class="col">
          <h3 class="text-center">Covid 19 - Ohio</h3>
        </div>
      </div>
      <div class="row mt-5" v-if="arrPositive.length > 0">
        <div class="col">
          <h4 class="text-center">Confirmed</h4>
          <!-- display line chart for covid cases -->
          <line-chart
            :chartData="arrPositive"
            :options="chartOptions"
            :chartColors="positiveChartColors"
            label="Positive"
          />
        </div>
      </div>
      <!-- display line chart for covid deaths -->
      <div class="row mt-5 mb-5" v-if="arrDeaths.length > 0">
        <div class="col">
          <h4 class="text-center">Deaths</h4>
          <line-chart
            v-if="arrDeaths.length > 0"
            :chartData="arrDeaths"
            :options="chartOptions"
            :chartColors="deathColors"
            label="Deaths"
          />
        </div>
      </div>
    </div>
    <div v-else class="mt-5 d-flex align-items-center justify-content-center">
      <h4 class="text-white pl-3 mb-0">Loading ...</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "../components/AppLineChart";

export default {
  components: {
    LineChart
  },
  // get data for line charts
  data() {
    return {
      arrPositive: [],
      positiveChartColors: {
        borderColor: "#077187",
        pointBorderColor: "##fff",
        pointBackgroundColor: "#FFFFFF",
        backgroundColor: "#007bff"
      },
      arrRecovered: [],
      recoveredColors: {
        borderColor: "#4E5E66",
        pointBorderColor: "#4E5E66",
        pointBackgroundColor: "#FFFFFF",
        backgroundColor: "#28a745"
      },
      arrDeaths: [],
      deathColors: {
        borderColor: "#E06D06",
        pointBorderColor: "#E06D06",
        pointBackgroundColor: "#FFFFFF",
        backgroundColor: "#dc3545"
      },
      //Chart.js options that controls the appearance of the chart
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                fontColor: "#000"
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "#000"
              },
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  // link to the correct API
  async created() {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/nyt/states/Ohio?lastdays=30"
    );
    // console.log(data);
    let casedata = data;
    casedata.forEach(d => {
      const { cases, deaths, date } = d;

      this.arrPositive.push({ date, total: cases });
      this.arrDeaths.push({ date, total: deaths });
    });
  }
};
</script>

<style></style>
