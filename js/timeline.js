$(function(){
	//fetchSize();
	var cursorIssue;
	var cursor = 0;
	printTimeLine(15, cursor);
	printDate(15, cursor);
	$('#timeline-scale li').click(function(event){
		cursorIssue = $(this).attr('data-setoff');
		var draggerLeftPosition = -27+ 60 * cursorIssue;
		$('#timeline-dragger').animate({left:draggerLeftPosition+'px'});
		// alert(cursorIssue);
		printDate(cursorIssue, cursor);
		return cursorIssue;
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

		return cursorIssue;
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
		return cursorIssue;
	})
	$('#time-player-play').click(function(event){
		var draggerLeftPosition = -27+ 60 * 15;
		$('#test').append($('#timeline-dragger').offset().left);
		$('#timeline-dragger').animate({left:draggerLeftPosition+'px'},15000);
		$('#timeline-dragger').animate({left:'33px'},300);
		var nowPoint = $('#timeline-dragger').offset().left;
		var cursorIssue = Math.round((nowPoint - 535)/60 + 1);
		var fresh = setInterval("startFresh()", 100);	
		if (cursorIssue == 15) {
			clearInterval(fresh);
		};
		return cursorIssue;
	})
	$('#time-player-stop').click(function(){
		$('#timeline-dragger').stop();
		$('#test').append($('#timeline-dragger').offset().left);
		$('#test').append('!!!!'+nowCursorIssue);
		// var draggerLeftPosition = -27+ 60 * cursorIssue;
		// $('#timeline-dragger').animate({left:draggerLeftPosition+'px'},"slow");
	})
});
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
};
function printDate(cursorIssue, cursor){
	var myDate = new Date();
	myDate.setDate(myDate.getDate()- (15 - cursorIssue - cursor));
	// jQuery默认少一个月，是从0——11月，因此加1
	var month = myDate.getMonth()+1;
	var day = myDate.getDate();
	var tempDay = parseInt(day);
	var stringDate = month.toString()+'.'+tempDay.toString();
	$("#timeline-date").text(stringDate);
};
function startFresh(){
	var nowPoint = $('#timeline-dragger').offset().left;
	// alert(nowPoint);
	var cursorIssue = Math.round((nowPoint - 535)/60 + 1);	
	printDate(cursorIssue, cursor);
};
