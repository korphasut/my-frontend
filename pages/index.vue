<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const login = async () => {
    if (isLoading.value) return;
    errorMessage.value = "";
    isLoading.value = true;

    try {
        const response = await fetch("https://fastapi-backend-d5cy.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (data && data.access_token) {
            localStorage.setItem("token", data.access_token);
            router.push("/homepage");
        } else {
            errorMessage.value = "Invalid username or password";
        }
    } catch (error) {
        errorMessage.value = "Login failed. Please try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm sm:max-w-md"
            data-testid="login-container">
            <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6" data-testid="login-title">
                Login
            </h2>

            <!-- Error Message -->
            <p v-if="errorMessage" class="text-red-500 text-sm text-center mb-4" data-testid="login-error">
                {{ errorMessage }}
            </p>

            <!-- Username -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-1" for="username">Username</label>
                <input v-model="username" id="username" type="text"
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400" data-testid="login-username">
            </div>

            <!-- Password -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-1" for="password">Password</label>
                <input v-model="password" id="password" type="password"
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400" data-testid="login-password">
            </div>

            <!-- Login Button -->
            <button @click="login" :disabled="isLoading"
                class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition text-lg sm:text-base flex justify-center items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                data-testid="login-button">

                <svg v-if="isLoading" class="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"></svg>
                <span v-if="!isLoading">Login</span>
                <span v-else>Loading...</span>
            </button>

            <!-- Register Link -->
            <div class="text-center mt-4">
                <NuxtLink to="/register" class="text-blue-500 hover:underline" data-testid="register-link">
                    Register
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
