console.log("\n3proxy config load..");

var util = require('util');
var path  = require('path');
var fs  = require('fs');

var iconv = require('iconv-lite');
var tr866 = function(str){return iconv.decode(str,'cp866');} // 'utf8', 'ucs2', 'ascii', 'binary', 'latin1', 'base64'
var tr = tr866;

var u = require('underscore');
    u.str = require('underscore.string');


var data = {
    '127.0.0.1' : [{host:'192.168.1.120',time:0,site:'mail.ru',size_upload:0,size_download:0}]
}



module.exports = get_data_from_line;
/************
1401945943.894 [05/Jun/2014:08:25:43 +0300]  PROXY.3128 00000 - 192.168.1.131:1745 94.100.180.26:80 1113 273 0 GET_http://my.mail.ru/my/grstat?name=uvp3.error_text_shown&rnd=0.8526153624989092_HTTP/1.1
1401945943.941 [05/Jun/2014:08:25:43 +0300]  PROXY.3128 00000 - 192.168.1.131:1759 94.100.181.214:80 1068 488 0 GET_http://r.mail.ru/crossdomain.xml_HTTP/1.1
1401945944.016 [05/Jun/2014:08:25:44 +0300]  PROXY.3128 00000 - 192.168.1.131:1754 128.140.168.217:80 1365 487 0 POST_http://pump.video.mail.ru/_HTTP/1.1
1401945944.337 [05/Jun/2014:08:25:44 +0300]  PROXY.3128 00000 - 192.168.1.131:1760 94.100.181.214:80 1065 314 0 GET_http://r.mail.ru/d3625910.gif_HTTP/1.1
1401945944.370 [05/Jun/2014:08:25:44 +0300]  PROXY.3128 00000 - 192.168.1.131:1759 217.69.131.102:80 1281 190 0 GET_http://log.video.mail.ru/ferr/uvp3?err=T_LITE_LOADING_ERROR&location=http%3A//kino-son.com/film-dom-nochi-2013&ext=&extId=&res=http%3A//api.video.mail.ru/videos/mail/thedogand/_myvideo/367.json_HTTP/1.1
1401945944.372 [05/Jun/2014:08:25:44 +0300]  PROXY.3128 00000 - 192.168.1.131:1751 91.233.216.112:80 520 150683 0 GET_http://videovolna.tv/frontend/css/adwidget/images/player-bg.png_HTTP/1.1
1401945944.403 [05/Jun/2014:08:25:44 +0300]  PROXY.3128 00000 - 192.168.1.131:1761 128.140.168.217:80 1375 487 0 POST_http://pump.video.mail.ru/_HTTP/1.1
1401945945.817 [05/Jun/2014:08:25:45 +0300]  PROXY.3128 00000 - 192.168.1.247:50596 87.240.134.86:80 924 240 0 POST_http://q85.queuev4.vk.com/im536_HTTP/1.1
1401945945.863 [05/Jun/2014:08:25:45 +0300]  PROXY.3128 00000 - 192.168.1.247:50594 87.240.134.172:80 925 240 0 POST_http://q91.queuev4.vk.com/im041_HTTP/1.1
1401945946.322 [05/Jun/2014:08:25:46 +0300]  PROXY.3128 00000 - 192.168.1.248:62843 87.240.134.76:80 1063 345 0 POST_http://q75.queuev4.vk.com/im166_HTTP/1.1
1401945946.591 [05/Jun/2014:08:25:46 +0300]  PROXY.3128 00000 - 192.168.1.248:62901 217.69.139.59:80 1016 757 0 GET_http://ok-portal.mail.ru/NaviData?JSONP_call=MRG_updateToolbar&gamescnt=1&rnd=0.4304287978447974_HTTP/1.1
1401945947.530 [05/Jun/2014:08:25:47 +0300]  PROXY.3128 00000 - 192.168.1.248:62843 87.240.134.76:80 1063 343 0 POST_http://q75.queuev4.vk.com/im166_HTTP/1.1
1401945947.582 [05/Jun/2014:08:25:47 +0300]  PROXY.3128 00000 - 192.168.1.111:1885 5.9.43.239:80 539 311 0 GET_http://pc-radio.ru/sites/default/files/styles/mini_cart_radio_logo/public/radio_logo/60x60xrufm_3.jpg,qitok=OHZJfr-p.pagespeed.ic.0ockDp3E90.jpg_HTTP/1.1
1401945947.798 [05/Jun/2014:08:25:47 +0300]  PROXY.3128 00000 - 192.168.1.131:1744 5.187.3.64:80 993 473 0 GET_http://adone.ru/cntr/gif/?cid=832fcd1ee643716a00dd26a225ac1c74&uiv=244413x8f78b5&hi=4dec0f27e3489e4f53cfa99c671f98c6&h=863fc32072422683756383982bdb91f5&r=http%3A%2F%2Fwww.google.ru%2Furl%3Fsa%3Dt%26rct%3Dj%26q%3D%26esrc%3Ds%26source%3Dweb%26cd%3D5%26ved%3D0CDcQFjAE%26url%3Dhttp%253A%252F%252Fkino-son.com%252Ffilm-dom-nochi-2013%26ei%3DAwCQU_3bAciG4gSqzICYBg%26usg%3DAFQjCNF3bQtej-O5s47zjS7mgdz7kpELwg%26bvm%3Dbv.68445247%2Cd.bGE%26cad%3Drjt&wh=h&clt=3776&ui=1366x768%3B24%3BWin32%3BMozilla%3BFirefox%2C12%2C0%3Bru-RU%3Btrue%3Bfalse%3B-180&aoh=&aos=&bb=&451167_HTTP/1.1
1401945948.160 [05/Jun/2014:08:25:48 +0300]  PROXY.3128 00000 - 192.168.1.64:53936 176.9.79.70:80 475 301 0 GET_http://s2.onicon.ru/status?v=3.1.0.481&_c=0.5103805715334482_HTTP/1.1
********/

