// 应用主页

<template>
    <div style="min-width: 1026px;padding-bottom: 15px" id="test">
        <homeSubNav></homeSubNav>
        <div class="content-wrapper">
            <!--配置路由-->
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import homeSubNav from '../home-sub/nav.vue';

    export default {
        components: {homeSubNav},
        data: function () {
            return {}
        }
    }
</script>

<style scoped lang="scss">
    $content-top: 30px;
    $content-bottom: 15px;
    $minus-height: 35px + $content-top;

    .content-wrapper {
        /*display: flex;*/
        height: calc(100% - #{$minus-height});
        margin-top: $content-top;
        /*margin-bottom: $content-marign-bottom;*/

        //此处设置底部外边距，获取父容器的scrollHeight时仍不会被计算进去，计算规则如下
        /* 对于标准盒模型来说，
        div显示的高度的是它的content高度(height)，
        offsetHeight = height + paddingTop + paddingBottom + borderTop + borderBottom.
        scrollHeight = height + paddingTop + paddingBottom - scrollbarHeight. （有滚动条）
        scrollHeight = height + paddingTop + paddingBottom.（无滚动条）*/
    }

</style>
