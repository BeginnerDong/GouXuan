<template>
	<view>
		
		<div class="index-top">
			<div class="logo ilblock">
				<img src="/static/images/home-img1.png" /><span>购选</span>
			</div>
			<div class="logo-right">
				<div class="logo-right-span ilblock">陕西站</div>
				<span>
					<img src="/static/images/home-icon13.png" />
				</span>
			</div>
		</div>
		<div class="best-box ilblock" style="margin-left: 15px;" v-for="item in mainData">
			<div class="best-box-top">
				<img src="/static/images/home-img2.png"/>
				<div class="best-num ilblock">
					已售1235
				</div>
				<div class="best-time">
					距结束仅剩 <span>0 0</span> 天 <span>1 3</span> : <span>3 4</span> : <span>3 0</span>
				</div>
				<div class="best-time best-time2">
					【即将开售】
				</div>
			</div>
			<div class="best-text">
				[西安.牛脊梁]国家级森林公园，世界生物圈，世界生物圈保护区！仅298元=2大人1小孩仅298元=2大人1小孩
			</div>
			<div style="margin-left: 15px;">
				<div class="ilblock" style="font-size: 12px; color: rgb(249,138,72);">￥<span style="font-size: 20px;">298</span></div>
				<div class="ilblock best-moneyleft" v-if="item.skuDate.length>0">
					返佣具体以日期为准
				</div>	
				<div class="ilblock best-money1" v-if="item.skuDate.length==0">
					<span class="span1">店反</span>
					<span class="span2">￥23</span>
				</div>	
				<div class="ilblock best-money2" v-if="item.skuDate.length==0">
					<span class="span1">团反</span>
					<span class="span2">￥23</span>
				</div>	
			</div>
		</div>
		

	
		
		
		<div style="width: 100%; height: 65px;"></div>
		
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
			
				mainData: [],
				searchItem:{
					thirdapp_id:2,
					province_id:uni.getStorageSync('siteData').id
				},
				order:{
					listorder:'desc'
				}
			}
		},
		onLoad() {
			console.log(this.$Router)
			const self = this;
			var options = self.$Utils.getHashParameters();
			console.log('options',options)
			if(options.category_id){
				self.searchItem.category_id = options.category_id
			};
			if(options.city_id){
				self.searchItem.city_id = options.city_id
			};
			if(options.noSite&&options.noSite=='true'){
				delete self.searchItem.province_id 
			};
			if(options.order&&options.order=='sale_count'){
				self.order = {
					false_sale_count:'desc'
				}
			};
			self.now = Date.parse(new Date());
			self.$Utils.loadAll(['getMainData'], self)
		
		},
		methods: {
		
			
		
			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.order = self.$Utils.cloneForm(self.order);
				postData.getAfter = {
					skuDate: {
						tableName: 'SkuDate',
						middleKey: 'product_no',
						key: 'product_no',
						condition: '=',
						searchItem: {
							status: 1
						}
					}
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.productGet(postData, callback);
			},
		
			
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/more.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
