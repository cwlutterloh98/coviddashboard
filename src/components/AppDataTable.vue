<template>
  <div>
    <div class="title py-3">{{ title }}</div>
    <p>(data is from John Hopkins university updated every 10 minutes)</p>
    <!-- display the data table -->
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-4"
      :loading="loading"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-arrow-left',
        nextIcon: 'mdi-arrow-right'
      }"
    >
      <!-- search filter -->
      <template v-slot:top>
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3">
            <v-text-field
              v-model.trim="search"
              @input="filter($event)"
              label="Search by name"
              class="mx-4"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <!-- templates for death and cases to display in buttons -->
      <template v-slot:item.stats.deaths="{ item }">
        <v-chip color="red" dark>+{{ item.stats.deaths | comma }}</v-chip>
      </template>
      <template v-slot:item.stats.confirmed="{ item }">
        <v-chip color="yellow darken-4" dark
          >+{{ item.stats.confirmed | comma }}</v-chip
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
// cookie function
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

var searchValue2;
var cookie = getCookie("search");
if (cookie != "") {
  searchValue2 = cookie;
} else {
  searchValue2 = "";
}
export default {
  // properties for the data table to work
  props: {
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      search: searchValue2 // return value                             
    };
  },
  // the search function omits from the results
  methods: {
    filter(searchValue) {
      this.$emit("searchFilter", searchValue);
    }
  }
};
</script>

<style></style>
