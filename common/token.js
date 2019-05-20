// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头
import config from "@/config/index.config.js";

class Token {
    g_params={};

    constructor(params) {
        this.g_params = params;
    }

    verify() { 
        var token = uni.getStorageSync('token');
        if (!token) {
            this.getUserInfo();
        };
    }
	
	getWeixinToken(callback){


        var param = this.GetRequest();
        console.log(param);
        if(param.code){
            var postData = {
                thirdapp_id:2,
                code:param.code,
            };
            var c_callback = (res)=>{
                console.log(res)
                if(res.token){
                    uni.setStorageSync('user_token',res.token);
                    uni.setStorageSync('user_no',res.info.user_no);
                    uni.setStorageSync('user_info',res.info);
                    callback&&callback();
                }else{
                    alert('获取token失败')
                };
            };  
            this.getWxauthToken(postData,c_callback);
        }else if(uni.getStorageSync('user_token')){
            callback&&callback();
        }else{
            var href =  window.location.href;
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7db54ed176405e24&redirect_uri='+
            encodeURIComponent(href)+'&response_type=code&scope=snsapi_userinfo';
        };
        
    } 
	
	getWxauthToken(param,callback) {
  
        
		uni.request({
		    url: config.baseUrl+'/Wxauth',
		    method:'POST',
		    data:param,
		    success:function(res){
		        console.log(res)
		        if(res.data&&res.data.solely_code==100000){  
		            if(callback){
		                callback && callback(res.data.token);
		            };      
		        }else{
		            uni.showToast({
		                title: '获取token失败',
		                icon: 'fail',
		                duration: 1000,
		                mask:true
		            });
		        };
		        
		        
		    }
		})
        
    }
    
    getEntranceToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('entrance_token')){
            var params = {
                token_name:'entrance_token',
                info_name:'entrance_info',
                thirdapp_id:22
            };
            this.getUserInfo(params,callback);
        }else{
            return uni.getStorageSync('entrance_token');
        }
    }

    getProjectToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('user_token')){
            console.log('未完成');
            return;
        }else{
            return uni.getStorageSync('user_token');
        }
    }

    getMallToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('mall_token')){
            var params = {
                token_name:'mall_token',
                info_name:'mall_info',
                thirdapp_id:2
            };
            this.getUserInfo(params,callback);
        }else{
            return uni.getStorageSync('mall_token');
        }
    }    

    getHairToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('hair_token')){
            var params = {
                token_name:'hair_token',
                info_name:'hair_info',
                thirdapp_id:24 
            };
            this.getUserInfo(params,callback);
        }else{
            return uni.getStorageSync('hair_token');
        }
    }   


    getRestaurantToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('restaurant_token')){
            var params = {
                token_name:'restaurant_token',
                info_name:'restaurant_info',
                thirdapp_id:25
            };
            this.getUserInfo(params,callback);
        }else{
            return uni.getStorageSync('restaurant_token');
        }
    } 

    getExhibitionToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('exhibition_token')){
            var params = {
                token_name:'exhibition_token',
                info_name:'exhibition_info',
                thirdapp_id:26
            };
            this.getUserInfo(params,callback);
        }else{
            return uni.getStorageSync('exhibition_token');
        }
    } 

    getHotelToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('hotel_token')){
            var params = {
                token_name:'hotel_token',
                info_name:'hotel_info',
                thirdapp_id:27
            };
            this.getUserInfo(params,callback);
        }else{
            return uni.getStorageSync('hotel_token');
        }
    } 



    

    getGymToken(params) { 
        var gym_token = uni.getStorageSync('gym_token');
        var params ='gym'
        this.getUserInfo(params);
    }    

 
    getEmployeeToken(callback,postData) { 

        if((postData&&postData.refreshToken)||!uni.getStorageSync('employeeToken')){
            uni.removeStorageSync('employeeToken');
            uni.removeStorageSync('employeeInfo');
            uni.redirectTo({
              url: '/pages/entrance/login/login'
            });
        }else{
            return uni.getStorageSync('employeeToken');
        }
    }
   


    getUserInfo(params,callback){
        var self = this;
        var wxUserInfo = {};
        if(uni.canIUse('button.open-type.getUserInfo')){
            uni.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) { 
                        uni.getUserInfo({
                            success: function(res) {                  
                                wxUserInfo = res.userInfo;
                                self.getTokenFromServer(wxUserInfo,params,callback);                              
                            }
                        });
                    }else{
                        self.getTokenFromServer(wxUserInfo,params,callback);                        
                    };
                },
                fail: res=>{
                    uni.showToast({
                        title:'拉取微信失败',
                        icon:'fail',
                        duration:2000,
                        mask:true
                    })
                }
            });
        }else{
            uni.getUserInfo({
                success: function(res) {
                    wxUserInfo = res.userInfo;
                    self.getTokenFromServer(wxUserInfo,params,callback)                  
                }
            });
        };
        console.log(wxUserInfo)
    }


    getTokenFromServer(wxUserInfo,params,callback) {
        var self  = this;
        console.log('params',params);
        console.log('wxUserInfo',params);
        uni.login({
            success: function (res) {
                console.log(res)
                var postData = {};
                postData.thirdapp_id = params.thirdapp_id;  
                
                postData.code = res.code;
                if(wxUserInfo.nickName&&wxUserInfo.avatarUrl){
                    postData.nickname = wxUserInfo.nickName;
                    postData.headImgUrl = wxUserInfo.avatarUrl;
                };
                if(self.g_params&&self.g_params.parent_no){
                    postData.parent_no = self.g_params.parent_no;
                    console.log(self.g_params)
                };
                if(self.g_params&&self.g_params.relation_user){
                    postData.relation_user = self.g_params.relation_user;
                    console.log(self.g_params)
                };
                if(uni.getStorageSync('openidP')){
                    postData.openid = uni.getStorageSync('openidP');
                };
                console.log('postData',postData)
                uni.request({
                    url: config.baseUrl+'/Base/ProgramToken/get',
                    method:'POST',
                    data:postData,
                    success:function(res){
                        console.log(res)
                        if(res.data&&res.data.solely_code==100000){
                            uni.setStorageSync(params.info_name,res.data.info);
                            uni.setStorageSync(params.token_name, res.data.token);
                            
                            if(callback){
                                callback && callback(res.data.token);
                            };      
                        }else{
                            uni.showToast({
                                title: '获取token失败',
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            });
                        };
                        
                        
                    }
                })
                
            }
        })
        
    }


    getToken(callback,params){

        if(uni.getStorageSync('login').login_name&&uni.getStorageSync('login').password){
            var postData = {
                login_name:uni.getStorageSync('login').login_name,
                password:uni.getStorageSync('login').password,
            }
            uni.request({
                url: config.baseUrl+'/Func/Common/loginByUp',
                method:'POST',
                data:postData,
                success:function(res){
                    console.log(res)
                    if(res.data&&res.data.token){
                        uni.setStorageSync('employeeToken', res.data.token);
                        var login = uni.getStorageSync('login');   
                        uni.setStorageSync('login',login);
                        if(params&&callback){  
                            params.data.token = res.data.token;
                             
                            callback && callback(params);
                        }else if(callback){
                            callback && callback(res);
                        };

                        
                    }else{
                        setTimeout(function(){
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'fail',
                                duration: 1000,
                                mask:true
                            });
                        },500);

                       
                        uni.removeStorageSync('token');
                        uni.removeStorageSync('login');

                    }
                    
                    
                }
            })
        }else{
            uni.redirectTo({
              url: '/pages/Index/index'
            });
        };
        

    }
}


export default new Token()