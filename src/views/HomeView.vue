<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from "vue";
import { RouterView, useRoute } from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import Setting from "./setting.vue";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import CenterMap from "./index/center-map.vue"; // 引入地图组件
import MessageContent from "@/components/Plugins/MessageContent";
import RescueRightPanel from '@/views/index/RescueRightPanel.vue';

const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
// 动态定义左框和右框的内容
const route = useRoute(); // 获取当前路由信息
// const LeftComponent = computed(() => {
//   console.log('LeftComponent:', route.meta.leftComponent); // 打印 LeftComponent 值
//   return route.meta.leftComponent || null;
// });
// const LeftComponent = computed(() => route.meta.leftComponent || null);
// const RightComponent = computed(() => route.meta.rightComponent || null);
const LeftComponent = computed(() =>
  route.meta.leftComponent
    ? defineAsyncComponent(route.meta.leftComponent)
    : null
);

const RightComponent = computed(() =>
  route.meta.rightComponent
    ? defineAsyncComponent(route.meta.rightComponent)
    : null
);
</script>

<template>
  <scale-screen
    width="1920"
    height="1080"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >
    <!-- 全局头部 -->
    <Headers />

    <!-- 中心地图 -->
    <div class="map_wrap">
      <CenterMap />
    </div>

    <!-- 子页面路由内容 -->
    <div class="content_wrap">
<!--      <RiskLeftPanel />-->
      <!-- 动态生成左框 -->
        <div class="left_box">
<!--            <RescueLeftPanel />-->
            <component v-if="LeftComponent" :is="LeftComponent" />
        </div>

    <!-- 动态生成右框 -->
        <div class="right_box">
<!--              <RescueRightPanel />-->
              <component v-if="RightComponent" :is="RightComponent" />
        </div>
    </div>

<!--    <div class="content_wrap">-->
<!--      <Headers />-->
<!--      <RouterView />-->
<!--      <MessageContent />-->
<!--    </div>-->
  </scale-screen>
  <Setting />
</template>


<style lang="scss" scoped>
 .map_wrap {
  width: 100%;
  height: calc(100% - 60px); /* 扣除头部的高度 */
  position: fixed;
  top: 60px; /* 确保在头部以下 */
  left: 0;
  z-index: 1; /* 地图背景层 */
}
.content_wrap {
  display: flex;
  justify-content: space-between;
  pointer-events: auto;

  width: 100%;
  /*height: auto;*/
  height: calc(100% - 60px);
  padding: 16px 16px 16px 16px;
  box-sizing: border-box;
  /* 内容区域浮在地图之上 */
  /*background-image: url("@/assets/img/pageBg.png");*/
  background-size: cover;  /*不能cover，会遮挡地图交互*/
  /*position: relative;*/
  z-index: 10;
  /*background-position: center center;*/
}
.left_box,
.right_box {
  width: 30%;
  height: calc(100% - 60px);
  pointer-events: auto;
  /*flex: 1;*/
  /*background: #333; !* 测试背景色 *!*/
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10
  /*pointer-events: none;*/
}
.box {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
}
</style>
