<template>
    <div id="main">
        <v-header sideBar="true" :isShowSideBar="isShowSideBar" :vrUrl="vRinfo.jumpUrl" :vrTitle="vRinfo.title" @breadcrumb="showSideBar">
            <span class="header-logo" slot="logo"><img class="logo" :src="logoImgUrl" alt="logo-title"></span>
        </v-header>
        <user-count></user-count>
        <!-- 首页滚动banner -->
        <div class="banner">
            <div class="swiper-container" @click="closeSideBar">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in imageDataArr">
                       <img :src="item.INFO_IMAGE_URL" :alt="item.INFO_TITLE">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
            <nav class="right-side">
                <router-link :to="{name: 'service', params: {type: 13}}"><span>预订</span><span>门票</span></router-link>
                <router-link :to="{name: 'dropBox', params: {url: vRinfo.jumpUrl, title: vRinfo.title}}"><span>虚拟</span><span>旅游</span></router-link>
                <a @click="showSideBar"><span>更多</span><span>功能</span></a>
            </nav>
        </div>
        <v-footer :pathName="1"></v-footer>
    </div>
</template>

<script>
import Vue from 'vue';
import vHeader from '../components/header'
import userCount from '../components/userCount'
import vFooter from '../components/footer.vue'
import '../static/lib/js/swiper.min.js'
import '../static/lib/css/swiper.min.css'

export default {
    data() {
        return {
            isApp: false,           // 是否是园区一体机
            isShowSideBar: false,
            imageDataArr: [],       // 首页轮播图
            vRinfo: {               // 虚拟旅游
                title: '',
                jumpUrl: ''
            },
            logoImgUrl: ''
        }
    },
    components: {
        vHeader, userCount,  vFooter
    },
    created() {
        let isApp = window.localStorage ? localStorage.getItem('isApp') : Cookie.read('isApp');
        // 浏览器本地存储是否是一体机
        // 判断本地缓存里面是否已经存在isApp
        if(isApp == 'true') {
            this.logoImgUrl = '../static/logo/logo-red-pc.png';
        } else {
            // 判断是否是第一次进来首页，如果是，则获取params的参数
            this.isApp = this.$route.query && this.$route.query.app;
            if(this.isApp == 'true') {
                // 保存到全局变量中
                if(window.localStorage) {
                    localStorage.setItem('isApp', this.isApp);
                } else {
                    Cookie.wirte('isApp', this.isApp);
                }
                this.logoImgUrl = '../static/logo/logo-red-pc.png';
            } else {
                this.logoImgUrl = '../static/logo/logo-red-h5.png';
            }
        }

    },
    mounted() {
        this.initPage();
        this.getVRTravel();
    },
    methods: {
        initPage() {
              let url = `/JSY_H5/h5/queryServiceList?type=1`;
            this.$http.get(url).then((response) => {
                this.imageDataArr = response.data.rows;
                Vue.nextTick(function() {
                    new Swiper('.swiper-container', {
                        autoplay: 10000, 
                        pagination: '.swiper-pagination',
                        loop: true
                    });
                });
            }, (response) => {
                console.log('oops, data is not found');                
            });
        },
        getVRTravel() {
            let url = '/JSY_H5/h5/queryServiceList?type=16';
            this.$http.get(url).then((response) => {
                // 遍历数据，改变数据结构，套用同一天模板listTpl
                this.$data.vRinfo['title'] = response.data.rows[0]['INFO_TITLE'];
                this.$data.vRinfo['jumpUrl'] = response.data.rows[0]['JUMP_URL'];
            });
        },  
        showSideBar() {
            this.isShowSideBar = !this.isShowSideBar;
        },
        closeSideBar() {
            this.isShowSideBar = false;
        }
    }
}
</script>

<style scoped lang="scss">
    #main {
        font-family: "Microsoft Yahei", 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    .header-logo {
        display: inline-block;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        .logo {
            height: 100%;
            vertical-align: middle;
        }
    }
    .banner {
        $right-side-size: 50px;
        .swiper-container {
            position: fixed;
            left: 0;
            right: 0;
            top: 40px;
            bottom: 50px;
            z-index: 10;
            overflow: hidden;
            .swiper-slide img {
                width: 100%;
                height: 100%;
            }
        }
        .right-side {
            position: fixed;
            right: 4%;
            bottom: 70px;
            z-index: 10;
            width: $right-side-size;
            a {
                display: inline-block;
                width: $right-side-size;
                height: $right-side-size;
                font-size: 0;
                color: #fff;
                background: #e60012;
                border: 2px solid #fff;
                padding: 5px;
                border-radius: 50%;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
                box-sizing: border-box;
                span {
                    display: block;
                    font-size: 14px;
                    &:last-child {
                        margin-top: -3px;
                    }
                }
                &:not(:last-child) {
                    margin-bottom: 10px;
                }
            }
        }
    }

    // 适配一体机样式
    @media screen and  (min-width: 1000px) {
        $right-side-size: 150px;
        .header-logo {
            height: 100px;
        }
        .banner {
            .swiper-container {
                top: 100px;
                bottom: 100px;
            }
             .right-side {
                right: 4%;
                bottom: 50%;
                width: $right-side-size;
                transform: translate3d(0, 50%, 0);
                a {
                    width: $right-side-size;
                    height: $right-side-size;
                    padding: 12px;
                    border: 5px solid #fff;
                    span {
                        font-size: 45px;
                        &:last-child {
                            margin-top: -10px;
                        }
                    }
                }
            }
        }

    }
</style>