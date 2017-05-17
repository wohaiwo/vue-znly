<template>
    <div id="main">
        <v-header sideBar="true" :isShowSideBar="isShowSideBar" @breadcrumb="showSideBar">
        <span slot="logo"><img class="logo" src="../assets/image/logo.png" alt="logo">今世缘景区欢迎您</span>
        </v-header>
        <user-count></user-count>
        <!-- 首页滚动banner -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in imageDataArr">
                       <img :src="item.INFO_IMAGE_URL" :alt="item.INFO_TITLE">
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
            <nav class="right-side">
                <router-link :to="{name: 'service', params: {type: 13}}">预订门票</router-link>
                <router-link :to="{name: 'dropBox', params: {url: vRinfo.jumpUrl, title: vRinfo.title}}">虚拟旅游</router-link>
                <a @click="showSideBar">更多</a>
            </nav>
        </div>
        <v-footer></v-footer>
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
            vRinfo: {
                title: '',
                jumpUrl: ''
            }              // 虚拟旅游
        }
    },
    components: {
        vHeader, userCount,  vFooter
    },
    created() {
        this.isApp = this.$route.query && this.$route.query.app;
        // 浏览器本地存储是否是一体机
        if(window.localStorage) {
            localStorage.setItem('isApp', this.isApp);
        } else {
            Cookie.wirte('isApp', this.isApp);
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
                        autoplay: 5000, 
                        pagination: '.swiper-pagination',
                        loop: true
                    });
                });
            }, (response) => {
                console.log('oops, data is not found');                
            });
        },
        getVRTravel() {
            let url = '/JSY_H5/h5/queryServiceList?type=13';
            this.$http.get(url).then((response) => {
                // 遍历数据，改变数据结构，套用同一天模板listTpl
                this.$data.vRinfo['title'] = response.data.rows[0]['INFO_TITLE'];
                this.$data.vRinfo['jumpUrl'] = response.data.rows[0]['JUMP_URL'];
            });
        },
        showSideBar() {
            this.isShowSideBar = !this.isShowSideBar;
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
    .logo {
        width: 25px;
        margin-right: 5px;
        vertical-align: middle;
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
                padding: 3px;
                color: #fff;
                background: #e60012;
                font-size: 14px;
                border: 2px solid #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
                box-sizing: border-box;
                &:last-child {
                    padding: 0;
                    line-height: $right-side-size;
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
        .logo {
            width: 48px;
            margin-right: 10px;
            vertical-align: middle;
        }
        .banner {
            .swiper-container {
                top: 100px;
                bottom: 100px;
            }
             .right-side {
                right: 4%;
                bottom: $right-side-size;
                width: $right-side-size;
                a {
                    width: $right-side-size;
                    height: $right-side-size;
                    font-size: 45px;
                    padding: 5px;
                    border: 5px solid #fff;
                    &:last-child {
                        line-height: $right-side-size;
                    }
                   
                }
            }
        }

    }
</style>