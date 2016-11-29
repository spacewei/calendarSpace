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
        //初始化select选择
        $('.select-year').html("<option selected>" + year + "</option>");
        $('.select-month').html("<option selected>" + (month+1) + "</option>");
        $('.select-date').html("<option selected>" + date + "</option>");
        //显示本月最后一天
        var thisMonthLastDate = new Date(year,(month+1),0);
        //console.log(thisMonthLastDate);
        //显示上月最后一天
        var lastMonthLastDate = new  Date(year,month,0);
        //console.log(lastMonthLastDate);
        //显示下月第一天
        var nextMonthFirstDate = new Date(year,month+1,1);
        //console.log(nextMonthFirstDate);
    });
})();