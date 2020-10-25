//init vars

//login
const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "";
bot.login(token);

bot.on("ready", () => {
	console.log("This bot is online!");
});

// commands
bot.on("message", msg=> {
	if(msg.content === "-testbot") {
		msg.reply("Jared Bot is online!")
	}
})

bot.on("message", msg => {
	if (msg.content === "-help") {
		msg.reply(`Jared Bot:
		
Tools:
-remind me {reminder} {No. min/sec} - sets a reminder
-timer {HH:MM:SS}	- sets a timer
-stopwatch {start/stop} - sets a stopwatch
-execute        - executes Python code

Info:
-invitelink			- shows invite link
-author				- shows author
-membercount		- shows No. people on server
-testbot        - checks that the bot is online

Chat Commands:
-default dance		- does the default dance
-say {type something}    - repeats whatever you say
-do you {question}	- asks a question
-is {question}		- asks a question
-will {question}	- asks a question
-howgay 		- tests how gay they are
-imbored		- gives you something to do
-random name		- generates random name
-bot				- allows you to talk to chatbot

Image commands:
-random animal		- shows photo of a random animal
-hentai            - nsfw command
-meme				- posts a meme
-catmeme			- posts a cat meme

Games:
-rock/-paper/-scissors -play a game of Rock, Paper, Scissors
-higherlower		- guess the number
-ttt				- TicTacToe

Admin/mod Commands:
-announce 			- admin command, sends announcement
-mute @user 		- mutes a user
-unmute @user 		- unmutes a user
-stop				- disables auto response (use this if the bot is spamming)
-autoresponse		- enables auto response`)
	}
})

bot.on("message", msg=> {
	if (msg.content.slice(0,4).toLowerCase() === "-say") {
		msg.reply(msg.content.slice(4, msg.content.length));
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,8).toLowerCase() === "-do you " || msg.content.slice(0,6) === "-do u ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,4).toLowerCase() == "-is ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,8).toLowerCase() === "-howgay " || msg.content === "-howgay") {
		if (msg.content === "-howgay") {
			msg.reply("You are " + String(parseInt(Math.random()*100)) + "% gay!")
		} else {
			name = msg.content.replace(" is "," ").split(" ")[1];
			msg.reply(name + " is " + String(parseInt(Math.random()*100)) + "% gay!")
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,6).toLowerCase() === "-will ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

// post henati
var hentai_channel_ID = "756291926277357600"

bot.on("message", msg => {
	if (msg.content.toLowerCase() === "-hentai") {
		if (msg.channel.id == hentai_channel_ID) {
			// write command to file
			const fs_commands = require('fs');
			fs_commands.writeFile('commands.txt', "get-henati", function(err) {
				if (err) {
					return console.log(err);
				}
			console.log("wrote command -get-henati to file!")
			});
	
			// read file after 1 second
			setTimeout(function(){
				// read output file
				fs_output = require('fs');
				fs_output.readFile("output.txt", "utf8", function(err,data) {
					if (err) {
						return console.log(err);
					}
				
					//send message
					bot.channels.cache.get(hentai_channel_ID).send(data);
				});
			},1000, msg);
		} else {
			msg.reply("This command can only be used in NSFW channels!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,8) === "-execute") {
		var input_code = msg.content.slice(9,msg.length);
		
		// write code to file
		const fs_execute_code = require('fs');
		fs_execute_code.writeFile('execute.py', input_code, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("wrote python code to file successfully!");
		});
		
		// read code output
		setTimeout(function(){
			fs_execute_input = require('fs');
			fs_execute_input.readFile("execute_output.txt", "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				// send message
				msg.reply(data);
			});
		}, 15*1000, msg);
		
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() === "-imbored") {
		bored_dataset = require('fs');
		bored_dataset.readFile("datasets/imbored.txt", "utf-8", function(err, data) {
			if (err) {
				return console.log(err);
			}
			
			//send message
			current_list = String(data).split("\n");
			current = current_list[parseInt(Math.random() * 1000) % current_list.length];
			msg.reply(current)
		});
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() === "-random name") {
		first_name_dataset = require('fs')
		first_name_dataset.readFile("datasets/firstname.txt", "utf-8", function(err, data) {
			if (err) {
				return console.log(err);
			}
			
			//get first name
			first_names_list = String(data).split("\n");
			firstname = first_names_list[parseInt(Math.random() * 1000) % first_names_list.length];
			
			//surname
			surname_dataset = require('fs')
			surname_dataset.readFile("datasets/surname.txt", "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				// get surname
				surname_list = String(data).split("\n");
				var surname = surname_list[parseInt(Math.random() * 1000) % surname_list.length];
				
				// send message
				fname = firstname.replace(/\W/g, '')
				sname = surname.replace(/\W/g, '')
				sname = sname[0] + sname.slice(1,sname.length).toLowerCase();
				msg.reply("Your random name is: " + fname + " " + sname);
			});
		});
	}
})

