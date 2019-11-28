


require('dotenv').config()




const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const myPlaintextPassword2 = 'yrktjfyghykthfgpi';
const someOtherPlaintextPassword = 'not_bacon';


bcrypt.genSalt(saltRounds, function(err, salt) {
	console.log("mySalt --> " + salt);
	console.log("%%%%%%%%%%%%");
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
	    console.log("myHash --> " + hash);
	    console.log("%%%%%%%%%%%%");
	    bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
		    console.log(res);
	    });
    });
});


bcrypt.genSalt(saltRounds, function(err, salt) {
	console.log("mySalt --> " + salt);
	console.log("%%%%%%%%%%%%");
    bcrypt.hash(myPlaintextPassword2, salt, function(err, hash) {
	    console.log("myHash --> " + hash);
	    console.log("%%%%%%%%%%%%");
    });
});





var AWS = require("aws-sdk");
var cors = require('cors')
let awsConfig = {
    "region": "us-east-2",
    "endpoint": "http://dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": process.env.accessKeyIdDynamo, "secretAccessKey": process.env.secretAccessKeyIdDynamo
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let fetchEverything = function () {
    var params = {
        TableName: "whatsappDB",
    };
    docClient.scan(params, function (err, data) {
        if (err) {
		console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
		https.get("https://git.heroku.com/marcowabot.git");
        }
        else {
		echoAgent.setAgentState({availability: "ONLINE"});
		echoAgent.subscribeExConversations({
			'agentIds': [echoAgent.agentId],
			'convState': ['OPEN']
		}, (e, resp) => console.log('subscribed successfully', echoAgent.conf.id || ''));
		echoAgent.subscribeRoutingTasks({});
		setInterval(function(){
			echoAgent.getClock({}, (e, resp) => {
				if (e) { console.log(e) }
				console.log(resp)
			});
		}, 30000);
		
		// console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
		addToObject(data);
		
        }
    })
}





var myDatabase = [];


var events = require('events');
var emitter = new events.EventEmitter();
var https = require('https');
var express = require('express');
var bodyParser = require("body-parser");



var app = express();
app.listen(process.env.PORT);
app.set('port', (process.env.PORT || 5000));

// Required to allow access to the service across different domains
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://marcodagolini.github.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Content-Type', 'text/plain');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var whitelist = ['https://marcodagolini.github.io','https://vodit-report.fs.liveperson.com']
var corsOptions = {
  origin: function (origin, callback) {
	  console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS. This is from --> ' + origin))
    }
  }
}
 
// app.get('/add', cors(corsOptions), checkValuesGet);
app.get('/add', checkValuesGet)

app.post('/add1', checkValuesPost);
app.post('/add2', checkValuesPost);
app.post('/add3', checkValuesPost);
app.post('/add4', checkValuesPost);
app.post('/add5', checkValuesPost);


