var cdt = new Date();
var day = cdt.getDay();
var Mm = cdt.getMonth();
var DD = cdt.getDate();
var YYYY = cdt.getFullYear();
var HH = cdt.getHours();
var MM = cdt.getMinutes();
var SS = cdt.getSeconds();
var mil = cdt.getMilliseconds();
var tz = cdt.getTimezoneOffset();


function runClocks()
{
    document.write(cdt);
    document.write("<br />");
    document.write(day);
    document.write("<br />");
    document.write(Mm);
    document.write("<br />");
    document.write(DD);
    document.write("<br />");
    document.write(YYYY);
    document.write("<br />");
    document.write(HH);
    document.write("<br />");
    document.write(MM);
    document.write("<br />");
    document.write(SS);
    document.write("<br />");
    document.write(mil);
    document.write("<br />");
    document.write(tz);
    document.write("<br />");
}
runClocks();