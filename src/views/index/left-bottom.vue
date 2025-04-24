<script setup lang="ts">
import { leftBottom } from "@/api";
import SeamlessScroll from "@/components/seamless-scroll";
import { computed, onMounted, reactive } from "vue";
import { useSettingStore } from "@/stores";
import { storeToRefs } from "pinia";
import EmptyCom from "@/components/empty-com";
import { ElMessage } from "element-plus";

const settingStore = useSettingStore();
const { defaultOption, indexConfig } = storeToRefs(settingStore);
const state = reactive<any>({
  list: [
    { lat: 26.658, lng: 102.276, createTime: "2015-01-02", address: "四川省/凉山州/会理市" },
    { lat: 27.723, lng: 102.212, createTime: "2017-10-09", address: "云四川省/凉山州/冕宁县" },
    { lat: 26.577, lng: 1101.655, createTime: "2016-08-24", address: "四川省/凉山州/德昌县" },
    // { lat: 29.043, lng: 102.723, createTime: "2025-02-25", address: "四川省/雅安市/石棉县" },
    { lat: 28.234, lng: 101.927, createTime: "2022-01-24", address: "四川省/凉山州/西昌市" },
    // { lat: 27.456, lng: 101.234, createTime: "2025-01-18", address: "四川省/凉山州/西昌市" },
  ],
  defaultOption: {
    ...defaultOption.value,
    singleHeight: 256,
    limitScrollNum: 4,
  },
  scroll: true,
});

const getData = () => {
  leftBottom( { limitNum: 20 })
    .then((res) => {
      console.log("左下--设备提醒", res);
      if (res.success) {
        state.list = res.data.list;
      } else {
        ElMessage({
          message: res.msg,
          type: "warning",
        });
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
const addressHandle = (item: any) => {
  let name = item.provinceName;
  if (item.cityName) {
    name += "/" + item.cityName;
    if (item.countyName) {
      name += "/" + item.countyName;
    }
  }
  return name;
};
const comName = computed(() => {
  // if (indexConfig.value.leftBottomSwiper) {
  //   return SeamlessScroll;
  // } else {
    return EmptyCom;
  // }
});
// onMounted(() => {
//   getData();
// });

</script>

<template>
  <div class="left_boottom_wrap beautify-scroll-def" :class="{ 'overflow-y-auto': !indexConfig.leftBottomSwiper }">
    <div class="scroll-box">
      <div class="left_boottom_wrap">
        <ul class="left_boottom">
          <li class="left_boottom_item" v-for="(item, i) in state.list.slice(0, 4)" :key="i">
            <span class="orderNum">{{ i + 1 }}</span>
            <div class="inner_right">
              <div class="dibu"></div>
              <div class="flex">
                <div class="info">
                  <span class="labels">经纬度：</span>
                  <span class="text-content">{{ item.lat }}, {{ item.lng }}</span>
                </div>
                <div class="info">
                  <span class="labels">时间：</span>
                  <span class="text-content">{{ item.createTime }}</span>
                </div>
              </div>
              <div class="info addresswrap">
                <span class="labels">地址：</span>
                <span class="text-content">{{ item.address }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

<!--      <component-->
<!--        :is="comName"-->
<!--        :list="state.list"-->
<!--        v-model="state.scroll"-->
<!--        :singleHeight="state.defaultOption.singleHeight"-->
<!--        :step="state.defaultOption.step"-->
<!--        :limitScrollNum="state.defaultOption.limitScrollNum"-->
<!--        :hover="state.defaultOption.hover"-->
<!--        :singleWaitTime="state.defaultOption.singleWaitTime"-->
<!--        :wheel="state.defaultOption.wheel"-->
<!--      >-->
<!--        <ul class="left_boottom">-->
<!--&lt;!&ndash;          <li class="left_boottom_item" v-for="(item, i) in state.list" :key="i">&ndash;&gt;-->
<!--          <li class="left_boottom_item" v-for="(item, i) in state.list.slice(0, 4)" :key="i">-->
<!--&lt;!&ndash;            <span class="orderNum doudong">{{ i + 1 }}</span>&ndash;&gt;-->
<!--            <span class="orderNum">{{ i + 1 }}</span>-->
<!--            <div class="inner_right">-->
<!--              <div class="dibu"></div>-->
<!--              <div class="flex">-->
<!--                <div class="info">-->
<!--                  <span class="labels">经纬度：</span>-->
<!--                  <span class="text-content">{{ item.lat }}, {{ item.lng }}</span>-->
<!--&lt;!&ndash;                  <span class="text-content zhuyao doudong wangguan"> {{ item.gatewayno }}</span>&ndash;&gt;-->
<!--                </div>-->
<!--                <div class="info">-->
<!--                  <span class="labels">时间：</span>-->
<!--                  <span class="text-content" style="font-size: 12px"> {{ item.createTime }}</span>-->
<!--                </div>-->
<!--              </div>-->

<!--&lt;!&ndash;              <span&ndash;&gt;-->
<!--&lt;!&ndash;                class="types doudong"&ndash;&gt;-->
<!--&lt;!&ndash;                :class="{&ndash;&gt;-->
<!--&lt;!&ndash;                  typeRed: item.onlineState == 0,&ndash;&gt;-->
<!--&lt;!&ndash;                  typeGreen: item.onlineState == 1,&ndash;&gt;-->
<!--&lt;!&ndash;                }"&ndash;&gt;-->
<!--&lt;!&ndash;                >{{ item.onlineState == 1 ? "上线" : "下线" }}</span&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->

<!--              <div class="info addresswrap">-->
<!--                <span class="labels">地址：</span>-->
<!--                <span class="text-content" style="font-size: 12px">{{ item.address }}</span>-->
<!--&lt;!&ndash;                <span class="text-content ciyao" style="font-size: 12px"> {{ addressHandle(item) }}</span>&ndash;&gt;-->
<!--              </div>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </component>-->
    </div>
  </div>
</template>

<style scoped lang="scss">
.left_boottom_wrap {
  overflow: hidden;
  /*overflow-y: auto;*/
  width: 100%;
  height: 100%;
}

.doudong {
  overflow: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 14px;
    margin: 10px 0;
    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #fff;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 380px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("@/assets/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }
      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 30px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
.scroll-box {
  max-height: calc(256px * 4); // ✅ 同你的配置
  overflow: hidden;
  position: relative;
}

</style>
