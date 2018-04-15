import Vue from 'vue';
import VueRouter from 'vue-router';

import AppMain from '../components/app-main.vue';
import AppRight from '../components/app-right.vue';
import Home from '../components/home/home.vue';
import HomeSubHome from '../components/home-sub/home.vue';
import ComingSoon from '../components/util/coming-soon.vue';

Vue.use(VueRouter);

// 定义路由（包含嵌套路由）
// 通过命名视图为多个视图指定多个组件
let routes = [
    {
        path: '/',
        redirect: '/home',
        components: {
            default: AppMain,
            appMain: AppMain,
            appRight: AppRight
        },
        children: [
            {
                path: '/play',
                component: ComingSoon
            },
            {
                path: '/home',
                redirect: '/home/homeSubHome',   //默认显示主页之首页
                component: Home,
                children: [
                    // 主导航-首页
                    {
                        path: '/home/homeSubHome',
                        name: 'homeSubHome',
                        component: HomeSubHome
                    },
                    // 主导航-周年纪念日
                    {
                        path: '/home/anniversary',
                        name: 'anniversary',
                        component: ComingSoon
                    },
                    // 主导航-版本热点
                    {
                        path: '/home/hots',
                        name: 'hots',
                        component: ComingSoon
                    },
                    // 主导航-视频中心
                    {
                        path: '/home/video',
                        name: 'video',
                        component: ComingSoon
                    },
                    // 主导航-好运魄罗
                    {
                        path: '/home/luckyPoro',
                        name: 'luckyPoro',
                        component: ComingSoon
                    }
                ]
            },
            {
                path: '/career',
                component: ComingSoon
            },
            {
                path: '/collection',
                component: ComingSoon
            },
            {
                path: '/spoil',
                component: ComingSoon
            },
            {
                path: '/shopping',
                component: ComingSoon
            }
        ]
    }
];

export default new VueRouter({
    routes: routes
})
