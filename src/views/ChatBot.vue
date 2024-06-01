<script setup lang="ts">
import {Microphone, Mute} from "@element-plus/icons-vue";
import {ref} from "vue";
import mascot_breathe from "@/assets/mascot/呼吸.gif";
import mascot_thinking from "@/assets/mascot/思考.gif";
import mascot_talking from "@/assets/mascot/说话.gif";

const isRecording = ref(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const audioChunks: Blob[] = [];
const audio = ref<HTMLAudioElement | null>(null);
let mascotSource = ref(mascot_breathe);

const startRecording = async () => {
  mascotSource.value = mascot_thinking; // 切换到思考动作
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  mediaRecorder.value = new MediaRecorder(stream);
  mediaRecorder.value.ondataavailable = (event: BlobEvent) => {
    audioChunks.push(event.data);
  };
  mediaRecorder.value.start();
  isRecording.value = true;
};

const stopRecording = () => {
  if (mediaRecorder.value) {
    mediaRecorder.value.stop();
    mediaRecorder.value.onstop = async () => {
      const audioBlob = new Blob(audioChunks, {type: 'audio/wav'});
      const audioUrl = URL.createObjectURL(audioBlob);
      if (audio.value) {
        audio.value.src = audioUrl;
      }
      mascotSource.value = mascot_talking; // 切换到说话动作
      await uploadAudio(audioBlob);
      isRecording.value = false;
    };
  }
};

const uploadAudio = async (audioBlob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(audioBlob);
  reader.onloadend = async () => {
    const base64data = reader.result;
    // 调用本地Python脚本的逻辑
    const response = await fetch('http://localhost:5001/process-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({audio: base64data})
    });
    const result = await response.json();
    console.log(result);
    mascotSource.value = mascot_breathe; // 切换到呼吸动作
  };
};
</script>

<template>
  <div class="overall">
    <h1>Cooing Chat Bot</h1>
    <div class="mascot-container">
      <img class="mascot" :src="mascotSource" alt="mascot"/>
    </div>
    <div class="recorder-button-container">
      <el-button size="large" v-if="!isRecording" type="primary" @click="startRecording">
        <el-icon>
          <Microphone/>
        </el-icon>
        开始讲话
      </el-button>
      <el-button size="large" v-else type="primary" @click="stopRecording">
        <el-icon>
          <Mute/>
        </el-icon>
        结束讲话
      </el-button>
    </div>
    <div style="position: absolute; top: 80%; left: 47%; transform: translate(-50%, -50%); text-align: center;">
      <p style="margin-bottom: 10px;">您可以听您刚刚的语音</p>
      <audio ref="audio" controls></audio>
    </div>
  </div>
</template>

<style scoped>
.overall {
  position: relative;
  height: 100%;
}

.recorder-button-container {
  position: absolute;
  left: 43%;
  bottom: 20px;
}

.mascot-container {
  width: 450px;
  height: 400px;
  position: absolute;
  top: 25%;
  left: 29%;
}

.mascot {
  width: 100%;
  height: 100%;
}
</style>
