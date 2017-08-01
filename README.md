# Sjquery.js

- 轻量级`js`框架，用于操作`DOM`元素，处理跨浏览器事件和模拟`css`选择器
- 一些常用方法的封装
- 还在完善中

### API

>`$().ready`

DOM ready downloads

>`$().eq()`

选取带有指定 index 值的元素。

>`$().last()`

选取最后一个元素    

>`$().get()`

获取元素

>`$().length()`

返回元素数值

>`$().html(str)`

返回DOM元素的innerHTML

>`$().click(fn)`

click事件

>`$().opacity(num)`

设置元素透明度，传入数值

>`$().getWindow()`

跨浏览器获取可视窗口大小

>`$().getScrPos()`

获取滚动条位置，返回top和left值

>`$().hide()`

hide方法，设置物体隐藏不显示，也不占据文档流

>`$().show()`

show方法，显示隐藏的DOM元素

>`$().attr(attr,value)`

获取节点的attribute属性或设置其属性值
>`$().addEvent(element,type,handler)`

跨浏览器添加事件

>`$().removeEvent(element,type,handler)`

跨浏览器移除事件

>`$().preventDefault(event)`

阻止事件的默认行为

>`$().getTarget(event)`

获取事件的目标，taregt/srcElement


>`$().hover(fnOver,fnOut)`

hover事件

>`$().each(fn)`

each方法

>`$().bind(type,fn)`

bind方法


>`$().addClass(className)`

为DOM元素添加类

>`$().removeClass(className)`

为DOM元素移除类

>`$().getStyle(element,attr)`

跨浏览器获取style

>`$().setFixed(left, top)`

固定定位

