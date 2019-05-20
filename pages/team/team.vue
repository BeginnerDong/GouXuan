<template>
	<view>
		<div class="home color2">
			<span onclick="backk()">
				<img src="images/home-icon14.png" />
			</span>
			达人后台
		</div>

		<div class="bg1" style="padding-top:25px;padding-bottom:25px;">
			<div class="team-top" style="margin-left: 110px; margin-bottom: 4px;">
				<div class="font11 color2">4月11日</div>
				<div class="font11 color2">团队营业额</div>
				<div class="font11 color2">团队奖励0</div>
			</div>
			<div style="height: 159px; width: 2px;border-left: 2px solid #E7B568;margin-left: 142px;"></div>
			<div class="team-inlin">
				<div class="inlin inlin-a" style="width: 21px;"></div>
				<div class="inlin inlin-b"></div>
				<div class="inlin inlin-a"></div>
				<div class="inlin inlin-b"></div>
				<div class="inlin inlin-a"></div>
				<div class="inlin inlin-c"></div>
				<div class="inlin inlin-a"></div>
				<div class="inlin inlin-b"></div>
				<div class="inlin inlin-a"></div>
				<div class="inlin inlin-b"></div>
				<div class="inlin inlin-a"></div>
				<div class="inlin inlin-b"></div>
				<div class="inlin inlin-a"></div>
			</div>
			<div style="width: 100%; margin-top: 30px;padding-left: 15px;padding-right: 15px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					达人营业额
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">0.00</div>
			</div>
			<div style="width: 100%; margin-top: 10px;padding-left: 15px;padding-right: 15px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					达人粉丝总人数
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">0</div>
			</div>
		</div>
		<div class="bg1" style="margin-top: 10px;width: 100%;">
			<a href="order-search.html" class="color2">
				<div class="flo-left color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 251px;">团队订单</div>
					<div class="ilblock color1 font14" style="width: 100px; background: url(images/home-icon9.png) no-repeat 70px 18.5px;
					 background-size: 6%;
					 ">共0单</div>
				</div>
			</a>
			<a href="return-first.html" class="color2">
				<div class="flo-left color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;border-bottom: solid 1px #E9E9E9;">
					<div class="ilblock color2 font14" style="width: 304px;">达人团队奖励</div>
					<div class="ilblock color1 font14" style="width: 45px;"><img src="images/home-icon9.png" style="width: 6px;" />
					</div>
				</div>
			</a>
			<a href="team-team.html" class="color2">
				<div class="flo-left color2 font14" style="height: 52px;width: 100%; line-height: 52px;text-indent: 15px;">
					<div class="ilblock color2 font14">达人团队</div>
				</div>
			</a>
		</div>
		<button style="background: #FB8448;width:320px;height: 35px;border-radius: 20px; margin: 20px auto 100px;">
			<a class="color5" href="team-code.html">邀请达人(课邀请500人)</a>
		</button>




		<div class="navbar-brand">
			<ul>
				<li>
					<a href="doyen.html">
						<div class="navbar-img"><img src="images/达人/Talent%20show1.png" /></div>
						<div>达人</div>
					</a>
				</li>
				<li>
					<a href="team.html">
						<div class="navbar-img"><img src="images/达人/Talent%20show2-a.png" /> </div>
						<div style="color: #FC7C5D;">达人团队</div>
					</a>
				</li>
				<li><a href="return.html">
						<div class="navbar-img"><img src="images/达人/Talent%20show3.png" /></div>
						<div>返佣</div>
					</a></li>
			</ul>
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

	.team-inlin {
		width: 100%;
	}

	.inlin {
		display: inline;
		color: #B01313;
		float: left;
	}

	.inlin-a {
		height: 1px;
		border: solid 1px #B01313;
		width: 52px;
		position: relative;
		top: 5px;
	}

	.inlin-b {
		height: 6px;
		width: 6px;
		border-radius: 50%;
		border: solid 1px #B01313;
		position: relative;
		top: 3px;
	}

	.inlin-c {
		height: 12px;
		width: 12px;
		border-radius: 50%;
		border: solid 1px #B01313;
	}
</style>
