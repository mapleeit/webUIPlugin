This is a small web UI plugin used jQuery.
It's function is very simple:
  a timeline like http://trends.baidu.com/disease/ in the left corner.
The most important parameter in js/timeline.js:
  cursor: a parameter which record the step number. 
  cursorIssue: a integer from 1 to 15, which record the location of the blue bar.
If you have any question, email me:
  522856232@qq.com
by: mapleeit
1.9/23日晚上，还剩下一处暂时无法解决的bug（个人计划推到国庆节做，因为需要重新看js的书，了解两个事件之间怎么传递变量）
2.使用方法：
（输入）
	timeline.js中settings：
		timelingLeft表示这个插件在父元素中相对于左边的位置
		timelineTop表示这个插件在父元素中相对于上边的位置
（输出）
	在首页的html文件中加入如下隐藏div
	<text style="color:white;visibility:hidden" id='hide_date'></text>
	用text()方法取id为hide_date的格式为2014-09-12 00:00:00的日期
如果有什么问题，欢迎联系我
sign-off：mapleeit（522856232@qq.com）