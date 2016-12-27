
var $ = require('./common/libs/zepto-modules/zepto');
require('./common/libs/zepto-modules/event');
require('./common/libs/zepto-modules/ajax');
require('./common/libs/zepto-modules/touch');


var swiperAni=require('./common/libs/swiper/swiper.animate1.0.2.min.js')
var Swiper=require('./common/libs/swiper/swiper-3.3.1.min.js')
var IScroll = require('./common/libs/iscroll/iscroll.js');

$(".swiper-container").show();
$("#mainContainer").hide();

var swiper = new Swiper('.swiper-container',{
  onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    swiperAni.swiperAnimateCache(swiper); //隐藏动画元素 
    swiperAni.swiperAnimate(swiper); //初始化完成开始动画
  }, 
  onSlideChangeEnd: function(swiper){ 
    swiperAni.swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  } 
});

var myScroll;
$("#enter").tap(function(){
	$(".swiper-container").hide();
	$("#mainContainer").show();

	$.post('http://localhost:8000/skill',function(data){
		var html="";
		for(var i=0;i<data.length;i++){
			html +='<li class="box"><div class="img"><img src='+data[i].img+'></div><div class="right"><div>'+data[i].name+'</div><div>'+data[i].level+'</div></div></li>';
		}

		$("#scroller ul").html(html);
		myScroll = new IScroll('#wrapper', { mouseWheel: true });
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	})
})






var button=true;
$('.icon-jiahao').tap(function(){
	if(button){
		$('.shadow').show();
		button=false;
	}else{
		$('.shadow').hide();
		button=true;
	}
})


$('.button').on('tap',function(){
	var targetApi=$(this).attr('id');
	$(this).css("color","white").siblings("li").css("color","black");
	$.post('http://localhost:8000/'+targetApi,function(data){
		var html="";
		for(var i=0;i<data.length;i++){
			
			switch(targetApi){
				case "skill":
					html +='<li class="box"><div class="img"><img src='+data[i].img+'></div><div class="right"><div style="font-size:16px;margin:5px;">'+data[i].name+'</div><div>'+data[i].level+'</div></div></li>';
					break;
				case "work":
					html +='<li class="box"><div class="img"><img src='+data[i].image+'></div><div class="right"><div>'+data[i].name+'</div><div>'+data[i].category+'</div><div>'+data[i].projects+'</div></div></li>';
					break;
				case "project":
	
					html +='<li class="box" style="height:500px;"><div class="right"><div style="font-size:20px;margin:10px 0;">'+data[i].name+'</div><div class="imgs"><img src='+data[i].image+'></div><div style="margin:5px 0;">'+data[i].category+'</div><div>'+data[i].detail+'</div><div>'+data[i].tech+'</div></div></li>';
					break;

				case "peo" :
					html +='<li class="box" style="height:500px;"><div class="right"><div class="imgs"><img src='+data[i].img+'></div><div style="margin:5px 0;">姓名：'+data[i].name+'</div><div>毕业院校:'+data[i].edu+'</div><div>工作经验：'+data[i].exper+'</div><div>应聘岗位：'+data[i].seek+'</div><div>座右铭：'+data[i].motto+'</div><div>技能：'+data[i].skill+'</div></div></li>';
					break;
			}
		}
		
		$("#scroller ul").html(html);
		myScroll.scrollTo(0,0);
		myScroll.refresh();	
	})
})



