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

// var j = schedule.scheduleJob('')

var wc = require('which-country');

// pass [lng, lat]
console.log(wc([37, 55])); // RUS
console.log(wc([-100, 40])); // USA