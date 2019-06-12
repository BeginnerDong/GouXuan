<template>
	<view>
		<div class="bg1 nav-top">
			<div class="nav-list ilblock " @click="menuClick" :data-num='0' :class="num==0?'list-one':''">
				可使用
			</div>
			<div class="nav-list ilblock" @click="menuClick" :data-num='1' :class="num==1?'list-one':''">
				已使用
			</div>
			<div class="nav-list ilblock" @click="menuClick" :data-num='2' :class="num==2?'list-one':''">
				已作废
			</div>
		</div>
		<div class="box bg1" v-for="item in mainData" v-if="mainData.length>0">
			<img v-if="num==0" src="../../static/images/wximg2.png" />
			<img v-else src="../../static/images/wximg1.png" />
			<span class="money1">{{item.discount}}</span>
			<span class="money2">购满{{item.condition}}元即可使用</span>
		</div>
		<div class="box-c" v-if="mainData.length==0">
			<div style="margin-top: 100px; margin-left: 140px;">
				<img src="../../static/images/img3.png" style="width: 90px;" />
			</div>
			<div class="color1 font15" style="text-align: center; margin-top: 30px;">暂无本地捕手券!</div>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				num:0,
				mainData:[],
				searchItem:{	
				},
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
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.type = 1;

				postData.order = {
					create_time: 'desc'
				}
				const callback = (res) => {
					self.$Utils.finishFunc('getMainData')
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.mainData.push.apply(self.mainData, res.info.data);
							for (var i = 0; i < self.mainData.length; i++) {
								self.mainData[i].create_time = self.mainData[i].create_time.substring(0, 10);
					
							}
						}
					} else {
						self.$Utils.showToast(res.msg, 'none')
					}
					
				}
				self.$apis.userCouponGet(postData, callback);
			},




			menuClick(e) {
				const self = this;
				console.log(e)
				self.num = e.currentTarget.dataset.num;
				console.log(self.num )
				self.changeSearch(self.num);
			},

			changeSearch(num) {
				const self = this;
				console.log('num',num)
				self.searchItem = {};
				if (num == '0') {
					self.searchItem.use_step = 1;
				} else if (num == '1') {
					self.searchItem.use_step = 2;
				} else if (num == '2') {
					self.searchItem.use_step = -1;
				};
				self.mainData = [];
				self.getMainData();
			},

		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/coupon.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
