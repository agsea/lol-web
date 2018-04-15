//侧边栏

<template>
    <aside>
        <!-- 粒子特效背景 -->
        <div class="triangles" id="trianglesCon"></div>
        <div class="particles" id="particlesCon"></div>
        <!-- 个人信息、设置及消息通知 -->
        <div class="side-content">
            <div class="side-top">
                <!--That blue eyes exist in the aegean sea !-->
            </div>
            <div class="side-main"></div>
        </div>
    </aside>
</template>

<script>
    import Trianglify from 'trianglify';

    // eslint-disable-next-line
    require('script-loader!particles.js');  // 把指定js文件在全局作用域下执行一遍


    export default {
        name: 'sidebar',
        mounted: function() {
            var trianglesConEle = document.getElementById('trianglesCon');
            var trianglePattern = Trianglify({
                width: trianglesConEle.offsetWidth,
                height: trianglesConEle.offsetHeight,
                cell_size: 80,
                x_colors: ['#28739a', '#313173', '#0c131e'],
                y_colors: ['#28739a', '#313173', '#0c131e']
            });
            trianglesConEle.appendChild(trianglePattern.canvas());


            particlesJS.load('particlesCon', './static/particles.json', function() {
                //console.log('callback - particles-js config loaded');
            });
        }
    }
</script>

<style lang="scss">
    aside{
        position: relative;
        height: 100%;
        color: #08ff00;
        background-color: #010a13;

        .triangles{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .particles{
            position: absolute;
            width: 100%;
            height: 100%;
        }
        .side-content{
            position: absolute;
            width: 100%;
            height: 100%;
            .side-top{
                height: 80px;
                border-bottom: 1px solid #45423d;
                letter-spacing: 1px;
            }
            .side-main{
                height: calc(100% - 80px);
            }
        }
    }
</style>
