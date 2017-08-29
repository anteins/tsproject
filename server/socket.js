var WebSocketServer = require('ws').Server;

var express = require('express');
var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    ws = require("ws"),
    urlapi = require("url"),
    util = require("util"),
    querystring = require('querystring'),
    ByteBuffer = require('bytebuffer'),
    ProtoBuf = require("protobufjs");
// post请求会用到
var bodyParser = require('body-parser');
var multer = require('multer'); 
// Initialize from .proto file
var builder = ProtoBuf.loadProtoFile("../tsChuanqi/src/network/message/pb.proto")

var app = express();   
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get('/', function (req, res) {
   console.log("get", req.query);
   res.end(req.query);
})
app.post('/', function (req, res) {
    console.log("POST ")
    var bytes = toUint8Array(req.body.pb);
    res.end(bytes);
})

var server = app.listen(9090, function(){
    var host = server.address().address;
    var port = server.address().port
    console.log("HTTP地址为 http://%s:%s", host, port)
});

var connectionList = [];
var break_send = 0;
var blackClient = null;
var test_no_pong = false;
var test_close_once = false;
var break_send = 0;
var test_close_ex = true;
var PROTOCOL_ID = {
    1000:"c2s_auth_key",
    1001:"s2c_auth_key",
    1002:"p_role_base",
    1003:"p_kv",
    1004:"c2s_heart_beat",
    1005:"s2c_heart_beat",
    1006:"c2s_re_connect",
}

ltestconfig = {
    "no_pong":false,
    "disconnect_after_sec":8,
    "reconnect_after_sec":10,
}

wss = new WebSocketServer({port:8181});
wss.on('connection', function (ws) {
    connectionList.push(ws);
    console.log(">new player ~")

    if(ltestconfig["disconnect_after_sec"] > 0){
        setTimeout(function(){
            console.log("主动关闭通信");
            ws.close();
            if(ltestconfig["reconnect_after_sec"] > 0){
                setTimeout(function(){
                    console.log("恢复连接");
                    // ws = new WebSocketServer({port:8181});
                }, ltestconfig["reconnect_after_sec"] * 1000);
            }
        }, ltestconfig["disconnect_after_sec"] * 1000);
    }

	var clientStockUpdater = setInterval(function () {
	}, 1000);

    ws.on("close", function(code, message) {
        console.log(">client close", code, message);
        for(var client of connectionList){
            if(client==ws){
                break;
            }
        }
    });

    function to_break_connect(client, can_not_reconnect=false, connect_self = 0){
        console.log("服务器主动断开");
        break_send = 0;
        client.close();
        if(can_not_reconnect){
            wss.close();
            if(connect_self > 0){
                setTimeout(function(){
                    console.log("恢复连接");
                    wss = new WebSocketServer({port:8181});
                }, connect_self * 1000);
            }
        }
    }

	ws.on('message', function (message) {
		console.log("----------------------------------------------")
        var [protoId, pbdatas] = unpack(message);
        console.log("onMessage ", protoId, pbdatas);

        if(protoId == 1004){
            //心跳
            if(ltestconfig["no_pong"])
                return;
            var msg = pbencode(1005, {pong:1});
            var req = pack(1005, msg);
            // console.log("sendPong ", req);
            ws.send(req);
        }else{
            // var msg = pbencode(1001, {
            //     apk_version:"v1.2",
            //     queue_num:1,
            //     create_role:1,
            //     server_time:1.5,
            //     role_base:1,
            //     sum_pay:1,
            //     code_register:1,
            //     send_enter_tag:1,
            // });
            var msg = pbencode(1006, {
                pong:3,
            });
            var req = pack(1006, msg);
            console.log("sendMessage ", req);
            ws.send(req);
        }
	});
});

wss.on('error', function (err) {
    console.log(">server error", err);
});

wss.on('headers', function (headers, request) {
    console.log(">server headers " + headers);
});

var pbdecode = function(protoId, pbdatas){
    var Message = builder.build(PROTOCOL_ID[protoId]);
    var msg = Message.decode(pbdatas);
    return msg;
}

var pbencode = function(protoId, data){
    var Message = builder.build(PROTOCOL_ID[protoId]);
    var msg = new Message(data).encode();
    return msg;
}
var toUint8Array = function(sData){
    var datas = sData;
    var data_buf = datas.split(",");
    for(var d in data_buf){
        data_buf[d] = parseInt(data_buf[d]);
    }
    var bytes = new Buffer(data_buf);
}
var unpack = function(bytes){
    var pbdatas = bytes.slice(4, bytes.length);
    var id = bytes.readUInt32BE(0, 4);
    return [id, pbdatas];
}
var pack = function(protoId, pbbuf){
    var idbuf = new ByteBuffer(4);
    idbuf.writeInt32(protoId);
    var newbuf = Buffer.concat([idbuf.buffer, pbbuf.buffer]);
    return newbuf;
}



