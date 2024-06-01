<script setup lang="ts">
import {ref, watch} from 'vue';
import {ElSelect, ElOption, ElCascader} from 'element-plus';

// 示例用户数据
const user = {
  avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', // 示例头像链接
  username: 'Kevin W'
};

// 学习语言选择器的数据
const languages = [
  {value: 'korean', label: '韩语'},
  {value: 'japanese', label: '日语'},
  {value: 'english', label: '英语'},
  {value: 'chinese', label: '汉语'}
];

// 各语言的级联选择器数据
const languageLevels = {
  korean: [
    {
      value: 'TOPIK I', label: 'TOPIK I', children: [
        {value: 'level 1', label: '初级 1级'},
        {value: 'level 2', label: '初级 2级'}
      ]
    },
    {
      value: 'TOPIK II', label: 'TOPIK II', children: [
        {value: 'level 3', label: '中级 3级'},
        {value: 'level 4', label: '中级 4级'},
        {value: 'level 5', label: '高级 5级'},
        {value: 'level 6', label: '高级 6级'}
      ]
    }
  ],
  japanese: [
    {value: 'N1', label: 'N1'},
    {value: 'N2', label: 'N2'},
    {value: 'N3', label: 'N3'},
    {value: 'N4', label: 'N4'},
    {value: 'N5', label: 'N5'}
  ],
  english: [
    {value: 'elementary', label: '小学生'},
    {value: 'middle_school', label: '初中生'},
    {value: 'high_school', label: '高中生'},
    {value: 'cet4', label: '四级'},
    {value: 'cet6', label: '六级'},
    {value: 'ielts', label: '雅思'},
    {value: 'toefl', label: '托福'}
  ],
  chinese: [
    {value: 'HSK1', label: 'HSK1'},
    {value: 'HSK2', label: 'HSK2'},
    {value: 'HSK3', label: 'HSK3'},
    {value: 'HSK4', label: 'HSK4'},
    {value: 'HSK5', label: 'HSK5'},
    {value: 'HSK6', label: 'HSK6'}
  ]
};

// 绑定的选中值
const selectedLanguage = ref(null);
const selectedLevel = ref(null);

// 动态更新的级联选择器数据
const cascaderOptions = ref([]);

watch(selectedLanguage, (newLanguage) => {
  selectedLevel.value = null;
  cascaderOptions.value = languageLevels[newLanguage] || [];
});

// 修改密码和退出登录的处理函数
const handleChangePassword = () => {
  console.log('修改密码');
  // 这里可以添加实际的修改密码逻辑
};

const handleLogout = () => {
  console.log('退出登录');
  // 这里可以添加实际的退出登录逻辑
};
</script>

<template>
  <div class="user-settings">
    <div class="user-info">
      <img :src="user.avatar" alt="User Avatar" class="avatar"/>
      <h1 class="username">欢迎您，{{ user.username }}</h1>
    </div>
    <div class="language-selection">
      <p style="float: left; margin-bottom: 15px;">学习的语言: </p>
      <ElSelect v-model="selectedLanguage" placeholder="选择学习的语言">
        <ElOption
            v-for="language in languages"
            :key="language.value"
            :label="language.label"
            :value="language.value"
        />
      </ElSelect>
    </div>
    <div class="level-selection" v-if="selectedLanguage">
      <p style="float: left; margin-bottom: 15px;">语言水平: </p>
      <ElCascader
          v-model="selectedLevel"
          :options="cascaderOptions"
          placeholder="选择语言水平"
          style="width: 100%;"
      />
    </div>
    <div class="action-buttons">
      <el-button type="primary" @click="handleChangePassword">修改密码</el-button>
      <el-button type="danger" @click="handleLogout">退出登录</el-button>
    </div>
  </div>
</template>

<style scoped>
.user-settings {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.user-info {
  margin-bottom: 20px;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.username {
  font-size: 24px;
  margin: 10px 0;
}

.language-selection,
.level-selection {
  margin-bottom: 25px;
}

.action-buttons {
  margin-top: 20px;
}

.action-buttons .el-button {
  margin: 5px;
}
</style>
