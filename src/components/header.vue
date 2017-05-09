<template>
	<header>
		<slot name="logo"></slot>
		<span class="left-icon" v-if="goBack" @click="$router.go(-1)">
			<i title="返回" class="iconfont">&#xe679;</i>
        </span>
		<span class="left-icon side-bar" v-if="sideBar" @click="isShowSideBar = !isShowSideBar">
			<i title="主菜单" class="iconfont">&#xe60c;</i>
        </span>
        <span class="title-text" v-if="headTitle">{{headTitle}}</span>
        <transition name="slide-fade">
        <nav v-if="isShowSideBar">
    	<router-link to="/scenic/introduction"><i class="iconfont">&#xe6fb;</i>景区介绍</router-link>
		<router-link :to="{name: 'service', params: {type: 3}}"><i class="iconfont">&#xe64c;</i>景区公告</router-link>
	    <router-link :to="{name: 'service', params: {type: 13}}"><i class="iconfont">&#xe6b2;</i>门票预订</router-link>
        <router-link :to="{name: 'service', params: {type: 14}}"><i class="iconfont">&#xe6af;</i>特色购物</router-link>
    	<router-link to="/travelBox"><i class="iconfont">&#xf02a1;</i>旅行百宝箱</router-link>
    		<a href=""><i class="iconfont">&#xe73d;</i>虚拟游览</a>
    		 <router-link :to="{name: 'service', params: {type: 6}}"><i class="iconfont">&#xe621;</i>餐饮住宿</router-link>
        </nav>
        </transition>
	</header>
	
</template>
<script>
	export default {
		data() {
			return {
				isShowSideBar: false
			}
		},
		props: ['goBack', 'headTitle', 'sideBar'],
		methods: {
		}
	}
</script>
<style scoped lang="scss">
	$nav-color: #e60012;
	header {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 40px;
		line-height: 40px;
		
		color: $nav-color;
		background: #fff ;
		text-align: center;
		border-bottom: 2px solid #ededed;
		box-sizing: border-box;
		span {
			font-size: 18px;
			font-weight: bold;	
		}		
		.left-icon {
			position: absolute;
			left: 4%;
			top: 50%;
			transform: translateY(-50%);
			i {
				color: $nav-color;
			}
		}
		.side-bar {
			left: 0;
			width: 10%;
			background: $nav-color;
			i {
				color: #fff;
			}
		}
		nav {
			position: fixed;
			left: 0;
			right: 0;
			top: 40px;
			bottom: 50px;
			z-index: 20;
			width: 140px;
			background: #fff;
			a {
				display: block;
				height: 50px;
				line-height: 50px;
				text-align: left;
				padding-left: 8%;
				box-sizing: border-box;
				color: #000;
				&:not(:last-child) {
					border-bottom: 1px solid #e6e6e6;
				}
				i {
					color: $nav-color;
					margin-right: 20px;
				}
			}
		}
	}
	.slide-fade-enter-active, .slide-fade-leave-active  {
		transition: all 1s ease-in;
	}
	.slide-fade-enter, .slide-fade-leave-to{
		opacity: 0;
		transform: translate3d(-150px, 0, 0);
	}

</style>