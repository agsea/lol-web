// 轮播组件

<template>
    <div class="loop-container" :style="getLoopConStyle"
         @mouseover="mHoverHandler" @mouseout="mLeaveHandler">
        <!-- 幻灯片内容 -->
        <div class="loop-content" :style="getLoopConStyle">
            <div :class="{'loop-wrapper': true, 'layout-fade': opt.playType === 'fade',
                'layout-slide': opt.playType === 'slide'}" :style="getLoopWrapStyle">
                <slot></slot>
            </div>
        </div>
        <!-- 标题组 -->
        <div class="loop-titles" :style="getTitlesStyle" v-if="hasValidTitles">
            <div class="title-wrapper">
                <ul>
                    <li v-for="(item, index) in titles" :style="getIndicatorItemStyle"
                        :class="{active: index === curIndex}"
                        @mouseover="titleHoverHandler(index)">
                        <div class="title-content">
                            {{ item }}
                        </div>
                        <div class="title-indicator" v-if="opt.showIndicPerTitle">
                            <div class="title-i-l"></div>
                            <div :class="{'title-i-m1': opt.titleIndicTheme === 0, 'title-i-m2': opt.titleIndicTheme === 1}"></div>
                            <div class="title-i-r"></div>
                        </div>
                    </li>
                </ul>
                <div class="title-link-more" :style="getMoreLinkStyle"
                    @click="gotoMorePage"
                >...</div>
                <div class="title-indicator" :style="getTitleIndicatorStyle">
                    <div class="title-i-l"></div>
                    <div :class="{'title-i-m1': opt.titleIndicTheme === 0, 'title-i-m2': opt.titleIndicTheme === 1}"></div>
                    <div class="title-i-r"></div>
                </div>
            </div>
        </div>
        <!-- 指示器 -->
        <div class="loop-indicator" :style="getIndicatorStyle" v-if="opt.showIndicator">
            <ul>
                <li v-for="item in cardIndexs" @click="switchCard(item)"
                    :class="{active: item === curIndex}"
                    @mouseover="indicHoverHandler(item)">
                    <div></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import merge from 'merge';

    const titlesConHeight = 40;
    const titleMoreLinkWidth = titlesConHeight - 5;
    const titleIndicatorHeight = 3;
    const DEFAULT_OPT = {
        cornerStyle: 'normal',  //卡片边角样式：无圆角(normal)、圆角(round)
        animateTime: 0.8,       //卡片切换动画时间
        autoplay: true,         //是否自动播放
        playInterval: 3,        //播放间隔：单位-s
        playType: 'slide',      //播放类型：fade(淡入淡出)、slide(滑动)
        showIndicator: true,    //是否显示当前卡片指示器（不是标题指示器）
        showTitles: false,       //是否显示标题组
        titlesPosition: 'bottom',   //标题组位置：底部（bottom）、top（顶部）
        titleGap: 0,    //标题间隙
        cardGap: 0,     //卡片间隙
        showMoreLink: false, //是否在标题组显示‘更多内容’链接
        showIndicPerTitle: false,    //为每一标题添加静态指示器（类似下划线）
        titleIndicTheme: 0      //卡片标题指示器样式
    };

    export default {
        name: 'loop',
        props: {
            width: Number,
            height: Number,
            titles: Array,
            options: Object,
            moreLink: {
                type: String,
                default: ''
            }
        },
        data: function() {
            return {
                cardWidth: 0,    //如果不传入宽高则采用父容器宽高
                cardHeight: 0,
                opt: DEFAULT_OPT,

                curIndex: 0,    //当前卡片序号
                cardCount: 0,   //卡片数量
                cardIndexs: []  //卡片序号集合

                // TODO
                // card组件的样式定义可以留存在其本身了
                // agscroll组件的默认配置项写法参考loop插件
            }
        },
        mounted: function() {
            // 合并配置项
            this.opt = merge(true, DEFAULT_OPT, this.options);
            if (!this.width || !this.height) {
                let parentEle = this.$el.parentNode;
                this.cardWidth = parentEle.scrollWidth;
                this.cardHeight = (this.titles && this.opt.showTitles) ? parentEle.scrollHeight - titlesConHeight : parentEle.scrollHeight;
            } else {
                this.cardWidth = this.width;
                this.cardHeight = (this.titles && this.opt.showTitles) ? this.height - titlesConHeight : this.height;
            }

            //设置轮播卡片样式
            let cardEles = this.$el.querySelectorAll('.loop-card');
            this._cardEles = cardEles;
            this.cardCount = cardEles.length;
            for (let i = 0; i < this.cardCount; i++) {
                this.cardIndexs.push(i);
                cardEles[i].style.width = `${this.cardWidth}px`;
            }
            if (this.opt.playType === 'fade') {
                for (let i = 0; i < this.cardCount; i++) {
                    cardEles[i].style.opacity = i === 0 ? 1 : 0;
                    cardEles[i].style.zIndex = i === 0 ? 2 : 1;
                }
            }

            //是否自动播放
            if (this.opt.autoplay) {
                this._timer = setInterval(() => {
                    this.switchCard();
                }, this.opt.playInterval * 1000);
            }
        },
        computed: {
            getLoopConStyle: function() {
                let styleObj = {
                    width: `${this.cardWidth}px`
                };
                if ((this.titles && this.opt.showTitles)) {
                    styleObj.height = `${this.cardHeight + titlesConHeight}px`
                } else {
                    styleObj.height = `${this.cardHeight}px`
                }

                return styleObj;
            },
            getLoopWrapStyle: function() {
                let styleObj = {
                    width: `${this.cardCount * this.cardWidth}px`,
                    height: (this.titles && this.opt.showTitles) ? `calc(100% - ${titlesConHeight}px)` : `calc(100%)`,
                    transition: `left ${this.opt.animateTime}s ease, top ${this.opt.animateTime}s ease`,
                    left: this.opt.playType === 'slide' ? `${-this.curIndex * this.cardWidth}px` : `0px`
                };
                if (this.opt.titlesPosition === 'bottom') {
                    styleObj.top = `0px`;
                } else {
                    styleObj.bottom = `0px`;
                }

                return styleObj;
            },
            getTitlesStyle: function() {
                let styleObj = {};
                if (this.opt.titlesPosition === 'bottom') {
                    styleObj.bottom = `0px`;
                } else {
                    styleObj.top = `0px`;
                }

                return styleObj;
            },
            getIndicatorStyle: function() {
                let styleObj = {};
                if ((this.titles && this.opt.showTitles) && this.opt.titlesPosition === 'bottom') {
                    styleObj.bottom = `${titlesConHeight + 10}px`;
                } else {
                    styleObj.bottom = `10px`;
                }

                return styleObj;
            },
            getIndicatorItemStyle: function() {
                let styleObj = {};
                let widthTmp = (this.cardCount - 1) * this.opt.titleGap;
                styleObj.width = `calc((100% - ${widthTmp}px) / ${this.cardCount})`;
                styleObj.marginRight = `${this.opt.titleGap}px`;
                if (this.opt.titleIndicTheme === 0) {
                    styleObj.borderBottom = `${titleIndicatorHeight - 1}px solid #052931`;
                }

                return styleObj;
            },
            getMoreLinkStyle: function() {
                let styleObj = {};
                if (this.opt.titleIndicTheme === 1) {
                    styleObj.borderBottom = `${titleIndicatorHeight - 1}px solid #483b32`;
                }
                styleObj.display = this.opt.showMoreLink ? 'block' : 'none';
                styleObj.marginLeft = this.opt.showMoreLink ? `${this.opt.titleGap}px` : '0px';
                return styleObj;
            },
            getTitleIndicatorStyle: function() {
                let widthTmp;
                if (this.opt.showMoreLink) {
                    widthTmp = (this.cardWidth - this.cardCount * this.opt.titleGap - titleMoreLinkWidth) / this.cardCount;
                } else {
                    widthTmp = (this.cardWidth - (this.cardCount - 1) * this.opt.titleGap) / this.cardCount;
                }

                return {
                    width: `${widthTmp}px`,
                    left: `${this.curIndex * (widthTmp + this.opt.titleGap)}px`
                }
            },
            hasValidTitles: function() {
                let flag = this.titles && this.titles.length && this.opt.showTitles;
                flag = (flag === undefined) ? false : flag;
                return flag;
            }
        },
        methods: {
            switchCard: function(index) {
                if (!this.cardCount) return;
                let beforeIndex = this.curIndex;

                // 普通效果
                if (Number.isInteger(index)) {
                    this.curIndex = index;
                } else {
                    if (this.curIndex + 1 > this.cardCount - 1) {
                        this.curIndex = 0;
                    } else {
                        this.curIndex += 1;
                    }
                }

                // 淡入淡出效果
                if (this.opt.playType === 'fade') {
                    this._cardEles[beforeIndex].style.opacity = 0;
                    this._cardEles[beforeIndex].style.zIndex = 1;
                    this._cardEles[this.curIndex].style.opacity = 1;
                    this._cardEles[this.curIndex].style.zIndex = 2;
                }
            },
            mHoverHandler: function() {
                if (this._timer) {
                    clearInterval(this._timer);
                    this._timer = null;
                }
            },
            mLeaveHandler: function() {
                if (this.opt.autoplay && !this._timer) {
                    this._timer = setInterval(() => {
                        this.switchCard();
                    }, this.opt.playInterval * 1000);
                }
            },
            titleHoverHandler: function(index) {
                this.switchCard(index);
            },
            indicHoverHandler: function(index) {
                this.switchCard(index);
            },
            gotoMorePage: function() {
                window.open(this.opt.moreLink);
            }
        }
    }
