<template>
	<view>
		<div class="describe">
			<div class="color3">订单描述</div>
			<div class="color2">
				{{mainData&&mainData.title?mainData.title:''}}
			</div>
			<div>
				<div class="ilblock" style="margin-top: 10px; width: 19%; float: left; color: #858585;background: #EFEFEF; border-radius: 20px; padding: 3px 15px;">规格</div>
				<div class="ilblock color3" style="width: 78%; float: left; margin-left: 7px;line-height: 20px;"> {{mainData&&mainData.sku?mainData.sku[0].title:''}}：{{mainData&&mainData.sku?mainData.sku[0].price:''}}元</div>
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
		<div class="describe" >
			<div style="line-height: 30px;margin-top: 15px;padding-bottom: 6px; border-bottom: solid 1px #F5F5F5;">
				<div class="ilblock">
					支付方式：
				</div>
				<div class="ilblock color2" style="float: right; line-height: 20px;">
					微信支付
				</div>
			</div>
			<div>
				<div v-if="mainData.type==1" style="line-height:30px;margin-top: 15px;" class="ilblock">
					请选择地址：
				</div>
				<div  class="ilblock color3" style="float: right;line-height: 57px;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/address/address'}})">
					{{addressData.id>0?'地址':'请选择地址'}}<img src="../../static/images/home-icon9.png" style="height: 11px;margin-left: 10px;margin-bottom: 2px; " />
				</div>
				<div style="position: relative;margin-bottom: 15px;" >
					<div  style="font-size: 15px;margin-top: 15px;">{{addressData.name}}  {{addressData.phone}}</div>
					<div style="margin-top: 15px;">
						<text  style="font-size: 12px;">{{addressData.city}}  {{addressData.detail}}</text>
					</div>
					
				</div>
			</div>
			
			<div>
				<div style="line-height:30px;margin-top: 15px;" class="ilblock">
					优惠券：
				</div>
				<div  class="ilblock color3" style="float: right;line-height: 57px;">
					{{couponData.length>0?'请选择优惠券':'暂无优惠券'}}<img src="../../static/images/home-icon9.png" style="height: 11px;margin-left: 10px;margin-bottom: 2px; " />
				</div>
				<div style="position: relative;margin-bottom: 15px;"  v-for="item in couponData" @click="chooseCoupon(item.id)" :style="webSelf.$Utils.inArray(item.id,chooseCouponId)!=-1?'border-right:2px solid red':''">
					<img style="width:300px;height: 90px;" src="../../static/images/微信图片_20190428143903.png" />
					<span  style="position:absolute;left:130px;top:30px;font-size: 20px;color:red">{{item.discount}}</span>
					<span  style="margin-top: 10px;font-size: 12px;color:gray">购满{{item.condition}}元即可使用</span>
				</div>
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
				orderId:'',
				getBefore:{},
				getAfter:{},
				couponData:[],
				addressData:{},
				chooseCouponId:[]
			}
		},
		onLoad(options) {
			const self = this;
			var options = self.$Utils.getHashParameters();
			console.log('options',options)
			self.id = options[0].id;
			self.type = options[0].type;
			if(self.type==1){
				self.getBefore = {
					sku: {
						tableName: 'Sku',
						searchItem: {
							id:['in',[self.id]]
						},
						middleKey: 'product_no',
						key: 'product_no',
						condition: 'in',
					}
				},
				self.getAfter = {
					sku: {
						tableName: 'Sku',
						searchItem: {
							status:1,
							id:self.id
						},
						middleKey: 'product_no',
						key: 'product_no',
						condition: 'in',
					},
				}
			}else if(self.type==2){
				self.getBefore = {
					date: {
						tableName: 'SkuDate',
						searchItem: {
							id:['in',[self.id]]
						},
						middleKey: 'product_no',
						key: 'product_no',
						condition: 'in',
					},
				},
				self.getAfter = {
					sku: {
						tableName: 'SkuDate',
						searchItem: {
							status:1,
							id:self.id
						},
						middleKey: 'product_no',
						key: 'product_no',
						condition: 'in',
					},
				}
			}
			self.$Utils.loadAll(['getMainData'], self)

		},
		onShow(){
			this.addressData = uni.getStorageSync('choosedAddressData');
		},
		methods: {
			
			
			chooseCoupon(id){
				const self = this;
				var nowLength = self.chooseCouponId.indexOf(id);
				if(nowLength!=-1){
					self.chooseCouponId.splice(nowLength,1)
				}else{
					self.chooseCouponId.push(id)
				};
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
				};
				postData.getBefore = self.$Utils.cloneForm(self.getBefore);
				postData.getAfter = self.$Utils.cloneForm(self.getAfter);
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
						self.count = 1;
						self.price = self.mainData.sku[0].price
					};
					self.getCouponData();
					if(self.mainData.type==1){
						self.getAddressData();
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
			
			getCouponData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.searchItem = {};
				postData.searchItem.type = 1;
				postData.searchItem.use_step = 1;
				postData.searchItem.condition = ['<',parseFloat(self.price)];
				postData.order = {
					create_time: 'desc'
				};
				const callback = (res) => {
					
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.couponData.push.apply(self.couponData, res.info.data);
						};
					} else {
						self.$Utils.showToast(res.msg, 'none')
					};
					self.$Utils.finishFunc('getCouponData')
				};
				self.$apis.userCouponGet(postData, callback);
			},
			
			getAddressData() {
				const self = this;
				
				const postData = {};
				postData.searchItem = {isdefault:1};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.addressData = res.info.data[0];
						uni.setStorageSync('choosedAddressData',res.info.data[0]);
					}else{
						self.addressData = {};
						uni.setStorageSync('choosedAddressData','');
					}
					self.$Utils.finishFunc('getAddressData');
				};
				self.$apis.addressGet(postData, callback);
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
				console.log('self.mainData.type',self.mainData.type);
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
				
				if(self.mainData.type==1&&!uni.getStorageSync('choosedAddressData')){
					uni.setStorageSync('canClick', true);
					self.$Utils.showToast('请选择地址')
					return
				};
			
				var orderList =  [];
				if(self.mainData.type==1){
					orderList.push(
						{
							sku: [{
								id: self.mainData.sku[0].id,
								count: self.count,
								data:{
									parent_no:uni.getStorageSync('url_parent_no')
								}
							}]
						}
					)
				}else if(self.mainData.type==2){
					orderList.push(
						{
							date: [{
								id: self.mainData.sku[0].id,
								count: self.count,
								data:{
									parent_no:uni.getStorageSync('url_parent_no')
								}
							}]
						}
					)
				};
				const postData = {
					tokenFuncName:'getProjectToken',
					orderList: orderList,
					type: self.mainData.type,
					data: {
						phone:self.submitData.phone,
						name:self.submitData.name,
						remark:self.submitData.remark,
						shop_no:self.mainData.user_no,
						province_id:self.mainData.province_id,
					},
				};
				
				if(uni.getStorageSync('url_parent_no')){
					postData.data.parent_no = uni.getStorageSync('url_parent_no');
				};
				
				const callback = (res) => {
					
					if (res && res.solely_code == 100000) {
						self.orderId = res.info.id;
						self.pay(self.orderId)
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: '下单失败',
							duration: 2000
						});
					};
				};
				self.$apis.addOrder(postData, callback);
			},

			pay(order_id) {
				const self = this;
				var price = parseFloat(self.price);
				var wxPay = 0;
				var couponPay = 0;
				const postData = {};
				if(self.chooseCouponId.length>0){
					postData.coupon = [];
					for(var i=0;i<self.couponData.length;i++){
						if(self.chooseCouponId.indexOf(self.couponData[i].id)!=-1){
							if(price-couponPay<parseFloat(self.couponData[i].discount)){
								postData.coupon.push({
									id: self.couponData[i].id,
									price: price-couponPay,
								});
								break;
							}else{
								postData.coupon.push({
									id: self.couponData[i].id,
									price: self.couponData[i].discount,
								});
							};
						}
					};
				};
				if(price-couponPay>0){
					postData.wxPay = {
						price:price-couponPay
					};
				};
				postData.tokenFuncName='getProjectToken',
				postData.searchItem = {
					id: self.orderId
				};
				postData.payAfter = [];
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info) {
							const payCallback = (payData) => {
								console.log('payData',payData)
								if (payData == 1) {
									uni.showToast({
										title: '支付成功',
										duration: 2000,
										success:function(){
											self.$Router.reLaunch({route:{path:'/pages/user/user'}})
										}
									});
								}else{
									uni.showToast({
										title: '支付失败',
										duration: 2000
									});
								};
							};
							self.$Utils.realPay(res.info, payCallback);
						} else {
							uni.showToast({
								title: '支付完成',
								duration: 2000
							});
						};
					} else {
						uni.setStorageSync('canClick', true);
						uni.showToast({
							title: '支付参数有误',
							duration: 2000
						});
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
