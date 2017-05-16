<template>
    <div class="detail">
        <v-header goBack="true" :headTitle="listDetail.title"></v-header>
        <div class="audio-play" v-if="this.identifier == 1 && listDetail.audio">
            <i v-on:click="playAudio" class="iconfont">&#xe66b;&nbsp;音频播放</i>
            <audio  id="audio" :src="listDetail.audio" loop="true">
                你的浏览器不支持 <code>audio</code> 音频播放功能.
            </audio>
        </div>
        <div class="detail-body"  :class="{service:this.identifier != 1}" v-show="isShow">
            <section v-html="listDetail.content"></section>
            <review :id="detailId" :qrCodeUrl="qrCodeUrl" v-if="needReview"></review>
        </div>
        <footer v-if="isShowShop"><a :href="shopUrl" target="_blank">去预订</a></footer>
        <loading :show="done"></loading>
    </div>
</template>

<script>
    import loading from '../components/loading.vue';
    import vHeader from '../components/header.vue';
    import review from '../components/review.vue';
    export default {
        data() {
          return {
            done: false,
            isShow: false,     // 只有当数据加载完成之后才能够实现出来
            needReview: false,  //是否需要显示评论(只有景点才需要,其他的地方都是不需要的,默认关闭)
            detailId: '',
            type: '',          // 判断当前的模块信息
            identifier: '',    // 标识符 景点介绍模块为1 旅行百宝箱模块为0
            isShowShop: false,  // 是否显示购物按钮，只有在去购物下面才能显示出来,
            shopUrl: '',
            qrCodeUrl: '',      // 二维码的生成地址
            listDetail: {      // 详情列表信息
                title: '',
                content: '',
                audio: null
            }
          }
        },
        components: {
            loading, vHeader, review
        },
        created() {
            this.detailId = this.$route.params.id;
            this.identifier =  this.$route.params.identifier || 0;
            this.type = this.$route.params.type;
        },
        mounted() {
           this.initPage();
        },
        methods: {
            initPage() {
                let listDetailUrl = '';
                this.$data.done = true;
                if(this.identifier == 1) {  
                    listDetailUrl = `/JSY_H5/h5/querySSSOne?id=${this.detailId}`;   // 景点介绍调用的接口
                } else if(this.identifier == 2) {
                    listDetailUrl = `/JSY_H5/h5/queryServiceOne?id=${this.detailId}`;   // service.vue下面过来调用接口
                } else {
                    listDetailUrl = `/JSY_H5/h5/queryServiceList?type=${this.detailId}`;     // 旅游线路，景区地图调用的接口
                }

                this.$http.get(listDetailUrl).then((response) => {
                    this.done = false;
                    this.isShow = true;
                    let data = response.data.rows;
                    // 景点介绍
                    if(this.identifier == 1) {
                        this.listDetail.title = data[0].SS_TITLE;
                        this.listDetail.content = data[0].SS_CONTENT;
                        this.listDetail.audio = data[0].SS_VIDEO_URL;
                        this.qrCodeUrl = data[0].QR_CORE_URL;
                        this.needReview = true;
                    } else {
                        // 资讯
                        this.listDetail.title = data[0].INFO_TITLE;
                        this.listDetail.content = data[0].INFO_CONTENT;
                        this.needReview = false;
                        // 预定门票和特色商品跳转过来并且购物地址存在时，才显示出来
                        if(this.type == 13 || this.type == 14) {
                            if( data[0].JUMP_URL) {
                                this.isShowShop = true;
                                this.shopUrl = data[0].JUMP_URL;
                            }
                        }
                    }
                    // 由于后台传过来是一段字符串 需要使用正则来适配一体机文字大小
                    let isApp = window.localStorage ? localStorage.getItem('isApp') : Cookie.read('isApp');
                    if(isApp == 'true') {
                        this.listDetail.content = this.listDetail.content.replace(/font-size:\s*\d+px;/g, 'font-size: 24px;');
                    }
                }, (response) => {
                    console.log('opps Is Error: ' + response);
                    this.done = false;
                })
            },
            playAudio() {
                let audio = document.getElementById('audio');
                var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended 
                    && audio.readyState > 2;

                if (!isPlaying) {
                  audio.load(); 
                  audio.play();
                }
            }
        }
    }
</script>

<style lang="scss">
  .detail {
    padding-top: 40px;  // 移除头部header的高度
    .audio-play {
        width: 100%;
        color: #fff;
        padding: 1% 4%;
        text-align: right;
        background: #000;
        opacity: .4;
        box-sizing: border-box;
        i {
            display: inline-block;
            width: 100px;
            height: 30px;
            line-height: 30px;
        }
    }
    .detail-body {
        padding: 10px 10px 40px 10px ;
        section {
            width:100%;
            img {
                width:100%;
            }
        }
    }
    .service {
        margin-top: 40px;
    }
    footer {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 40px;
        background: #f6f6f6;
        text-align: right;
        a {
            display: inline-block;
            width: 80px;
            height: 40px;
            line-height: 40px;
            padding: 2px;
            color: #FFF;
            text-align: center;
            background: #e60012;
            box-sizing: border-box;
        }
    }
  }
  @media screen and (min-width: 1000px) {
    .detail {
        padding-top: 100px;
        .audio-play {
            i {
                font-size: 32px;
                width: 200px;
                height: 50px;
                line-height: 50px;
            }
        }
        .service {
            margin-top: 100px;
        }
        footer {
            height: 100px;
        }
    }
}
</style>