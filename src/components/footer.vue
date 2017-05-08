<template>
	<footer>
	    <ul>
	    	<li>
		    	<router-link to="/home" :class=" pathName == navUrl[0] ? 'active' : ''">
		    		<i class="iconfont">&#xe69b;</i><span>景区服务</span>
		    	</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/home" :class=" pathName == navUrl[1] ? 'active' : ''">
	    			<i class="iconfont">&#xe6b8;</i><span>主页</span>
	    		</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/travelBox" :class=" pathName == navUrl[2] ? 'active' : ''">
	    			<i class="iconfont">&#xe621;</i><span>餐饮住宿</span>
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
				navUrl : ['scenic', 'home', 'travelBox']
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
			width: 33.33%;
			box-sizing: border-box;
			.iconfont {
				display: block;
				margin-top: 4px;
				font-size: 20px;
			}
		}
		// 菜单栏选中点击样式
		.active {
			i, span {
				color: #e60012;
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