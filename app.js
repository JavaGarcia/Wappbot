
var Entities = require('html-entities').AllHtmlEntities;
var spawn = require('child_process').spawn;

var entities = new Entities();
var Cleverbot = require('./cleverbot');
var CBot = new Cleverbot;


var args = ['-u'];
  args.push('yowsup-cli')
  args.push('demos')
  args.push('-c','config');
  args.push('-y');

var MSJ_IN = /^\[(\d+)@.*(\(.*\)).*\](.*)/;

var child = spawn('python', args, {cwd: __dirname});

child.stdin.setEncoding('utf8');
child.stdout.on('data', function (data) {
  var outConsole = data.toString().trim();

  // if it's disconnected
  if(outConsole=='[offline]:'){
    child.stdin.write('/L\n'); //Connect
  }

  //notification login succes
  if(outConsole=='Auth: Logged in!'){
    console.log('[+]Connected')
  }

  // Message in
  var msj = outConsole.match(MSJ_IN);
  if(msj){
    //[2] time, [1] number, [3] message
    console.log('[>]'+msj[1]+": "+msj[3].trim());
    //send message to cleverBot
    CBot.write(msj[3].trim(),function(res){
      //send answer to number
      console.log('[<]'+msj[1]+': "'+entities.decode(res.message)+'"\n')
      child.stdin.write('/message send '+msj[1]+' "'+entities.decode(res.message)+'"\n');
    });
  }
});
