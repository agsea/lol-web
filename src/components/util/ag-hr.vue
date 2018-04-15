// 水平分割线组件

<template>
    <div class="ag-hr" :style="getHrStyle"></div>
</template>

<script>
    export default {
        name: 'headLine',
        props: {
            backColor: {
                type: String,
                default: '#19252b'
            }
        },
        computed: {
            getHrStyle: function() {
                return {
                    backgroundColor: this.backColor
                }
            }
        },
        data: function () {
            return {
                paddingLeft: 0
            }
        }
    }
</script>

<style lang="scss">
    .ag-hr{
        width: 100%;
        height: 1px;
    }
</style>
