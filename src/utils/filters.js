import Vue from "vue";
// filters
Vue.filter("comma", str => Number(str).toLocaleString());
