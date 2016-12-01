/**
 * Created by SPACEY on 2016/11/29.
 */
var calendarSpace = (function(){
    var getBoundary = function(year,month){
        var result;
        var thisMonthFirstDate = new Date(year,month,1);
        var thisMonthLastDate = new Date(year,(month+1),0);
        var lastMonthLastDate = new  Date(year,month,0);
        var nextMonthFirstDate = new Date(year,month+1,1);
        return result = {
            thisMonthFirstDate:thisMonthFirstDate,
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
    var renderDateShow = function(year,month,dateShowJQ){
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
        //
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
    var selectYear = function(year,yearJQ){
        var i;
        //初始化前十年
        for(i=10;i>0;i--){
            yearJQ.get(0).innerHTML += "<option>" + (year-i) + "</option>";
        }
        //今年
        yearJQ.get(0).innerHTML += "<option selected>" + year + "</option>";
        //初始化后十年
        for(i=1;i<=10;i++){
            yearJQ.get(0).innerHTML += "<option>" + (year+i) + "</option>";
        }
    };
    var selectMonth = function(month,monthJQ){
        var i;
        //初始化前面月份
        for(i=1;i<=month;i++){
            monthJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
        //今月
        monthJQ.get(0).innerHTML += "<option selected>" + (month+1) + "</option>";
        //初始化后面月份
        for(i=(month+2);i<=12;i++){
            monthJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
    };
    var selectDate = function(year,month,yearJQ,monthJQ,dateShowJQ){
        yearJQ.on('change',function(){
            year = $('.select-year option:selected').val();
            dateShowJQ.empty();
            renderDateShow(year,month,dateShowJQ);
        });
        monthJQ.on('change',function(){
            month = $('.select-month option:selected').val()-1;
            dateShowJQ.empty();
            renderDateShow(year,month,dateShowJQ);
        })
    };
    $(document).ready(function(){
        var dataToday = new Date();
        var year = dataToday.getFullYear();
        var month = dataToday.getMonth();
        var yearJQ = $('.select-year');
        var monthJQ = $('.select-month');
        var dateShowJQ = $('.date-show');
        var boundary = getBoundary(year,month);
        //本月第一天
        var thisMonthFirstDate = boundary.thisMonthFirstDate;
        //本月最后一天
        var thisMonthLastDate = boundary.thisMonthLastDate;
        //上月最后一天
        var lastMonthLastDate = boundary.lastMonthLastDate;
        //下月第一天
        var nextMonthFirstDate = boundary.nextMonthFirstDate;
        /*初始化select选择*/
        //初始化年select
        selectYear(year,yearJQ);
        //初始化月份
        selectMonth(month,monthJQ);
        /*显示当月日期*/
        renderDateShow(year,month,dateShowJQ);
        /*选取select改变显示的日历*/
        selectDate(year,month,yearJQ,monthJQ,dateShowJQ);
    });
})();