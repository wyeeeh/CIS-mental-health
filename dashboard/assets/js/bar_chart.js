var bar_dom = document.getElementById('bar_chart');
var barChart = echarts.init(bar_dom, null, {
  renderer: 'svg',
  useDirtyRect: false
});
var app = {};

d3.csv('../data/home/counselor.csv').then(function (data) {

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
      grid: {
        left: '2%',
        right: '2%',
        bottom: '20%',
        top:0,
        containLabel: true
      },
    yAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        show: true,
        color: '#888888',
        fontWeight: 400,
      },
      data: data.map(function (d) {
        return d.language;
      })
    },
    xAxis: {
      type: 'value',
      max: d3.max(data, function (d) {
        return (Math.round(Number(d.value)/10 + 1)* 10);
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
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        return params[0].name + '<br/>' + params[0].value + ' Counselor(s)';
      },
      axisPointer: {
        type: 'shadow',
      }
    },
    series: {
      type: 'bar',
      data: data.map(function (d) {
        return d.value;
      }),
      label: {
        show: true,
        position: 'right',
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
      bottom: '1%',
      min: 0,
      max: 70,
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
    barChart.setOption(option);
  }
});


window.addEventListener('resize', barChart.resize);