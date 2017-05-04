<template>
	<footer>
	    <ul>
	    	<li>
	    		<a v-on:click="showNav(isShow)" :class=" pathName == navUrl[0] ? 'active' : ''">
	    			<i class="iconfont">&#xe6a8;</i>
	    			<span>景区</span>
	    		</a>
	    		<transition name="slide-fade">
					<ul v-show="isShow" class="sub-nav">
						<li><router-link :to="{name: 'introduction'}">景区介绍</router-link></li>
						<li><a href="">景区服务</a></li>
						<li><router-link :to="{name: 'service', params: {type: 3}}">景区公告</router-link></li>
						<li><a href="">虚拟景区</a></li>
					</ul>
				</transition>
	    	</li>
	    	<li>
		    	<router-link to="/home" :class=" pathName == navUrl[1] ? 'active' : ''">
		    		<i class="iconfont">&#xe6b2;</i><span>预订</span>
		    	</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/home" :class=" pathName == navUrl[2] ? 'active' : ''">
	    			<i class="iconfont">&#xe6b8;</i><span>主页</span>
	    		</router-link>
	    	</li>
	    	<li>
				<router-link to="/travelBox" :class=" pathName == navUrl[3] ? 'active' : ''">
					<i class="iconfont">&#xe67c;</i><span>百宝箱</span>
				</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/home" :class=" pathName == navUrl[4] ? 'active' : ''">
	    			<i class="iconfont">&#xe698;</i><p>购物</p>
	    		</router-link>
	    	</li>
	    </ul>
	</footer>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				pathName : 'home',
				navUrl : ['scenic', 'order', 'home', 'travelBox', 'shop']
			}
		},
		created() {
			this.pathName = this.$route.name;
		},
		methods: {
			showNav(state) {
				this.$data.isShow = state ? false : true;
			}
		}
	}
</script>

<style scoped lang="scss">
	footer {
		display: block;
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 100;
		color: #000;
		background: #fff;				
		ul > li {
			display: inline-block;
			position: relative;
			float: left;
			width: 20%;
			box-sizing: border-box;
			.iconfont {
				display: block;
				margin-top: 4px;
				font-size: 20px;
			}
		}
		.sub-nav {
			display: block;
			position: absolute;
			left: 2px;
			bottom: 140%;
			width: 125%;
			border-radius: 5px;
			background: #fff;
			filter: drop-shadow(0px 0px 4px #333);
			li {
				display: block;
				width: 100%;
				height: 35px;
				line-height: 35px;
			}
			li:not(:last-child) {
				border-bottom: 1px solid #999;
			}
		}
		.sub-nav:after {
			position: absolute;
			content: '';
			left: 38%;
			bottom: -14%;
			border: 10px solid ;
			border-color: #fff transparent transparent transparent;
		}
		// 菜单栏选中点击样式
		.active {
			i, span {
				color: #E50012;
			}
		}
		a {
			display: block;
			width: 100%;
			height: 100%;
			font-size: 14px;
			color: #5D656B;
			text-align: center;
		}
		.slide-fade-enter-active {
		  transition: all .3s ease;
		}
		.slide-fade-leave-active {
		  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.slide-fade-enter, .slide-fade-leave-to {
		  transform: translate3d(0, 100%, 0);
		  opacity: 0;
		}
	
	}
</style>