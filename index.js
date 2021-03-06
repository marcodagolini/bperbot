

const Agent = require('node-agent-sdk').Agent;
var https = require('https');
var express = require('express');




var app = express();
app.listen(process.env.PORT);
app.set('port', (process.env.PORT || 5000));





var openConvs = {};




var echoAgent = new Agent({
	accountId: '37544564',
	username: 'WaClosure4',
	appKey: process.env.appKey,
	secret: process.env.secret,
	accessToken: process.env.accessToken,
	accessTokenSecret: process.env.secretToken
});







echoAgent.on('connected', body =>{

	console.log("");
	console.log("");
	console.log("");
	console.log("*****connected")
	console.log(JSON.stringify(body));
	echoAgent.setAgentState({availability: "ONLINE"});
	echoAgent.subscribeExConversations({
		'agentIds': [echoAgent.agentId],
		'convState': ['OPEN']
	}, (e, resp) => console.log('subscribed successfully', echoAgent.conf.id || ''));
	echoAgent.subscribeRoutingTasks({});





});






echoAgent.on('routing.RoutingTaskNotification', body =>{






	if(!(body.changes.length < 1 || body.changes == undefined)){

		console.log("inside1");

		body.changes.forEach(c => {
			console.log("inside2");
			if (c.type === "UPSERT") {
				console.log("upsert");

				if(!openConvs[c.result.conversationId]){
					openConvs[c.result.conversationId] = {"consumerID":c.result.consumerId};
					echoAgent.getUserProfile(openConvs[c.result.conversationId].consumerID, (e, profileResp) => {
						console.log(JSON.stringify(profileResp));
					});
				}
				console.log(openConvs);
				
				c.result.ringsDetails.forEach(r => {
					if (r.ringState === 'WAITING') {


						echoAgent.updateRingState({
							"ringId": r.ringId,
							"ringState": "ACCEPTED"
						}, (e, resp) => console.log(resp));

						console.log("");
						console.log("*******");

                        			echoAgent.publishEvent({
                            				"dialogId": c.result.dialogId,
                            				"event": {
                                				"type": "ChatStateEvent",
                                				"chatState": "COMPOSING"
                            				}
                        			});

						setTimeout(()=>{
							console.log("message");
                        				echoAgent.publishEvent({
                            					dialogId: c.result.dialogId,
                            					event: {
                                					type: 'ContentEvent',
                                					contentType: 'text/plain',
									message: "Ciao, ci scusiamo ma in questo momento non riusciamo a rispondere al tuo messaggio. Ti invitiamo a contattarci al numero verde 800227788 (dall'estero +390592919622) oppure via Chat avviando una sessione dal sito bper.it, nella sezione 'Parla con noi' o dal tuo internet banking Smart Web. Ti ringraziamo per la comprensione!"
                            					}
                        				});
                        				echoAgent.publishEvent({
                            					"dialogId": c.result.dialogId,
                            					"event": {
                                					"type": "ChatStateEvent",
                                					"chatState": "ACTIVE"
                            					}
                        				});

						}, 1000);




						setTimeout(()=>{
							console.log("closure");
                        				echoAgent.updateConversationField({
                            					conversationId: c.result.dialogId,
                            					conversationField: [{
									field: "ConversationStateField",
									conversationState: "CLOSE"
								}]
                        				});

						}, 3000);

					}

				});
			}
			if (c.type === "DELETE") {
				console.log("delete");
				delete openConvs[c.result.convId];
				console.log(openConvs);
			}
		});

	}





});




echoAgent.on('ms.MessagingEventNotification', body =>{







});




echoAgent.on('cqm.ExConversationChangeNotification', body =>{




	if(!(body.changes.length < 1 || body.changes == undefined)){

		console.log("inside1");

		body.changes.forEach(c => {
			console.log("inside2");

			if (c.type === "UPSERT") {
				console.log("upsert");


				
				var myLength = c.result.conversationDetails.participants.length;
				for (var i = 0; i < myLength; i++){
					if(c.result.conversationDetails.participants[i].role === "CONSUMER"){
						var myCustomer = c.result.conversationDetails.participants[i].id;
					}
				}

				if(!openConvs[c.result.convId]){
					openConvs[c.result.convId] = {"consumerID":myCustomer};
					echoAgent.getUserProfile(openConvs[c.result.convId].consumerID, (e, profileResp) => {
						console.log(JSON.stringify(profileResp));
					});
				}
				console.log(openConvs);
				
			}
			if (c.type === "DELETE") {
				console.log("delete");
				delete openConvs[c.result.convId];
				console.log(openConvs);
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




echoAgent.on('closed', body =>{

	console.log("");
	console.log("");
	console.log("");
	console.log("*****closed")
	console.log(JSON.stringify(body));


});


setInterval(()=>{
	console.log("***ping***");
	echoAgent.getClock({}, (e, resp) => {
		if (e) {
			console.error(e);
			echoAgent.reconnect();
		} else{
			console.log(resp)
		}
		
	});

}, 10000);



setInterval(()=>{
	console.log("***awake***");
	// https.get("https://git.heroku.com/bperclosurebot.git");
	https.get("https://bperclosurebot.herokuapp.com/");
}, 30000); // every 5 minutes (300000) every 10 minutes (600000)







