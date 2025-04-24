<script setup lang="ts">
import ItemWrap from "@/components/item-wrap"; // 外部框架组件
import RightTop from "./right-top.vue"; // 引入右上框
import RightCenter from "./right-center.vue"; // 引入右中框
import RightBottom from "./right-bottom.vue"; // 引入右下框
</script>

<template>
  <div class="risk-right-panel">
    <!-- 右上框 -->
    <ItemWrap class="contetn_right-top contetn_lr-item" title="报警次数">
      <RightTop />
    </ItemWrap>

    <!-- 右中框 -->
    <ItemWrap
      class="contetn_right-center contetn_lr-item"
      title="报警排名(TOP8)"
      style="padding: 0 10px 16px 10px"
    >
      <RightCenter />
    </ItemWrap>

    <!-- 右下框 -->
    <ItemWrap class="contetn_right-bottom contetn_lr-item" title="数据统计图">
      <RightBottom />
    </ItemWrap>
  </div>
</template>

<style scoped lang="scss">
.risk-right-panel {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
