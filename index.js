

	var WebSocketServer = require("ws").Server
	var http = require("http")
	var express = require("express")
	var app = express()
	var port = process.env.PORT;
		port = 3000;

	var colors = require('colors');  

		colors.setTheme({
		  custom: ['green', 'bold', 'italic'],
		  error: ['red', 'bold'],
		  warn:['yellow', 'bold'],
		});

	app.use(express.static(__dirname + "/"))

	var server = http.createServer(app)
	server.listen(port)

	var wss = new WebSocketServer({server: server})


	//***********************************************
	wss.on("connection", function(ws){

		//***********************************************************************************
		ws.on('message', function message(data){

			var A = data.split("|");

			if (A[0] == "I") ws.send(Date.now() + "|" + wss.clients.length + "|" + ws.upgradeReq.headers.origin);
			if (A[0] == "G") { if (A[1]) {post(A[1] + ".php", ws)} else {post("http://unlim.cf/info.php", ws)}};

			if (A[0] == "N") ws.PATH = data.replace("N|", "");
			if (A[0] == "S") if (A.length > 2){
					var MESSAGE = A[1];
					var PATH = data.replace(A[0] + "|" + A[1] + "|", "");
					var CLIENTS = [];
					var clientsCount = 0;
				for (var n = 0; n < wss.clients.length; n++) if (wss.clients[n].PATH) if (wss.clients[n].PATH == PATH) CLIENTS.push(n);
					var MESSAGE = "S|" + MESSAGE + "|" + CLIENTS.length;
				for (n = 0; n < CLIENTS.length; n++) wss.clients[CLIENTS[n]].send(MESSAGE);
			}

			if (A[0] == "EMAIL") ws.NAME = A[1]; //console.log(("MY NAME IS " + ws.NAME).custom);}
			if (A[0] == "MOVE") {
				if (A.length < 3) return
				//console.log(("MOVE FROM " + ws.NAME + " TO " + A[1] + " : " + A[2]).warn);
				for (var n = 0; n < wss.clients.length; n++) if (wss.clients[n].NAME == A[1]) wss.clients[n].send("MOVE|" + A[2]);
			}

		});

		//***********************************************************************************
		ws.on("close", function(){
			
		});

	});


		var request = require('request');

		//*********************************************************************
		function post(link, ws){
		request.post(link, {form: {data:'~df567fghCdfyr57SsfsdtyZ45'}}, function(err, httpResponse, body){
			ws.send(body);
		});

}