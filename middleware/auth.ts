export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("token");
    if (!token.value && to.path !== "/" && to.path !== "/register") {
        return navigateTo("/");
    }
});
