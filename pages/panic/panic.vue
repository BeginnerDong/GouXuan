<template>
	<view>

		<div class="bg1 radiu20 search">
			<div class="color1 font10 ilblock" style="line-height: 30px; position: relative; left: 140px;">
				<img src="/static/images/home-icon13.png" style="width: 15px; margin-right: 15px;" />
				搜索
			</div>
		</div>
		<div class="list-text">
			<div class="color2 font14">[预约]郑州黄河谷温泉度假酒店套票 <div class="color1 font13 flo-right" 
			@click="webSelf.$Router.navigateTo({route:{path:'/pages/panic-second/panic-second'}})">点击查看
					<img src="/static/images/home-icon9.png" style="width: 6px; margin-left: 6px;" />
				</div></div>
			<div class="color2 font14">B(199抢购)</div>
		</div>
		
		<button @click="webSelf.$Router.navigateTo({route:{path:'/pages/status/status'}})"><div class="color5 font13" style="line-height: 50px;">自助查码</div></button>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData:[]
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
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
					type:2
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.orderGet(postData, callback);
			},

			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	.home {
		border-bottom: solid 1px #EDEDED;
	}

	.search {
		width: 90%;
		height: 30px;
		margin: 15px auto;
	}

	.list-text {
		width: 100%;
		height: 70px;
		background: #fff;
		border-bottom: solid 1px #EDEDED;
		padding: 8px 15px;
		line-height: 26px;
	}

	button {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0px;
		background: #F67550;
		border-radius: 0;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
