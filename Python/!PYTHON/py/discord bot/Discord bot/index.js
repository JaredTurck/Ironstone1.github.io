/*
JaredBot is a multipurpose Discord bot created by Jared Turck, 
mainly to be used on the Jared Network Discord server.

It has a range of features from tools such as execute, which 
allows you to run Python code directly on your discord server, 
steaminfo which allows you to see other users steam stats, an AI 
chat bot which you can talk an interact with, auto response chat 
commands, random images and memes, to games like rock paper scissors, 
higher lower and TickTackToe. The bot also has moderation commands 
for managing your server, like announce, warn, mute, unmute, kick, 
ban, unban, to logging which saves a copy of every message allowing 
you to retrieve messages even after they have been deleted.
*/

// --- Init Vars ---
// IDs Pez, Skittle, Jared, Elyxia
const authorised_IDs = ["497067274428219423", "268394063550611456", "364787379518701569", "714207191573463102"];
const user_ID = "364787379518701569"; // Jared ID
const hentai_channel_ID = "756291926277357600"; // hentai channel ID
const channel_IDs = ["751827086137622658", "762103168061538315"]; // announcement channel IDs
const muted_role_ID = "755217590296772658" // muted role ID
const bot_ID = "767561850404864071";

var logging = true;				// turn logging on or off
var sniping = true;				// records recently deleted messages
var reply_chance = 4;			// message reply chance
var prefix = "-";				// default prefix
var tag_tag_output = "Admin"; 	// Display tag when mod commands are run
var perm_invite_link = "https://discord.gg/QDeUXq4"; // permanent invite link

// file names
const output_file_henati = "InputOutput/output.txt";
const inputs_file_henati = "InputOutput/commands.txt";
const output_file_execute = "InputOutput/execute_output.txt";
const inputs_file_execute = "execute.py";
const output_file_chatbot = "InputOutput/chat_bot_output.txt";
const inputs_file_chatbot = "InputOutput/chat_bot_input.txt";
const output_file_animals = "InputOutput/animal_output.txt";
const inputs_file_animals = "InputOutput/animal_input.txt";
const output_file_steaminfo = "InputOutput/steam_data_output.txt";
const inputs_file_steaminfo = "InputOutput/steam_info_input.txt";
const output_file_random_animal_png = "./current_image.png";
const inputs_file_meme = "InputOutput/meme_input.txt";
const outputs_file_meme = "./meme.png";

const dataset_imbored = "datasets/imbored.txt";
const dataset_firstname = "datasets/firstname.txt";
const dataset_surname = "datasets/surname.txt";
const default_dance_dir = "datasets/deafult_dance/";
const dataset_methods_of_death = "datasets/methods_of_death.txt";
const dataset_coins_dir = "datasets/coins/";

const flip_coin_tails = "tails.gif";
const flip_coin_heads = "heads.gif";
const flip_coin_file_extension = ".gif";
const text_meme_thef = "datasets/text_memes/thef.txt";
const log_file_name = "SERVER_LOG_DONT_SHARE.log";
const token_file_name = "TOKEN_DO_NOT_SHARE.txt";
const deleted_messages_log_file = "logs/deleted_messages.log";
const logging_path = "logs"

// Delays (milliseconds)
const read_output_file_delay_henati = 1000;			// henati
const read_output_file_delay_execute = 3000;		// execute python code
const read_output_file_delay_clever_bot = 1000;		// initial clever bot delay
const read_output_file_delay_clever_bot_2 = 1000;	// check again for output delay
const read_output_file_delay_random_animal = 5000;	// random animal delay
const read_output_file_delay_random_meme = 1000;	// delay for -catmeme and -meme
const read_output_file_delay_steam_info = 3000;		// get steam info delay
const higher_lower_end_game_delay = 60*1000;		// higher or lower end game delay
const anti_spam_delay = 1000;						// delay between chat replys (prevents bot from spamming)
const hash_delay = 100;								// delay between hashing file and reading checksum
const auto_henati_delay = 10*60*1000				// auto henati delay
const enable_auto_henati = true;					// turn auto henati on or off

