<template>
	<div>
		<div class="list-tpl">
			<ul class="list-item">
				<li v-for="item in items">
			    	<router-link :to="{name: 'listDetail', params: {id: item.id, identifier: identifier}}">
						<div class="list-image"  :to="{name: 'listDetail', params: {id: item.id, type: type, identifier: identifier}}">
							<img :src="item.imageUrl">
						</div>
						<aside >
							<h3>{{ item.title }}</h3>
							<article>{{  item.description }}</article>
						</aside>
	                </router-link>
				</li>
			</ul>
	    </div>
	</div>
</template>

<script>
	export default {
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
						height: 12vh;
						font-size: 14px;
						color: #000;
						line-height: 1.5;
						text-align: justify;
					}
				}
			}
		}	
	}
</style>