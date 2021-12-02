const { Board, Sensor, Button } = require("johnny-five");
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

  const button = new Button(2);

   //Inyectamos el botton a la board
  board.repl.inject({
    button: button
  });

  var io = require('socket.io') (serv,{});

  io.sockets.on('connection',function(socket){
    console.log('socket connection');

    socket.on('happy',function(data){
      console.log('Happy because' + data.reason);
    });

    //Evento al presionar el botton
    button.on("down", function() {
      console.log("down");
      socket.emit('jumpDown',{
        jump: false,
        t1:Date.now()
      });
    });

    //Evento al soltar el botton
  button.on("up", function() {
    console.log("up");
    socket.emit('jumpUp',{
        jump: true,
      });
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

