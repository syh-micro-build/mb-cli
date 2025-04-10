<template>
  <div class="project-layout">
    <ProjectSidebar />
    <div class="main-content">
      <div class="header">
        <div class="search-bar">
          <el-input
            v-model="searchQuery"
            placeholder="搜索任务"
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button
            class="refresh-btn"
            @click="handleRefresh"
          >
            <el-icon><Refresh /></el-icon>
          </el-button>
        </div>
      </div>
      <div class="list-content">
        <div class="tasks-list">
          <div
            class="task-item"
            v-for="task in tasks"
            :key="task.name"
            @click="handleTaskClick(task)"
          >
            <div class="task-icon">
              <img
                :src="task.icon"
                :alt="task.name"
              />
            </div>
            <div class="task-info">
              <div class="task-name">{{ task.name }}</div>
              <div class="task-desc">{{ task.description }}</div>
            </div>
          </div>
        </div>

        <taskDetail v-if="name === 'serve'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import ProjectSidebar from "@/components/ProjectSidebar.vue";

import taskDetail from "./task-detail.vue";
// import { useRoute, useRouter } from 'vue-router';

const searchQuery = ref("");

const name = ref("serve");

const tasks = ref([
  {
    name: "serve",
    description: "编译和热更新（用于开发环境）",
    icon: "/cube-blue.png"
  },
  {
    name: "build",
    description: "编译并压缩（用于生产环境）",
    icon: "/cube-blue.png"
  },
  {
    name: "lint",
    description: "检查并修复源文件",
    icon: "/eslint.svg"
  },
  {
    name: "inspect",
    description: "检查 webpack 配置",
    icon: "/search.png"
  }
]);

// const route = useRoute();
// const router = useRouter();

const handleRefresh = () => {
  console.log("刷新任务列表");
};

const handleTaskClick = (task: any) => {
  // router.push(`/project/${route.params.id}/tasks/${task.name}`);
};
</script>

<style scoped lang="scss">
.project-layout {
  display: flex;
  min-height: 100vh;

  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #c8ebdf;

    .header {
      margin-bottom: 24px;

      .search-bar {
        display: flex;
        gap: 12px;
        align-items: center;

        .search-input {
          width: 240px;

          :deep(.el-input__wrapper) {
            background-color: #fff;
            border-radius: 16px;
          }
        }

        .refresh-btn {
          width: 32px;
          height: 32px;
          padding: 0;
          border: none;
          background-color: #fff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background-color: #f5f7fa;
          }

          .el-icon {
            font-size: 16px;
          }
        }
      }
    }

    .tasks-list {
      background-color: #fff;
      border-radius: 8px;
      padding: 12px;
      width: 268px;
      height: auto;
      background-color: #e4f5ef;
      height: calc(100% - 80px);

      .task-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #f5f7fa;
        }

        .task-icon {
          width: 40px;
          height: 40px;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .task-info {
          flex: 1;

          .task-name {
            font-size: 16px;
            color: #333;
            margin-bottom: 4px;
          }

          .task-desc {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
}

.list-content {
  display: flex;
}
</style>
