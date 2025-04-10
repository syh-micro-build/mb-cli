<template>
  <div class="create-footer">
    <div class="btn-box">
      <el-button
        :icon="Plus"
        type="success"
        class="create-button"
        @click="handleCreate"
      >在此创建新项目</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';



const router = useRouter();

const handleCreate = () => {
  router.push('/project/create');
};
</script>

<style scoped lang="scss">
.create-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-box {
    text-align: center;
  }
}

.create-button {
  padding: 16px 32px;
  font-size: 16px;
}
</style>