// Dont change these variables
var DoReply = true;					// Dont change value
var stopwatch_start = new Date();	// Dont change value
var stopwatch_on = false;			// Dont change value
var start_game = false; 			// Dont change value
var random_num = 0;					// Dont change value
var user_counter = 0;				// Dont change value
var TicTacToe_start_game = false;	// Dont change value
var TicTacToe_draw_board = true;	// Dont change value
var show_prefix = true;				// Dont change value
var member = undefined;				// Dont change value
var up_time = new Date();			// Dont change value
var n = [[".",".","."],[".",".","."],[".",".","."]];
const ASCII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+1234567890-=[]{}\|,.<>/?`~";
var FileSent = false;				// Dont change value

// Hashs
var md5_sum_of_meme_original = "";
var md5_sum_of_meme_updated = "";
var md5_sum_of_current_img_original = "";
var md5_sum_of_current_img_updated = "";
var File_hash = "";


// functions

function get_md5(file_name) {
	// require
	var cryp = require("crypto");
	var file_reader = require('fs');
	var sum = cryp.createHash("md5");
	
	// read file
	file = file_reader.ReadStream(file_name)
	file.on('data', function(data) {
		sum.update(data);
	})

	// update hash
	file.on('end', function() {
		File_hash = sum.digest('hex');
	})
}

function check_if_file_changed(outputs_file, msg, continued, delay, IsFile) {
	// read output
	// get file check sum
	if (continued == true) {
		get_md5(outputs_file)
		setTimeout(function() {
			md5_sum_of_meme_original = File_hash;
			console.log("updated = " + md5_sum_of_meme_updated+" ["+md5_sum_of_meme_original == md5_sum_of_meme_updated+"]!");
		}, hash_delay);
	}
	
	// wait until the file check sum has changed, then send message
	FileSent = false;
	setTimeout(function() {
		get_md5(outputs_file);
		setTimeout(function() {
			md5_sum_of_meme_updated = File_hash;
			if (md5_sum_of_meme_original != md5_sum_of_meme_updated) {
				console.log(" = " + md5_sum_of_meme_updated)
			}
					
			// check if hash changed
			if (md5_sum_of_meme_original == md5_sum_of_meme_updated) {
				setTimeout(function(){
					check_if_file_changed(outputs_file, msg, false, delay, IsFile);
				}, delay, msg)
			} if (md5_sum_of_meme_original != md5_sum_of_meme_updated) {
				// if hash has changed then send message
				if (FileSent == false) {
					if (IsFile == true) {
						msg.reply("", { files: [outputs_file] }).then (msg => {
							console.log("uploaded meme to discord!");
							FileSent = true;
						});
					} else if (IsFile == false) {
						// open output file
						fs_output = require('fs');
						fs_output.readFile(output_file_henati, "utf8", function(err, data) {
							if (err) {
								return console.log(err);
							}
							// send message
							msg.channel.send(data);
						});
					}
				}
			}
		}, hash_delay);
	}, delay, msg);
	
	// file sent change back to false
	FileSent = false;
}




// --- Main ---
//login
const Discord = require("discord.js");
const bot = new Discord.Client();

token_reader = require('fs');
token_reader.readFile(token_file_name, "utf-8", function(err, data) {
	if (err) {
		return console.log("failed to read token! " + err);
	}
	
	const token = data;
	bot.login(token);
})

bot.on("ready", () => {
	console.log("This bot is online!");
});

// commands
bot.on("message", msg=> {
	if(msg.content === prefix+"testbot") {
		msg.reply("Jared Bot is online!")
	}
})

bot.on("message", msg => {
	if (msg.content === "-help") {
		msg.reply(`Jared Bot:
		
Tools:
-remind me {reminder} {No. min/sec} - sets a reminder
-timer {HH:MM:SS}		- sets a timer
-stopwatch {start/stop} - sets a stopwatch
-execute        		- executes Python code

