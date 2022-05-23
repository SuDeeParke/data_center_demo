<!--
 * @FileDescription: 华为POC 光源协调趋势
 * @Author: sdp
 -->
<template>
  <div class="linetimemulti">
      <Card title="光源协调趋势">

      </Card>
      <div ref="linetimemulti" class="linetimemulti-chart"></div>
  </div>
</template>

<script>
import Card from '@/layout/Card.vue';

const echarts = require('echarts');

export default {
  name: 'LineTimeMulti',
  components: {
    Card,
  },
  mounted() {
    const recentChart = echarts.init(this.$refs.linetimemulti);
    const H = 60 * 60 * 1000;
    const currentDay = new Date();
    const base = new Date(
      currentDay.getFullYear(),
      currentDay.getMonth(),
      currentDay.getDate(),
    ).getTime();
    const prices = [];
    const xData = [];
    const yData = [];
    for (let i = 0; i <= 29; i += 1) {
      const time = base + i * H;
      if (i <= 24) {
        xData.push(base + i * H);
      } else {
        xData.push(base + i * H);
      }
      yData.push([time, (Math.random() * 160).toFixed(2)]);
      prices.push([time, (Math.random()).toFixed(2)]);
    }
    const option = {
      xAxis: {
        type: 'time',
        interval: 24 * H,
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter(value) {
            const time = new Date(value);
            const hour = time.getHours();
            return `${hour < 10 ? `0${hour}` : hour}:00`;
          },
        },
        axisTick: {
          alignWithLabel: true,
          show: true,
        },
        axisLine: {
          show: true,
          onZero: false,
        },
      },
      yAxis: [
        {
          name: 'kWh  ',
          type: 'value',
          min: -50,
          max: 200,
          interval: 50,
          alignTicks: true,
          nameLocation: 'end',
          nameTextStyle: {
            align: 'right',
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(220, 220, 220, 0.4)',
              type: [5, 8],
            },
          },
        },
        {
          name: '  ￥',
          type: 'value',
          min: -0.4,
          max: 1.6,
          interval: 0.4,
          nameLocation: 'end',
          alignTicks: true,
          axisLabel: {
            show: true,
          },
          nameTextStyle: {
            align: 'left',
          },
          splitLine: {
            show: false,
          },
        },
      ],
      legend: {
        show: true,
        bottom: '-1%',
        icon: 'circle',
        textStyle: {
          color: '#fff',
        },
        data: [
          {
            name: '分时电价',
            icon: 'path://M212.8 468.8H43.2C17.6 468.8 0 486.4 0 512s17.6 43.2 43.2 43.2h171.2c25.6 0 43.2-17.6 43.2-43.2-1.6-25.6-19.2-43.2-44.8-43.2zM980.8 468.8H811.2c-25.6 0-43.2 17.6-43.2 43.2s17.6 43.2 43.2 43.2h171.2c25.6 0 43.2-17.6 43.2-43.2-1.6-25.6-19.2-43.2-44.8-43.2zM596.8 468.8H427.2c-25.6 0-43.2 17.6-43.2 43.2s17.6 43.2 43.2 43.2h171.2c25.6 0 43.2-17.6 43.2-43.2-1.6-25.6-19.2-43.2-44.8-43.2z',
          },
          {
            name: '光伏发电量',
          },
        ],
      },
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          name: '分时电价',
          type: 'line',
          yAxisIndex: 1,
          step: 'end',
          data: prices,
          showSymbol: false,
          lineStyle: {
            width: 2,
            type: 'dashed',
            color: 'rgba(22, 22, 22, 1)',
          },
          itemStyle: {
            color: 'rgb(22, 22, 22)',
          },
          emphasis: {
            disabled: true,
            focus: 'none',
            lineStyle: {
              width: 2,
            },
          },

        },
        {
          name: '光伏发电量',
          type: 'line',
          showSymbol: false,
          smooth: false,
          yAxisIndex: 0,
          data: yData,
          lineStyle: {
            color: 'rgb(0, 167, 113)',
          },
          itemStyle: {
            color: 'rgb(0, 167, 113)',
          },
        },

      ],
    };
    recentChart.setOption(option);
  },
};
</script>

<style lang='scss' scoped>
.linetimemulti-chart {
    width: 100%;
    height: 200px;
}
</style>
