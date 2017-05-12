<template>
	<div>
		<div class="list-tpl" >
			<ul v-if="!isApp" class="list-item">
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
			<ul v-if="isApp" class="list-item">
				<li v-for="item in items" @click="showQRCode(item.qrCode)">
					<div class="list-image">
						<img :src="item.imageUrl">
					</div>
					<aside >
						<h3>{{ item.title }}</h3>
						<article>{{ item.description }}</article>
						<a :href="shopUrl" target="_blank">去预订</a>
					</aside>
				</li>
			</ul>
	    </div>
	    <div v-if="isShowQrBox" id="qrcode" @click="closeQrcodeBox"></div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import '../static/lib/js/jquery.qrcode.min.js';
	export default {
		data() {
			return {
				isApp: false,				// 判断是否使用不同的遍历模块， true => 调出二维码模板
				isShowQrBox: false
			}
		},
		props: ['identifier', 'items', 'type'],
		created() {
			// 在listTpl页面中 只在预订门票和特色购物里面调出而二维码
	        if(this.type == 13 || this.type == 14){
		        let isApp = window.localStorage ? localStorage.getItem('isApp') : Cookie.read('isApp');
		        if(isApp == 'true') {
		        	this.isApp = true;
		        }
	        }
		},
		methods: {
			showQRCode(url) {
				this.isShowQrBox = true;
				jQuery('#qrcode').empty();
				Vue.nextTick(function() {
					jQuery('#qrcode').qrcode(url);
				})
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
			li a {
				display: inline-block;
				width: 100%;
				padding: 2%;
				margin-bottom: 10px;
				overflow: hidden;
				box-sizing: border-box;
				background: #fff;
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
					max-height: 30vw;
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
				}
			}
		}
	}
	#qrcode {
		position: absolute;
		width: 300px;
		height: 340px;
		left: 50%;
		top: 50%;
		z-index: 100;
		text-align: center;
		padding-top: 50px;
		background: #fff;
		border: 1px solid #ddd;
		transform: translate3d(-50%, -50%, 0);
		box-sizing: border-box;
	}
	@media screen and (min-width: 1000px) {
		.list-tpl {
			margin-top: 100px;
			.list-item {
				li a {
					aside {
						h3 {
							font-size: 38px;
						}
						article {
							font-size: 32px;
						}
					}
				}
			}
		}
	}
</style>