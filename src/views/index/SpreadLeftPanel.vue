<script setup lang="ts">
import ItemWrap from "@/components/item-wrap"; // 外部框架组件
import LeftTop from "./left-top.vue"; // 引入左上框
import LeftCenter from "./left-center.vue"; // 引入左中框
import LeftBottom from "./left-bottom.vue"; // 引入左下框
</script>

<template>
  <div class="risk-left-panel">
    <!-- 左上框 -->
    <ItemWrap class="contetn_left-top contetn_lr-item" title="设备总览">
      <LeftTop />
    </ItemWrap>

    <!-- 左中框 -->
    <ItemWrap class="contetn_left-center contetn_lr-item" title="用户总览">
      <LeftCenter />
    </ItemWrap>

    <!-- 左下框 -->
    <ItemWrap
      class="contetn_left-bottom contetn_lr-item"
      title="设备提醒"
      style="padding: 0 10px 16px 10px"
    >
      <LeftBottom />
    </ItemWrap>
  </div>
</template>

<style scoped lang="scss">
.risk-left-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
