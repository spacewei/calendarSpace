/**
 * Created by SPACEY on 2016/11/29.
 */
var calendarSpace = (function(){
    var getBoundary = function(year,month){
        var thisMonthFirstDate = new Date(year,month,1);
        var thisMonthLastDate = new Date(year,Number(month) + 1,0);
        var lastMonthLastDate = new  Date(year,month,0);
        var nextMonthFirstDate = new Date(year,Number(month) + 1,1);
        return {thisMonthFirstDate:thisMonthFirstDate,
            thisMonthLastDate:thisMonthLastDate,
            lastMonthLastDate:lastMonthLastDate,
            nextMonthFirstDate:nextMonthFirstDate
        }
    };
    var getLastMonthLastWeek = function(lastMonthLastDate){
        var lastMonthLastWeek = [];
        var lastMonthLastWeekFirstDate = lastMonthLastDate.getDate() - lastMonthLastDate.getDay();
        for (var i=lastMonthLastWeekFirstDate;i<=lastMonthLastDate.getDate();i++){
            lastMonthLastWeek.push(i);
        }
        return lastMonthLastWeek;
    };
    var getThisMonthFirstWeek = function(thisMonthFirstDate){
        var thisMonthFirstWeek = [];
        var thisMonthFirstWeekLastDate = thisMonthFirstDate.getDate() + (6 - thisMonthFirstDate.getDay());
        for (var i=thisMonthFirstDate.getDate();i<=thisMonthFirstWeekLastDate;i++){
            thisMonthFirstWeek.push(i);
        }
        return thisMonthFirstWeek;
    };
    var getThisMonthLastWeek = function(thisMonthLastDate){
        var thisMonthLastWeek = [];
        var thisMonthLastWeekFirstDate = thisMonthLastDate.getDate() - thisMonthLastDate.getDay();
        for (var i=thisMonthLastWeekFirstDate;i<=thisMonthLastDate.getDate();i++){
            thisMonthLastWeek.push(i);
        }
        return thisMonthLastWeek;
    };
    var getNextMonthFirstWeek = function(nextMonthFirstDate){
        var nextMonthFirstWeek = [];
        var nextMonthFirstWeekLastDate = nextMonthFirstDate.getDate() + (6 - nextMonthFirstDate.getDay());
        for (var i=nextMonthFirstDate.getDate();i<=nextMonthFirstWeekLastDate;i++){
            nextMonthFirstWeek.push(i);
        }
        return nextMonthFirstWeek;
    };
    /*渲染日期主函数*/
    var renderDateShow = function(timeObj,dateShowJQ){
        dateShowJQ.empty();
        var year = timeObj.year;
        var month = timeObj.month;
        var i;
        var boundary = getBoundary(year,month);
        var thisMonthFirstDate = boundary.thisMonthFirstDate;
        var thisMonthLastDate = boundary.thisMonthLastDate;
        var lastMonthLastDate = boundary.lastMonthLastDate;
        var nextMonthFirstDate = boundary.nextMonthFirstDate;
        //得到本月第一天是星期几,上月最后一周数组,本月第一周数组,本月最后一周数组,下月第一周数组
        //获取上月最后一周
        var lastMonthLastWeek = getLastMonthLastWeek(lastMonthLastDate);
        //获取本月第一周
        var thisMonthFirstWeek = getThisMonthFirstWeek(thisMonthFirstDate);
        //获取本月最后一周
        var thisMonthLastWeek = getThisMonthLastWeek(thisMonthLastDate);
        //获取下月第一周
        var nextMonthFirstWeek = getNextMonthFirstWeek(nextMonthFirstDate);
        //渲染日期date
        //渲染上月最后一周和本月第一周
        if(thisMonthFirstDate.getDay() !== 0){
            for (i=0;i<lastMonthLastWeek.length;i++){
                dateShowJQ.get(0).innerHTML += "<span class='cell cell-virtual'>" + lastMonthLastWeek[i] + "</span>";
            }
        }
        for (i=0;i<thisMonthFirstWeek.length;i++){
            dateShowJQ.get(0).innerHTML += "<span class='cell'>" + thisMonthFirstWeek[i] + "</span>";
        }
        //渲染除第一和最后一周的剩余天
        for (i=thisMonthFirstWeek[thisMonthFirstWeek.length-1]+1;i<thisMonthLastWeek[0];i++){
            dateShowJQ.get(0).innerHTML += "<span class='cell'>" + i + "</span>";
        }
        //渲染本月最后一周和下月第一周
        for(i=0;i<thisMonthLastWeek[i];i++){
            dateShowJQ.get(0).innerHTML += "<span class='cell'>" + thisMonthLastWeek[i] + "</span>";
        }
        if(nextMonthFirstDate.getDay() !== 0){
            for (i=0;i<nextMonthFirstWeek.length;i++){
                dateShowJQ.get(0).innerHTML += "<span class='cell cell-virtual'>" + nextMonthFirstWeek[i] + "</span>";
            }
        }
    };
    var selectYear = function(timeObj,yearJQ){
        yearJQ.empty();
        var i;
        //初始化前十年
        for(i=10;i>0;i--){
            yearJQ.get(0).innerHTML += "<option>" + (timeObj.year-i) + "</option>";
        }
        //今年
        yearJQ.get(0).innerHTML += "<option selected>" + timeObj.year + "</option>";
        //初始化后十年
        for(i=1;i<=10;i++){
            yearJQ.get(0).innerHTML += "<option>" + (Number(timeObj.year)+Number(i)) + "</option>";
        }
    };
    var selectMonth = function(timeObj,monthJQ){
        monthJQ.empty();
        var i;
        //初始化前面月份
        for(i=1;i<=timeObj.month;i++){
            monthJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
        //今月
        monthJQ.get(0).innerHTML += "<option selected>" + (Number(timeObj.month)+1) + "</option>";
        //初始化后面月份
        for(i=(timeObj.month+2);i<=12;i++){
            monthJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
    };
    var selectDate = function(timeObj,yearJQ,monthJQ,dateShowJQ){
        yearJQ.on('change',function(){
            timeObj.year = $('.select-year option:selected').val();
            selectYear(timeObj,yearJQ);
            renderDateShow(timeObj,dateShowJQ);
        });
        monthJQ.on('change',function(){
            timeObj.month = $('.select-month option:selected').val()-1;
            selectMonth(timeObj,monthJQ);
            renderDateShow(timeObj,dateShowJQ);
        });
    };
    var drawIcon = function() {
        var backwardJQ = $('.canvas-backward');
        var forwardJQ = $('.canvas-forward');
        var backwardDOM = backwardJQ.get(0);
        var forwardDOM = forwardJQ.get(0);
        var backward = backwardDOM.getContext('2d');
        var forward = forwardDOM.getContext('2d');
        /*参数*/
        var canvasW = 32;
        var canvasH = 32;
        /*设置canvas宽高*/
        backwardDOM.width = canvasW;
        backwardDOM.height = canvasH;
        forwardDOM.width = canvasW;
        forwardDOM.height = canvasH;
        /*绘图*/
        //后退
        backward.beginPath();
        backward.moveTo(0, 16);
        backward.lineTo(16, 0);
        backward.lineTo(16, 8);
        backward.lineTo(32, 8);
        backward.lineTo(32, 24);
        backward.lineTo(16, 24);
        backward.lineTo(16, 32);
        backward.closePath();
        backward.fillStyle = 'red';
        backward.fill();
        //前进
        forward.beginPath();
        forward.moveTo(32, 16);
        forward.lineTo(16, 32);
        forward.lineTo(16, 24);
        forward.lineTo(0, 24);
        forward.lineTo(0, 8);
        forward.lineTo(16, 8);
        forward.lineTo(16, 0);
        forward.closePath();
        forward.fillStyle = 'red';
        forward.fill();
        /*鼠标放置后显示手势*/
        backwardDOM.style.cursor = 'pointer';
        forwardDOM.style.cursor = 'pointer';
        /*点击后换月份*/
        backwardJQ.on('mousedown', function () {
            backwardJQ.css('box-shadow', '0px 3px 3px rgba(34, 25, 25, 0.2) inset')
        });
        backwardJQ.on('mouseup', function () {
            backwardJQ.css('box-shadow', '0px 0px 0px rgba(34, 25, 25, 0.2) inset')
        });
        forwardJQ.on('mousedown', function () {
            forwardJQ.css('box-shadow', '0px 3px 3px rgba(34, 25, 25, 0.2) inset')
        });
        forwardJQ.on('mouseup', function () {
            forwardJQ.css('box-shadow', '0px 0px 0px rgba(34, 25, 25, 0.2) inset')
        });
    };
    var drawIconListen = function(timeObj,yearJQ,monthJQ,dateShowJQ){
        var backwardJQ = $('.canvas-backward');
        var forwardJQ = $('.canvas-forward');
        backwardJQ.on('click',function(){
            if(timeObj.month !== 0){
                timeObj.month = timeObj.month - 1;
                selectMonth(timeObj,monthJQ);
            }else {
                timeObj.month = 11;
                timeObj.year = timeObj.year - 1;
                selectYear(timeObj,yearJQ);
                selectMonth(timeObj,monthJQ);
            }
            renderDateShow(timeObj,dateShowJQ);
        });
        forwardJQ.on('click',function(){
            if(timeObj.month !== 11){
                timeObj.month = Number(timeObj.month) + 1;
                selectMonth(timeObj,monthJQ);
            }else {
                timeObj.month = 0;
                timeObj.year = Number(timeObj.year) + 1;
                selectYear(timeObj,yearJQ);
                selectMonth(timeObj,monthJQ);
            }
            renderDateShow(timeObj,dateShowJQ);
        });
    };
    $(document).ready(function(){
        var timeObj = {};
        var dataToday = new Date();
        timeObj.year = dataToday.getFullYear();
        timeObj.month = dataToday.getMonth();
        timeObj.date = dataToday.getDate();
        var yearJQ = $('.select-year');
        var monthJQ = $('.select-month');
        var dateShowJQ = $('.date-show');
        /*绘制前后箭头*/
        drawIcon();
        /*初始化select选择*/
        //初始化年select
        selectYear(timeObj,yearJQ);
        //初始化月份
        selectMonth(timeObj,monthJQ);
        /*显示当月日期*/
        renderDateShow(timeObj,dateShowJQ);
        /*选取select改变显示的日历*/
        selectDate(timeObj,yearJQ,monthJQ,dateShowJQ);
        /*点击canvas后松开改变date显示*/
        drawIconListen(timeObj,yearJQ,monthJQ,dateShowJQ);
        /*点击date红框date*/
    });
})();