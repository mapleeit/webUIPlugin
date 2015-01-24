# Timeline plugin, a Web UI plugin used jQuery

## Demo
http://www.miaozhaofeng.cn/demo/#/

## How to use
- First, you must reference `jquery-1.11.1.js`, `timeline.js` and `timeline-main.css`.
  - Code:  
  ```html
  <link rel="stylesheet" type="text/css" href="css/timeline-main.css">
  <script type="text/javascript" src="js/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="js/timeline.js"></script>
  ```
- Second, you should creat a div with a id. For example : `id = 'timeline'` 
  - Code:
  ```html
  <div id = 'timeline'></div>
  ```
- Third, write a javascript code to initilize the plugin.  
  - Code:  
  ```javascript
  <script type="text/javascript">
		
		$("#timeline").timeline('init', {width:1037, height:69, daysNo : 15, 
		callback : function(){
			var content = $("#timeline").data().timeline.timelineOutDate;
			$("#myInput").html(content);
		}
		});
	</script>
  ```
  _you can change the parameters within the `'init', {width : xxx, height : xxx, ...}`_
- Fourth, draw and bind the buttons and events
  - Code:
  ```javascript
	$("#timeline").timeline('draw');
	$("#timeline").timeline('bindClickEvent');
	```
	
## Public functions that you can call
- init : initilize the div with user's parameters
- destroy : delete the parameters mounting on the div object
- draw : draw the pics of the timeline
- save : save the timelineOutDate to the div object's `data().timeline`, usually used inside
- bindClickEvent : bind the buttons and the events, usually used inside

## Parameters you can change (input)
- width : the width you want to let the plugin be, default 1037px
- height : the height you want to let the plugin be, default 69px
- daysNo : the number of days you want the plugin be, default 15
- shiftTime : how long you want to make the dragger shift form the very left to the right, default 15000ms
- callback() : a function that you want to call after the dragger move to the next day

### How to change the parameters


## The date when the dragger move to the next day (output)
- timelineOutDate : This is the only argument it will give you back. It's like "`Sat Dec 13 2014 00:17:04 GMT+0800 (CST)`", which you can use for you own function.

### How to use `timelineOutDate`
you can use this code to get the date which the dragger is exactly on :
`var result = $("#timeline").data().timeline.timelineOutDate;`

## Problem to solve 
- nothing

## Question
  Please email mel if you have any question about this plugin:
  522856232@qq.com
  
## End
by: mapleeit
