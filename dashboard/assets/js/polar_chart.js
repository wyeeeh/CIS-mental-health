var polar_dom = document.getElementById('polar_chart');
var polarChart = echarts.init(polar_dom, null, {
  renderer: 'svg',
  useDirtyRect: false
});
var app = {};

d3.csv('../data/home/resource_data.csv').then(function (data) {

  var colorScale = d3.scaleLinear()
  .domain([0, 19])  // 20 colors
  .range([d3.rgb('#4378fe'), d3.rgb('#132759')]);

var generatedColors = d3.range(20).map((d, i) => colorScale(i));

  var option = {
    textStyle:{
      fontFamily: 'Inter',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 500},
    polar: {
      radius: ['15%', '75%'],
      center: ['50%', '45%']
    },
    radiusAxis: {
      type: 'value',
      max: d3.max(data, function (d) {
        return (Math.round(Number(d.value/10))*11);
      }),
      axisLabel: {
        interval: 0,
        show: true,
        color: '#888888',
        fontWeight: 400,
      },
      axisTick: {
        show: true
      },
      animation: true,
      animationDuration: function (idx) {
        return idx * 1000;
      }

    },

    angleAxis: {
      type: 'category',
      data: data.map(function (d) {
        return d.language;
      }),
      axisLabel: {
        align: 'right',
        // verticalAlign: 'top',
        interval: 0,
        show: true,
        inside: true,
        margin: 10,
        fontSize: 14,
        fontWeight: 600,
        color: '#202020',
      },
      startAngle: 90,
      axisTick: {
        show: true
      },
      animation: true,
      animationDuration: function (idx) {
        return idx * 1000;
      }

    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        return params[0].name + '<br/>' + params[0].value + ' Counselors';
      },
      axisPointer: {
        type: 'shadow',
        label: {
          // show: true,
          formatter: function (params, tickets) {
            return params.value ** 2 + ' Sites Per 100K Population';

          }
        }
      }
    },
    series: {
      type: 'bar',
      colorby: 'data',
      data: data.map(function (d) {
        return d.value;
      }),
      coordinateSystem: 'polar',
      label: {
        show: false,
        // position: 'middle',
        // formatter: '{b}: {c}'
      },
      emphasis: {
        itemStyle: {
          color: '#c2d4ff',
          shadowBlur: 4,
          shadowColor: 'rgba(97, 142, 255, 0.5)'
        }
      }
    },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      top: '90%',
      min: 0,
      max: 4000,
      itemWidth: 15,
      calculable: true,
      text: ['More', 'Less'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: generatedColors
      }
    },
    animation: true
  };

  if (option && typeof option === 'object') {
    polarChart.setOption(option);
  }
});

window.addEventListener('resize', polarChart.resize);