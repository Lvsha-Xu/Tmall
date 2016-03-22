$(function(){


// 楼层控制
  var leftbtns=$(".fixed-left")[0];
  // alert(leftbtn);
  var xiaobtn=$(".fixed-floor");
  var floor=$(".floor1");
  //通过小按钮来控制滚动条
  for(var i=0;i<xiaobtn.length;i++){
      xiaobtn[i].index=i;
      xiaobtn[i].onclick=function(){
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        animate(obj,{scrollTop:floor[this.index].aa-80},500,Tween.Linear)//保存每一个楼层的offsetTop 从、相等于animate(obj,{scrollTop:floor[this.index].offsetTop-80},500,Tween.Linear)   //offsetTop:自身到body的距离
        //注意： floor[i].aa=floor[i].offsetTop;//保存每一个楼层的offsetTop    //offsetTop:自身到body的距离
        for( j=0;j<xiaobtn.length;j++){
            xiaobtn[j].style.background="";
            }
        xiaobtn[this.index].style.background="#000";
        }
      }


// 隐形窗口
  var scrollbox=$(".scrollbox")[0];
  var flag=true;//滚动条往下拉时的开关，第一次开，这个开关要保证每一次往下拉时，开关都是开着
  var flag2=true; 
  window.onscroll=function(){
  /***************************************/
  //解决滚动条兼容问题
      var scrollT=getScrollT();
      if(scrollT>=900){
            //alert(leftbtns)
             leftbtns.style.display="block";
      }else{
             leftbtns.style.display="none";
      } 



      if(scrollT>=600){
        if(flag){
                  animate(scrollbox,{top:0},500,Tween.Linear);
               }
               flag=false;//第一次往下，执行完后把开关关掉
               flag2=true;
            }else{//往上拉
                  if(flag2){
                           animate(scrollbox,{top:-60},500,Tween.Linear);
                           flag=true;//第一次往上，动画执行完后开关开着
                           flag2=false;
                           }
                    }


        //通过滚动条来控制小按钮
        for(var i=0;i<floor.length;i++){//遍历楼层
          floor[i].aa=floor[i].offsetTop;//保存每一个楼层的offsetTop    //offsetTop:自身到body的距离
          if(scrollT>=floor[i].aa-80){//如果obj.scrollTop超出当前楼层（自身到body的距离）的就让对应的小按钮变化
            for(var j=0;j<xiaobtn.length;j++){//遍历小按钮
                     xiaobtn[j].style.background="";//小按钮的初始背景为无；
              }
              xiaobtn[i].style.background="#000";//当当前的楼层为i时，对应的小按钮的背景变为red；
          }         
         }


        //按需加载
        //写在window.onscroll事件中
        var scrollT=getScrollT();
        var floors=$(".floor1");
        var ch = document.documentElement.clientHeight;
                for (var i = 0; i < floors.length; i++) {
                  floors[i]=floors[i].offsetTop;
                    if (floors[i].offsetTop<scrollT+ch-200) {//当前楼层到顶部的高度如果小于页面内容超出浏览器的距离+浏览器的距离时
                        var imgs2=$("img",floors[i]);//获取当前楼层的所有图片
                        for (var j = 0; j < imgs2.length; j++) {//遍历图片
                            imgs2[j].src=imgs2[j].getAttribute("aa");//每一个图片的aa属性的值赋给
                        };
                    };
                }



    }   //window.onscroll事件 






//banner轮播
/*  var bgcolors=$(".banner_blue")[0];
  var bgarr=["#0b78dd","#dadada","#0064fa","#dcdcda","#5a3eac"];
  var imgs=$(".banner_m_tu");//图片类
  var list=$(".list1");//按钮类
  for(var i=0; i<list.length;i++){
    list[i].index=i;
    list[i].onmouseover=function(){
                              clearInterval(t);
                              for(var j=0;j<imgs.length;j++){
                                  imgs[j].style.zIndex=3;
                                  list[j].style.background="#333";
                                  }
                            imgs[this.index].style.zIndex=4;
                            list[this.index].style.background="#c40000";
                            bgcolors.style.background=bgarr[this.index];
                            }
                            list[i].onmouseout=function(){
                              t=setInterval(move,2000);
                              num=this.index+1;
                            }
                    } 

    var t=setInterval(move,2000);
    var num=1;
    function move(){
                  if(num==5){
                    num=0;
                    }
    for(var i=0; i<imgs.length;i++){
                  imgs[i].style.zIndex=3;
                  list[i].style.background="#333";
                  }
                  imgs[num].style.zIndex=4;
                  list[num].style.background="#c40000";
                    bgcolors.style.background=bgarr[num];
                  num++;
                }

 // 精选市场
  var els=$('.banner_l')[0]; 
  var els1=$("li",els);
  // alert (els1.length);
    var els2=$('.scj-b');
    for(var i=0;i<els1.length;i++){
    els1[i].index = i;
      els1[i].onmouseover = function(){
        els2[this.index].style.display= 'block';
      };
      els1[i].onmouseout = function(){
        els2[this.index].style.display = 'none';
      
    };
 }*/


 // hover(els1[i],function(){
 //  els2[this.index].style.display= 'block';
 // },function(){
 //   els2[this.index].style.display = 'none';
 // })


 // banner轮播 
   var imgs=$(".banner_m_tu");//图片类
   // alert(imgs.length);
   
    var inners=$(".list1");//按钮类
    // alert(inners.length);
    var banner=$(".banner_blue")[0];//总banner

    var bgarr=["#0b78dd","#dadada","#0064fa","#dcdcda","#5a3eac"];
   
  // var bannercenter = $(".banner-center")[0];
  //  侧面 对应的
    var bannerleft=$(".banner_l")[0];//左总列表
    var lis=$("li",bannerleft);
       // alert(lis.length)
    var bannerimg=$(".bannerimg");
    var igboxs=$(".banner_m_b")[0];
     // alert(bannerimg.length)
    var bgarr1=["#c9e1e3","#dbdbdb","#007DC7","#21e8d1","#ed1113","#01509b","#5e4cdc","#f32a56","#e2d9ba","#262626","#eb4d0e","#ffb9c9","#0f6187","#e86f28","#ffe04a","#c9e1e3"];

    var leftbanner=$(".scj-b");
    // alert(leftbanner.length)
    // 轮播
    for (var i = 0; i < inners.length; i++) {
      inners[i].index=i;
      inners[i].onmouseover=function(){
        clearInterval(t3);
        for (var j = 0; j < imgs.length; j++) {
          imgs[j].style.zIndex=2;
          inners[j].style.background="#000";
          inners[j].style.color="#fff";
                banner.style.background=bgarr[j];

        }
        imgs[this.index].style.zIndex=3;
        inners[this.index].style.background="#ccc";
        inners[this.index].style.color="#000";
            banner.style.background=bgarr[this.index];
      }
      // 手控制之后 继续轮播
      inners[i].onmouseout=function(){
        t3=setInterval(move,2000);
        num=this.index+1;
      }
    }
    // 自动轮播
    var t3=setInterval(move,2000);
    var num=1;
    function move(){
      if (num==5) {
        num=0;
      };
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.zIndex=2;
        inners[i].style.background="#000";
        inners[i].style.color="#fff";
      }
      imgs[num].style.zIndex=3;
      inners[num].style.background="#ccc";
      inners[num].style.color="#000";

        banner.style.background=bgarr[num];
      num++;
    }


//  左侧黑条控制banner图
    
    
    // alert(bannerimg.length);
    for (var i = 0; i < lis.length; i++) {
        lis[i].index=i;
        hover(lis[i],function(){
            if (this.index==0) {
                clearInterval(t3);
                t3=setInterval(move,2000);
                for (var j = 0; j < bannerimg.length; j++) {
                    bannerimg[j].style.zIndex=3;                    
                }
                bannerimg[0].style.zIndex=6;
                banner.style.background=bgarr[num-1];
            }else{
                clearInterval(t3);
                for (var j = 0; j < bannerimg.length; j++) {
                    bannerimg[j].style.zIndex=3; 
                    leftbanner[j].style.display="none"; 
                    leftbanner[0].style.display="block";                   
                }
                bannerimg[this.index].style.zIndex=6;
                banner.style.background=bgarr1[this.index];
                leftbanner[this.index].style.display="block";
            }
        },function(){
          // alert(this.index)
            leftbanner[this.index].style.display="none";

        })
    };



   
// 导航的下拉框
  var yiji=$(".yiji");
  var erji=$(".erji");
  for(var i=0;i<yiji.length;i++){
    yiji[i].index=i;
    /*yiji[i].onmouseover=function(e){
      var ev=e||window.event;
      // alert(ev.type+"鼠标从"+ev.relatedTarget+"来")
      var sons=$("li",erji[this.index]);
      var h=sons[0].offsetHeight;
      // alert(h);
      erji[this.index].style.height=0;
      // alert(erji[this.index].length)
      animate(erji[this.index],{height:h*sons.length+"px"},400,Tween.Linear);
      // erji[this.index].style.height=h*sons.length+"px";
    }
    yiji[i].onmouseout=function(){
    animate(erji[this.index],{height:0},400,Tween.Linear);
  }*/

  hover(yiji[i],function(){
    var sons=$("li",erji[this.index]);
    var h=sons[0].offsetHeight;
    // alert(h);
    // erji[this.index].style.height=0;
    // alert(erji[this.index].length)
    animate(erji[this.index],{height:h*sons.length},400,Tween.Linear);
    // erji[this.index].style.height=h*sons.length+"px";
    },function(){
            animate(erji[this.index],{height:0},400,Tween.Linear);})
  } 



//热卖品牌    选项卡
  /*var title=getClass("body2f");
  var con=getClass("bodycon");
  var recon=$(".body2-b21");
  var taoxin=$(".taoxin");
  for(var x=0;x<recon.length;x++){
  recon[x].index=x;
  recon[x].onmouseover=function(){
                                  taoxin[this.index].style.display="block";
                                 }
                            recon[x].onmouseout=function(){
                                          taoxin[this.index].style.display="none";
                               }
                            }*/
              
  // alert（title.length）;
  // 第一种方式：自调用方式保存局部变量i
  /*for(var i=0;i<title.length;i++){//遍历标题集合
     (function(i){//闭包 自调用
                 title[i].onclick=function(){//给每一个title添加一个单击事件
                 for(var j=0;j<con.length;j++){//遍历内容集合
                 con[j].style.display="none";//都不显示
                 title[j].style.fontWeight="normal";//字体不加粗
                 title[j].style.textDecoration="none";//没有下划线
                }
                con[i].style.display="block";//当前的显示
                title[i].style.fontWeight="bold";//字体加粗
                title[i].style.textDecoration="underline";//显示下划线
                }
             })(i)
           }*/
             /*// 第二种方式：通过给对象添加属性
             
              for(var i=0;i<title.length;i++){
                 title[i].index=i;//把当前i的值保存到相应的对象的index属性上
                 title[i].onclick=function(){//给每一个title添加一个单击事件
                    for(var j=0;j<con.length;j++){//遍历内容集合
                    con[j].style.display="none";//都不显示
                    title[j].style.fontWeight="normal";//字体不加粗
                    title[j].style.textDecoration="none";//没有下划线
                  }
                  con[this.index].style.display="block";//当前的显示
                  title[this.index].style.fontWeight="bold";//字体加粗
                  title[this.index].style.textDecoration="underline";//显示下划线
                }
              }*/


//1F 节点创建轮播：每层楼的左边的小轮播
function getLunbo(num){
   var imgsbox=$(".imgsbox")[num];
  var leftbtn=$(".leftbtn")[num];
  var rightbtn=$(".rightbtn")[num];
  var t1=setInterval(moveleft,3000);
  function moveleft(){
      animate(imgsbox,{left:-100},500,Tween.Linear,function(){
        var first=getFirst(imgsbox);
        imgsbox.appendChild(first);
        imgsbox.style.left=0;
      })
    }
    function moveright(){
        var last=getLast(imgsbox);
        var first=getFirst(imgsbox);
        imgsbox.insertBefore(last,first);
        imgsbox.style.left="-100px";
        animate(imgsbox,{left:0},500,Tween.Linear,function(){})
      }
      leftbtn.onmouseover=rightbtn.onmouseover=function(){
           clearInterval (t1);
          }
      leftbtn.onclick=function(){
                                   moveleft();
                                 }
      rightbtn.onclick=function(){
                                  moveright();
                                 }
      leftbtn.onmouseout=rightbtn.onmouseout=function(){
                                t1=setInterval(moveleft,2000);
                              }


}
// getLunbo(0);
// getLunbo(1);
// getLunbo(2);
// getLunbo(3);
// getLunbo(4);
// getLunbo(5);
 for(var i=0;i<6;i++){
  getLunbo(i);
 }
                              
 


//右侧定位动态效果
    var dingwei=$(".mbar-tall"); 
    // alert (dingwei.length);
    var xiaodw=$(".ascj-b");
    for(var i=0;i<dingwei.length;i++){
      dingwei[i].index = i;
      dingwei[i].onmouseover = function(){
          // xiaodw[this.index].style.display= 'block';
          animate(xiaodw[this.index],{right:35,opacity:1},600,Tween.Linear,function(){
         });
        };
      dingwei[i].onmouseout = function(){
         animate(xiaodw[this.index],{right:70,opacity:0},600,Tween.Linear,function(){
         });
         // xiaodw[this.index].style.display= 'none';
    };
 }

//热门品牌
    var title=$(".title");
    var huan=$(".huan")[0];
    var cons=$(".con");
    // alert(cons);
    //定义存放的图片的数组
    var onearr=[];
    var twoarr=[];
    var threearr=[];
    var fourarr=[];
       //放图片
     for(var i=0; i<27;i++){//共有多少张图片
       onearr.push("img/tu-"+i+".jpg");//图片的地址
       twoarr.push("img/tu-"+i+".jpg");//图片的地址
       threearr.push("img/tu-"+i+".jpg");//图片的地址
       fourarr.push("img/tu-"+i+".jpg");//图片的地址
     }

     function random(arr){
      var newarr=[];
        //从27张图片里随机取24张
           for(var i=0;i<24;i++){
            newarr.push(arr[parseInt(Math.random()*27)]);
           }
           return newarr;
     }
      
    var tuarr=[onearr,twoarr,threearr,fourarr];
         function show(num){
          var imgarr=random(tuarr[num]);
        for(var i=0; i<imgarr.length;i++){
          //alert(1)
          var div=document.createElement("div");
          div.style.cssText="width:132px;height:80px;float:left;background:#fff;border:1px solid #ccc;text-align:center;line-height:80px;position:relative";
          div.className="divs";
          var img=document.createElement("img");
          img.src=imgarr[i];
          img.style.cssText="width:90px;height:45px;vertical-align:middle";
          // alert(img);
          var xinimg=document.createElement("img");
          xinimg.src="./img/xin1.png";
          xinimg.style.cssText="width:13px;height:11px;display:none;position:absolute;right:5px;top:5px";
          xinimg.className="taoxin";
          div.appendChild(xinimg);
          div.appendChild(img);
          cons[num].appendChild(div);
        }

              var divs=$(".divs");
               // alert(divs.length);
              var taoxin=$(".taoxin");
              for(var i=0; i<divs.length;i++){
                divs[i].index=i;
                hover(divs[i],function(){
                  taoxin[this.index].style.display="block";
                },function(){
                  taoxin[this.index].style.display="none";
                })
             }


       }


        show(0);
    var index=0;
    for(var i=0;i<title.length;i++){
      title[i].index=i;
      title[i].flag=true;//开
      title[0].flag=false;
      title[i].onclick=function(){
        index=this.index;//单击谁保存谁
        for(var j=0;j<cons.length;j++){
          cons[j].style.zIndex=1;
          title[j].style.fontWeight="normal";
          title[j].style.textDecoration="none";
        }
        cons[this.index].style.zIndex=2;//现在单击的
        title[this.index].style.fontWeight="bold";
        title[this.index].style.textDecoration="underline";
        if(this.flag){
          show(this.index);
          this.flag=false;//关
        }
      }
    }
    huan.onclick=function(){
    cons[index].innerHTML="";
    show(index);
    }
    
    

    


})
      