<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { alarmNum } from "@/api";
import { graphic } from "echarts/core";
// import { ElMessage } from "element-plus";

const option = ref({});
const setOption = async (xData, tempData, humidData) => {
  option.value = {
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: false,
      axisLine: { lineStyle: { color: "rgba(31,99,163,.1)" } },
      axisLabel: { color: "#7EB7FD", fontWeight: "500" },
      splitLine: {
        show: true,
        lineStyle: { color: "rgba(31,99,163,.2)" },
      },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "rgba(31,99,163,.1)" } },
      axisLabel: { color: "#7EB7FD", fontWeight: "500" },
      splitLine: {
        show: true,
        lineStyle: { color: "rgba(31,99,163,.2)" },
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: { color: "#FFF" },
    },
    grid: {
      show: true,
      left: "10px",
      right: "30px",
      bottom: "10px",
      top: "32px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    series: [
      {
        name: "气温",
        data: tempData,
        type: "line",
        smooth: true,
        symbol: "none",
        color: "rgba(252,144,16,.7)",
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(252,144,16,.7)" },
            { offset: 1, color: "rgba(252,144,16,.0)" },
          ]),
        },
      },
      {
        name: "湿度",
        data: humidData,
        type: "line",
        smooth: true,
        symbol: "none",
        color: "rgba(9,202,243,.7)",
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(9,202,243,.7)" },
            { offset: 1, color: "rgba(9,202,243,.0)" },
          ]),
        },
      },
    ],
  };
};

// 手动写死的数据
onMounted(() => {
  const xData = ["2017-10", "2017-11", "2017-12", "2018-01", "2018-02", "2018-03"];
  const tempData = [15.5, 10.5, 7.3, 8.6, 9.4, 13.7];     // 气温（℃）
  const humidData = [82.40, 72.4, 71.6, 61.9, 55.74, 52.12]; // 湿度（%）
  setOption(xData, tempData, humidData);
});
// const getData = () => {
//   alarmNum()
//     .then((res) => {
//       console.log("左上--数据图表 ", res);
//       if (res.success) {
//         setOption(res.data.dateList, res.data.numList, res.data.numList2);
//       } else {
//         ElMessage({
//           message: res.msg,
//           type: "warning",
//         });
//       }
//     })
//     .catch((err) => {
//       ElMessage.error(err);
//     });
// };
// const setOption = async (xData: any[], yData: any[], yData2: any[]) => {
//   option.value = {
//     xAxis: {
//       type: "category",
//       data: xData,
//       boundaryGap: false, // 不留白，从原点开始
//       splitLine: {
//         show: true,
//         lineStyle: {
//           color: "rgba(31,99,163,.2)",
//         },
//       },
//       axisLine: {
//         // show:false,
//         lineStyle: {
//           color: "rgba(31,99,163,.1)",
//         },
//       },
//       axisLabel: {
//         color: "#7EB7FD",
//         fontWeight: "500",
//       },
//     },
//     yAxis: {
//       type: "value",
//       splitLine: {
//         show: true,
//         lineStyle: {
//           color: "rgba(31,99,163,.2)",
//         },
//       },
//       axisLine: {
//         lineStyle: {
//           color: "rgba(31,99,163,.1)",
//         },
//       },
//       axisLabel: {
//         color: "#7EB7FD",
//         fontWeight: "500",
//       },
//     },
//     tooltip: {
//       trigger: "axis",
//       backgroundColor: "rgba(0,0,0,.6)",
//       borderColor: "rgba(147, 235, 248, .8)",
//       textStyle: {
//         color: "#FFF",
//       },
//     },
//     grid: {
//       //布局
//       show: true,
//       left: "10px",
//       right: "30px",
//       bottom: "10px",
//       top: "32px",
//       containLabel: true,
//       borderColor: "#1F63A3",
//     },
//     series: [
//       {
//         data: yData,
//         type: "line",
//         smooth: true,
//         symbol: "none", //去除点
//         name: "报警1次数",
//         color: "rgba(252,144,16,.7)",
//         areaStyle: {
//           //右，下，左，上
//           color: new graphic.LinearGradient(
//             0,
//             0,
//             0,
//             1,
//             [
//               {
//                 offset: 0,
//                 color: "rgba(252,144,16,.7)",
//               },
//               {
//                 offset: 1,
//                 color: "rgba(252,144,16,.0)",
//               },
//             ],
//             false
//           ),
//         },
//         markPoint: {
//           data: [
//             {
//               name: "最大值",
//               type: "max",
//               valueDim: "y",
//               symbol: "rect",
//               symbolSize: [60, 26],
//               symbolOffset: [0, -20],
//               itemStyle: {
//                 color: "rgba(0,0,0,0)",
//               },
//               label: {
//                 color: "#FC9010",
//                 backgroundColor: "rgba(252,144,16,0.1)",
//                 borderRadius: 6,
//                 padding: [7, 14],
//                 borderWidth: 0.5,
//                 borderColor: "rgba(252,144,16,.5)",
//                 formatter: "报警1：{c}",
//               },
//             },
//             {
//               name: "最大值",
//               type: "max",
//               valueDim: "y",
//               symbol: "circle",
//               symbolSize: 6,
//               itemStyle: {
//                 color: "#FC9010",
//                 shadowColor: "#FC9010",
//                 shadowBlur: 8,
//               },
//               label: {
//                 formatter: "",
//               },
//             },
//           ],
//         },
//       },
//       {
//         data: yData2,
//         type: "line",
//         smooth: true,
//         symbol: "none", //去除点
//         name: "报警2次数",
//         color: "rgba(9,202,243,.7)",
//         areaStyle: {
//           //右，下，左，上
//           color: new graphic.LinearGradient(
//             0,
//             0,
//             0,
//             1,
//             [
//               {
//                 offset: 0,
//                 color: "rgba(9,202,243,.7)",
//               },
//               {
//                 offset: 1,
//                 color: "rgba(9,202,243,.0)",
//               },
//             ],
//             false
//           ),
//         },
//         markPoint: {
//           data: [
//             {
//               name: "最大值",
//               type: "max",
//               valueDim: "y",
//               symbol: "rect",
//               symbolSize: [60, 26],
//               symbolOffset: [0, -20],
//               itemStyle: {
//                 color: "rgba(0,0,0,0)",
//               },
//               label: {
//                 color: "#09CAF3",
//                 backgroundColor: "rgba(9,202,243,0.1)",
//
//                 borderRadius: 6,
//                 borderColor: "rgba(9,202,243,.5)",
//                 padding: [7, 14],
//                 formatter: "报警2：{c}",
//                 borderWidth: 0.5,
//               },
//             },
//             {
//               name: "最大值",
//               type: "max",
//               valueDim: "y",
//               symbol: "circle",
//               symbolSize: 6,
//               itemStyle: {
//                 color: "#09CAF3",
//                 shadowColor: "#09CAF3",
//                 shadowBlur: 8,
//               },
//               label: {
//                 formatter: "",
//               },
//             },
//           ],
//         },
//       },
//     ],
//   };
// };
// onMounted(() => {
//   getData();
// });
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style>
