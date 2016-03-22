
// 1解决document.getElementsByClassName在IE8的兼容问题：
    // classname:子容器的类名，类名要加引号；
    // obj:父容器
    function getClass(classname,obj){
      var obj=obj||document;//只要有一个为真它就为真，如果obj存在，就赋值给声明的obj，如果不存在，就把documen赋值给声明的obj，
      if(obj.getElementsByClassName){
        // 为真时表示是现代浏览器（火狐，谷歌）
        return obj.getElementsByClassName(classname);
        // 直接返回结果
      }else{//为假时表示在IE8中
        var alls=obj.getElementsByTagName("*");//获取所有标签元素，*表示所有，？表示匹配一个
        var arr=[];
        for(var i=0;i<alls.length;i++){//遍历这个alls集合

          if(checkClass(alls[i].className,classname)){//每一个元素的classname属性与传进来的参数做判断
            arr.push(alls[i]);//如果为真保存着数组中
          }
        }
        return arr;//数组返回，表示找到
      }
    }
    // document.write(getClass("inner",bigbox).length);
    function checkClass(str,classname){//检测一个元素里是否有我们想要的类名
      var newarr=str.split(" ");//将元素的类名（字符串）中的空格分割数组，并保存在新的数组中
      for(var j=0;j<newarr.length;j++){//遍历这个数组，拿数组中的每一个值与classname比较
        if(newarr[j]==classname){//如果相同，表示找到了，这个函数返回真
          return true;
        }
       } 
       return false;//等这个数组遍历完以后，如果还没有找到相同的类名，则这个函数返回假
    }


    // ************************************************  2、获取与设置对象的纯文本的兼容函数                                          (IE):innerText   (FF): textContent                                obj:从哪个对象获取纯文本   val:表示要设置的文本      ************************************************

function getText(obj,val){
  if(val!=undefined){//设置
          if(obj.textContent||obj.textContent==""){//为真表示是W3C的浏览器
                 obj.textContent=val;
              }else{//表示IE
                obj.innerText=val;
              }
         
    }else{//获取
            if(obj.textContent){//为真表示是W3C的浏览器
          return obj.textContent;
        }else{
          return obj.innerText;
        }
    }
}



// 3获取通用样式的兼容函数//FF  IE8

   // IE 用来获得实际的样式属性 
// 1.    对象.currentStyle.属性     
 // 2.  对象.currentStyle["属性"] 
//FF 用来获得实际的样式属性（null表示还没有定义）  window.getComputedStyle(对象,null).属性 


function getStyle(obj,style){
            if(window.getComputedStyle(obj,null)[style]){//为真表示是W3C的浏览器
          return window.getComputedStyle(obj,null)[style];
        }else{
          return obj.currentStyle[style];
        }
  }

//  4*************************************************
//         兼容函数：不论是类名还是id名还是标签名都可以获取到，还要把window.onload=function(){}用$符号代替
//         $(".类名")
//         $("#id名")
//         $("标签名")
  
    function $(selector,father){
      var obj=father||document;
      if(typeof selector=="string"){//判断selector是否是字符串
        //var divs=$("空格 div 空格")[0];去空格
                // selector.replace(/^\s$/g,"");//只能找到一个空格
                ///^\s*|\s$/g//找出字符串前后的空格并用空字符串替换，替换以后的结果覆盖原来的selector
               selector=selector.replace(/^\s*|\s$/g,"");//找到所有空格
        if(selector.charAt(0)=="."){//类名
        //找出selector第一个字符，如果是“.”
        return getClass(selector.slice(1),obj);
        // 获取元素时应从selector的第二个字符开始
      }else if(selector.charAt(0)=="#"){//id名
        //找出selector第一个字符，如果是“#”
        return obj.getElementById(selector.slice(1));
      }else if(/^[a-z|1-10]{1,10}$/g.test(selector)){//正则
        //找出selector第一个字符，如果是“a-z|1-10”,比如div，img，a，h1-h6
        return obj.getElementsByTagName(selector);
       }
      }else if(typeof selector=="function"){//检测是否是函数
           window.onload=function(){
            selector();
           }
      }
    }

 

 // ********************************************
 
//5 获取对象的子节点
//type:    a:只获取元素节点  b:获取元素+文本节点
function getChilds(father,type){
  var type=type||"a";//type没有赋值时，默认为“a”（即第二个参数省略时，默认只获取元素节点）
  var childs=father.childNodes;//找到所有儿子
  var arr=[];//声明一个容器
  for(var i=0;i<childs.length;i++){
    if(type=="a"){//获得元素节点
      if(childs[i].nodeType==1){//节点为1表示是元素节点
      arr.push(childs[i]);//保存在数组中
    }
    
    }else if(type=="b"){//获取元素+文本节点

      if(childs[i].nodeType==1||(childs[i].nodeValue.replace(/^\s*|\s$/g,"")!=""&&childs[i].nodeType!=8)){//判断childs[i]的节点类型为1或者（文本节点中的值不为空，并且childs[i]的节点类型不为8，即不为注释节点）
        arr.push(childs[i]);
      }
    }
  }
return arr;
}



/***************************************/
//6.获取第一个子节点
function getFirst(father){
   return  getChilds(father)[0];
}


