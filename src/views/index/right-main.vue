<template>
  <div class="right-panel">
    <!-- 标题部分 -->
    <div class="title">
      风 险 评 估
      <span class="dropdown-icon">▼</span>
    </div>

    <!-- 时间选择部分 -->
    <div class="section">
      <label class="section-title">时间</label>
      <div class="input-group">
        <input type="text" placeholder="年" class="input-box" />
        <span class="separator">-</span>
        <input type="text" placeholder="月" class="input-box" />
        <span class="separator">-</span>
        <input type="text" placeholder="日" class="input-box" />
      </div>
    </div>

    <!-- 位置选择部分 -->
    <div class="section">
      <label class="section-title">位置</label>
      <div class="location-container">
      <!-- 上 -->
      <div class="location-row location-center">
        <input type="text" placeholder="位置 1" class="input-box" />
      </div>

      <!-- 左右 -->
      <div class="location-row">
        <input type="text" placeholder="位置 2" class="input-box" />
        <input type="text" placeholder="位置 3" class="input-box" />
      </div>

      <!-- 下 -->
      <div class="location-row location-center">
        <input type="text" placeholder="位置 4" class="input-box" />
      </div>
    </div>
    </div>

    <!-- 影响因子选择部分 -->
    <div class="section">
      <label class="section-title">影响因子</label>
      <div class="checkbox-group">
        <!-- 一级选项 -->
        <div
          v-for="(option, index) in mainOptions"
          :key="option.value"
          class="checkbox-item"
        >
          <label>
            <input
             type="checkbox"
             :value="option.value"
             v-model="selectedMainOptions"
             @change="onMainOptionChange(option)"
            />
            <span @click="toggleExpand(option)" class="one-title">{{ option.label }}</span>
          </label>

          <!-- 动态显示下一级选项 v-if="expandedOption === option.value" -->
          <div

            v-if="option.expanded"
            class="sub-checkbox-group"
          >
            <label
              v-for="(subOption, subIndex) in option.subOptions"
              :key="subOption.value"
            >
              <input
                type="checkbox"
                :value="subOption.value"
                v-model="selectedSubOptions[option.value]"
                @change="onSubOptionChange(option)"
              />
              {{ subOption.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- 图例区域 -->
<!--    &lt;!&ndash; 渐变图例选择器 &ndash;&gt;-->
<!--    <div class="section legend-section">-->
<!--      <label class="section-title">图例</label>-->
<!--      <div class="legend-toggle" @click="toggleLegend">-->
<!--        <span>{{ legendVisible ? '▲ 收起图例' : '▼ 展开图例' }}</span>-->
<!--      </div>-->
<!--      <div v-show="legendVisible" class="colormap-list">-->
<!--        <div-->
<!--         v-for="(gradient, name) in colormaps"-->
<!--          :key="name"-->
<!--         class="colormap-item"-->
<!--         :class="{ selected: selectedColormap === name }"-->
<!--         @click="selectColormap(name)"-->
<!--       >-->
<!--          <div-->
<!--           class="colormap-preview"-->
<!--           :style="{ background: gradient }"-->
<!--         ></div>-->
<!--          <div class="colormap-label">{{ name }}</div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- 图例选择器（悬浮下拉） -->
    <div class="section legend-dropdown-wrapper" @click="toggleLegendDropdown">
      <label class="section-title">图例</label>

      <!-- 当前图例显示 -->
      <div class="selected-colormap">
       <div class="colormap-preview" :style="{ background: colormaps[selectedColormap] }"></div>
       <span class="colormap-label">{{ selectedColormap }}</span>
     </div>

      <!-- 悬浮下拉图例列表 -->
      <div v-if="legendDropdownVisible" class="colormap-dropdown" @click.stop>
        <div
         v-for="(gradient, name) in colormaps"
         :key="name"
          class="colormap-item"
          :class="{ selected: selectedColormap === name }"
          @click="selectColormap(name)"
       >
          <div class="colormap-preview" :style="{ background: gradient }"></div>
          <div class="colormap-label">{{ name }}</div>
        </div>
      </div>
    </div>


    <!-- 风险类型多选 -->
    <div class="section">
      <label class="section-title">风险类型</label>
      <div class="risk-checkbox-group">
       <label v-for="type in riskTypes" :key="type">
         <input type="checkbox" :value="type" v-model="selectedRiskTypes" />
         {{ type }}
       </label>
      </div>
    </div>


    <!-- 确认按钮 -->
<!--    <div class="confirm-button">-->
<!--      <button @click="onConfirm">确认</button>-->
<!--    </div>-->
    <div class="action-buttons">
    <button @click="onConfirm">确认</button>
    <button @click="onSave">保存</button>
  </div>

  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";

// // 多选框选中的因子
// const selectedFactors = ref([]);

// 一级选项及其对应的下一级选项
const mainOptions = [
  {
    value: "气象",
    label: "气象",
    subOptions: [
      { value: "温度", label: "温度" },
      { value: "湿度", label: "湿度" },
      { value: "风速", label: "风速" },
    ],
  },
  {
    value: "植被",
    label: "植被",
    subOptions: [
      { value: "覆盖率", label: "覆盖率" },
      { value: "类型", label: "类型" },
    ],
  },
  {
    value: "地形",
    label: "地形",
    subOptions: [
      { value: "坡度", label: "坡度" },
      { value: "海拔", label: "海拔" },
    ],
  },
  {
    value: "人为",
    label: "人为",
    subOptions: [
      { value: "人口密度", label: "人口密度" },
      { value: "活动频率", label: "活动频率" },
    ],
  },
  {
    value: "其他",
    label: "其他",
    subOptions: [
      { value: "111", label: "111" },
      { value: "222", label: "222" },
    ],
  },
];

// 用户选中的主选项
const selectedMainOptions = ref([]);

// 用户选中的下一级选项
const selectedSubOptions = reactive({
  气象: [],
  植被: [],
  地形: [],
  人为: [],
});

// 当前展开的主选项
const expandedOption = ref(null);

// 主选项变化时联动下一级选项
const onMainOptionChange = (option) => {
  if (selectedMainOptions.value.includes(option.value)) {
    // 主选项被选中，下一级全选
    selectedSubOptions[option.value] = option.subOptions.map(
      (subOption) => subOption.value
    );
  } else {
    // 主选项取消，下一级取消
    selectedSubOptions[option.value] = [];
  }
};

// 下一级选项变化时联动主选项
const onSubOptionChange = (option) => {
  const subSelectedCount = selectedSubOptions[option.value].length;
  const totalSubCount = option.subOptions.length;

  if (subSelectedCount === totalSubCount) {
    // 如果所有下一级都选中，选中主选项
    if (!selectedMainOptions.value.includes(option.value)) {
      selectedMainOptions.value.push(option.value);
    }
  } else {
    // 如果不是全部选中，取消主选项
    selectedMainOptions.value = selectedMainOptions.value.filter(
      (value) => value !== option.value
    );
  }
};

// 展开或折叠下一级选项
const toggleExpand = (option) => {
  // expandedOption.value =
  //   expandedOption.value === option.value ? null : option.value;
  option.expanded = !option.expanded; // 切换展开状态
};

const legendDropdownVisible = ref(false);

const toggleLegendDropdown = () => {
  legendDropdownVisible.value = !legendDropdownVisible.value;
};

const colormaps = {
  "红-黄-绿": "linear-gradient(to right, #ff0000, #ffff00, #00ff00)",
  "蓝-紫": "linear-gradient(to right, #00f, #a0f)",
  "火焰图": "linear-gradient(to right, #ff0000, #ffa500, #ffff00)",
};

const selectedColormap = ref("红-黄-绿");

const selectColormap = (name) => {
  selectedColormap.value = name;
  legendDropdownVisible.value = false;
};


// 风险类型多选
const riskTypes = ['发生概率', '蔓延概率', '综合风险'];
const selectedRiskTypes = ref([]);

const onSave = () => {
  console.log("已点击保存按钮");
  // TODO: 执行保存逻辑
};

// 确认按钮事件
// const onConfirm = () => {
//   console.log("选中的因子：", selectedFactors.value);
// };
</script>

<style scoped>
.right-panel {
  width: 100%;
  height: 100%;
  /*background-color: rgba(3, 5, 12, 0.8);*/
  /*border-left: 1px solid #ddd;*/
  padding: 16px;
  box-sizing: border-box;
  overflow-y: auto; /* 滚动 */
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-icon {
  font-size: 14px;
  cursor: pointer;
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.input-box {
  flex: 1; /* 如果想让输入框自适应父容器的宽度，可以保留这一行 */
  min-width: 80px;
  width: 120px;
  height: 32px;
  padding: 4px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px; /* 圆角 */
  box-sizing: border-box;
  /*text-align: center; !* 让文字居中 *!*/
}

.separator {
  margin: 0 8px;
  font-size: 16px;
  color: #fff;
  line-height: 32px;
}

.location-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  gap: 8px; /* 行间距 */
}

.location-row {
  display: flex;
  /*justify-content: center;*/
  justify-content: space-between; /* 左右对齐 */
  /*width: 100%; !* 确保占满容器 *!*/
  gap: 150px;
}

.location-row.location-center {
  justify-content: center; /* 居中 */
}

.checkbox-group {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*gap: 8px;*/
  max-height: 150px; /* 设置高度 */
  overflow-y: auto; /* 开启滚动 */
}

.one-title {
  font-size: 18px; /* 设置文字大小 */
  font-weight: bold; /* 设置文字加粗 */
  /*color: #333; !* 可选：设置文字颜色 *!*/
  cursor: pointer; /* 鼠标样式 */
}

.checkbox-item {
  /*font-size: 16px;*/
  /*display: flex;*/
  /*align-items: center;*/
  margin-bottom: 8px;
}

/*.checkbox-item input {*/
/*  margin-right: 8px;*/
/*}*/
.sub-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 20px; /* 缩进下一级选项 */
}

.sub-checkbox-group label {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.sub-checkbox-group input {
  margin-right: 4px;
}

/*.radio-item input {*/
/*  margin-right: 8px;*/
/*}*/
.legend-toggle {
  cursor: pointer;
  font-size: 14px;
  color: #4cc3ff;
  margin-bottom: 8px;
}

.colormap-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.colormap-item {
  cursor: pointer;
  padding: 4px;
  border: 1px solid #444;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
}

.colormap-item.selected {
  border: 2px solid #00eaff;
}

.colormap-preview {
  width: 120px;
  height: 16px;
  border-radius: 4px;
  margin-bottom: 4px;
}

.colormap-label {
  font-size: 13px;
  color: #ccc;
}


.risk-checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 18px;
}


.confirm-button {
  display: flex;
  justify-content: center;
}

.confirm-button button {
  width: 100px;
  height: 36px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button button:hover {
  background-color: #0056b3;

}

.legend-dropdown-wrapper {
  position: relative;
  user-select: none;
}

.selected-colormap {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px;
  border: 1px solid #444;
  border-radius: 6px;
}

.colormap-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #1a1a1a;
  border: 1px solid #444;
  padding: 8px;
  border-radius: 6px;
  z-index: 1000;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  width: max-content;
}

.colormap-item {
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.colormap-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.colormap-item.selected {
  outline: 1px solid #00eaff;
}

.colormap-preview {
  width: 500px;
  height: 16px;
  border-radius: 4px;
  margin-bottom: 0;
}

.colormap-label {
  font-size: 13px;
  color: #ccc;
  display: none;
}

.action-buttons {
  position: absolute;
  bottom: 70px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-buttons button {
  width: 100px;
  height: 36px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-buttons button:hover {
  background-color: #0056b3;
}

</style>
