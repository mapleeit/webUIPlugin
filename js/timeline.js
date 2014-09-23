var cursor = 0;
		$(function(){
			settings = {
				timelineLeft:502,
				timelineTop:30,
			};
			$('#timeline').css({"left":settings.timelineLeft,"top":settings.timelineTop});
			var cursorIssue =15;
			
			printTimeLine(15, cursor);
			printDate(15, cursor);
			//当点击时间轴上的任何一点的时候
			$('#timeline-scale li').click(function(event){
				cursorIssue = $(this).attr('data-setoff');
				var draggerLeftPosition = -27+ 60 * cursorIssue;
				$('#timeline-dragger').animate({left:draggerLeftPosition+'px'});
				// alert(cursorIssue);
				printDate(cursorIssue, cursor);
				calDatePrintOut(cursor, cursorIssue);
			})
			$('#time-player-prev').click(function(event){
				cursorIssue = ($('#timeline-dragger').offset().left - 475)/60;
				if (cursor < 0){
					if (cursorIssue == 1){
						cursor --;
						printTimeLine(15, cursor);
						printDate(cursorIssue, cursor);
					}
					else if (cursorIssue >1){
						cursorIssue --;
						var draggerLeftPosition = -27+ 60 * cursorIssue;
						$('#timeline-dragger').animate({left:draggerLeftPosition+'px'});					
						printDate(cursorIssue, cursor);
					}
				}
				else if (cursor == 0){
					if (cursorIssue == 1){
						cursor--;
						printTimeLine(15, cursor);
						printDate(1, cursor);
					}
					else if (cursorIssue > 1){
						cursorIssue --;
						var draggerLeftPosition = -27+ 60 * cursorIssue;
						$('#timeline-dragger').animate({left:draggerLeftPosition+'px'});		
						printDate(cursorIssue, cursor);		
					}
				}
				else{
					cursor--;
					printTimeLine(15, cursor);
					printDate(15, cursor);		
				}
				
				calDatePrintOut(cursor, cursorIssue);
			})
			$('#time-player-next').click(function(event){
				// alert(cursor);
				cursorIssue = ($('#timeline-dragger').offset().left - 475)/60;
				// alert(cursorIssue);
				if (cursorIssue < 15) {
					cursorIssue ++;
					var draggerLeftPosition = -27+ 60 * cursorIssue;
					$('#timeline-dragger').animate({left:draggerLeftPosition+'px'});
				}
				else if (cursor<0){
					cursor ++;
					printTimeLine(15, cursor);
					printDate(15, cursor); 
					// alert('已经到最顶了');
				};
				printDate(cursorIssue, cursor);
				calDatePrintOut(cursor, cursorIssue);
			})
			$('#time-player-play').click(function(event){
				var draggerLeftPosition = -27+ 60 * 15;
				var time = (900 - ($('#timeline-dragger').offset().left - 535))*15000/900;
				$('#test').append($('#timeline-dragger').offset().left);
				$('#timeline-dragger').animate({left:draggerLeftPosition+'px'},time);
				for (var i = 10;i>=0;i--){
					$('#timeline-dragger').animate({left:'33px'},300);
					$('#timeline-dragger').animate({left:draggerLeftPosition+'px'},15000);
					
				}
				
				var nowPoint = $('#timeline-dragger').offset().left;
				var cursorIssue = Math.round((nowPoint - 535)/60 + 1);
				var fresh = setInterval("startFresh("+cursor+")", 100);	
				if (cursorIssue == 15) {
					clearInterval(fresh);
				};
				calDatePrintOut(cursor, cursorIssue);
			})
			$('#time-player-stop').click(function(){
				$('#timeline-dragger').stop(true);
				$('#test').append($('#timeline-dragger').offset().left);
				$('#test').append('!!!!'+nowCursorIssue);
				// var draggerLeftPosition = -27+ 60 * cursorIssue;
				// $('#timeline-dragger').animate({left:draggerLeftPosition+'px'},"slow");
				calDatePrintOut(cursor, cursorIssue);
			})
			// alert("b:"+b);
			// alert("c:"+c);
			// return c;

		})

		// 打印出时间轴
		function printTimeLine(days, cursor){
			var myDate = new Date();
			myDate.setDate(myDate.getDate()+cursor-15);
			for (var i = days - 1; i >= 0; i--) {
				myDate.setDate(myDate.getDate()+1);
				// jQuery默认少一个月，是从0——11月，因此加1
				var month = myDate.getMonth()+1;
				var day = myDate.getDate();
				var tempDay = parseInt(day);	
				var stringDate = month.toString()+'.'+tempDay.toString();
				var content = "<li data-setoff='"+ (days - i)+"' id='data"+(days-i)+"'></li>";
				$('#timeline-scale').append(content);
				var string = "#data"+(days - i ).toString();
				$(string).text(stringDate);
			};
			return cursor;
		};
		function printDate(cursorIssue, cursor){
			var myDate = new Date();
			myDate.setDate(myDate.getDate()- (15 - cursorIssue - cursor));
			// jQuery默认少一个月，是从0——11月，因此加1
			var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			var tempDay = parseInt(day);
			var stringDate = month.toString()+'.'+tempDay.toString();
			if (cursor == 0 && cursorIssue == 15){
				$("#timeline-date").text("今天");
			}else{
				$("#timeline-date").text(stringDate);
			}
			return cursor;
		};
		function startFresh(cursor){
			var nowPoint = $('#timeline-dragger').offset().left;
			// alert(nowPoint);
			var cursorIssue = Math.round((nowPoint - 535)/60 + 1);	
			printDate(cursorIssue, cursor);
		};
		//计算时间并给首页隐藏DIV加上数据，用来传参
		function calDatePrintOut(cursor, cursorIssue){
			//计算时间
			var myDate = new Date();
			myDate.setDate(myDate.getDate()- (15 - cursorIssue - cursor));
			// jQuery默认少一个月，是从0——11月，因此加1
			var year = myDate.getFullYear();
			var month = myDate.getMonth()+1;
			var day = myDate.getDate();
			var tempDay = parseInt(day);
			if (month < 10 && day < 10) {
				var stringDate = year.toString() + "-0" + month.toString()+'-0'+tempDay.toString()+" 00:00:00";	
			}
			else if(month < 10 && day >=10){
				var stringDate = year.toString() + "-0" + month.toString()+'-'+tempDay.toString()+" 00:00:00";	
			}
			else if(month >=10 && day <10 ){
				var stringDate = year.toString() + "-" + month.toString()+'-0'+tempDay.toString()+" 00:00:00";	
			}
			else if(month >=10 && day >=10){
				var stringDate = year.toString() + "-" + month.toString()+'-'+tempDay.toString()+" 00:00:00";	
			};
			
			//给首页隐藏DIV加上数据
			$("#hide_date").text(stringDate);
		}