</script>

<style lang="scss">
    $titlesConHeight: 40px;
    $titleMoreLinkWidth: $titlesConHeight - 5px;
    $titleWidth: 100px;
    $titleIndicatorHeight: 3px;

    .loop-container{
        position: relative;
        background-color: rgba(14, 22, 34, 0.9);

        ul{
            list-style: none;
            padding-left: 0px;
            li{
                float: left;
            }
        }
        .loop-content{
            position: relative;
            overflow: hidden;
            .loop-wrapper{
                position: absolute;
                left: 0px;
                .loop-card{
                    float: left;
                    height: 100%;
                    transition: opacity .8s ease;
                }
                &.layout-fade{
                    .loop-card{
                        position: absolute;
                    }
                }
                &.layout-slide{
                    .loop-card{
                        float: left;
                    }
                }
            }
        }

        .loop-indicator{
            position: absolute;
            right: 10px;
            z-index: 3;
            ul{
                li{
                    float: left;
                    width: 14px;
                    height: 14px;
                    margin-right: 10px;
                    border: 3px solid #5a4519;
                    box-shadow: 0px 0px 5px #333;
                    cursor: pointer;
                    transform: rotateZ(45deg);
                    border-radius: 1px;
                    &:last-of-type{
                        margin-right: 0px !important;
                    }
                    div{
                        width: 100%;
                        height: 100%;
                        border: 1px solid black;
                        background-color: #1e2328;
                        border-radius: 1px;
                    }
                    &.active{
                        border: 3px solid #a27b2d;
                        div{
                            background-color: #ccbd90;
                        }
                    }
                }
            }
        }

        .loop-titles{
            position: absolute;
            width: 100%;
            height: $titlesConHeight;
            left: 0px;

            .title-indicator{
                display: flex;
                position: absolute;
                height: 12px;
                bottom: 0px;
                left: 0px;
                .title-i-l, .title-i-r{
                    flex: 1;
                    height: #{$titleIndicatorHeight - 1};
                    margin-top: #{12px - $titleIndicatorHeight + 1};
                    background-color: #af8b52;
                }
                .title-i-m1{
                    width: 12px;
                    height: 100%;
                    background-color: #af8b52;
                    clip-path: polygon(50% 6px, 100% calc(100% - #{$titleIndicatorHeight - 1}),
                        100% 100%, 50% #{$titleIndicatorHeight + 5px},
                        0 100%, 0 calc(100% - #{$titleIndicatorHeight - 1}));
                }
                .title-i-m2{
                    width: 5px;
                    height: 5px;
                    margin: 8px 2px 0px 2px;
                    transform: rotate(45deg);
                    background-color: #cca857;
                }
            }
            .title-wrapper{
                display: flex;
                position: relative;
                height: 100%;
                ul{
                    flex: 1;
                    height: 100%;
                    li{
                        position: relative;
                        width: $titleWidth;
                        height: 100%;
                        color: #3d7688;
                        background-color: #0f1227;
                        font-size: 13px;
                        transition: background-color .3s ease;
                        cursor: pointer;
                        &:last-of-type{
                            margin-right: 0px !important;
                        }
                        &.active{
                            color: #beb189;
                            background-color: #122034;
                        }
                        .title-content{
                            width: 100%;
                            height: 100%;
                            line-height: $titlesConHeight;
                            text-align: center;
                            overflow: hidden;
                        }
                        .title-indicator{
                            position: absolute;
                            width: 100%;
                            left: 0px;
                            bottom: 0px;
                            .title-i-l, .title-i-r{
                                background-color: #483b32;
                            }
                            .title-i-m1, .title-i-m2{
                                background-color: #483b32;
                            }
                        }
                    }
                }
                .title-link-more{
                    width: $titleMoreLinkWidth;
                    height: $titlesConHeight;
                    color: #325d6d;
                    background-color: #0f1227;
                    font-size: 26px;
                    text-align: center;
                    line-height: $titlesConHeight - 16;
                    transition: color .4s ease;
                    cursor: pointer;
                    &:hover{
                        color: #cdbe91;
                    }
                }
            }
        }
    }
</style>
