<template>
	<view class="html bg1">
		<div class="content-more more-top">
			<div class="content-top color2">关注内容</div>
			<div class="ilblock" v-for="item in chooseData">{{item.title}} </div>
		</div>
		<div class="content-more">
			<div class="content-top color2" style="border: none;">更多内容</div>
			<div class="ilblock" v-for="(item,index) in mainData" @click="select(index)" 
			:style="webSelf.$Utils.inArray(item.id,follow)!=-1?'background: linear-gradient(to right,#FF9B5C,#FF6160);color:#fff':''">{{item.title}}</div>
		</div>
		<button class="buttonB" @click="webSelf.$Utils.stopMultiClick(userInfoUpdate)">确认</button>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				mainData: [],
				follow: [],
				chooseData:[],
				searchItem:{},
				webSelf:this,
				userData:[]
			}
		},
		onLoad(options) {
			const self = this;
			self.$Utils.loadAll(['getMainData','getUserInfoData'], self)
		},

		methods: {
			
			getUserInfoData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.userData=res.info.data[0],
						self.follow = self.userData.follow;
						self.searchItem.id = ['in', self.follow];
						self.getChooseData()
					};
					self.$Utils.finishFunc('getUserInfoData');
				};
				self.$apis.userInfoGet(postData, callback);
			},
			
			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					thirdapp_id: 2,
					type: 3
				};
				postData.getBefore = {
					city: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['商品类别']],
						},
						middleKey: 'parentid',
						key: 'id',
						condition: 'in',
					},
				};
				postData.order = {
					id: 'asc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.labelGet(postData, callback);
			},

			getChooseData() {
				const self = this;
				const postData = {};
				postData.searchItem = self.$Utils.cloneForm(self.searchItem);
				postData.searchItem.type =3;
				postData.order = {
					id:'asc'
				};
				console.log('postData', postData)
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.chooseData.push.apply(self.chooseData, res.info.data);
					};
					
					self.$Utils.finishFunc('getChooseData');
				};
				self.$apis.labelGet(postData, callback);
			},
			
			userInfoUpdate() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data = {
					follow:self.follow
				};
				console.log('postData', postData)
				const callback = (res) => {
					if(res.solely_code==100000){
						self.$Utils.showToast('加入成功','none');
						self.$Router.navigateTo({route:{path:'/pages/follow/follow'}})
					}else{
						api.showToast(res.msg,'none')
					}		
				};
				self.$apis.userInfoUpdate(postData, callback);
			},

		

			select(index) {
				const self = this;
				console.log('index',index);
				var id = self.mainData[index].id;
				var position = self.follow.indexOf(id);
				if (position >= 0) {
					self.follow.splice(position, 1);
					self.chooseData.splice(position,1)
				} else {
					self.follow.push(id);
					self.chooseData.push(self.mainData[index])
				};
				self.searchItem.id = ['in', self.follow];
				/* if (self.follow.length == 0) {
					delete self.searchItem.id
				}; */
				
			},

		}
	}
</script>

<style>
	@import "../../assets/style/follow-content.css";

	.buttonB {
		text-align: center;
		width: 345px;
		margin: 80px auto;
		border-radius: 20px;
		height: 40px;
		color: #fff;
		background: linear-gradient(to right, #FF9B5C, #FF6160) !important;
		font-size: 14px;
		line-height: 40px;
	}

	page {
		background: #fff;
	}

	@import "../../assets/style/public.css";


	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
