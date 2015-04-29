var express = require("express"),
	app = express(),
	http = require("http"),
	server = http.createServer(app),
	socketIO = require("socket.io"),
	io = socketIO(server);

	app.use(express.static(__dirname + "/html"));

server.listen(3000);

app.get("/*", function (req, res){
	res.redirect('/');
});

console.log("listening 3000")