Info:
-invitelink				- shows invite link
-author					- shows author
-membercount			- shows No. people on server
-testbot        		- checks that the bot is online
-uptime					- shows how long the bot has been online for
-steaminfo				- show info of any steam user
-prefix					- shows the current prefix

Chat Commands:
-default dance			- does the default dance
-say {type something}   - repeats whatever you say
-do you {question}		- asks a question
-is {question}			- asks a question
-will {question}		- asks a question
-howgay 				- tests how gay they are
-imbored				- gives you something to do
-random name			- generates random name
-bot					- allows you to talk to chatbot
-kill					- kill someone
-stop					- disables auto response (use this if the bot is spamming)
-autoresponse			- enables auto response
-replychance			- set hot often the bot replys

Image commands:
-random animal			- shows photo of a random animal
-hentai					- nsfw command
-meme					- posts a meme
-catmeme				- posts a cat meme
-flipcoin				- flips a coin

Games:
-rock/-paper/-scissors 	-play a game of Rock, Paper, Scissors
-higherlower			- guess the number
-ttt					- TicTacToe

Admin/mod Commands:
-announce 				- admin command, sends announcement
-mute @user 			- mutes a user
-unmute @user 			- unmutes a user
-tempmute @user length 	- mutes user for specified length then unmutes
-kick @user				- kicks a user
-ban @user				- bans a user
-unban @user			- unbans a use
-logging [on/off]		- turn message logging on or off
-prefix {prefix}		- change the bots prefix
-snipe					- shows recently deleted messages
-snipping [on/off]		- turn logging of recently deleted messages on or off
-exit					- shuts the bot down`)
	}
})

bot.on("message", msg=> {
	if (msg.content.slice(0,4).toLowerCase() === prefix+"say") {
		msg.reply(msg.content.slice(4, msg.content.length));
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,8).toLowerCase() === prefix+"do you " || msg.content.slice(0,6) === prefix+"do u ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,4).toLowerCase() == prefix+"is ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,8).toLowerCase() == prefix+"should ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,8).toLowerCase() === prefix+"howgay " || msg.content === prefix+"howgay") {
		if (msg.content === prefix+"howgay") {
			msg.reply("You are " + String(parseInt(Math.random()*100)) + "% gay!")
		} else {
			name = msg.content.replace(" is "," ").split(" ")[1];
			msg.reply(name + " is " + String(parseInt(Math.random()*100)) + "% gay!")
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,6).toLowerCase() === prefix+"will ") {
		msg.reply(["Yes", "No"][parseInt(Math.random() * 100) % 2]);
	}
})

// post henati
bot.on("message", msg => {
	if (msg.content.toLowerCase() === prefix+"hentai") {
		if (msg.channel.id == hentai_channel_ID) {
			// write command to file
			const fs_commands = require('fs');
			fs_commands.writeFile(inputs_file_henati, "get-henati", function(err) {
				if (err) {
					return console.log(err);
				}
			console.log("wrote command -get-henati to file!")
			});
	
			// output image
			check_if_file_changed(output_file_henati, msg, true, read_output_file_delay_henati, false);
			
		} else {
			msg.reply("This command can only be used in NSFW channels!");
		}
	}
})

// auto henati
post_henati = setInterval(function() {
	if (enable_auto_henati == true) {
		// write command to file
		const fs_commands = require('fs');
		fs_commands.writeFile(inputs_file_henati, "get-henati", function(err) {
			if (err) {
				return console.log(err);
			}
		console.log("wrote command -get-henati to file!")
		});
		
		// output image
		setTimeout(function(){
			// read output file
			fs_output = require('fs');
			fs_output.readFile(output_file_henati, "utf8", function(err,data) {
				if (err) {
					return console.log(err);
				}
				
				//send message
				bot.channels.cache.get(hentai_channel_ID).send(data);
			});
		}, read_output_file_delay_henati);
	}
}, auto_henati_delay)

//bot.on("message", msg => {
//})

// execute
bot.on("message", msg => {
	if (msg.content.slice(0,8) === prefix+"execute") {
		var input_code = msg.content.slice(9,msg.length);
		input_code = input_code.split("```").join("").split("`").join("");
		
		// write code to file
		const fs_execute_code = require('fs');
		fs_execute_code.writeFile(inputs_file_execute, input_code, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("wrote python code to file successfully!");
		});
		
		// read code output
		setTimeout(function(){
			fs_execute_input = require('fs');
			fs_execute_input.readFile(output_file_execute, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				// send message
				msg.reply(data);
			});
		}, read_output_file_delay_execute, msg);
		
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() === prefix+"imbored") {
		bored_dataset = require('fs');
		bored_dataset.readFile(dataset_imbored, "utf-8", function(err, data) {
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
	if (msg.content.toLowerCase() === prefix+"random name") {
		first_name_dataset = require('fs')
		first_name_dataset.readFile(dataset_firstname, "utf-8", function(err, data) {
			if (err) {
				return console.log(err);
			}
			
			//get first name
			first_names_list = String(data).split("\n");
			firstname = first_names_list[parseInt(Math.random() * 1000) % first_names_list.length];
			
			//surname
			surname_dataset = require('fs')
			surname_dataset.readFile(dataset_surname, "utf-8", function(err, data) {
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
bot.on("message", msg => {
	if (msg.channel.type == 'dm') {
		if (msg.author.id === user_ID) {
			if (msg.content.toLowerCase().slice(0,10) === prefix+"announce ") {
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

// default dance
bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0, 14) == prefix+"default dance") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			// message reply
			for (i=1;i<11;i++) {
				deafult_dance = require('fs')
				deafult_dance.readFile(default_dance_dir+i+".txt", "utf-8", function(err, data) {
					if (err) {
						return console.log(err);
					}
					msg.reply(data);
				})
			}
		} else {
			msg.reply("You can't run this command!");
		}
	}
})

// wait 1 second then get output again
function get_output(msg, channel_id) {
	setTimeout(function() {
		try {
			fs_execute_input2 = require('fs');
			fs_execute_input2.readFile(output_file_chatbot, "utf-8", function(err, data) {
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
	}, read_output_file_delay_clever_bot, msg, channel_id);
}

// clever bot
bot.on("message", msg => {
	if (msg.content.slice(0,4) === prefix+"bot") {
		var input_code = msg.content.slice(5,msg.length);
		
		if (input_code == "restart") {
			// write code to file
			fs_restart = require('fs');
			fs_restart.writeFile(inputs_file_chatbot, "{RESTART}", function(err) {
				if (err) {
					return console.log(err);
				}
				console.log("restarting bot!");
			});
			
		}
		
		// write code to file
		const fs_execute_code = require('fs');
		fs_execute_code.writeFile(inputs_file_chatbot, input_code, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("[cleverbot input] " + input_code);
		});
		
		// read code output
		setTimeout(function(){
			fs_chatbot_input = require('fs');
			fs_chatbot_input.readFile(output_file_chatbot, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				// send message
				get_output(msg, msg.channel.id);
				
			});
		}, read_output_file_delay_clever_bot_2, msg);
	}
})

// random animal
bot.on("message", msg => {
	if (msg.content.toLowerCase() === prefix+"random animal") {
		// write command to file
		const fs_commands = require('fs');
		fs_commands.writeFile(inputs_file_animals, "random-animal", function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("wrote command random animal to file!")
		});
	
		// read file after 5 second
		setTimeout(function(){
			rand_animal_output = require('fs');
			rand_animal_output.readFile(output_file_animals, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				
				//send message
				msg.channel.send(data, { files: [output_file_random_animal_png] }).then (msg => {
					console.log("uploaded random animal image to discord!")
				})
			})
			
		}, read_output_file_delay_random_animal, msg);
	}
})

// post meme
bot.on("message", msg => {
	var command = msg.content.toLowerCase()
	if (command === "-catmeme" || command === prefix+"meme") {
		try {
			// write command to file
			if (command === "-catmeme") {
				cat_input_writer = require('fs');
				cat_input_writer.writeFile(inputs_file_meme, "meme-cat", function(err) {
					if (err) {
						return console.log(err);
					}
					console.log("wrote command random animal to file!")
				});
			} else if (command === "-meme") {
				meme_input_writer = require('fs');
				meme_input_writer.writeFile(inputs_file_meme, "meme", function(err) {
					if (err) {
						return console.log(err);
					}
				console.log("wrote command random meme to file!")
				});
			}
		
			// send message
			check_if_file_changed(outputs_file_meme, msg, true, read_output_file_delay_random_meme, true);
			
		} catch (error) {
			console.log(error);
		}
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() === prefix+"invitelink") {
		msg.reply(perm_invite_link);
	}
})

bot.on("message", msg => {
	if (msg.content === prefix+"author") {
		msg.reply("JaredBot was created by Jared Turck")
	}
})

bot.on("message", msg => {
	if (msg.content === prefix+"membercount") {
		msg.reply("There are " + bot.guilds.cache.reduce((a,g) => a + g.memberCount, 0) + " members on the server!");
	}
})

// chat replys
bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0,13) == prefix+"replychance ") {
		value = parseInt(msg.content.toLowerCase().slice(13, msg.content.length));
		if (value != NaN) {
			if (value > 0) {
				reply_chance = value;
				msg.channel.send("reply chance set to " + parseInt((1 / reply_chance)*100)+"%!");
			} else if (value == 0) {
				msg.channel.send("You can't set the reply chance to 0%! please use -stop instead to turn the bot auto response off!");
			} else if (value < 0) {
				msg.channel.send("Negative percentages not allowed!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() == prefix+"stop") {
		DoReply = false;
		msg.reply("Auto response is turned off! Sorry if I was spamming :(");
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase() == prefix+"autoresponse") {
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
		
		if (msg.content.toLowerCase() == ":v") {
			if (new Date().getMilliseconds() % reply_chance == 0) {
				msg.channel.send(":v ");
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
			if (parseInt(Math.random() * 10) % (reply_chance+5) == 0) {
				msg.channel.send("why you mad bruh?");
			}
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
		}, anti_spam_delay);
	}
})

// killed by
bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0, 6) == prefix+"kill ") {
		let member = msg.mentions.members.first();
		animals_reader = require('fs')
		animals_reader.readFile(dataset_methods_of_death, "utf-8", function(err, data) {
			if (err) {
				return console.log(err);
			}
			death_method = data.split("\n")[parseInt(Math.random() * 1000) % data.split("\n").length]
			msg.channel.send("<@" + member + "> " + death_method);
		})
	}
})

// Rock, Paper, Scissors
bot.on("message", msg => {
	if ([prefix+"rock", prefix+"paper", prefix+"scissors"].indexOf (msg.content.toLowerCase()) > -1) {
		bot_answer = ["Rock!", "Paper!", "Scissors!"][parseInt(Math.random() * 10) % 3];
		winning_text = "";
		
		console.log(msg.content.toLowerCase())
		console.log(bot_answer)
		
		// conditions
		if (msg.content.toLowerCase() == prefix+"rock" && bot_answer == "Rock!") {
			winning_text = "Draw!";
		} else if (msg.content.toLowerCase() == prefix+"rock" && bot_answer == "Paper!") {
			winning_text = "HAHA I win!";
		} else if (msg.content.toLowerCase() == prefix+"rock" && bot_answer == "Scissors!") {
			winning_text = "You Win!";
		} else if (msg.content.toLowerCase() == prefix+"paper" && bot_answer == "Rock!") {
			winning_text = "You Win!";
		} else if (msg.content.toLowerCase() == prefix+"paper" && bot_answer == "Paper!") {
			winning_text = "Draw!";
		} else if (msg.content.toLowerCase() == prefix+"paper" && bot_answer == "Scissors!") {
			winning_text = "HAHA I Win!";
		} else if (msg.content.toLowerCase() == prefix+"scissors" && bot_answer == "Rock!") {
			winning_text = "HAHA I Win!";
		} else if (msg.content.toLowerCase() == prefix+"scissors" && bot_answer == "Paper!") {
			winning_text = "You Win!";
		} else if (msg.content.toLowerCase() == prefix+"scissors" && bot_answer == "Scissors!") {
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
	if (msg.content.toLowerCase().slice(0, 10) == prefix+"remind me") {
		try {
			if (msg.content.toLowerCase().indexOf(" second") > -1) {
				user_input = msg.content.toLowerCase().replace(prefix+"remind me ","").split(" sec")[0]
				time = user_input.split(" ")[user_input.split(" ").length -1];
				reminder = msg.content.toLowerCase().replace(prefix+"remind me ","")
			
				setTimeout(function() {
					msg.reply("Reminder! "+ reminder.split(" sec")[0]);
				}, 1000*parseInt(time), msg);
				msg.reply("Ok i will remind you!");
			
			} else if (msg.content.toLowerCase().indexOf(" min") > -1) {
				user_input = msg.content.toLowerCase().replace(prefix+"remind me ","").split(" min")[0]
				time = user_input.split(" ")[user_input.split(" ").length -1];
				reminder = msg.content.toLowerCase().replace(prefix+"remind me ","")
			
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
	if (msg.content.toLowerCase().slice(0,7) == prefix+"timer ") {
		time = msg.content.toLowerCase().replace(prefix+"timer ","").split(":");
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

//botup time
bot.on("message", msg => {
	if (msg.content == prefix+"uptime") {
		current_time = new Date();
		run_sec = (current_time - up_time)/1000;
		formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
		console.log(run_sec, formatted);
		msg.reply("The bot has been online for " + formatted + " seconds");
	}	
})

//stopwatch
bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0,11) == prefix+"stopwatch ") {
		if (msg.content.toLowerCase().split(prefix+"stopwatch ")[1] == "start") {
			stopwatch_start = new Date();
			stopwatch_on = true;
			msg.reply("Stopwatch started! type '"+prefix+"stopwatch stop' to end!");
		} 
	}
})

bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0,11) == prefix+"stopwatch ") {
		if (msg.content.toLowerCase().split(prefix+"stopwatch ")[1] == "stop") {
			if (stopwatch_on == true) {
				var stopwatch_stop = new Date();
				run_sec = (stopwatch_stop - stopwatch_start)/1000;
				formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
				console.log(run_sec, formatted);
				msg.reply("Stopwatch stopped!\nRunning time: " + formatted + " seconds!");
				stopwatch_on = false;
			} else {
				msg.reply("You have not started the stopwatch, type '"+prefix+"stopwatch start' to start!");
			}
		}
	}
})

// Higher or Lower
bot.on("message", msg => {
	if (msg.content.toLowerCase() == prefix+"higherlower") {
		start_game = true;
		random_num = parseInt(Math.random() * 100) % 100;
		msg.reply("Im thinking of a number between 1 and 100! Guess the number!")
		setTimeout(function(){
			if (start_game == true) {
				msg.channel.send("Time is up! My number was " + random_num);
				start_game = false;
				user_counter = 0;
			}
		}, higher_lower_end_game_delay, start_game);
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
	if (msg.content == prefix+"ttt") {
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

// flip a coin
bot.on("message", msg => {
	if (msg.content == prefix+"flipcoin") {
		coin = [flip_coin_tails, flip_coin_heads][parseInt(Math.random() * 10) % 2];
		name = coin[0].toUpperCase() + coin.slice(1,coin.length).replace(flip_coin_file_extension, "") + "!"
		msg.reply(name, { files: [dataset_coins_dir+coin] }).then (msg => {
			console.log("Coin fliped!")
		})
	}
})

// text memes
bot.on("message", msg => {
	if (msg.content.toLowerCase() == prefix+"killjaredbot") {
		if (msg.author.id == "364787379518701569") {
			kill_dank_memer = require('fs')
			kill_dank_memer.readFile(text_meme_thef, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				msg.reply(data);
			})
		}
	}
})

// steam info
bot.on("message", msg => {
	if (msg.content.toLowerCase().slice(0, 11) == prefix+"steaminfo ") {
		steam_info_writer = require('fs');
		steam_info_writer.writeFile(inputs_file_steaminfo, "get-steam-info " + msg.content.slice(11, msg.content.length), function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("wrote command get-steam-info to file!");
		})
		
		// read the steam data
		setTimeout(function(){
			get_steam_data = require('fs')
			get_steam_data.readFile(output_file_steaminfo, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				msg.reply("\n" + data);
			})
		}, read_output_file_delay_steam_info, msg);
	}
})

// change prefix
bot.on("message", msg => {
	if (msg.content.slice(0, 8) == prefix+"prefix ") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			new_prefix = msg.content.slice(8, msg.content.length);
			if (new_prefix.length == 1) {
				if (ASCII.indexOf(new_prefix) > -1) {
					old_prefix = prefix;
					prefix = new_prefix;
					msg.reply("["+tag_tag_output+"] Prefix changed from `" + old_prefix + "` to `" + prefix + "`!")
				} else {
					msg.reply("Prefix must be an ASCII character!");
				}
			} else {
				msg.reply("Prefix must be a single character!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can change the bpt prefix!");
		}
	}
})

// show current prefix
bot.on("message", msg => {
	if (msg.content == prefix+"prefix") {
		msg.reply("JaredBot's prefix is `" + prefix + "`")
		show_prefix = false;
		setTimeout(function(){
			show_prefix = true;
		}, anti_spam_delay);
	}
})


// moderation
bot.on("message", msg => {
	if (msg.content.slice(0, 6) == prefix+"warn ") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				msg.channel.send("[WARNING]"+ msg.content.slice(5, msg.length));
				console.log("user warned!");
			} else {
				msg.reply("Failed to warn! The specified User could not be found!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the warn command!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 5) == prefix+"mute") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				member.roles.add(muted_role_ID);
				msg.channel.send("["+tag_tag_output+"] <@"+ member + "> muted!");
			} else {
				msg.reply("Failed to mute! The specified User could not be found!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the mute command!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 7) == prefix+"unmute") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				member.roles.remove(muted_role_ID);
				msg.channel.send("["+tag_tag_output+"] <@"+ member + "> unmuted!");
			} else {
				msg.reply("Failed to unmute! The specified User could not be found!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the unmute command!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 9) == prefix+"tempmute") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				message = msg.content.split(" ")
				if (message.length == 3 && message[0] == prefix+"tempmute" && parseInt(message[2]) != NaN) {
					if (message[2] > 0) {
						if (message[2] < 1440) {
							// mute user
							member.roles.add(muted_role_ID);
							msg.channel.send("["+tag_tag_output+"] <@"+ member + "> muted for "+message[2]+" mins!");
					
							//unmute user
							setTimeout(function(){
								member.roles.remove(muted_role_ID);
								msg.channel.send("["+tag_tag_output+"] <@" + member + "> has been unmuted!");
							}, parseInt(message[2]) * 1000 * 60, member, msg);
						} else {
							msg.reply("Mute Length too large, must be less than 24 hours (1440 mins)!");
						}
					} else {
						if (parseInt(message[2]) < 0) {
							msg.reply("Mute Length cant be a negative number!");
						} else {
							msg.reply("Invalid Format! Mute length must be a number!");
						}
					}
				} else {
					msg.reply("Invalid Format! Please use -tempmute @user {length in mins}");
				}
			} else {
				msg.reply("Failed to mute! The specified User could not be found!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the mute command!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 5) == prefix+"kick") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				member.kick();
				msg.channel.send("["+tag_tag_output+"] <@" + member + "> has been kicked!");
			} else {
				msg.reply("Failed to kick! The specified User could not be found!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the kick command!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 4) == prefix+"ban") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			let member = msg.mentions.members.first();
			custom_ID = msg.content.slice(5, msg.content.length);
			if (member != undefined) {
				member.ban();
				msg.channel.send("["+tag_tag_output+"] <@" + member + "> has been banned!");
			} else {
				msg.reply("Failed to ban! The specified User could not be found!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the ban command!");
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 6) == prefix+"unban") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			ID = msg.content.slice(7, msg.content.length)
			if (/^\d+$/.test(ID) == true) {
				msg.guild.members.unban(ID);
				msg.channel.send("["+tag_tag_output+"] <@" + ID + "> has been unbanned!");
			} else {
				msg.channel.send("Please specify a User ID! " +
				"you can get the User ID by right clicking on a message the user has sent, then selecting Copy ID");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the unban command!");
		}
	}
})

// logging
bot.on("message", msg => {
	if (msg.content.slice(0, 9) == prefix+"logging ") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			command = msg.content.slice(9, msg.content.length);
			if (command == "on") {
				logging = true;
				msg.channel.send("Logging turned on! All messages are now being logged!");
			} else if (command == "off") {
				logging = false;
				msg.channel.send("Logging turned off! Messages are no longer being logged!");
			} else {
				msg.reply("Invalid syntax! Please use -logging [on/off]!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the bot prefix!");
		}
	}
})

bot.on("message", msg => {
	if (logging == true) {
		if (msg.channel.id != hentai_channel_ID) {
			try {
				// check if the log file exists
				date1 = new Date();
				log_current_file = logging_path + "/server_log_"+date1.getDate()+"-"+(date1.getMonth()+1)+"-"+date1.getFullYear()+".log";
				fs_test = require('fs');
				try {
					fs_test.existsSync(log_current_file);
				} catch (err) {
					// create file
					file_creater = require('fs');
					file_creater.writeFile(log_current_file, "", function(err) {
						if (err) {
							return console.log(err);
						}
					})
				}

				// write message to log
				date = String(new Date()).split(" GMT")[0];
				user = msg.member.user.tag;
				channel = msg.channel.name;
		
				fs_log_writer = require('fs');
				fs_log_writer.appendFile(log_current_file, "["+channel+"]["+user+"]["+date+"] "+msg.content+"\n", function(err) {
					if (err) {
						console.log(err);
					}
				})
				
			} catch (err) {
				console.log("Failed to write to log file! " + err);
			}
		}
	}
})

// Snipe (log deleted messages)
bot.on("messageDelete", msg => {
	if (sniping == true) {
		try {
			// write data to log file
			date = String(new Date()).split(" GMT")[0];
			user = msg.member.user.tag;
			channel = msg.channel.name;
		
			fs_log_writer = require('fs');
			fs_log_writer.appendFile(deleted_messages_log_file, "["+channel+"]["+user+"]["+date+"] "+msg.content+"\n", function(err) {
				if (err) {
					console.log(err);
				}
			})
		} catch (err) {
			console.log("Failed to write deleted message to log file!" + err);
		}
	}
})

bot.on("message", msg => {
	if (msg.content == prefix+"snipe") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			fs_output = require('fs');
			fs_output.readFile(deleted_messages_log_file, "utf8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				// show deleted messages
				msg.channel.send("Deleted Messages:\n");
				lines = data.split("\n");
				for (i=0;i<lines.length;i++) {
					msg.channel.send(lines[i])
				}
			})
		}
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0,10) == prefix+"snipping ") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			command = msg.content.slice(10, msg.content.length);
			if (command == "on") {
				sniping = true;
				msg.reply("Snipping has been turned on! Recently deleted messages will be logged!");
			} else if (command == "off") {
				snipping = false;
				msg.reply("Snipping has been turned off! Deleted messages will no longer be logged!");
			}
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can use the snipe command!");
		}
	}
})

// exit
bot.on("message", msg => {
	if (msg.content == "-exit") {
		if (authorised_IDs.indexOf(msg.author.id) > -1) {
			msg.channel.send("JaredBot has been terminated!");
			setTimeout(function(){
				process.exit(1);
			},100);
		} else {
			msg.reply("Your discord ID is not authorised, only moderators and admins can shutdown the bot!");
		}
	}
})