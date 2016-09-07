$(document).ready(function(){
	var code = getQueryParam('code');
	$("#s_code").html(code);
   	init();
   	if(checkIsNull(code)){
     	$(".nolist").show();
   	}else{
 		info(code);
   	}
});

function checkIsNull(obj){
	if(undefined == obj || 'undefined' == obj || null == obj || '' == obj){
		return true;
	}
	return false;
}
function info(code){
    $.ajax({
        type: "get",
        url:originAPI+"/user/advert/redenvelope/top/list?inviteCode="+code,
        dataType: "json",
        success: function (data) {
	        var currentUserTop = data.currentUserTop;
	        if(checkIsNull(currentUserTop)){
	        	// 说明 code 异常
	        	$('.nolist').show();
	        	return ;
	        }
	        $("#s_amountSum").html(currentUserTop.amountSum);
	        
           	if(currentUserTop.userAvatar == ''){
	            currentUserTop.userAvatar = './images/fudai1.jpg';
	        }
           	
           	var str='<li>'+
           	'<span>发现了一个红包神器，我已经领取了</span>'+
           	'<span>'+currentUserTop.amountSum+'</span>'+
           	'<span>元红包了！我们能一起抢吧！我的邀请码是：</span>'+
           	'<span>'+code+'<span>'+
           	'</li>';
           	$(".hqyqm").html(str);
           	
	        //信息获取
	        var currtStr = '<li>'+
               '<img src=\"'+currentUserTop.userAvatar+'\"/>'+
	            '<span class="xingming">'+currentUserTop.userNickName+'</span>'+
	            '<span class="lin">已领取</span>'+
	            '<span class="maney">'+currentUserTop.amountSum+'</span>'+
	            '<span class="haoyou">好友排第'+currentUserTop.topNum+'名</span>'+
	            '</li>';
	        $(".content").html(currtStr);
	        
			
			var targetUserList = data.userRedEnvelopeList;
			if(checkIsNull(targetUserList) || 0 == targetUserList.length){
				$('.nolist').show();
			}
			
	        var inviteStr='';
	        for (var i = 0; i < targetUserList.length; i++) {	
	            var temp = data.userRedEnvelopeList[i];
	            if(temp.userAvatar == ''){
	            	temp.userAvatar = './images/fudai1.jpg';
	            }
	            //获取好友排行榜列表
	            inviteStr += '<li>'+
	                '<img src="'+temp.userAvatar+'" />'+
	                '<i class="Nickname">'+temp.userNickName+'</i>'+
	                '<i class="sumAmount">'+temp.amountSum+'</i>'+
	                '<i class="qian">￥</i>'+
	                '</li>';
	        }
	        $(".list").html(inviteStr);
	        $(".nolist").hide();
	    },error:function(data){
	    	$(".list").html("加载错误");
	    }
    });
}


function init(){
	//手机号码注册
    $(".lijizhuce").click(function () {

        var phone = $.trim($("input[name='phone']").val());

        var yzm = $.trim($("input[name='yzm']").val());

        var mm = $.trim($("input[name='mm']").val());

//判断输入框内的内容
        if (phone == "") return mess_tusi("请输入手机号码");

        if (yzm == "") return mess_tusi("请输入验证码");

        if (mm == "") return mess_tusi("请输入密码");

        showloaddinghtml5(1);

        var paramsData = {}

        paramsData['api'] = 'register';

        paramsData['debug'] = true;

        paramsData['funSuccess'] = function (data) {

            showloaddinghtml5(0);

            if (data.result == 1) {

                store.set("loginKey", data.loginKey);//注册成功记录用户loginKey 转向信息完善页面

                window.location.href = "download.html";

            } else {
                showerror(data.errorCode);
            }

        };

        paramsData['phone'] = phone;

        paramsData['passWord'] = mm;

        paramsData['smsCode'] = yzm;


        comajax(paramsData);


    });
    //手机验证码获取
    $(".fasong").on("click", function () {

        var phone = $.trim($("input[name='phone']").val());

        if (phone == "") return mess_tusi("请输入手机号码");

        showloaddinghtml5(1);

        var paramsData = {}

        paramsData['api'] = 'checkphone';

        paramsData['debug'] = true;

        paramsData['type'] = "post";

        paramsData['funSuccess'] = function (data) {

            showloaddinghtml5(0);

            if (data.result == 1) {

                daojishi($(".yzm button"), 60);

                return mess_tusi("短信已发出");

            } else if (data.result == 2) {

                return mess_tusi("手机号已经被使用");

            } else {

                return mess_tusi("发送失败");

            }
        };

        paramsData['phone'] = phone;

        comajax(paramsData);
    });
}


function getQueryParam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)
     return  unescape(r[2]);
     return null;
}
