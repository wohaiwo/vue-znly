<template>
	<div>
		<div class="list-tpl">
			<ul class="list-item">
				<li v-for="item in items">
					<router-link  :to="{name: 'listDetail', params: {id: item.id, identifier: identifier}}">
						<img :src="item.imageUrl">
					</router-link>
					<aside>
						<h3>{{ item.title }}</h3>
						<p>{{  item.description }}</p>
					</aside>
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
			}
		}
	}		
</script>
<style scoped lang="scss">
	.list-tpl {
		margin-top: 60px;
		.list-item {
			margin: 10px auto;
			box-shadow: 0px 0px 1px solid #333;
			list-style: none;
			li {
				display: inline-block;
				width: 94%;
				padding: 4px 2%;
				margin: 2% 3%;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, .5);
				box-sizing: border-box;
				overflow: hidden;
				a {
					float: left;
					width: 40vw;
					height: 30vw;
					margin-right: 2%;
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
						font-size: 16px;
						padding: 2px 0 5px 0;
						color: #595757;
					}
					p {
						margin-bottom: 8px;
						font-size: 12px;
						color: #999;
						line-height: 1.5;
						text-align: justify;
					}
				}
			}
		}	
	}
</style>
