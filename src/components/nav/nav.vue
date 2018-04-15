// 主导航

<template>
    <nav>
        <div class="cursor" :style="{left: playBtnPos.left + 'px'}">
            <div class="cursor-top" :style="{opacity: isPlayBtn ? 0 : 1}"></div>
            <div class="cursor-bottom"></div>
        </div>
        <ul class="row menus menus-left">
            <!-- LOGO及开始游戏按钮 -->
            <li :class="{active: isPlayBtn}" id="menu--1">
                <div class="btn-play">
                    <div class="logo"></div>
                    <router-link :to="{path: '/play'}">
                        <div class="text" @click="setCurMenu(-1)">PLAY
                        </div>
                    </router-link>
                </div>
            </li>
            <!-- 导航菜单 -->
            <li v-for="(menu, index) in menus" :id="'menu-' + menu.id" :class="{active: menu.isCur}">
                <router-link :to="{path: menu.link}">
                    <span @click="setCurMenu(menu.id)">{{ menu.name }}</span>
                </router-link>
            </li>
        </ul>
        <ul class="row menus menus-right">
            <li v-for="(menu, index) in menus2" :id="'menu-' + menu.id" :class="{active: menu.isCur}">
                <router-link :to="{path: menu.link}">
                    <span @click="setCurMenu(menu.id)">{{ menu.name }}</span>
                </router-link>
            </li>
        </ul>
        <ul class="account">
            <li class="ticket" v-tooltip="{text: '点券', position: 'center bottom'}">0</li>
            <li class="coin" v-tooltip="{text: '金币', position: 'center bottom'}">27290</li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'navbar',
        data: function () {
            return {
                isPlayBtn: false,
                playBtnPos: {
                    left: 217,
                    top: 0
                },
                curMenuIndex: 0,
                menus: [
                    {id: 1, isCur: true, name: '主页', link: '/home'},
                    {id: 2, isCur: false, name: '生涯', link: '/career'},
                    {id: 3, isCur: false, name: '藏品', link: '/collection'}
                ],
                menus2: [
                    {id: 4, isCur: false, name: '战利品', link: '/spoil'},
                    {id: 5, isCur: false, name: '商城', link: '/shopping'}
                ]
            }
        },
        computed: {},
        methods: {
            setCurMenu: function(menuId) {
                let menuEle = document.querySelector('#menu-' + menuId);
                let parentNode = menuEle.parentNode.parentNode;
                if (parentNode.classList.contains('active')) {
                    return;
                }

                // 记录当前主导航id
                sessionStorage.setItem('curMenuId', menuId);

                // 单击元素在屏幕上的位置
                var eleRect = menuEle.getBoundingClientRect();
                this.playBtnPos.left = eleRect.left - (70 - eleRect.width) / 2;

                if (menuId === -1) {
                    this.isPlayBtn = true;
                    // 将原数组映射为新的数组，从而刷新所有导航菜单的状态
                    this.menus.map(function(val, i, arr) {
                        val.isCur = false;
                    });
                    this.menus2.map(function(val, i, arr) {
                        val.isCur = false;
                    });
                } else {
                    this.isPlayBtn = false;
                    this.menus.map(function(val, i, arr) {
                        let flag = (val.id === menuId);
                        val.isCur = flag;
                    });
                    this.menus2.map(function(val, i, arr) {
                        let flag = (val.id === menuId);
                        val.isCur = flag;
                    });
                }
            }
        },
        mounted: function() {
            if (sessionStorage.getItem('curMenuId')) {
                this.setCurMenu(sessionStorage.getItem('curMenuId'));
            }
        }
    }
</script>

<style src="./nav.css"></style>
