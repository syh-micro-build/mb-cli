<script setup lang="ts">
import { ref } from "vue";
import { Folder, Plus, Upload } from "@element-plus/icons-vue";
import create from "@/components/create.vue";
const activeTab = ref("projects");
</script>

<template>
  <div class="home">
    <div class="header">
      <div class="content"><div class="title">Vue 项目管理器</div></div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane name="projects">
          <template #label>
            <el-icon><Folder /></el-icon>
            <span>项目</span>
          </template>
        </el-tab-pane>

        <el-tab-pane name="create">
          <template #label>
            <el-icon><Plus /></el-icon>
            <span>创建</span>
          </template>
        </el-tab-pane>

        <el-tab-pane name="import">
          <template #label>
            <el-icon><Upload /></el-icon>
            <span>导入</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
   
    <create v-if="activeTab === 'create'" />
  </div>
</template>

<style scoped lang="scss">
.home {
  .header {
    background-color: #c8ebdf;
    .title {
      padding: 16px;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
    }
  }
}

.tabs {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c8ebdf;
}

.tabs span{
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: normal;
}

.tabs :deep(.el-icon) {
  margin-right: 4px;
  font-size: 16px;
}
</style>
