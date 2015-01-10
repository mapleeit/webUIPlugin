(function($){
	/*
	 * initStyle : 根据图画的长宽属性定义其CSS属性
	 */
	var initStyle = function(arg){
		var options = arg.data().timeline; // options : {width : XX; height : XXX ...; daysNo : XXX}
		var rail = arg.find(".timeline-rail");
		var railLeft = arg.find(".timeline-rail-left");
		var railRight = arg.find(".timeline-rail-right");
		var dragger = arg.find(".timeline-dragger");
		var player = arg.find(".time-player");
		arg.css({
			'width' : options.width
		});
		rail.css({
			'width' : (options.daysNo * options.unitWidth),
			'height' : options.height,
			'padding-left' : options.leftEdgeWidth,
			'padding-right' : options.rightEdgeWidth,
			'padding-top' : options.paddingTop
		});
		railLeft.css({
			'width' : options.leftEdgeWidth,
			'height' : options.leftEdgeHeight
		});
		railRight.css({
			'width' : options.rightEdgeWidth,
			'height' : options.rightEdgeHeight,
			'margin-left' : (options.daysNo * options.unitWidth)
		});
		dragger.css({
			'width' : options.draggerWidth,
			'height' : options.draggerHeight,
			'margin-left' : options.leftEdgeWidth,
		});
		player.css({
			'padding-top' : options.paddingTop
		});

	}
	/*
	 * printTimeline : 打印出时间轴
	 */
	var printTimeline = function(arg){
		/*
		 * 构建出时间轴的div框架：width、height、float...
		 * 根据用户给的天数和宽度判断布局
		 */	
		var options = arg.data().timeline; // options : {width : XX; height : XXX ...}
		// 如果用户同时指定了daysNo和width
		// * 指定的宽度不够，那么按宽度来
		if ((options.daysNo * options.unitWidth + options.leftEdgeWidth + options.rightEdgeWidth +options.playerWidth + options.middleDis) > options.width) { 
			arg.width(options.width).height(options.height); // 把div的宽度和高度调整好
			var tempDaysNo = Math.floor((options.width - options.leftEdgeWidth - options.rightEdgeWidth - options.playerWidth - options.middleDis) / options.unitWidth);
			tempDaysNo = tempDaysNo > 0 ? tempDaysNo : 0;
			$.extend(options , {daysNo : tempDaysNo});
		}else if((options.daysNo * options.unitWidth + options.leftEdgeWidth + options.rightEdgeWidth + options.playerWidth - options.middleDis) <= options.width){
		// * 指定的宽度较大或者正好
			arg.width(options.width).height(options.height);
		}
		/*
		 * 在上面构建的div中打印html框架
		 */	
		var content = '<div class="timeline-rail"><div class="timeline-rail-left"></div><a class="timeline-dragger" href="javascript:void(0)"><div class="timeline-date"></div><div class="timeline-arrow"></div></a><div class="timeline-rail-right"></div><ul class="timeline-scale"></ul></div><div class="time-player"><a href="javascript:void(0)" class="time-player-prev"></a><a href="javascript:void(0)" class="time-player-play"></a><a href="javascript:void(0)" class="time-player-stop"></a><a href="javascript:void(0)" class="time-player-next"></a></div>';
		arg.html(content);

		var scale = arg.find(".timeline-scale");

		for(var i = 0; i < options.daysNo; i++){
			var content = "<li class='timeline-data" + i + "'></li>";
			scale.append(content);
		}

		initStyle(arg);
				
	}

	/*
	 * printDateSeries : 打印时间轴下面的时间序列
	 */
	var printDateSeries = function(arg){
		/*
		 * options : {width : XX; height : XXX ...; daysNo : XXX}
		 */
		var options = arg.data().timeline; 

		var myDate = new Date();
		myDate.setDate(myDate.getDate() - options.daysNo + options.cursor);

		for(var i = 0; i < options.daysNo; i++){
			var string = ".timeline-data" + i.toString();
			var selector = arg.find(string);
			myDate.setDate(myDate.getDate() + 1);
			var month = myDate.getMonth() + 1;
			var day = parseInt(myDate.getDate());
			var stringDate = month.toString() + '.' + day.toString();
			selector.text(stringDate);			
		}
	}
	/*
	 * printDateBar : 打印时间轴上面的时间指示
	 * 入口参数 ：cursor cursorIssue
	 */
	var printDateBar = function(arg){
		var options = arg.data().timeline;
		var date = arg.find(".timeline-date");

		var myDate = new Date();
		myDate.setDate(myDate.getDate()- (options.daysNo - options.cursorIssue - options.cursor - 1));
		// jQuery默认少一个月，是从0——11月，因此加1
		var month = myDate.getMonth() + 1;
		var day = parseInt(myDate.getDate());
		var stringDate = month.toString() + '.' + day.toString();

		if ((options.cursor + options.cursorIssue) == options.daysNo - 1){
			date.text("今天");
		}else{
			date.text(stringDate);
		}
		// 保存时间
		saveDate(arg);
	}
	/*
	 * saveDate : 将目前dragger所在位置的时间的时间戳挂载到目标div上作为输出端口
	 * 输出 ：data() : timeline : timelineOutDate
	 */
	var saveDate = function(arg){
		var options = arg.data().timeline;

		var myDate = new Date();
		myDate.setDate(myDate.getDate()- (options.daysNo - options.cursorIssue - options.cursor - 1));

		$.extend(options, {'timelineOutDate': myDate});
	}
	/*
	 * liClick : 绑定li元素的点击事件
	 */
	var liClick = function(arg){
		var liArray = arg.find("li");
		var dragger = arg.find(".timeline-dragger");
		var options = arg.data().timeline;

		liArray.click(function(){
			var clickPos = $(this).attr("class").slice(13);
			var shiftDis = (clickPos - options.cursorIssue) * options.unitWidth;
			dragger.animate({left : '+=' + shiftDis});	
			// update cursorIssue
			options.cursorIssue = parseInt(clickPos);
			printDateBar(arg);
			arg.data().timeline.callback();
		});
	}
	/*
	 * preClick : 绑定pre按钮的点击事件
	 */
	var preClick = function(arg){
		var options = arg.data().timeline;
		var preBtn = arg.find(".time-player-prev");
		var dragger = arg.find(".timeline-dragger");
		preBtn.click(function(){
			if (options.cursorIssue <= 0) {
				options.cursor -= 1;
				printDateBar(arg);
				printDateSeries(arg);
				arg.data().timeline.callback();
			}else{
				dragger.animate({left : '-=' + options.unitWidth});
				options.cursorIssue -= 1;
				printDateBar(arg);	
				arg.data().timeline.callback();
			}
		});
	}
	/*
	 * nextClick : 绑定next按钮的点击事件
	 */
	var nextClick = function(arg){

		var options = arg.data().timeline;
		var nextBtn = arg.find(".time-player-next");
		var dragger = arg.find(".timeline-dragger");

		nextBtn.click(function(){
			if (options.cursorIssue >= (options.daysNo - 1) ) {
				options.cursor += 1;
				printDateBar(arg);
				printDateSeries(arg);
				arg.data().timeline.callback();
			}else{
				console.log("WTF");
				dragger.animate({left : '+=' + options.unitWidth});
				options.cursorIssue += 1;
				printDateBar(arg);
				arg.data().timeline.callback();
			}
		})
	}
	/*
	 * playClick : 绑定play按钮的点击事件
	 */
	var playClick = function(arg){
		var options = arg.data().timeline;
		var playBtn = arg.find(".time-player-play");
		var dragger = arg.find(".timeline-dragger");
		/*
		 * 计算dragger在最左边时候的距离浏览器左边缘的距离，用于后续确定cursorIssue使用
		 */	
		options.initLeftPos = dragger.offset().left - options.cursorIssue * options.unitWidth;

		playBtn.click(function(){
			var time = ((options.daysNo - 1)  - options.cursorIssue) * options.shiftTime / (options.daysNo - 1) ; 
			var shiftDis = ((options.daysNo - 1)  - options.cursorIssue) * options.unitWidth;
			dragger.animate({left : '+=' + shiftDis}, time);
			options.monitor = setInterval(fresh, 100, options.initLeftPos, dragger, arg);
		});
	}
	/*
	 * stopClick : 绑定stop按钮的点击事件
	 */
	var stopClick = function(arg){
		var options = arg.data().timeline;

		var stopBtn = arg.find(".time-player-stop");
		var dragger = arg.find(".timeline-dragger");
		stopBtn.click(function(){
			dragger.stop(true);
			var nowPos = options.cursorIssue * options.unitWidth;
			dragger.animate({left : nowPos + "px"});
			clearInterval(options.monitor);
		});
	}
	/*
	 * fresh : 刷新获得实时时间
	 */
	var fresh = function(initLeftPos, dragger, arg){
		var options = arg.data().timeline;
		var nowPos = dragger.offset().left;
		options.cursorIssue = Math.round((nowPos - initLeftPos) / options.unitWidth);
		printDateBar(arg);
		arg.data().timeline.callback();
		if (options.cursorIssue >= (options.daysNo - 1) ) {
			clearInterval(options.monitor);
		};
	}


	/*
	 * mouseDrag : 鼠标拖拽模块
	 */
	var mouseDrag = function(arg){
		var dx,
			dy,
			isMove = 0;
		var options = arg.data().timeline;
		var dragger = arg.find(".timeline-dragger");
		// 全局记录鼠标的坐标
		$(document).mousemove(function(event){
			var eX = event.pageX;
			// console.log(eX);
			if (isMove && eX > (options.initLeftPos + options.unitWidth / 2) && eX < (options.initLeftPos + options.unitWidth * (options.daysNo - 1 / 2))) {
				dragger.css({'left':eX-dx});
				options.mouseMonitor = setInterval(fresh, 100, options.initLeftPos, dragger, arg);	
			};
		});
		// 对dragger进行操作
		dragger.mousedown(function(event){
			// console.log(this);
			isMove = 1;
			dx=event.pageX-parseInt($(this).css("left"));
		}).mouseup(function(event){
			isMove = 0;
			var nowPos = options.cursorIssue * options.unitWidth;
			dragger.animate({left : nowPos + "px"});
			clearInterval(options.mouseMonitor);
		})
	}


	/*
	 * methods : 提供外部可以访问的函数接口
	 */
	var methods = {
		/*
		 * init : 公有函数 -> 初始化传参覆盖默认参数
		 */
		init : function(options){
			return this.each(function(){
				var $this = $(this);
				var settings = $this.data('timeline');

				if (typeof(settings) == 'undefined') {
					var defaults = {
						/*
						 * width : 默认宽度 
						 */
						width : 1037,
						/*
						 * heigth : 默认高度
						 */						
						heigth : 69,
						/*
						 * daysNo : 默认天数 
						 */						
						daysNo : 15,
						/*
						 * shiftTime : 默认从头移动到尾部时间 
						 */		
						shiftTime : 15000, // 15s
						/******* 内部使用的参数 *******/
						/*
						 * 初始化游标
						 */	
						cursor : 0,
						cursorIssue : 0,
						/*
						 * 设定各个图画的长宽属性
						 */
						unitWidth : 60, // 单位时间条长度
						unitHeight : 31, // 单位时间条高度
						draggerWidth : 61, // 拉动长条的长度
						draggerHeight : 13, // 拉动长条的高度
						leftEdgeWidth : 15, // 左边缘的宽度
						leftEdgeHeight : 15, // 左边缘的高度
						rightEdgeWidth : 16, // 右边缘的宽度
						rightEdgeHeight : 15, // 右边缘的高度
						playerWidth : 104, // 播放按钮模块的总长度
						middleDis : 2, // 时间条模块与播放按钮模块的间隙宽度
						paddingTop : 38, // padding-top
						/*
						 * 定义全局变量
						 */
						monitor : 0,
						initLeftPos : 0,
						mouseMonitor : 0,
						/******* 内部使用的参数 *******/
						callback : function(){
							console.log(this.cursorIssue);
						},
						
					}

					settings = $.extend({}, defaults, options);
					$this.data('timeline', settings);
				}else{
					settings = $.extend({}, defaults, options);
				}
			});
		},
		/*
		 * destroy : 删掉挂载在目标对象上的参数
		 */
		destroy : function(options){
			return $(this).each(function(){
				var $this = $(this);
				$this.removeData('timeline');
			})
		},

		draw : function(){
			printTimeline($(this));
			printDateSeries($(this));
			printDateBar($(this));
			mouseDrag($(this));
		},

		save : function(){
			saveDate($(this));
		},

		bindClickEvent : function(){
			liClick($(this));
			preClick($(this));
			nextClick($(this));
			playClick($(this));
			stopClick($(this));
		}
	}


	$.fn.timeline = function(){

		// privateFunc();


		var method = arguments[0];

		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		}else if(typeof(method) == 'object'|| !method ){
			method = methods.init;
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.timeline');
			return this;
		}

		return method.apply(this, arguments);
	}
	
})(jQuery);