<template>
	<view class="body">	
		<div class="color2 font14 top bg1" style="margin: 15px 0px 20px;">
			<div style="padding-left: 6%;">
				<ol style="list-style-type:decimal;">
					<li>选择海报后，长按海报</li>
					<li>发送还给微信好友或保存海报分享到朋友圈</li>
					<li>内容内容内容内容内容内容内容内容</li>
				</ol>
			</div>
			<div style="color: #FE986F; text-align: center;">
				<div class="ilblock flo-left font10" style="width: 50%;">识别海报二维码</div>
				<div class="ilblock flo-left font10" style="width: 50%;">成为您的客户</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="bg1" style="width: 100%; padding: 20px 0px; border-radius: 8px;display: flex;">
			<div class="ilblock" style="width:48%;margin: 0 2%;" v-for="(item,index) in mainData.mainImg"  @click="webSelf.$Router.navigateTo({route:{path:'/pages/code-first/code-first?index='+index}})">
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
					title: '达人锁粉海报',
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
	@import "../../assets/style/code.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	.body {
		padding: 0px 15px 15px;
	}

	.home {
		border-bottom: solid 1px #EEEEEE;
	}

	.top {
		border-radius: 8px;
		width: 100%;
		text-align: justify;
		padding: 15px 10px;

	}

	.img-one {
		width: 165px;
		height: 235x;
	}
</style>
