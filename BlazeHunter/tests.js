var nDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Calcutta'
  });
  var nDate1 = new Date().toLocaleDateString('en-US', {
    timeZone: 'Asia/Calcutta'
  });

if(nDate===nDate1)
    console.log("true");
else{
    console.log("false");
    
}

var t1 = "I am a good person"
console.log(t1.split(" ").join(''));
