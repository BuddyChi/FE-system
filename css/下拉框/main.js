window.onload=function(){
    var box = document.getElementById('divselect'),
        title = box.getElementsByTagName('cite')[0],
        menu = box.getElementsByTagName('ul')[0],
        as = box.getElementsByTagName('a'),
        index = -1; 

    title.onclick=function(event){
      event = event || window.event;
      //显示下拉菜单
      menu.style.display = 'block';
      /*阻止点击事件传播：
          防止点击下拉菜单中的每一项时(ul->li->a),事件逐级传递到document，
          执行了document.onclick  中的 menu.style.display = 'none'语句,
          导致下拉菜单无法显示。*/
      if(event.stopPropagation){
        event.stopPropagation();
      }else{
        event.cancelBubble = true;
      }
      //添加键盘事件
      document.onkeyup = keyEvent;
  }  
    function keyEvent(e){
       e=e || window.event;
       //按了向下键,index递增，当 index>=菜单选项的总数 时,index = 0
       if(e.keyCode== 40){
          index++;
          if(index>=as.length){
            index = 0;
          }
          console.log(index);
          //先清空背景色
          clearBGC();
          //根据index,设置背景色
          as[index].style.background="#ccc";
       }
       //按了向上键，若index<=0,则设为菜单选项的总数-1(下标从0开始)，之后递减index
       else if(e.keyCode== 38){
          index--;
          if(index<0){
            index = as.length-1;
          }
          console.log(index);
          clearBGC();
          as[index].style.background="#ccc";
       }
       //按下ENTER键
       else if(e.keyCode == 13 && index != -1){
          title.innerHTML = as[index].innerHTML;
          menu.style.display = 'none'; 
          //列表隐藏后，取消键盘事件
          document.onkeyup = null;
          clearBGC();
          index = -1;
       }  
    }
    //清空背景色
    function clearBGC(){
      for (var i = 0,len= as.length; i < len; i++) {
        as[i].style.background = "#FFF";
      }
    }

   // 鼠标滑过、离开、点击每个选项时

    for (var i = 0,len= as.length; i < len; i++) {
        //滑过
        as[i].onmousemove = function(){
            //鼠标滑过时改变index的值
            index = this.getAttribute('selectid')-1;
            clearBGC();
            this.style.background = "#CCC";
        };
        //离开
        as[i].onmouseout = function(){
          this.style.background = "#FFF";
        };
        //点击
        as[i].onclick = function(){
          title.innerHTML = this.innerHTML;//这里不需要编写代码隐藏ul,可通过事件冒泡解决。
        };
    }
   // 点击页面空白处时
   document.onclick = function(){
      menu.style.display = 'none'; 
       //取消键盘事件
      document.onkeyup = null;
   }
 }
