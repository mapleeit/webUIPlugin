(function($){
	/*
	 * 设定各个图画的长宽属性
	 */
	var unitWidth = 60,
		unitHeight = 31,
		draggerWidth = 61,
		draggerHeight = 13,
		leftEdgeWidth = 15,
		leftEdgeHeight = 15,
		rightEdgeWidth = 16,
		rightEdgeHeight = 15,
		playerWidth = 104,
		middleDis = 2,
		paddingTop = 38;
	/*
	 * 初始化游标
	 */	
	var cursor = 0,
		cursorIssue = 0; // cursorIssue : 0 - 14
	/*
	 * privateFunc : 私有函数 -> 只能被匿名函数内部调用
	 */
	var privateFunc = function(){
		alert("i'm privateFunc!");
	}
	/*
	 * initStyle : 根据图画的长宽属性定义其CSS属性
	 */
	var initStyle = function(options){
		$("#timeline").css({
			'width' : options.width
		});
		$("#timeline-rail").css({
			'width' : (options.daysNo * unitWidth),
			'height' : options.height,
			'padding-left' : leftEdgeWidth,
			'padding-right' : rightEdgeWidth,
			'padding-top' : paddingTop
		});
		$("#timeline-rail-left").css({
			'width' : leftEdgeWidth,
			'height' : leftEdgeHeight
		});
		$("#timeline-rail-right").css({
			'width' : rightEdgeWidth,
			'height' : rightEdgeHeight,
			'margin-left' : (options.daysNo * unitWidth)
		});
		$("#timeline-dragger").css({
			'width' : draggerWidth,
			'height' : draggerHeight,
			'margin-left' : leftEdgeWidth,
		});
		$("#time-player").css({
			'padding-top' : paddingTop
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
		var options = arg.data().timeline2; // options : {width : XX; height : XXX ...}
		// 如果用户同时指定了daysNo和width
		// * 指定的宽度不够，那么按宽度来
		if ((options.daysNo * unitWidth + leftEdgeWidth + rightEdgeWidth +playerWidth + middleDis) > options.width) { 
			arg.width(options.width).height(options.height); // 把div的宽度和高度调整好
			var tempDaysNo = Math.floor((options.width - leftEdgeWidth - rightEdgeWidth - playerWidth - middleDis) / unitWidth);
			tempDaysNo = tempDaysNo > 0 ? tempDaysNo : 0;
			$.extend(options , {daysNo : tempDaysNo});
		}else if((options.daysNo * unitWidth + leftEdgeWidth + rightEdgeWidth + playerWidth - middleDis) <= options.width){
		// * 指定的宽度较大或者正好
			arg.width(options.width).height(options.height);
		}
		/*
		 * 在上面构建的div中打印html框架
		 */	
		var content = '<div id="timeline-rail"><div id="timeline-rail-left"></div><a id="timeline-dragger" href="javascript:void(0)"><div id="timeline-date"></div><div id="timeline-arrow"></div></a><div id="timeline-rail-right"></div><ul id="timeline-scale"></ul></div><div id="time-player"><a href="javascript:void(0)" id="time-player-prev"></a><a href="javascript:void(0)" id="time-player-play"></a><a href="javascript:void(0)" id="time-player-stop"></a><a href="javascript:void(0)" id="time-player-next"></a></div>';
		arg.html(content);

		for(var i = 0; i < options.daysNo; i++){
			var content = "<li data-setoff='"+ i + "' id='data" + i + "'></li>";
			$('#timeline-scale').append(content);
		}

		initStyle(options);
				
	}

	/*
	 * printDateSeries : 打印时间轴下面的时间序列
	 */
	var printDateSeries = function(arg){
		var options = arg.data().timeline2; // options : {width : XX; height : XXX ...; daysNo : XXX}

		var myDate = new Date();
		myDate.setDate(myDate.getDate() - options.daysNo + cursor);

		for(var i = 0; i < options.daysNo; i++){
			var string = "#data" + i.toString();
			myDate.setDate(myDate.getDate() + 1);
			var month = myDate.getMonth() + 1;
			var day = parseInt(myDate.getDate());
			var stringDate = month.toString() + '.' + day.toString();
			$(string).text(stringDate);			
		}
	}
	/*
	 * printDateBar : 打印时间轴上面的时间指示
	 * 入口参数 ：cursor cursorIssue
	 */
	var printDateBar = function(arg){
		var options = arg.data().timeline2;

		var myDate = new Date();
		myDate.setDate(myDate.getDate()- (options.daysNo - cursorIssue - cursor - 1));
		// jQuery默认少一个月，是从0——11月，因此加1
		var month = myDate.getMonth() + 1;
		var day = parseInt(myDate.getDate());
		var stringDate = month.toString() + '.' + day.toString();

		if ((cursor + cursorIssue) == options.daysNo - 1){
			$("#timeline-date").text("今天");
		}else{
			$("#timeline-date").text(stringDate);
		}
		// 保存时间
		saveDate(arg);
	}
	/*
	 * saveDate : 将目前dragger所在位置的时间的时间戳挂载到目标div上作为输出端口
	 * 输出 ：data() : timeline2 : timelineOutDate
	 */
	var saveDate = function(arg){
		var options = arg.data().timeline2;

		var myDate = new Date();
		myDate.setDate(myDate.getDate()- (options.daysNo - cursorIssue - cursor - 1));

		$.extend(options, {'timelineOutDate': myDate});
	}
	/*
	 * liClick : 绑定li元素的点击事件
	 */
	var liClick = function(arg){
		var liArray = arg.find("li");
		var dragger = arg.find("#timeline-dragger");

		liArray.click(function(){
			// this.id : 'data8' -> this.id.slice(4) : '8'
			var clickPos = this.id.slice(4);
			var shiftDis = (clickPos - cursorIssue) * unitWidth;
			dragger.animate({left : '+=' + shiftDis});	
			// update cursorIssue
			cursorIssue = clickPos;
			printDateBar(arg);
			arg.data().timeline2.callback();
		});
	}
	/*
	 * preClick : 绑定pre按钮的点击事件
	 */
	var preClick = function(arg){
		var preBtn = arg.find("#time-player-prev");
		var dragger = arg.find("#timeline-dragger");
		preBtn.click(function(){
			if (cursorIssue <= 0) {
				cursor -= 1;
				printDateBar(arg);
				printDateSeries(arg);
				arg.data().timeline2.callback();
			}else{
				dragger.animate({left : '-=' + unitWidth});
				cursorIssue -= 1;
				printDateBar(arg);	
				arg.data().timeline2.callback();
			}
		});
	}
	/*
	 * nextClick : 绑定next按钮的点击事件
	 */
	var nextClick = function(arg){
		var nextBtn = arg.find("#time-player-next");
		var dragger = arg.find("#timeline-dragger");
		nextBtn.click(function(){
			if (cursorIssue >= 14) {
				cursor += 1;
				printDateBar(arg);
				printDateSeries(arg);
				arg.data().timeline2.callback();
			}else{
				dragger.animate({left : '+=' + unitWidth});
				cursorIssue += 1;
				printDateBar(arg);
				arg.data().timeline2.callback();
			}
		})
	}
	/*
	 * playClick : 绑定play按钮的点击事件
	 */
	var playClick = function(arg){
		var playBtn = arg.find("#time-player-play");
		var dragger = arg.find("#timeline-dragger");
		playBtn.click(function(){
			console.log(arg.data().timeline2.callback());
		});
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
				var settings = $this.data('timeline2');

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
						callback : function(){
							console.log(cursorIssue);
						}
					}

					settings = $.extend({}, defaults, options);
					$this.data('timeline2', settings);
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
				$this.removeData('timeline2');
			})
		},
		/*
		 * val : 其他函数
		 */
		val : function(options){
			var someValue = this.eq(0).html();
			return someValue;
		},

		show : function(){
			alert("i'm show!");
		},

		draw : function(){
			printTimeline($(this));
			printDateSeries($(this));
			printDateBar($(this));
		},

		save : function(){
			saveDate($(this));
		},

		bindClickEvent : function(){
			liClick($(this));
			preClick($(this));
			nextClick($(this));
			playClick($(this));
		}
	}


	$.fn.timeline2 = function(){

		// privateFunc();


		var method = arguments[0];

		if (methods[method]) {
			method = methods[method];
			arguments = Array.prototype.slice.call(arguments, 1);
		}else if(typeof(method) == 'object'|| !method ){
			method = methods.init;
		}else{
			$.error('Method ' + method + ' does not exist on jQuery.timeline2');
			return this;
		}

		return method.apply(this, arguments);
	}
	
})(jQuery);