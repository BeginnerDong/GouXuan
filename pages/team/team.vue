<template>
	<view>


		<div class="bg1" style="padding-top:25px;padding-bottom:25px;">




			<div style="text-align: center;">
				<canvas canvas-id="canvasLineB" id="canvasLineB" :style="{'width':cWidth2+'px','height':cHeight2+'px'}"
				 disable-scroll=true class="charts-rotate" @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
			</div>

			<div style="width: 100%; margin-top: 30px;padding-left: 15px;padding-right: 15px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					团队总营业额
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{totalTurnover}}</div>
			</div>
			<div style="width: 100%; margin-top: 10px;padding-left: 15px;padding-right: 15px;">
				<div class="color2 font15 ilblock" style="width: 38%;">
					团队总奖励
				</div>
				<div class="ilblock" style="color: rgb(49,160,254); font-size: 20px;">{{totalReward}}</div>
			</div>
		</div>
		<div style="margin-top: 10px;width: 100%;">

			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/order-search/order-search'}})" class="color2 font14 bg1"
			 style="height: 52px;width: 100%; line-height: 52px;border-bottom: solid 1px #E9E9E9;">
				<div class="ilblock color2 font14 btm-list">团队订单</div>
				<div class="ilblock color1 font14 list">共{{teamOrderData.length}}单
					<image src="../../static/images/home-icon9.png"></image>
				</div>
			</div>


			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/groupReturn/groupReturn'}})" class="color2 font14 bg1"
			 style="height: 52px;width: 100%; line-height: 52px;border-bottom: solid 1px #E9E9E9;">
				<div class="ilblock color2 font14 btm-list">达人团队奖励</div>
				<div class="ilblock color1 font14 list">
					<image src="../../static/images/home-icon9.png"></image>
				</div>
			</div>


			<div @click="webSelf.$Router.navigateTo({route:{path:'/pages/team-team/team-team'}})" class="color2 font14 bg1"
			 style="height: 52px;width: 100%; line-height: 52px;">
				<div class="ilblock color2 font14 btm-list">达人团队</div>
				<view class="list ilblock">
					<image src="../../static/images/home-icon9.png"></image>
				</view>
			</div>

		</div>
		<button @click="webSelf.$Router.navigateTo({route:{path:'/pages/team-code/team-code'}})" class="color5" style="font-size:14px;;background: #FB8448;width:80%;height: 35px;line-height: 35px;border-radius: 20px; margin: 20px auto 100px;">
			邀请达人
		</button>




		<view class="navbar-brand">
			<view style="margin-top: 10px;">
				<view class="navbar-item ilblock" @click="webSelf.$Router.navigateTo({route:{path:'/pages/doyen/doyen'}})">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show1.png"></image>
					</view>
					<view>达人</view>
				</view>
				<view class="navbar-item ilblock">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show2-a.png"></image>
					</view>
					<view class="color8">达人团队</view>
				</view>
				<view class="navbar-item ilblock" @click="webSelf.$Router.navigateTo({route:{path:'/pages/return/return'}})">
					<view class="navbar-img">
						<image src="../../static/images/Talent%20show3.png"></image>
					</view>
					<view>返佣</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/common/u-charts.js';
	var canvaLineB = null;
	export default {

		data() {
			return {
				teamOrderData:[],
				mainData:[],
				webSelf: this,
				cWidth2: '', //横屏图表
				cHeight2: '', //横屏图表
				pixelRatio: 1,
				LineB: {
					categories: ['本月数据'],
					series: [{
						name: "团队营业额",
						data: [0]
					}, {
						name: "团队总奖励",
						data: [0]
					}]
				},
				turnoverCount:0,
				totalTurnover:0,
				totalReward:0
			}
		},
		onLoad(options) {
			const self = this;
			var documentWidth = document.body.clientWidth;
			this.cWidth2 = parseInt(documentWidth * 0.9);
			this.cHeight2 = parseInt(documentWidth * 0.9 * 0.7);
			this.showLineB('canvasLineB', this.LineB)
			self.$Utils.loadAll(['getMainData','getTotalTurnover','getTotalReward','teamOrder'], self)

		},
		methods: {

			touchMix(e) {
				canvaLineB.scrollStart(e);
			},
			moveMix(e) {
				canvaLineB.scroll(e);
			},
			touchEndMix(e) {
				canvaLineB.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineB.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},

			getMainData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				
				const callback = (res) => {
					if (res.length > 0) {
						self.mainData.push.apply(self.mainData, res);
						console.log('self.mainData',self.mainData)
						console.log('self.lineB',self.LineB)
						for (var i = 0; i < self.mainData.length; i++) {
							self.LineB.categories.push(self.mainData[i].date);
							self.LineB.series[0].data.push(self.mainData[i].turnover);
							self.LineB.series[1].data.push(self.mainData[i].reward);
						}
						console.log('self.LineB',self.LineB)
						console.log('self.LineC',self.LineC)
					};
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.monthFlow(postData, callback);
			},
						
			getTotalTurnover() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data={
					behavior:1
				};
				const callback = (res) => {
					self.totalTurnover = res;
					self.$Utils.finishFunc('getTotalTurnover');
				};
				self.$apis.teamTotal(postData, callback);
			},
			
			getTotalReward() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.data={
					behavior:2
				};
				const callback = (res) => {
					self.totalReward = res;
					self.$Utils.finishFunc('getTotalReward');
				};
				self.$apis.teamTotal(postData, callback);
			},
			
			teamOrder() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				const callback = (res) => {
					if(res.info.data.length>0){
						self.teamOrderData.push.apply(self.teamOrderData,res.info.data)
					}
					self.$Utils.finishFunc('teamOrder');
				};
				self.$apis.teamOrder(postData, callback);
			},
			

			showLineB(canvasId, chartData) {
				canvaLineB = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'line',
					legend: false,
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					rotate: false, //开启图表横屏
					// #ifdef MP-ALIPAY
					rotateLock: true, //百度及支付宝需要锁定旋转
					// #endif
					categories: chartData.categories,
					animation: false,
					series: chartData.series,
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						itemCount: 5,
						scrollShow: true,
						scrollAlign: 'right'
					},
					yAxis: {
						//disabled:true
					},
					width: this.cWidth2,
					height: this.cHeight2,


				});
			},





		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/index.css";

	.charts-rotate {
		background-color: #FFFFFF;
	}

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

	.btm-list {
		box-sizing: border-box;
		padding: 0px 15px;
	}

	.list image {
		width: 6px;
		height: 12px;
		margin-left: 10px;
	}

	.list {
		float: right;
		margin-right: 15px;
	}

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
