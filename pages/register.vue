<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const gender = ref("");
const email = ref("");
const mobile = ref("");
const errorMessage = ref("");
const successMessage = ref("");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[0-9]{10,15}$/;

const isFormValid = computed(() => {
    return (
        username.value.trim() !== "" &&
        password.value.trim() !== "" &&
        gender.value.trim() !== "" &&
        email.value.trim() !== "" &&
        mobile.value.trim() !== "" &&
        emailRegex.test(email.value) &&
        mobileRegex.test(mobile.value)
    );
});

const register = async () => {
    if (!isFormValid.value) {
        errorMessage.value = "Please fill in all fields correctly.";
        return;
    }

    errorMessage.value = "";

    try {
        const response = await fetch("https://fastapi-backend-d5cy.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                gender: gender.value,
                email: email.value,
                mobile: mobile.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            successMessage.value = "Registration successful! Redirecting to login...";
            setTimeout(() => router.push("/"), 2000);
        } else {
            errorMessage.value = data.detail || "Registration failed";
        }
    } catch (error) {
        errorMessage.value = "Error registering user. Please try again.";
    }
};
</script>

<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
        <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md" data-testid="register-container">
            <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-700 mb-6" data-testid="register-title">
                Register
            </h2>

            <!-- Success Message -->
            <p v-if="successMessage" class="text-green-500 text-sm text-center mb-4" data-testid="register-success">
                {{ successMessage }}
            </p>

            <!-- Error Message -->
            <p v-if="errorMessage" class="text-red-500 text-sm text-center mb-4" data-testid="register-error">
                {{ errorMessage }}
            </p>

            <!-- Username -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-1" for="username">Username</label>
                <input v-model="username" id="username" type="text"
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                    data-testid="register-username">
            </div>

            <!-- Password -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-1" for="password">Password</label>
                <input v-model="password" id="password" type="password"
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
                    data-testid="register-password">
            </div>

            <!-- Gender (Button Group) -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-2">Gender</label>
                <div class="flex gap-2">
                    <button @click="gender = 'male'"
                        :class="gender === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                        class="flex-1 py-3 text-center rounded-lg transition-colors duration-200"
                        data-testid="register-gender-male">
                        Male
                    </button>
                    <button @click="gender = 'female'"
                        :class="gender === 'female' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                        class="flex-1 py-3 text-center rounded-lg transition-colors duration-200"
                        data-testid="register-gender-female">
                        Female
                    </button>
                    <button @click="gender = 'other'"
                        :class="gender === 'other' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                        class="flex-1 py-3 text-center rounded-lg transition-colors duration-200"
                        data-testid="register-gender-other">
                        Other
                    </button>
                </div>
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-1" for="email">Email</label>
                <input v-model="email" id="email" type="email"
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400" data-testid="register-email">
                <p v-if="email && !emailRegex.test(email)" class="text-red-500 text-xs mt-1">
                    Invalid email format (e.g. test@example.com)
                </p>
            </div>

            <!-- Mobile -->
            <div class="mb-4">
                <label class="block text-gray-600 mb-1" for="mobile">Mobile</label>
                <input v-model="mobile" id="mobile" type="text"
                    class="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400" data-testid="register-mobile">
                <p v-if="mobile && !mobileRegex.test(mobile)" class="text-red-500 text-xs mt-1">
                    Mobile must be 10-15 digits
                </p>
            </div>

            <!-- Register Button -->
            <button @click="register" :disabled="!isFormValid"
                class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition text-lg sm:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
                data-testid="register-button">
                Register
            </button>

            <div class="text-center mt-4">
                <NuxtLink to="/" class="text-blue-500 hover:underline" data-testid="login-link">
                    Back to Login
                </NuxtLink>
            </div>
        </div>
    </div>
</template>
