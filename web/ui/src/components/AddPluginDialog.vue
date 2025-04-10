<template>
  <el-dialog
    v-model="dialogData.dialogVisible"
    :title="dialogData.title"
    width="500"
  >
    <span>{{ dialogData.content }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          text
          @click="openDoc"
          >查看详情</el-button
        >
        <el-button @click="dialogData.dialogVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleNext"
        >
          继续
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {defineProps, defineEmits } from "vue";
const emits = defineEmits(["update:dialogVisible"]);
const props = defineProps<{
  dialogData: {
    title: string;
    content: string;
    dialogVisible: boolean;
    key: string;
    url: string;
  };
}>();
console.log("props", props);

const openDoc = () => {
    window.open(props.dialogData.url)
};

const handleNext = () => {
  props.dialogData.dialogVisible = false;
};
</script>
