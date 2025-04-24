<!--<script setup lang="ts">-->
<!--import { ref, reactive, nextTick, onMounted } from "vue";-->
<!--import { centerMap, GETNOBASE } from "@/api";-->
<!--import { registerMap, getMap } from "echarts/core";-->
<!--import { optionHandle, regionCodes } from "./center.map";-->
<!--import BorderBox13 from "@/components/datav/border-box-13";-->
<!--import { ElMessage } from "element-plus";-->
<!--import L from 'leaflet';  // 导入 Leaflet 库-->

<!--import type { MapdataType } from "./center.map";-->

<!--const option = ref({});-->
<!--const code = ref("china"); //china 代表中国 其他地市是行政编码-->

<!--withDefaults(-->
<!--  defineProps<{-->
<!--    // 结束数值-->
<!--    title: number | string;-->
<!--  }>(),-->
<!--  {-->
<!--    title: "地图",-->
<!--  }-->
<!--);-->

<!--const dataSetHandle = async (regionCode: string, list: object[]) => {-->
<!--  const geojson: any = await getGeojson(regionCode);-->
<!--  let cityCenter: any = {};-->
<!--  let mapData: MapdataType[] = [];-->
<!--  //获取当前地图每块行政区中心点-->
<!--  geojson.features.forEach((element: any) => {-->
<!--    cityCenter[element.properties.name] = element.properties.centroid || element.properties.center;-->
<!--  });-->
<!--  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码-->
<!--  list.forEach((item: any) => {-->
<!--    if (cityCenter[item.name]) {-->
<!--      mapData.push({-->
<!--        name: item.name,-->
<!--        value: cityCenter[item.name].concat(item.value),-->
<!--      });-->
<!--    }-->
<!--  });-->
<!--  await nextTick();-->

<!--  option.value = optionHandle(regionCode, list, mapData);-->
<!--};-->

<!--const getData = async (regionCode: string) => {-->
<!--  centerMap({ regionCode: regionCode })-->
<!--    .then((res) => {-->
<!--      console.log("中上&#45;&#45;设备分布", res);-->
<!--      if (res.success) {-->
<!--        dataSetHandle(res.data.regionCode, res.data.dataList);-->
<!--      } else {-->
<!--        ElMessage.error(res.msg);-->
<!--      }-->
<!--    })-->
<!--    .catch((err) => {-->
<!--      ElMessage.error(err);-->
<!--    });-->
<!--};-->
<!--const getGeojson = (regionCode: string) => {-->
<!--  return new Promise<boolean>(async (resolve) => {-->
<!--      try {-->
<!--      let mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then((data) => data);-->
<!--      console.log("GeoJSON 数据:", mapjson);  // 打印数据查看是否正确-->

<!--      code.value = regionCode;-->
<!--      L.geoJSON(mapjson).addTo(map); // 使用 Leaflet 渲染 geoJSON 地图-->
<!--      resolve(mapjson);-->
<!--    } catch (error) {-->
<!--      console.error("GeoJSON 加载失败:", error);-->
<!--      resolve(false);-->
<!--    }-->
<!--  });-->
<!--};-->
<!--//     let mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then((data) => data);-->
<!--//     code.value = regionCode;-->
<!--//     L.geoJSON(mapjson).addTo(map); // 使用 Leaflet 渲染 geoJSON 地图-->
<!--//     resolve(mapjson);-->
<!--//     // let mapjson = getMap(regionCode);-->
<!--//     // if (mapjson) {-->
<!--//     //   mapjson = mapjson.geoJSON;-->
<!--//     //   resolve(mapjson);-->
<!--//     // } else {-->
<!--//     //   mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then((data) => data);-->
<!--//     //   code.value = regionCode;-->
<!--//     //   registerMap(regionCode, {-->
<!--//     //     geoJSON: mapjson as any,-->
<!--//     //     specialAreas: {},-->
<!--//     //   });-->
<!--//     //   resolve(mapjson);-->
<!--//     // }-->
<!--//   });-->
<!--// };-->
<!--// getData(code.value);-->
<!--// 地图点击事件-->
<!--const mapClick = (e: any) => {-->
<!--  console.log(e);-->
<!--  let xzqData = regionCodes[e.target.options.name];-->
<!--  if (xzqData) {-->
<!--    getData(xzqData.adcode);-->
<!--  } else {-->
<!--    ElMessage.warning("暂无下级地市");-->
<!--  }-->
<!--};-->
<!--// const mapClick = (params: any) => {-->
<!--//   // console.log(params);-->
<!--//   let xzqData = regionCodes[params.name];-->
<!--//   if (xzqData) {-->
<!--//     getData(xzqData.adcode);-->
<!--//   } else {-->
<!--//     window["$message"].warning("暂无下级地市");-->
<!--//   }-->
<!--// };-->

