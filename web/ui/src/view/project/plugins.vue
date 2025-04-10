<template>
  <div class="project-layout">
    <ProjectSidebar />
    <div class="main-content">
      
      <div class="header">
        <div class="title">插件</div>
        <div class="header-actions">
          <el-button
            class="action-btn"
            @click="handleAddVueRouter"
          >
            添加 vue-router
          </el-button>
          <el-button
            class="action-btn"
            @click="handleAddVuex"
          >
            添加 vuex
          </el-button>
          <el-input
            v-model="searchQuery"
            placeholder="搜索插件"
            class="search-input"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-button
            type="success"
            class="add-btn"
            v-if="!isShowADDPluginContent"
            @click="handleAddPlugin"
          >
            <el-icon><Plus /></el-icon>
            添加插件
          </el-button>
        </div>
      </div>

      <div class="plugins-section" v-if="!isShowADDPluginContent">
        <div class="section-title">已安装的插件</div>
        <div class="plugins-list">
          <div
            class="plugin-item"
            v-for="plugin in installedPlugins"
            :key="plugin.name"
          >
            <div class="plugin-icon">
              <img
                :src="plugin.icon"
                :alt="plugin.name"
              />
            </div>
            <div class="plugin-info">
              <div class="plugin-name">{{ plugin.name }}</div>
              <div class="plugin-meta">
                <span class="version">版本 {{ plugin.version }}</span>
                <span class="latest-version"
                  >最新 {{ plugin.latestVersion }}</span
                >
                <div class="plugin-tags">
                  <el-icon><Star class="official-icon" /></el-icon>
                  官方
                  <el-icon><Check class="installed-icon" /></el-icon>
                  已安装
                </div>
                <el-button
                  link
                  type="primary"
                  class="details-link"
                  >查看详情</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddpluginDetail v-if="isShowADDPluginContent" @close="closeAddPluginContent" />

    </div>
    <AddPluginDialog :dialogData="dialogData"/>
   
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search, Plus, Star, Check } from "@element-plus/icons-vue";
import ProjectSidebar from "@/components/ProjectSidebar.vue";
import AddPluginDialog from "@/components/AddPluginDialog.vue";

import AddpluginDetail from "@/components/AddpluginDetail.vue";

const searchQuery = ref("");

const addVueRouteDialogVisible = ref(false);

const isShowADDPluginContent = ref(false);

const installedPlugins = ref([
  {
    name: "@vue/cli-service",
    version: "5.0.8",
    latestVersion: "5.0.8",
    icon: "https://vuejs.org/images/logo.png"
  },
  {
    name: "@vue/cli-plugin-babel",
    version: "5.0.8",
    latestVersion: "5.0.8",
    icon: "https://raw.githubusercontent.com/babel/logo/master/babel.png"
  },
  {
    name: "@vue/cli-plugin-eslint",
    version: "5.0.8",
    latestVersion: "5.0.8",
    icon: "https://eslint.org/icon.svg"
  }
]);

const dialogData = ref({
  title: '',
  content: '',
  dialogVisible: false,
  key: '',
  url: ''
})

const handleAddVueRouter = () => {
  addVueRouteDialogVisible.value = true;
  dialogData.value.title = "添加 Vue Router";
  dialogData.value.content = "官方SPA管理库";
  dialogData.value.dialogVisible = true;
  dialogData.value.key = 'router';
  dialogData.value.url = 'https://router.vuejs.org/'
};



const handleAddVuex = () => {
  addVueRouteDialogVisible.value = true;
  dialogData.value.title = "添加 vuex";
  dialogData.value.content = "官方状态管理库";
  dialogData.value.dialogVisible = true;
  dialogData.value.key = 'vuex';
  dialogData.value.url = 'https://vuex.vuejs.org/'
};



const handleAddPlugin = () => {
  console.log("添加插件");
  isShowADDPluginContent.value = true; 
};

const closeAddPluginContent = () => {
  isShowADDPluginContent.value = false; 
}

const handleViewDetails = (plugin: any) => {
  console.log("查看插件详情:", plugin.name);
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

      .title {
        font-size: 24px;
        color: #333;
        margin-bottom: 16px;
      }

      .header-actions {
        display: flex;
        gap: 12px;
        align-items: center;

        .action-btn {
          height: 32px;
          padding: 0 15px;
          border-radius: 16px;
          border: none;
          background-color: #fff;
          color: #666;
          font-size: 14px;

          &:hover {
            background-color: #f5f7fa;
          }
        }

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
        }
      }
    }

    .plugins-section {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;

      .section-title {
        font-size: 14px;
        color: #666;
        margin-bottom: 20px;
      }

      .plugins-list {
        .plugin-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid #eee;

          &:last-child {
            border-bottom: none;
          }

          .plugin-icon {
            width: 32px;
            height: 32px;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .plugin-info {
            flex: 1;

            .plugin-name {
              font-size: 14px;
              color: #666;
              margin-bottom: 8px;
            }

            .plugin-meta {
              display: flex;
              align-items: center;
              gap: 12px;
              color: #999;
              font-size: 13px;

              .version,
              .latest-version {
                color: #999;
              }

              .plugin-tags {
                display: flex;
                align-items: center;
                gap: 4px;
                color: #999;

                .official-icon {
                  color: #67c23a;
                }

                .installed-icon {
                  color: #909399;
                }
              }

              .details-link {
                padding: 0;
                height: auto;
                font-size: 13px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
