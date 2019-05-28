<template>
	<view>
		<div class="bg1 color2 font15" style="width: 100%; height: 50px;font-weight: bolder; line-height: 50px; padding-left: 15px;">
			自助服务
		</div>
		<div class="bg1" style="background: #fff; width: 100%;">
			<div class="ilblock list-img">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/status/status'}})">
					<div class="img">
						<img src="../../static/images/service-icon2.png" />
					</div>
					<div class="color2">找回电子码需求</div>
				</div>
			</div>
			<div class="ilblock list-img">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/panic/panic'}})">
					<div class="img">
						<img src="../../static/images/service-icon3.png" />
					</div>
					<div class="color2">预约使用</div>
				</div>
			</div>
			<div class="ilblock list-img">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/store-all/store-all'}})">
					<div class="img">
						<img src="../../static/images/service-icon4.png" />
					</div>
					<div class="color2">查看订单</div>
				</div>
			</div>
			<div class="ilblock list-img" style="border: none;">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/login/login'}})">
					<div class="img">
						<img src="../../static/images/wximg3.png" />
					</div>
					<div class="color2">商家入口</div>
				</div>
			</div>
			<div class="ilblock list-img" style="border: none;">
				<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/follow/follow'}})">
					<div class="img">
						<img src="../../static/images/service-icon5.png" />
					</div>
					<div class="color2">客服</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="bg1 color2 font15" style="border-bottom: solid 1px #EFEFEF;width: 100%; height: 50px;font-weight: bolder; line-height: 50px; padding-left: 15px;">
			常见问题
		</div>
		
		<div class="bg1">
			<div class="testlist-on" v-for="(item,index) in mainData">
				{{item.title}}<img :src="webSelf.$Utils.inArray(item.id,openArray)!=-1?'../../static/images/home-icon10.png':'../../static/images/home-icon10.png'" @click="show(item.id)"/>
				<div class="color2" style="line-height: 20px;" :style="webSelf.$Utils.inArray(item.id,openArray)!=-1?'':'display:none'">{{item.description}}</div>
			</div>
		</div>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				webSelf: this,
				mainData:[],
				openArray:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData'], self)

		},
		
		
		
		methods: {
			
		
			
			show(id){
				const self = this;
				var position = self.openArray.indexOf(id);
				if (position >= 0) {
					self.openArray.splice(position, 1)
				} else {
					self.openArray.push(id)
				};
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: self.$AssetsConfig.thirdapp_id
				};
				postData.getBefore = {
					question: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['常见问题']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					listorder: 'desc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						
					};
					console.log('self.mainData', self.mainData)
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";

	page {
		background: #fff;
	}

	.list-img {
		border-top: solid 1px #EFEFEF;
		width: 33.33%;
		float: left;
		text-align: center;
		height: 110px;
		background: #fff;
	}

	.img {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		overflow: hidden;
		margin: 25px auto 15px;
	}

	.img img {
		width: 46px;
		height: 46px;
	}

	.testlist {
		border-bottom: solid 1px #EFEFEF;
		font-size: 13px;
		color: rgb(102, 102, 102);
		height: 44px;
		line-height: 44px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.testlist img {
		width: 14px;
		float: right;
		margin-top: 15px;
	}

	.testlist-on {
		border-bottom: solid 1px #EFEFEF;
		font-size: 13px;
		color: rgb(102, 102, 102);
		line-height: 44px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.testlist-on img {
		width: 14px;
		float: right;
		margin-top: 15px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
