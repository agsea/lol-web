// 首页导航栏

<template>
    <div class="nav-home">
        <ul class="row">
            <li v-for="menu in menus" :id="'homeSubMenu-' + menu.id"
                :class="{active: menu.isCur}">
                <router-link :to="{name: menu.link, params: {a: 666}}">
                    <span @click="setCurMenu(menu.id)">{{ menu.name }}</span>
                </router-link>

                <!-- 指示器 -->
                <div :class="{'nav-home-indic': true, 'show': menu.isCur}"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'homeSubNav',
        data: function() {
            return {
                menus: [
                    {id: 1, name: '首页', link: 'homeSubHome', isCur: true},
                    {id: 2, name: '周年盛典', link: 'anniversary', isCur: false},
                    {id: 3, name: '版本热点', link: 'hots', isCur: false},
                    {id: 4, name: '视频中心', link: 'video', isCur: false},
                    {id: 5, name: '好运魄罗', link: 'luckyPoro', isCur: false}
                ]
            }
        },
        methods: {
            setCurMenu: function(menuId) {
                let menuEle = document.querySelector('#homeSubMenu-' + menuId);
                if (menuEle.parentNode.classList.contains('active')) {
                    return;
                }

                this.menus.map(function(val, i, arr) {
                    let flag = (val.id === menuId);
                    val.isCur = flag;
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    $normal-color: #beb086;
    $active-color: #ebe1cd;
    $hover-color: ($normal-color + $active-color) / 2;

    .nav-home ul {
        font-size: 13px;

        li {
            position: relative;
            height: 35px;
            margin-right: 30px;

            a {
                color: $normal-color;
                text-decoration: none;
                cursor: pointer;
            }
            &:hover {
                a {
                    color: $hover-color;
                }
            }
            &.active {
                a {
                    color: $active-color;
                }
            }

            .nav-home-indic{
                display: none;
                position: absolute;
                width: 100%;
                height: 1px;
                bottom: 0px;
                left: 0px;
                background: radial-gradient(farthest-side, #ebe1cd, rgba(235, 225, 205, 0));
                &.show{
                    display: block;
                }
            }
        }
    }
</style>
