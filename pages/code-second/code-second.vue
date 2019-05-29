<template>
	<div>

		<!-- 		<img style="width: 300px;height:500px;" :src="url" />
		<div class="ilblock">
			<div class="color2 font14" style="position: relative; top: 3px;">长按二维码看购买详情</div>
			<div class="color2 font14" style="position: relative; top: 17px;">购选</div>
		</div>
		<div class="ilblock" style="position: relative; left: 42px;">
			<img src="/static/images/达人/Talent%20show-img.png" style="width: 85px;" />
		</div>
		<button type="primary" @click="drawCanvasBgImg">test</button> -->
		<div id="poster" style="z-index:0">
			<div class="img">
				<img class="img-one" :src="mainData.mainImg&&mainData.mainImg[index]?mainData.mainImg[index].url:''" style="width:100%;height:100%" />
				<!-- <img class="img-one" src="../../static/images/达人/img2.png" /> -->
			</div>
			<div class="ilblock imgb">
				<img :src="QrData.url" />
				<!-- <img src="../../static/images/达人/img8.png" /> -->
			</div>
			<div class="ilblock">
				<div class="color2 font14" style="position: relative; top: 3px;">长按二维码看购买详情</div>
				<div class="color2 font14" style="position: relative; top: 17px;">购选</div>
			</div>
			<div class="ilblock" style="position: relative; left: 42px;">
				<img src="../../static/images/Talent-show-img.png" style="width: 85px;" />
			</div>
		</div>
		<!-- <div style="z-index:1;width:100%;height:100%;background: #fff;position: absolute;top: 0;"></div> -->
		<div style="z-index:2;width:100%;height:100%;position: absolute;top: 0;" @click="webSelf.$Router.navigateTo({route:{path:'/pages/register/register?parent_no=U123456'}})">
			<img :src="url" style="width:100%;height:100%" />
		</div>
	</div>

</template>

<script>
	import html2canvas from '@/common/html2canvas.js';
	export default {

		data() {
			return {
				mainData: [],
				QrData: [],
				index: '',
				url: '',
				webSelf: this
			}
		},
		onLoad(options) {
			const self = this;

			self.$Utils.loadAll(['getMainData'], self)
			var options = self.$Utils.getHashParameters();
			console.log('options', options)
			self.index = options[0].index



		},
		methods: {

			/* 			drawCanvasBgImg () {
							var vm = this;
							var canvas = document.createElement("canvas");
							var ctx = canvas.getContext("2d");
							var clientWidth = document.body.clientWidth;  //获取屏幕宽度用于canvas宽度自适应移动端屏幕
							var dpr = window.devicePixelRatio;
							ctx.globalCompositeOperation = "source-atop";//** 坑锯齿感觉没什么用不知道是不是用错地方了 **
							canvas.width = dpr * clientWidth;  //由于手机屏幕时retina屏，都会多倍渲染，用dpr来动态设置画布宽高，避免图片模糊
							canvas.height = dpr * clientWidth * 609 / 375;//去掉微信头部的状态栏应该是603 没搞懂603还是不能让图片满屏直接多加到了609
							var img = new Image();
							img.crossOrigin = '';//死坑的图片跨域 （img.crossOrigin = "Anonymous"这种写法还是不能显示base64格式图片）
							img.src = "/static/images/tt.png";
							img.onload = function () {
								ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
								vm.drawCanvasUserImg(canvas, ctx, dpr);
							}
						},
						
						drawCanvasUserImg: function (canvas, ctx, dpr) {
							var self = this;
							var circleR = 50 * dpr;//半径
							var circleX = canvas.width / 2;//圆心X坐标
							var circleY = 50 * dpr;//圆心Y坐标
							var imgX = circleX - circleR;//图片X开始坐标
							var imgY = circleY - circleR;//图片Y开始坐标
							var imgWidth = 3 * circleR;//图片按圆形大小
							var img = new Image();
							img.crossOrigin = '';
							img.src = '/static/images/ttq.png';
							img.onload = function () {
								ctx.save(); // 保存当前ctx的状态
								//ctx.arc(circleX, circleY, circleR, 0, 2 * Math.PI); //画出圆
								ctx.rect(circleX,circleY,imgWidth,imgWidth);
								ctx.clip(); //裁剪上面的圆形
								ctx.drawImage(img, imgX, imgY, imgWidth, imgWidth); // 在刚刚裁剪的园上画图
								ctx.restore(); // 还原状态
								self.url = canvas.toDataURL("image/jpeg");//png有毒在安卓机下识别二维码无法跳转
							}
						}, */


			getMainData() {
				const self = this;
				const postData = {};
				postData.searchItem = {
					title: '达人注册海报',
					thirdapp_id: self.$AssetsConfig.thirdapp_id,
				};
				const callback = (res) => {
					console.log(1000, res);
					if (res.info.data.length > 0) {
						self.mainData = res.info.data[0];
					};
					self.getQrData()
				};
				self.$apis.labelGet(postData, callback);
			},

			getQrData() {
				const self = this;
				const postData = {};
				postData.tokenFuncName = 'getProjectToken';
				postData.param = 'http://www.local-scanner.com/wx/#/pages/register/register?parent_no=' + uni.getStorageSync('info')
					.user_no;
				postData.ext = 'png';
				const callback = (res) => {
					console.log(res);
					self.QrData = res.info;
					console.log(9990, self.QrData)
					html2canvas(document.getElementById("poster"), {
						width: 375,
						height: 667
					}, {
						allowTaint: true
					}).then(function(canvas) {
						var imgUrl = canvas.toDataURL();
						self.url = imgUrl;
						console.log('self.url', self.url)
					});
					self.$Utils.finishFunc('getMainData');
				};
				self.$apis.getQrCommonCode(postData, callback);
			},
		}
	}
</script>

<style>
	@import "../../assets/style/public.css";
	@import "../../assets/style/code-first.css";

	@import "../../assets/style/bootstrap.css";
	@import "../../assets/style/basic.css";
</style>
