<template>
  <div class="project-layout">
    <div class="main-content">
      <div class="header">
        <div class="task-info">
          <el-icon><Box /></el-icon>
          serve
          <span class="task-desc">编译和热更新（用于开发环境）</span>
        </div>
        <div class="header-actions">
          <el-button class="action-btn">
            <el-icon><Document /></el-icon>
            输出
          </el-button>
          <el-button class="action-btn">
            <el-icon><Monitor /></el-icon>
            仪表盘
          </el-button>
          <el-button class="action-btn">
            <el-icon><Setting /></el-icon>
            参数
          </el-button>
        </div>
      </div>

      <div class="task-content">
        <div class="task-header">
          <div class="mode-selector">
            <el-icon><Monitor /></el-icon>
            启动 app
          </div>
          <div class="action-text">解析</div>
        </div>

        <div class="stats-panel">
          <div class="stats-row">
            <div class="stats-item">
              <div class="label">状态</div>
              <div class="value">空闲</div>
            </div>
            <div class="stats-item">
              <div class="label">错误</div>
              <div class="value">0</div>
            </div>
            <div class="stats-item">
              <div class="label">警告</div>
              <div class="value">0</div>
            </div>
          </div>

          <div class="stats-row">
            <div class="stats-item">
              <div class="label">资源</div>
              <div class="value">0.0kB <span class="sub-text">(解析)</span></div>
            </div>
            <div class="stats-item">
              <div class="label">模块</div>
              <div class="value">0.0kB <span class="sub-text">(解析)</span></div>
            </div>
            <div class="stats-item">
              <div class="label">依赖项</div>
              <div class="value">0.0kB <span class="sub-text">0%</span></div>
            </div>
          </div>
        </div>

        <div class="stats-chart">
          <div class="chart-title">速度统计</div>
          <div class="chart-placeholder">...</div>
        </div>

        <div class="stats-details">
          <div class="details-panel">
            <div class="panel-title">资源</div>
            <div class="panel-content">...</div>
          </div>
          <div class="details-panel">
            <div class="panel-title">依赖项</div>
            <div class="panel-content">...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Box, Document, Monitor, Setting } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
.project-layout {
  flex: 1;
  display: flex;
  min-height: 100vh;
  
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #c8ebdf;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .task-info {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 24px;
        color: #333;

        .task-desc {
          font-size: 14px;
          color: #666;
          margin-left: 12px;
        }
      }

      .header-actions {
        display: flex;
        gap: 12px;

        .action-btn {
          height: 32px;
          padding: 0 15px;
          border-radius: 16px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: #fff;
          border: none;
          color: #666;

          &:hover {
            background-color: #f5f7fa;
          }
        }
      }
    }

    .task-content {
      background: white;
      border-radius: 8px;
      padding: 20px;

      .task-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .mode-selector {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;
        }

        .action-text {
          color: #666;
          font-size: 14px;
        }
      }

      .stats-panel {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;

        .stats-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          .stats-item {
            flex: 1;

            .label {
              color: #666;
              font-size: 14px;
              margin-bottom: 8px;
            }

            .value {
              color: #333;
              font-size: 16px;

              .sub-text {
                color: #999;
                font-size: 12px;
                margin-left: 4px;
              }
            }
          }
        }
      }

      .stats-chart {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;

        .chart-title {
          color: #666;
          font-size: 14px;
          margin-bottom: 16px;
        }

        .chart-placeholder {
          color: #999;
          text-align: center;
          padding: 40px 0;
        }
      }

      .stats-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        .details-panel {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 20px;

          .panel-title {
            color: #666;
            font-size: 14px;
            margin-bottom: 16px;
          }

          .panel-content {
            color: #999;
            text-align: center;
            padding: 40px 0;
          }
        }
      }
    }
  }
}
</style> 