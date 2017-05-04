<template>
	<div>
		<transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
    </div>
</template>

<script>
	import './static/lib/css/main.css'
	import './static/lib/css/reset.css'
  	export default {
    	
  	}

</script>

<style lang="scss">

	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}

	.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(100px, 0, 0);
        opacity: 0;
    }
</style>