function checkValuesGet(req, res, next) {
	// console.log(req);
	var myNumber = req.query.phone;
	console.log("get request");
	console.log((req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress);
	var trafficLight = true;
	var myID = "";
	var myName = "";
	var myDBreplica = myDatabase;
	var myLength = myDBreplica.length;
	for (var i = 0; i < myLength; i ++){
		if (myDBreplica[i].phoneNumber === myNumber){
			if (myDBreplica[i].hasOwnProperty('name')){
				myName = myDBreplica[i].name;
			} else{
				myName = "unknown";
			}
			if (myDBreplica[i].hasOwnProperty('customerID')){
				myID = myDBreplica[i].customerID;
			} else{
				myID = "unknown";
			}
			var myAnswer = {"name": myName, "customerID": myID};
			res.send(myAnswer);
			i = myLength;
			trafficLight = false
			
		}
	}
	
	if (trafficLight) {
		res.send("error");
	}
	
	
}


function pushToAWS(c){
	// console.log("pushing");
	var AWS = require("aws-sdk");
	let awsConfig = {
		"region": "us-east-2",
		"endpoint": "http://dynamodb.us-east-2.amazonaws.com",
		"accessKeyId": process.env.accessKeyIdDynamo, "secretAccessKey": process.env.secretAccessKeyIdDynamo
	};
	AWS.config.update(awsConfig);
	let docClient = new AWS.DynamoDB.DocumentClient();
	let save = function () {
		var input = {
			"phoneNumber": c.numero, "name": c.nome, "customerID": c.idCliente
		};
		var params = {
			TableName: "whatsappDB",
			Item:  input
		};
		docClient.put(params, function (err, data) {
			if (err) {
				console.log("users::save::error - " + JSON.stringify(err, null, 2));
			} else{
				// console.log("users::save::success" );
				// console.log("Here my DB --> " + JSON.stringify(myDatabase));
			}
		});
	}
	
	save();


}



function deleteAllAWS(phoneNumbers,tipeOfRequest){
	
	phoneNumbers.forEach(c => {
		// console.log("*****" + c.numero);
		var AWS = require("aws-sdk");
		let awsConfig = {
			"region": "us-east-2",
			"endpoint": "http://dynamodb.us-east-2.amazonaws.com",
			"accessKeyId": process.env.accessKeyIdDynamo, "secretAccessKey": process.env.secretAccessKeyIdDynamo
		};
		let docClient = new AWS.DynamoDB.DocumentClient();
		let deleteElement = function () {
			var params = {
				TableName: "whatsappDB",
				Key: {
					"phoneNumber": c.numero
				}
			};
			// console.log(params);
			docClient.delete(params, function (err, data) {
				if (err) {
					console.log("users::delete::error - " + JSON.stringify(err, null, 2));
				} else {
					// console.log("users::delete::success");
					
					var myLength = myDatabase.length;
					for (var index = 0; index < myLength; index ++){
						if(myDatabase[index].phoneNumber === c.numero){
							myDatabase.splice(index, 1);
							index = myLength;
						}
					}
					if(tipeOfRequest !== "blackList"){
						pushToAWS(c);
						var partialItem = {"phoneNumber": c.numero, "name": c.nome, "customerID": c.idCliente};
						myDatabase.push(partialItem);
						
					}
								
					// console.log("Here my DB --> " + JSON.stringify(myDatabase));
		
					
				}
			});

			
		}
		
		deleteElement();

		
	});
	
}


function checkValuesPost(req, res, next) {
	
	var tipeOfRequest = req.query.tipeOfRequest;
	var myPayload = req.body;
	
	console.log(req.originalUrl);
	console.log("post request --> " + JSON.stringify(myPayload));
	console.log((req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress);
	
	res.send("ok");
	
	// console.log(" my tipeOfRequest --> " + tipeOfRequest);
	// console.log(" my myPayload --> " + JSON.stringify(myPayload));
	
	/******
	
	checkAuthentication(myPayload.bearer, function (status) {
		if (status) {
			console.log("you're in");
			deleteAllAWS(myPayload.phoneNumbers,tipeOfRequest);
			var myAnswer = JSON.stringify({"status":"okPost","tipeOfRequest":tipeOfRequest});
			res.send(myAnswer);
		} else {
			console.log("you're out!!!!");
			var myAnswer = JSON.stringify({"status":"koPost","tipeOfRequest":tipeOfRequest});
			res.send(myAnswer);
		}
	});
	
	
	******/


	
	
	
}



function checkAuthentication(token, callback) {
	
	var request = require('request');
	var oauth = "Bearer " + token;
	var body = {"status":["ONLINE"]};
	var url = 'https://lo.msghist.liveperson.net/messaging_history/api/account/27419514/agent-view/status';
	request.post({
    		url: url,
    		body: body,
    		json: true,
    		headers: {
        		'Content-Type': 'application/json',
			'Authorization': oauth
    		}
	}, function (e, r, b) {
		if(b.hasOwnProperty('_metadata')){
			callback (true);
		} else{
			callback(false);
		}

	});
	

}


function manageMyResponse(imei, dialogID){
	// console.log("imei --> " + imei);
	// console.log("dialogID --> " + dialogID);
	var myMessage = "";
	var myMirroredDB = myDatabase;
	var myIndex = -1;
	var myName = "";
	var myLength = myMirroredDB.length;
	for (var i = 0; i < myLength; i ++){
		if (myMirroredDB[i].phoneNumber === imei){
			var myName = myMirroredDB[i].name;
			myIndex = i
			i = myLength;
		}
	}
	
	if (myName !== ""){
		myMessage = "Buongiorno " + myName + "! A breve riceverai risposta da un nostro Agente!";
	} else{
		myMessage = "Buongiorno! A breve riceverai risposta da un nostro Agente!";
	}
	
	if (myIndex === -1){
		echoAgent.publishEvent({
			"dialogId": dialogID,
			"event": {
				"type": "ChatStateEvent",
				"chatState": "COMPOSING"
			}
		});
		setTimeout(()=>{
			echoAgent.publishEvent({
				dialogId: dialogID,
				event: {
					type: 'ContentEvent',
					contentType: 'text/plain',
					message: "Questo servizio non e' disponibile"
				}
			}, (e, resp) => {
   					if (e) { 
						console.error(e);
						console.error("error_sending_message");
    					} else{
						echoAgent.updateConversationField({
							conversationId: dialogID,
							conversationField: [{
								field: "ConversationStateField",
								conversationState: "CLOSE"
							}]
						});
					}
			});


			
		}, 3000);
	} else{
		console.log(myMessage);
		echoAgent.publishEvent({
			"dialogId": dialogID,
			"event": {
				"type": "ChatStateEvent",
				"chatState": "COMPOSING"
			}
		});
		setTimeout(()=>{
			console.log(myMessage);
			echoAgent.publishEvent({
				dialogId: dialogID,
				event: {
					type: 'ContentEvent',
					contentType: 'text/plain',
					message: myMessage
				}
			}, (e, resp) => {
   					if (e) { 
						console.error(e);
						console.error("error_sending_message");
    					} else{
						echoAgent.updateConversationField({
							conversationId: dialogID,
							conversationField: [{
								field: "ParticipantsChange",
								type: "REMOVE",
								role: "ASSIGNED_AGENT"
							},{
								field: "Skill",
								type: "UPDATE",
								skill: "1351654950"
							}]
						});
					}
			});
			
			
		}, 3000);
	}
	
						
	
}



function addToObject(data){
	var myResponse = [];
	data.Items.forEach(c => {
		var phone = "";
		var name = "";
		var customerID = "";
		if(c.hasOwnProperty('phoneNumber')){
			phone = c.phoneNumber;
		} else{
			phone = "";
		}
		if(c.hasOwnProperty('name')){
			name = c.name;
		} else{
			name = "";
		}
		if(c.hasOwnProperty('customerID')){
			customerID = c.customerID;
		} else{
			customerID = "";
		}
		var partialItem = {"phoneNumber": phone, "name": name, "customerID": customerID};
		myDatabase.push(partialItem);
	});
	// console.log("Here my DB --> " + JSON.stringify(myDatabase));
	
}




const Agent = require('node-agent-sdk').Agent;
var echoAgent = new Agent({
	accountId: '27419514',
	username: 'wa3333bot',
	appKey: process.env.appKey,
	secret: process.env.secret,
	accessToken: process.env.accessToken,
	accessTokenSecret: process.env.secretToken
});


echoAgent.on('connected', body =>{

	console.log("*****connected")
	console.log(JSON.stringify(body));
	
	fetchEverything();
	



});



echoAgent.on('routing.RoutingTaskNotification', body =>{

	if(!(body.changes.length < 1 || body.changes == undefined)){

		body.changes.forEach(c => {
			if (c.type === "UPSERT") {
				// console.log("upsert");
	
				c.result.ringsDetails.forEach(r => {
					if (r.ringState === 'WAITING') {


						echoAgent.updateRingState({
							"ringId": r.ringId,
							"ringState": "ACCEPTED"
						}, function(err) {
							if(err){
								console.log(err);
							} else{
								
								echoAgent.getUserProfile(c.result.consumerId, (e, profileResp) => {
									// console.log(JSON.stringify(profileResp));
									if (typeof profileResp !== 'undefined' && profileResp.length > 0) {
										var myLength = profileResp.length;
										for(var i = 0; i < myLength; i ++){
											if (profileResp[i].hasOwnProperty('type')){
												if (profileResp[i].type === "ctmrinfo"){
													if (profileResp[i].hasOwnProperty('info')){
														if (profileResp[i].info.hasOwnProperty('imei')){
															manageMyResponse(profileResp[i].info.imei, c.result.dialogId);
															i = myLength;
														}
													}
												}
											}
										}
									}
								});
								
							
							}
									 
						});


					}

				});
			}
		});

	}





});




echoAgent.on('ms.MessagingEventNotification', body =>{

	if(!(body.changes.length < 1 || body.changes == undefined)){
		body.changes.forEach(c => {
			if(c.hasOwnProperty('event')){
				if(c.event.hasOwnProperty('type')){
					if(c.event.type === "ContentEvent"){
							echoAgent.publishEvent({
							dialogId: body.dialogId,
							event: {type: "AcceptStatusEvent", status: "READ", sequenceList: c.sequence}
						});
					}
				}

			}

		});

	}

});




echoAgent.on('cqm.ExConversationChangeNotification', body =>{


	if(!(body.changes.length < 1 || body.changes == undefined)){
		body.changes.forEach(c => {

			if (c.type === "UPSERT") {
				
				var myLength = c.result.conversationDetails.participants.length;
				for (var i = 0; i < myLength; i++){
					if(c.result.conversationDetails.participants[i].role === "CONSUMER"){
						var myCustomer = c.result.conversationDetails.participants[i].id;
					}
				}
				echoAgent.getUserProfile(myCustomer, (e, profileResp) => {
					// console.log(JSON.stringify(profileResp));
					// console.log(e);
				});

			}
		});

	}




});



echoAgent.on('notification', body =>{

	// triggered by all the notification events.

});



echoAgent.on('error', body =>{

	console.log("");
	console.log("");
	console.log("");
	console.log("*****error")
	console.log(JSON.stringify(body));

});



echoAgent.on('closed', body => {
	console.log('socket closed', body);
	echoAgent.reconnect();
});




setInterval(function() {
    https.get("https://git.heroku.com/marcowabot.git");
}, 300000); // every 5 minutes (300000) every 10 minutes (600000)