/***************************************/
//7.获取最后一个子节点
function getLast(father){
 return getChilds(father)[getChilds(father).length-1];  
}

/***************************************/
//8.获取指定的子节点
function getNum(father,num){
  return getChilds(father)[num];
  
}

/***************************************/
//9.获取下一个兄弟节点
function getDown(obj){
      var down=obj.nextSibling;
  while(down.nodeType==3||down.nodeType==8){//
     down=down.nextSibling;
       if(down==null){
        return false;
       }
      }
      return down;
}

/***************************************/
//10.获取上一个兄弟节点
function getUp(obj){
      var up=obj.previousSibling;
      if(up==null){
        return false;
      }
  while(up.nodeType==3||up.nodeType==8){//
     up=up.previousSibling;
       if(up==null){
        return false;
       }
      }
      return up;
}



/***************************************/
//11.要插入到某个对象之后    newobj:要追加的对象   obj：在哪个对象之前
/*var obj=new Object();
Object.prototype.insertAfter=function(){

}*/
// prototype原型
//对象共有的方法一般是加在原型上的，而原型只能给构造函数添加，所以共有的方法是添加到对象的构造函数的原型上的。
//this：指的是最终调用这个方法的对象，而这个对象是通过构造函数new出来的对象。
Object.prototype.insertAfter=function(newobj,obj){//获取obj的下一个兄弟节点
                   var   down=getDown(obj);
                   if(down){//如果这个兄弟节点存在
                    this.insertBefore(newobj,down); //就把newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
                   }else{//如果这个兄弟节点不存在，表示obj就是最后一个节点了
                    this.appendChild(newobj);//直接追加到父对象的后面
                   } 
       }


//调用函数
//<!-- 做一个在窗口中漂浮的广告(),漂浮的位置不能超出窗口，始终在窗口中，当碰到窗口边界的时候，改变运动的方向。 -->将一个元素对象作为一个漂浮窗口
//floatwindow   窗口广告
//div 广告
//close   关闭
//num1  速度x
//num2  速度 y
//num3  移动的时间的快慢
function floatwindow(div,close,num1,num2,num3){
    div.style.position="fixed";
    var t=setInterval(move,num3);
    var sheepx=num1||5;//速度 x
    var sheepy=num2||5;//速度  y
    
    function move(){
        var ch=document.documentElement.clientHeight;//浏览器高度
    var cw=document.documentElement.clientWidth;//浏览器宽度
        var sw=div.offsetWidth;//自身的宽度
         var sh=div.offsetHeight;//自身的高度
        var sheight=div.offsetTop;//距离上边的实际距离
        var swidth=div.offsetLeft;//距离左边的实际距离
        var newleft=swidth+sheepx;
        var newtop=sheight+sheepy;
        /* window.onload文档加载完成事件
        window.onscroll  窗口滚动条事件
        window.onresize  窗口改变事件*/
     /* window.onresize=function(){
        ch=document.documentElement.clientHeight;
        cw=document.documentElement.clientWidth;

      }*/
      
        //边界
        // x  0------  (cwh-swidth)
        // y 0------- (cheight-sheight)
        if(newtop>=(ch-sh)){//下
          newtop=ch-sh;
          sheepy*=-1;
        }
        if(newleft>=(cw-sw)){//右
          newleft=cw-sw;
          sheepx*=-1;
        }
        if(newtop<=0){//控制上
          newtop=0;
          sheepy*=-1;
        }
        if(newleft<=0){//控制左
          newleft=0;
          sheepx*=-1;
        }
        div.style.left=newleft+"px";
        div.style.top=newtop+"px";
    
    div.onmouseover=function(){
      clearInterval(t);
    }
    div.onmouseout=function(){
      t=setInterval(move,num3);
    }
    close.onclick=function(){
      div.style.display="none";
    }
 }
}


/**********************************************************************************/ 
//解决滚轮事件的兼容函数
        function mouseWheel(obj,upfun,downfun){
                   //滚轮事件
                   if(obj.attachEvent){
                  obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
                  }else if(obj.addEventListener){
                  obj.addEventListener("mousewheel",scrollFn,false);
                    //chrome,safari   -webkit-
                  obj.addEventListener("DOMMouseScroll",scrollFn,false);
                  //firefox -moz-
                        }

              function scrollFn(e){
                var ev=e||window.event;
                 if(ev.detail==-3||ev.wheelDelta==120){//FF：滚轮向上-3；IE：滚轮向上+120
                  if(upfun){
                 upfun();
              }
          }
          if(ev.detail==3||ev.wheelDelta==-120){//FF：滚轮向下+3；IE：滚轮向下-120
              if(downfun){
              downfun();
                    }
              }
            // 为了保证滚轮事件不受滚动条事件的影响
        //事件对象阻止浏览器默认行为
             if (ev.preventDefault ) {
                ev.preventDefault(); 
             }//阻止默认浏览器动作(W3C) 
             else{
             ev.returnValue = false;
           }//IE中阻止函数器默认动作的
          }
        }



/**********************************************/ 
// hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function(e){
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function(e){
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent(e){
      return e||window.event;
 }
/********************************/




/***************************************/
      //解决滚动条兼容问题
   function getScrollT(){
    var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
         return scrollT;
  }
