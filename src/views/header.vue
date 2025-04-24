<script setup lang="ts">
import { reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from 'dayjs';
import type {DateDataType} from "./index.d"
import {useSettingStore} from "@/stores/index"

const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  timing:null
});

const { setSettingShow} =useSettingStore()
const weekday= ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD hh : mm : ss");
    dateData.dateWeek = weekday[dayjs().day()];
  }, 1000);
};
timeFn();

// 导航项配置
const router = useRouter(); // 获取路由对象
const route = useRoute();
const navOptions = [
  { name: "风险评估", path: "/home/risk-assessment" },
  { name: "灾情监测", path: "/home/disaster-monitoring" },
  { name: "蔓延预测", path: "/home/spread-prediction" },
  { name: "消防救援", path: "/home/fire-rescue" },
  { name: "灾后评估", path: "/home/disaster-recovery" },
  { name: "排放估计", path: "/home/emission-estimation" },
];

// 路由跳转函数
const navigate = (path: string) => {
  router.push(path); // 跳转到指定路径
};
// 判断当前路径是否激活
const isActive = (path: string) => route.path === path;

// 默认跳转到第一个导航项
onMounted(() => {
  if (route.path === "/home") {
    router.push(navOptions[0].path); // 默认跳转到第一个导航项
  }
});
</script>

<template>
  <div class="d-flex jc-center title_wrap">
    <div class="zuojuxing"></div>
    <div class="youjuxing"></div>
    <div class="guang"></div>

    <div class="d-flex jc-center">
      <div class="title">
        <span class="title-text">林火可视化平台</span>
      </div>
    </div>
    <div class="left_nav">
      <div
        v-for="(option, index) in navOptions.slice(0, 3)"
        :key="index"
        class="nav_item"
        :class="{ active: isActive(option.path) }"
        @click="navigate(option.path)"
      >
        {{ option.name }}
      </div>
<!--      <div class="nav_item">风险评估</div>-->
<!--      <div class="nav_item">灾情监测</div>-->
<!--      <div class="nav_item">蔓延预测</div>-->
    </div>
    <div class="right_nav">
      <div
        v-for="(option, index) in navOptions.slice(3)"
        :key="index"
        class="nav_item"
        :class="{ active: isActive(option.path) }"
        @click="navigate(option.path)"
      >
        {{ option.name }}
      </div>
<!--     <div class="nav_item">消防救援</div>-->
<!--      <div class="nav_item">灾后评估</div>-->
<!--      <div class="nav_item">排放估计</div>-->
    </div>
    <div class="timers">
      {{ dateData.dateYear }} {{ dateData.dateWeek }} {{ dateData.dateDay }}

      <div class="setting_icon"   @click="setSettingShow(true)">
          <img src="@/assets/img/headers/setting.png" alt="设置">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title_wrap {
  height: 60px;
  /*background-image: url("../assets/img/top.png");*/
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url("../assets/img/guang.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }

  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url("../assets/img/headers/juxing1.png");
  }

  .zuojuxing {
    left: 11%;
  }

  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }

  .left_nav,
  .right_nav {
    display: flex !important; /* 确保设置为 flex 布局 */
    flex-direction: row !important; /* 改为水平排列 */
    position: absolute;
    top: 95%;
    transform: translateY(-100%);
  }

  .left_nav {
    left: 210px; /* 靠左对齐 */
  }

  .right_nav {
    right: 230px; /* 靠右对齐 */
  }

  .nav_item {
    margin: 0 30px; /* 设置水平间距 */
    /*color: #fff;*/
    cursor: pointer;
    white-space: nowrap; /* 防止换行 */
    transition: color 0.3s ease; /* 添加过渡效果 */

    width: 130px; /* 设置导航项的宽度 */
    height: 40px; /* 设置导航项的高度 */
    line-height: 30px; /* 设置文字垂直居中 */
    text-align: center; /* 设置文字水平居中 */
    border-radius: 5px; /* 如果需要圆角 */
    background-color: rgba(0, 0, 0, 0.2); /* 设置背景颜色（可选） */
    font-size: 26px; /* 字体大小 */
    font-weight: 900; /* 字体粗细 */
    letter-spacing: 6px; /* 字母间距 */
    background: linear-gradient(
      92deg,
     #0072ff 0%,
     /*#00eaff 48.8525390625%,*/
     #01aaff 100%
    ); /* 渐变背景 */
    -webkit-background-clip: text; /* 仅剪裁文字部分 */
    -webkit-text-fill-color: transparent; /* 填充为透明 */
  }
  .nav_item:hover {
    /*悬停效果*/
    background:  linear-gradient(
      92deg,
     /*#0072ff 0%,*/
     #00eaff 48.8525390625%,
     #01aaff 100%
    ) ; /* 渐变背景 */
    -webkit-background-clip: text; /* 仅剪裁文字部分 */
    -webkit-text-fill-color: transparent; /* 填充为透明 */
  }

  .nav_item.active {
    background:  linear-gradient(
      92deg,
     /*#0072ff 0%,*/
     #00eaff 48.8525390625%,
     #01aaff 100%
    ) ; /* 渐变背景 */
    -webkit-background-clip: text; /* 仅剪裁文字部分 */
    -webkit-text-fill-color: transparent; /* 填充为透明 */
    /*font-weight: bold;*/
    border-bottom: 2px solid #00eaff; /* 添加下划线 */
  }

  .timers {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 18px;
    color: #ffffff;
    display: flex;
    align-items: flex-end;
    flex-direction: column; /* 设置为竖直排列 */

    .setting_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 46px;

  .title-text {
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(
      92deg,
      #0072ff 0%,
      #00eaff 48.8525390625%,
      #01aaff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
