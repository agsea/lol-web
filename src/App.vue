//应用主体

<template>
    <!-- 有且仅能有唯一根元素，此元素会替换应用所挂载的元素 -->
    <div class="app-container">
        <!-- 顶部线条 -->
        <div class="top-line"></div>
        <div class="app-content">
            <!-- app主体 -->
            <router-view name="appMain"></router-view>
            <!-- 系统设置及好友系统 -->
            <router-view name="appRight"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    /*全局样式*/
    * {
        margin: 0px;
        padding: 0px;
        border: 0px;
        box-sizing: border-box;
        user-select: none;
    }
    html {
        height: 100%;
    }
    body {
        height: 100%;
        font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
        overflow: hidden;
    }
    ul {
        list-style: none;
    }
    div{
        /*box-sizing: border-box;*/
    }

    /*横排列表*/
    ul.row {
        /*position: absolute;此样式会导致火狐及IE中顶部栏渲染异常*/
        display: flex;
        flex-direction: row;
        padding-left: 0px;
    }
    ul.row li {
        display: inline-flex;
        align-items: center;
    }

    .hidden {
        display: none;
    }
    .full-size {
        width: 100%;
        height: 100%;
    }
    .full-width {
        width: 100%;
    }
    .full-height {
        height: 100%;
    }
    .layout-col{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
<style scoped lang="scss">
    .app-container {
        height: 100%;
        background-color: #020202;

        .top-line{
            width: 100%;
            height: 2px;
            background-color: #7b5d28;
        }
        .app-content{
            display: flex;
            flex-direction: row;
            height: calc(100% - 2px);
            /*主体背景*/
            .app-main.back-aoen {
                background: url("assets/images/Ornn.gif") no-repeat;
                background-size: cover;
            }
            .app-main.back-yjcs {
                background: url("assets/images/玉剑传说.jpg") no-repeat;
                background-size: cover;
            }
        }
    }
</style>
