const http = require("http");
const https = require("https");
const express = require("express");
const path = require("path");
const sql = require('mssql');
const bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get("/", (req, res) => {
	console.log(res.statusCode);
	app.use('/static', express.static('html'));
	res.sendFile("index.html", {root: path.join("app/")});
});

app.get("/app/navigation-tabs/navigation-tabs-template.html", (req, res) => {
	app.use('/static', express.static('html'));
	res.sendFile("navigation-tabs-template.html", {root: path.join("./app/navigation-tabs/")});
});

app.get("/app/calendar/calendar-template.html", (req, res) => {
	app.use('/static', express.static('html'));
	res.sendFile("calendar-template.html", {root: path.join("./app/calendar/")});
});

app.get("/app/appointments/appointments-template.html", (req, res) => {
	app.use('/static', express.static('html'));
	res.sendFile("appointments-template.html", {root: path.join("./app/appointments/")});
});

app.get("/app/polls/polls-template.html", (req, res) => {
	app.use('/static', express.static('html'));
	res.sendFile("polls-template.html", {root: path.join("./app/polls/")});
});

app.get("/app/login/login-template.html", (req, res) => {
	app.use('/static', express.static('html'));
	res.sendFile("login-template.html", {root: path.join("./app/login/")});
});

app.get("/app/app.module.js", (req, res) => {
	var filename = 'app.module.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/")});
});

app.get("/app/app.config.js", (req, res) => {
	var filename = 'app.config.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/")});
});

app.get("/app/login/login-service.js", (req, res) => {
	var filename = 'login-service.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/login/")});
});

app.get("/app/login/login-module.js", (req, res) => {
	var filename = 'login-module.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/login/")});
});

app.get("/app/login/login-controller.js", (req, res) => {
	var filename = 'login-controller.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/login/")});
});

app.get("/app/login/login-directive.js", (req, res) => {
	var filename = 'login-directive.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/login/")});
});

app.get("/app/navigation-tabs/navigation-tabs-service.js", (req, res) => {
	var filename = 'navigation-tabs-service.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/navigation-tabs/")});
});

app.get("/app/navigation-tabs/navigation-tabs-directive.js", (req, res) => {
	var filename = 'navigation-tabs-directive.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/navigation-tabs/")});
});

app.get("/app/navigation-tabs/navigation-tabs-module.js", (req, res) => {
	var filename = 'navigation-tabs-module.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/navigation-tabs/")});
});

app.get("/app/navigation-tabs/navigation-tabs-controller.js", (req, res) => {
	var filename = 'navigation-tabs-controller.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/navigation-tabs/")});
});

app.get("/app/calendar/calendar-directive.js", (req, res) => {
	var filename = 'calendar-directive.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/calendar/")});
});
app.get("/app/calendar/modal-directive.js", (req, res) => {
	var filename = 'modal-directive.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/calendar/")});
});

app.get("/app/calendar/calendar-module.js", (req, res) => {
	var filename = 'calendar-module.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/calendar/")});
});

app.get("/app/calendar/calendar-controller.js", (req, res) => {
	var filename = 'calendar-controller.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/calendar/")});
});

app.get("/app/calendar/calendar-service.js", (req, res) => {
	var filename = 'calendar-service.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/calendar/")});
});

app.get("/app/appointments/appointments-directive.js", (req, res) => {
	var filename = 'appointments-directive.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/appointments/")});
});

app.get("/app/appointments/appointments-module.js", (req, res) => {
	var filename = 'appointments-module.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/appointments/")});
});

app.get("/app/appointments/appointments-controller.js", (req, res) => {
	var filename = 'appointments-controller.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/appointments/")});
});

app.get("/app/appointments/appointments-service.js", (req, res) => {
	var filename = 'appointments-service.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/appointments/")});
});

app.get("/app/polls/polls-directive.js", (req, res) => {
	var filename = 'polls-directive.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/polls/")});
});

app.get("/app/polls/polls-module.js", (req, res) => {
	var filename = 'polls-module.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/polls/")});
});

app.get("/app/polls/polls-controller.js", (req, res) => {
	var filename = 'polls-controller.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/polls/")});
});

app.get("/app/polls/polls-service.js", (req, res) => {
	var filename = 'polls-service.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./app/polls/")});
});

app.get("/app/app.css", (req, res) => {
	res.sendFile("app.css", {root: path.join("./app/")});
});

app.get("/app/all.css", (req, res) => {
	res.sendFile("all.css", {root: path.join("./app/")});
});

app.get("/node_modules/angular-route.js", (req, res) => {
	var filename = 'angular-route.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/angular-route/")});
});

app.get("/node_modules/jquery.js", (req, res) => {
	var filename = 'jquery.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/jquery/dist")});
});

