<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import homepageImage from '@/assets/images/test_alonehope.webp';

const router = useRouter();
const username = ref("Guest");
const showLogoutConfirm = ref(false);
const isMenuOpen = ref(false);

onMounted(() => {
  if (process.client) {
    username.value = localStorage.getItem("username") || "Guest";
  }
});

const logout = () => {
  if (process.client) {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
  router.push("/");
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <!-- Navbar -->
        <nav class="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <!-- Logo / Title (ชิดซ้าย) -->
            <h1 class="text-2xl font-bold">Hello!</h1>

            <!-- Navigation Links (อยู่ตรงกลาง) -->
            <ul class="hidden sm:flex flex-grow justify-center space-x-8 text-gray-700">
                <li class="hover:text-blue-500 cursor-pointer transition">สายพันธุ์ของเมล็ดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">ประเทศที่ปลูกกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">Process ของเมล็ดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">วิธีการสกัดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">Taste Note</li>
            </ul>

            <!-- Username & Logout -->
            <div class="flex items-center space-x-4 ml-auto">
                <span class="text-gray-700 font-semibold">{{ username }}</span>
                <button @click="showLogoutConfirm = true"
                    class="bg-blue-200 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition">
                    Logout
                </button>
            </div>

            <!-- Hamburger Menu (Mobile) -->
            <button @click="isMenuOpen = !isMenuOpen" class="sm:hidden text-gray-700 text-2xl ml-4">
                ☰
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="sm:hidden bg-white shadow-md px-6 py-4">
            <ul class="flex flex-col space-y-2 text-gray-700">
                <li class="hover:text-blue-500 cursor-pointer transition">สายพันธุ์ของเมล็ดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">ประเทศที่ปลูกกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">Process ของเมล็ดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">วิธีการสกัดกาแฟ</li>
                <li class="hover:text-blue-500 cursor-pointer transition">Taste Note</li>
            </ul>
        </div>

        <!-- Full Width Banner -->
        <div class="w-full relative">
            <img :src="homepageImage" alt="Coffee Banner" class="w-full h-[550px] object-cover">
            <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-gray-100"></div>
        </div>

        <!-- Main Content -->
        <div class="flex flex-col items-center justify-center text-center p-8 mt-10">
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
                        class="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">
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

