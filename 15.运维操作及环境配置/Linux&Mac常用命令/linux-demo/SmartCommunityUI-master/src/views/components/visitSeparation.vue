<template>
  <div>
    <Card>
      <p slot="title" class="card-title">
        <Icon type="md-locate" style="margin-right:5px" />申报对象
      </p>
      <Row type="flex" justify="center" align="middle" style="height:273px;">
        <apexchart type="donut" width="350" :options="chartOptions" :series="series" />
      </Row>
    </Card>
  </div>
</template>

<script>
var map;
export default {
  name: 'VisitSeparation',
  data() {
    return {
      series: [],
      chartOptions: {
        labels: ['农民工', '退役军人', '法人', '高校毕业人', '外来人口'],
        plotOptions: {
          pie: {
            donut: {
              size: '70%'
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'right'
        }
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.series = [45, 18, 27, 15, 13];
    }
  }
};
</script>
