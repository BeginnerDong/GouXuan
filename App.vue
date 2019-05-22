<script>
	import token from "./common/token.js"
	export default {
		onLaunch: function() {
			console.log('App Launch');
			//token.getWxToken();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/assets/style/public.css";
	/*每个页面公共css */
</style>
