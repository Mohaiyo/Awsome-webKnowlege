一，DOM节点概念

根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：
	整个文档是一个文档节点
	每个 HTML 元素是元素节点
	HTML 元素内的文本是文本节点
	每个 HTML 属性是属性节点
	注释是注释节点
	
	节点关系： 子(child)、父(parent)、同胞(sibling)
二，DOM操作

dom操作就是对元素、文本、属性三种节点类型的操作，以及它们的层级关系的一个操作
 
 因此有三种DOM操作类型: 节点操作、文本(内容)操作、属性操作
 
 操作的办法就是：增删改查
 
1，节点操作
 
（1）创建新节点

      createDocumentFragment()    //创建一个DOM片段

      createElement()   //创建一个元素节点

      createTextNode()   //创建一个文本节点
      
      createAtribute()   // 创建一个属性节点
      
（2）删除
   
    removeChild()       // 删除节点

（2）更改 (插入、替换)

      appendChild()     // 向尾部插入子节点
                     
      insertBefore()    // 向前插入子节点
      
      replaceChild()    // 替换子节点


（4）查找
      
   查找指定元素节点：    // 通过方法查找
      
      getElementsByTagName()      //通过标签名称

      getElementsByName()         //通过元素的Name属性的值(IE容错能力较强，会得到一个
                                    数组，其中包括id等于name值的)
      getElementById()            //通过元素Id，唯一性
      
      getElementsByClassName()    // 通过className查找 注意，ie9以下不兼容    

   
   查找关系节点：       // 通过属性查找
   
      Node.parentNode          // 父节点
      
      Node.childNodes           // 子节点
      
      Node.nextSibling         // 下一个同胞节点
      
      Node.previousSibling     // 前一个同胞节点



  2，文本(内容) 和 属性操作
  
     (1) 文本(内容)操作
     
        Node.nodeName            // 获取节点名称
     
        Node.innerHTML           // 获取或设置节点内容(包含html标签)
        
        Node.nodeValue           // 获取指定文本节点内容 (不推荐使用)
        
        Node.textContent         // 获取文本节点内容  (推荐使用)  
        
     (2) 属性操作 
     
        Node.setAttribute(属性名，属性值)         // 设置属性 (IE9以下不支持)
        
        Node.getAttribute(属性名)               //  获取属性
二， DOM事件 （常用）

1，文档事件
 
   onload          // 页面或图像加载完成后触发
   
   onscroll        // 页面滚动事件    
   
   onresize        // 页面缩放事件
   
 
  2，点击事件
  
   点击、双击、移动、经过、按下、放开
   
   onclick  ondblclick                     // 点击事件
   
   onmouseenter  onmouseleave              // 移动事件。不支持冒泡
   
   onmouseover   onmouseout                // 经过事件  支持冒泡
   
   onmousedown   onmouseup                 // 按下放开事件
   
   onmousemove                             // 鼠标移动事件
   
   
   
 3，拖拽事件
        
   draggable=true           设置元素可拖动 （图片和链接默认可拖动，不需要设置）
   
   (1) ondragstart              开始拖拽
   
   (2) ondrag                   拖拽过程中
   
   (3) ondragenter              进入目标元素区域时触发
   
   (4) ondragover               在目标元素区域内移动时触发
    
      需要在这个方法内调用preventDefault()方法阻止默认行为。 默认情况下，目标元素是不 
      
      接受其他元素的
   
   (5) ondragleave              离开目标区域的范围时触发
   
   (6) ondrop                   放置在目标元素上时触发
   
   (7) ondragend                拖拽结束
       
     需要在这个方法内调用preventDefault()方法阻止默认行为。 默认情况下，目标元素是不接
     
     受其他元素的
二， 事件对象 event

1，事件对象
 
  属性：
 
   event.target           // 事件对象目标节点
   
   event.cancelable       // ie下，设为true可阻止事件默认行为
   
   event.type             // 事件名称
 
  方法：
  
   event.preventDefault()       // 阻止事件默认行为
   
   event.stopPropagation()      // 阻止事件冒泡
   
   
 2，目标事件对象
 
   addEventListener(事件名，事件函数，false) // 给目标节点添加监听事件，默认为冒泡
   
   removeEventListener()        // 移除目标节点的事件监听
   
   handleEvent()                // 把任意对象注册为事件处理程序
   

 3，鼠标/键盘事件对象
 
   属性：
     
     event.clientX         //事件触发时鼠标的水平坐标 相对于浏览器窗口 
     
     event.clientY         // 事件触发时鼠标的垂直坐标 相对于浏览器窗口
     
     event.screenX         //事件触发时鼠标的水平坐标 相对于设备屏幕       
     
     event.screenX         //事件触发时鼠标的垂直坐标 相对于设备屏幕        
     
     
           
   低版本ie仅支持冒泡，w3c标准冒泡于捕获都支持