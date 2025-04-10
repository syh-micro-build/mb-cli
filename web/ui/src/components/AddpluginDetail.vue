<template>
  <div class="plugin-details">
    <el-input
      v-model="input"
      style="width: 100%"
      placeholder="Please input"
      clearable
    />
    <div class="plugins-list">
      <div
        class="plugin-item"
        v-for="plugin in installedPlugins"
        :key="plugin.name"
      >
        <div class="plugin-item-info">
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
                <el-icon><Download class="installed-icon" /></el-icon>
                474K
                <el-icon><UserFilled class="installed-icon" /></el-icon>
                vuejs
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
        <div>
          <el-space  :size="20">
            <el-tooltip
            class="box-item"
            effect="dark"
            content="这个插件带有一个生成器，可以在项目中新增或者修改文件"
            placement="top"
          >
            <el-icon><Document /></el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="这个插件包含额外的UI功能，比如加强的任务页面、配置页面..."
            placement="top"
          >
            <el-icon><EditPen /></el-icon>
          </el-tooltip>
          </el-space>
          
        </div>
      </div>
    </div>


    <div class="footer"> 
      <el-button type="primary" :icon="Folder">浏览本地插件</el-button>
      <el-button type="primary" :icon="Close" @click="handleClose">取消</el-button>
      <el-button type="primary" :icon="Download">安装</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from "vue";
import {
  Star,
  UserFilled,
  Download,
  Document,
  EditPen,
  Folder,
  Close
} from "@element-plus/icons-vue";

const emit = defineEmits(["close"]);
const input = ref("");
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
const handleClose = () => {
  emit("close");
}
</script>
<style scoped lang="scss">
.plugin-details {
  position: relative;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 80vh;
  overflow: auto;
  .plugins-list {
    .plugin-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      border-bottom: 1px solid #eee;
      align-items: center;
      justify-content: space-between;

      &:last-child {
        border-bottom: none;
      }

      .plugin-icon {
        width: 32px;
        height: 32px;
        margin-right: 20px;

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
    .plugin-item-info {
      display: flex;
      align-items: center;
    }
  }
}
.footer {
  position: absolute;
  left: 0;
  right: 20px;
  bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
