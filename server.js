// webserver for demogame

var express = require("express");
var app = express();
var webserver = require("http").Server(app);
var ip = require("ip");
var port = 2000;

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.use(express.static(__dirname));

webserver.listen(port,function(){
    console.log("Server start running on: { " + ip.address() + ":" + port + " }");
})