<template>
  <d2-container class="page">
<!--    <template slot="header">-->
<!--      <div style="text-align: center; color: #606266">-->
<!--        DashBoard-->
<!--      </div>-->
<!--    </template>-->
    <panel-group @handleSetLineChartData="handleSetLineChartData" />



    <el-card class="d2-card">
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData" />
      </el-row>
    </el-card>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="chart-wrapper">
        <pie-chart :chart-data="pieChartData"/>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="chart-wrapper" >
          <gauge-chart :chart-data="gaugeChartData" />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="chart-wrapper" >
          <dough-nut-chart :chart-data="douNutChartData"/>
        </el-card>
      </el-col>
    </el-row>

  </d2-container>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import PieChart from './components/PieChart'
  import DoughNutChart from './components/DoughNutChart'
  import GaugeChart from './components/GaugeChart'
  import {getLastYearRevenue} from "../../../api/api";

  const lineChartData = {
    newUser: {
      // title: [100, 120, 161, 134, 105, 160, 165],
      // data: [120, 82, 91, 154, 162, 140, 145]
      title:[],
      data:[]
    },
    visits: {
      // title: [200, 192, 120, 144, 160, 130, 140],
      // data: [180, 160, 151, 106, 145, 150, 130]
      title:[],
      data:[]
    },
    earning: {
      title: [],
      data: []
    },
    orders: {
      title: [130, 140, 141, 142, 145, 150, 160],
      data: [120, 82, 91, 154, 162, 140, 130]
    }
  };
export default {
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    DoughNutChart,
    GaugeChart
  },
  data: function () {
    return {

      lineChartData: lineChartData.orders,
      gaugeChartData: [{value: 70}],
      pieChartData: [
        { value: 320, name: 'Industries' },
        { value: 240, name: 'Technology' },
        { value: 149, name: 'Forex' },
        { value: 100, name: 'Gold' },
        { value: 59, name: 'Forecasts' }
      ],
      douNutChartData: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    loadData() {
      getLastYearRevenue().then((res) => {
        lineChartData.earning.data = res.data.data;
        lineChartData.earning.title = res.data.title;
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadData()
    })
  }
}
</script>

<style lang="scss" scoped>
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
      margin-top: 30px;
    }


  @media (max-width:1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
