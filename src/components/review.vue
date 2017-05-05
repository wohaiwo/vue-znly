<template>
	<div class="reviews" v-show="isShow">
		<h4>热门评论</h4>
		<section v-for="(item, index) in reviewData">
			<div class="reviews-header">
				<span class="reviews-author">{{ item.SSR_NAME }}</span>
				评分:&nbsp;<span class="reviews-rate">{{ showRate(item.SSR_POINT) }}</span>
				<span>{{ item.ENTRY_DATE_TIME }}</span></div>
			<div class="reviews-body">
				<p>{{ item.SSR_CONTENT }}</p>
			</div>
		</section>
		<div  v-show="isShowReviewBox" class="addReviewBox">
			<div class="mask"></div>
			<div class="tipBox">
				<header class="tipBox-title">
					<h2>新增评论<span>x</span></h2>
				</header>
				<div class="tipBox-content">
					<input type="text">
				</div>
				<footer>
					<a v-on:click="closeReviewBox">取消</a>
					<a href="">提交</a>
				</footer>
			</div>
		</div>
		<a v-on:click="showReviewBox">新增</a>
		<a v-if="isGetReviewBtn" v-on:click="getMoreReview">查看更多评论</a>
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
			showRate(rate) {
				if(!rate) rate = 5; 
				return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
			},
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
		text-align: center;
		h4 {
			margin: 10px 0;
			padding: 8px 12px;
			text-align: left;
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
		.addReviewBox {
			position: relative;
			.mask {
				position: fixed;
				display: block;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .4);
				z-index: 1;
			}
			.tipBox {
				position: fixed;
				top: 50%;
				left: 50%;
				width: 80%;
				height: 200px;
				border-radius: 4%;
				background: #fff;
				transform: translate3d(-50%, -50%, 0);
				z-index: 100;
				.tipBox-title {
					padding: 2% 4%;
					text-align: left;
					span {
						float: right;
					}
				}
				.tipBox-content {

				}
				footer {

				}
			}
		}
	}
</style>