<template>
    <div>
	    <v-header goBack="true" :headTitle="title"></v-header>
	    <div class="content">
			<iframe scrolling="yes" :src="url" frameborder="0" >
			</iframe>
	    </div>
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
	};
	</script>


<style scoped lang="scss">
	
		.content {
			position: fixed;
			left: 0;
			right: 0;
			top: 100px;
			bottom: 0;
			iframe {
				height: 100%;
				width: 100%;
			}
		}

</style>