// anouncment
var user_ID = "364787379518701569"
var channel_IDs = ["751827086137622658", "762103168061538315"]

bot.on("message", msg => {
	if (msg.channel.type == 'dm') {
		if (msg.author.id === user_ID) {
			if (msg.content.toLowerCase().slice(0,10) === "-announce ") {
				console.log("Message from Jared recived!");
				var TheMessage = msg.content.slice(10, msg.content.length);
			
				// send to multiple servers (announcements channel)!
				for (i=0;i<channel_IDs.length;i++) {
					bot.channels.cache.get(channel_IDs[i]).send(TheMessage);
				}
			}
		}
	}
})


bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0, 14) == "-default dance") {
		if (msg.author.id === user_ID) {
			
			// message reply
			for (i=1;i<11;i++) {
				deafult_dance = require('fs')
				deafult_dance.readFile("datasets/deafult_dance/"+i+".txt", "utf-8", function(err, data) {
					if (err) {
						return console.log(err);
					}
					msg.reply(data);
				})
			}
		}
	}
})

// wait 1 second then get output again
function get_output(msg, channel_id) {
	setTimeout(function() {
		try {
			fs_execute_input2 = require('fs');
			fs_execute_input2.readFile("chat_bot_output.txt", "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				if (data == "") {
					get_output(msg, channel_id);
				} else {
					console.log("Channel ID: ",channel_id);
					msg.reply(data);
					console.log("message send to user!")
				}
			})
		} catch (err) {
			msg.reply("...");
		}
	}, 1000, msg, channel_id);
}

// clever bot
bot.on("message", msg => {
	if (msg.content.slice(0,4) === "-bot") {
		var input_code = msg.content.slice(5,msg.length);
		
		if (input_code == "restart") {
			// write code to file
			fs_restart = require('fs');
			fs_restart.writeFile('chat_bot_input.txt', "{RESTART}", function(err) {
				if (err) {
					return console.log(err);
				}
				console.log("restarting bot!");
			});
			
		}
		
		// write code to file
		const fs_execute_code = require('fs');
		fs_execute_code.writeFile('chat_bot_input.txt', input_code, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("[cleverbot input] " + input_code);
		});
		
		// read code output
		setTimeout(function(){
			fs_chatbot_input = require('fs');
			fs_chatbot_input.readFile("chat_bot_output.txt", "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				// send message
				get_output(msg, msg.channel.id);
				
			});
		}, 1000, msg);
	}
})

// random animal
bot.on("message", msg => {
	if (msg.content.toLowerCase() === "-random animal") {
		// write command to file
		const fs_commands = require('fs');
		fs_commands.writeFile('animal_input.txt', "random-animal", function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("wrote command random animal to file!")
		});
	
		// read file after 5 second
		setTimeout(function(){
			rand_animal_output = require('fs');
			rand_animal_output.readFile("animal_output.txt", "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				
				//send message
				msg.channel.send(data, { files: ['./current_image.png'] }).then (msg => {
					console.log("uploaded random animal image to discord!")
				})
			})
			
		},5000, msg);
	}
})

