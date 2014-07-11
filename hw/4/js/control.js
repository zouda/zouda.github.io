//控制图片轮播
function imageRot(){
  intervalTime = 4000;
  imageSpeed = 400;
  titleSpeed = 250;
  TotalImages = $(".imageBox").children().size(); //图片、标题、图标数量
  imageWidth = $(".imageRotation").width();
  $(".imageBox").css({width:TotalImages*imageWidth+"px"}); //设置全宽度
  OldPos = parseInt($('span.active').attr('rel'));
  NewPos = 0; 
  //轮转函数
  var rotate = function(Target){
    //确定新位置
    if (Target > 0){
      NewPos = Target;
    }
    else{
      if (OldPos == TotalImages)
        NewPos = 1;
      else
        NewPos = OldPos + 1;
    }
    //轮转图片
    $(".imageBox").animate({left:'-'+parseInt((NewPos-1)*imageWidth)+"px"}, imageSpeed);
    //更换标题
    $('.titleBox').children('p').eq(OldPos-1).animate({bottom:"-40px"}, titleSpeed, function(){
      $('.titleBox').children('p').eq(NewPos-1).animate({bottom:"0"}, titleSpeed);
    })
    //更换图标
    $('.icoBox').children().eq(OldPos-1).removeClass('active');
    $('.icoBox').children().eq(NewPos-1).addClass('active');
    OldPos = NewPos;
    localStorage.nowIco = ""+OldPos;
  }
  //初始位置：上一次关闭浏览器时图片
  rotate(parseInt(localStorage.nowIco));
  regularChange = setInterval(rotate, intervalTime);
  //悬停处理
  $('.imageBox').hover(function(){
    clearInterval(regularChange);
    $("img").css({opacity:0.8});
  }, function(){
    regularChange = setInterval(rotate, intervalTime);
    $("img").css({opacity:1});
  })
  //点击图标事件
  $('.icoBox').children().click(function (){
    clearInterval(regularChange);
    var target = parseInt($(this).attr('rel'));
    rotate(target);
    regularChange = setInterval(rotate, intervalTime);
  })
  //点击前一张事件
  $('.prevbutton').click(function(){
    clearInterval(regularChange);
    var target = OldPos - 1;
    if (target < 1)
      target = TotalImages;
    rotate(target);
    regularChange = setInterval(rotate, intervalTime);
  })
  //点击后一张事件
  $('.nextbutton').click(function(){
    clearInterval(regularChange);
    var target = OldPos + 1;
    if (target > TotalImages)
      target = 1;
    rotate(target);
    regularChange = setInterval(rotate, intervalTime);
  })
}

//MoveToPage评论翻页控制
//page: 跳转页面
//shownNum: 每页显示评论数 
function MoveToPage(page, shownNum)
{
  $(".sp").remove();
  $('.prevPage').remove();
  $('.nextPage').remove();
  TotalComments = $(".comment").length;               //总评论数
  if (TotalComments % shownNum == 0)
    TotalPages = parseInt(TotalComments / shownNum);  //总页数
  else
    TotalPages = parseInt(TotalComments / shownNum) + 1;
  startNum = (page - 1) * shownNum;                   //开始显示评论ID
  endNum = startNum + shownNum - 1;                   //最后显示评论ID
  if (endNum > TotalComments - 1)
    endNum = TotalComments - 1;
  for (var i = 0; i < TotalComments; i++)
    if (i < startNum || i > endNum)
      $(".comment").eq(i).css({display:"none"});
    else
      $(".comment").eq(i).css({display:"block"});

  var temp = "";
  if (page > 1){                                      //添加前一页
    temp = "<a href='javascript:' class='prevPage'" + " onClick=MoveToPage(" +parseInt(page-1)+","+shownNum+")>prev</a>";
  }
  else
    temp = "<a href='javascript:' class='prevPage'>prev</a>";
  $("#pageBox").append(temp);

  if (page < TotalPages){                             //添加后一页
    temp = "<a href='javascript:' class='nextPage'" + " onClick=MoveToPage(" +parseInt(page+1)+","+shownNum+")>next</a>";
  }
  else
    temp = "<a href='javascript:' class='nextPage'>next</a>";
  $("#pageBox").append(temp);

  for (i = -2; i <= 2; i++)                           //添加页码按钮
  if (page + i >= 1 && page + i <= TotalPages){
    if (i != 0){
        temp = "<a href='javascript:' class='sp'" + " onClick=MoveToPage(" +parseInt(page+i)+","+shownNum+")>"+ parseInt(page+i) + "</a>";
    }
    else{
        temp = "<a class='on sp'>"+ page + "</a>";
    }
    $('.nextPage').eq(0).before(temp);
  }
  localStorage.nowPage = "" + page;
}

//通过Ajax异步获取image.json文件
function AjaxForImage(){
   $.ajax({
    type:"get",
    url:"json/image.json",
    dataType:"json",
    async:true,
    success: function (data) {
        for (var i in data.img){
          $(".imageBox").append(data.img[i].img);
        }
        for (var i in data.tit){
          $(".titleBox").append(data.tit[i].tit);
        }
        for (var i in data.ico){
          $(".icoBox").append(data.ico[i].ico);
        }
        $(".titleBox").children().eq(0).removeClass('active');
        $(".titleBox").children().eq(parseInt(nowIco)-1).addClass('active');
        $(".icoBox").children().eq(0).removeClass('active');
        $(".icoBox").children().eq(parseInt(nowIco)-1).addClass('active');
        imageRot();
    },
    error: function () {
      alert('error!');
    }
  })
}

//通过Ajax异步获取comment.json文件
function AjaxForComment() {
  $.ajax({
    type:"get",
    url:"json/comment.json",
    dataType:"json",
    async:true,
    success: function (data) {
      for (var i in data.user){
        var userCode = "<dl class='comment'>";
        userCode += "<dd class='userAvatar'><img src='images/avatar.jpg'></img></dd><dd class='userInfo'>";
        userCode += "<a>" + data.user[i].name + "</a>";
        userCode += "</dd><dt class='userComment'>";
        userCode += "<div>" + data.user[i].comment + "</div>";
        userCode += "</dt><dd class='comm-ft'>";
        userCode += "<span>" + data.user[i].time + "</span>";
        userCode += "<div class='support-oppose'><a href='#'>support | </a><a href='#'>oppose</a></div></dd></dl>";
        $("#comment-list").append(userCode);
      }
      if (localStorage.nowPage >= '1')
        MoveToPage(parseInt(localStorage.nowPage), 5);  
      else
        MoveToPage(1, 5);
    },
    error: function () {
      alert('error!');
    }
  })
}

//增加localStorage：存储上一次访问的图片和评论页面编号
var nowPage = '1'; 
var nowIco = '1';

//总控制端
$(document).ready(function() {
  $("#welcome").click(function(){
    $("#welcome").fadeOut('slow', function(){
      $("#welcome").hide();
      $('#main-wrapper').fadeIn('slow');
      AjaxForImage();
      AjaxForComment();
    });
  })
})
