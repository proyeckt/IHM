const { Board, Sensor } = require("johnny-five");
const board = new Board();

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);

console.log('Server started.');

var pot1=0;

board.on("ready", () => {
  const potentiometer = new Sensor("A3");

  var io = require('socket.io') (serv,{});

  io.sockets.on('connection',function(socket){
    console.log('socket connection');

    socket.on('happy',function(data){
      console.log('Happy because' + data.reason);
    });


    potentiometer.on("change", () => {
      const {value, raw} = potentiometer;
      console.log("Sensor: ");
      console.log("  value  : ", value);
      console.log("  raw    : ", raw);
      console.log("-----------------");

      pot1=value;
      
      socket.emit('serverMsg',{
        msg: pot1,
      });

    });
  });
  
});

