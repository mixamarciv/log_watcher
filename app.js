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

//var file_log = "f:\\temp\\log_3proxy\\logs\\3proxy.log";
var file_log = "/var/log/3proxy/3proxy.log";

var interval_read_file = 5000;
var interval_update_data = interval_read_file*60*60;

var fnc_get_data_from_line = require('./3proxy_cfg.js');


var data = {
    '127.0.0.1' : {'mail.ru':{time:0,size_upload:0,size_download:0}}
}
var data_s = {
    '127.0.0.1' : {time:0,size_upload:0,size_download:0}
}


console.log("\nstart");
console.log("watch file: "+file_log);


setInterval(function(){
    data = {};
    data_s = {};
},interval_update_data);

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
    show_data();
}

function get_data_from_line(str) {
    return fnc_get_data_from_line(str);
}

function update_data(line_data) {
    if (!line_data) return;
    if (!data[line_data.host]) {
        var s = {};
        s[line_data.site] = {time:line_data.time, size_upload:line_data.size_upload, size_download:line_data.size_download};
        data[line_data.host] = s;
    }else{
        var h = data[line_data.host];
        if (!h[line_data.site]) {
            h[line_data.site] = {time:line_data.time, size_upload:line_data.size_upload, size_download:line_data.size_download};
        }else{
            
            if (h[line_data.site].time < line_data.time) h[line_data.site].time = line_data.time;
            h[line_data.site].size_upload += line_data.size_upload;
            h[line_data.site].size_download += line_data.size_download;
        }
    }
    
    if (!data_s[line_data.host]) {
        data_s[line_data.host] = {time:0,size_upload:0,size_download:0};
    }else{
        if (data_s[line_data.host].time < line_data.time) data_s[line_data.host].time = line_data.time;
        data_s[line_data.host].size_upload   += line_data.size_upload;
        data_s[line_data.host].size_download += line_data.size_download;
    }
    
    //data[line_data.host].push(line_data);
    
}

function show_data() {
    /*
    console.log("========================================================================");
    console.log(util.inspect(data_s));
    console.log("========================================================================");
    console.log(util.inspect(data));
    */
    console.log("========================================================================");
    /******************/
    for(var host in data_s){
        var h = data_s[host];
        console.log("["+host+"]\n"
                            +"  s u:"+mstr.set_fix_len(mint.round_size_bytes(h.size_upload),10,null,1)
                            +"  d:"+mstr.set_fix_len(mint.round_size_bytes(h.size_download),10,null,1)
                            +"  t:"+mstr.date_to_str_format(h.time,'Y.M.D h:m:s')
                    );
        var hs = data[host];
        for(var site in hs){
            var s = hs[site];
            console.log("    u:"+mstr.set_fix_len(mint.round_size_bytes(s.size_upload),10,null,1)+
                          "  d:"+mstr.set_fix_len(mint.round_size_bytes(s.size_download),10,null,1)+
                          "  t:"+mstr.date_to_str_format(s.time,'Y.M.D h:m:s')+
                          "  "+site);
        }
    }
    
    /****************/
}




