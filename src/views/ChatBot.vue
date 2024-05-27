<script setup lang="ts">
import {Microphone, Mute} from "@element-plus/icons-vue";
import {ref} from "vue";
const isRecording = ref(false);
const mediaRecorder = ref<MediaRecorder | null>(null);
const audioChunks: Blob[] = [];
const audio = ref<HTMLAudioElement | null>(null)

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      if (audio.value) {
        audio.value.src = audioUrl;
      }
      await uploadAudio(audioBlob);
      isRecording.value = false;
    };
  }
};

const uploadAudio = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');

  // try {
  //   const response = await axios.post('/upload', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  //   console.log('File uploaded successfully', response.data);
  // } catch (error) {
  //   console.error('Error uploading file', error);
  // }
};
</script>

<template>
  <div class="overall">
    <h1>Cooing Chat Bot</h1>
    <div class="recorder-button-container">
      <el-button size="large" v-if="!isRecording" type="primary" @click="startRecording"><el-icon><Microphone /></el-icon></el-button>
      <el-button size="large" v-else type="primary" @click="stopRecording"><el-icon><Mute /></el-icon></el-button>
    </div>
  </div>

</template>

<style scoped>
.overall{
  position: relative;
  height: 100%;
}
.recorder-button-container{
  position: absolute;
  right: 50%;
  bottom: 20px;
}
</style>
