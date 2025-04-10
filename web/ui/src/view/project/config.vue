<template>
  <div class="project-layout">
    <ProjectSidebar />
    <div class="main-content">
      <div class="header">
        <div class="title">项目配置</div>
        <el-input
          v-model="searchQuery"
          placeholder="搜索配置"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <div class="config-list">
        <div class="config-item" v-for="config in configs" :key="config.name">
          <div class="config-icon">
            <img :src="config.icon" :alt="config.name">
          </div>
          <div class="config-info">
            <div class="config-name">{{ config.name }}</div>
            <div class="config-desc">{{ config.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import ProjectSidebar from '@/components/ProjectSidebar.vue';

const searchQuery = ref('');

const configs = ref([
  {
    name: 'Vue CLI',
    description: '配置 Vue 项目',
    icon: 'https://vuejs.org/images/logo.png'
  },
  {
    name: 'ESLint configuration',
    description: '代码质量和规范',
    icon: 'https://eslint.org/icon.svg'
  }
]);
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

      .title {
        font-size: 24px;
        color: #333;
        margin-bottom: 16px;
      }

      .search-input {
        width: 240px;

        :deep(.el-input__wrapper) {
          background-color: #fff;
          border-radius: 16px;
        }
      }
    }

    .config-list {
      background-color: #fff;
      border-radius: 8px;
      padding: 12px;

      .config-item {
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

        .config-icon {
          width: 40px;
          height: 40px;
          
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .config-info {
          flex: 1;

          .config-name {
            font-size: 16px;
            color: #333;
            margin-bottom: 4px;
          }

          .config-desc {
            font-size: 14px;
            color: #666;
          }
        }
      }
    }
  }
}
</style> 