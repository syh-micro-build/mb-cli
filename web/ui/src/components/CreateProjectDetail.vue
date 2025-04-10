<template>
  <div class="project-config">
    <el-form :model="form" label-position="top" :rules="rules" ref="formRef">
      <!-- 项目文件夹 -->
      <div class="form-section">
        <h3 class="section-title">项目文件夹</h3>
        <el-form-item prop="projectName">
          <el-input v-model="form.projectName" class="folder-input">
            <template #prepend>
              <el-icon><Folder /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="path-display">
          <span class="path-text">{{ basePath }}</span>
          <el-button type="primary" link :icon="EditPen" @click="handleEditPath">编辑</el-button>
        </div>
      </div>

      <!-- 包管理器 -->
      <div class="form-section">
        <h3 class="section-title">包管理器</h3>
        <el-select v-model="form.packageManager" class="package-select">
          <el-option label="默认" value="default" />
          <el-option label="npm" value="npm" />
          <el-option label="yarn" value="yarn" />
          <el-option label="pnpm" value="pnpm" />
        </el-select>
      </div>

      <!-- 更多选项 -->
      <div class="form-section">
        <h3 class="section-title">更多选项</h3>
        <div class="options-list">
          <el-switch
            v-model="form.overwrite"
            class="option-item"
            :active-text="'若目标文件夹已存在则将其覆盖'"
          />
          <el-switch
            v-model="form.noGuide"
            class="option-item"
            :active-text="'无新手指引的脚手架项目'"
          />
        </div>
      </div>

      <!-- Git 配置 -->
      <div class="form-section">
        <h3 class="section-title">Git</h3>
        <div class="git-options">
          <el-switch
            v-model="form.initGit"
            class="option-item"
            :active-text="'初始化 git 仓库（建议）'"
          />
          <el-input
            v-if="form.initGit"
            v-model="form.commitMessage"
            placeholder="覆盖提交信息（选填）"
            class="commit-input"
          />
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="form-actions">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleNext">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { Folder, EditPen } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';

const router = useRouter();
const formRef = ref<FormInstance>();
const basePath = ref('/Users/liyuhui/');
const emit = defineEmits(['next'])
const form = reactive({
  projectName: '',
  packageManager: 'default',
  overwrite: false,
  noGuide: false,
  initGit: true,
  commitMessage: ''
});

const rules = {
  projectName: [
    { required: true, message: '请输入项目名称', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9-_]+$/, message: '项目名称只能包含字母、数字、连字符和下划线', trigger: 'blur' }
  ]
};

const handleEditPath = () => {
  // TODO: 实现路径编辑功能
  console.log('编辑路径');
};

const handleCancel = () => {
  router.back();
};

const handleNext = async () => {
  if (!formRef.value) return;
  
  try {
    await formRef.value.validate();
    emit('next', 0, form.projectName);
  } catch (error) {
    console.error('表单验证失败：', error);
  }
};
</script>

<style scoped lang="scss">
.project-config {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;

  .form-section {
    margin-bottom: 32px;

    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      color: var(--el-text-color-primary);
    }
  }

  .folder-input {
    :deep(.el-input-group__prepend) {
      padding: 0 12px;
      background-color: var(--el-fill-color-light);
    }
  }

  .path-display {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 8px;

    .path-text {
      color: var(--el-text-color-secondary);
      font-size: 14px;
    }
  }

  .package-select {
    width: 100%;
  }

  .options-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .git-options {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .commit-input {
      margin-top: 8px;
    }
  }

  .option-item {
    :deep(.el-switch__label) {
      font-size: 14px;
    }
  }

  .form-actions {
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}
</style>