//console.log(util.inspect(get_data_from_line("1401945947.582 [05/Jun/2014:08:25:47 +0300]  PROXY.3128 00000 - 192.168.1.111:1885 5.9.43.239:80 539 311 0 GET_http://pc-radio.ru/sites/default/files/styles/mini_cart_radio_logo/public/radio_logo/60x60xrufm_3.jpg,qitok=OHZJfr-p.pagespeed.ic.0ockDp3E90.jpg_HTTP/1.1")));

//console.log(util.inspect(get_data_from_line("1401945944.370 [05/Jun/2014:08:25:44 +0300]  PROXY.3128 00000 - 192.168.1.131:1759 217.69.131.102:80 1281 190 0 GET_http://log.video.mail.ru/ferr/uvp3?err=T_LITE_LOADING_ERROR&location=http%3A//kino-son.com/film-dom-nochi-2013&ext=&extId=&res=http%3A//api.video.mail.ru/videos/mail/thedogand/_myvideo/367.json_HTTP/1.1")));


function get_data_from_line(str){
    var str_months = {
        'Jan':1,
        'Feb':2,
        'Mar':3,
        'Apr':4,
        'May':5,
        'Jun':6,
        'Jul':7,
        'Aug':8,
        'Sep':9,
        'Oct':10,
        'Nov':11,
        'Dec':12
    }

    if (!/  PROXY\.3128 /.test(str)) return null;

    //var res = /^\d{10}\.\d{3} [(\d{2}\/\S{3}\/\d{4}\:\d{2}\:\d{2}\:\d{2} \+\d{4})] /.exec(str);
    var data = {};
    
    str = str.substr(str.indexOf(' ['));
    
    {// date
        var d = new Date();
        var i = str.indexOf(']');
        var t = str.substr(0,i-1);
        {
          d.setDate(t.substr(0,2));
          t = t.substr(2+1);
          var i = t.indexOf('/');
          d.setMonth(str_months[t.substr(0,i)]);
          t = t.substr(i+1);
          d.setYear(t.substr(0,4));
          t = t.substr(4+1);
          d.setHours(t.substr(0,2));
          t = t.substr(2+1);
          d.setMinutes(t.substr(0,2));
          t = t.substr(2+1);
          d.setSeconds(t.substr(0,2));
        }
        data.time = d;
    }
    
    {//host
        str = str.substr(str.indexOf(' - ')+3);
        var i = str.indexOf(':');
        var host = str.substr(0,i);
        str = str.substr(i+1);
        data.host = host;
    }
    
    {//size_download & size_upload
        str = str.substr(str.indexOf(':')+1);
        str = str.substr(str.indexOf(' ')+1);
        var i = str.indexOf(' ');
        var size_download = Number(str.substr(0,i));
        str = str.substr(i+1);
        i = str.indexOf(' ');
        var size_upload   = Number(str.substr(0,i));
        str = str.substr(i+1);
        data.size_download = size_download;
        data.size_upload   = size_upload;
    }
    
    //t = t.replace('Jun','06');
    {//site
        var res = /http\:\/\/(.*?)\//ig.exec(str);
        var site = str;
        if (!res) {
            console.log("ERROR");
            console.log(util.inspect(data));
            console.log(str);
            return null;
        }
        if (res[1]) site = res[1];
        else if (res[0]) site = res[0];
        //console.log(util.inspect(res));
        data.site = site;
    }
    
    //console.log(util.inspect(data));

    //console.log(data.host+" => "+data.time+ "  MONTH:"+d.getMonth());
    return data;
}

