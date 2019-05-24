<script>
	import token from "./common/token.js"
	export default {
		onLaunch: function() {
			
		
			
			
			
			if(location.search){
				var arr = location.search.substr(1).split('&');
			}else if(location.hash&&location.hash .split('?')[1]){
				var arr = location.hash .split('?')[1].split('&');
				var hash = location.hash .split('?')[0]
			}else{
				var arr = [];
			};
		  
			var params = {}
			for (var i = 0; i < arr.length; i++) {
				var data = arr[i].split('=')
				if (data.length === 2) {
				  params[data[0]] = data[1]
				};
			};
			
			token.getProjectToken();
			

			
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
