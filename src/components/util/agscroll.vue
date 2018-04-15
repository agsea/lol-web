// 滚动条插件 (agscroll v1.0 2017/10/20)
//
// 使用说明：为了便于样式设置，建议为滚动条组件包裹一层【固定宽高的块级元素】（一般用div）,将滚动内容作为该组件标签的内容；
// 程序会自动检测滚动内容宽高以决定是否显示垂直或水平滚动条；该组件接受包含如下配置项的对象作为参数以实现自定义设置。
// offsetX: 0（滚动条距滚动内容的偏移距离，为负值时垂直滚动条将向滚动内容的右侧偏移，水平滚动条向底部偏移，为正值则相反）
// offsetY: 0（滚动条距滚动内容的偏移距离，为负值时垂直滚动条将向滚动内容的右侧偏移，水平滚动条向底部偏移，为正值则相反）
// railColor: 'transparent'（滚动条轨道颜色，默认透明，可以传入任何合法css颜色字符串）
// barColor: '#785a28'（滚动条颜色，可以传入任何合法css颜色字符串）
// barHoverColor: '#c8aa6e'（鼠标悬浮时滚动条的颜色，可以传入任何合法css颜色字符串）
// barClickColor: '#c8aa6e'（鼠标悬浮单击时滚动条颜色，可以传入任何合法css颜色字符串）
// width：6（垂直滚动条宽度或水平滚动条高度）
// display: auto-自动隐藏滚动条，true-一直显示，false-隐藏
// 注：滚动内容发生变化时应当手动调用update方法更新滚动条

