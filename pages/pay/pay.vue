<template>
	<view>
		<div class="describe">
			<div class="color3">订单描述</div>
			<div class="color2">
				{{mainData&&mainData.product?mainData.product.title:''}}
			</div>
			<div>
				<div class="ilblock" style="margin-top: 10px; width: 19%; float: left; color: #858585;background: #EFEFEF; border-radius: 20px; padding: 3px 15px;">规格</div>
				<div class="ilblock color3" style="width: 78%; float: left; margin-left: 7px;line-height: 20px;"> {{mainData.title}}：{{mainData.price}}元</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="describe">
			<div class="color3">订单联系人</div>
			<div style="line-height: 30px;margin-top: 15px;padding-bottom: 6px; border-bottom: solid 1px #F5F5F5;">
				<div class="ilblock">
					<span style="color: red; font-weight: bolder;">*</span>姓名：
				</div>
				<input style="width: 80%;border: none; " placeholder="请输入姓名" v-model="submitData.name" />
			</div>
			<div style="line-height:30px;margin-top: 15px;" class="ilblock">
				<span style="color: red; font-weight: bolder;">*</span>手机：
			</div>
			<input style="width: 80%; border: none; " placeholder="请输入手机号" v-model="submitData.phone" />
		</div>
		<div class="describe">
			<div style="line-height: 30px;padding-bottom: 10px; border-bottom: solid 1px #F5F5F5;">
				<div class="ilblock">
					购买数量：
				</div>
				<div class="ilblock" style="color: #B2B2B2;">
					<button style="border: solid 1px #E3E3E3; background: #fff; width: 30px;font-size: 30px; position: relative;
					top: 6px;"
					 class="ilblock" type="button" @click="counter('-')">-</button>
					<span style="display: inline-block; border: solid 1px #E3E3E3;width: 50px;position: relative;left: -5px;top: -1px;text-align: center;color:#FF9E71 ; ">{{count}}</span>
					<button @click="counter('+')" style="border: solid 1px #E3E3E3;position: relative;top: 4px;left: -10px; background: #fff; width: 30px;font-size: 26px;"
					 class="ilblock" type="button">+</button>
				</div>
			</div>
			<div style="line-height:30px;margin-top: 15px;" class="ilblock">
				备注：
			</div>
			<input style="width: 80%; border: none; " placeholder="请输入备注" v-model="submitData.remark" />
		</div>
		<div class="describe" style="margin-bottom: 80px;">
			<div style="line-height: 30px;margin-top: 15px;padding-bottom: 6px; border-bottom: solid 1px #F5F5F5;">
				<div class="ilblock">
					支付方式：
				</div>
				<div class="ilblock color2" style="float: right; line-height: 20px;">
					微信支付<img src="/static/images/home-icon9.png" style="height: 11px;margin-left: 10px;margin-bottom: 2px; " />
				</div>
			</div>
			<div style="line-height:30px;margin-top: 15px;" class="ilblock">
				优惠券：
			</div>
			<div class="ilblock color3" style="float: right;line-height: 57px;">
				暂无优惠券<img src="/static/images/home-icon9.png" style="height: 11px;margin-left: 10px;margin-bottom: 2px; " />
			</div>
		</div>
		<div class="foter-fixd">
			<div class="ilblock" style="background: #3E3E3E;width: 67%;height: 100%;color: #EDEDED; text-align: center;font-size: 13px;">
				<span style="font-size: 12px;">合计：</span>{{price}}
			</div>
			<div class="ilblock" style="background: #F98A48;width:33%; color: #FDE1D3; text-align: center;" @click="webSelf.$Utils.stopMultiClick(addOrder)">
				微信支付
			</div>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData: [],
				submitData: {
					name: '',
					phone: '',
					remark: ''
				},
				count: 1,
				webSelf:this,
				price:'',
				orderId:''
			}
		},
		onLoad(options) {
			const self = this;
			self.id = options.id;
			self.$Utils.loadAll(['getMainData'], self)

		},
		methods: {

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					id: self.id
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.count = 1;
						self.price = self.mainData.price
					}
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.skuGet(postData, callback);
			},

			counter(type) {
				const self = this;

				if (type == '+') {
					self.count++;
				} else {
					if (self.count > 1) {
						self.count--;
					}
				};
				self.price = (self.count*self.mainData.price).toFixed(2);
				console.log('self.mainData', self.mainData)
			},

			addOrder(e) {
				const self = this;
				if (self.orderId != '') {
					
					self.pay();
					return
				};
				if(self.submitData.name==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写姓名')
					return
				};
				if(self.submitData.phone==''){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请填写电话')
					return
				};
				const postData = {
					tokenFuncName:'getProjectToken',
					orderList: [{
						sku: [{
							id: self.mainData.id,
							count: self.count,
						}]
					}],
					type: 2,
					data: {
						phone:self.submitData.phone,
						name:self.submitData.name,
						remark:self.submitData.remark
					},
				};
				const callback = (res) => {
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.pay(self.orderId)
					} else {
						self.$Utils.showToast(res.msg);
					};
				};
				self.$apis.addOrder(postData, callback);
			},

			pay(order_id) {

				const self = this;

				const postData = {



					wxPay: {
						price: self.price
					}

				};

				postData.tokenFuncName='getProjectToken',

				postData.searchItem = {
					id: self.orderId
				};
				postData.payAfter = [];
				postData.payAfter.push({
					tableName: 'FlowLog',
					FuncName: 'add',
					data: {
						count: self.mainData.shop_reward,
						trade_info: '店返',
						user_no: uni.getStorageSync('user_no'),
						type: 2,
						thirdapp_id: 2,
						relation_id: self.mainData.id
					}
				});
				/* if (self.distriData.length > 0) {
					var transitionArray = self.distriData;
					for (var i = 0; i < transitionArray.length; i++) {

						if (transitionArray[i].level == 1) {
							postData.payAfter.push({
								tableName: 'FlowLog',
								FuncName: 'add',
								data: {
									count: self.mainData.first_class,
									trade_info: '下级返佣',
									user_no: transitionArray[i].parent_no,
									type: 2,
									thirdapp_id: 2,
									relation_user: localStorage.getItem('user_no'),
									relation_id: self.mainData.id
								}
							});
						} else if (transitionArray[i].level == 2) {
							postData.payAfter.push({
								tableName: 'FlowLog',
								FuncName: 'add',
								data: {
									count: self.mainData.second_class,
									trade_info: '下级返佣',
									user_no: transitionArray[i].parent_no,
									type: 2,
									thirdapp_id: getApp().globalData.thirdapp_id,
									relation_user: localStorage.getItem('user_no'),
									relation_id: self.mainData.id
								}
							});
						};
					};
				}; */
				const callback = (res) => {
					console.log(res)
					if (res.solely_code == 100000) {


						if (res.info) {
							const payCallback = (payData) => {
								if (payData == 1) {
									const cc_callback = () => {
										self.$Utils.showToast('支付成功','none');

									};

								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							self.$Utils.showToast('支付成功','none');

						};
					} else {
						self.$Utils.showToast(res.msg, 'none');
					};
				};
				self.$apis.pay(postData, callback);
			},

		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/pay.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