// post meme
bot.on("message", msg => {
	var command = msg.content.toLowerCase()
	if (command === "-catmeme" || command === "-meme") {
		try {
			// write command to file
			if (command === "-catmeme") {
				cat_input_writer = require('fs');
				cat_input_writer.writeFile('meme_input.txt', "meme-cat", function(err) {
					if (err) {
						return console.log(err);
					}
					console.log("wrote command random animal to file!")
				});
			} else if (command === "-meme") {
				meme_input_writer = require('fs');
				meme_input_writer.writeFile('meme_input.txt', "meme", function(err) {
					if (err) {
						return console.log(err);
					}
				console.log("wrote command random animal to file!")
				});
			}
		
			// read output
			setTimeout(function() {
				msg.reply("", { files: ['./meme.png'] }).then (msg => {
					console.log("uploaded meme to discord!");
				});
			}, 5000, msg);
			
		} catch (error) {
			console.log(error);
		}
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() === "-invitelink") {
		msg.reply("https://discord.gg/QDeUXq4");
	}
})

bot.on("message", msg => {
	if (msg.content === "-author") {
		msg.reply("JaredBot was created by Jared Turck")
	}
})

bot.on("message", msg => {
	if (msg.content === "-membercount") {
		msg.reply("There are " + bot.guilds.cache.reduce((a,g) => a + g.memberCount, 0) + " members on the server!");
	}
})

// chat replys
var reply_chance = 3
var DoReply = true;

bot.on("message", msg => {
	if (msg.content.toLowerCase() == "-stop") {
		DoReply = false;
		msg.reply("Auto response is turned off! Sorry if I was spamming :(");
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() == "-autoresponse") {
		DoReply = true;
		msg.reply("Auto response turned on!");
	}
})

