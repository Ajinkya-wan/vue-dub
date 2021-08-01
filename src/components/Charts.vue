<template>
  <v-app id="asd">
    <v-card elevation="2" class="ma-3">
      <v-card-title> Department wise Employees</v-card-title>
      <v-divider></v-divider>
      <v-card-text v-if="selectedOption" class="d-flex justify-center">
        <div id="chart3">
          <apexchart
            type="pie"
            width="550"
            :options="chartOptions"
            :series="selectedOption"
          ></apexchart>
        </div>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import chart from "vue-apexcharts";

export default {
  props: ["selectedOption"],

  watch: {
    selectedOption: function(newVal, oldVal) {
      // watch it
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    },
  },

  name: "Charts",

  components: { apexchart: chart },

  data() {
    return {
      series: [4, 0, 1, 4],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["HR", "Admin", "Technical", "Finance"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style>
#asd {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
