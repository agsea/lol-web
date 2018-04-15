// 应用右边栏

<template>
    <sidebar class="side-right"></sidebar>
</template>

<script>
    import sidebar from './sidebar/sidebar.vue';

    export default {
        name: 'appRight',
        components: {sidebar}
    }
</script>

<style lang="scss">
    .side-right {
        width: 260px;
    }
</style>