var isIE = (document.all) ? true : false;

var select = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}

var BindAsEventListener = function(object, fun) {
	return function(event) {
		return fun.call(object, (event || window.event));
	}
}

function addEventHandler(oTarget, sEventType, fnHandler) {
	if (oTarget.addEventListener) {
		oTarget.addEventListener(sEventType, fnHandler, false);
	} else if (oTarget.attachEvent) {
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} else {
		oTarget["on" + sEventType] = fnHandler;
	}
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else { 
        oTarget["on" + sEventType] = null;
    }
};

var SimpleDrag = Class.create();
SimpleDrag.prototype = {
  initialize: function(drag) {
	this.Drag = select(drag);
	this._x = this._y = 0;
	this._fM = BindAsEventListener(this, this.Move);
	this._fS = Bind(this, this.Stop);
	this.Drag.style.position = "absolute";
	addEventHandler(this.Drag, "mousedown", BindAsEventListener(this, this.Start));
  },
  Start: function(oEvent) {
	this._x = oEvent.clientX - this.Drag.offsetLeft;
	this._y = oEvent.clientY - this.Drag.offsetTop;
	addEventHandler(document, "mousemove", this._fM);
	addEventHandler(document, "mouseup", this._fS);
  },
  Move: function(oEvent) {
  	if (oEvent.clientX < 570 && (oEvent.clientX - this._x ) < 33){
  		this.Stop();
  	}else if(oEvent.clientX > 900 && (oEvent.clientX - this._x ) > 873){
  		this.Stop();
  	}else {
		this.Drag.style.left = oEvent.clientX - this._x + "px";
  	}
	var fresh1 = setInterval("startFresh("+cursor+")", 10);	
  },
  Stop: function() {
	removeEventHandler(document, "mousemove", this._fM);
	removeEventHandler(document, "mouseup", this._fS);
	clearInterval(fresh1);
  }
};		