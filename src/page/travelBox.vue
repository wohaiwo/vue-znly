<template>
	<div>
        <v-header goBack="true" headTitle="旅行百宝箱"></v-header>
        <div class="travel-box">
			<section class="item-box">
				<router-link :to="{name: 'listDetail', params: {id: 5, type: 20, identifier: 0}}">
					<i class="iconfont">&#xe656;</i>
					<span>旅游线路</span>
				</router-link>
				<router-link :to="{name: 'externalMap'}">
					<i class="iconfont">&#xe621;</i>
					<span>外部交通</span>
				</router-link>
				<router-link :to="{name: 'listDetail', params: {id: 4, type: 21, identifier: 0}}">
					<i class="iconfont">&#xe638;</i>
					<span>景区地图</span>
				</router-link>
				<router-link :to="{name: 'service', params: {type: 7}}">
					<i class="iconfont">&#xe600;</i>
					<span>周边景点</span>
				</router-link>
				<router-link :to="{name: 'service', params: {type: 6}}">
					<i class="iconfont">&#xe7f1;</i>
					<span>餐饮,住宿</span>
				</router-link>
			</section>			
        </div>
	 </div>
</template>

	<script>
		import vHeader from '../components/header'
		export default {
			data() {
				return {
				}
			},
			components: {
				vHeader
			},
			mounted() {

			}
		}
	</script>

	<style scoped lang="scss">
		.travel-box {
			margin-top: 42px;
				height: 100vh;
				background: #F5F5F5;
				a {
					display: inline-block;
					width: 32%;
					height: 100px;
					margin: 0 2% 2% 0;
					color: #5D656B;
					background: #fff;
					text-align: center;
					box-sizing: border-box;
					&:nth-child(3n + 0) {
						margin-right: 0;
					}
					i {
						display: block;
						font-size: 48px;
						line-height: 60px;
						margin-top: 10px;
					}
					span {
						font-size: 16px;
					}
				}
		}
		@media screen and (min-width: 1000px) {
			.travel-box {
				margin-top: 100px;
				a {
					height: 200px;
					i {
						font-size: 64px;
						line-height: 100px;
					}
					span {
						font-size: 24px;
					}
				}
			}
		}
</style>