<template>
	<div>
        <v-header goBack="true" headTitle="旅行百宝箱"></v-header>
        <div class="travel-box">
			<section class="sub-mapBox">
				<ul>
					<li>
						<router-link :to="{name: 'listDetail', params: {id: 5, identifier: 0}}">旅游线路</router-link>
					</li>
					<li class="map-box">
						<router-link :to="{name: 'externalMap'}">外部交通</router-link>
						<router-link :to="{name: 'listDetail', params: {id: 4, identifier: 0}}">景区地图</router-link>
					</li>
				</ul>
			</section>
			<section class="sub-box">
				<ul>
					<li><router-link :to="{name: 'listDetail', params: {id: 10, identifier: 0}}">小物件寄存</router-link></li>
					<li><router-link :to="{name: 'listDetail', params: {id: 11, identifier: 0}}">残疾人车</router-link></li>
					<li><router-link :to="{name: 'listDetail', params: {id: 12, identifier: 0}}">语音讲解器</router-link></li>
				</ul>
			</section>
			<section class="sub-box">
				<ul>
					<li><router-link :to="{name: 'service', params: {type: 7}}">周边景点</router-link></li>
					<li><router-link :to="{name: 'service', params: {type: 6}}">餐饮,住宿</router-link></li>
					<li><router-link :to="{name: 'listDetail', params: {id: 9,  identifier: 0}}">咨询服务</router-link></li>
				</ul>
			</section>
        </div>
        <v-footer></v-footer>	
	 </div>
</template>

	<script>
		import vHeader from '../components/header'
		import vFooter from '../components/footer.vue'
		export default {
			data() {
				return {
				}
			},
			components: {
				vHeader, vFooter
			},
			mounted() {

			}
		}
	</script>

	<style scoped lang="scss">
		.travel-box {
			margin-top: 42px;
			section {
			overflow: hidden;
			ul > li {
				display: inline-block;
				box-sizing: border-box;
				a {
					display: inline-block;
					width: 100%;
					height: 100%;
					line-height: 100px;
					text-align: center;
					color: #fff;
					background: url('../assets/image/scenic-1.jpg');
					background-size: cover;
				}
			}
		}
		.sub-mapBox li {
			width: 50%;
			height: 200px;
			float: left;
		}
		.map-box a {
			display: block;
			width: 100%;
			height: 50%;
			box-sizing: border-box;
		}
		.sub-box li {
			width: 33.3%;
			height: 100px;
		}
	}
</style>