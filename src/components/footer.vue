<template>
	<footer>
	    <ul>
	    	<li>
		    	<router-link :to="{name: 'service', params: {type: 15}}" :class=" pathName == navUrl[0] ? 'active' : ''">
		    		<i class="iconfont">&#xe69b;</i><span>景区服务</span>
		    	</router-link>
	    	</li>
	    	<li>
	    		<router-link to="/home" :class=" pathName == navUrl[1] ? 'active' : ''">
	    			<i class="iconfont">&#xe6b8;</i><span>主页</span>
	    		</router-link>
	    	</li>
	    	<li>
	    		<router-link :to="{name: 'service', params: {type: 6}}" :class=" pathName == navUrl[2] ? 'active' : ''">
	    			<i class="iconfont">&#xe7f1;</i><span>餐饮住宿</span>
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
				// pathName : 'home',
				navUrl : [0, 1, 2]
			}
		},
		props: ['pathName'],
		created() {
			// this.pathName = this.$route.path;
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
		ul {
			height: 100%;
			overflow: hidden;
			li {
				display: inline-block;
				position: relative;
				float: left;
				width: 33.33%;
				height: 100%;
				box-sizing: border-box;
				.iconfont {
					display: block;
					margin-top: 4px;
					font-size: 20px;
				}
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

	@media screen and  (min-width: 1000px) {
		footer {
			height: 100px;
			ul {
				li {
					.iconfont {
						font-size: 48px;
					}
				}
			}
			a {
				font-size: 24px;
			}
		}
	}
</style>