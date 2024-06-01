<script setup lang="ts">
import {ChatDotSquare, Expand, Fold, Setting} from "@element-plus/icons-vue";
import {ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";

const isCollapse = ref(false)
let activePath = ref<string>(useRoute().path)
onBeforeRouteUpdate((to) => {
  activePath.value = to.path
  console.log(activePath.value)
})

</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#28292D"
      class="el-menu-vertical"
      :default-active="activePath"
      text-color="#fff"
      :collapse="isCollapse"
      @open=""
      @close=""
      router
  >
    <el-menu-item @click="isCollapse = !isCollapse">
    <el-button type="text" class="collapse-btn">
      <el-icon v-if="isCollapse"><Expand/></el-icon>
      <el-icon v-else><Fold/></el-icon>
    </el-button>
      <template #title>
        <span>菜单</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/chatBot">
      <el-icon>
        <ChatDotSquare/>
      </el-icon>
      <template #title>
        <span>开始对话</span>
      </template>
    </el-menu-item>
    <el-menu-item index="/settings">
      <el-icon>
        <Setting/>
      </el-icon>
      <template #title>
        <span>个人设置</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu-vertical {
  height: 100%;
}

</style>