<template>
    <div class="ag-scroll" :class="{'show-bar': show}" @mousewheel.stop="wheelHandler" @DOMMouseScroll.stop="wheelHandler"
         @mouseover="parentHoverHandler" @mouseout="parentLeaveHandler">
        <div class="ag-scroll-rail rail-v" :style="getVRailStyle">
            <div :class="{'ag-scroll-bar bar-v': true, smooth: ifSmooth}" :style="getVBarStyle"
                v-on="{mouseover: hoverVHandler, mouseout: leaveHandler,
                mousedown: clickVBarHandler}"></div>
        </div>
        <div class="ag-scroll-rail rail-h" :style="getHRailStyle">
            <div :class="{'ag-scroll-bar bar-h': true, smooth: ifSmooth}" :style="getHBarStyle"
                 v-on="{mouseover: hoverHHandler, mouseout: leaveHandler,
                 mousedown: clickHBarHandler}"></div>
        </div>
        <div class="ag-scroll-wrapper">
            <div :class="{'ag-scroll-content': true, smooth: ifSmooth}"
                 :style="getContentStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import merge from 'merge';

    const SCROLL_STEP = 40;
    const DEFAULT_OPT = {
        offsetX: 0,
        offsetY: 0,
        railColor: 'transparent',
        barColor: '#785a28',
        barHoverColor: '#c8aa6e',
        barClickColor: '#c8aa6e',
        width: 6,       //垂直滚动条宽度或水平滚动条高度
        display: 'auto'   //auto-自动隐藏，true-一直显示，false-隐藏
    };

    export default {
        name: 'agscroll',
        props: {
            options: Object
        },
        data: function() {
          return {
              containerWidth: 0,
              containerHeight: 0,
              contentWidth: 0,
              contentHeight: 0,
              minMTop: 0,
              contentMTop: 0,
              contentMLeft: 0,
              railStyleV: {
                  width: 6,
                  height: 0,
                  right: 0,
                  top: 0,
                  padding: 5,    //滚动条与容器间距
                  color: 'white',
                  show: true
              },
              railStyleH: {
                  width: 0,
                  height: 6,
                  left: 0,
                  bottom: 0,
                  padding: 5,    //滚动条与容器间距
                  color: 'white',
                  show: true
              },
              barStyleV: {
                  height: 0,
                  marginTop: 0,
                  maxMTop: 0,
                  color: 'grey'
              },
              barStyleH: {
                  width: 0,
                  marginLeft: 0,
                  maxMLeft: 0,
                  color: 'grey'
              },
              hit: {
                  vBar: false,
                  hBar: false,
                  mouseX: 0,
                  mouseY: 0,
                  originCMTop: 0,
                  originCMLeft: 0,
                  originBMTop: 0,
                  originBMLeft: 0
              },
              ifSmooth: true,
              barColor: '',
              barHoverColor: '',
              scrollable: false,    //是否可滚动
              show: false,
              display: false        //auto-自动隐藏，true-一直显示，false-隐藏
          }
        },
        computed: {
            getContentStyle: function() {
                return {
                    marginTop: this.contentMTop + 'px',
                    marginLeft: this.contentMLeft + 'px'
                }
            },
            getVRailStyle: function() {
                return {
                    width: this.railStyleV.width + 'px',
                    height: this.railStyleV.height + 'px',
                    right: this.railStyleV.right + 'px',
                    top: this.railStyleV.top + 'px',
                    backgroundColor: this.railStyleV.color,
                    borderRadius: this.railStyleV.width / 2,
                    visibility: this.railStyleV.show ? 'visible' : 'hidden'
                }
            },
            getHRailStyle: function() {
                return {
                    width: this.railStyleH.width + 'px',
                    height: this.railStyleH.height + 'px',
                    left: this.railStyleH.left + 'px',
                    bottom: this.railStyleH.bottom + 'px',
                    backgroundColor: this.railStyleH.color,
                    borderRadius: this.railStyleH.height / 2,
                    visibility: this.railStyleH.show ? 'visible' : 'hidden'
                }
            },
            getVBarStyle: function() {
                return {
                    height: this.barStyleV.height + 'px',
                    marginTop: this.barStyleV.marginTop + 'px',
                    backgroundColor: this.barStyleV.color
                }
            },
            getHBarStyle: function() {
                return {
                    width: this.barStyleH.width + 'px',
                    marginLeft: this.barStyleH.marginLeft + 'px',
                    backgroundColor: this.barStyleH.color
                }
            }
        },
        mounted: function() {
            let opt = merge(true, DEFAULT_OPT, this.options);
            this.barColor = opt.barColor;
            this.barHoverColor = opt.barHoverColor;
            this.barClickColor = opt.barHoverColor;

            let ele = this.$el;
            let contentEle = ele.querySelector('.ag-scroll-content');
            let conRect = ele.getBoundingClientRect();
            this.containerWidth = conRect.width;
            this.containerHeight = conRect.height;
            this.contentWidth = contentEle.scrollWidth;
            this.contentHeight = contentEle.scrollHeight;
            this.railStyleV.width = opt.width;
            this.railStyleV.color = opt.railColor;
            this.barStyleV.color = opt.barColor;
            this.railStyleH.height = opt.width;
            this.railStyleH.color = opt.railColor;
            this.barStyleH.color = opt.barColor;
            this.show = opt.display === 'auto' ? false : opt.display;
            this.display = opt.display;


            // 垂直滚动条
            if (this.containerHeight < this.contentHeight) {
                this.scrollable = true;

                this.minMTop = this.containerHeight - this.contentHeight;

                this.railStyleV.height = conRect.height - this.railStyleV.padding;
                this.railStyleV.right += opt.offsetX;
                this.railStyleV.top = this.railStyleV.padding / 3;
                // 根据内容高与容器高的比例计算滚动条滚动部分高度
                let scaleV = this.containerHeight / this.contentHeight;
                this.barStyleV.height = scaleV * this.railStyleV.height;
                this.barStyleV.maxMTop = this.railStyleV.height - this.barStyleV.height;
                this.barStyleV.show = true;
            }

            // 水平滚动条
            if (this.containerWidth < this.contentWidth) {
                this.minMLeft = this.containerWidth - this.contentWidth;

                this.railStyleH.width = conRect.width - this.railStyleH.padding;
                this.railStyleH.left = this.railStyleH.padding / 3;
                this.railStyleH.bottom += opt.offsetY;
                let scaleH = this.containerWidth / this.contentWidth;
                this.barStyleH.width = scaleH * this.railStyleH.width;
                this.barStyleH.maxMLeft = this.railStyleH.width - this.barStyleH.width;
                this.barStyleH.show = true;
            }

            // 添加全局事件监听
            window.addEventListener('mouseup', this.cancelClkHandler, false);
            window.addEventListener('mousemove', this.moveHandler, false);
            window.addEventListener('resize', this.update, false);
        },
        methods: {
            wheelHandler: function(evt) {
                if (!this.scrollable) {
                    return;
                }

                let contentMTop;
                // 获取鼠标滚动值
                let delta = (evt.wheelDelta && (evt.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                    (evt.detail && (evt.detail > 0 ? -1 : 1));
                if (delta < 0) {
                    contentMTop = this.contentMTop - SCROLL_STEP;
                } else {
                    contentMTop = this.contentMTop + SCROLL_STEP;
                }

                // 滚动
                let self = this;
                self.scroll(contentMTop, this.contentMLeft, function(newContentMTop) {
                    let scrollScale = newContentMTop / self.containerHeight;
                    let barMTop = -scrollScale * self.barStyleV.height;
                    self.barStyleV.marginTop = barMTop;
                });
            },
            moveHandler: function(evt) {
                if (this.hit.vBar) {
                    // 计算鼠标偏移
                    let mouseOft = evt.pageY - this.hit.mouseY;
                    let barMTop = this.hit.originBMTop + mouseOft;
                    if (barMTop < 0) {
                        barMTop = 0;
                    } else {
                        barMTop = (barMTop > this.barStyleV.maxMTop) ? this.barStyleV.maxMTop : barMTop;
                    }
                    this.barStyleV.marginTop = barMTop;
                    let scrollScale = this.barStyleV.marginTop / this.barStyleV.height;
                    let contentMTop = -scrollScale * this.containerHeight;
                    this.scroll(contentMTop, this.contentMLeft);
                }
                if (this.hit.hBar) {
                    // 计算鼠标偏移
                    let mouseOft = evt.pageX - this.hit.mouseX;
                    let barMLeft = this.hit.originBMLeft + mouseOft;
                    if (barMLeft < 0) {
                        barMLeft = 0;
                    } else {
                        barMLeft = (barMLeft > this.barStyleH.maxMLeft) ? this.barStyleH.maxMLeft : barMLeft;
                    }
                    this.barStyleH.marginLeft = barMLeft;
                    let scrollScale = this.barStyleH.marginLeft / this.barStyleH.width;
                    let contentMLeft = -scrollScale * this.containerWidth;
                    this.scroll(this.contentMTop, contentMLeft);
                }
            },
            hoverVHandler: function() {
                this.barStyleV.color = this.barHoverColor;
            },
            hoverHHandler: function() {
                this.barStyleH.color = this.barHoverColor;
            },
            leaveHandler: function() {
                if (!this.hit.vBar) {
                    this.barStyleV.color = this.barColor;
                }
                if (!this.hit.hBar) {
                    this.barStyleH.color = this.barColor;
                }
            },
            clickVBarHandler: function(evt) {
                if (evt.which === 1) {
                    this._oldDisplay = this.display;
                    this.display = true;
                    this.barStyleV.color = this.barClickColor;
                    this.ifSmooth = false;
                    this.hit.vBar = true;
                    this.hit.mouseY = evt.pageY;
                    this.hit.originCMTop = this.contentMTop;
                    this.hit.originBMTop = this.barStyleV.marginTop;
                }
            },
            clickHBarHandler: function(evt) {
                if (evt.which === 1) {
                    this._oldDisplay = this.display;
                    this.display = true;
                    this.barStyleH.color = this.barClickColor;
                    this.ifSmooth = false;
                    this.hit.hBar = true;
                    this.hit.mouseX = evt.pageX;
                    this.hit.originCMLeft = this.contentMLeft;
                    this.hit.originBMLeft = this.barStyleH.marginLeft;
                }
            },
            cancelClkHandler: function(evt) {
                if (this._oldDisplay) {
                    this.display = this._oldDisplay;
                }
                if (this._oldDisplay === 'auto' && !this._active) {
                    this.show = false;
                }

                this.hit.vBar = false;
                this.hit.hBar = false;
                this.ifSmooth = true;
                this.barStyleV.color = this.barColor;
                this.barStyleH.color = this.barColor;
            },
            parentHoverHandler: function(evt) {
                this._active = true;
                if (this.display) {
                    this.show = true;
                }
            },
            parentLeaveHandler: function(evt) {
                this._active = false;
                if (this.display === 'auto' || this.display === false) {
                    this.show = false;
                }
            },
            scroll: function(contentMTop, contentMLeft, callback) {
                if (contentMTop < 0) {
                    contentMTop = contentMTop < this.minMTop ? this.minMTop : contentMTop;
                } else {
                    contentMTop = contentMTop > 0 ? 0 : contentMTop;
                }
                if (contentMLeft < 0) {
                    contentMLeft = contentMLeft < this.minMLeft ? this.minMLeft : contentMLeft;
                } else {
                    contentMLeft = contentMLeft > 0 ? 0 : contentMLeft;
                }

                this.contentMTop = contentMTop;
                this.contentMLeft = contentMLeft;
                if (callback && callback instanceof Function) {
                    callback(contentMTop);
                }
            },
            update: function() {
                //延迟执行以保证内容已发生变化
                var self = this;
                setTimeout(function() {
                    let ele = self.$el;
                    let contentEle = ele.querySelector('.ag-scroll-content');
                    let conRect = ele.getBoundingClientRect();
                    self.containerWidth = conRect.width;
                    self.containerHeight = conRect.height;
                    self.contentWidth = contentEle.scrollWidth;
                    self.contentHeight = contentEle.scrollHeight;

                    // 垂直滚动条
                    if (self.containerHeight < self.contentHeight) {
                        self.scrollable = true;

                        self.minMTop = self.containerHeight - self.contentHeight;

                        self.railStyleV.height = conRect.height - self.railStyleV.padding;
                        // 根据内容高与容器高的比例计算滚动条滚动部分高度
                        let scaleV = self.containerHeight / self.contentHeight;
                        self.barStyleV.height = scaleV * self.railStyleV.height;
                        self.barStyleV.maxMTop = self.railStyleV.height - self.barStyleV.height;
                    } else {
                        self.scroll(0, 0, function(newContentMTop) {
                            let scrollScale = newContentMTop / self.containerHeight;
                            let barMTop = -scrollScale * self.barStyleV.height;
                            self.barStyleV.marginTop = barMTop;
                        });
                        self.scrollable = false;
                        self.barStyleV.height = 0;
                    }

                    // 水平滚动条
                    if (self.containerWidth < self.contentWidth) {
                        self.minMLeft = self.containerWidth - self.contentWidth;

                        self.railStyleH.width = conRect.width - self.railStyleH.padding;
                        let scaleH = self.containerWidth / self.contentWidth;
                        self.barStyleH.width = scaleH * self.railStyleH.width;
                        self.barStyleH.maxMLeft = self.railStyleH.width - self.barStyleH.width;
                    } else {
                        self.barStyleH.width = 0;
                    }
                }, 200);
            }
        }
    }
</script>

<style scoped lang="scss">
    .ag-scroll{
        position: relative;
        height: 100%;
        &.show-bar{
            .ag-scroll-rail{
                opacity: 1;
                .ag-scroll-bar{
                    cursor: pointer;
                }
            }
        }
        .ag-scroll-rail{
            position: absolute;
            background-color: rgba(255, 255, 255, 0.47);
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.6s ease;
            z-index: 10;
            &.rail-v{
                width: 6px;
                height: 500px;
            }
            &.rail-h{
                width: 500px;
                height: 6px;
            }
            .ag-scroll-bar{
                background-color: rgba(113, 113, 113, 0.62);
                border-radius: 3px;
                &:hover{
                    background-color: #717171;
                }
                &.smooth{
                    transition: all 0.3s ease;
                }
                &.bar-v{
                    width: 100%;
                    height: 0px;
                }
                &.bar-h{
                    width: 100px;
                    height: 100%;
                }
            }
        }
        .ag-scroll-wrapper{
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 5;
            .ag-scroll-content{
                &.smooth{
                    transition: margin-left,margin-top 0.4s ease;
                }
            }
        }
    }
</style>
