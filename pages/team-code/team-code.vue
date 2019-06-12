<template>
	<view class="body">

		<div class="color2 font15" style="text-align: center; margin: 25px 0px 20px; font-weight: bolder; ">
			点击生成专属海报后，长按可保存或发送
		</div>
		<div class="bg1" style="width: 100%; padding: 20px 0px; border-radius: 8px;display: flex;flex-wrap: wrap;">
			<div  style="width:46%;margin: 5px 1%;" v-for="(item,index) in mainData.mainImg"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/code-second/code-second?index='+index}})">
				<img style="width:100%;height:100%" :src="item.url" />
			</div>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData:[],
				webSelf:this
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)
		
		},
		methods: {
		
		
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					title: '达人注册海报',
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	body {
		background: #fff;
	}
</style>
