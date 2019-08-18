import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['data'],
  mounted() {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Total Track Downloads / Month',
          backgroundColor: '#a7c2be',
          data: this.data,
        }
      ]
    }, {responsive: true, maintainAspectRatio: false});
  }
}
