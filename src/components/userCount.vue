 <template>
	<div>
		<p>{{ msg }}</p>
		 
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
			let url = '/JSY_H5/h5/statistics';
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
		position: relative;
		width: 100%;
		height:  20px;
		padding: 0 4%;
		margin-top: 40px;
		font-size: 14px;
		color: #ddd;
		background: rgba(0, 0, 0, .4);
		overflow: hidden;
		z-index: 40;
		user-select: none;
		box-sizing: border-box;
		p {
			left: 100%;
			position: absolute;
			z-index: 40;
			white-space: nowrap;
			animation-delay: 1s;
			animation-name: slide;
			animation-duration: 45s;
			animation-iteration-count: infinite;
		}
	}
	@media screen and (min-width: 1000px) {
		div{
			height:  60px;
			margin-top: 100px;
			font-size: 32px;
			p {
				line-height: 60px;
			}
		}
	}
	@keyframes slide {
		0% { left: 100%; }
		100% { left: -120%; }
	}
</style>