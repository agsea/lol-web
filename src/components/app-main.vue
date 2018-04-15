// 应用主体

<template>
    <div class="app-main back-aoen">
        <navbar></navbar>
        <div class="app-main-content">
            <aegeanscroll ref="mainScroll" v-bind:options="{offsetX: -12}">
                <router-view></router-view>
            </aegeanscroll>
        </div>
    </div>
</template>

<script>
    import navbar from './nav/nav.vue';
    import aegeanscroll from './util/agscroll.vue';

    export default {
        name: 'appMain',
        components: {navbar, aegeanscroll},
        mounted: function() {
            let self = this;
            setInterval(function() {
                self.$refs.mainScroll.update();
            }, 1000);
        }
    }
</script>

<style scoped lang="scss">
    .app-main {
        flex: 1;
        height: 100%;
        color: #00a1ff;

        .app-main-content {
            height: calc(100% - 80px);
            padding: 0px 40px;
        }
    }
</style>
