<script setup lang="ts">
import MainHeader from "@/components/mainHeader.vue";
import NavBar from "@/components/navBar.vue";
</script>

<template>
  <el-container direction="vertical" style="height: 100vh; width: 100vw;">
    <main-header/>
    <el-container>
      <el-aside width="200px"><nav-bar/></el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
</style>
