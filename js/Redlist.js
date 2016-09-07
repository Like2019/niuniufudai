$(document).ready(function(){
  loadTopList(getQueryParam('code'));
});

function loadTopList(code){
	$.ajax({
		type:"get",
		url:originAPI+"/user/advert/redenvelope/top/list?inviteCode="+code,
		async:true,
		dataType:"json",
		success:function(data){
			var currtStr='';
			var inviteStr='';
			var currentUserTop = data.currentUserTop;
				 if(currentUserTop.userAvatar == ''){
	            	currentUserTop.userAvatar = './images/fudai1.jpg';
	            }
				currtStr='<li>'+
					'<img src=\"'+currentUserTop.userAvatar+'\"/>'+
					'<span class="name">'+currentUserTop.userNickName+'</span>'+
					'<span class="per">好友排第'+currentUserTop.topNum+'名</span>'+
					
					'<span class="sum">'+currentUserTop.amountSum+'</span>'+
					'<span class="march">￥</span>'+
				'</li>';
				$(".info").html(currtStr);
			
			for (var i = 0; i < data.userRedEnvelopeList.length; i++) {
				var temp = data.userRedEnvelopeList[i];
				 if(temp.userAvatar == ''){
	            	temp.userAvatar = './images/fudai1.jpg';
	           }
				inviteStr+='<li>'+
					'<img src="'+temp.userAvatar+'"/>'+
					'<span class="fname">'+temp.userNickName+'</span>'+			
					'<span class="fsum">'+temp.amountSum+'</span>'+
					'<span class="fmarch">￥</span>'+
				'</li>';
			}
			$(".list").html(inviteStr);
		}, error: function (data) {
	        $(".info").html("加载失败...");
	        $(".list").html("加载失败...");
	    }
	});
}

function getQueryParam(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}