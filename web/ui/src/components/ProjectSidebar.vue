<template>
  <div class="sidebar">
    <div class="project-name">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <span>{{ projectId }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>添加/取消收藏  <el-switch v-model="value1" /></el-dropdown-item>
            <el-dropdown-item>在编辑器中打开</el-dropdown-item>
            <el-dropdown-item>重命名</el-dropdown-item>
            <el-dropdown-item disabled>暂无收藏</el-dropdown-item>
            <el-dropdown-item divided>Vue项目管理器</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="menu-list">
      <div
        class="menu-item"
        :class="{ active: currentTab === 'dashboard' }"
        @click="handleMenuClick('dashboard')"
      >
        <el-icon><Grid /></el-icon>
        <span>仪表盘</span>
      </div>
      <div
        class="menu-item"
        :class="{ active: currentTab === 'plugins' }"
        @click="handleMenuClick('plugins')"
      >
        <el-icon><Tools /></el-icon>
        <span>插件</span>
      </div>
      <div
        class="menu-item"
        :class="{ active: currentTab === 'dependencies' }"
        @click="handleMenuClick('dependencies')"
      >
        <el-icon><Box /></el-icon>
        <span>依赖</span>
      </div>
      <div
        class="menu-item"
        :class="{ active: currentTab === 'config' }"
        @click="handleMenuClick('config')"
      >
        <el-icon><Setting /></el-icon>
        <span>配置</span>
      </div>
      <div
        class="menu-item"
        :class="{ active: currentTab === 'tasks' }"
        @click="handleMenuClick('tasks')"
      >
        <el-icon><Document /></el-icon>
        <span>任务</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Grid,
  Tools,
  Setting,
  Document,
  ArrowDown,
  Box
} from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const projectId = route.params.id;
const currentTab = ref(route.path.split("/").pop() || "dashboard");
const value1 = ref('');
const handleMenuClick = (tab: string) => {
  currentTab.value = tab;
  router.push(`/project/${projectId}/${tab}`);
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;

  .project-name {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background-color: #c8ebdf;
    font-size: 16px;
    font-weight: 500;
    color: #303133;
    gap: 8px;

    .el-icon {
      font-size: 18px;
    }
  }

  .menu-list {
    padding: 20px 0;

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.3s;
      color: #606266;

      &:hover {
        background-color: #f5f7fa;
      }

      &.active {
        color: #a44cf6;
        background-color: #f0e6ff;
      }

      .el-icon {
        font-size: 18px;
      }
    }
  }
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