app.get("/node_modules/moment.js", (req, res) => {
	var filename = 'moment.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/moment")});
});

app.get("/node_modules/angular.js", (req, res) => {
	var filename = 'angular.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/angular")});
});

app.get("/node_modules/calendar.js", (req, res) => {
	var filename = 'calendar.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/angular-ui-calendar/src")});
});

app.get("/node_modules/fullcalendar.js", (req, res) => {
	var filename = 'fullcalendar.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/fullcalendar/dist")});
});

app.get("/node_modules/gcal.js", (req, res) => {
	var filename = 'gcal.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/fullcalendar/dist")});
});

app.get("/node_modules/core/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/core")});
});

app.get("/node_modules/daygrid/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/daygrid")});
});

app.get("/node_modules/interaction/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/interaction")});
});

app.get("/node_modules/moment/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/moment")});
});

app.get("/node_modules/list/main.js", (req, res) => {
	var filename = 'main.js';
	res.contentType(filename);
	res.sendFile(filename, {root: path.join("./node_modules/@fullcalendar/list")});
});

app.get("/node_modules/fullcalendar.css", (req, res) => {
	res.sendFile("fullcalendar.css", {root: path.join("./node_modules/fullcalendar/dist")});
});

app.get("/node_modules/core/main.css", (req, res) => {
	res.sendFile("main.css", {root: path.join("./node_modules/@fullcalendar/core")});
});

app.get("/node_modules/daygrid/main.css", (req, res) => {
	res.sendFile("main.css", {root: path.join("./node_modules/@fullcalendar/daygrid")});
});

app.get("/node_modules/list/main.css", (req, res) => {
	res.sendFile("main.css", {root: path.join("./node_modules/@fullcalendar/list")});
});

app.get("/webfonts/fa-solid-900.woff2", (req, res) => {
	res.sendFile("fa-solid-900.woff2", {root: path.join("./webfonts")});
});

app.get("/webfonts/fa-solid-900.woff", (req, res) => {
	res.sendFile("fa-solid-900.woff", {root: path.join("./webfonts")});
});

app.get("/webfonts/fa-solid-900.ttf", (req, res) => {
	res.sendFile("fa-solid-900.ttf", {root: path.join("./webfonts")});
});

app.post("/load_events", (request, response) => {
	accessDatabase("SELECT * FROM dbo.kp_events WHERE userFk=" + request.body.userId)
		.then( function(res) {
			if (res.recordset.length > 0) {
				response.send(res.recordset);
			} else {
				response.send([]);
			}
		}).catch( function(err) {
		throw err;
	});


});

app.post("/save_events", (request, response) => {
	if (request) {
		var eventList = request.body.new_events;
		var deleteList = request.body.deleted_events;
	}

	if (eventList) {
		eventList.forEach(function (event, index) {
			accessDatabase("INSERT INTO dbo.kp_events (title, startdate, enddate, color, textcolor, userfk) VALUES( '" + event.title + "', '" + event.start + "', '" + event.end + "', '" + event.color + "', '" + event.textColor + "', " + event.userFk + ")")
				.then(function (res) {
					response.send({successful: true});
				}).catch( function(err) {
				throw err;
			});
		});
	}

	if (deleteList) {
		deleteList.forEach(function (event, index) {
			accessDatabase("DELETE FROM dbo.kp_events WHERE id=" + event.id)
				.then(function(res) {
					response.send({successful: true});
				}).catch( function(err) {
				throw err;
			});
		});
	}
});

app.post("/log_in", (request, response) => {
	var userInputUname = request.body.userName;
	var userInputPsw = request.body.password;

	accessDatabase("SELECT id, username, password FROM dbo.kp_profile WHERE username='" + userInputUname + "' AND password='" + userInputPsw + "'")
		.then( function(res) {
			var isRegistered = false;

			if (res.recordset.length > 0) {
				isRegistered = true;
			}

			response.send({isRegistered: isRegistered, userId:res.recordset[0].id});
		}).catch( function(err) {
		throw err;
	});
});

var dbconfig = {
	server: "kalenderprojekt.database.windows.net",
	user: "Kalenderuser",
	password: "Kalender2020#",
	database: "Kalenderprojekt",
	port: 1433,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000
	},
	options: {
		encrypt: true,
		enableArithAbort: true
	}
};

const pool = new sql.ConnectionPool(dbconfig);
const poolConnect = pool.connect();

async function accessDatabase(sqlStatement) {
	await poolConnect; //ensures that the pool has been created
	try {
		const request = pool.request();
		const result = request.query(sqlStatement);
		return result;
	} catch (err) {
		console.error('SQL error', err);
	}
}



const server = http.createServer(app);


server.listen(8000, () => {
	console.log("Server is listening on port 8000");
});