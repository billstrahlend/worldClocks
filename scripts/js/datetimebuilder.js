function runClocks()
{
  var ct = new Date();
  var day = ct.getDate();//1-31;
  var weekday = ct.getDay();//0-6;
  var year = ct.getFullYear();//1900+;
  var hour = ct.getHours();//0-23;
  var milliseconds = ct.getMilliseconds();//0-999;
  var minutes = ct.getMinutes();//0-59;
  var month = ct.getMonth();//0-11;
  var seconds = ct.getSeconds();//0-59;
  var timeZoneOff = ct.getTimezoneOffset();
  var utc = new Date();
  var utcHour = utc.getUTCHours();
  var timeDiff = hour - utcHour;
  var dstTime;
  
  var timeZone = timeDiff+"00 GMT";
  
  var dtc = [8,14,13,11,10,9];
  var stc = [1,7,6,4,3,2];
  
  var dstDate1 = new Date(year, 2, dtc[0]);
  var dstDay1 = dstDate1.getDay();
  var dstDate2 = new Date(year, 2, dtc[1]);
  var dstDay2 = dstDate2.getDay();
  var dstDate3 = new Date(year, 2, dtc[2]);
  var dstDay3 = dstDate3.getDay();
  var dstDate4 = new Date(year, 2, dtc[3]);
  var dstDay4 = dstDate4.getDay();
  var dstDate5 = new Date(year, 2, dtc[4]);
  var dstDay5 = dstDate5.getDay();
  var dstDate6 = new Date(year, 2, dtc[5]);
  var dstDay6 = dstDate6.getDay();
  var stDate1 = new Date(year, 10, stc[0]);
  var stDay1 = stDate1.getDay();
  var stDate2 = new Date(year, 10, stc[1]);
  var stDay2 = stDate2.getDay();
  var stDate3 = new Date(year, 10, stc[2]);
  var stDay3 = stDate3.getDay();
  var stDate4 = new Date(year, 10, stc[3]);
  var stDay4 = stDate4.getDay();
  var stDate5 = new Date(year, 10, stc[4]);
  var stDay5 = stDate5.getDay();
  var stDate6 = new Date(year, 10, stc[5]);
  var stDay6 = stDate6.getDay();
  
  function timeCheck()
  {
    if (dstDay1 == 0 && (ct >= dstDate1 && ct <= stDate1)){dstTime = true;}
    else if (dstDay2 == 0 && (ct >= dstDate2 && ct <= stDate2)){dstTime = true;}
    else if (dstDay3 == 0 && (ct >= dstDate3 && ct <= stDate3)){dstTime = true;}
    else if (dstDay4 == 0 && (ct >= dstDate4 && ct <= stDate4)){dstTime = true;}
    else if (dstDay5 == 0 && (ct >= dstDate5 && ct <= stDate5)){dstTime = true;}
    else if (dstDay6 == 0 && (ct >= dstDate6 && ct <= stDate6)){dstTime = true;}
    else {dstTime = false;}
    return dstTime;
  }timeCheck();
  
  var currentUTC = ct.toUTCString();
  
  function utcOffset(offsetHours, observedDS)
  {
    var dstObserved = observedDS;var hoursOffset;
    if(!dstTime)
    {
      hoursOffset = offsetHours;
    }
    else if(dstTime && !dstObserved){hoursOffset = offsetHours;}
    else{hoursOffset=(offsetHours+1)};
    //
    if((utc.getUTCHours() + hoursOffset) < 0)
    {
      utcHour = (24 + (utc.getUTCHours() + hoursOffset));
    }
    else
    {
      utcHour = utc.getUTCHours() + hoursOffset;
    };
    if (utcHour < 10){utcHour = "0"+utcHour;}else{utcHour=utcHour;};
    return utcHour;
  };
  if (day < 10){day = "0"+day;}else{day=day;}
  if (hour < 10){hour = "0"+hour}else{hour=hour;}
  if (minutes < 10){minutes="0"+minutes;}else{minutes=minutes;}
  if (seconds < 10){seconds="0"+seconds;}else{seconds=seconds;}
  if (milliseconds < 10){milliseconds="00"+milliseconds;}else if(milliseconds<100){milliseconds="0"+milliseconds;}else{milliseconds=milliseconds;}
  
  switch (weekday)
  {
    case 0: weekday="Sunday";var shortWeekday="Sun";break;
    case 1: weekday="Monday";var shortWeekday="Mon";break;
    case 2: weekday="Tuesday";var shortWeekday="Tue";break;
    case 3: weekday="Wednesday";var shortWeekday="Wed";break;
    case 4: weekday="Thursday";var shortWeekday="Thu";break;
    case 5: weekday="Friday";var shortWeekday="Fri";break;
    case 6: weekday="Saturday";var shortWeekday="Sat";break;
  }
  switch (month)
  {
    case 0: var fullMonth="January";var shortMonth="Jan";month=month+1;break;
    case 1: var fullMonth="February";var shortMonth="Feb";month=month+1;break;
    case 2: var fullMonth="March";var shortMonth="Mar";month=month+1;break;
    case 3: var fullMonth="April";var shortMonth="Apr";month=month+1;break;
    case 4: var fullMonth="May";var shortMonth="May";month=month+1;break;
    case 5: var fullMonth="June";var shortMonth="Jun";month=month+1;break;
    case 6: var fullMonth="July";var shortMonth="Jul";month=month+1;break;
    case 7: var fullMonth="August";var shortMonth="Aug";month=month+1;break;
    case 8: var fullMonth="September";var shortMonth="Sep";month=month+1;break;
    case 9: var fullMonth="October";var shortMonth="Oct";month=month+1;break;
    case 10: var fullMonth="November";var shortMonth="Nov";month=month+1;break;
    case 11: var fullMonth="December";var shortMonth="Dec";month=month+1;break;
  }
  if (month < 10){month="0"+month;}else{month=month;}
  var timeStamp = shortWeekday+", "+day+" "+shortMonth+" "+year+" "+hour+":"+minutes+":"+seconds+":"+milliseconds+" "+timeZone;
  var clock = hour+":"+minutes;
  
  var jerusalemClock = utcOffset(2, false)+":"+minutes;
  var germanyClock = utcOffset(1, false)+":"+minutes;
  var denmarkClock = utcOffset(1, false)+":"+minutes;
  var englandClock = utcOffset(0, false)+":"+minutes;
  var gmtClock = utcOffset(0, false)+":"+minutes;
  var etClock = utcOffset(-5, true)+":"+minutes;
  var ctClock = utcOffset(-6, true)+":"+minutes;
  var mtClock = utcOffset(-7, true)+":"+minutes;
  var azClock = utcOffset(-7, false)+":"+minutes;
  var ptClock = utcOffset(-8, true)+":"+minutes;
  var akClock = utcOffset(-9, true)+":"+minutes;
  var hiClock = utcOffset(-10, false)+":"+minutes;
  document.getElementById('jerusalem').innerHTML=jerusalemClock;
  document.getElementById('germany').innerHTML=germanyClock;
  document.getElementById('denmark').innerHTML=denmarkClock;
  document.getElementById('england').innerHTML=englandClock;
  document.getElementById('gmt').innerHTML=gmtClock;
  document.getElementById('et').innerHTML=etClock;
  document.getElementById('ct').innerHTML=ctClock;
  document.getElementById('mt').innerHTML=mtClock;
  document.getElementById('az').innerHTML=azClock;
  document.getElementById('pt').innerHTML=ptClock;
  document.getElementById('ak').innerHTML=akClock;
  document.getElementById('hi').innerHTML=hiClock;
  t=setTimeout('runClocks()',500);
};
jerusalemClock = utcOffset(2, false)+":"+minutes;
germanyClock = utcOffset(1, false)+":"+minutes;
denmarkClock = utcOffset(1, false)+":"+minutes;
englandClock = utcOffset(0, false)+":"+minutes;
gmtClock = utcOffset(0, false)+":"+minutes;
etClock = utcOffset(-5, true)+":"+minutes;
ctClock = utcOffset(-6, true)+":"+minutes;
mtClock = utcOffset(-7, true)+":"+minutes;
azClock = utcOffset(-7, false)+":"+minutes;
ptClock = utcOffset(-8, true)+":"+minutes;
akClock = utcOffset(-9, true)+":"+minutes;
hiClock = utcOffset(-10, false)+":"+minutes;