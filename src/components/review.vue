<template>
	<div class="reviews" v-show="isShow">
		<h4>热门评论</h4>
		<section v-for="(item, index) in reviewData">
			<div class="reviews-header">
				<span class="reviews-author">{{ item.author }}</span>
				评分:&nbsp;<span class="reviews-rate">{{ showRate(item.rate) }}</span>
				<span>{{ item.time }}</span></div>
			<div class="reviews-body">
				<p>{{ item.content }}</p>
			</div>
		</section>
		<a v-on:click="addReview">新增</a>
		<a>查看更多评论</a>
	</div> 
</template>

<script>
	export default {
		data() {
			return {
				isShow: true,
				SS_NO: this.id,	
				reviewData: [
					{
						author: "游客", 
						time: "2017-02-27 19:47:12", 
						rate: 4, 
						content: "我是19日杭州飞高雄，然后垦丁，花莲，九份，台北5月30日出。有同行的吗？"
					}, {
						author: "游客", 
						time: "2017-02-27 19:47:12", 
						rate: 3, 
						content: "我是19日杭州飞高雄，然后垦丁，花莲，九份，台北5月30日出。有同行的吗？我是19日杭州飞高雄，然后垦丁，花莲，九份，台北5月30日出。有同行的吗？"
					}, {
						author: "游客", 
						time: "2017-02-27 19:47:12", 
						rate: 1, 
						content: "我是19日杭州飞高雄，然后垦丁，花莲，九份，台北5月30日出。有同行的吗？"
					} 
				]
			}
		},
		props: ['id'],
		mounted() {
		},
		methods: {
			showRate(rate) {
				return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
			},	
			addReview() {
				console.log(this.$data.SS_NO);
				let url = `/zhan/saveSsr`;
				this.$http.post(url, {
					SSR_NO: '',
					SS_NO: this.$data.SS_NO,
					SSR_CONTENT: "是19日杭州飞高雄，然后垦丁，花莲，九份，台北5月30日出。有同行"
				}).then( (response) => {
					console.log('输出结果' + response);
				}, (response) => {
					console.log('opps Is Error: ' + response);
				})
			}
		}
	}
</script>


<style scoped lang="scss">
	.reviews {
		text-align: center;
		h4 {
			margin: 10px 0;
			padding: 8px 12px;
		}
		section {
			background: #fff;
			margin-bottom: 10px;
			overflow: hidden;
			text-align: left;
			border-radius: 2%;
			box-shadow: 0 0 5px 0 rgba(0, 0, 0, .6);
			.reviews-header {
				display: block;
				font-size: 14px;
				padding: 1% 2%;
				height: 20px;
				width: 100%;
				overflow: hidden;
				.reviews-author, .reviews-rate {
					color: #ff9900;
					margin-right:  5%;
				}
			}
			.reviews-body {
				padding: 4px 2%;
				overflow: hidden;
				font-size: 14px;

			}
			&:last-of-type {
				margin-bottom: 30px;
			}
		}

		a {	
			display: inline-block;
			width: 120px;
			height: 40px;
			line-height: 40px;
			color: #f90;
			border: 1px solid #f90;
			border-radius: 10px;
			&:first-of-type {
				margin-right: 10px;
			}
		}
	}
</style>