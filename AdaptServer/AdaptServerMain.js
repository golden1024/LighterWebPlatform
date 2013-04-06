// 主要职责.分配ID.路由登陆.负载平衡网关.
// 启动服务器时候.先启动该服务器.之后其他的服都会请求该分配服.分配端口号之类的操作.

var tcp = require("../LighterWebEngine/TCP");
var cfg = require("../Common/Config");
var uuid = require("./UUID");

tcp.CreateServer(cfg.AdaptServerPort,

    function(hSocket) {

    },

    function(hSocket, sBuffer) {
        var oPacket = JSON.parse(sBuffer);
        switch (oPacket.MM) {
            case "GetUuidPort":
                GateWay_GetUUID(hSocket);
                break;
        };
    },

    function(hSocket) {
        console.log("close = " + uuid.G_GetUUID(hSocket));
        uuid.G_RemoveS(hSocket);
    }
);

function GateWay_GetUUID(hSocket){
    var iUUID = uuid.G_UUID();
    var iPORT = uuid.G_PORT() + cfg.GateWayServerPort;

    var sPacket = {};
    sPacket["MM"] = "GetUuidPort";
    sPacket["UUID"] = iUUID;
    sPacket["PORT"] = iPORT;
    tcp.SendBuffer(hSocket, JSON.stringify(sPacket));

    uuid.G_SetSU(hSocket, iUUID);

    console.log(iPORT);
};




