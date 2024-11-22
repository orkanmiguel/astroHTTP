<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else-if="likeCount === 0" @click="likePost">Like Counter</button>

  <button v-else @click="likePost">
    Likes <span>{{ likeCount }}</span>
  </button>
</template>

<script lang="ts" setup>
import { ref } from "vue";
interface Props {
  postID: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

const likePost = () => {
  console.log("1+ like");
};

const getCurrentLikes = async () => {
  const resp = await fetch(`/api/posts/likes/${props.postID}`);
  if (!resp.ok) return;

  const data = await resp.json();
  console.log("data", data.likes);
  likeCount.value = data.likes;
  isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: "white";
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3;
}

button:hover {
  background-color: #4a3f9a;
}
</style>
