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
			<img :src="num==0?'/static/images/微信图片_20190428143903.png':'/static/images/微信图片_20190428143848.png'" />
			<span class="money1">20</span>
			<span class="money2">购满89元即可使用</span>
		</div>
		
		<div class="box-c" v-if="mainData.length==0">
			<div style="margin-top: 100px; margin-left: 140px;">
				<img src="/static/images/达人/img3.png" style="width: 90px;" />
			</div>
			<div class="color1 font15" style="text-align: center; margin-top: 30px;">暂无购选券!</div>
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
				postData.searchItem.type = ['in', [1, 2]];
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
								self.mainData[i].invalid_time = self.$Utils.timestampToTime(self.mainData[i].invalid_time);
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
				self.changeSearch(self.num);
			},

			changeSearch(num) {
				const self = this;
				self.searchItem = {};
				if (num == '0') {

				} else if (num == '1') {
					self.searchItem.use_step = 2
				} else if (num == '2') {
					self.searchItem.use_step = -1
				}
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
