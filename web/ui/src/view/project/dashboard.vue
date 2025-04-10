<template>
  <div class="project-layout">
    <ProjectSidebar />
    <div class="main-content">
      <div class="header">
        <div class="title">项目仪表盘</div>
        <el-button type="success" class="custom-button">
          <el-icon><Plus /></el-icon>
          自定义
        </el-button>
      </div>

      <div class="dashboard-content">
        <div class="welcome-card">
          <div class="title">欢迎</div>
          <div class="welcome-content">
            <img src="https://vuejs.org/images/logo.png" alt="Vue logo" class="vue-logo" />
            <h2>欢迎来到新项目！</h2>
            <div class="description">
              <div class="desc-item">
                <el-icon><Grid /></el-icon>
                <p>这里是项目仪表盘，你可以点击右上方的"自定义"按钮来添加部件。你的改动将会自动保存。</p>
              </div>
              <div class="desc-item">
                <el-icon><ArrowLeft /></el-icon>
                <p>左侧是各个管理页面。在「插件」页面可以添加新的 Vue CLI 插件，「依赖」页面用于管理项目的依赖包，「配置」页面用于配置各种工具，「任务」页面用于运行各个脚本（比如 webpack 打包）。</p>
              </div>
              <div class="desc-item">
                <el-icon><House /></el-icon>
                <p>点击左上方的下拉菜单或状态栏上的小房子按钮来返回到项目管理器。</p>
              </div>
            </div>
            <el-button type="primary" class="understand-btn" @click="handleUnderstand">了解</el-button>
          </div>
        </div>

        <div class="terminal-card">
          <div class="title">终止端口</div>
          <div class="terminal-content">
            <div class="status">
              <el-icon class="flash-icon"><Lightning /></el-icon>
              准备好终止
            </div>
            <div class="input-group">
              <el-input v-model="portNumber" placeholder="输入一个网络端口" class="port-input" />
              <el-button type="success" class="kill-btn">
                <el-icon><Lightning /></el-icon>
                终止
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Grid, ArrowLeft, House, Lightning } from '@element-plus/icons-vue';
import ProjectSidebar from '@/components/ProjectSidebar.vue';

const portNumber = ref('');

const handleUnderstand = () => {
  console.log('了解');
};
</script>

<style scoped lang="scss">
.project-layout {
  display: flex;
  min-height: 100vh;

  .main-content {
    flex: 1;
    background-color: #c8ebdf;
    padding: 20px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .title {
        font-size: 24px;
        color: #333;
      }

      .custom-button {
        height: 32px;
        padding: 0 15px;
        border-radius: 16px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .dashboard-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;

      .welcome-card, .terminal-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;

        .title {
          padding: 16px;
          font-size: 14px;
          color: #666;
          border-bottom: 1px solid #eee;
        }
      }

      .terminal-card {
        height: 200px;
        display: flex;
        flex-direction: column;
      }

      .welcome-card {
        display: flex;
        flex-direction: column;
      }

      .welcome-content {
        padding: 40px;
        text-align: center;
        flex: 1;

        .vue-logo {
          width: 100px;
          height: 100px;
          margin-bottom: 20px;
        }

        h2 {
          font-size: 24px;
          color: #333;
          font-weight: normal;
          margin-bottom: 30px;
        }

        .description {
          text-align: left;
          margin-bottom: 30px;

          .desc-item {
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
            align-items: flex-start;

            .el-icon {
              font-size: 18px;
              margin-top: 3px;
              color: #666;
            }

            p {
              margin: 0;
              color: #666;
              line-height: 1.6;
              flex: 1;
            }
          }
        }

        .understand-btn {
          height: 32px;
          padding: 0 15px;
          border-radius: 16px;
          font-size: 14px;
          background-color: #4caf50;
          border: none;
        }
      }

      .terminal-content {
        padding: 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #666;
          font-size: 14px;

          .flash-icon {
            color: #409eff;
          }
        }

        .input-group {
          display: flex;
          gap: 12px;

          .port-input {
            flex: 1;

            :deep(.el-input__wrapper) {
              border-radius: 16px;
            }
          }

          .kill-btn {
            height: 32px;
            padding: 0 15px;
            border-radius: 16px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 4px;

            .el-icon {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style> 