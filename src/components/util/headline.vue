// 内容提要组件

<template>
    <div class="hl">
        <div class="hl-arrow" v-if="!isCaption" :style="getArrowStyle" @mouseover="floatArrow(5)">
            <div class="hl-arr-top"></div>
            <div class="hl-arr-bottom"></div>
        </div>
        <a target="_blank" :href="link" :style="getLinkStyle"
           @mouseover="floatArrow(5)" @mouseout="floatArrow(0)">
            <slot></slot>
        </a>
        <div class="hl-date" v-if="!isCaption">{{ formatDate }}</div>
    </div>
</template>

<script>
    export default {
        name: 'headLine',
        props: {
            link: String,
            date: {
                type: Date,
                default: function() {
                    return new Date();
                }
            },
            isCaption: {  //是否是标题
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                paddingLeft: 0
            }
        },
        computed: {
            getArrowStyle: function() {
                return {
                    paddingLeft: `${this.paddingLeft}px`
                }
            },
            getLinkStyle: function() {
                return {
                    color: this.isCaption ? '#cdbe91' : '#9f9b8e',
                    fontWeight: this.isCaption ? 'bold' : 'normal',
                    fontSize: this.isCaption ? '15px' : '13px',
                    textAlign: this.isCaption ? 'center' : 'left'
                }
            },
            formatDate: function() {
                // 格式化日期(MM/dd)
                let m = this.date.getMonth() + 1;
                let d = this.date.getDate();
                m = m < 10 ? `0${m}` : m;
                d = d < 10 ? `0${d}` : d;

                return `${m}/${d}`;
            }
        },
        methods: {
            floatArrow: function(offset) {
                this.paddingLeft = offset;
            }
        }
    }
</script>

<style lang="scss">
    $hlHeight: 36px;

    .hl{
        display: flex;
        align-items: center;
        width: 100%;
        height: $hlHeight;
        .hl-arrow{
            width: 14px;
            transition: padding-left .3s ease;
            &>div{
                width: 8px;
                height: 5px;
            }
            .hl-arr-top{
                background-color: #354c58;
                clip-path: polygon(0 0, 100% 100%, 0 100%);
            }
            .hl-arr-bottom{
                background-color: #213038;
                clip-path: polygon(0 0, 100% 0, 0 100%);
            }
        }
        a{
            flex: 1;
            color: #9f9b8e;
            font-size: 13px;
            text-decoration: none;
            &:hover{
                text-decoration: underline;
            }
        }
        .hl-date{
            color: #485158;
            font-size: 15px;
        }
    }
</style>
