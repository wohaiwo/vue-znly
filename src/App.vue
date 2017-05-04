<template>
    <div id="main">
        <v-header>
        <span slot="logo">今世缘景区欢迎您</span>
        </v-header>
        <user-count></user-count>
        <!-- 首页滚动banner -->
        <div class="banner">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <router-link to="/movie">
                            <img src="./assets/image/background.jpg" alt=""></router-link>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <v-footer></v-footer>    
    </div>
</template>

<script>
import vHeader from './components/header'
import userCount from './components/userCount'
import vFooter from './components/footer.vue'
import './static/lib/js/swiper.min.js'

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
        height: calc(100vh - 60px);
        .swiper-slide img {
            width: 100%;
            height: 100%;
        }
    }
}
.main-nav ul {
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap:  wrap;
    justify-content: center;
    align-items: center;
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25%;
        height: 100px;
        border: 1px solid #C7000B;
        box-sizing: border-box;
        span {
            color: #c96;
        }
    }
}
</style>