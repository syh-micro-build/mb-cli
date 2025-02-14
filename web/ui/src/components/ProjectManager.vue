<template>
  <div class="project-manager">
    <el-card class="manager-card">
      <template #header>
        <div class="card-header">
          <h2>项目管理器</h2>
        </div>
      </template>

      <el-form
        :model="form"
        label-position="top"
        :rules="rules"
        ref="formRef"
      >
        <!-- 项目名称 -->
        <el-form-item
          label="项目名称"
          prop="projectName"
        >
          <el-input
            v-model="form.projectName"
            placeholder="请输入项目名称"
            :prefix-icon="Document"
          />
        </el-form-item>

        <!-- 模板类型 -->
        <el-form-item
          label="模板类型"
          prop="templateType"
        >
          <el-select
            v-model="form.templateType"
            placeholder="请选择模板类型"
            class="w-full"
          >
            <el-option
              v-for="item in templateTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 模板选择 -->
        <el-form-item
          label="模板选择"
          prop="template"
        >
          <el-select
            v-model="form.template"
            placeholder="请选择模板"
            class="w-full"
            :disabled="!form.templateType"
          >
            <el-option
              v-for="item in templates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- 项目路径 -->
        <el-form-item
          label="项目路径"
          prop="projectPath"
        >
          <el-input
            v-model="form.projectPath"
            placeholder="请选择项目路径"
            :prefix-icon="Folder"
          >
            <template #append>
              <el-button @click="handleSelectPath"> 浏览 </el-button>
            </template>
          </el-input>
        </el-form-item>

        <!-- 操作按钮 -->
        <div class="button-group">
          <el-button
            type="primary"
            @click="handleSubmit"
            :loading="loading"
          >
            下一步
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Document, Folder } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  projectName: "",
  templateType: "",
  template: "",
  projectPath: ""
});

const templateTypes = [
  { label: "Vue 项目", value: "vue" },
  { label: "React 项目", value: "react" },
  { label: "Node.js 项目", value: "node" },
  { label: "其他", value: "other" }
];

const templates = [
  { label: "Vue3 + TypeScript", value: "vue3-ts" },
  { label: "Vue3 基础模板", value: "vue3-basic" },
  { label: "Vue3 + Element Plus", value: "vue3-element" }
];

const rules: FormRules = {
  projectName: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 2, max: 50, message: "长度在 2 到 50 个字符之间", trigger: "blur" }
  ],
  templateType: [
    { required: true, message: "请选择模板类型", trigger: "change" }
  ],
  template: [{ required: true, message: "请选择模板", trigger: "change" }],
  projectPath: [{ required: true, message: "请选择项目路径", trigger: "blur" }]
};

const handleSelectPath = () => {
  // TODO: 实现选择路径的功能
  console.log("选择路径");
};

const handleSubmit = async () => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();
    loading.value = true;
    // TODO: 实现创建项目的逻辑
    console.log("表单数据：", form);
  } catch (error) {
    console.error("表单验证失败：", error);
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};
</script>

<style scoped>
.project-manager {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.manager-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--el-text-color-primary);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

:deep(.el-form-item__label) {
  font-weight: 500;
}

:deep(.el-input__wrapper),
:deep(.el-select) {
  width: 100%;
}

:deep(.el-card__header) {
  background-color: var(--el-color-primary-light-9);
  border-bottom: 1px solid var(--el-border-color-light);
}

.w-full {
  width: 100%;
}
</style>
