/* PluginDetect v0.7.5 by Eric Gerds www.pinlady.net/PluginDetect [ onWindowLoaded isMinVersion getVersion onDetectionDone beforeInstantiate getInfo Java(OTF & NOTF) QT DevalVR Shockwave Flash WMP Silverlight VLC AdobeReader PDFreader(OTF & NOTF) RealPlayer ] */var $pd=PluginDetect={version:"0.7.5",name:"PluginDetect",handler:function(c,b,a){return function(){c(b,a)
}
},isDefined:function(b){return typeof b!="undefined"
},isArray:function(b){return(/array/i).test(Object.prototype.toString.call(b))
},isFunc:function(b){return typeof b=="function"
},isString:function(b){return typeof b=="string"
},isNum:function(b){return typeof b=="number"
},isStrNum:function(b){return(typeof b=="string"&&(/\d/).test(b))
},getNumRegx:/[\d][\d\.\_,-]*/,splitNumRegx:/[\.\_,-]/g,getNum:function(b,c){var d=this,a=d.isStrNum(b)?(d.isDefined(c)?new RegExp(c):d.getNumRegx).exec(b):null;
return a?a[0]:null
},compareNums:function(h,f,d){var e=this,c,b,a,g=parseInt;
if(e.isStrNum(h)&&e.isStrNum(f)){if(e.isDefined(d)&&d.compareNums){return d.compareNums(h,f)
}c=h.split(e.splitNumRegx);
b=f.split(e.splitNumRegx);
for(a=0;
a<Math.min(c.length,b.length);
a++){if(g(c[a],10)>g(b[a],10)){return 1
}if(g(c[a],10)<g(b[a],10)){return -1
}}}return 0
},formatNum:function(b,c){var d=this,a,e;
if(!d.isStrNum(b)){return null
}if(!d.isNum(c)){c=4
}c--;
e=b.replace(/\s/g,"").split(d.splitNumRegx).concat(["0","0","0","0"]);
for(a=0;
a<4;
a++){if(/^(0+)(.+)$/.test(e[a])){e[a]=RegExp.$2
}if(a>c||!(/\d/).test(e[a])){e[a]="0"
}}return e.slice(0,4).join(",")
},$$hasMimeType:function(a){return function(d){if(!a.isIE&&d){var c,b,e,f=a.isString(d)?[d]:d;
if(!f||!f.length){return null
}for(e=0;
e<f.length;
e++){if(/[^\s]/.test(f[e])&&(c=navigator.mimeTypes[f[e]])&&(b=c.enabledPlugin)&&(b.name||b.description)){return c
}}}return null
}
},findNavPlugin:function(l,e,c){var j=this,h=new RegExp(l,"i"),d=(!j.isDefined(e)||e)?/\d/:0,k=c?new RegExp(c,"i"):0,a=navigator.plugins,g="",f,b,m;
for(f=0;
f<a.length;
f++){m=a[f].description||g;
b=a[f].name||g;
if((h.test(m)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))||(h.test(b)&&(!d||d.test(RegExp.leftContext+RegExp.rightContext)))){if(!k||!(k.test(m)||k.test(b))){return a[f]
}}}return null
},getMimeEnabledPlugin:function(a,f){var e=this,b,c=new RegExp(f,"i"),d="";
if((b=e.hasMimeType(a))&&(b=b.enabledPlugin)&&(c.test(b.description||d)||c.test(b.name||d))){return b
}return 0
},getPluginFileVersion:function(f,b){var h=this,e,d,g,a,c=-1;
if(h.OS>2||!f||!f.version||!(e=h.getNum(f.version))){return b
}if(!b){return e
}e=h.formatNum(e);
b=h.formatNum(b);
d=b.split(h.splitNumRegx);
g=e.split(h.splitNumRegx);
for(a=0;
a<d.length;
a++){if(c>-1&&a>c&&d[a]!="0"){return b
}if(g[a]!=d[a]){if(c==-1){c=a
}if(d[a]!="0"){return b
}}}return e
},AXO:window.ActiveXObject,getAXO:function(b){var f=null,d,c=this,a;
;
try{f=new c.AXO(b);
}catch(d){}return f
},convertFuncs:function(g){var a,h,f,b=/^[\$][\$]/,d={},c=this;
for(a in g){if(b.test(a)){d[a]=1
}}for(a in d){try{h=a.slice(2);
if(h.length>0&&!g[h]){g[h]=g[a](g);
delete g[a]
}}catch(f){}}},initScript:function(){var c=this,a=navigator,e="/",i=a.userAgent||"",g=a.vendor||"",b=a.platform||"",h=a.product||"";
;
;
;
c.OS=100;
if(b){var f,d=["Win",1,"Mac",2,"Linux",3,"FreeBSD",4,"iPhone",21.1,"iPod",21.2,"iPad",21.3,"Win.*CE",22.1,"Win.*Mobile",22.2,"Pocket\\s*PC",22.3,"",100];
for(f=d.length-2;
f>=0;
f=f-2){if(d[f]&&new RegExp(d[f],"i").test(b)){c.OS=d[f+1];
break
}}}c.convertFuncs(c);
;
c.isIE=new Function("return "+e+"*@cc_on!@*"+e+"false")();
c.verIE=c.isIE&&(/MSIE\s*(\d+\.?\d*)/i).test(i)?parseFloat(RegExp.$1,10):null;
c.ActiveXEnabled=false;
;
;
if(c.isIE){var f,j=["Msxml2.XMLHTTP","Msxml2.DOMDocument","Microsoft.XMLDOM","ShockwaveFlash.ShockwaveFlash","TDCCtl.TDCCtl","Shell.UIHelper","Scripting.Dictionary","wmplayer.ocx"];
for(f=0;
f<j.length;
f++){if(c.getAXO(j[f])){c.ActiveXEnabled=true;
break
}}c.head=c.isDefined(document.getElementsByTagName)?document.getElementsByTagName("head")[0]:null
}c.isGecko=(/Gecko/i).test(h)&&(/Gecko\s*\/\s*\d/i).test(i);
c.verGecko=c.isGecko?c.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(i)?RegExp.$1:"0.9"):null;
;
;
c.isSafari=(/Safari\s*\/\s*\d/i).test(i)&&(/Apple/i).test(g);
;
c.isChrome=(/Chrome\s*\/\s*(\d[\d\.]*)/i).test(i);
c.verChrome=c.isChrome?c.formatNum(RegExp.$1):null;
;
;
c.isOpera=(/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(i);
c.verOpera=c.isOpera&&((/Version\s*\/\s*(\d+\.?\d*)/i).test(i)||1)?parseFloat(RegExp.$1,10):null;
;
;
;
;
;
c.addWinEvent("load",c.handler(c.runWLfuncs,c));

},init:function(c){var b=this,a,c;
if(!b.isString(c)){
return -3
}if(c.length==1){b.getVersionDelimiter=c;
return -3
}c=c.toLowerCase().replace(/\s/g,"");
a=b[c];
if(!a||!a.getVersion){
return -3
}b.plugin=a;
if(!b.isDefined(a.installed)){a.installed=a.version=a.version0=a.getVersionDone=null;
a.$=b;
a.pluginName=c
}b.garbage=false;
if(b.isIE&&!b.ActiveXEnabled){if(a!==b.java){return -2
}}return 1
},fPush:function(b,a){var c=this;
if(c.isArray(a)&&(c.isFunc(b)||(c.isArray(b)&&b.length>0&&c.isFunc(b[0])))){a.push(b)
}},callArray:function(b){var c=this,a;
if(c.isArray(b)){for(a=0;
a<b.length;
a++){if(b[a]===null){return
}c.call(b[a]);
b[a]=null
}}},call:function(c){var b=this,a=b.isArray(c)?c.length:-1;
if(a>0&&b.isFunc(c[0])){c[0](b,a>1?c[1]:0,a>2?c[2]:0,a>3?c[3]:0)
}else{if(b.isFunc(c)){c(b)
}}},$$isMinVersion:function(a){return function(h,g,d,c){var e=a.init(h),f,b=-1,j;
;
if(e<0){return e
}f=a.plugin;
g=a.formatNum(a.isNum(g)?g.toString():(a.isStrNum(g)?a.getNum(g):"0"));
;
if(f.getVersionDone!=1){f.getVersion(g,d,c);
if(f.getVersionDone===null){f.getVersionDone=1
}}a.cleanup();
if(f.installed!==null){b=f.installed<=0.5?f.installed:(f.installed==0.7?1:(f.version===null?0:(a.compareNums(f.version,g,f)>=0?1:-1)))
};
return b
}
},getVersionDelimiter:".",$$getVersion:function(a){return function(g,d,c){var e=a.init(g),f,b,h;
;
if(e<0){return null
};
f=a.plugin;
if(f.getVersionDone!=1){f.getVersion(null,d,c);
if(f.getVersionDone===null){f.getVersionDone=1
}}a.cleanup();
b=(f.version||f.version0);
b=b?b.replace(a.splitNumRegx,a.getVersionDelimiter):b;
;
return b
}
},$$getInfo:function(a){return function(g,d,c){var b={},e=a.init(g),f;
if(e<0){return b
};
f=a.plugin;
if(f.getInfo){if(f.getVersionDone===null){a.isMinVersion?a.isMinVersion(g,"0",d,c):a.getVersion(g,d,c)
}b=f.getInfo()
}return b
}
},cleanup:function(){
var a=this;
if(a.garbage&&a.isDefined(window.CollectGarbage)){window.CollectGarbage()
}
},isActiveXObject:function(f,b){var g=this,a=false,h,c="<",d=c+'object width="1" height="1" style="display:none" '+f.getCodeBaseVersion(b)+">"+f.HTML+c+"/object>";
if(!g.head){return a
}if(g.head.firstChild){g.head.insertBefore(document.createElement("object"),g.head.firstChild)
}else{g.head.appendChild(document.createElement("object"))
}g.head.firstChild.outerHTML=d;
try{g.head.firstChild.classid=f.classID
}catch(h){}try{if(g.head.firstChild.object){a=true
}}catch(h){}try{if(a&&g.head.firstChild.readyState<4){g.garbage=true
}}catch(h){}g.head.removeChild(g.head.firstChild);
return a
},codebaseSearch:function(f,b){var c=this;
if(!c.ActiveXEnabled||!f){return null
}if(f.BIfuncs&&f.BIfuncs.length&&f.BIfuncs[f.BIfuncs.length-1]!==null){
c.callArray(f.BIfuncs);
}var d,o=f.SEARCH,n;
if(c.isStrNum(b)){if(o.match&&o.min&&c.compareNums(b,o.min)<=0){return true
}if(o.match&&o.max&&c.compareNums(b,o.max)>=0){return false
}d=c.isActiveXObject(f,b);
if(d&&(!o.min||c.compareNums(b,o.min)>0)){o.min=b
}if(!d&&(!o.max||c.compareNums(b,o.max)<0)){o.max=b
}return d
};
;
;
var e=[0,0,0,0],k=[].concat(o.digits),a=o.min?1:0,j,i,h,g,l,m=function(q,s){var r=[].concat(e);
r[q]=s;
;
return c.isActiveXObject(f,r.join(","))
};
;
if(o.max){g=o.max.split(c.splitNumRegx);
for(j=0;
j<g.length;
j++){g[j]=parseInt(g[j],10)
}if(g[0]<k[0]){k[0]=g[0]
}}if(o.min){l=o.min.split(c.splitNumRegx);
for(j=0;
j<l.length;
j++){l[j]=parseInt(l[j],10)
}if(l[0]>e[0]){e[0]=l[0]
}}if(l&&g){for(j=1;
j<l.length;
j++){if(l[j-1]!=g[j-1]){break
}if(g[j]<k[j]){k[j]=g[j]
}if(l[j]>e[j]){e[j]=l[j]
}}}if(o.max){for(j=1;
j<k.length;
j++){if(g[j]>0&&k[j]==0&&k[j-1]<o.digits[j-1]){k[j-1]+=1;
break
}}};
for(j=0;
j<k.length;
j++){h={};
for(i=0;
i<20;
i++){if(k[j]-e[j]<1){break
}d=Math.round((k[j]+e[j])/2);
if(h["a"+d]){break
}h["a"+d]=1;
if(m(j,d)){e[j]=d;
a=1
}else{k[j]=d
}}k[j]=e[j];
if(!a&&m(j,e[j])){a=1
};
if(!a){break
}};
;
return a?e.join(","):null
},addWinEvent:function(d,c){var e=this,a=window,b;
if(e.isFunc(c)){if(a.addEventListener){a.addEventListener(d,c,false)
}else{if(a.attachEvent){a.attachEvent("on"+d,c)
}else{b=a["on"+d];
a["on"+d]=e.winHandler(c,b)
}}}},winHandler:function(d,c){return function(){d();
if(typeof c=="function"){c()
}}
},WLfuncs0:[],WLfuncs:[],runWLfuncs:function(a){a.winLoaded=true;
;
;
;
a.callArray(a.WLfuncs0);
a.callArray(a.WLfuncs);
;
if(a.onDoneEmptyDiv){a.onDoneEmptyDiv()
}},winLoaded:false,$$onWindowLoaded:function(a){return function(b){
if(a.winLoaded){
a.call(b);
}else{a.fPush(b,a.WLfuncs)
}}
},$$beforeInstantiate:function(a){return function(e,d){var b=a.init(e),c=a.plugin;
if(b==-3){return
};
if(!a.isArray(c.BIfuncs)){c.BIfuncs=[]
}a.fPush(d,c.BIfuncs)
}
},$$onDetectionDone:function(a){return function(h,g,c,b){var d=a.init(h),j,e;
if(d==-3){return -1
}e=a.plugin;
;
if(!a.isArray(e.funcs)){e.funcs=[]
}if(e.getVersionDone!=1){j=a.isMinVersion?a.isMinVersion(h,"0",c,b):a.getVersion(h,c,b)
}if(e.installed!=-0.5&&e.installed!=0.5){
;
a.call(g);
;
return 1
}if(e.NOTF){a.fPush(g,e.funcs);
return 0
}return 1
}
},div:null,divWidth:50,pluginSize:1,emptyDiv:function(){var c=this,a,e,b,d=0;
if(c.div&&c.div.childNodes){
for(a=c.div.childNodes.length-1;
a>=0;
a--){b=c.div.childNodes[a];
if(b&&b.childNodes){if(d==0){for(e=b.childNodes.length-1;
e>=0;
e--){b.removeChild(b.childNodes[e])
}c.div.removeChild(b)
}else{}}}};
},DONEfuncs:[],onDoneEmptyDiv:function(){var c=this,a,b;
if(!c.winLoaded){return
}if(c.WLfuncs&&c.WLfuncs.length&&c.WLfuncs[c.WLfuncs.length-1]!==null){return
}for(a in c){b=c[a];
if(b&&b.funcs){if(b.OTF==3){return
}if(b.funcs.length&&b.funcs[b.funcs.length-1]!==null){return
}}}for(a=0;
a<c.DONEfuncs.length;
a++){c.callArray(c.DONEfuncs)
}c.emptyDiv()
},getWidth:function(c){if(c){var a=c.scrollWidth||c.offsetWidth,b=this;
if(b.isNum(a)){return a
}}return -1
},getTagStatus:function(m,g,a,b){var c=this,f,k=m.span,l=c.getWidth(k),h=a.span,j=c.getWidth(h),d=g.span,i=c.getWidth(d);
if(!k||!h||!d||!c.getDOMobj(m)){return -2
}if(j<i||l<0||j<0||i<0||i<=c.pluginSize||c.pluginSize<1){return 0
}if(l>=i){return -1
}try{if(l==c.pluginSize&&(!c.isIE||c.getDOMobj(m).readyState==4)){if(!m.winLoaded&&c.winLoaded){return 1
}if(m.winLoaded&&c.isNum(b)){if(!c.isNum(m.count)){m.count=b
}if(b-m.count>=10){return 1
}}}}catch(f){}return 0
},getDOMobj:function(g,a){var f,d=this,c=g?g.span:0,b=c&&c.firstChild?1:0;
try{if(b&&a){c.firstChild.focus()
}}catch(f){}return b?c.firstChild:null
},setStyle:function(b,g){var f=b.style,a,d,c=this;
if(f&&g){for(a=0;
a<g.length;
a=a+2){try{f[g[a]]=g[a+1]
}catch(d){}}}},insertDivInBody:function(i){var g,d=this,h="pd33993399",c=null,f=document,b="<",a=(f.getElementsByTagName("body")[0]||f.body);
if(!a){try{f.write(b+'div id="'+h+'">o'+b+"/div>");
c=f.getElementById(h)
}catch(g){}}a=(f.getElementsByTagName("body")[0]||f.body);
if(a){if(a.firstChild&&d.isDefined(a.insertBefore)){a.insertBefore(i,a.firstChild)
}else{a.appendChild(i)
}if(c){a.removeChild(c)
}}else{}},insertHTML:function(g,b,h,a,k){var l,m=document,j=this,q,o=m.createElement("span"),n,i,f="<";
var c=["outlineStyle","none","borderStyle","none","padding","0px","margin","0px","visibility","visible"];
if(!j.isDefined(a)){a=""
}if(j.isString(g)&&(/[^\s]/).test(g)){q=f+g+' width="'+j.pluginSize+'" height="'+j.pluginSize+'" ';
for(n=0;
n<b.length;
n=n+2){if(/[^\s]/.test(b[n+1])){q+=b[n]+'="'+b[n+1]+'" '
}}q+=">";
for(n=0;
n<h.length;
n=n+2){if(/[^\s]/.test(h[n+1])){q+=f+'param name="'+h[n]+'" value="'+h[n+1]+'" />'
}}q+=a+f+"/"+g+">"
}else{q=a
}if(!j.div){j.div=m.createElement("div");
i=m.getElementById("plugindetect");
if(i){j.div=i
}else{j.div.id="plugindetect";
j.insertDivInBody(j.div)
}j.setStyle(j.div,c.concat(["width",j.divWidth+"px","height",(j.pluginSize+3)+"px","fontSize",(j.pluginSize+3)+"px","lineHeight",(j.pluginSize+3)+"px","verticalAlign","baseline","display","block"]));
if(!i){j.setStyle(j.div,["position","absolute","right","0px","top","0px"])
}}if(j.div&&j.div.parentNode){
if(k&&k.BIfuncs&&k.BIfuncs.length&&k.BIfuncs[k.BIfuncs.length-1]!==null){
j.callArray(k.BIfuncs);
};
;
j.div.appendChild(o);
j.setStyle(o,c.concat(["fontSize",(j.pluginSize+3)+"px","lineHeight",(j.pluginSize+3)+"px","verticalAlign","baseline","display","inline"]));
try{if(o&&o.parentNode){o.focus()
}}catch(l){}try{o.innerHTML=q
}catch(l){}if(o.childNodes.length==1&&!(j.isGecko&&j.compareNums(j.verGecko,"1,5,0,0")<0)){j.setStyle(o.firstChild,c.concat(["display","inline"]))
}return{span:o,winLoaded:j.winLoaded,tagName:(j.isString(g)?g:"")}
}return{span:null,winLoaded:j.winLoaded,tagName:""}
},quicktime:{mimeType:["video/quicktime","application/x-quicktimeplayer","image/x-macpaint","image/x-quicktime"],progID:"QuickTimeCheckObject.QuickTimeCheck.1",progID0:"QuickTime.QuickTime",classID:"clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",minIEver:7,HTML:("<")+'param name="src" value="" />'+("<")+'param name="controller" value="false" />',getCodeBaseVersion:function(a){return'codebase="#version='+a+'"'
},SEARCH:{min:0,max:0,match:0,digits:[16,128,128,0]},getVersion:function(c){var f=this,d=f.$,a=null,e=null,b;
if(!d.isIE){if(d.hasMimeType(f.mimeType)){e=d.OS!=3?d.findNavPlugin("QuickTime.*Plug-?in",0):null;
if(e&&e.name){a=d.getNum(e.name)
}}}else{if(d.isStrNum(c)){b=c.split(d.splitNumRegx);
if(b.length>3&&parseInt(b[3],10)>0){b[3]="9999"
}c=b.join(",")
}if(d.isStrNum(c)&&d.verIE>=f.minIEver&&f.canUseIsMin()>0){f.installed=f.isMin(c);
f.getVersionDone=0;
return
}f.getVersionDone=1;
if(!a&&d.verIE>=f.minIEver){a=f.CDBASE2VER(d.codebaseSearch(f))
}if(!a){e=d.getAXO(f.progID);
if(e&&e.QuickTimeVersion){a=e.QuickTimeVersion.toString(16);
a=parseInt(a.charAt(0),16)+"."+parseInt(a.charAt(1),16)+"."+parseInt(a.charAt(2),16)
}}}f.installed=a?1:(e?0:-1);
f.version=d.formatNum(a,3)
},cdbaseUpper:["7,60,0,0","0,0,0,0"],cdbaseLower:["7,50,0,0",null],cdbase2ver:[function(c,b){var a=b.split(c.$.splitNumRegx);
return[a[0],a[1].charAt(0),a[1].charAt(1),a[2]].join(",")
},null],CDBASE2VER:function(f){var e=this,c=e.$,b,a=e.cdbaseUpper,d=e.cdbaseLower;
if(f){f=c.formatNum(f);
for(b=0;
b<a.length;
b++){if(a[b]&&c.compareNums(f,a[b])<0&&d[b]&&c.compareNums(f,d[b])>=0&&e.cdbase2ver[b]){return e.cdbase2ver[b](e,f)
}}}return f
},canUseIsMin:function(){var f=this,d=f.$,b,c=f.canUseIsMin,a=f.cdbaseUpper,e=f.cdbaseLower;
if(!c.value){c.value=-1;
for(b=0;
b<a.length;
b++){if(a[b]&&d.codebaseSearch(f,a[b])){c.value=1;
break
}if(e[b]&&d.codebaseSearch(f,e[b])){c.value=-1;
break
}}}f.SEARCH.match=c.value==1?1:0;
return c.value
},isMin:function(c){var b=this,a=b.$;
return a.codebaseSearch(b,c)?0.7:-1
}},java:{mimeType:["application/x-java-applet","application/x-java-vm","application/x-java-bean"],mimeTypeJPI:"application/x-java-applet;jpi-version=",classID:"clsid:8AD9C840-044E-11D1-B3E9-00805F499D93",DTKclassID:"clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA",DTKmimeType:["application/java-deployment-toolkit","application/npruntime-scriptable-plugin;DeploymentToolkit"],forceVerifyTag:[],jar:[],Enabled:navigator.javaEnabled(),VENDORS:["Sun Microsystems Inc.","Apple Computer, Inc."],OTF:null,All_versions:[],mimeTypeJPIresult:"",JavaPlugin_versions:[],JavaVersions:[[1,9,2,30],[1,8,2,30],[1,7,2,30],[1,6,1,30],[1,5,1,30],[1,4,2,30],[1,3,1,30]],searchJavaPluginAXO:function(){var h=null,a=this,c=a.$,g=[],j=[1,5,0,14],i=[1,6,0,2],f=[1,3,1,0],e=[1,4,2,0],d=[1,5,0,7],b=false;
if(!c.ActiveXEnabled){return null
};
b=true;
;
if(c.verIE>=a.minIEver){g=a.searchJavaAXO(i,i,b);
if(g.length>0&&b){g=a.searchJavaAXO(j,j,b)
}}else{
if(b){g=a.searchJavaAXO(d,d,true)
};
if(g.length==0){g=a.searchJavaAXO(f,e,false)
}}if(g.length>0){h=g[0]
}a.JavaPlugin_versions=[].concat(g);
return h
},searchJavaAXO:function(l,i,m){var n,f,h=this.$,q,k,a,e,g,j,b,r=[];
if(h.compareNums(l.join(","),i.join(","))>0){i=l
}i=h.formatNum(i.join(","));
var o,d="1,4,2,0",c="JavaPlugin."+l[0]+""+l[1]+""+l[2]+""+(l[3]>0?("_"+(l[3]<10?"0":"")+l[3]):"");
for(n=0;
n<this.JavaVersions.length;
n++){f=this.JavaVersions[n];
q="JavaPlugin."+f[0]+""+f[1];
g=f[0]+"."+f[1]+".";
for(a=f[2];
a>=0;
a--){b="JavaWebStart.isInstalled."+g+a+".0";
if(h.compareNums(f[0]+","+f[1]+","+a+",0",i)>=0&&!h.getAXO(b)){continue
}o=h.compareNums(f[0]+","+f[1]+","+a+",0",d)<0?true:false;
for(e=f[3];
e>=0;
e--){k=a+"_"+(e<10?"0"+e:e);
j=q+k;
if(h.getAXO(j)&&(o||h.getAXO(b))){r.push(g+k);
if(!m){return r
}}if(j==c){return r
}}if(h.getAXO(q+a)&&(o||h.getAXO(b))){r.push(g+a);
if(!m){return r
}}if(q+a==c){return r
}}}return r
},minIEver:7,getMimeJPIversion:function(){var h,a=this,d=a.$,c=new RegExp("("+a.mimeTypeJPI+")(\\d.*)","i"),k=new RegExp("Java","i"),e,j,f="",i={},g=0,b;
for(h=0;
h<navigator.mimeTypes.length;
h++){j=navigator.mimeTypes[h];
if(c.test(j.type)&&(e=j.enabledPlugin)&&(j=RegExp.$2)&&(k.test(e.description||f)||k.test(e.name||f))){i["a"+d.formatNum(j)]=j
}}b="0,0,0,0";
for(h in i){g++;
e=h.slice(1);
if(d.compareNums(e,b)>0){b=e
}}a.mimeTypeJPIresult=g>0?a.mimeTypeJPI+i["a"+b]:"";
return g>0?b:null
},getVersion:function(m,d,l){var f,c=this,e=c.$,h=c.NOTF,b=c.applet,j=c.verify,i=vendor=versionEnabled=null;
;
if(c.getVersionDone===null){c.OTF=0;
c.mimeObj=e.hasMimeType(c.mimeType);
c.deployTK.$=e;
c.deployTK.parentNode=c;
b.$=e;
b.parentNode=c;
if(h){h.$=e;
h.parentNode=c
}if(j){j.parentNode=c;
j.$=e;
j.init()
}}var k;
if(e.isArray(l)){for(k=0;
k<b.allowed.length;
k++){if(e.isNum(l[k])){b.allowed[k]=l[k]
}}}for(k=0;
k<c.forceVerifyTag.length;
k++){b.allowed[k]=c.forceVerifyTag[k]
}if(e.isString(d)){c.jar.push(d)
}if(c.getVersionDone==0){if(!c.version||b.canTryAny()){f=b.insertHTMLQueryAll(d);
if(f[0]){c.installed=1;
c.EndGetVersion(f[0],f[1])
}}return
}var g=c.deployTK.query();
if(g.JRE){i=g.JRE;
vendor=c.VENDORS[0]
}if(!e.isIE){var q,n,a,o;
o=(c.mimeObj&&c.Enabled)?true:false;
if(!i&&(f=c.getMimeJPIversion())!==null){i=f
}if(!i&&c.mimeObj){f="Java[^\\d]*Plug-in";
a=e.findNavPlugin(f);
if(a){f=new RegExp(f,"i");
q=f.test(a.description||"")?e.getNum(a.description):null;
n=f.test(a.name||"")?e.getNum(a.name):null;
if(q&&n){i=(e.compareNums(e.formatNum(q),e.formatNum(n))>=0)?q:n
}else{i=q||n
}}}if(!i&&c.mimeObj&&e.isSafari&&e.OS==2){a=e.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa",0);
if(a){q=e.getNum(a.description);
if(q){i=q
}}}if(i){c.version0=i;
if(c.Enabled){versionEnabled=i
}}}else{if(!i&&g.status==0){i=c.searchJavaPluginAXO();
if(i){vendor=c.VENDORS[0]
}}if(i){c.version0=i;
if(c.Enabled&&e.ActiveXEnabled){versionEnabled=i
}}}if(!versionEnabled||b.canTryAny()){f=b.insertHTMLQueryAll(d);
if(f[0]){versionEnabled=f[0];
vendor=f[1]
}}if(!versionEnabled&&(f=c.queryWithoutApplets())[0]){c.version0=versionEnabled=f[0];
vendor=f[1];
if(c.installed==-0.5){c.installed=0.5
}}if(e.isSafari&&e.OS==2){if(!versionEnabled&&o){if(c.installed===null){c.installed=0
}else{if(c.installed==-0.5){c.installed=0.5
}}}}if(c.jreDisabled()){versionEnabled=null
};
if(c.isPlugin2==0&&(f=c.mimeObj)&&(f=f.enabledPlugin)&&(f=f.description)){if((/Next.*Generation.*Java.*Plug-in/i).test(f)){c.isPlugin2=1
}else{if((/Classic.*Java.*Plug-in/i).test(f)){c.isPlugin2=-1
}}};
if(c.installed===null){c.installed=versionEnabled?1:(i?-0.2:-1)
}c.EndGetVersion(versionEnabled,vendor)
},EndGetVersion:function(b,d){var a=this,c=a.$;
if(a.version0){a.version0=c.formatNum(c.getNum(a.version0))
}if(b){a.version=c.formatNum(c.getNum(b));
a.vendor=(c.isString(d)?d:"")
}if(a.getVersionDone!=1){a.getVersionDone=0
}},jreDisabled:function(){var b=this,d=b.$,c=b.deployTK.query().JRE,a;
if(c&&d.OS==1){if((d.isGecko&&d.compareNums(d.verGecko,"1,9,2,0")>=0&&d.compareNums(c,"1,6,0,12")<0)||(d.isChrome&&d.compareNums(c,"1,6,0,12")<0)){return 1
}};
if(d.OS==3&&(a=b.mimeObj)&&(a=a.enabledPlugin)&&(a=a.description)&&(/Next.*Generation.*Java.*Plug-in/i).test(a)&&b.isPlugin2<2&&!b.Browser4Plugin2()){return 1
};
if(d.isOpera&&d.verOpera>=9&&!b.Enabled&&!b.mimeObj&&!b.queryWithoutApplets()[0]){return 1
}if((d.isGecko||d.isChrome)&&!b.mimeObj&&!b.queryWithoutApplets()[0]){return 1
}return 0
},deployTK:{status:null,JREall:[],JRE:null,HTML:null,query:function(){var f=this,h=f.$,c=f.parentNode,i,a,b,g=len=null;
if(f.status!==null){return f
}f.status=0;
if((h.isGecko&&h.compareNums(h.verGecko,h.formatNum("1.6"))<=0)||h.isSafari||h.isChrome||(h.isIE&&!h.ActiveXEnabled)){return f
}if(h.isIE&&h.verIE>=6){f.HTML=h.insertHTML("object",[],[]);
g=h.getDOMobj(f.HTML)
}else{if(!h.isIE&&(b=h.hasMimeType(c.DTKmimeType))&&b.type){f.HTML=h.insertHTML("object",["type",b.type],[]);
g=h.getDOMobj(f.HTML)
}}if(g){if(h.isIE&&h.verIE>=6){try{g.classid=c.DTKclassID
}catch(i){}};
try{if(Math.abs(c.isPlugin2)<2){c.isPlugin2=g.isPlugin2()?2:-2
}}catch(i){};
try{var d=g.jvms;
if(d){len=d.getLength();
if(h.isNum(len)){f.status=len>0?1:-1;
for(a=0;
a<len;
a++){b=h.getNum(d.get(len-1-a).version);
if(b){f.JREall[a]=b
}}}}}catch(i){}}if(f.JREall.length>0){f.JRE=h.formatNum(f.JREall[0])
}return f
}},queryWithoutApplets00:function(c,a){var b=window.java,d;
try{if(b&&b.lang&&b.lang.System){a.value=[b.lang.System.getProperty("java.version")+" ",b.lang.System.getProperty("java.vendor")+" "]
}}catch(d){}},queryWithoutApplets:function(){var c=this,f=c.$,g,a=c.queryWithoutApplets;
if(!a.value){a.value=[null,null];
if(!f.isIE&&window.java){if(f.OS==2&&f.isOpera&&f.verOpera<9.2&&f.verOpera>=9){}else{if(f.isGecko&&f.compareNums(f.verGecko,"1,9,0,0")<0&&f.compareNums(f.verGecko,"1,8,0,0")>=0){}else{if(f.isGecko){var i,b,h=document;
if(h.createElement&&h.createEvent){try{i=h.createElement("div"),b=h.createEvent("HTMLEvents");
b.initEvent("change",false,false);
i.addEventListener("change",f.handler(c.queryWithoutApplets00,f,a),false);
i.dispatchEvent(b)
}catch(g){}}}else{c.queryWithoutApplets00(f,a)
}}}}}return a.value
},applet:{results:[[null,null],[null,null],[null,null]],HTML:[0,0,0],active:[0,0,0],allowed:[2,2,2],DummyObjTagHTML:0,DummySpanTagHTML:0,getResult:function(){var c=this.results,a,b;
for(a=0;
a<c.length;
a++){b=c[a];
if(b[0]){break
}}return[].concat(b)
},canTry:function(d){var b=this,c=b.$,a=b.parentNode;
if(b.allowed[d]==3){return true
}if(!a.version0||!a.Enabled||(c.isIE&&!c.ActiveXEnabled)){if(b.allowed[d]==2){return true
}if(b.allowed[d]==1&&!b.getResult()[0]){return true
}}return false
},canTryAny:function(){var b=this,a;
for(a=0;
a<b.allowed.length;
a++){if(b.canTry(a)){return true
}}return false
},canUseAppletTag:function(){var b=this,c=b.$,a=b.parentNode;
return(!c.isIE||a.Enabled)
},canUseObjectTag:function(){var a=this,b=a.$;
return(!b.isIE||b.ActiveXEnabled)
},queryThis:function(h){var g,c=this,b=c.parentNode,f=b.$,a=vendor=null,d=f.getDOMobj(c.HTML[h],true);
if(d){try{a=d.getVersion()+" ";
vendor=d.getVendor()+" ";
d.statusbar(f.winLoaded?" ":" ")
}catch(g){}if(f.isStrNum(a)){c.results[h]=[a,vendor]
}try{if(f.isIE&&a&&d.readyState!=4){f.garbage=true;
d.parentNode.removeChild(d)
}}catch(g){};
if(a&&Math.abs(b.isPlugin2)<2){b.isPlugin2=-2;
try{if(b.minJRE4Plugin2(a)&&d.Packages.java.applet){b.isPlugin2=2
}}catch(g){}}
}},insertHTMLQueryAll:function(e){var g=this,n=g.parentNode,d=n.$,o=g.results,q=g.HTML,h="&nbsp;&nbsp;&nbsp;&nbsp;",u="A.class";
if(!d.isString(e)||!(/\.jar\s*$/).test(e)||(/\\/).test(e)){return[null,null]
}if(n.OTF<1){n.OTF=1
}if(n.jreDisabled()){return[null,null]
}if(n.OTF<2){n.OTF=2
}var c=e,t="",m;
if((/[\/]/).test(e)){m=e.split("/");
c=m[m.length-1];
m[m.length-1]="";
t=m.join("/")
}var j=["archive",c,"code",u],l=["mayscript","true"],r=["scriptable","true"].concat(l),f=!d.isIE&&n.mimeObj&&n.mimeObj.type?n.mimeObj.type:n.mimeType[0];
if(!q[0]&&g.canUseObjectTag()&&g.canTry(0)){q[0]=d.isIE?d.insertHTML("object",["type",f].concat(j),["codebase",t].concat(j).concat(r),h,n):d.insertHTML("object",["type",f,"archive",c,"classid","java:"+u],["codebase",t,"archive",c].concat(r),h,n);
o[0]=[0,0];
g.queryThis(0)
}if(!q[1]&&g.canUseAppletTag()&&g.canTry(1)){q[1]=d.isIE?d.insertHTML("applet",["alt",h].concat(l).concat(j),["codebase",t].concat(l),h,n):d.insertHTML("applet",["codebase",t,"alt",h].concat(l).concat(j),[].concat(l),h,n);
o[1]=[0,0];
g.queryThis(1)
}if(!q[2]&&g.canUseObjectTag()&&g.canTry(2)){q[2]=d.isIE?d.insertHTML("object",["classid",n.classID],["codebase",t].concat(j).concat(r),h,n):d.insertHTML();
o[2]=[0,0];
g.queryThis(2)
}if(!g.DummyObjTagHTML&&g.canUseObjectTag()){g.DummyObjTagHTML=d.insertHTML("object",[],[],h)
}if(!g.DummySpanTagHTML){g.DummySpanTagHTML=d.insertHTML("",[],[],h)
};
if(n.OTF<3&&((q[0]&&!o[0][0])||(q[1]&&!o[1][0])||(d.isIE&&q[2]&&!o[2][0]))){var i=n.NOTF,b=i.isJavaActive();
if(b>=0){n.OTF=3;
n.installed=b==1?0.5:-0.5;
i.onIntervalQuery=d.handler(i.$$onIntervalQuery,i);
if(!d.winLoaded){d.WLfuncs0.push([i.winOnLoadQuery,i])
}setTimeout(i.onIntervalQuery,i.intervalLength);
;
}};
var k,a=0;
for(k=0;
k<o.length;
k++){if(q[k]||g.canTry(k)){a++
}else{break
}}if(a==o.length){n.getVersionDone=n.forceVerifyTag.length>0?0:1
}return g.getResult()
}},NOTF:{count:0,countMax:25,intervalLength:250,isJavaActive:function(){var e=this,c=e.parentNode,a,b,d=-9;
for(a=0;
a<c.applet.HTML.length;
a++){b=e.isAppletActive(a);
c.applet.active[a]=b;
if(b>d){d=b
}}return d
},isAppletActive:function(g){var h=this,d=h.$,c=h.parentNode,b=c.applet,f,a=d.getTagStatus(b.HTML[g],b.DummySpanTagHTML,b.DummyObjTagHTML,h.count);
if(a==-2){return -2
}try{if(d.isIE&&d.verIE>=c.minIEver&&d.getDOMobj(b.HTML[g]).object){return 1
}}catch(f){}if(a==1&&(d.isIE||((c.version0&&c.Enabled&&c.Enabled)||c.queryWithoutApplets()[0]))){return 1
}if(a<0){return -1
}return 0
},winOnLoadQuery:function(c,d){var b=d.parentNode,a;
if(b.OTF==3){a=d.queryAllApplets();
d.queryCompleted(a[1],a[2])
}},$$onIntervalQuery:function(d){var c=d.$,b=d.parentNode,a;
if(b.OTF==3){a=d.queryAllApplets();
if(a[0]||(c.winLoaded&&d.count>d.countMax)){d.queryCompleted(a[1],a[2])
}}d.count++;
if(b.OTF==3){setTimeout(d.onIntervalQuery,d.intervalLength)
}},queryAllApplets:function(){var g=this,f=g.$,e=g.parentNode,d=e.applet,b,a,c;
for(b=0;
b<d.results.length;
b++){d.queryThis(b)
}a=d.getResult();
c=(a[0]||g.isJavaActive()<0)?true:false;
;
return[c,a[0],a[1]]
},queryCompleted:function(c,f){var e=this,d=e.$,b=e.parentNode;
if(b.OTF==4){return
}b.OTF=4;
var a=e.isJavaActive()==1?true:false;
if(c||b.queryWithoutApplets()[0]){b.installed=1
}else{if(a){if(b.version0){b.installed=1;
c=b.version0
}else{b.installed=0
}}else{if(b.installed==0.5){b.installed=0
}else{if(b.version0){b.installed=-0.2
}else{b.installed=-1
}}}}b.EndGetVersion(c,f);
;
if(b.funcs){
;
d.callArray(b.funcs);
}if(d.onDoneEmptyDiv){d.onDoneEmptyDiv()
}}},append:function(e,d){for(var c=0;
c<d.length;
c++){e.push(d[c])
}},isPlugin2:0,minJRE4Plugin2:function(a){var c=this.$,b=c.formatNum(c.getNum(a));
return b?(c.compareNums(b,"1,6,0,10")>=0):0
},Browser4Plugin2:function(){var a=this.$;
if(a.isIE){if(a.verIE<6){return 0
}}else{if(a.isGecko&&a.compareNums(a.verGecko,"1,9,0,0")<0){return 0
}}return 1
},getInfo:function(){var b=this,e=b.$,a=b.applet,j,o=b.installed,i=b.deployTK.query(),h=a.results,m=-1,q={All_versions:[],DeployTK_versions:[],DeploymentToolkitPlugin:(i.status==0?null:e.getDOMobj(i.HTML)),vendor:(e.isString(b.vendor)?b.vendor:""),OTF:(b.OTF<3?0:(b.OTF==3?1:2)),PLUGIN:null};
if(o==1&&b.minJRE4Plugin2(b.version)){if(b.isPlugin2<0||(b.isPlugin2<2&&!b.Browser4Plugin2())){}else{m=b.isPlugin2>0?1:0
}}q.isPlugin2=m;
for(j=0;
j<h.length;
j++){if(h[j][0]){q.PLUGIN=e.getDOMobj(a.HTML[j]);
break
}}var g=[null,null,null];
for(j=0;
j<h.length;
j++){if(h[j][0]){g[j]=1
}else{if(a.active[j]==1){g[j]=0
}else{if(a.allowed[j]>=1&&b.OTF!=3){if((j==1&&!a.canUseAppletTag())||(j!=1&&!a.canUseObjectTag())||o==-0.2||o==-1||a.active[j]<0||(j==2&&(!e.isIE||(/Microsoft/i).test(q.vendor)))){g[j]=-1
}}}}}q.objectTag=g[0];
q.appletTag=g[1];
q.objectTagActiveX=g[2];
var d=q.All_versions,n=q.DeployTK_versions,c=b.JavaPlugin_versions;
b.append(n,i.JREall);
b.append(d,(n.length>0?n:(c.length>0?c:(e.isString(b.version)?[b.version]:[]))));
for(j=0;
j<d.length;
j++){d[j]=e.formatNum(e.getNum(d[j]))
}var k,f=null;
if(!e.isIE){k=b.mimeObj||e.hasMimeType(b.mimeTypeJPIresult);
if(k){f=k.enabledPlugin
}}q.name=f?f.name:"";
q.description=f?f.description:"";
var l=null;
if((o==0||o==1)&&q.vendor==""){if(e.OS==2){l=b.VENDORS[1]
}else{if(!e.isIE&&e.OS==1){l=b.VENDORS[0]
}else{if(e.OS==3){l=b.VENDORS[0]
}}}if(l){q.vendor=l
}}return q
},JavaFix:function(){}},devalvr:{mimeType:"application/x-devalvrx",progID:"DevalVRXCtrl.DevalVRXCtrl.1",classID:"clsid:5D2CF9D0-113A-476B-986F-288B54571614",getVersion:function(){var h=this,a=null,f,b=h.$,d;
if(!b.isIE){f=b.findNavPlugin("DevalVR");
if(f&&f.name&&b.hasMimeType(h.mimeType)){a=f.description.split(" ")[3]
}h.installed=a?1:-1
}else{var g,c;
g=b.getAXO(h.progID);
if(g){c=b.getDOMobj(b.insertHTML("object",["classid",h.classID],["src",""],"",h));
if(c){try{if(c.pluginversion){a="00000000"+c.pluginversion.toString(16);
a=a.substr(a.length-8,8);
a=parseInt(a.substr(0,2),16)+","+parseInt(a.substr(2,2),16)+","+parseInt(a.substr(4,2),16)+","+parseInt(a.substr(6,2),16)
}}catch(d){}}}h.installed=a?1:(g?0:-1)
}h.version=b.formatNum(a)
}},flash:{mimeType:["application/x-shockwave-flash","application/futuresplash"],progID:"ShockwaveFlash.ShockwaveFlash",classID:"clsid:D27CDB6E-AE6D-11CF-96B8-444553540000",getVersion:function(){var b=function(i){if(!i){return null
}var e=/[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(i);
return e?e[0].replace(/[rRdD\.]/g,",").replace(/\s/g,""):null
};
var d,h=this,f=h.$,j,g,k=null,c=null,a=null;
if(!f.isIE){d=f.findNavPlugin("Flash");
if(d&&d.description&&f.hasMimeType(h.mimeType)){k=b(d.description)
}if(k){k=f.getPluginFileVersion(d,k)
}}else{for(g=15;
g>2;
g--){c=f.getAXO(h.progID+"."+g);
if(c){a=g.toString();
break
}}if(a=="6"){try{c.AllowScriptAccess="always"
}catch(j){return"6,0,21,0"
}}try{k=b(c.GetVariable("$version"))
}catch(j){}if(!k&&a){k=a
}}h.installed=k?1:-1;
h.version=f.formatNum(k);
return true
}},shockwave:{mimeType:"application/x-director",progID:"SWCtl.SWCtl",classID:"clsid:166B1BCA-3F9C-11CF-8075-444553540000",getVersion:function(){var a=null,b=null,g,f,d=this,c=d.$;
if(!c.isIE){f=c.findNavPlugin("Shockwave\\s*for\\s*Director");
if(f&&f.description&&c.hasMimeType(d.mimeType)){a=c.getNum(f.description)
}if(a){a=c.getPluginFileVersion(f,a)
}}else{try{b=c.getAXO(d.progID).ShockwaveVersion("")
}catch(g){}if(c.isString(b)&&b.length>0){a=c.getNum(b)
}else{if(c.getAXO(d.progID+".8")){a="8"
}else{if(c.getAXO(d.progID+".7")){a="7"
}else{if(c.getAXO(d.progID+".1")){a="6"
}}}}}d.installed=a?1:-1;
d.version=c.formatNum(a)
}},windowsmediaplayer:{mimeType:["application/x-mplayer2","application/asx","application/x-ms-wmp"],progID:"wmplayer.ocx",classID:"clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6",getVersion:function(){var b=this,a=null,e=b.$,d,f=null,c;
b.installed=-1;
if(!e.isIE){if(e.hasMimeType(b.mimeType)){f=e.findNavPlugin("Windows\\s*Media.*Plug-?in",0,"Totem")||e.findNavPlugin("Flip4Mac.*Windows\\s*Media.*Plug-?in",0,"Totem");
d=(e.isGecko&&e.compareNums(e.verGecko,e.formatNum("1.8"))<0);
d=d||(e.isOpera&&e.verOpera<10);
if(!d&&e.getMimeEnabledPlugin(b.mimeType[2],"Windows\\s*Media.*Firefox.*Plug-?in")){c=e.getDOMobj(e.insertHTML("object",["type",b.mimeType[2],"data",""],["src",""],"",b));
if(c){a=c.versionInfo
}}}}else{f=e.getAXO(b.progID);
if(f){a=f.versionInfo
}}b.installed=f&&a?1:(f?0:-1);
b.version=e.formatNum(a)
}},silverlight:{mimeType:"application/x-silverlight",progID:"AgControl.AgControl",digits:[20,20,9,12,31],getVersion:function(){var e=this,c=e.$,k=document,i=null,b=null,f=null,h=true,a=[1,0,1,1,1],u=[1,0,1,1,1],j=function(d){return(d<10?"0":"")+d.toString()
},n=function(s,d,v,w,t){return(s+"."+d+"."+v+j(w)+j(t)+".0")
},o=function(s,d,t){return r(s,(d==0?t:u[0]),(d==1?t:u[1]),(d==2?t:u[2]),(d==3?t:u[3]),(d==4?t:u[4]))
},r=function(w,t,s,y,x,v){var v;
try{return w.IsVersionSupported(n(t,s,y,x,v))
}catch(v){}return false
};
if(!c.isIE){var g;
if(c.hasMimeType(e.mimeType)){g=c.isGecko&&c.compareNums(c.verGecko,c.formatNum("1.6"))<=0;
if(c.isGecko&&g){h=false
}f=c.findNavPlugin("Silverlight.*Plug-?in",0);
if(f&&f.description){i=c.formatNum(f.description)
}if(i){u=i.split(c.splitNumRegx);
if(parseInt(u[2],10)>=30226&&parseInt(u[0],10)<2){u[0]="2"
}i=u.join(",")
}}e.installed=f&&h&&i?1:(f&&h?0:(f?-0.2:-1))
}else{b=c.getAXO(e.progID);
var m,l,q;
if(b&&r(b,a[0],a[1],a[2],a[3],a[4])){for(m=0;
m<e.digits.length;
m++){q=u[m];
for(l=q+(m==0?0:1);
l<=e.digits[m];
l++){if(o(b,m,l)){h=true;
u[m]=l
}else{break
}}if(!h){break
}}if(h){i=n(u[0],u[1],u[2],u[3],u[4])
}}e.installed=b&&h&&i?1:(b&&h?0:(b?-0.2:-1))
}e.version=c.formatNum(i)
}},vlc:{mimeType:"application/x-vlc-plugin",progID:"VideoLAN.VLCPlugin",compareNums:function(e,d){var c=this.$,k=e.split(c.splitNumRegx),i=d.split(c.splitNumRegx),h,b,a,g,f,j;
for(h=0;
h<Math.min(k.length,i.length);
h++){j=/([\d]+)([a-z]?)/.test(k[h]);
b=parseInt(RegExp.$1,10);
g=(h==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;
j=/([\d]+)([a-z]?)/.test(i[h]);
a=parseInt(RegExp.$1,10);
f=(h==2&&RegExp.$2.length>0)?RegExp.$2.charCodeAt(0):-1;
if(b!=a){return(b>a?1:-1)
}if(h==2&&g!=f){return(g>f?1:-1)
}}return 0
},getVersion:function(){var c=this,b=c.$,f,a=null,d;
if(!b.isIE){if(b.hasMimeType(c.mimeType)){f=b.findNavPlugin("VLC.*Plug-?in",0,"Totem");
if(f&&f.description){a=b.getNum(f.description,"[\\d][\\d\\.]*[a-z]*")
}}c.installed=a?1:-1
}else{f=b.getAXO(c.progID);
if(f){try{a=b.getNum(f.VersionInfo,"[\\d][\\d\\.]*[a-z]*")
}catch(d){}}c.installed=f?1:-1
}c.version=b.formatNum(a)
}},adobereader:{mimeType:"application/pdf",navPluginObj:null,progID:["AcroPDF.PDF","PDF.PdfCtrl"],classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",INSTALLED:{},pluginHasMimeType:function(d,c,f){var b=this,e=b.$,a;
for(a in d){if(d[a]&&d[a].type&&d[a].type==c){return 1
}}if(e.getMimeEnabledPlugin(c,f)){return 1
}return 0
},getVersion:function(i,j){var f=this,c=f.$,h,d,k,m=p=null,g=null,l=null,a,b;
j=(c.isString(j)&&j.length)?j.replace(/\s/,"").toLowerCase():f.mimeType;
if(c.isDefined(f.INSTALLED[j])){f.installed=f.INSTALLED[j];
return
}if(!c.isIE){a="Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in";
if(f.getVersionDone!==0){f.getVersionDone=0;
p=c.getMimeEnabledPlugin(f.mimeType,a);
if(!p&&c.hasMimeType(f.mimeType)){p=c.findNavPlugin(a,0)
}if(p){f.navPluginObj=p;
g=c.getNum(p.description)||c.getNum(p.name);
g=c.getPluginFileVersion(p,g);
if(!g&&c.OS==1){if(f.pluginHasMimeType(p,"application/vnd.adobe.pdfxml",a)){g="9"
}else{if(f.pluginHasMimeType(p,"application/vnd.adobe.x-mars",a)){g="8"
}}}}}else{g=f.version
}m=c.getMimeEnabledPlugin(j,a);
f.installed=m&&g?1:(m?0:(f.navPluginObj?-0.2:-1))
}else{p=c.getAXO(f.progID[0])||c.getAXO(f.progID[1]);
b=/=\s*([\d\.]+)/g;
try{d=(p||c.getDOMobj(c.insertHTML("object",["classid",f.classID],["src",""],"",f))).GetVersions();
for(k=0;
k<5;
k++){if(b.test(d)&&(!g||RegExp.$1>g)){g=RegExp.$1
}}}catch(h){}f.installed=g?1:(p?0:-1)
}if(!f.version){f.version=c.formatNum(g)
}f.INSTALLED[j]=f.installed
}},pdfreader:{mimeType:"application/pdf",progID:["AcroPDF.PDF","PDF.PdfCtrl"],classID:"clsid:CA8A9780-280D-11CF-A24D-444553540000",OTF:null,fileUsed:0,fileEnabled:1,isValid:function(b){var a=this,c=a.$;
if(!a.fileEnabled||!c.isString(b)||/\\/.test(b)||!/\.pdf\s*$/.test(b)){return 0
}return 1
},EndGetVersion:function(b){var a=this,c=a.$;
if(a.OTF==3){a.installed=-0.5
}else{a.installed=b?0:(c.isIE?-1.5:-1)
}a.getVersionDone=a.OTF<2&&a.fileEnabled&&a.installed<=-1&&a.getVersionDone!=1?0:1
},getVersion:function(l,g,c){var h=this,d=h.$,b=false,f,i,a,k,j=h.NOTF,m=h.doc;
;
if(((d.isGecko&&d.compareNums(d.verGecko,"2,0,0,0")<=0&&d.OS<=4)||(d.isOpera&&d.verOpera<=11&&d.OS<=4)||(d.isChrome&&d.compareNums(d.verChrome,"11,0,0,0")<0&&d.OS<=4)||0)&&!c){h.fileEnabled=0
}if(h.getVersionDone===null){h.OTF=0;
m.$=d;
m.parentNode=h;
if(j){j.$=d;
j.parentNode=h
}if(!d.isIE){if(!b&&!c&&d.hasMimeType(h.mimeType)){b=true
}}else{if(!b&&!c){try{if((d.getAXO(h.progID[0])||d.getAXO(h.progID[1])).GetVersions()){b=true
}}catch(k){}}}}if(!b){f=m.insertHTMLQuery(g,c);
if(f>0){b=true
}}i=document.getElementsByTagName("body")[0]||document.body;
if(c&&h.isValid(g)&&i&&i.firstChild){f=document.createElement("div");
d.setStyle(f,["outlineStyle","none","borderStyle","none","padding","0px","paddingBottom","50px","margin","0px","visibility","visible"]);
i.insertBefore(f,i.firstChild);
f.innerHTML="The red box below should display the PluginDetect DummyPDF.<br/>If it does, then the path/filename for DummyPDF are correct:<br/><iframe style='border:solid red 2px; padding:2px;' src='"+g+"' width='98%' height='250'></iframe>"
}h.EndGetVersion(b);
h.version=null
},doc:{HTML:0,DummyObjTagHTML:0,DummySpanTagHTML:0,queryObject:function(c){var g=this,b=g.parentNode,d=b.$,a;
if(d.isIE){a=-1;
try{if(d.getDOMobj(g.HTML).GetVersions()){a=1
}}catch(f){}}else{a=d.getTagStatus(g.HTML,g.DummySpanTagHTML,g.DummyObjTagHTML,c)
};
return a
},insertHTMLQuery:function(d,h){var f=this,b=f.parentNode,e=b.$,a,c="&nbsp;&nbsp;&nbsp;&nbsp;";
if(e.isIE){if(h&&!b.isValid(d)){return 0
}if(!f.HTML){f.HTML=e.insertHTML("object",["classid",b.classID],["src",h?d:""],c,b)
}if(h){b.fileUsed=1
}}else{if(!b.isValid(d)){return 0
}if(!f.HTML){f.HTML=e.insertHTML("object",["type",b.mimeType,"data",d],["src",d],c,b)
}b.fileUsed=1
}if(b.OTF<2){b.OTF=2
}if(!f.DummyObjTagHTML){f.DummyObjTagHTML=e.insertHTML("object",[],[],c)
}if(!f.DummySpanTagHTML){f.DummySpanTagHTML=e.insertHTML("",[],[],c)
}a=f.queryObject();
if(a!=0){return a
};
var g=b.NOTF;
if(b.OTF<3&&f.HTML&&g){b.OTF=3;
g.onIntervalQuery=e.handler(g.$$onIntervalQuery,g);
if(!e.winLoaded){e.WLfuncs0.push([g.winOnLoadQuery,g])
}setTimeout(g.onIntervalQuery,g.intervalLength);
;
};
return a
}},NOTF:{count:0,countMax:25,intervalLength:250,$$onIntervalQuery:function(e){var c=e.$,b=e.parentNode,d=b.doc,a;
if(b.OTF==3){a=d.queryObject(e.count);
if(a>0||a<0||(c.winLoaded&&e.count>e.countMax)){e.queryCompleted(a)
}}e.count++;
if(b.OTF==3){setTimeout(e.onIntervalQuery,e.intervalLength)
}},winOnLoadQuery:function(c,e){var b=e.parentNode,d=b.doc,a;
if(b.OTF==3){a=d.queryObject(e.count);
e.queryCompleted(a)
}},queryCompleted:function(b){var d=this,c=d.$,a=d.parentNode;
if(a.OTF==4){return
}a.OTF=4;
a.EndGetVersion(b>0?true:false);
;
if(a.funcs){
;
c.callArray(a.funcs);
}if(c.onDoneEmptyDiv){c.onDoneEmptyDiv()
}}},getInfo:function(){var b=this,c=b.$,a={OTF:(b.OTF<3?0:(b.OTF==3?1:2)),DummyPDFused:(b.fileUsed?true:false)};
return a
},zz:0},realplayer:{mimeType:["audio/x-pn-realaudio-plugin"],progID:["rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","RealPlayer"],classID:"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA",INSTALLED:{},q1:[[11,0,0],[999],[663],[663],[663],[660],[468],[468],[468],[468],[468],[468],[431],[431],[431],[372],[180],[180],[172],[172],[167],[114],[0]],q3:[[6,0],[12,99],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,69],[12,46],[12,46],[12,46],[11,3006],[11,2806],[11,2806],[11,2804],[11,2804],[11,2799],[11,2749],[11,2700]],compare:function(g,f){var e,d=g.length,i=f.length,c,h;
for(e=0;
e<Math.max(d,i);
e++){c=e<d?g[e]:0;
h=e<i?f[e]:0;
if(c>h){return 1
}if(c<h){return -1
}}return 0
},convertNum:function(a,f,e){var g=this,c=g.$,d,b,h,i=null;
if(!a||!(d=c.formatNum(a))){return i
}d=d.split(c.splitNumRegx);
for(h=0;
h<d.length;
h++){d[h]=parseInt(d[h],10)
}if(g.compare(d.slice(0,Math.min(f[0].length,d.length)),f[0])!=0){return i
}b=d.length>f[0].length?d.slice(f[0].length):[];
if(g.compare(b,f[1])>0||g.compare(b,f[f.length-1])<0){return i
}for(h=f.length-1;
h>=1;
h--){if(h==1){break
}if(g.compare(f[h],b)==0&&g.compare(f[h],f[h-1])==0){break
}if(g.compare(b,f[h])>=0&&g.compare(b,f[h-1])<0){break
}}return e[0].join(".")+"."+e[h].join(".")
},getVersion:function(m,n){var j=this,k=null,c=0,g=0,d=j.$,r,i,t,a;
if(d.isString(n)&&/[^\s]/.test(n)){a=n
}else{n=null;
a=j.mimeType[0]
}if(d.isDefined(j.INSTALLED[a])){j.installed=j.INSTALLED[a];
return
}if(!d.isIE){var l="RealPlayer.*Plug-?in",h=d.hasMimeType(j.mimeType),o=d.findNavPlugin(l,0);
if(h&&o){c=1;
if(n){if(d.getMimeEnabledPlugin(n,l)){g=1
}else{g=0
}}else{g=1
}}if(j.getVersionDone!==0){j.getVersionDone=0;
if(h){var q=1,b=null,s=null;
t=d.hasMimeType("application/vnd.rn-realplayer-javascript");
if(t){b=d.formatNum(d.getNum(t.enabledPlugin.description))
}if(d.OS==1&&b){var f=b.split(d.splitNumRegx);
s=true;
if(j.compare(f,[6,0,12,200])<0){s=false
}else{if(j.compare(f,[6,0,12,1739])<=0&&j.compare(f,[6,0,12,857])>=0){s=false
}}}if(s===false){q=0
}if(d.OS<=2){if(d.isGecko&&d.compareNums(d.verGecko,d.formatNum("1,8"))<0){q=0
}if(d.isChrome){q=0
}if(d.isOpera&&d.verOpera<10){q=0
}}else{q=0
}if(q){t=d.insertHTML("object",["type",j.mimeType[0]],["src","","autostart","false","imagestatus","false","controls","stopbutton"],"",j);
t=d.getDOMobj(t);
try{k=d.getNum(t.GetVersionInfo())
}catch(r){}d.setStyle(t,["display","none"])
}if(!k&&b&&s===false){t=j.convertNum(b,j.q3,j.q1);
k=t?t:b
}}}else{k=j.version
}j.installed=c&&g&&k?1:(c&&g?0:(c?-0.2:-1))
}else{t=null;
for(i=0;
i<j.progID.length;
i++){t=d.getAXO(j.progID[i]);
if(t){try{k=d.getNum(t.GetVersionInfo());
break
}catch(r){}}}j.installed=k?1:-1
}if(!j.version){j.version=d.formatNum(k)
}j.INSTALLED[a]=j.installed
}},zz:0};
$pd.initScript();
