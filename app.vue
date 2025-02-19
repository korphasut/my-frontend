<script setup lang="ts">
import { useRouter } from "vue-router";
import { useCookie } from "#app";
import { onMounted } from "vue";

const router = useRouter();
const token = useCookie("token");

onMounted(() => {
  if (!token.value && router.currentRoute.value.path !== "/") {
    router.push("/");
  }
});
</script>


<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <NuxtPage />
  </div>
</template>


