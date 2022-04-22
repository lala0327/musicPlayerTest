import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'MusicPlayer',
        component: () => import("./components/Pages/MusicPlayer.vue")
    }, ]
const router = createRouter({
    history: createWebHistory(''),
    routes,
})
export default router;