bot.on("message", msg => {
	if (DoReply == true) {
		// responses
		if (msg.content.toLowerCase() == "f") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
		msg.channel.send("f ");
			}
		}

		if (msg.content.toLowerCase().indexOf("jared") > -1) {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("Jared ");
			}
		}

		if (msg.content.toLowerCase() == "lol") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("lol ");
			}
		}

		if (msg.content.toLowerCase() =="xd") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("xD ");
			}
		}

		if (msg.content.toLowerCase() == ":3") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send(":3 ");
			}
		}

		if (msg.content.toLowerCase() == ":)") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send(":) ");
			}
		}

		if (msg.content.toLowerCase() == "what") {
			if (new Date().getMilliseconds() % (reply_chance+5) == 0) {
				msg.channel.send("what ");
			}
		}

		if (msg.content.toLowerCase() == "no u") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("no u ");
			}
		}

		if (msg.content.toLowerCase() == "no you") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("no you ");
			}
		}

		if (msg.content.toLowerCase() == ":o") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send(":o ");
			}
		}

		if (msg.content.toLowerCase() == "owo") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("owo ");
			}
		}

		if (msg.content.toLowerCase() == "yeah") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("yeah ");
			}
		}
		
		if (msg.content.toLowerCase() == "ye") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("ye ");
			}
		}
		
		
		if (msg.content.toLowerCase() == "ah ok") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("ah ok ");
			}
		}

		if (msg.content.toLowerCase() == "nice") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("nice ");
			}
		}

		if (msg.content.toLowerCase() == "o") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("o ");
			}
		}
		
		if (msg.content.toLowerCase() == "ö") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("ö ");
			}
		}

		if (msg.content.toLowerCase() == "thanks") {
			if (new Date().getMilliseconds() % (reply_chance+1) == 0) {
				msg.channel.send("thanks ");
			}
		}

		if (msg.content.toLowerCase() == "ty") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("ty ");
			}
		}

		if (msg.content.toLowerCase() == "oof") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("oof ");
			}
		}

		if (msg.content.toLowerCase() == "ok") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				msg.channel.send("ok ");
			}
		}

		if (msg.content.toLowerCase() == "bruh") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("bruh ");
			}
		}
		
		if (msg.content.toLowerCase() == "you") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("no you ");
			}
		}
		
		if (msg.content.toLowerCase() == "u") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("no u ");
			}
		}
		
		if (msg.content.toLowerCase() == "?") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("? ");
			}
		}

		if (msg.content.toLowerCase() == ":d") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send(":D ");
			}
		}

		if (msg.content.toLowerCase() == "rip") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("rip ");
			}
		}
		
		if (msg.content.toLowerCase().slice(0,3) == "ree") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("ree ");
			}
		}
		
		if (msg.content.toLowerCase().slice(0,4) == "haha") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("haha ");
			}
		}
		
		if (msg.content.toLowerCase() == "lmao") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("lmao ");
			}
		}
		
		if (msg.content.toLowerCase() == "yes") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("yes ");
			}
		}
		
		if (msg.content.toLowerCase() == "no") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("no ");
			}
		}
		
		if (msg.content.toLowerCase() == "yay") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("yay ");
			}
		}
		
		if (msg.content.toLowerCase() == "friend") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("im your friend! ");
			}
		}
		
		if (msg.content.toLowerCase() == "i love you" || msg.content.toLowerCase() == "i love u") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("I love you too! ");
			}
		}
		
		if (msg.content.toLowerCase() == "ily") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("I love you too! ");
			}
		}
		
		if (msg.content.toLowerCase() == "wow") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send("wow!");
			}
		}
		
		if (msg.content.toLowerCase() == "brb") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				msg.channel.send("no you wont");
			}
		}
		
		if (msg.content.toLowerCase() == ":/") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				msg.channel.send(":/ ");
			}
		}
		
		if (msg.content.toLowerCase() == ":)") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				msg.channel.send(":) ");
			}
		}
		
		if (msg.content.toLowerCase() == ":(") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				msg.channel.send(":( ");
			}
		}
		
		if (msg.content.toLowerCase() == "hello" || msg.content.toLowerCase() == "hi") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				if (parseInt(Math.random() * 10) % 3 == 0) {
					msg.channel.send("Hello ");
				} else if (parseInt(Math.random() * 10) % 3 == 1) {
					msg.channel.send("Hey ");
				} else {
					msg.channel.send("Hi ");
				}
			}
		}
		
		if (msg.content.toLowerCase().slice(0,3) == "hey") {
			if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
				if (parseInt(Math.random() * 10) % 3 == 0) {
					msg.channel.send("Hello ");
				} else if (parseInt(Math.random() * 10) % 3 == 1) {
					msg.channel.send("Hey ");
				} else {
					msg.channel.send("Hi ");
				}
			}
		}
		
		if (msg.content.toLowerCase().indexOf("penis") > -1) {
			msg.channel.send("Ewww NO!");
		}
		
		if (msg.content.toLowerCase().indexOf("fuck me") > -1) {
			msg.channel.send("Ok daddy ;)");
		}
		
		if (msg.content.toLowerCase().indexOf("fuck you") > -1 || msg.content.toLowerCase().indexOf("fuck u") > -1) {
			msg.channel.send("no you");
		}
		
		if (msg.content.toLowerCase().indexOf("fuck off") > -1) {
			msg.channel.send("NO!");
		}
		
		if (msg.content.toLowerCase() === "fuck") {
			msg.channel.send("why you mad bruh?");
		}
		
		if (msg.content.toLowerCase() === "random") {
			msg.channel.send("your random");
		}
		
		if (msg.content.toLowerCase() === "night") {
			if (parseInt(Math.random() * 10) % 3 == 0) {
				msg.channel.send("Night!");
			} else if (parseInt(Math.random() * 10) % 3 == 1) {
				msg.channel.send("Sleep Well!");
			} else {
				msg.channel.send("Good Night!");
			}
		}
		
		if (msg.content.toLowerCase() === "morning") {
			if (parseInt(Math.random() * 10) % 3 == 0) {
				msg.channel.send("Morning!");
			} else if (parseInt(Math.random() * 10) % 3 == 1) {
				msg.channel.send("How did you sleep?");
			} else {
				msg.channel.send("Good Morning!");
			}
		}
		
		if (msg.content.toLowerCase() == "one second" || msg.content.toLowerCase() == "one sec") {
			setTimeout(function(){
				msg.channel.send("It's been one Second!");
			},1000)
		}
		
		if (msg.content.toLowerCase() == "1 second" || msg.content.toLowerCase() == "1 sec") {
			setTimeout(function(){
				msg.channel.send("It's been one Second!");
			},1000);
		}
		
		if (msg.content.toLowerCase() == "give me a sec" || msg.content.toLowerCase() == "give me a second") {
			setTimeout(function(){
				msg.channel.send("It's been one Second!");
			},1000);
		}
		
		if (msg.content.toLowerCase() == "one min" || msg.content.toLowerCase() == "1 min") {
			setTimeout(function(){
				msg.channel.send("It's been one min!");
			},60*1000);
		}
		
		
		// turn off
		DoReply = false;
		setTimeout(function(){
			DoReply = true;
		}, 1000)
	}
})

