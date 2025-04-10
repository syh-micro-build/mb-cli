<template>
  <div class="project-create">
    <div class="header">
      <div class="content"><div class="title">创建新项目</div></div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeTab" :before-leave="() => false">
        <el-tab-pane name="0">
          <template #label>
            <div class="custom-tab-label" :class="{ active: activeTab === '0' }">
              <el-icon><Memo /></el-icon>
              <span>详情</span>
            </div>
          </template>
        </el-tab-pane>

        <el-tab-pane name="1">
          <template #label>
            <div class="custom-tab-label" :class="{ active: activeTab === '1' }">
              <el-icon><SuccessFilled /></el-icon>
              <span>预设</span>
            </div>
          </template>
        </el-tab-pane>

        <el-tab-pane name="2">
          <template #label>
            <div class="custom-tab-label" :class="{ active: activeTab === '2' }">
              <el-icon><Menu /></el-icon>
              <span>功能</span>
            </div>
          </template>
        </el-tab-pane>

        <el-tab-pane name="3">
          <template #label>
            <div class="custom-tab-label" :class="{ active: activeTab === '3' }">
              <el-icon><Setting /></el-icon>
              <span>配置</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="page-content">
      <CreateProjectDetail v-if="activeTab === '0'" @next="handleNext" />
      <CreateProjectPresets 
        v-if="activeTab === '1'" 
        @prev="handlePrev"
        @create="handleCreate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CreateProjectDetail from '@/components/CreateProjectDetail.vue'
import CreateProjectPresets from '@/components/CreateProjectPresets.vue'
import { Memo, SuccessFilled, Menu, Setting } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const activeTab = ref('0');
const router = useRouter();
const projectName = ref('');

const handlePrev = () => {
  activeTab.value = '0';
};

const handleCreate = (data: { preset: string }) => {
  console.log('Selected preset:', data.preset);
  ElMessage.success('项目创建成功！');
  router.push(`/project/${projectName.value}/dashboard`);
};

const handleNext = (e: number, name: string) => {
  console.log('Next tab:', e);
  projectName.value = name;
  activeTab.value = String(e + 1);
};
</script>

<style scoped lang="scss">
.project-create {
  min-height: 100vh;
  .header {
    background-color: #c8ebdf;
    .title {
      padding: 16px;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
    }
  }
  .page-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 20px;
  }

  .tabs {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c8ebdf;

    :deep(.el-tabs__nav-wrap::after) {
      height: 1px;
      background-color: rgba(0, 0, 0, 0.1);
    }

    :deep(.el-tabs__active-bar) {
      height: 3px;
      border-radius: 3px;
      background-color: #a44cf6;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .custom-tab-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 16px;
      font-weight: normal;
      opacity: 0.6;
      cursor: default;
      padding: 0 16px;

      &.active {
        opacity: 1;
        font-weight: 500;
        color: #a44cf6;
      }

      .el-icon {
        margin-right: 4px;
        font-size: 16px;
      }
    }

    :deep(.el-tabs__item) {
      padding: 0;
      
      &:hover {
        color: inherit;
      }

      &.is-active {
        color: inherit;
      }
    }

    :deep(.el-tabs__nav) {
      padding: 0 12px;
    }
  }
}
</style>