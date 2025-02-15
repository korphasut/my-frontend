<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");

  if (!token && router.currentRoute.value.path !== "/") {
    router.push("/");
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <NuxtPage />
  </div>
</template>


