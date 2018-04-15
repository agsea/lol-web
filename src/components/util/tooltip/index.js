// 鼠标悬浮提示框插件
// 直接导入css文件无法解析为模块，此处提示框箭头背景图片采用base64编码数据
// 若要自定义箭头图标请先将图标转为base64数据，且该图标不宜过大
// 用法：以指令的形式使用，确保使用之前（可直接在入口文件中引入）该插件（v-tooltip="{text: '点券', position: 'center bottom'}"）

/**
 * 创建提示框
 * @param text
 */
function createTipElement(id, text) {
    let container = document.createElement('div');
    let iconEle = document.createElement('span');
    let tipEle = document.createElement('div');

    container.appendChild(iconEle);
    container.appendChild(tipEle);
    container.id = id;
    container.style.position = 'absolute';
    container.style.left = '0px';
    container.style.top = '0px';
    container.style.zIndex = 100;
    container.style.transition = 'opacity 0.5s ease';
    container.style.opacity = 0;

    iconEle.style.position = 'absolute';
    iconEle.style.padding = '5px 8px';
    iconEle.style.background = 'url("data:image/gif;base64,R0lGODlhEQAKANUAAAAAAP///wEJEgEKEwEJEQEKEgkPFAgPFCAfFiEgFyQiGCIgFyUiGCYjGS8pGCQhGDQsGDMrGDEqGScjGU09GzkwHDEpGDMrGllEG0o6GjwyHTowHDYtGl1HHVxGHWRMIGFKH2NLIGBJH2tRI2hPImpQI2dOIlE/HTkuG3RXJnJVJXFUJW9TJG5SJP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC4ALAAAAAARAAoAAAZrQJdw6NJoiEjkJpXaJJMV1WqlqjyHKFarMWmxUFfOqMQQCBilEScJIZkegkJBoDCRIMTIJ7QQEC4XBAILIR8RQhYgIgl+EicnEoIJIiAWLh0eCAMDDhQGBhQOmwgeHSIYqKgZB2YHGamoHUEAOw==") no-repeat';
    iconEle.style.backgroundPosition = '0px 0px';
    iconEle.style.left = '32%';
    iconEle.style.top = '2px';

    tipEle.innerHTML = text;
    tipEle.style.padding = '6px 8px';
    tipEle.style.color = '#a09b8c';
    tipEle.style.backgroundColor = '#010a13';
    tipEle.style.fontSize = '13px';
    tipEle.style.border = '2px solid #5f491e';

    document.querySelector('body').appendChild(container);
    return container;
}

/**
 * 设置提示框位置
 * @param tarClientRect
 * @param tipClientRect
 * @param posStr
 * left center、right center、center top、center bottom
 */
function setTipPosition(tooltipId, tarClientRect, tipClientRect, posStr) {
    if (!posStr) posStr = 'center bottom';

    const PADDING = 5;
    let conLeft, conTop, iconLeft, iconTop, rotDeg;
    let container = document.querySelector('#' + tooltipId);
    let iconEle = container.childNodes[0];
    if (posStr === 'left center') {
        rotDeg = 90;
        iconLeft = tipClientRect.width - 5;
        iconTop = tipClientRect.height / 2 - 6;
        conLeft = tarClientRect.left - tipClientRect.width - 5 - PADDING;
        conTop = tarClientRect.top + (tarClientRect.height - tipClientRect.height) / 2;
    } else if (posStr === 'right center') {
        rotDeg = -90;
        iconLeft = -10;
        iconTop = tipClientRect.height / 2 - 6;
        conLeft = tarClientRect.left + tarClientRect.width + 7 + PADDING;
        conTop = tarClientRect.top + (tarClientRect.height - tipClientRect.height) / 2;
    } else if (posStr === 'center top') {
        rotDeg = 180;
        iconLeft = tipClientRect.width / 2 - 8;
        iconTop = tipClientRect.height - 2;
        conLeft = tarClientRect.left + (tarClientRect.width - tipClientRect.width) / 2;
        conTop = tarClientRect.top - tipClientRect.height - 5 - PADDING;
    } else if (posStr === 'center bottom') {
        rotDeg = 0;
        iconLeft = tipClientRect.width / 2 - 8;
        iconTop = -8;
        conLeft = tarClientRect.left + (tarClientRect.width - tipClientRect.width) / 2;
        conTop = tarClientRect.top + tarClientRect.height + 5 + PADDING;
    }

    iconEle.style.transform = 'rotate(' + rotDeg + 'deg)';
    iconEle.style.left = iconLeft + 'px';
    iconEle.style.top = iconTop + 'px';
    container.style.left = conLeft + 'px';
    container.style.top = conTop + 'px';
}

/**
 * 显示提示框
 */
function showTip(tooltipId) {
    let container = document.querySelector('#' + tooltipId);
    container.style.opacity = 1;
    container.style.display = 'block';
    return container.getBoundingClientRect();
}

/**
 * 隐藏提示框
 */
function hideTip(tooltipId, callback) {
    let container = document.querySelector('#' + tooltipId);
    if (container) {
        container.style.opacity = 0;
        setTimeout(function() {
            // 用户频繁移动鼠标到同一位置时会出现 removeTip 已执行，但该处代码还未执行到的情况
            // 此时元素已被从其父节点移除，再去移除该节点会报‘该节点不属于其父节点’的错误，
            // 因此移除前应判断其父节点是否为 null
            if (container.parentNode) {
                container.style.display = 'none';
                document.querySelector('body').removeChild(container);
                callback();
            }
        }, 500);
    }
}

/**
 * 移除提示框
 */
function removeTip(tooltipId) {
    let container = document.querySelector('#' + tooltipId);
    document.querySelector('body').removeChild(container);
}

/**
 * 必需的安装函数
 * @param Vue
 * @param options
 * @param options.pEl - 提示框元素的父元素，值需为标准的selector字符串
 */
function install(Vue, options) {
    if (install.installed) return;
    install.installed = true;

    // 注册全局指令
    // binding.value 接收参数：text、position、其他可选参数（如自定义设置等）
    Vue.directive('tooltip', {
        inserted: function(ele, binding, vnode) {
            ele.addEventListener('mouseover', function () {
                if (this.tooltipId) {
                    removeTip(this.tooltipId);
                }
                this.tooltipId = 'tooltip' + new Date().getTime();

                let msg;
                if (typeof binding.value !== 'object') {
                    msg = binding.value;
                } else {
                    msg = binding.value.text ? binding.value.text : ' ';
                }

                createTipElement(this.tooltipId, msg);
                let tipClientRect = showTip(this.tooltipId);
                setTipPosition(this.tooltipId, ele.getBoundingClientRect(), tipClientRect, binding.value.position);
            });
            ele.addEventListener('mouseout', function () {
                let self = this;

                hideTip(self.tooltipId, function() {
                    self.tooltipId = undefined;
                });
            });
        }
    });
}

const plugin = {
    install
}

// 导出插件
export default plugin;
