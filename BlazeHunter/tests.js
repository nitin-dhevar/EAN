const schedule = require('node-schedule');

// var nDate = new Date().toLocaleDateString('en-US', {
//     timeZone: 'Asia/Calcutta'
//   });
//   var nDate1 = new Date().toLocaleDateString('en-US', {
//     timeZone: 'Asia/Calcutta'
//   });

// if(nDate===nDate1)
//     console.log("true");
// else{
//     console.log("false");
    
// }

// var t1 = "I am a good person"
// console.log(t1.split(" ").join(''));

var j = schedule.scheduleJob('*/1 * * * *',function(){
  var d = new Date().toLocaleTimeString();
    console.log(d);
    
}); 