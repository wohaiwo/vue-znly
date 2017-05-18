<template>
    <div>
	    <v-header goBack="true" :headTitle="title"></v-header>	
		<iframe :src="url" frameborder="0">
		</iframe>
    </div>
</template>

<script>
	import vHeader from '../components/header.vue';
	export default {
		data() {
			return {
				url: '',
				title: ''
			}
		},
		created() {
			this.$data.url = this.$route.params.url;
			this.$data.title = this.$route.params.title;
		},
		components: {
			vHeader
		}
	}
</script>

<style scoped lang="scss">
	div {
		width: 100%;
		overflow: hidden;	
		iframe {
			width: 100%;
			height: 100vh;
			margin-top: 40px;
		}
	}
	@media screen and (min-width: 1000px) {
		div {
			iframe {
				margin-top: 100px;
			}
		}
	}
</style>