// Rock, Paper, Scissors
bot.on("message", msg => {
	if (["-rock", "-paper", "-scissors"].indexOf (msg.content.toLowerCase()) > -1) {
		bot_answer = ["Rock!", "Paper!", "Scissors!"][parseInt(Math.random() * 10) % 3];
		winning_text = "";
		
		console.log(msg.content.toLowerCase())
		console.log(bot_answer)
		
		// conditions
		if (msg.content.toLowerCase() == "-rock" && bot_answer == "Rock!") {
			winning_text = "Draw!";
		} else if (msg.content.toLowerCase() == "-rock" && bot_answer == "Paper!") {
			winning_text = "HAHA I win!";
		} else if (msg.content.toLowerCase() == "-rock" && bot_answer == "Scissors!") {
			winning_text = "You Win!";
		} else if (msg.content.toLowerCase() == "-paper" && bot_answer == "Rock!") {
			winning_text = "You Win!";
		} else if (msg.content.toLowerCase() == "-paper" && bot_answer == "Paper!") {
			winning_text = "Draw!";
		} else if (msg.content.toLowerCase() == "-paper" && bot_answer == "Scissors!") {
			winning_text = "HAHA I Win!";
		} else if (msg.content.toLowerCase() == "-scissors" && bot_answer == "Rock!") {
			winning_text = "HAHA I Win!";
		} else if (msg.content.toLowerCase() == "-scissors" && bot_answer == "Paper!") {
			winning_text = "You Win!";
		} else if (msg.content.toLowerCase() == "-scissors" && bot_answer == "Scissors!") {
			winning_text = "Draw!";
		}
		
		// winning text
		msg.channel.send(bot_answer)
		setTimeout(function() {
			msg.channel.send(winning_text);
		}, 1000);
		
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0, 10) == "-remind me") {
		try {
			if (msg.content.toLowerCase().indexOf(" second") > -1) {
				user_input = msg.content.toLowerCase().replace("-remind me ","").split(" sec")[0]
				time = user_input.split(" ")[user_input.split(" ").length -1];
				reminder = msg.content.toLowerCase().replace("-remind me ","")
			
				setTimeout(function() {
					msg.reply("Reminder! "+ reminder.split(" sec")[0]);
				}, 1000*parseInt(time), msg);
				msg.reply("Ok i will remind you!");
			
			} else if (msg.content.toLowerCase().indexOf(" min") > -1) {
				user_input = msg.content.toLowerCase().replace("-remind me ","").split(" min")[0]
				time = user_input.split(" ")[user_input.split(" ").length -1];
				reminder = msg.content.toLowerCase().replace("-remind me ","")
			
				setTimeout(function() {
					msg.reply("Reminder! "+ reminder.split(" min")[0]);
				}, 1000*parseInt(time)*60, msg);
				msg.reply("Ok i will remind you!");
			}
		} catch (error) {
			msg.reply("Reminder failed!")
			console.log(error)
		}
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0,7) == "-timer ") {
		time = msg.content.toLowerCase().replace("-timer ","").split(":");
		if (time.length == 3) {
			if (parseInt(time[0]) != NaN && parseInt(time[1]) != NaN && parseInt(time[2]) != NaN) {
				secs = parseInt(time[2])
				mins = parseInt(time[1])
				hour = parseInt(time[0])
				total = secs + (mins*60) + (hour*3600)
				msg.reply("Timer set for "+total+" seconds !");
				
				setTimeout(function(){
					msg.reply("Timer Finished!");
				}, (secs + (mins*60) + (hour*3600))*1000, msg)
			} else {
				msg.reply("Invalid Format!")
			}
		} else {
			msg.reply("Please use the format Hours:Mins:Seconds (HH:MM:SS)!")
		}
	}
})

