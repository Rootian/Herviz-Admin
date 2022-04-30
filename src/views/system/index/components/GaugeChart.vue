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
        default: '300px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
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
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      },
      setOptions( data  = {}) {
        this.chart.setOption({
          title:{
            text:'Current In-Rent Rate',
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
          series: [
            {
              type: 'gauge',
              center: ['50%', '48%'],
              axisLine: {
                lineStyle: {
                  width: 20,
                  color: [
                    [0.3, '#67e0e3'],
                    [0.7, '#37a2da'],
                    [1, '#fd666d']
                  ]
                }
              },
              pointer: {
                itemStyle: {
                  color: 'auto'
                }
              },
              axisTick: {
                distance: -30,
                length: 5,
                lineStyle: {
                  color: '#fff',
                  width: 1.4
                }
              },
              splitLine: {
                distance: -30,
                length: 30,
                lineStyle: {
                  color: '#fff',
                  width: 4
                }
              },
              axisLabel: {
                color: 'auto',
                distance: -5,
                fontSize: 13
              },
              detail: {
                offsetCenter: [0, '110%'],
                valueAnimation: true,
                formatter: '{value} %',
                color: 'auto'
              },
              data: data
            }
          ]
        })
      }
    }
  }
</script>