<!--// 初始化地图-->
<!--onMounted(() => {-->
<!--  const map = L.map('map', {-->
<!--    center: [51.505, -0.09], // 初始位置-->
<!--    zoom: 12, // 初始缩放级别-->
<!--    scrollWheelZoom: true // 启用鼠标滚轮缩放-->
<!--  });-->

<!--  // // 添加瓦片图层（此处使用 OpenStreetMap 作为底图）-->
<!--  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {-->
<!--  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',-->
<!--  //   maxZoom: 19, // 设置最大缩放级别-->
<!--  //   minZoom: 3  // 设置最小缩放级别-->
<!--  // }).addTo(map);-->
<!--  // // 确保地图容器大小正确-->
<!--  // setTimeout(() => map.invalidateSize(), 500);  // 延迟调用，确保容器已渲染-->
<!--  // // 添加标记-->
<!--  // // L.marker([51.5, -0.09]).addTo(map)-->
<!--  // //   .bindPopup('这是一个标记')-->
<!--  // //   .openPopup();-->

<!--   // 加载和渲染 geoJSON 数据-->
<!--  getGeojson('china').then(() => {-->
<!--    // 数据加载完成后渲染地图-->
<!--    map.invalidateSize();  // 强制更新地图大小-->
<!--  });-->


<!--  // 设置地图点击事件-->
<!--  map.on('click', (e: any) => {-->
<!--    console.log("点击坐标: ", e.latlng);-->
<!--  });-->

<!--  // 确保地图大小正确-->
<!--  // map.invalidateSize();-->
<!--  // // 设置地图点击事件-->
<!--  // map.on('click', mapClick);-->
<!--});-->
<!--</script>-->

<!--<template>-->
<!--  <div class="centermap">-->
<!--    <div class="maptitle">-->
<!--      <div class="zuo"></div>-->
<!--      <span class="titletext">{{ title }}</span>-->
<!--      <div class="you"></div>-->
<!--    </div>-->
<!--    <div class="mapwrap">-->
<!--&lt;!&ndash;      <BorderBox13>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">中国</div>&ndash;&gt;-->
<!--&lt;!&ndash;        <v-chart&ndash;&gt;-->
<!--&lt;!&ndash;          class="chart"&ndash;&gt;-->
<!--&lt;!&ndash;          :option="option"&ndash;&gt;-->
<!--&lt;!&ndash;          ref="centerMapRef"&ndash;&gt;-->
<!--&lt;!&ndash;          @click="mapClick"&ndash;&gt;-->
<!--&lt;!&ndash;          v-if="JSON.stringify(option) != '{}'"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--&lt;!&ndash;      </BorderBox13>&ndash;&gt;-->
<!--        <div id="map" class="leaflet-map-container"></div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.centermap {-->
<!--  /*margin-bottom: 30px;*/-->
<!--  /*position: fixed; !* 固定在页面 *!*/-->
<!--  position: absolute;-->
<!--  top: 25px;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: calc(100% - 60px);-->
<!--  z-index: -2; /* 放置到最底层 */-->
<!--  overflow: hidden; /* 确保不会溢出 */-->

<!--  .maptitle {-->
<!--    height: 60px;-->
<!--    /*display: flex;*/-->
<!--    justify-content: center;-->
<!--    padding-top: 10px;-->
<!--    box-sizing: border-box;-->
<!--    display: none;-->

<!--    .titletext {-->
<!--      font-size: 28px;-->
<!--      font-weight: 900;-->
<!--      letter-spacing: 6px;-->
<!--      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);-->
<!--      -webkit-background-clip: text;-->
<!--      -webkit-text-fill-color: transparent;-->
<!--      margin: 0 10px;-->
<!--    }-->

<!--    .zuo,-->
<!--    .you {-->
<!--      background-size: 100% 100%;-->
<!--      width: 29px;-->
<!--      height: 20px;-->
<!--      margin-top: 8px;-->
<!--    }-->

<!--    .zuo {-->
<!--      background: url("@/assets/img/xiezuo.png") no-repeat;-->
<!--    }-->

<!--    .you {-->
<!--      background: url("@/assets/img/xieyou.png") no-repeat;-->
<!--    }-->
<!--  }-->

<!--  .mapwrap {-->
<!--    height: 100%; /* 地图高度填满页面 */-->
<!--    width: 100%; /* 地图宽度填满页面 */-->
<!--    box-sizing: border-box;-->
<!--    position: absolute;-->
<!--    top: 0; /* 确保地图容器位置正确 */-->
<!--    left: 0;-->
<!--    z-index: 0;-->
<!--    pointer-events: auto;-->

<!--    .quanguo {-->
<!--      position: absolute;-->
<!--      right: 20px;-->
<!--      top: 20px; /*-46*/-->
<!--      width: 80px;-->
<!--      height: 28px;-->
<!--      border: 1px solid #00eded;-->
<!--      border-radius: 10px;-->
<!--      color: #00f7f6;-->
<!--      text-align: center;-->
<!--      line-height: 26px;-->
<!--      letter-spacing: 6px;-->
<!--      cursor: pointer;-->
<!--      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);-->
<!--      z-index: 10;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.leaflet-map-container {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  display: block;-->
<!--}-->
<!--</style>-->
<script setup lang="ts">
import { onMounted } from "vue";
import L from 'leaflet';  // 导入 Leaflet 库

// onMounted(() => {
//   const map = L.map('map', {
//     center: [39.9, 116.4],  // 中国位置，中心点
//     zoom: 2,  // 设置全局地图的缩放级别
//     scrollWheelZoom: true  // 启用鼠标滚轮缩放
//   });

  // 使用 OpenStreetMap 瓦片图层
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors',
//   minZoom: 2,
//   maxZoom: 19
// }).addTo(map);
//   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);
//
//   // 延迟执行尺寸刷新，确保容器渲染完成
//   setTimeout(() => {
//     map.invalidateSize();
//   }, 200);
  // L.marker([51.5, -0.09]).addTo(map)
  //     .bindPopup('A pretty CSS popup.<br> Easily customizable.')
  //     .openPopup();
  // // 确保地图容器的尺寸正确
  // map.on('load', () => {
  //   map.invalidateSize();  // 强制更新地图容器大小
  // });
  //
  // map.on('moveend', () => {
  //   map.invalidateSize();  // 强制更新地图容器大小
  // });
  //
  // // 调整地图缩放级别以适应完整显示
  // map.setZoom(2);
// });
</script>

<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">GIS 地图</span>
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <div id="map" class="static-map"></div>
<!--      <div id="map" class="leaflet-map-container"></div>-->
    </div>
  </div>
</template>

<style scoped lang="scss">

.static-map {
  width: 100%;
  height: 100%;
  background-image: url('/public/leaflet-map111.png');
  background-size: cover;     // 拉伸填满
  background-position: center;
  background-repeat: no-repeat;
}

.centermap {
  position: absolute;
  top: 10px;
  left: 10px;
  right : 0;
  width: 99%;
  bottom: 50px;
  /*height: calc(100% - 10px);*/
  z-index: 0; /* 放置到最底层 */
  overflow: hidden; /* 确保不会溢出 */

  .maptitle {
    height: 60px;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;
    display: none;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    position: relative;
    width: 100%;
    height: 100%;
  }
}

.leaflet-map-container {
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
