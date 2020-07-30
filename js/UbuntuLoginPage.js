



window.onload = function() {
    clock();
        function clock() {
            var now = new Date();
            var TwentyFourHour = now.getHours();
            var hour = now.getHours();
            var min = now.getMinutes();
            var day = now.getDay();
            var month = now.getMonth();
            var date = now.getDate();
            if (min < 10) {
                min = "0" + min;
            }
            if (hour > 12) {
                hour = hour - 12;
            }
            if (hour < 10){
                hour = "0" + hour
            }   
            if(hour==0){ 
                hour=12;
            }
            if(day==1){
                day="Monday"
            }
            if(day==2){
                day="Tuesday"
            }
            if(day==3){
                day="Wednesday"
            }
            if(day==4){
                day="Thursday"
            }
            if(day==5){
                day="Friday"
            }
            if(day==6){
                day="Saturday"
            }
            if(month==0){
                month="January"
            }
            if(month==1){
                month="Febuary"
            }
            if(month==2){
                month="March"
            }
            if(month==3){
                month="April"
            }
            if(month==4){
                month="May"
            }
            if(month==5){
                month="June"
            }
            if(month==6){
                month="July"
            }
            if(month==7){
                month="August"
            }
            if(month==8){
                month="September"
            }
            if(month==9){
                month="October"
            }
            if(month==10){
                month="November"
            }
            if(month==11){
                month="December"
            }
            document.getElementById('TimeCenter').innerHTML = hour + ':' + min ;
            document.getElementById('CalenderCenter').innerHTML = day + ', ' + month + " " + date;
            setTimeout(clock, 1000);
            }
    }

$(document).keypress(function(event){

    $('#coversheet').css({marginTop: '-=15px'});

    //  $( "body" ).slideUp("slow", function(){
    //   // animation complete
    //  });
    //alert(String.fromCharCode(event.which)); 
});