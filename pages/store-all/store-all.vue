<template>
	<view>
	
		<div class="nav-top" style="line-height: 40px;font-size: 11px;">
			
			<div class="ilblock top-list"  @click="tab('1')" :class="currentId == 1?'top-list-star':''">
				<div  :class="currentId == 1?'color6':'color1'">待使用/待发货</div>
			</div>
			<div class="ilblock top-list"  @click="tab('2')" :class="currentId == 2?'top-list-star':''">
				<div :class="currentId == 2?'color6':'color1'">已发货</div>
			</div>
			<div class="ilblock top-list"  @click="tab('3')" :class="currentId == 3?'top-list-star':''">
				<div  :class="currentId == 3?'color6':'color1'">已完结/已核销</div>
			</div>
			<div class="ilblock top-list " @click="tab('0')" :class="currentId == 0?'top-list-star':''">
				<div  :class="currentId == 0?'color6':'color1'">其他</div>
			</div>
		</div>
		<div class="storebox bg1" style="height: auto;" v-for="(item,index) in mainData">
			<div class="storebox-top">
				<div class="font12 color1 ilblock">
					交易时间：{{item.create_time}}
				</div>	
			</div>
			<div class="storebox-btm" :data-id="item.products[0].product_id" @click="webSelf.$Router.navigateTo({route:{path:'/pages/recommend/recommend?id='+$event.currentTarget.dataset.id}})">
				<div class="ilblock img-box">
					<img :src="item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.product.mainImg[0]?item.products[0].snap_product.product.mainImg[0].url:''" />
				</div>
				<div class="ilblock imgname">
					<div class="font14 color2 overflow2" style="line-height: 21px; height: 45px;">
						{{item.products[0]&&item.products[0].snap_product&&item.products[0].snap_product.product?item.products[0].snap_product.product.title:''}}
					</div>
					<div class="ilblock" style="color: rgb(249,138,72); font-size: 11px; margin-top: 16px;">￥<span style="font-size: 20px;">{{item.price}}</span> </div>
				</div>
			</div>
			
			<div v-if="item.qrData.length>0" style="margin-top: 20px;border-top: 1px solid gray;">
				<div :data-id="item.id" @click="open($event.currentTarget.dataset.id)">{{openId!=item.id?'展开':'收起'}}</div>
				<div style="width: 100%;margin-top: 5px;display: flex;flex-wrap: wrap;">
					
					<div  v-for="(c_item,c_index) in item.qrData" style="width:100%;text-align: center;"> 
						<div v-if="c_index==0" style="display: flex;">
							
							<div style="width: 35%;text-align: center;">
								<image :src="c_item.url" style="width: 100px;height: 100px;" @click="tapZoom(c_item.url)"></image>
								<div style="color: red;">点击放大</div>
							</div>
							<div>
								<div style="height: 28px;line-height: 28px;">{{c_item.message}}({{c_item.behavior==1?'未核销':'已核销'}})</div>
								<div>核销码：{{c_item.check_code}}</div>
								<div style="height: 28px;" v-if="c_item.book_time&&item.products[0].snap_product.product.isreserve==1">
									<div style="height: 28px;">您预约的时间</div>
									<div style="height: 28px;">{{c_item.book_time}}</div>
								</div>
								<div style="display: flex;height: 28px;" v-if="!c_item.book_time&&item.products[0].snap_product.product.isreserve==1">
									<div style="height: 28px;margin-right: 5px;">请选时间</div>
									<div style="height: 28px;">
										<ruiDatePicker
											fields="day"
											start="2010-00-00"
											end="2030-12-30"
											:otherData="{'index':index,'c_index':c_index}"
											:value="c_item.book_time"
											@change="bindChange"
											@cancel="bindCancel"
										></ruiDatePicker>
									</div>
									
								</div>
								<div v-if="!c_item.book_time&&item.products[0].snap_product.product.isreserve==1" :data-index="index" :data-c_index="c_index" @click="book($event.currentTarget.dataset.index,$event.currentTarget.dataset.c_index)" style="width: 57px;line-height: 16px;height: 18px;font-size: 12px;text-align: -webkit-center;border-radius: 15%;color: white;background: #FF895A;">
									立即预约
								</div>
								
							</div>
						</div>
						<div v-if="c_index>0&&openId==item.id" style="display: flex;">
							
							<div style="width: 35%;text-align: center;">
								<image :src="c_item.url" style="width: 100px;height: 100px;" @click="tapZoom(c_item.url)"></image>
								<div style="color: red;">点击放大</div>
							</div>
							<div>
								<div style="height: 28px;line-height: 28px;">{{c_item.message}}({{c_item.behavior==1?'未核销':'已核销'}})</div>
								<div>核销码：{{c_item.check_code}}</div>
								<div style="height: 28px;" v-if="c_item.book_time&&item.products[0].snap_product.product.isreserve==1">
									<div style="height: 28px;">您预约的时间</div>
									<div style="height: 28px;">{{c_item.book_time}}</div>
								</div>
								<div style="display: flex;height: 28px;" v-if="!c_item.book_time&&item.products[0].snap_product.product.isreserve==1">
									<div style="height: 28px;margin-right: 5px;">请选时间</div>
									
									<div style="height: 28px;">
										<ruiDatePicker
											fields="day"
											start="2010-00-00"
											end="2030-12-30"
											:otherData="{'index':index,'c_index':c_index}"
											:value="c_item.book_time"
											@change="bindChange"
											@cancel="bindCancel"
										></ruiDatePicker>
									</div>
									
								</div>
								<div v-if="!c_item.book_time&&item.products[0].snap_product.product.isreserve==1" :data-index="index" :data-c_index="c_index" @click="book($event.currentTarget.dataset.index,$event.currentTarget.dataset.c_index)" style="width: 57px;line-height: 16px;height: 18px;font-size: 12px;text-align: -webkit-center;border-radius: 15%;color: white;background: #FF895A;">
									立即预约
								</div>
								
							</div>						
						</div>	
						
					</div>
					
				</div>
			</div>
			<view style="clear: both;"></view>
		</div>
		<div class="box-c" v-if="mainData.length==0">
			<div style="margin-top: 100px; margin-left: 140px;">
				<img src="../../static/images/logo1.png" style="width: 90px;"/>
			</div>
			<div class="color1 font15" style="text-align: center; margin-top: 30px;">你还没有这个订单状态</div>
		</div>
		<view class="fixd" v-if="tapShow">
			<view class="fixd-box" >
				<image :src="tapUrl"  mode=""></image>
			</view>
			<view style="text-align: center;" @click="closeTap">
				<image src="../../static/images/icon3.png" style="width: 40rpx;height: 40rpx;" ></image>
			</view>
		</view>
	</view>
