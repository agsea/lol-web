// 视频播放组件

<template>
    <div class="video-con">
        <!-- 视频封面 -->
        <slot></slot>
        <!-- 播放按钮 -->
        <div class="video-btn" @click="play">
            <div>▶</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'videoPlay',
        props: {
            source: String  //视频地址
        },
        methods: {
            play: function() {
                // 在新标签页中播放
                window.open(this.source);
            }
        }
    }
</script>

<style lang="scss">
    .video-con{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.65);
        img{
            width: 100%;
            height: 100%;
        }
        .video-btn{
            position: absolute;
            width: 50px;
            height: 50px;
            left: calc(50% - 25px);
            top: calc(50% - 25px);
            border: 2px solid #c3a756;
            border-radius: 50%;
            div{
                width: 100%;
                height: 100%;
                padding-left: 14px;
                color: #b39653;
                font-size: 30px;
                background-color: #202429;
                border: 2px solid #030e23;
                cursor: pointer;
                border-radius: 50%;
                line-height: 38px;
            }
            &:hover{
                border: 2px solid #e1c558;
                div{
                    color: #e1c558;
                    background-color: #202429;
                    border: 2px solid #030e23;
                }
            }
        }
    }
</style>