//stopwatch
var stopwatch_start = new Date();
bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0,11) == "-stopwatch ") {
		if (msg.content.toLowerCase().split("-stopwatch ")[1] == "start") {
			var stopwatch_start = new Date();
			msg.reply("Stopwatch started! type '-stopwatch stop' to end!");
		} 
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0,11) == "-stopwatch ") {
		if (msg.content.toLowerCase().split("-stopwatch ")[1] == "stop") {
			if (stopwatch_start > 0) {
				var stopwatch_stop = new Date();
				run_sec = (stopwatch_stop - stopwatch_start)/1000;
				formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
				console.log(run_sec, formatted);
				msg.reply("Stopwatch stopped!\nRunning time: " + formatted + " seconds!");
			} else {
				msg.reply("You have not started the stopwatch, type '-stopwatch start' to start!");
			}
		}
	}
})

// Higher or Lower
var start_game = false;
var random_num = 0;
var user_counter = 0;
bot.on("message", msg => {
	if (msg.content.toLowerCase() == "-higherlower") {
		start_game = true;
		random_num = parseInt(Math.random() * 100) % 100;
		msg.reply("Im thinking of a number between 1 and 100! Guess the number!")
		setTimeout(function(){
			if (start_game == true) {
				msg.channel.send("Time is up! My number was " + random_num);
				start_game = false;
				user_counter = 0;
			}
		}, 60*1000, start_game);
	}
})

bot.on("message", msg => {
	if (start_game == true) {
		if (parseInt(msg.content) != NaN) {
			var guess = parseInt(msg.content);
			if (guess < random_num) {
				msg.reply("Higher!");
				user_counter += 1;
			} else if (guess > random_num) {
				msg.reply("Lower!");
				user_counter += 1;
			} else if (guess == random_num) {
				start_game = false;
				msg.reply("Welldone my number was " + random_num +"\nYou took " + user_counter + " guesses!");
				user_counter = 0;
			}
		}
	}
})

// TicTacToe
var n = [[".", ".", "."], [".", ".", "."],[".", ".", "."]]
var TicTacToe_start_game = false;
var TicTacToe_draw_board = true;
function draw_board(msg) {
	if (TicTacToe_draw_board == true) {
		msg.channel.send("```   A   B   C\n" +
		"1  "+n[0][0]+" | "+n[0][1]+" | "+n[0][2] + "\n  -----------\n" +
		"2  "+n[1][0]+" | "+n[1][1]+" | "+n[1][2] + "\n  -----------\n" +
		"3  "+n[2][0]+" | "+n[2][1]+" | "+n[2][2] + "```");
	}
}

