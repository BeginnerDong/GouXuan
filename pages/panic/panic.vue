<template>
	<view>

		<div class="bg1 radiu20 search">
			<input class="color1 font10 ilblock" style="line-height: 30px;width:79%;height:30px;padding: 0 15px;" placeholder="输入商品名称搜索"
			 v-model="title">
			<img src="../../static/images/home-icon13.png" style="width: 15px;height:15px;margin: 7.5px;float: right;" @click="search" />

			</input>
		</div>
		<div class="list-text" v-for="item in mainData">
			<div class="color2 font14">[预约]{{item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.product?item.products[0].snap_product.product.title:''}}
			</div>
			<div class="color1 font13" style="text-align: right;" :data-id="item.id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/panic-second/panic-second?id='+$event.currentTarget.dataset.id}})">点击查看
				<img src="../../static/images/home-icon9.png" style="width: 6px; margin-left: 6px;" />
			</div>

		</div>
		<div style="width:100%;height:50px"></div>
	<!-- 	<button @click="webSelf.$Router.navigateTo({route:{path:'/pages/status/status'}})">
			<div class="color5 font13" style="line-height: 50px;">自助查码</div>
		</button> -->
	</view>
</template>

<script>
	export default {

		data() {
			return {
				isLoadAll: false,
				mainData: [],
				webSelf: this,
				title: '',
				searchItem: {
					thirdapp_id: 2,
					type: 2,
					pay_status:1,
					order_step:['in',[0,3]]
				}
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					};
					
			var res = self.$Token.getProjectToken(function(){
				self.$Utils.loadAll(['getMainData'], self)
			});
			if(res){
				self.$Utils.loadAll(['getMainData'], self)
			};


		},

		onReachBottom() {
			console.log('onReachBottom')
			const self = this;
			if (!self.isLoadAll && uni.getStorageSync('loadAllArray')) {
				self.paginate.currentPage++;
				self.getMainData()
			};
		},

		onPullDownRefresh() {
			const self = this;
			console.log('refresh');
			uni.startPullDownRefresh();
			delete self.searchItem.product;
			self.getMainData(true);
		},

		methods: {

			search() {
				const self = this;
				if (self.title != '') {
					self.searchItem.product = self.title ;
					self.getMainData(true);
					self.title = ''
				} else {
					self.$Utils.showToast('请输入商品名称搜索', 'none')
				}
			},


			getMainData(isNew) {
				const self = this;
				
				if (isNew) {
					self.mainData = [];
					self.paginate = {
						count: 0,
						currentPage: 1,
						pagesize: 10,
						is_page: true,
					}
				};
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no = wx.getStorageSync('user_no');
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);

					} else {
						
						self.isLoadAll = true
					};
					setTimeout(function()
					{
					  uni.stopPullDownRefresh()
					},300);
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
