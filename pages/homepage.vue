<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import homepageImage from '@/assets/images/test_alonehope.webp';

const router = useRouter();
const username = ref(localStorage.getItem("username") || "Guest");
const showLogoutConfirm = ref(false);

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/");
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <!-- Navbar -->
        <nav class="bg-white shadow-md px-6 py-2 flex flex-wrap justify-between items-center">
            <h1 class="text-2xl font-bold">Hello World!</h1>

            <!-- Navigation Links -->
            <ul class="flex flex-wrap gap-10 text-gray-700">
                <li class="hover:text-blue-500 cursor-pointer transition">สายพันธุ์ของเมล็ดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">ประเทศที่ปลูกกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">Process ของเมล็ดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">วิธีการสกัดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">Taste Note</li>
            </ul>

            <!-- Username & Logout -->
            <div class="flex items-center space-x-6">
                <span class="text-gray-700">{{ username }}</span>
                <button @click="showLogoutConfirm = true"
                    class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                    Logout
                </button>
            </div>
        </nav>

        <!-- Full Width Banner -->
        <div class="w-full">
            <img :src="homepageImage" alt="Coffee Banner" class="w-full h-[550px] object-cover">
        </div>

        <!-- Main Content -->
        <div class="flex flex-col items-center justify-center text-center p-6 mt-10">
            <h2 class="text-3xl font-semibold">กว่าจะมาเป็นกาแฟที่เราดื่ม กาแฟนั้นผ่านอะไรมาบ้าง...</h2>
            <p class="text-gray-700 max-w-2xl mt-4">
                ทุกครั้งที่เราจิบกาแฟ เราอาจไม่ได้ฉุกคิดถึงเบื้องหลังที่ทำให้กาแฟมีรสชาติและกลิ่นหอมที่น่าหลงไหล...
                กาแฟแต่ละแก้วไม่ได้เป็นเพียงเครื่องดื่ม แต่คือผลลัพธ์ของกระบวนการที่ซับซ้อน
                ตั้งแต่การเพาะปลูกเมล็ดกาแฟไปจนถึงขั้นตอนการคั่วและชง
            </p>
        </div>

        <!-- Logout Confirm Modal -->
        <div v-if="showLogoutConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 class="text-lg font-bold mb-4">Confirm Logout</h2>
                <p class="text-gray-600 mb-6">Are you sure you want to logout?</p>
                <div class="flex justify-center space-x-4">
                    <button @click="logout"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        Logout
                    </button>
                    <button @click="showLogoutConfirm = false"
                        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
