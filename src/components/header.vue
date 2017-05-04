<template>
	<header>
		<slot name="logo"></slot>
		<span class="head-goback" v-if="goBack" @click="$router.go(-1)">
			<i title="返回" class="iconfont">&#xe679;</i>
        </span>
        <span class="title-text" v-if="headTitle">{{headTitle}}</span>
	</header>
	
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		props: ['goBack', 'headTitle'],
	}
</script>
<style scoped lang="scss">
	header {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 40px;
		line-height: 40px;
		
		color: #595757;
		background: #fff ;
		text-align: center;
		box-shadow: 0 2px 5px 2px rgba(0, 0, 0, .3);
		box-sizing: border-box;
		span {
			font-size: 18px;
			font-weight: bold;	
		}
		.head-goback {
			position: absolute;
			left: 4%;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>