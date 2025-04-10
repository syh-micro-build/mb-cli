<template>
    <div class="presets-container">
      <!-- 提示信息 -->
      <div class="info-banner">
        <el-icon class="info-icon"><InfoFilled /></el-icon>
        <span class="info-text">预设就是一套定义好的插件和配置。你也可将自己的配置保存成预设，方便以后创建项目使用。</span>
      </div>
  
      <!-- 预设选择 -->
      <div class="preset-section">
        <h3 class="section-title">选择一套预设</h3>
        
        <div class="preset-options">
          <el-radio-group v-model="selectedPreset" class="preset-radio-group">
            <!-- Default Vue 3 -->
            <el-radio class="preset-radio-item" label="vue3">
              <div class="preset-content">
                <div class="preset-title">Default (Vue 3)</div>
                <div class="preset-description">[Vue 3] babel, eslint</div>
              </div>
            </el-radio>
  
            <!-- Default Vue 2 -->
            <el-radio class="preset-radio-item" label="vue2">
              <div class="preset-content">
                <div class="preset-title">Default (Vue 2)</div>
                <div class="preset-description">[Vue 2] babel, eslint</div>
              </div>
            </el-radio>
  
            <!-- Manual -->
            <el-radio class="preset-radio-item" label="manual">
              <div class="preset-content">
                <div class="preset-title">手动</div>
                <div class="preset-description">手动配置项目</div>
              </div>
            </el-radio>
  
            <!-- Remote Preset -->
            <el-radio class="preset-radio-item" label="remote">
              <div class="preset-content">
                <div class="preset-title">远程预设</div>
                <div class="preset-description">从 git 仓库拉取预设</div>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>

      <!-- 底部导航按钮 -->
      <div class="footer-buttons">
        <el-button class="prev-button" @click="handlePrev">
          <el-icon><ArrowLeft /></el-icon>
          上一步
        </el-button>
        <el-button type="success" class="next-button" @click="handleCreate">
          <el-icon><Check /></el-icon>
          创建项目
        </el-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { InfoFilled, ArrowLeft, Check } from '@element-plus/icons-vue';
  
  const selectedPreset = ref('vue3');

  const emit = defineEmits(['prev', 'create']);

  const handlePrev = () => {
    emit('prev');
  };

  const handleCreate = () => {
    emit('create', { preset: selectedPreset.value });
  };
  </script>
  
  <style scoped lang="scss">
  .presets-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
    min-height: calc(100vh - 200px);
  
    .info-banner {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 16px;
      background-color: rgb(236, 245, 255);
      border-radius: 8px;
      margin-bottom: 32px;
  
      .info-icon {
        color: #409EFF;
        font-size: 16px;
        margin-top: 3px;
      }
  
      .info-text {
        color: #606266;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  
    .preset-section {
      .section-title {
        font-size: 16px;
        font-weight: 500;
        color: #303133;
        margin-bottom: 20px;
      }
  
      .preset-options {
        .preset-radio-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
  
        .preset-radio-item {
          margin: 0;
          padding: 16px;
          width: 100%;
          border: 1px solid #DCDFE6;
          border-radius: 8px;
          transition: all 0.3s;
  
          &:hover {
            border-color: #a44cf6;
          }
  
          :deep(.el-radio__input.is-checked + .el-radio__label) {
            color: inherit;
          }
  
          :deep(.el-radio__input.is-checked .el-radio__inner) {
            background-color: #a44cf6;
            border-color: #a44cf6;
          }
  
          .preset-content {
            margin-left: 8px;
  
            .preset-title {
              font-size: 16px;
              font-weight: 500;
              color: #303133;
              margin-bottom: 4px;
            }
  
            .preset-description {
              font-size: 14px;
              color: #909399;
            }
          }
        }
      }
    }

    .footer-buttons {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      z-index: 10;

      .prev-button, .next-button {
        min-width: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 12px 24px;
        font-size: 16px;

        .el-icon {
          font-size: 16px;
        }
      }

      .next-button {
        margin-left: auto;
      }
    }
  }
  </style>