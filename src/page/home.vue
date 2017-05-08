<template>
    <div id="main">
        <v-header sideBar="true">
        <span slot="logo">今世缘景区欢迎您</span>
        </v-header>
        <user-count></user-count>
        <!-- 首页滚动banner -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                       <img src="../assets/image/bg2.jpg" alt="center-bg">
                    </div>
                    <div class="swiper-slide">
                       <img src="../assets/image/bg3.jpg" alt="right-bg">
                    </div>
                    <div class="swiper-slide">
                       <img src="../assets/image/bg1.jpg" alt="left-bg">
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
import vHeader from '../components/header'
import userCount from '../components/userCount'
import vFooter from '../components/footer.vue'
import '../static/lib/js/swiper.min.js'
import '../static/lib/css/swiper.min.css'

export default {
    data() {
        return {

        }
    },
    components: {
        vHeader, userCount,  vFooter
    },
    mounted() {
        //初始化swiper
        new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true
        });
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
    .banner {
        .swiper-container {
            width: 100%;
            height: 100%;
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
                padding: 5px;
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