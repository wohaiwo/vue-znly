<template>
	<header>
		<slot name="logo"></slot>
		<span class="left-icon" v-if="goBack" @click="$router.go(-1)">
			<i title="返回" class="iconfont">&#xe679;</i>
        </span>
		<span class="left-icon side-bar" v-if="sideBar" @click="showSideBar">
			<i title="主菜单" class="iconfont">&#xe602;</i>
        </span>
        <span class="title-text" v-if="headTitle">{{headTitle}}</span>
        <transition name="slide-fade">
        <nav v-show="isShowSideBar">
	    	<router-link to="/scenic/introduction"><i class="iconfont">&#xe641;</i>景区介绍</router-link>
			<router-link :to="{name: 'service', params: {type: 3}}"><i class="iconfont">&#xe64c;</i>景区公告</router-link>
			<router-link :to="{name: 'service', params: {type: 15}}"><i class="iconfont">&#xe69b;</i>景区服务</router-link>
		    <router-link :to="{name: 'service', params: {type: 13}}"><i class="iconfont">&#xe6b2;</i>预订门票</router-link>
	        <router-link :to="{name: 'service', params: {type: 14}}"><i class="iconfont">&#xe6af;</i>特色购物</router-link>
	    	<router-link to="/travelBox"><i class="iconfont">&#xe603;</i>旅行百宝箱</router-link>
    		<a href=""><i class="iconfont">&#xe73d;</i>虚拟旅游</a>
    		 <router-link :to="{name: 'service', params: {type: 6}}"><i class="iconfont">&#xe7f1;</i>餐饮住宿</router-link>
        </nav>
        </transition>
	</header>
</template>
<script>
	export default {
		data() {
			return {
			}
		},
		props: ['goBack', 'headTitle', 'sideBar', 'isShowSideBar'],
		methods: {
			showSideBar() {
				this.$emit('breadcrumb');
			}
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
			left: 0;
			top: 50%;
			width: 50px;
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
		transition: all 0.3s ease-in;
	}
	.slide-fade-enter, .slide-fade-leave-to{
		opacity: 0;
		transform: translate3d(-150px, 0, 0);
	}
	// 适配一体机样式
	@media screen and  (min-width: 1000px) {
		$header-height: 100px;
	 	i {
	 		font-size: 36px;
	 	}
	  	header {
			font-size: 32px;
		  	height: $header-height;
		  	line-height: $header-height;
		  	border-bottom: 4px solid #ededed;
			span {
				font-size: 45px;
				font-weight: bold;	
			}
			.left-icon {
				width: $header-height;
			}
		  	nav {
				top: $header-height;
				bottom:　$header-height;
				width: 300px;
		  		a {
					height: $header-height;
					line-height: $header-height;
					border-bottom: 3px solid #e6e6e6;
				}
		  	}
	  }

	}
</style>