</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	export default {
		components: {
			ruiDatePicker
		},
		data() {
			return {
				currentId: 0,
				isLoadAll:false,
				mainData: [],
				searchItem:{
					pay_status:1,
					transport_status:0
				},
				tapShow:false,
				tapUrl:'',
				webSelf:this,
				openId:0,
			}
		},
		onLoad(options) {
			const self = this;
			self.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
			if(options.num){
				self.tab(options.num)
			}else{
				self.$Utils.loadAll(['getMainData'], self)
			}
		},
		
		onReachBottom() {
		
			const self = this;
			if (!self.isLoadAll) {
				console.log('11',self.paginate.currentPage);
				self.paginate.currentPage++;
				console.log('22',self.paginate.currentPage);
				self.getMainData()
			};
		},
		
		methods: {
			
			
			book(index,c_index){
				const self = this;
				if(self.mainData[index]['qrData'][c_index].book_time){
					return;
				};
				if(self.mainData[index]['qrData'][c_index].newBookTime==''){
					self.$Utils.showToast('请选择预约日期','none');
					return;
				};
				const postData = {
					tokenFuncName:'getProjectToken',
					searchItem:{
						id:self.mainData[index]['qrData'][c_index].id
					},
					data:{
						book_time:self.mainData[index]['qrData'][c_index].newBookTime
					}
				};
				const callback = (res) => {
					if (res.solely_code==100000) {
						self.$Utils.showToast('选择成功','none');
						self.mainData[index]['qrData'][c_index].book_time = self.mainData[index]['qrData'][c_index].newBookTime;	
					}else{
						self.$Utils.showToast(res.msg,'none');
					};
				};
				self.$apis.qrCodeUpdate(postData, callback);	
				
				console.log('book',index)
			},
			
			bindChange(e){
				const self = this;
				self.mainData[e[1].index]['qrData'][e[1].c_index].newBookTime = e[0];
				console.log('bindChange',e)
			},
			
			bindCancel(e){
				console.log('bindCancel',e)
			},
			
			open(id){
				const self = this;
				console.log('open',id);
				if(self.openId==id){
					self.openId = 0;
				}else{
					self.openId = id;
				};
				
				
			},
			
			tapZoom(url){
				const self = this;
				self.tapShow = true;
				self.tapUrl = url;
				console.log('tapZoom')	
			},	
			closeTap(){
				const self = this;
				self.tapShow = false;
				self.tapUrl = '';
				console.log('closeTap')	
			},
			
			getMainData(isNew) {
				const self = this;	
				if(isNew){
					self.$Utils.clearPageIndex(self)
				};
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.paginate = self.$Utils.cloneForm(self.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.user_no= uni.getStorageSync('user_no');			
				postData.order = {
					create_time: 'desc'
				};
				
				postData.getAfter = {
					qrData: {
						tableName: 'Qrcode',
						middleKey: 'order_no',
						key: 'order_no',
						condition: '=',
						searchItem: {
							status: 1
						}
					}
				};	
				const callback = (res) => {
					if (res.solely_code == 100000) {
						if (res.info.data.length > 0) {
							self.mainData.push.apply(self.mainData, res.info.data);
						} else {
							self.isLoadAll = true;
						
						};
					} else {
						self.$Utils.showToast('网络故障','none')
					};
					self.$Utils.finishFunc('getMainData');
					console.log('getMainData', self.mainData)
				};
				self.$apis.orderGet(postData, callback);
			},
					
					
					
			tab(currentId) {
				const self = this;
				self.currentId = currentId;
				
				if (currentId == '0') {
					self.searchItem = {
						order_step:2
					};
				} else if (currentId == '1') {
					self.searchItem = {
						pay_status:1,
						transport_status:0
					};
				} else if (currentId == '2') {
					self.searchItem = {
						pay_status:1,
			
						transport_status:1
					};
				} else if (currentId == '3') {
					self.searchItem = {
						pay_status:1,
						transport_status:2
					};
				};
			
				self.getMainData(true);
			
			},
		}
	}
</script>

<style>
	@import "../../assets/style/store.css";
	@import "../../assets/style/basic.css";
</style>
