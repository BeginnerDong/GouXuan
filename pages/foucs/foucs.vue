<template>
	<view class="body" :style="'height:'+screenHeight+'px'" style="text-align: center;">	
		<img :src="url" style="width:300px;height:540px"/>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				id:'',
				webSelf:this,
				url:'',
				screenHeight:0
			}
		},
		onLoad(options) {
			const self = this;
			this.screenHeight = uni.getSystemInfoSync().screenHeight;
			var options = self.$Utils.getHashParameters();
			console.log(options)
			self.id = options[0].id
			self.$Utils.loadAll(['getMainData'], self)
		},
		
		methods: {


			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					id:self.id
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.url = res.info.data[0].mainImg[0].url;
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},
		
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/code.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	.body {
		width:100%;
		height:100%
	}


</style>
