// 首页-二级导航-首页

<template>
    <div class="full-height layout-col" style="">
        <!-- 新英雄广告语 -->
        <div class="new-hero-banner">
            <p class="title">山隐之焰 奥恩</p>
            <p class="lyric">铁锤敲 万物生 号角啊 众生灭<span>进入商城</span></p>
        </div>
        <!-- 按钮组 -->
        <div class="btn-group">
            <div class="home-btn default">
                <div><i class="rj"></i>人机模式</div>
            </div>
            <div class="home-btn default">
                <div><i class="pp"></i>匹配模式</div>
            </div>
            <div class="home-btn default">
                <div><i  class="pw"></i>排位模式</div>
            </div>
            <div class="home-btn default">
                <div><i  class="jddld"></i>极地大乱斗</div>
            </div>
            <div class="home-btn red">
                <div>武器大师竞技场</div>
            </div>
        </div>
        <!-- 内容组 -->
        <div class="content-group1">
            <div class="content-l">
                <loop :titles="loopTitles1" :options="loopOptions1">
                    <loopCard>
                        <a target="_blank" href="http://lol.qq.com/act/a20171011champion/page.html?e_code=363964&atm_cl=ad&atm_pos=17539&idata_id=165847&contentId=267881">
                            <img class="img-loop" src="../../assets/images/loop1.jpg">
                        </a>
                    </loopCard>
                    <loopCard>
                        <a target="_blank" href="http://lol.qq.com/act/a20171025s7endpc/index.html?e_code=366042&atm_cl=ad&atm_pos=16602&idata_id=168610">
                            <img class="img-loop" src="../../assets/images/loop2.jpg">
                        </a>
                    </loopCard>
                    <loopCard>
                        <a target="_blank" href="http://lol.qq.com/act/a20171025s7endpc/index.html?e_code=366042&atm_cl=ad&atm_pos=16602&idata_id=168610">
                            <img class="img-loop" src="../../assets/images/loop3.jpg">
                        </a>
                    </loopCard>
                    <loopCard>
                        <a target="_blank" href="http://lpl.qq.com/es/guess/?e_code=366002&atm_cl=ad&atm_pos=16604&idata_id=166514">
                            <img class="img-loop" src="../../assets/images/loop4.jpg">
                        </a>
                    </loopCard>
                    <loopCard>
                        <a target="_blank" href="http://lol.qq.com/act/a20170830festival/index.html?ADTAG=media.free.client.banner&e_code=365962&atm_cl=ad&atm_pos=16605&idata_id=168570">
                            <img class="img-loop" src="../../assets/images/loop5.jpg">
                        </a>
                    </loopCard>
                </loop>
            </div>
            <div class="content-m">
                <div class="content-m-t">
                    <loop :titles="loopTitles2" :options="loopOptions2">
                        <loopCard>
                            <div class="hl-wrapper">
                                <div v-for="item in cardContDataZh">
                                    <headLine :isCaption="item.isCaption"
                                              :link="item.link" :date="item.date">
                                        {{ item.text }}
                                    </headLine>
                                    <agHr></agHr>
                                </div>
                            </div>
                        </loopCard>
                        <loopCard>
                            <div class="hl-wrapper">
                                <div v-for="item in cardContDataGg">
                                    <headLine :isCaption="item.isCaption"
                                              :link="item.link" :date="item.date">
                                        {{ item.text }}
                                    </headLine>
                                    <agHr></agHr>
                                </div>
                            </div>
                        </loopCard>
                        <loopCard>
                            <div class="hl-wrapper">
                                <div v-for="item in cardContDataSs">
                                    <headLine :isCaption="item.isCaption"
                                              :link="item.link" :date="item.date">
                                        {{ item.text }}
                                    </headLine>
                                    <agHr></agHr>
                                </div>
                            </div>
                        </loopCard>
                        <loopCard>
                            <div class="hl-wrapper">
                                <div v-for="item in cardContDataLt">
                                    <headLine :isCaption="item.isCaption"
                                              :link="item.link" :date="item.date">
                                        {{ item.text }}
                                    </headLine>
                                    <agHr></agHr>
                                </div>
                            </div>
                        </loopCard>
                    </loop>
                </div>
                <div class="content-m-b">
                    <a href="http://www.surveygizmo.com/s3/3687360/1b42744cdc67" target="_blank">
                        英雄联盟用户调查问卷
                    </a>
                    <span>[调查]</span>
                </div>
            </div>
            <div class="content-r">
                <div class="card-btn big active">
                    <div class="card-btn-text card-btn-hero ">
                        周免英雄
                    </div>
                </div>
                <div class="card-btn big">
                    <div class="card-btn-text card-btn-hot">
                        版本热点
                    </div>
                </div>
                <div class="card-btn big">
                    <div class="card-btn-text card-btn-previlege">
                        网吧特权
                    </div>
                </div>
            </div>
        </div>
        <div class="content-group2">
            <div class="content-l">
                <div class="content-l-card">
                    <div class="cl-card-img">
                        <a target="_blank" href="http://lol.replays.net/news/page/20171028/187424.html">
                            <img src="../../assets/images/banner-feng.jpg">
                        </a>
                    </div>
                    <div class="cl-card-title">
                        <p>风哥辞去教练一职</p>
                        <p>RNG遗憾梦止四强</p>
                    </div>
                </div>
                <div class="content-l-card">
                    <div class="cl-card-img">
                        <a target="_blank" href="http://lol.replays.net/news/page/20171028/187424.html">
                            <img src="../../assets/images/banner-xia.jpg">
                        </a>
                    </div>
                    <div class="cl-card-title">
                        <p>新套路AD登顶韩服</p>
                        <p>揭秘比走A怪更强玩法</p>
                    </div>
                </div>
                <div class="content-l-right">
                    <div class="cl-right-title">
                        媒体推荐
                    </div>
                    <div class="hl-wrapper">
                        <div v-for="item in cardContDataMttj">
                            <headLine :isCaption="item.isCaption"
                                      :link="item.link" :date="item.date">
                                {{ item.text }}
                            </headLine>
                            <agHr></agHr>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-m">
                <loop :options="{playType: 'fade', showTitles: false}">
                    <loopCard>
                        <videoPlay source="http://lol.qq.com/v/detail.shtml?id=75536&e_code=lolweb.videobpromo.r1&ADTAG=lolweb.v2">
                            <img src="../../assets/images/video-pic1.png">
                        </videoPlay>
                    </loopCard>
                    <loopCard>
                        <videoPlay source="http://www.51lol.com/Video/fx1_2535">
                            <img src="../../assets/images/video-pic2.jpg">
                        </videoPlay>
                    </loopCard>
                    <loopCard>
                        <videoPlay source="http://lol.tuwan.com/369250/?ad=1">
                            <img src="../../assets/images/video-pic3.jpg">
                        </videoPlay>
                    </loopCard>
                    <loopCard>
                        <videoPlay source="http://lol.qq.com/v/detail.shtml?id=75524&e_code=lolweb.videobpromo.r4&ADTAG=lolweb.v2">
                            <img src="../../assets/images/video-pic4.jpg">
                        </videoPlay>
                    </loopCard>
                    <loopCard>
                        <videoPlay source="http://lol.tuwan.com/369253/?ad=1">
                            <img src="../../assets/images/video-pic5.jpg">
                        </videoPlay>
                    </loopCard>
                </loop>
            </div>
            <div class="content-r">
                <div class="card-btn big">
                    <div class="card-btn-text card-btn-video">
                        视频中心
                    </div>
                </div>
                <div class="card-btn">
                    <div class="card-btn-small">
                        <div></div>
                    </div>
                    <div class="card-btn-small">
                        <div></div>
                    </div>
                    <div class="card-btn-small">
                        <div></div>
                    </div>
                    <div class="card-btn-small">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loop from '../util/loop/loop.vue';
    import loopCard from '../util/loop/card.vue';
    import videoPlay from '../util/video-play.vue';
    import headLine from '../util/headline.vue';
    import agHr from '../util/ag-hr.vue';

    export default {
        name: 'homeSubHome',
        components: {loop, loopCard, videoPlay, headLine, agHr},
        data: function() {
            return {
                loopTitles1: [
                    '英雄，传奇之路',
                    '赛季末冲刺挑战赛',
                    '2017排位奖励',
                    '玩竞猜赢总决赛门票',
                    '音乐节门票今日开售'
                ],
                loopOptions1: {
                    playType: 'slide',
                    showIndicator: false,
                    showTitles: true
                },
                loopTitles2: ['综合', '公告', '赛事', '论坛'],
                loopOptions2: {
                    playType: 'slide',
                    autoplay: false,
                    showIndicator: false,
                    showTitles: true,
                    titlesPosition: 'top',
                    showMoreLink: true,
                    titleGap: 2,
                    titleIndicTheme: 1,
                    showIndicPerTitle: true,
                    moreLink: 'https://lol.qq.com/webplat/info/news_version3/152/4579/m5583/list_1.shtml'
                },
                cardContDataZh: [
                    {
                        isCaption: true,
                        text: '在你的商店，翻开专属皮肤及优惠',
                        link: 'http://lol.qq.com/act/yourshop20171020/index.html'
                    },
                    {
                        text: '英雄联盟2017赛季即将结束',
                        link: 'http://lol.qq.com/act/a20171025season/',
                        date: new Date(2017, 9, 26)
                    },
                    {
                        text: '10月29日WE站三星 谁能一路向北？',
                        link: 'http://lpl.qq.com/es/news_detail.shtml?nid=15697',
                        date: new Date(2017, 9, 28)
                    },
                    {
                        text: '英雄热门度的数学与艺术',
                        link: 'http://lol.qq.com/webplat/info/news_version3/152/4579/4580/m3106/201710/650461.shtml',
                        date: new Date(2017, 9, 28)
                    },
                    {
                        text: '助威总决赛，电视台观赛赢好礼',
                        link: 'http://lol.qq.com/act/a20171020spectators/',
                        date: new Date(2017, 9, 28)
                    }
                ],
                cardContDataGg: [
                    {
                        isCaption: true,
                        text: '荣誉系统上线公告',
                        link: 'https://lol.qq.com/webplat/info/news_version3/152/4579/4581/m3106/201710/645843.shtml'
                    },
                    {
                        text: '10月27日-29日部分电信大区服务器状态公告',
                        link: 'https://lol.qq.com/webplat/info/news_version3/152/4579/4581/m3106/201710/650691.shtml',
                        date: new Date(2017, 9, 29)
                    },
                    {
                        text: '助威总决赛，电视台观赛赢好礼',
                        link: 'http://lol.qq.com/act/a20171020spectators/',
                        date: new Date(2017, 9, 28)
                    },
                    {
                        text: '部分电信大区网络波动公告',
                        link: 'https://lol.qq.com/webplat/info/news_version3/152/4579/4581/m3106/201710/650369.shtml',
                        date: new Date(2017, 9, 27)
                    },
                    {
                        text: '10月27日免费英雄更换公告',
                        link: 'https://lol.qq.com/webplat/info/news_version3/152/4579/4581/m3106/201710/649249.shtml',
                        date: new Date(2017, 9, 25)
                    }
                ],
                cardContDataSs: [
                    {
                        isCaption: true,
                        text: '五星体育专访957 称和SSG五五开',
                        link: 'http://lpl.qq.com/es/news_detail.shtml?nid=15774'
                    },
                    {
                        text: '到北京的海报 愿WE为RNG带到',
                        link: 'http://lpl.qq.com/es/news_detail.shtml?nid=15775',
                        date: new Date(2017, 9, 29)
                    },
                    {
                        text: '《印迹 · Ambition》 在一无所有时绝地反击',
                        link: 'http://lpl.qq.com/es/video_detail.shtml?nid=15766',
                        date: new Date(2017, 9, 29)
                    },
                    {
                        text: '年轻全华 未来可期',
                        link: 'http://lpl.qq.com/es/news_detail.shtml?nid=15765',
                        date: new Date(2017, 9, 29)
                    },
                    {
                        text: 'RNG憾负SKT无缘鸟巢 虽败仍是传奇',
                        link: 'http://lpl.qq.com/es/news_detail.shtml?nid=15761',
                        date: new Date(2017, 9, 29)
                    }
                ],
                cardContDataLt: [
                    {
                        isCaption: true,
                        text: '《问拳头第四十六期》 万圣节呢？',
                        link: 'http://lol.qq.com/webplat/info/news_version3/152/26093/m16404/201710/649585.shtml'
                    },
                    {
                        text: '季前赛更新：新的符文系统你知多少？',
                        link: 'http://bbs.lol.qq.com/forum.php?mod=viewthread&tid=4305272',
                        date: new Date(2017, 9, 27)
                    },
                    {
                        text: '霸气瑞文甜美狸 琴女弹琴为EZ',
                        link: 'https://lol.qq.com/webplat/info/news_version3/152/4579/4583/m3106/201710/650053.shtml',
                        date: new Date(2017, 9, 27)
                    },
                    {
                        text: '迷你型源计划来袭，还有萌翻你心得娑娜',
                        link: 'http://bbs.lol.qq.com/forum.php?mod=viewthread&tid=4303259',
                        date: new Date(2017, 9, 27)
                    },
                    {
                        text: '当伊芙琳与阿狸同事嘲讽同一个目标',
                        link: 'http://bbs.lol.qq.com/forum.php?mod=viewthread&tid=4305196',
                        date: new Date(2017, 9, 27)
                    }
                ],
                cardContDataMttj: [
                    {
                        text: '100%胜率大师 峡谷之巅惊现天才AD',
                        link: 'http://lol.tuwan.com/369246/',
                        date: new Date(2017, 9, 28)
                    },
                    {
                        text: '红蓝对决登陆上海滩 我们一起拼到底！',
                        link: 'http://lol.replays.net/news/page/20171027/187418.html',
                        date: new Date(2017, 9, 28)
                    },
                    {
                        text: 'Mystic：希望决赛至少一个中国队',
                        link: 'http://www.wanplus.com/article/83825.html',
                        date: new Date(2017, 9, 28)
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    $minusHeight: 72px + 40px + 45px;
    $contMiddleWidth: 350px;
    $cardBtnWidth: 80px;
    $contGroup1Height: 280px;
    $contGroup2Height: 180px;
    $contMiddleTopHeight: 250px;
    $clCardTitleWidth: 120px;
    $clCardTitleHeight: 30px;

    .new-hero-banner{
        .title{
            color: white;
            font-size: 40px;
        }
        .lyric{
            color: #beb086;
            font-size: 14px;
            font-weight: bold;
            span{
                margin-left: 20px;
                font-weight: normal;
            }
        }
    }

    .btn-group{
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        margin-bottom: 10px;
        .home-btn{
            background-color: #15162e;
            cursor: pointer;
            &>div{
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 4px;
                padding-top: 6px;
                padding-bottom: 6px;
                padding-left: 35px;
                padding-right: 35px;
                color: #cdbe91;
                font-size: 15px;
                font-weight: bold;
                letter-spacing: 2px;
                transition: all .2s ease;
                &>i{
                    display: inline-block;
                    width: 26px;
                    height: 26px;
                    margin-right: 10px;
                }
                &>i.rj{
                    background: url("homebtn-icon-rj.gif") no-repeat 0px 2px;
                    background-size: 23px 26px;
                }
                &>i.pp{
                    background: url("homebtn-icon-pp.gif") no-repeat 0px 2px;
                    background-size: 24px 26px;
                }
                &>i.pw{
                    background: url("homebtn-icon-pw.gif") no-repeat 0px 2px;
                    background-size: 25px 26px;
                }
                &>i.jddld{
                    background: url("homebtn-icon-jddld.gif") no-repeat 0px 2px;
                    background-size: 26px;
                }
            }
            &.default>div{
                border: 2px solid #329299;
                background: url("homebtn-back1.gif") no-repeat 0px 0px;
                background-size: cover;
            }
            &.default:hover>div{
                border: 2px solid #34d1d8;
                box-shadow: 0px 0px 6px 1px #34d1d8;
                background: url("homebtn-back1-active.gif") no-repeat 0px 0px;
                background-size: cover;
            }
            &.red>div{
                padding-top: 9px;
                padding-bottom: 9px;
                padding-left: 49px;
                padding-right: 49px;
                border: 2px solid #ad6c2a;
                background: url("homebtn-back2.gif") no-repeat 0px 0px;
                background-size: cover;
            }
            &.red:hover>div{
                border: 2px solid #d68f2b;
                box-shadow: 0px 0px 6px #cc852c;
                background: url("homebtn-back2-active.gif") no-repeat 0px 0px;
                background-size: cover;
            }
        }
    }

    .content-group1{
        display: flex;
        height: $contGroup1Height;
        margin-bottom: 15px;
        overflow: hidden;
        &>div{
            height: 100%;
        }
        &>div.content-l{
            flex: 1;
        }
        &>div.content-m{
            width: $contMiddleWidth;
            margin: 0px 7px 0px 10px;
            .content-m-t{
                height: $contMiddleTopHeight;
            }
            .content-m-b{
                height: $contGroup1Height - $contMiddleTopHeight;
                padding: 0px 10px 0px 10px;
                background-color: rgba(14, 22, 34, 0.9);
                &>a{
                    padding: 10px 0px 10px 26px;
                    color: #41484c;
                    font-size: 13px;
                    background: url("icon-msg.png") no-repeat 0px 10px;
                    background-size: 18px;
                    transition: color .4s ease;
                    text-decoration: none;
                    cursor: pointer;
                    &:hover{
                        color: #536266;
                    }
                }
                &>span{
                    float: right;
                    color: #41484c;
                    font-size: 13px;
                }
            }
        }
        &>div.content-r{
            width: $cardBtnWidth;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }
    .content-group2{
        display: flex;
        height: $contGroup2Height;
        &>div{
            height: 100%;
        }
        &>div.content-l{
            display: flex;
            flex: 1;
            .content-l-card{
                display: inline-flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-right: 10px;
                text-align: center;
                background-color: #0d0e13;
                .cl-card-img{
                    height: $contGroup2Height - $clCardTitleHeight;
                    box-shadow: 0px 0px 10px 1px #0d0e13 inset;
                    img{
                        width: $clCardTitleWidth;
                        height: 100%;
                    }
                }
                .cl-card-title{
                    height: $clCardTitleHeight;
                    p:first-of-type{
                        color: #f0c277;
                        font-size: 14px;
                        font-weight: bold;
                        transform: translateY(-2px);
                    }
                    p:last-of-type{
                        color: #9f9888;
                        font-size: 12px;
                        font-weight: bold;
                        transform: translateY(-6px);
                    }
                }
            }
            .content-l-right{
                flex: 1;
                background-color: rgba(14, 22, 34, 0.9);
                .cl-right-title{
                    color: #c4b78c;
                    font-size: 15px;
                    padding: 12px 0px 12px 35px;
                    margin-bottom: 5px;
                    border-bottom: 1px solid #785a28;
                    background: url("icon-media.png") no-repeat 3px 10px;
                    background-size: 24px;
                }
            }
        }
        &>div.content-m{
            width: $contMiddleWidth;
            margin: 0px 7px 0px 10px;
        }
        &>div.content-r{
            width: $cardBtnWidth;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }

    /*轮播图片样式*/
    .img-loop{
        width: 100%;
        height: 100%;
    }

    /*内容条样式*/
    .hl-wrapper{
        width: 100%;
        padding: 10px;
    }

    /*卡片式按钮*/
    .card-btn{
        width: $cardBtnWidth;
        height: $cardBtnWidth;
        &.big{
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #0f1a28;
            &:hover{
                border: 1px solid #cca857;
            }
            &.active{
                border: 1px solid #cca857;
            }
        }
        .card-btn-text{
            width: $cardBtnWidth - 22px;
            height: $cardBtnWidth - 22px;
            padding-top: $cardBtnWidth - 45px;
            color: #866b38;
            font-size: 13px;
            text-align: center;
            cursor: pointer;

            background-position: 16px 3px;
            background-size: 26px;
            background-repeat: no-repeat;
            transition: all .3s ease;
            &.card-btn-hero{
                background-image: url("cardbtn-hero.gif");
            }
            &.card-btn-hot{
                background-image: url("cardbtn-hot.gif");
            }
            &.card-btn-previlege{
                background-image: url("cardbtn-previlege.gif");
            }
            &.card-btn-video{
                background-image: url("cardbtn-video.gif");
            }
            &:hover{
                background-position: 16px 3px;
                background-size: 28px;
            }
        }

        .card-btn-small{
            float: left;
            width: ($cardBtnWidth  - 10px)/ 2;
            height: ($cardBtnWidth - 10px) / 2;
            background-color: #0f1a28;
            cursor: pointer;
            &>div{
                width: 100%;
                height: 100%;
            }
            &:nth-of-type(1), &:nth-of-type(3){
                margin-right: 10px;
            }
            &:nth-of-type(1), &:nth-of-type(2){
                margin-bottom: 10px;
            }
            &:nth-of-type(1)>div{
                background: url("cardbtn-shopcart.png") no-repeat 6px 7px;
                background-size: 22px;
            }
            &:nth-of-type(2)>div{
                background: url("cardbtn-earphone.png") no-repeat 9px 9px;
                background-size: 18px;
            }
            &:nth-of-type(3)>div{
                background: url("cardbtn-phone.png") no-repeat 9px 9px;
                background-size: 18px;
            }
            &:nth-of-type(4)>div{
                background: url("cardbtn-praise.png") no-repeat 9px 9px;
                background-size: 18px;
                transform: rotateY(180deg);
            }
        }
    }
</style>
