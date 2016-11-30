/**
 * Created by SPACEY on 2016/11/29.
 */
var calendarSpace = (function(){
    //判断星期几
    var judgeWeek = function(day){
        switch (day){
            case 0 :
                return
        }
    };
    //上溯渲染上月
    var renderLastMonth = function(){
    };
    $(document).ready(function(){
        var dataToday = new Date();
        var year = dataToday.getFullYear();
        var month = dataToday.getMonth();
        var date = dataToday.getDate();
        var day = dataToday.getDay();
        var time = dataToday.getTime();
        var yearJQ = $('.select-year');
        var monthJQ = $('.select-month');
        var dateJQ = $('.select-date');
        var dateShowJQ = $('.date-show');
        //本月第一天
        var thisMonthFirstDate = new Date(year,month,1);
        //console.log(thisMonthFirstDate);
        //本月最后一天
        var thisMonthLastDate = new Date(year,(month+1),0);
        //console.log(thisMonthLastDate);
        //上月最后一天
        var lastMonthLastDate = new  Date(year,month,0);
        //console.log(lastMonthLastDate);
        //下月第一天
        var nextMonthFirstDate = new Date(year,month+1,1);
        //console.log(nextMonthFirstDate.getDay());
        /*初始化select选择*/
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
        //初始化前面月份
        //console.log(i);
        for(i=0;i<=month;i++){
            monthJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
        //今月
        monthJQ.get(0).innerHTML += "<option selected>" + (month+1) + "</option>";
        //初始化后面月份
        for(i=(month+2);i<=12;i++){
            monthJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
        //初始化前面天数
        for (i=1;i<date;i++){
            dateJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
        //今天
        dateJQ.get(0).innerHTML += "<option selected>" + date + "</option>";
        //初始化后面天数
        for (i=(date+1);i<=thisMonthLastDate.getDate;i++){
            dateJQ.get(0).innerHTML += "<option>" + i + "</option>";
        }
        /*显示当月日期*/
        //得到本月第一天是星期几,上月最后一周数组,本月第一周数组,本月最后一周数组,下月第一周数组
        var lastMonthLastWeek = [];
        var thisMonthFirstWeek = [];
        var thisMonthLastWeek = [];
        var nextMonthFirstWeek = [];
        //获取上月最后一周
        var getLastMonthLastWeek = function(){
            var lastMonthLastWeekFirstDate = lastMonthLastDate.getDate() - lastMonthLastDate.getDay();
            for (i=lastMonthLastWeekFirstDate;i<=lastMonthLastDate.getDate();i++){
                lastMonthLastWeek.push(i);
            }
        };
        getLastMonthLastWeek();
        console.log(lastMonthLastWeek);
        //获取本月第一周
        var getThisMonthFirstWeek = function(){
            var thisMonthFirstWeekLastDate = thisMonthFirstDate.getDate() + (6 - thisMonthFirstDate.getDay());
            for (i=thisMonthFirstDate.getDate();i<=thisMonthFirstWeekLastDate;i++){
                thisMonthFirstWeek.push(i);
            }
        };
        getThisMonthFirstWeek();
        console.log(thisMonthFirstWeek);
        //获取本月最后一周
        var getThisMonthLastWeek = function(){
            var thisMonthLastWeekFirstDate = thisMonthLastDate.getDate() - thisMonthLastDate.getDay();
            for (i=thisMonthLastWeekFirstDate;i<=thisMonthLastDate.getDate();i++){
                thisMonthLastWeek.push(i);
            }
        };
        getThisMonthLastWeek();
        console.log(thisMonthLastWeek);
        //获取下月第一周
        var getNextMonthFirstWeek = function(){
            var nextMonthFirstWeekLastDate = nextMonthFirstDate.getDate() + (6 - nextMonthFirstDate.getDay());
            for (i=nextMonthFirstDate.getDate();i<=nextMonthFirstWeekLastDate;i++){
                nextMonthFirstWeek.push(i);
            }
        };
        getNextMonthFirstWeek();
        console.log(nextMonthFirstWeek);
        //渲染日期date
        //渲染上月最后一周和本月第一周
        if(thisMonthFirstDate.getDay() !== 0){
            for (i=0;i<lastMonthLastWeek.length;i++){
                dateShowJQ.get(0).innerHTML += "<span class='cell'>" + lastMonthLastWeek[i] + "</span>";
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
        if(nextMonthFirstDate !== 0){
            for (i=0;i<nextMonthFirstWeek.length;i++){
                dateShowJQ.get(0).innerHTML += "<span class='cell'>" + nextMonthFirstWeek[i] + "</span>";
            }
        }
    });
})();