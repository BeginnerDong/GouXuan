import http from "./http.js";
import config from "@/config/index.config.js";


export default {

	SkuDateGet(param, callback) {
		var allParams = {
			url: 'Common/SkuDate/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},
	
	labelGet(param, callback) {
		var allParams = {
			url: 'Common/Label/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	tokenGet(param, callback) {
		var allParams = {
			url: 'Project/Solely/getToken',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	articleGet(param, callback) {
		var allParams = {
			url: 'Common/Article/get',
			type: 'post',
			noToken: true,
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userGet(param, callback) {
		var allParams = {
			url: 'Base/User/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userInfoGet(param, callback) {
		var allParams = {
			url: 'Common/UserInfo/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userInfoUpdate(param, callback) {
		var allParams = {
			url: 'Common/UserInfo/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	productGet(param, callback) {
		var allParams = {
			url: 'Common/Product/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	getQrCommonCode(param, callback) {
		var allParams = {
			url: 'Base/Qr/PHPQrGet',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	login(param, callback) {

		var allParams = {
			url: 'Func/Common/loginByUp',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	wechatGet(param, callback) {
		var allParams = {
			url: 'Common/Wechat/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	skuGet(param, callback) {
		var allParams = {
			url: 'Common/Sku/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressGet(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressUpdate(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressDelete(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	addressAdd(param, callback) {
		var allParams = {
			url: 'Common/UserAddress/add',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	userCouponGet(param, callback) {
		var allParams = {
			url: 'Common/UserCoupon/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	orderGet(param, callback) {
		var allParams = {
			url: 'Common/Order/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	orderUpdate(param, callback) {
		var allParams = {
			url: 'Common/Order/update',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	orderDelete(param, callback) {
		var allParams = {
			url: 'Common/Order/delete',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},



	addOrder(param, callback) {
		var allParams = {
			url: 'Func/Order/addOrder',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	pay(param, callback) {
		var allParams = {
			url: 'Base/Pay/pay',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

	flowLogGet(param, callback) {
		var allParams = {
			url: 'Common/FlowLog/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},



	orderGet(param, callback) {
		var allParams = {
			url: 'Common/Order/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},



	distriGet(param, callback) {
		var allParams = {
			url: 'Common/Distribution/get',
			type: 'post',
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		http.HTTP(allParams);
	},

}
