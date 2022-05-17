<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    chartTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      chartTitleMap: {
        "earning" : "Total Revenue in nearly a year",
        "orders" : "Total Orders in nearly a year",
        "visits" : "Total visits to the Website in nearly a year",
        "newUser": "Total User registration in nearly a year"
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (val.data.length !== 0) {
          let title = "";
          if (this.chartTitle === "earning") {
            title = this.chartTitleMap.earning
          } else if (this.chartTitle === "orders") {
            title = this.chartTitleMap.orders
          } else if (this.chartTitle === "visits") {
            title = this.chartTitleMap.visits
          } else {
            title = this.chartTitleMap.newUser
          }
          this.setOptions(val, title)
        }
      }
    },
    chartTitle: {
      deep: true,
      handler(val) {
        if (val !== "") {
          let title = "";
          if (val === "earning") {
            title = this.chartTitleMap.earning
          } else if (val === "orders") {
            title = this.chartTitleMap.orders
          } else if (val === "visits") {
            title = this.chartTitleMap.visits
          } else {
            title = this.chartTitleMap.newUser
          }
          this.setOptions(this.chartData, title)
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons');
      this.setOptions(this.chartData, this.chartTitle)
    },
    setOptions(chartData, chartTitle) {
      this.chart.setOption({
        xAxis: {
          data: chartData.title,
          boundaryGap: false,
          axisTick: {
            show: true
          }
        },
        title:{
          text:chartTitle,
          top: '0',
          left:'center',
          textStyle:{
            //文字颜色
            color:'#ccc',
            //字体风格,'normal','italic','oblique'
            fontStyle:'normal',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight:'bold',
            //字体系列
            fontFamily:'sans-serif',
            //字体大小
            fontSize:15
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: true
          }
        },
        // legend: {
        //   data: ['Data']
        // },
        series: [
        {
          name: 'Data',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: chartData.data,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