function winning_condition(chk, msg) {
	TicTacToe_start_game = false;
	n = [[".", ".", "."], [".", ".", "."],[".", ".", "."]];
	setTimeout(function(){
		msg.channel.send(["You Win!", "I win!"]["XO".indexOf(chk)]);
	}, 1000);
}

function condition_draw(msg) {
	current = "";
	for (i=0;i<3;i++) {
		for (ii=0;ii<3;ii++) {
			current += n[i][ii]
		}
	} if (current.indexOf(".") > -1) {
		msg.channel.send("Draw!");
		TicTacToe_start_game = false;
	}
}

bot.on("message", msg => {
	if (msg.content == "-ttt") {
		TicTacToe_start_game = true;
		draw_board(msg);
	}
})

bot.on("message", msg => {
	if (TicTacToe_start_game == true) {
		if (msg.content.length == 2 ) {
			if ("abc".indexOf(msg.content.toLowerCase()[0]) > -1 && "123".indexOf(msg.content.toLowerCase()[1]) > -1 ) {
				console.log(msg.content);
				// user place
				X = "abc".indexOf(msg.content.toLowerCase()[0]);
				Y = "123".indexOf(msg.content.toLowerCase()[1]);
				if (n[Y][X] == "X" || n[Y][X] == "O") {
					msg.reply("This spot is already taken!");
					TicTacToe_draw_board = false;
				} else {
					n[Y][X] = "X";
					
					// bot place
					bot_X = parseInt(Math.random() * 10) % 3;
					bot_y = parseInt(Math.random() * 10) % 3;
					count = 0;
					while (n[bot_y][bot_X] == "X" || n[bot_y][bot_X] == "O") {
						bot_X = parseInt(Math.random() * 10) % 3;
						bot_y = parseInt(Math.random() * 10) % 3;
						console.log("bot place taken!");
						count += 1;
						if (count > 99) {
							console.log("bot failed to place!");
							break;
						}
					}
					n[bot_X][bot_y] = "O";
				
					// check conditions
					for (i=0;i<2;i++) {
						chk = "XO"[i];
						if (n[0][0] == chk && n[0][1] == chk && n[0][2] == chk) {
							winning_condition(chk, msg);
						} else if (n[1][0] == chk && n[1][1] == chk && n[1][2] == chk) {
							winning_condition(chk, msg);
						} else if (n[2][0] == chk && n[2][1] == chk && n[2][2] == chk) {
							winning_condition(chk, msg);
						} else if (n[0][0] == chk && n[1][0] == chk && n[2][0] == chk) {
							winning_condition(chk, msg);
						} else if (n[0][1] == chk && n[1][1] == chk && n[2][1] == chk) {
							winning_condition(chk, msg);
						} else if (n[0][2] == chk && n[1][2] == chk && n[2][2] == chk) {
							winning_condition(chk, msg);
						} else if (n[0][0] == chk && n[1][1] == chk && n[2][2] == chk) {
							winning_condition(chk, msg);
						} else if (n[0][2] == chk && n[1][1] == chk && n[2][0] == chk) {
							winning_condition(chk, msg);
						}
					}
				
					// draw board
					draw_board(msg);
					TicTacToe_draw_board = true;
				}
			}
		} 
	}
})


// moderation
// IDs Pez, Skittle, Jared, Elyxia
authorised_IDs = ["497067274428219423", "268394063550611456", "364787379518701569", "714207191573463102"];
bot.on("message", msg => {
	if (msg.content.slice(0, 5) == "-warn") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			msg.channel.send("[WARNING]"+ msg.content.slice(5, msg.length));
			console.log("user warned!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,5) == "-mute") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			member.roles.add("755217590296772658");
			msg.channel.send("User "+ member + " muted!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,7) == "-unmute") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			member.roles.remove("755217590296772658");
			msg.channel.send("User "+ member + " unmuted!");
		}
	}
})