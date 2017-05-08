<template>
	<div class="reviews" v-show="isShow">
		<ul>
			<li>阅读100</li>
			<li><i class="iconfont">&#xe644;</i>60</li>
			<li><i class="iconfont">&#xe761;</i>写评论</li>
			<li><i class="iconfont">&#xe649;</i>评论数</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: true,
				isShowReviewBox: false,
				SS_NO: this.id,
				isGetReviewBtn: true,		// 控制查看更多评论按钮只能出现一次
				reviewData: [],
				moreReviewData: []
			}
		},
		props: ['id'],
		mounted() {
			this.initPage();
		},
		methods: {
			
			showReviewBox() {
				this.$data.isShowReviewBox = !this.$data.isShowReviewBox;
			},
			closeReviewBox() {
				this.$data.isShowReviewBox = false;
			},
			addReview() {
				let url = `/zhan/saveSsr`;
				this.$http.post(url, {
					SSR_NO: "",
					SS_NO: this.$data.SS_NO,
					SSR_CONTENT: "是19日杭州飞高雄，然后垦丁，花莲，九份，台北5月30日出。有同行"
				}).then( (response) => {
					console.log('输出结果' + response);
				}, (response) => {
					console.log('opps Is Error: ' + response);
				})
			},
			getMoreReview() {
				this.$data.reviewData = this.$data.reviewData.concat(this.$data.moreReviewData);
				this.$data.isGetReviewBtn = false;
			},
			initPage() {
				let url = `/zhan/querySRList?id=${this.$data.SS_NO}`;
				this.$http.get(url).then((response) => {
					this.$data.reviewData = response.data.rows.slice(0, 2);
					this.$data.moreReviewData = response.data.rows.slice(2);
				}, (response) => {
					console.log('opps Is Error: ' + response);
				})
			}
		}
	}	
</script>


<style scoped lang="scss">
	.reviews {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60px;
		background: #F6F6F6;
		ul  {
			padding: 5%;
			li {
				display: inline-block;
				width: 20%;
				height: 30px;
				margin-right: 5%;
				border-radius: 20%;
				background: red;
			}
		}
	}
</style>