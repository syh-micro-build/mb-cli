<template>
  <div class="project-layout">
    <ProjectSidebar />
    <div class="main-content">
      <div class="header">
        <div class="title">项目依赖</div>
        <div class="header-actions">
          <el-input
            v-model="searchQuery"
            placeholder="搜索依赖"
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button type="success" class="add-btn">
            <el-icon><Plus /></el-icon>
            安装依赖
          </el-button>
        </div>
      </div>

      <div class="dependencies-section">
        <div class="section-header">
          <div class="title">运行依赖</div>
        </div>
        <div class="dependencies-list">
          <div class="dependency-item" v-for="dep in runDependencies" :key="dep.name">
            <div class="dep-icon">
              <img :src="dep.icon" :alt="dep.name">
            </div>
            <div class="dep-info">
              <div class="dep-name">{{ dep.name }}</div>
              <div class="dep-meta">
                <span class="version">版本 {{ dep.version }}</span>
                <span class="required">要求 {{ dep.required }}</span>
                <span class="latest">最新 {{ dep.latest }}</span>
                <el-button link type="primary" class="details-link">查看详情</el-button>
                <el-button class="delete-btn">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="section-header dev-section">
          <div class="title">开发依赖</div>
        </div>
        <div class="dependencies-list">
          <div class="dependency-item" v-for="dep in devDependencies" :key="dep.name">
            <div class="dep-icon">
              <img :src="dep.icon" :alt="dep.name">
            </div>
            <div class="dep-info">
              <div class="dep-name">{{ dep.name }}</div>
              <div class="dep-meta">
                <span class="version">版本 {{ dep.version }}</span>
                <span class="required">要求 {{ dep.required }}</span>
                <span class="latest">最新 {{ dep.latest }}</span>
                <el-button link type="primary" class="details-link">查看详情</el-button>
                <el-button class="delete-btn">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Search, Plus, Delete } from '@element-plus/icons-vue';
import ProjectSidebar from '@/components/ProjectSidebar.vue';

const searchQuery = ref('');

const runDependencies = ref([
  {
    name: 'core-js',
    version: '3.40.0',
    required: '3.40.0',
    latest: '3.40.0',
    icon: 'https://avatars.githubusercontent.com/u/3622532?s=48'
  },
  {
    name: 'vue',
    version: '3.5.13',
    required: '3.5.13',
    latest: '3.5.13',
    icon: 'https://vuejs.org/images/logo.png'
  }
]);

const devDependencies = ref([
  {
    name: '@babel/core',
    version: '7.26.9',
    required: '7.26.9',
    latest: '7.26.9',
    icon: 'https://raw.githubusercontent.com/babel/logo/master/babel.png'
  },
  {
    name: '@babel/eslint-parser',
    version: '7.26.8',
    required: '7.26.8',
    latest: '7.26.8',
    icon: 'https://raw.githubusercontent.com/babel/logo/master/babel.png'
  },
  {
    name: 'eslint',
    version: '7.32.0',
    required: '7.32.0',
    latest: '9.21.0',
    icon: 'https://eslint.org/icon.svg'
  },
  {
    name: 'eslint-plugin-vue',
    version: '8.7.1',
    required: '8.7.1',
    latest: '9.32.0',
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

      .header-actions {
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

        .add-btn {
          height: 32px;
          padding: 0 15px;
          border-radius: 16px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      }
    }

    .dependencies-section {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;

      .section-header {
        margin-bottom: 20px;

        &.dev-section {
          margin-top: 40px;
        }

        .title {
          font-size: 14px;
          color: #666;
        }
      }

      .dependencies-list {
        .dependency-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }

          .dep-icon {
            width: 32px;
            height: 32px;
            
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .dep-info {
            flex: 1;

            .dep-name {
              font-size: 14px;
              color: #666;
              margin-bottom: 8px;
            }

            .dep-meta {
              display: flex;
              align-items: center;
              gap: 12px;
              color: #999;
              font-size: 13px;

              .version, .required, .latest {
                color: #999;
              }

              .details-link {
                padding: 0;
                height: auto;
                font-size: 13px;
                margin-left: auto;
              }

              .delete-btn {
                padding: 4px;
                height: auto;
                color: #999;
                border: none;
                background: none;

                &:hover {
                  color: #f56c6c;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style> 