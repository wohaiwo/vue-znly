<template>
	<div>
		<div class="reviews" v-show="isShow">
			<ul>
				<li><i class="iconfont">&#xe73d;</i>{{ visitCount }}</li>
				<li @click.once="upVote" :class="{active: isActive }"><i class="iconfont">&#xe644;</i>{{ goodCount }}</li>
				<li @click="showReviewBox"><i class="iconfont">&#xe761;</i>写评论</li>
				<li @click="showCommentBox"><i class="iconfont">&#xe649;</i>{{ reviewCount }}</li>
			</ul>
		</div>
		<transition name="slide-fade-down">
			<div v-show="isShowReviewBox" class="reviews-box">
				<div class="header">
					<span @click="closeReviewBox">取消</span>
					<span>评论</span>
					<span @click="addReview" :class="isSend">发送</span>
				</div>
				<div class="body">
					<textarea v-model="reviewContent" autofocus maxlength="120" required></textarea>
				</div>
			</div>
		</transition>
		<transition name="slide-fade-right">
		<div v-show="isShowCommentBox" class="comment-box">
			<div @click.stop.prevent="closeCommentBox" class="mask"></div>
			<div class="comment-main">
				<section v-for="(item, index) in reviewData">
					<div class="reviews-author"><span>游客</span></div>
					<div class="reviews-body">
						<p class="reviews-content">{{ item.SSR_CONTENT }}</p>
						<p>{{ item.ENTRY_DATE_TIME  | time}}</p>
					</div>
				</section>
			</div>
		</div>
		</transition>
	    <div v-if="isShowQrBox" id="qrcode" @click="closeQrcodeBox">
	    	<div class="mask"></div>
	    	<div id="qrcode-content"></div>
	    </div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import '../static/lib/js/jquery.qrcode.min.js'
	export default {
		data() {
			return {
				isShow: true,				
				SS_NO: this.id,				// 当前的景点id
				isActive: false,
				reviewData: [],   			// 评论数
				visitCount: 0,    			// 访问数
				goodCount: 0,	  			// 点赞数
				reviewCount: 0,   			// 评论数
				reviewContent: '', 			// 评论内容
				isShowReviewBox: false,		// 是否显示评论框
				isShowCommentBox: false,     // 是否显示评论列表
				isShowQrBox: false          // 是否显示二维码
			}
		},
		props: ['id', 'qrCodeUrl'],
		mounted() {
			this.initPage();
		},
		computed: {
			isSend: function () {
				return {
					active:	!!this.$data.reviewContent.length
				}   
			}
		},
		filters: {
			// 格式化时间
			time: function(date) {
				if(!date) return '';
			    var date = new Date(date);
			    var Y = date.getFullYear() + '-';
			    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			    	return Y + M + D;
			}
		},
		methods: {
			// 评分
			showRate(rate) {
				if(!rate) rate = 5;
				return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
			},
			// 判断是否显示评论界面
			showReviewBox() {
				let isApp = window.localStorage ? localStorage.getItem('isApp') : Cookie.read('isApp');
				if(isApp == 'true') {			// 如果当前是一体机访问 则无法添加评论 调出二维码
					let url = this.qrCodeUrl;
					this.$data.isShowReviewBox = false;
					this.isShowQrBox = true;
					jQuery('#qrcode #qrcode-content').empty();
					Vue.nextTick(function() {
						jQuery('#qrcode #qrcode-content').qrcode(url);			// 使用ES6来进行字符串转义
					});
				} else {
					this.$data.isShowReviewBox = !this.$data.isShowReviewBox;
				}
			},
			showCommentBox() {
				if(this.reviewCount == 0) return false;     // 如果当前的评论数为0 则不显示评论列表
				this.$data.isShowCommentBox = !this.$data.isShowCommentBox;
			},
			// 关闭评论界面
			closeReviewBox() {
				this.$data.isShowReviewBox = false;
			},
			closeCommentBox() {
				this.$data.isShowCommentBox = false;
			},
			// 添加评论
			addReview() {
				let url = `/JSY_H5/h5/saveSSR`;
				this.$http.post(url, {
					SS_NO: this.$data.SS_NO,
					SSR_CONTENT: this.$data.reviewContent
				}).then( (response) => {
					this.closeReviewBox();
					this.reviewContent = '';
				}, (response) => {
					console.log('opps Is Error: ' + response);
				})
			},
			initPage() {
				let url = `/JSY_H5/h5/querySSRList?id=${this.$data.SS_NO}`;
				this.$http.get(url).then((response) => {
					this.$data.reviewData = response.data.rows;
				}, (response) => {
					console.log('opps Is Error: ' + response);
				});
				this.getUserVisit();	// 获取评论接口中 访问量和点赞数
			},
			// 获取当前景点的页面访问量点赞数以及评论数
			getUserVisit() {
				let url = `/JSY_H5/h5/addInteractive?id=${this.$data.SS_NO}`;  // 游客访问量
				this.$http.get(url).then((response) => {
					this.$data.goodCount = response.data.GOODED_COUNT;
					this.$data.visitCount = response.data.LOOKED_COUNT;
					this.$data.isActive = response.data.IS_GOODED;
					this.$data.reviewCount = response.data.REVIEW_COUNT;
				}, (response) => {
					console.log('opps Is Error: ' + response);
				});
			},
			// 添加点赞
			upVote() {
				let url = `/JSY_H5/h5/addInteractive?id=${this.$data.SS_NO}&ACTION="good"`;  // 当前景点-点赞数
				this.$http.get(url).then((response) => {
					this.$data.goodCount = response.data.GOODED_COUNT;
					this.$data.isActive = true;
				}, (response) => {
					console.log('opps Is Error: ' + response);
				});
			},
			// 关闭二维码框
			closeQrcodeBox() {
				this.isShowQrBox = false;
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
		z-index: 100;
		background: #F6F6F6;
		ul  {
			padding: 0 5%;
			li {
				display: inline-block;
				width: 25%;
				height: 30px;
				line-height: 30px;
				margin: 15px 4% 0 0;
				text-align: center;
				border-radius: 10%;
				background: #fff;
				box-sizing: border-box;
				i {
					margin-right: 5px;
				}
				&:last-child {
					color: #e60012;
					width: 13%;
					margin-right: 0;
				}
			}
		}
		.active {
			color: #e60012;
			pointer-events: none;
		}
	}
	.reviews-box {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 200;
		width: 100%;
		height: 100px;
		padding: 2% 8% 5%; 
		background: #F6F6F6;
		box-sizing: border-box;
		.header {
			width: 100%;
			padding-bottom: 5px;
			text-align: center;
			span {
				color: #000;
				&:first-child {
					float: left;
				}
				&:last-child {
					float: right;
					color: #333;
					pointer-events: none;
					&.active {
						pointer-events: auto;
						color: #e60012;
					}
				}
			}
		}
		.body {
			textarea {
				min-height: 40px;
				width: 100%;
				padding: 2%;
				font-size: 14px;
				border-radius: 5%;
				border: 2px solid #F6F6F6;
				background: #fff;
				box-sizing: border-box;
				resize: none;
				box-shadow: none;
			}
		}
	}
	.slide-fade-down-enter-active, .slide-fade-down-leave-active  {
		transition: all 1s ease-in;
	}
	.slide-fade-down-enter, .slide-fade-down-leave-to{
		transform: translate3d(0, 100px, 0);
	}

	.slide-fade-right-enter-active, .slide-fade-right-leave-active  {
		transition: all 1s ease-in;
	}
	.slide-fade-right-enter, .slide-fade-right-leave-to{
		transform: translate3d(100%, 0, 0);
	}
	
	.comment-box {
		position: fixed;
		top: 40px;
		bottom: 50px;
		right: 0;
		width: 80%;
		overflow-y: auto;
		background: #F6F6F6;
		.mask {
			position: fixed;
			display: block;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, .5);
			z-index: 100;
		}
		.comment-main {
			position: relative;
			z-index: 100;
			section {
				min-height: 80px;
				padding: 2%;
				background: #fff;
				overflow: hidden;
				text-align: left;
				font-size: 14px;
				border-bottom: 2px solid #F6F6F6;
				box-sizing: border-box;
				.reviews-author {
					float: left;
					width: 25%;
					height: 80px;
					padding-left: 4%;
					margin-right: 2%;
					color: #333;
					box-sizing: border-box;
				}
				.reviews-body {
					min-height: 80px;
					overflow: hidden;
					.reviews-content {
						min-height: 40px;
					}
					p {
						&:first-child span {
							color: #e60012;
						}
						&:last-child {
							font-size: 12px;
						}
					}
				}
			}
		}
	}
	@media screen and  (min-width: 1000px) {
		.comment-box {
			top: 100px;
			bottom: 60px;
			.comment-main {
				section {
					font-size: 32px;
					.reviews-body {
						p {
							&:last-child {
								font-size: 24px;
							}
						}
					}
				}
			}
		}
	}
	#qrcode {
		position: relative;
		.mask {
			position: fixed;
			display: block;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.4);
			z-index: 10;
		}
		#qrcode-content {
			position: fixed;
			left: 50%;
			top: 50%;
			padding: 15px;
			text-align: center;
			background: #fff;
			z-index: 100;
			transform: translate3d(-50%, -50%, 0);
			&:after {
				content: '扫一扫上面的二维码图案';
				display: block;
				padding-top: 10px;

			}
		}
	}
</style>