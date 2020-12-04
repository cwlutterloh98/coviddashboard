<template>
  <v-container fluid>
    <app-section>
      <h1>Covid 19 cases in Ohio</h1>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          lg="3"
          v-for="stat in summary"
          :key="stat.title"
        >
          <!-- the four cases modules -->
          <v-skeleton-loader
            class="elevation-4"
            ref="skeleton"
            type="list-item-avatar-two-line"
            v-if="loadingSkeleton"
          />

          <app-stat-card
            :title="stat.title"
            :color="stat.color"
            :icon="stat.icon"
            :stat="stat.stat"
            v-else
          />
        </v-col>
      </v-row>
    </app-section>

    <!-- the Ohio Counties Statistics Table -->
    <app-section>
      <app-data-table
        title="Ohio Counties Statistics"
        :headers="statesHeaders"
        :items="statesList"
        :loading="loadingStates"
        @searchFilter="stateSearchFilter($event)"
      />
    </app-section>
  </v-container>
</template>

<script>
// scripts for how to handle the covid stats table and the cards
import AppSection from "../components/AppSection.vue";
import AppDataTable from "../components/AppDataTable.vue";
import AppStatCard from "../components/AppStatCard.vue";

import statisticsService from "../api/statisticsService";

export default {
  components: {
    AppSection,
    AppDataTable,
    AppStatCard
  },
  created() {
    // covid case cards
    this.getSummary();
    // ohio counties stats
    this.getUnitedStatesData();
  },
  computed: {
    // filter the data for the Ohio Counties statistics
    statesList() {
      var allUnitedStatesData = this.allUnitedStatesData.filter(c =>
        c.province.includes("Ohio")
      );
      // if you type into the search bar for counties bring up the correct counties
      if (this.stateSearchValue === "") {
        return allUnitedStatesData;
      } else {
        // have to make everything lowercase for search to work correctly
        return allUnitedStatesData.filter(c =>
          c.county.toLowerCase().includes(this.stateSearchValue.toLowerCase())
        );
      }
    }
  },
  // data for the ohio counties statistics
  data: () => {
    return {
      statesHeaders: [
        { text: "County", value: "county" },
        { text: "Today cases", value: "stats.confirmed" },
        { text: "Deaths", value: "stats.deaths" }
      ],
      loadingSkeleton: true,
      loadingStates: false,
      loadingCountries: false,
      //allCountriesData: [],
      allUnitedStatesData: [],
      searchValue: "",
      stateSearchValue: "",
      summary: [1, 2, 3, 4]
    };
  },
  methods: {
    // get the covid 19 cards
    getSummary() {
      this.loadingSkeleton = true;
      statisticsService.getSummary().then(res => {
        this.summary = [
          {
            title: "Confirmed cases",
            stat: res.cases,
            icon: "mdi-account-multiple",
            color: "primary"
          },
          {
            title: "Recovered cases",
            stat: res.recovered,
            icon: "mdi-hand-heart",
            color: "teal darken-4"
          },
          {
            title: "Fatal cases",
            stat: res.deaths,
            icon: "mdi-skull-crossbones",
            color: "red accent-4"
          },
          {
            title: "Active cases",
            stat: res.active,
            icon: "mdi-bed-empty",
            color: "deep-orange darken-1"
          }
        ];
        this.loadingSkeleton = false;
      });
    },
    /*
    getAllCountriesData() {
      this.loadingCountries = true;
      statisticsService
        .getAllCountriesData()
        .then(res => {
          this.allCountriesData = res;
          this.loadingCountries = false;
        })
        .catch(() => (this.loadingCountries = false));
    },
    */
    // get the Ohio counties statistics
    getUnitedStatesData() {
      this.loadingStates = true;
      statisticsService
        .getUnitedStatesData()
        .then(res => {
          this.allUnitedStatesData = res;
          this.loadingStates = false;
        })
        .catch(() => (this.loadingStates = false));
    },
    searchFilter(searchValue) {
      this.searchValue = searchValue;
    },
    stateSearchFilter(searchValue) {
      this.stateSearchValue = searchValue;
    }
  }
};
</script>
