<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="../../static/images/home-icon14.png" />
			</span>
			抢购预约
		</div>
		<div class="bg1" style="padding: 15px; border-bottom: solid 1px #F4F4F4;">
			<div class="color2" style="font-size: 18px;">[预约]郑州黄河谷温泉度假酒店套票</div>
			<div class="color2" style="font-size: 18px;">B(199抢购)</div>
			<div class="color1 font13" style="margin-top: 10px;">消费地址：河南省郑州市汇集去江山路北端健康食醋打死uiu三块电池是</div>
		</div>
		<div class="bg1" style="padding: 15px; border-bottom: solid 1px #F4F4F4;">
			<div style="height:50px; text-align: center; line-height: 50px;">
				<div class="ilblock" style="width: 49%;"><span class="color77">产品详情</span></div>
				<div class="ilblock" style="width: 49%;"><span class="color22">日历预约</span></div>
			</div>
			<div class="color2 font10" style="clear: both; margin-top:12px ; ">产品详情</div>
		</div>
		<div class="middle bg2">
			<div class="color2">
				<div class="color2 font15">
					<span class="color8">抢购日期：</span>即日-2019年5月2日
				</div>
				<div class="color2 font15">
					<span class="color8">使用日期：</span>内容内容内容内容内容内容内容内容内容
				</div>
				<div class="color2 font15">
					<span class="color8">使用日期：</span>内容内容内容内容内容内容内容内容内容
				</div>
				<div>
					<div class="color2">套票A包含:</div>
					<ol>
						<li>内容内容内容内容内容内容</li>
						<li>内容内容内容内容内容内容</li>
						<li>内容内容内容内容内容内容</li>
					</ol>
				</div>
				<div>
					<div class="color2">套票A包含:</div>
					<ol>
						<li>内容内容内容内容内容内容</li>
						<li>内容内容内容内容内容内容</li>
						<li>内容内容内容内容内容内容</li>
					</ol>
				</div>
				<div style="color: #FD4545;">
					*内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
				</div>
				<div>
					<div class="color2">酒店及温泉营业时间:<span class="color1">24小时营业</span></div>
					<ul style="list-style-type: sidama;">
						<li>酒店及温泉营业时间:<span class="color1">24小时营业</span></li>
						<li>酒店及温泉营业时间:<span class="color1">24小时营业</span></li>
						<li>酒店及温泉营业时间:<span class="color1">24小时营业</span></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="color2" style="margin-left: 15px;">日历预约</div>
		<div style="width: 100%; padding: 15px;">
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
			<div class="img-time ilblock" style="text-align: center;">
				<div class="color1" style="font-size: 9px;">4月-23(周三)</div>
				<div class="color7 font12" style="margin-top: 16px;">剩5</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {

		data() {
			return {


			}
		},
		onLoad(options) {
			const self = this;
			/* self.$Utils.loadAll(['getMainData', 'getLabelData', 'getCaseData'], self) */

		},
		methods: {
			test($event) {
				var testres = this.getCaseData()
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					thirdapp_id: self.$Config.solely_thirdapp_id
				};
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							title: ['=', ['推荐阅读']],
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				const callback = (res) => {
					if (res.info.data.length > 0) {
						self.mainData.push.apply(self.mainData, res.info.data);
						if (self.mainData.length > 2) {
							self.mainData = self.mainData.slice(0, 2)
						}
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.articleGet(postData, callback);
			},

			getLabelData(isNew) {
				var self = this;
				if (isNew) {
					self.$Utils.clearPageIndex(self)
				};
				var postData = {};
				postData.paginate = self.$Utils.cloneForm(self.$AssetsConfig.paginate);
				postData.searchItem = {
					type: 1,
					thirdapp_id: 21,
					parentid: 2
				};
				var callback = function(res) {
					if (res.info.data.length > 0) {
						self.labelData.push.apply(self.labelData, res.info.data)
					}
					for (var i = 0; i < res.info.data.length; i++) {
						self.menu_array.push(res.info.data[i].id)
					};
					self.$Utils.finishFunc('getLabelData');
					//self.getCaseData();
				};
				console.log('self.$apis', self.$apis)
				self.$apis.labelGet(postData, callback);
			},


			getSliderData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					title: '首页轮播',
					thirdapp_id: self.$Config.solely_thirdapp_id
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.swiperData = res.info.data[0]['mainImg'];
					};
					self.$Utils.finishFunc('getSliderData');
				};
				self.$apis.labelGet(postData, callback);
			},
			getCaseData() {
				var self = this;
				var postData = {};
				postData.searchItem = {
					thirdapp_id: getApp().globalData.solely_thirdapp_id
				}
				postData.getBefore = {
					caseData: {
						tableName: 'Label',
						searchItem: {
							parentid: ['in', [146]]
						},
						middleKey: 'menu_id',
						key: 'id',
						condition: 'in',
					},
				};
				var callback = (res) => {
					console.log('self.caseData.res', res);
					if (res.info.data.length > 0) {
						self.caseData.push.apply(self.caseData, res.info.data)
						if (res.info.data.length > 4) {
							self.caseData = self.caseData.slice(0, 4)
						}
					};
					self.$Utils.finishFunc('getCaseData');
				};


				self.$apis.articleGet(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";
	
	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";

	body {
		background: #fff;
	}

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
	}

	.color77 {
		color: #FF895A;
		border-bottom: solid 2px #FF895A;
		padding-bottom: 7px;
	}

	.color22 {
		color: rgb(34, 34, 34);
		border-bottom: solid 2px #fff;
		padding-bottom: 7px;
	}

	.middle {
		width: 92%;
		margin: 5px auto;
		padding: 10px;
		border-radius: 8px;
		text-align: justify;
		line-height: 25px;
	}

	.color8 {
		color: #3C3C3C;
	}

	ol {
		margin-left: 15px;
	}

	ul {
		margin-left: 20px;
		list-style-type: disc;
	}

	.img-time {
		border: solid 1px red;
		width: 81px;
		height: 60px;
		background: url(/static/images/wximg4.png) no-repeat;
		background-size: 100%;
		margin-left: 2px;
		margin-top: 3px;
		
	}
</style>
