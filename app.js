console.log('node.js : ' + process.version + "  ("+process.platform+")");

var util = require('util');
var path  = require('path');
var fs  = require('fs');

var iconv = require('iconv-lite');
var tr866 = function(str){return iconv.decode(str,'cp866');} // 'utf8', 'ucs2', 'ascii', 'binary', 'latin1', 'base64'
var tr = tr866;

var u = require('underscore');
    u.str = require('underscore.string');
var mixa = require('mixa_std_js_functions');

var mstr = mixa.str;
var mint = mixa.int;

var file_log = "f:\\temp\\log_3proxy\\logs\\3proxy.log";
//var file_log = "/var/log/3proxy/3proxy.log";

var interval_read_file = 1000;
var interval_watch_data = interval_read_file*60*60;
var max_sites_show = 5;

var fnc_get_data_from_line = require('./3proxy_cfg.js');


var lines = [];
var last_time_data = 0;
var data = {
    '127.0.0.1' : {'mail.ru':{time:0,size_upload:0,size_download:0}}
}
var data_s = {
    '127.0.0.1' : {time:0,size_upload:0,size_download:0}
}
data = {};
data_s = {};


console.log("\nstart");
console.log("watch file: "+file_log);



fs.watchFile(file_log, {interval:interval_read_file}, function(curr, prev){
    
    
    fs.open(file_log, 'r', function(err,fd){
        if ( err ) {
            console.log("ERROR OPEN FILE: "+file_log+"\n");
            console.log(util.inspect(err));
            return ;
        }
        if ( curr.size <= prev.size ) {
            return ;
        }
        
        var read_size = curr.size - prev.size;
        var read_from = prev.size;
        var buffer = new Buffer(read_size);
        console.log("read file.. (read_size:"+read_size+")");
        fs.read(fd, buffer, 0, read_size, read_from, get_lines_from_file_data);
    })
});

function get_lines_from_file_data(err, bytesRead, buffer) {
    var str = buffer.toString(/*[encoding], [start], [end]*/);
    if (err) {
            console.log("ERROR READ FILE: "+file_log+"\n");
            console.log(util.inspect(err));
            return ;
    }
    var ind = 0;
    var prev_ind = 0;
    var line = "";
    
    while( (ind = str.indexOf('\n',prev_ind+1)) >= 0 ) {
        line = u.str.trim(str.substr(prev_ind,ind-prev_ind));
        prev_ind = ind;
        update_data(get_data_from_line(line));
    }
    line = u.str.trim(str.substr(prev_ind));
    update_data(get_data_from_line(line));
    
    //console.log("--------------------------------\n"+str+"\n-----------------------------------------");
    //console.log(util.inspect(lines));
    refresh_data();
}

function get_data_from_line(str) {
    return fnc_get_data_from_line(str);
}

function update_data(line_data) {
    if (!line_data) return;
    
    lines.push(line_data);
    
    if (last_time_data < line_data.time) last_time_data = line_data.time;

    //data[line_data.host].push(line_data);
}


function update_host_data(l) {
    if (!data_s[l.host]) {
        data_s[l.host] = {time:l.time,size_upload:l.size_upload,size_download:l.size_download};
    }else{
        if (data_s[l.host].time < l.time) data_s[l.host].time = l.time;
        data_s[l.host].size_upload   += l.size_upload;
        data_s[l.host].size_download += l.size_download;
    }
    
    if (!data[l.host]) {
        var s = {};
        s[l.site] = {time:l.time, size_upload:l.size_upload, size_download:l.size_download};
        data[l.host] = s;
    }else{
        var h = data[l.host];
        if (!h[l.site]) {
            h[l.site] = {time:l.time, size_upload:l.size_upload, size_download:l.size_download};
        }else{
            if (h[l.site].time < l.time) h[l.site].time = l.time;
            h[l.site].size_upload += l.size_upload;
            h[l.site].size_download += l.size_download;
        }
    }
}

function refresh_data(){
    var cnt = lines.length;
    var del_i = 0;
    for(var i=0;i<cnt;i++){
        var l = lines[i];
        if ( l.time < last_time_data - interval_watch_data ) {
            del_i = i;
        }else{
            break;
        }
    }
    lines.splice(0,del_i);
    
    
    data_s = {};
    data = {};
    cnt = lines.length;
    for(var i=0;i<cnt;i++){
        var l = lines[i];
        update_host_data(l);
    }
    show_data();
}

function sort_fnc(a,b){
        if (a.size_download > b.size_download) return -1;
        if (a.size_download < b.size_download) return  1;
        return 0;
}

function show_data() {
    /*
    console.log("========================================================================");
    console.log(util.inspect(data_s));
    console.log("========================================================================");
    console.log(util.inspect(data));
    */
    console.log("==["+mstr.date_to_str_format(last_time_data,'Y.M.D h:m:s')+"]===========================================================");
    /******************/
    
    var arr = [];
    for(var host in data_s){
        var d = data_s[host];
        d.host = host;
        d.sites = data[host];
        
        var arr_s = [];
        for(var site in d.sites){
            var s = d.sites[site];
            s.site = site;
            arr_s.push(s);
        }
        arr_s.sort(sort_fnc);
        d.sites = arr_s;
        arr.push(d);
    }
    arr.sort(sort_fnc);
    //console.log("========================================================================");
    console.log(util.inspect(arr));
    
    for(var i=0;i<arr.length;i++){
        var h = arr[i];
        var host = h.host;
        console.log("["+host+"]\n"
                    +"  s u:"+mstr.set_fix_len(mint.round_size_bytes(h.size_upload),10,null,1)
                    +"  d:"+mstr.set_fix_len(mint.round_size_bytes(h.size_download),10,null,1)
                    +"  t:"+mstr.date_to_str_format(h.time,'Y.M.D h:m:s')
                    );
        var hs = h.sites;
        
        var cnt = max_sites_show;
        if (cnt > hs.length) cnt = hs.length;
        for(var j=0;j<cnt;j++){
            var s = hs[j];
            var site = s.site;
            console.log("    u:"+mstr.set_fix_len(mint.round_size_bytes(s.size_upload),10,null,1)+
                          "  d:"+mstr.set_fix_len(mint.round_size_bytes(s.size_download),10,null,1)+
                          "  t:"+mstr.date_to_str_format(s.time,'Y.M.D h:m:s')+
                          "  "+site);
        }
        
        var d_other = {time:0,size_upload:0,size_download:0};
        for(var j=cnt;j<hs.length;j++){
            var s = hs[j];
            d_other.size_upload   += s.size_upload;
            d_other.size_download += s.size_download;
            if (d_other.time < s.time) d_other.time = s.time;
        }
        console.log("    u:"+mstr.set_fix_len(mint.round_size_bytes(d_other.size_upload),10,null,1)+
                      "  d:"+mstr.set_fix_len(mint.round_size_bytes(d_other.size_download),10,null,1)+
                      "  t:"+mstr.date_to_str_format(d_other.time,'Y.M.D h:m:s')+
                      "  ...other...");
        
    }
    
    /****************/
}




