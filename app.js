
var Entities = require('html-entities').AllHtmlEntities;
var spawn = require('child_process').spawn;
var Cleverbot = require('cleverbot-node');
var entities = new Entities();

var friends = {};
var botReady = false;
var args = ['-u'];
  args.push('yowsup/yowsup-cli')
  args.push('demos')
  args.push('-c','config');
  args.push('-y');
var MSJ_IN = /^\[(\d+)@.*(\(.*\)).*\](.*)/;
var child = spawn('python', args, {cwd: __dirname});
child.stdin.setEncoding('utf8');

var fs = require('fs');
var firstConfig = false;
var configure,pathPhoto,wpStatus;
fs.readFile('config', 'utf8', function(err, contents) {
	configure = contents.split("\n");
	pathPhoto	= configure[3].split("=")[1].trim();
	wpStatus 	= configure[4].split("=")[1].trim();
	console.log(pathPhoto,wpStatus)    
	firstConfig = true;
});


child.stdout.on('data', function (data) {
  var outConsole = data.toString().trim();

  // if it's disconnected
  if(outConsole=='[offline]:'){
    child.stdin.write('/L\n'); //Connect
  }

  //notification login succes
  if(outConsole=='Auth: Logged in!'){
    console.log('[+]Connected')
    if(firstConfig)
    {
		firstConfig=false;
		if(pathPhoto.length>1){
			console.log('/profile setPicture "'+pathPhoto+'"\n');
			child.stdin.write('/profile setPicture "'+pathPhoto+'"\n'); //set photo profile
		}
		if(wpStatus.length>1){
			console.log('/profile setStatus "'+wpStatus+'"\n');
			child.stdin.write('/profile setStatus "'+wpStatus+'"\n'); //set status profile
		}
	}
  }

  // Message in
  var msj = outConsole.match(MSJ_IN);
  //[2] time, [1] number, [3] message
  if(msj && botReady){
	  var fecha = msj[2].replace(' ','-').replace('(','').replace(')','').replace(':','-').split('-');
	  var update = new Date(fecha[2],parseInt(fecha[1])-1,fecha[0],fecha[3],fecha[4]);
	  if(msj[1] in friends){
		  //the number is old
		  //more 12 Hours offline
		  /*if((update - friends[msj[1]].date)/(60000*60) >= 12){
			  console.log("se crea una nueva instancia")
				friends[msj[1]].bot = new Cleverbot;			  	
		  }*/
		  friends[msj[1]].date = update;
	  }else{
		  //register new friend
		  friends[msj[1]]={};
		  friends[msj[1]].date = update;
		  friends[msj[1]].bot = new Cleverbot;
		 
	  }
    if(msj[3].trim().length!=0){
			console.log('[>]'+msj[1]+": "+msj[3].trim());
			friends[msj[1]].bot.write(msj[3].trim(), function (response) {
			console.log('[<]'+msj[1]+': "'+entities.decode(response.message)+'"\n')
			child.stdin.write('/message send '+msj[1]+' "'+entities.decode(response.message)+'"\n');
		});
	}
  }
   
});
Cleverbot.prepare(function(){
	botReady = true;
	console.log("clever STATUS: "+botReady);
 });
