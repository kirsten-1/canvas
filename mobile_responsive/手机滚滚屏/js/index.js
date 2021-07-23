//Swiper5
var mySwiper = new Swiper ('.swiper-container', {
    direction:'vertical',
    height : window.innerHeight,
    on:{
      init: function(){
        swiperAnimateCache(this); //隐藏动画元素 
        swiperAnimate(this); //初始化完成开始动画
      }, 
      slideChangeTransitionEnd: function(){ 
        swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
        //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
      } ,
      slideChangeTransitionStart:function(){
          if(this.activeIndex == 0){
              page1In();
              page2Out();
          }else if(this.activeIndex == 1){
              page1Out();
              page2In();
              page3Out();
          }else if(this.activeIndex == 2){
              page2Out();
              page3In();
          }
      }
    }
  }) 
  page1In();
  function page1In(){
      $(".page1 .num").addClass("donghua1");
      $(".page1 .pic1").addClass("donghua2");
      $(".page1 .next").addClass("nextAni");
  }
  function page1Out(){
    $(".page1 .num").removeClass("donghua1")
    $(".page1 .pic1").removeClass("donghua2");
    $(".page1 .next").removeClass("nextAni");
  }
  function page2In(){
      $(".page2 .pic1").addClass("page2Donghua1");
      $(".page2 .content").addClass("page2Donghua2")
      $(".page2 .next").addClass("nextAni");
  }  
  function page2Out(){
    $(".page2 .pic1").removeClass("page2Donghua1");
    $(".page2 .content").removeClass("page2Donghua2");
    $(".page2 .next").removeClass("nextAni");
  }
  function page3In(){
    $(".page3 .next").addClass("nextAni");
    $(".page3 .work").addClass("page3Donghua1")
    $(".page3 .cond").addClass("page3Donghua2")
  }
  function page3Out(){
    $(".page3 .next").removeClass("nextAni");
    $(".page3 .work").removeClass("page3Donghua1")
    $(".page3 .cond").removeClass("page3Donghua2")
  }