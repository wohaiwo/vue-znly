<template>
	<div>
		<div class="list-tpl" >
			<ul v-if="!isType" class="list-item">
				<li v-for="item in items">
			    	<router-link :to="{name: 'listDetail', params: {id: item.id, type: type, identifier: identifier}}">
						<div class="list-image">
							<img :src="item.imageUrl">
						</div>
						<aside >
							<h3>{{ item.title }}</h3>
							<article>{{  item.description }}</article>
						</aside>
	                </router-link>
				</li>
			</ul>

			<ul v-if="isType" class="list-item">
				<li v-for="item in items">
					<div class="list-image">
						<img :src="item.imageUrl">
					</div>
					<aside >
						<h3>{{ item.title }}</h3>
						<article>{{ item.description }}</article>
						<router-link class="jump-url" v-if="!isApp" :to="{name: 'dropBox', params: {url: item.jumpUrl, title: item.title}}">去预订</router-link>
						<a class="jump-url" v-if="isApp" @click="showQRCode(item.qrCode)">去预订</a>
					</aside>
				</li>
			</ul>
	    </div>
	    <div v-if="isShowQrBox" id="qrcode" @click="closeQrcodeBox">
	    	<div class="mask"></div>
	    	<div id="qrcode-content"></div>
	    </div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import '../static/lib/js/jquery.qrcode.min.js';
	import dropBox from './dropBox.vue';
	export default {
		data() {
			return {
				isApp: false,				// 判断是否使用不同的遍历模块， true => 调出二维码模板
				isType: false, 				// 当type = 13 || 14时，显示去预定的模板
				isShowQrBox: false
			}
		},
		props: ['identifier', 'items', 'type'],
		created() {
			// 在listTpl页面中 只在预订门票和特色购物里面调出而二维码
	        if(this.type == 13 || this.type == 14){
	        	this.isType = true;
	        	// 判断是否是园区一体机
	        	let isApp = window.localStorage ? localStorage.getItem('isApp') : Cookie.read('isApp');
				if(isApp == 'true') {
					this.isApp = true;
				}
	        }
		},
		compontents: {
			dropBox
		},
		methods: {
			showQRCode(url) {
				this.isShowQrBox = true;
				jQuery('#qrcode #qrcode-content').empty();
				Vue.nextTick(function() {
					jQuery('#qrcode #qrcode-content').qrcode(url);
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
	.list-tpl {
		margin-top: 45px;
		.list-item {
			margin: 10px auto;
			list-style: none;
			height: 100vh;
			overflow: auto;
			background: #EDEDED;	
			li {
				display: inline-block;
				width: 100%;
				padding: 2%;
				margin-bottom: 10px;
				overflow: hidden;
				box-sizing: border-box;
				background: #fff;
				a {
					display:inline-block;
				}
				.list-image {
					float: left;
					width: 30vw;
					height: 30vw;
					margin-right: 3vw;
					box-sizing: border-box;
					img {
						width: 100%;
						height: 100%;	
					}
				}
				aside {
					position: relative;
					min-height: 30vw;
					font-size: 14px;
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
					box-sizing: border-box;
					h3 {
						color: #CD1940;
						padding: 2px 0 5px 0;
						font-size: 16px;
						font-weight: bold;
					}
					article {
						font-size: 14px;
						color: #000;
						line-height: 1.4;
						text-align: justify;
					}
			        .jump-url {
				        position: absolute;
				        right: 0;
				        bottom: 0;
			            width: 60px;
			            height: 30px;
			            line-height: 30px;
			            text-align: center;
			            color: #FFF;
			            background: #e60012;
			            box-sizing: border-box;
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

	@media screen and (min-width: 1000px) {
		.list-tpl {
			margin-top: 100px;
			.list-item {
				li {
					aside {
						h3 {
							font-size: 38px;
						}
						article {
							font-size: 32px;
						}
						.jump-url {
					        position: absolute;
					        right: 0;
					        bottom: 0;
				            width: 120px;
				            height: 60px;
				            line-height: 60px;
				            text-align: center;
				            color: #FFF;
				            font-size: 24px;
				            background: #e60012;
				            box-sizing: border-box;
				        }
					}
				}
			}
		}
	}
</style>