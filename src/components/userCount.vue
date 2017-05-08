 <template>
	<div>
		<p>景区当前游客数: <span>209</span>人， 预计今日游客总人数: <span>2817</span>人</p>
		 
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: ''
			}
		},
		created() {
			let url = '/zhan/statistics';
			this.$http.get(url).then((response) => {
				this.$data.msg = response.data.data.msg;
			}, (response) => {
				console.log('oops, data is error');
			});
		}
	}
</script>

<style scoped lang="scss">
	div {
		width: 100%;
		height:  20px;
		padding: 0 4%;
		margin-top: 40px;
		font-size: 14px;
		color: #ddd;
		background: rgba(0, 0, 0, .4);
		overflow: hidden;
		box-sizing: border-box;
		p {
			left: 100%;
			position: absolute;
			white-space: nowrap;
			animation-delay: .5s;
			animation-name: slide;
			animation-duration: 8s;
			animation-iteration-count: infinite;
		}
	}
	@keyframes slide {
		0% { left: 100%; }
		100% { left: -120%; }
	}
</style>