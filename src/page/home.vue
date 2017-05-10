<template>
    <div id="main">
        <v-header sideBar="true">
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
                <a href="">预订门票</a>
                <a href="">虚拟旅游</a>
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
            imageDataArr: []
        }
    },
    components: {
        vHeader, userCount,  vFooter
    },
    mounted() {
        this.initPage();
    },
    methods: {
        initPage() {
              let url = `/zhan/queryServiceList?type=1`;
            this.$http.get(url).then((response) => {
                this.imageDataArr = response.data.rows;
                Vue.nextTick(function() {
                    new Swiper('.swiper-container', {
                        autoplay: 2000, 
                        pagination: '.swiper-pagination',
                        loop: true
                    });
                });
            }, (response) => {
                console.log('oops, data is not found');                
            });
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
            width: 50px;
            a {
                display: inline-block;
                width: 50px;
                height: 50px;
                padding: 3px;
                color: #fff;
                background: #e60012;
                font-size: 14px;
                border: 2px solid #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
                box-sizing: border-box;
                &:not(:last-child) {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>