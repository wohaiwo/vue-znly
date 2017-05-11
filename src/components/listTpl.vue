<template>
	<div>
		<div class="list-tpl" >
			<ul v-if="!isApp" class="list-item">
				<li v-for="item in items">
			    	<router-link :to="{name: 'listDetail', params: {id: item.id, type: 1, identifier: identifier}}">
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
				isApp: false,
				isShowQrBox: false
			}
		},
		props: {
			identifier: {
				type: String,
				default: '0'     // 景点介绍 default => 1 旅行百宝箱 default => 0
			},
			items: {
				type: Array,
				default: []
			},
			type: {
				type: String
			}
		},
		created() {
	        if(this.identifier == 1) {
	        	this.isApp = false;
	        } else {
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
			li {
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
</style>