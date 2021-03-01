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
const nsfw_channel_ID = "756139652179558570";
const channel_IDs = ["751827086137622658", "762103168061538315", "667882044134653983"]; // announcement channel IDs
const muted_role_ID = "772858064772399116" // muted role ID
const bot_ID = "767561850404864071";
const adds_channel_ID = "751825387243307059";
const suggestions_channel_ID = "775846419306381403";
const music_sharring_channel = "747884314204700752";
const game_invite_channel = "751782587382628372";
var user_who_broke_rules_dict = {};
var authrosied_server_IDs = [];

var logging = true;				// turn logging on or off
var sniping = true;				// records recently deleted messages
var reply_chance = 8;			// message reply chance
var reply_chance = 8;			// message reply chance
var prefix = "-";				// default prefix
var tag_tag_output = "Admin"; 	// Display tag when mod commands are run
var perm_invite_link = "https://discord.com/invite/jarednetwork"; // permanent invite link
var clear_message_time = "1:00"; // time to clear the deleted messages log at
var content_filtering = true;	// turn content filtering on/off
var remove_duplicate_adds = true; // removes duplicate adds in the adds channel
var meme_source_from_python = false; // toggle between sourcing meme images from py script or web server
var hentai_user_python = false; // toggle between using python to source images or using the webserver
var rules_include_footer = true; // shows the footer text in the -rules command
var enable_auto_henati = true; // turn auto hentai on or off

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
const input_file_translate = "InputOutput/translate_input.txt";
const output_file_translate = "InputOutput/translate_output.txt";

const dataset_imbored = "datasets/imbored.txt";
const dataset_firstname = "datasets/firstname.txt";
const dataset_surname = "datasets/surname.txt";
const default_dance_dir = "datasets/deafult_dance/";
const dataset_methods_of_death = "datasets/methods_of_death.txt";
const dataset_coins_dir = "datasets/coins/";
const dataset_dice_dir = "datasets/dice/";
const dataset_elements = "datasets/elements.txt";
const dataset_fonts = "datasets/fonts.txt";
const dataset_pokemon = "datasets/pokemon.txt";

const webserver_memes_dataset = "http://jared.servehttp.com/img/dataset_memes";
const webserver_catmemes_dataset = "http://jared.servehttp.com/img/dataset_catmemes";
const webserver_cats_dataset = "http://jared.servehttp.com/img/dataset_cats";
const webserver_boobs_dataset = "http://jared.servehttp.com/img/dataset_boobs";
const webserver_dogs_dataset = "http://jared.servehttp.com/img/datasets_dogs";
const webserver_heli_dataset = "http://jared.servehttp.com/img/datasets_helicopters/";
const webserver_elms_dataset = "http://jared.servehttp.com/img/src/elm_photos";
const webserver_pokemon_dataset = "http://jared.servehttp.com/img/src/pokemon";
const webserver_dogmeme_dataset = "http://jared.servehttp.com/img/datasets_dogmeme";
const webserver_nude_dataset = "http://jared.servehttp.com/img/dataset_nudes";
const webserver_hentai_dataset = "http://jared.servehttp.com/img/dataset_hentai";
const webserver_car_dataset = "http://jared.servehttp.com/img/dataset_cars";
const webserver_owo_dataset = "http://jared.servehttp.com/img/src/emotion";
const webserver_snake_dataset = "http://jared.servehttp.com/img/dataset_snake";
const webserver_igmemes_dataset = "http://jared.servehttp.com/img/datasets_igmemes/2020";
const webserver_src_hug = "http://jared.servehttp.com/img/src/hug";

const flip_coin_tails = "tails.gif";
const flip_coin_heads = "heads.gif";
const flip_coin_file_extension = ".gif";
const text_meme_thef = "datasets/text_memes/thef.txt";
const token_file_name = "TOKEN_DO_NOT_SHARE.txt";
const deleted_messages_log_file = "logs/deleted_messages.log";
const logging_path = "logs";
const periodic_table = "http://jared.servehttp.com/img/src/periodic_table.jpg";
const mod_error_text = "If you feel this is a mistake please contact your server admin and ask them to grant you the ";
const authorised_servers = "authorised_server_IDs.txt";
const filenames_higherlower = "higherlower_scoreboard.txt";
const automod_filename = "automod.txt";
const warnings_filename = "warnings.txt";
const hentai_channel_file = "hentai_channel_ID.txt";
const nsfw_channel_file = "nsfw_channel_ID.txt";
const igmemes_channel_file = "igmemes_channel_ID.txt";

// Delays (milliseconds)
const read_output_file_delay_henati = 1000;			// henati
const read_output_file_delay_execute = 5000;		// execute python code
const read_output_file_delay_clever_bot = 1000;		// initial clever bot delay
const read_output_file_delay_clever_bot_2 = 1000;	// check again for output delay
const read_output_file_delay_random_animal = 5000;	// random animal delay
const read_output_file_delay_random_meme = 1000;	// delay for -catmeme and -meme
const read_output_file_delay_steam_info = 3000;		// get steam info delay
const higher_lower_end_game_delay = 120*1000;		// higher or lower end game delay
const read_input_file_pokemon_dataset = 1000;		// pokemon read dataset timeout
const anti_spam_delay = 1000;						// delay between chat replys (prevents bot from spamming)
const hash_delay = 100;								// delay between hashing file and reading checksum
const auto_henati_delay = 10*60*1000				// auto henati delay
const max_purdge_amount = 50;						// maximum number of messages you can purdge at a time
const purge_timeout = 1000;
const autohentai_clear_delay = 500;


// Dataset sizes
meme_database_count = 4832;
catmeme_database_count = 251;
cat_database_count = 575;
dog_database_count = 1792;
heli_database_count = 397;
dogmeme_database_count = 329;
nude_database_count = 8889;
hentai_database_count = 12204;
car_dataset_count = 2400;
snake_dataset_count = 638;
igmemes_dataset_count = 38681;
src_hug_count = 91;

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
var FileSent = false;				// Dont change value
var user_who_broke_rules_array = [];// Dont change value
var n = [[".",".","."],[".",".","."],[".",".","."]];
const ASCII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+1234567890-=[]{}\|,.<>/?`~ ";

// Hashs
var md5_sum_of_meme_original = "";
var md5_sum_of_meme_updated = "";
var md5_sum_of_current_img_original = "";
var md5_sum_of_current_img_updated = "";
var File_hash = "";

// imbed colours
const embed_colour_info = "#001FFF";	// blue
const embed_colour_error = "#FF0000";	// red
const embed_color_chat = "#d5a865";	// orange
const embed_colour_img = "#696969";	// grey

// functions

// generates an MD5 hash of specified file
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

// checks if a file has changed by comparing hashs
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
						msg.channel.send("", { files: [outputs_file] }).then (msg => {
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

// creates a file if it does not exist
function make_server_folder_file(msg, the_current_file) {
	// make directory if it does not exist
	var fs_folder_2 = require('fs');
	var server_name_2 = msg.guild.name.replace(" ","_") // server folder
	var server_file_2 = logging_path +"/"+ server_name_2 +"/" + the_current_file;
				
	// check if server folder exists
	if (!fs_folder_2.existsSync(logging_path +"/"+ server_name_2)) {
		fs_folder_2.mkdirSync(logging_path +"/"+ server_name_2);
	}
				
	// check if the file exists	
	return_value = true;
	fs_test_2 = require('fs');
	try {
		if (!fs_test_2.existsSync(server_file_2)) {
			// create file
			file_creater_2 = require('fs');
			file_creater_2.writeFile(server_file_2, "", function(err) {
				if (err) {
					return console.log(err);
				}
				console.log("File created!");
				return_value = false;
			})
		}
	} catch (err) {
		console.log("Failed to create file!");
	}
	return return_value;
}

// creates file if it does not exist in logs/servername, then appends data
function create_file_then_append_data(msg, auto_filename, data, endl="\n") {
	// get directory
	auto_dir = msg.guild.name.replace(" ","_");
	auto_path = logging_path + "/" + auto_dir + "/" + auto_filename;
	
	// make file
	async function make_file() {
		make_server_folder_file(msg, auto_filename);
			return;
		}
		
	// append data to file
	async function write_automod_rule(){
		await make_file();
		automod_writer = require('fs');
		automod_writer.appendFile(auto_path, data + endl, function(err) {
			if (err) {
				console.log(err);
			}
		})
	} write_automod_rule();
}

// returns true if a string contains only digits, sends error mmessage to user if it does not
function isInt(msg, n, range_start, range_end, varDescription, ErrorMessageEnd="") {
	if (isNaN(parseInt(n)) == false) {
		if (n > range_start) {
			if (n < range_end) {
				if (n.indexOf(".") == -1) {
					if (n.indexOf("-") == -1) {
						return true;
					} else {
						embed_error(msg, "your " + varDescription + " length cannot be a netative number! " + ErrorMessageEnd);
						return false;
					}
				} else {
					embed_error(msg, "your " + varDescription + " length cannot be a decimal number! " + ErrorMessageEnd);
					return false;
				}
			} else {
				embed_error(msg, "your " + varDescription + " is out of range, number to big! " + ErrorMessageEnd);
				return false;
			}
		} else {
			embed_error(msg, "your " + varDescription + " is out of range, number to small! " + ErrorMessageEnd);
			return false;
		}
	} else {
		embed_error(msg, "your " + varDescription + " is not a valid number! " + ErrorMessageEnd);
		return false;
	}
}

// checks if a string contains only digits (no error is sent to user)
function isInt_without_error(n, range_start, range_end) {
	if (isNaN(parseInt(n)) == false) {
		if (n > range_start) {
			if (n < range_end) {
				if (n.indexOf(".") == -1) {
					if (n.indexOf("-") == -1) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}

// embed functions
function embed_chat_reply(msg, txt, footer=["JaredBot", "http://jared.servehttp.com/img/lion.jpg"]) {
	try {
		embed_chat = new Discord.MessageEmbed();
		embed_chat.setColor(embed_color_chat);
		embed_chat.setDescription(txt);
		embed_chat.setFooter(footer[0], footer[1]);
		embed_chat.setTimestamp();
		msg.channel.send(embed_chat);
	} catch {
		embed_error(msg, "Something went wrong!");
	}
}

function embed_info_reply(msg, txt, footer=["JaredBot", "http://jared.servehttp.com/img/lion.jpg"]) {
	try {
		embed_chat = new Discord.MessageEmbed();
		embed_chat.setColor(embed_colour_info);
		embed_chat.setDescription(txt);
		embed_chat.setFooter(footer[0], footer[1]);
		embed_chat.setTimestamp();
		msg.channel.send(embed_chat);
	} catch {
		embed_error(msg, "Something went wrong!");
	}
}

function embed_chat_reply_header(msg, txt, header_text, pfp=true) {
	try {
		embed_chat = new Discord.MessageEmbed();
		embed_chat.setColor(embed_color_chat);
		embed_chat.setDescription(txt);
		if (pfp == true) {
			author = [header_text, "http://jared.servehttp.com/img/lion.jpg", ""]
		} else {
			author = [header_text, "", ""];
		}
		embed_chat.setAuthor(author[0], author[1], author[2]);
		embed_chat.setTimestamp();
		msg.channel.send(embed_chat);
	} catch {
		embed_error(msg, "Something went wrong!");
	}
}

function embed_error(msg, err_txt, error_header="Error!") {
	embed_err = new Discord.MessageEmbed();
	embed_err.setColor(embed_colour_error);
	embed_err.addField(error_header, err_txt);
	msg.channel.send(embed_err);
}

function embed_image(msg, img_url, footer_text, guild="msg", header="") {
	embed_img = new Discord.MessageEmbed();
	embed_img.setColor(embed_colour_img);
	embed_img.setImage(img_url);
	embed_img.setTimestamp();
	embed_img.setFooter(footer_text, "");
	if (header != "") {
		embed_img.setTitle(header);
	}
	try {
		if (guild == "channel") {
			msg.send(embed_img);
		} else {
			msg.channel.send(embed_img);
		}
	} catch {
		console.log("Failed to send image to server!");
	}
}

function embed_image_header(msg, img_url, header, footer_text) {
	embed_img = new Discord.MessageEmbed();
	embed_img.setColor(embed_colour_img);
	embed_img.setImage(img_url);
	embed_img.setTimestamp();
	embed_img.setFooter(footer_text + "\n\u200B", "");
	embed_img.setTitle(header);
	msg.channel.send(embed_img);
}

function embed_modderation(msg, txt, header_txt) {
	try {
		// find @ tag
		txt_array = txt.replace("<@!","").replace("<@","").split(">");
		current_user_ID = txt_array[0].split(" ").join("");
	
		embed_mod = new Discord.MessageEmbed();
		embed_mod.setColor(embed_colour_error);
		embed_mod.setTitle(header_txt);
		embed_mod.addField(txt_array[1]+"\n\u200B", "<@"+current_user_ID+">");
		embed_mod.setTimestamp();
		msg.channel.send(embed_mod);
	} catch {
		embed_error(msg, "Something went wrong!");
	}
}

function embed_input_output_reply(msg, input_data, output_data, title, description="", url="") {
	try {
		embed_IO = new Discord.MessageEmbed();
		embed_IO.setTitle(title);
		embed_IO.setURL(url); // set this to URL of the message
		embed_IO.setColor(embed_colour_info);
		if (description != "") {
			embed_IO.setDescription(description);
		}
		embed_IO.addFields(
			{name: "Input", value: "```"+input_data+"```"},
			{name: "Output", value: "``` "+output_data+" ```"}
		)
		embed_IO.setTimestamp();
		embed_IO.setFooter("JaredBot", "http://jared.servehttp.com/img/lion.jpg");
		msg.channel.send(embed_IO);
	} catch {
		embed_error(msg, "Something went wrong!");
	}
}

// get authorised server IDs
fs_auth = require('fs');
fs_auth.readFile(authorised_servers, "utf8", function(err, data) {
	if (err) {
		console.log(err);
		process.exit(1); // shut the bot down if it cant read IDs file
			
	} else {
		// append each ID to authorised IDs array
		raw_data = data.split("\n").join("").split(";");
		for (i=0;i<raw_data.length;i++) {
			if (isNaN(parseInt(raw_data[i])) == false) {
				authrosied_server_IDs.push(raw_data[i]);
			}
		} 
		console.log("Successfully read authorised server IDs!");
	}
})

// --- Main ---
//login
const Discord = require("discord.js");
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

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
	bot.user.setActivity(prefix+"help | JaredBot");
});

// commands
bot.on("message", msg=> {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if(msg.content === prefix+"testbot" || msg.content === prefix+"test") {
			testbot_embed = new Discord.MessageEmbed();
			testbot_embed.setColor(embed_colour_info);
			testbot_embed.setDescription("Jared Bot is online!");
			testbot_embed.setTimestamp();
			msg.channel.send(testbot_embed);
		}
	}
})

bot.on("message", msg => {
	if (msg.content == prefix+"help" || msg.content == prefix+"commands") {
		help_embed = new Discord.MessageEmbed();
		help_embed.setColor(embed_colour_info);
		help_embed.setTitle("Command list");
		help_embed.setDescription("To get more information about a specific command module, type `help {module name}`, For example `-help chat` will show detailed infromation about all of the chat commands!")
		help_embed.setThumbnail("http://jared.servehttp.com/img/cat1.jpg");
		help_embed.addFields(
			{name: "Tools", value: "`remind me`, `timer`, `stopwatch`, `execute`, `translate`, `roman`, `suggest`\n\u200B"},
			{name: "Info", value: "`invitelink`, `author`, `membercount`, `servercount`, `testbot`, `uptime`, `steaminfo`, `prefix`, `rules`, `rule`, `tos`, `element`, `table`, `periodictable`, `pokemon`, `perm`, `userinfo`\n\u200B"},
			{name: "Chat commands", value: "`default dance`, `say`, `do you`, `is`, `will`, `howgay`, `imbored`, `random name`, `bot`, `kill`, `stop`, `autoresponse`, `replychance`, `8ball`\n\u200B"},
			{name: "Image Commands", value: "`random animal`, `hentai`, `boob`, `nude`, `meme`, `catmeme`, `flipcoin`, `roll`, `cat`, `dog`, `chpper`, `dogmeme`, `car`, `snake`, `owo`, `hug`\n\u200B"},
			{name: "Games", value: "`rock/paper/scissors`, `higherlower`, `ttt`\n\u200B"},
			{name: "Maths", value: "`hex`,`bin`,`oct`,`base`, `base2int`, `oct2int`, `hex2int`, `isleap`, `bmi`, `c`, `f`, `saynum`, `hash`, `shift`, `calc`\n\u200B"},
			{name: "Admin/Mod Commands", value: "`announce`, `mute`, `unmute`, `tempmute`, `kick`, `ban`, `unban`, `tempban`, `logging`, `prefix`, `snipe`, `snipping`, `exit`, `bot restart`, `filter`, `clearlog`, `purge`, `automod`, `autohentai`, `autonude`\n\u200B"}
		)
		msg.channel.send(help_embed);
		
	}
})

// new line "\n\u200B"

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) === prefix+"help ") {
			module_name = msg.content.slice(6, msg.content.length).toLowerCase();
			
			help_module_embed = new Discord.MessageEmbed();
			help_module_embed.setColor(embed_colour_info)
			
			if (module_name == "tools") {
				help_module_embed.setTitle("Help Tools");
				help_module_embed.addFields (
					{name: "remind me {reminder} {No. min/sec}", value: "sets a reminder, the bot will ping you in the specified number of seconds. For example `-remind me to check steam in 10 mins`, will ping you in 10 mins telling you to check steam.\n\u200B"},
					{name: "-timer {HH:MM:SS}", value: "sets a timer, the bot will ping you after the specified number of seconds, for example `-timer 00:10:30`, will ping you after 10 mins and 30 seconds.\n\u200B"},
					{name: "-stopwatch {start/stop}", value: " `-stopwatch start` starts a stopwatch, to stop the stopwatch you can then type `-stopwatch stop`, the bot will then tell you how much time has passed between you starting and stopping the stopwatch.\n\u200B"},
					{name: "-execute {code}", value: "executes some Python code, for example `-execute print(list(filter(None, [i if i%2==0 else '' for i in range(100)])))` will print all even number up to 100.\n\u200B"},
					{name: "-translate {text}", value: "Translate text in other languages back into English, for example `-translate cómo estás` will display `how are you`.\n\u200B"},
					{name: "-roman {num}", value: "Converts an integer into roman numerals, for example `-roman 2020` will display `MMXX`.\n\u200B"},
					{name: "-suggest -bug", value: "use this command to make a suggestion on how to improve the server, or to report a bug, syntax for the command is `-bug {text}` or `-suggest {text}`, your suggestion will automtically appear on the Jared Network suggestions channel.\n\u200B"}
				)
				msg.channel.send(help_module_embed);
			} else if (module_name == "info") {
				help_module_embed.setTitle("Help Info");
				help_module_embed.addFields (
					{name: "-invitelink", value: "shows an invite link to the Jared Network discord server.\n\u200B"},
					{name: "-author", value: "Shows who the bot was created by Jared Turck, and displays links to steam account so you can contact me.\n\u200B"},
					{name: "-membercount", value: "Shows the total number of members on the server.\n\u200B"},
					{name: "-servercount", value: "Shows the total number of servers Jared bot is authorised on.\n\u200B"},
					{name: "-testbot", value: "Checks if the bot is online, if you dont get a response then the bot is offline.\n\u200B"},
					{name: "-uptime", value: "Shows the amount of time the bot has been online for, since the last restart.\n\u200B"},
					{name: "-steaminfo {ID}", value: "Shows basic profile statistics for a steam user, for example `-steaminfo JaredCat` will shows the stats for my steam account, you can also specify a profile URL `-steaminfo https://steamcommunity.com/id/jaredcat` will also display my profile stats.\n\u200B"},
					{name: "-prefix", value: "shows the current prefix used by the bot, the default prefix used by the bot is `-`.\n\u200B"},
					{name: "-rules", value: "shows a list of the rules for the Jared Network discord server.\n\u200B"},
					{name: "-rule [1-8]", value: "display a specific rule, for example `-rule 8` will display the 8th rule on the server.\n\u200B"},
					{name: "-tos", value: "Shows the Discord Community Guidelines."},
					{name: "-element {elm num}", value: "displays statistics about a specific element on the periodic table, for example `-element 79` will displays stats on gold.\n\u200B"},
					{name: "-table or -periodictable", value: "displays a photo of the periodic table, you can use this command for example to get the number of an element, and then use the `-element` command to get more info on that element.\n\u200B"},
					{name: "-pokemon", value: "displays information on pokemon, you can specify a pokemon by index, for example -pokemon 39 will show info for Jigglypuff , or by name e.g. `-pokemon Pikachu` for info on Pikachu!\n\u200B"},
					{name: "-perm @user", value: "displays users permissions for the server they are currently on.\n\u200B"},
					{name: "-userinfo @user", value: "displays information about a specific discord user.\n\u200B"}
				)
				msg.channel.send(help_module_embed);
			} else if (module_name == "chat" || module_name == "chat commands") {
				help_module_embed.setTitle("Help Chat Commands");
				help_module_embed.addFields (
					{name: "-default dance", value: "spams the server chat with an ASCII text art representation of the default dance.\n\u200B"},
					{name: "-say {text}", value: "The bot will repeat whatever you say, for example `-say Hello` will make the bot will say `Hello` back.\n\u200B"},
					{name: "-do you/is/will {question}", value: "The bot will answer a yes or no question, for example `-do you think there will be a WW3?`, `-is the earth flat?`, `-will i ever get a gf?` the bot will then answer yes or no.\n\u200B"},
					{name: "-howgay @user", value: "Gives a percentage of how gay you are `-howgay` or how gay another user is for example `-hoygay @Jared` will show hoy gay Jared is.\n\u200B"},
					{name: "-imbored", value: "Gives you something random to do, use this command to get sugestions of stuff to do when you bored and dont know what to do.\n\u200B"},
					{name: "-random name", value: "Gives you a random first and last name, can be useful if you need a fake name for online form.\n\u200B"},
					{name: "-bot {message}", value: "Lets you talk to an Artificial Intelligence (AI) powered chat bot.\n\u200B"},
					{name: "-kill @user", value: "Kill the specified user, syntax for the command is kill then the users @ tag.\n\u200B"},
					{name: "-stop", value: "This disables the bots auto response, auto response is a feature where the bot will sometimes randomly repeat messages, for example you type hello and the bot responds hi. Use this command if the auto response feature is annoying or the bot is spamming."},
					{name: "-autoresponse", value: "enabled autoresponse, the bot will begin randomly repeating messages again.\n\u200B"},
					{name: "-replychance {num}", value: "sets how often the bots auto response will reply to messages, the higher the value the less the bot will respond to messages, for example `-replychance 2` the bot will respond 50% of the time, `-replychance 4` the bot will respond 25% of the time.\n\u200B"},
					{name: "-choose or -choice", value: "the bot will randomly choose an option from a list, each item in your list can be seperated with commas or a number and dot, for example `-choose cat, dog, mouse, fish` or `-choice 1. cat 2. dog 3. mouse 4. fish` the bot will random pick of of those 4 animals.\n\u200B"},
					{name: "-8ball {question}", value: "lets you ask the 8ball a question, and see what the response is.\n\u200B"},
					{name: "-font {font num} {text}", value: "converts text into a fancy unicode font, for example `-font 1 Jared` will be converted to `𝓳𝓪𝓻𝓮𝓭`, the font number is the font you would like to use on the text. (im still working on this feature it's currently broken).\n\u200B"}
				)
				msg.channel.send(help_module_embed);
			} else if (module_name == "img" || module_name == "image" || module_name == "image commands") {
				help_module_embed.setTitle("Help Image Commands");
				help_module_embed.addFields (
					{name: "-random animal", value: "Shows a photo of a random animal.\n\u200B"},
					{name: "-hentai", value: "Shows a random hentai photo, this is an NSFW command and can only be used in NSFW channels.\n\u200B"},
					{name: "-boob", value: "posts a photo of some boobs, this is an NSFW command and can only be used in NSFW channels.\n\u200B"},
					{name: "-nude", value: "posts a photo of a nude girl, this is an NSFW command and can only be used in NSFW channels.\n\u200B"},
					{name: "-meme", value: "Shows a random meme.\n\u200B"},
					{name: "-catmeme", value: "Shows a random cat meme."},
					{name: "-flipcoin", value: "Flips a coin, the coin could land on heads or tails.\n\u200B"},
					{name: "-roll", value: "rolls a dice, the dice could land on any face from 1-6.\n\u200B"},
					{name: "-cat -meow", value: "shows a random cat photo.\n\u200B"},
					{name: "-dog -woof", value: "shows a random dog photo.\n\u200B"},
					{name: "-heli -chpper", value: "shows a photo of a helicopter.\n\u200B"},
					{name: "-dogmeme", value: "posts a random dog meme.\n\u200B"},
					{name: "-car", value: "posts a random photo of a car.\n\u200B"},
					{name: "-snake", value: "posts a random photo of a snake.\n\u200B"},
					{name: "-owo", value: "show affection towards another user with a reaction image.\n\u200B"},
					{name: "-hug @user", value: "lets you hug another user"}
				)
				msg.channel.send(help_module_embed);
			} else if (module_name == "game" || module_name == "games") {
				help_module_embed.setTitle("Help Games");
				help_module_embed.addFields (
					{name: "-rock, -paper, -scissors", value: "Play a game of rock paper scissors with the bot, you can type `-rock` for rock, `-paper` for paper, or `-scissors` for scissors.\n\u200B"},
					{name: "-higherlower", value: "Play a game where you have to try and guess a secret number between 1 and 100 in as few tries as possible, after every guess the bot will tell you if your guess was higher or lower then there secret number.\n\u200B"},
					{name: "-ttt", value: "Play a game of TicTacToe against the bot, take it in turns to place a mark on a 3x3 grid, first person to get 3 in a row wins (im still currently working on this game).\n\u200B"}
				)
				msg.channel.send(help_module_embed);
			} else if (module_name == "math" || module_name == "maths") {
				help_module_embed.setTitle("Help Maths");
				help_module_embed.addFields (
					{name: "-hex, -bin, -oct", value: "these commands convert a decimal integer to the base 2, 8 and 16 number system, i.e. `-hex` converts decimal to hexadecimal `-hex 4003` becomes `fa3`, `-oct` converts decimal to octal decimal `-oct 59` becomes `73`, `-bin` converts decimal to binary so `-bin 456` becomes `111001000`.\n\u200B"},
					{name: "-base{base}", value: "This command converts a decimal integer to any specified number system, for example `-base24 258` becomes `ai`, or `-base14 69` becomes `4d`.\n\u200B"},
					{name: "-bin2int, -oct2int, -hex2int", value: "Converts a base 2, 8, or 16 integers to base 10 denary, for example `-bin2int 1010101101` becomes `685`, `-oct2int 25360` becomes `10992`, and `-hex2int ff2ac2` becomes `16722626`.\n\u200B"},
					{name: "-bin2text, -oct2text, -hex2text", value: "Converts base 2, 8, or 16 list of integers (seperated by spaces) to base 10 denary, then converts the integers to unicode characters. For example `-bin2text 1101000 1100101 1101100 1101100 1101111` becomes `hello`, `-oct2text 150 145 171` becomes `hey`, and `-hex2text 4a 61 72 65 64 20 69 73 20 61 77 65 73 6f 6d 65` becomes `Jared is awesome`.\n\u200B"},
					{name: "-isleap {year}", value: "Checks if the specified year is a leap year, for example `-isleap 2020` returns `true`, or `-isleap 1966` returns `false`.\n\u200B"},
					{name: "-bmi {height cm} {weight kg}", value: "calculates the bmi of the specified height and weight values, for example `-bmi 180 50` displays underweight.\n\u200B"},
					{name: "-c and -f", value: "converts between Celsius (-c) and Fahrenheit (-f), for example `-c 24` becomes `75.2` Fahrenheit, or `-f 110` becomes `43.3` Celsius.\n\u200B"},
					{name: "-saynum {num}", value: "converts a base 10 denary integer to written english, for example `-saynum 1` becomes `one`, and `-saynum -47623.9` becomes `minus fourty seven thousand, six hundred and twenty three point nine`.\n\u200B"},
					{name: "-hash", value: "generates a message digest of a given string, supports both MD5 and SHA2 hash functions, type `-hash` for more information on the command.\n\u200B"},
					{name: "-shift{num} {text}", value: "Uses the Caesar Shift Cipher, to shift the characters in a string the specified number of times, for example `-shift2 aaa` becomes `ccc` (still working on this command).\n\u200B"},
					{name: "-calc {equation}", value: "allows you to preform a mathimatical calculation, for example `-calc 2**10 + 4/7` returns `146.8`, type `-calc` for more information on the command.\n\u200B"}
				)
				msg.channel.send(help_module_embed);
			} else if (module_name == "admin" || module_name == "mod" || module_name == "admin/mod" || module_name == "admin/mod commands") {
				help_module_embed.setTitle("Help Admin/Mod commands");
				help_module_embed.addFields (
					{name: "-announce {text}", value: "Allows you to send an announcement to multiple servers!\n\u200B"},
					{name: "-mute @user", value: "Mutes a user preventing them from speaking and messaging in channels, beaware that muted users can still read the chat, they just cannot respond or talk back. the syntax for the command is `-mute @user`, you can also specify a reason after the @ tag for the mute if you want too, for example `-mute @jared for spamming!`.\n\u200B"},
					{name: "-unmute @user", value: "unmutes the user allowing them to talk again in both text and voice channels on the server, beaware that users that have been unmuted will be able to edit previos messages and fully interact within the channels channels again, the syntax for the command is `-unmute @user`.\n\u200B"},
					{name: "-tempmute @user {length mins}", value: "allows you to temporerly mute a user for a specified amount of time, the bot will then unmute that user after the specified length of time is complete, the syntax for the command is `-tempmute @user {length in mins}`, for example `-tempmute @jared 5` will mute jared for 5 mins. Make sure that your length is an integer, if you want to mute a user for an hour you would type 60, and 24 hours 1 day would be 1440 mins e.g. `-tempmute @user 1440`.\n\u200B"},
					{name: "-kick @user", value: "kicks a user from the server, beaware that once a user has been kicked from the server they can still join back if they have an invite link. Once a user is kicked all of there roles are lost, so if they do join back they wont have any of the previous roles they had. The syntax for the command is `-kick @user`, for example `-kick @jared` will kick Jared from the server, you can also sepcify a reason for the kick e.g. `-kick @jared for spamming`.\n\u200B"},
					{name: "-ban @user", value: "Bans a user from the server, once a user is banned they cannot join the server again even if they have an invite link, bans are also IP based which in most cases prevents from from joining the server again on an alt account. The syntax for the command is `-ban @user`, for example `-ban @jared` ban Jared from the server, you can also specify a reason for the ban e.g. `-ban @jared for organsing a raid`.\n\u200B"},
					{name: "-unban {User ID}", value: "Allows you to unban a user from the server, you can't @ someone who isn't in the server, so you will need to specify the users ID when unbanning them. You can get the banned users ID by right clicking on a previous message they have sent and clicking copy ID, for example to unban Jared from a server the command would be `-unban 738484352568262747`.\n\u200B"},
					{name: "-tempban @user {length mins}", value: "Temporerly bans a user from the server for a specified length of time, then unbans them. Syntax is `-tempban @user {length in mins}` for example `-tempban @jared 60` would ban jared for 1 hour, for 24 hours 1 day you would type 1440 mins.\n\u200B"},
					{name: "-logging [on/off]", value: "Toggle between turning logging on or off, logging is where messages are recorded in the server and saved to a log file, turning logging on will result in all messages being saved to a log file, this is very useful for looking at conversation history.\n\u200B"},
					{name: "-prefix {prefix}", value: "Allows you to change the prefix of the bot, the syntax for this command is `-prefix {new prefix}` for example to change JaredBot's prefix to `.` you would type `-prefix .`.\n\u200B"},
					{name: "-snipe", value: "This command shows all messages that have been recently deleted, please beaware the command could show some inappropriate or offensive content, as it also shows messages that where deleted by JaredBot's contenting filtering, as tell as message which where manually deleted by a user. also be beaware the log file is clear every 24 hours, so you wont be able to see deleted messages from a few days ago.\n\u200B"},
					{name: "-snipping [on/off]", value: "turn snipping on or off, snipping is a feature that logs recently deleted messages, turnning snipping on `-snipping on` will result in all messages that where recently deleted being logged. You can then view the contents on this log file with the `-snipe` command.\n\u200B"},
					{name: "-filter [on/off]", value: "turn content filtering on or off, content filtering is a feature that automatically blocks offensive or unwanted content such as: links to porn sites, repeating messages (spam), offensive or alarming language, and deletes links to other discord servers.\n\u200B"},
					{name: "-exit", value: "shuts the entire bot down, taking JaredBot offline. Only Jared can use this command, it's designed to be used during development incase something goes wrong Jared can shut the bot down for whatever reason.\n\u200B"},
					{name: "-bot restart", value: "restarts the bot, only Jared can use this command, used during development for restarting the bot.\n\u200B"},
					{name: "-clearlog", value: "clears the deleted messages log file, any messages that are stored in the log file will be removed.\n\u200B"},
					{name: "-purge", value: "Deletes the specified amount of messages from the channel, e.g. `-purge 20` will delete the last 20 message that where sent in the channel, useful command for example for deleting messages are a raid or user spamming.\n\u200B"},
					{name: "-automod", value: "Automod is a feature where the bot will mute, kick or ban users who get to many warnings, type `-automod help` for more information on how to use the feature."},
					{name: "-automeme [on/off] {length}", value: "AutoMeme is a feature where the bot will automatically post a meme after a specified perioid of time, for example `-automeme on 10` will post a meme every 10 mins. To disable automeme just run the `-automeme off` command.\n\u200B"},
					{name: "-autonude -autohentai", value: "As well as AutoMeme the bot can also be configured to automatically post Hentai and NSFW photos, for example to get AutoNude to post a photo every 5 mins you would type `-autonude on 5`, and to tuen it off type `-autonude off`. Both the AutoNude and AutoHentai commands can only be used in NSFW channels.\n\u200B"}
				)
				msg.channel.send(help_module_embed);
			} else {
				help_module_embed.setColor(embed_colour_error);
				help_module_embed.setDescription("Not a valid module! Please type `help` for a list of modules!");
				msg.channel.send(help_module_embed);
			}
		}
	}
})

// Discord Community Guidlines
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"tos") {
			ToSURL = "https://a.uk"
			embed_tos = new Discord.MessageEmbed();
			embed_tos.setColor(embed_colour_info);
			embed_tos.setTitle("Discord Community Guidelines");
			embed_tos.setURL(ToSURL);
			embed_tos.setDescription("We created Discord to help people come together around games. Our community guidelines are meant to "+
			"explain what is and isn’t allowed on Discord, and ensure that everyone has a good experience. If you come across a message that "+
			"appears to break these rules, please report it to us. We may take a number of steps, including issuing a warning, removing the "+
			"content, or removing the accounts and/or servers responsible.\n\u200B");
			embed_tos.addFields(
				{name: "Interacting with others", value:
					"[1]("+ToSURL+"). Do not organize, participate in, or encourage **harassment** of others.\n"+
					"[2]("+ToSURL+"). Do not organize, promote, or coordinate servers around **hate speech**.\n"+
					"[3]("+ToSURL+"). Do not make threats of violence or **threaten to harm** others.\n"+
					"[4]("+ToSURL+"). Do not **evade user blocks** or server bans.\n"+
					"[5]("+ToSURL+"). Do not send others **viruses or malware**.\n\u200B"
				},
				{name : "Rules for content", value:
					"[6]("+ToSURL+"). You must apply the NSFW label to channels if there is **adult content** in that channel.\n"+
					"[7]("+ToSURL+"). You may not **sexualize minors** in any way.\n"+
					"[8]("+ToSURL+"). You may not share sexually **explicit content** of other people without their **consent**.\n"+
					"[9]("+ToSURL+"). You may not share content that **glorifies** or promotes suicide or **self-harm**.\n"+
					"[10]("+ToSURL+"). You may not share images of sadistic gore or **animal cruelty**.\n"+
					"[11]("+ToSURL+"). You may not use Discord for the organization, promotion, or support of **violent extremism**.\n"+
					"[12]("+ToSURL+"). You may not operate a server that **sells** or facilitates the sales of prohibited or potentially **dangerous goods**.\n"+
					"[13]("+ToSURL+"). You may not promote, distribute, or provide access to content involving the **hacking**, cracking, or distribution "+
					"of **pirated software** or stolen accounts.\n"+
					"[14]("+ToSURL+"). In general, you should not promote, encourage or engage in any **illegal behavior**.\n\u200B"
				},
				{name : "Respect Discord itself", value:
					"[15]("+ToSURL+"). You may not **sell your account** or your server.\n"+
					"[16]("+ToSURL+"). You may not use **self-bots** or user-bots to access Discord.\n"+
					"[17]("+ToSURL+"). You may not share content that violates anyone's **intellectual property** or other rights.\n"+
					"[18]("+ToSURL+"). You may not **spam Discord**, especially our Customer Support and Trust & Safety teams.\n\u200B"
				},
			)
			embed_tos.setTimestamp();
			embed_tos.setFooter("If you see any activity that violates these guidelines, you can report it");
			msg.channel.send(embed_tos);
		}
	}
})

// rules
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"rules") {
			embed_rules = new Discord.MessageEmbed();
			embed_rules.setColor(embed_colour_info);
			embed_rules.setTitle("Rules");
			embed_rules.setURL("https://discord.com/channels/738484352568262747/751827982087094322/751857233972690967");
			embed_rules.addFields(
				{name: "Rule 1", value: "Only post porn in the NSFW channels (please only softcore)\n\u200B"},
				{name: "Rule 2", value: "No phishing website links\n\u200B"},
				{name: "Rule 3", value: "No spamming the same repetitive message, over a short period of time (This rule applies to all channels excluding the botspam and jared-bot channels, feel free to spam as many bot commands as you want in botspam).\n\u200B"},
				{name: "Rule 4", value: "Don’t be a dick or bully others, be kind\n\u200B"},
				{name: "Rule 5", value: "Only post promotions in the advertisement channel\n\u200B"},
				{name: "Rule 6", value: "No raids (includes spamming lots of messages, pinging lots of people with @ tags)\n\u200B"},
				{name: "Rule 7", value: "No asking to be moderator\n\u200B"},
				{name: "Rule 8", value: "No sending offensive, or alarming messages with the intent to get a reaction out of others (This includes racist, prejudice, sexist, homophobic jokes, or promoting/normalizing terrorism and or rape).\n\u200B"},
			)
			if (rules_include_footer == true) {
				embed_rules.setFooter("\n\u200BClick the ✅ to verify and gain access to the rest of the server!");
				embed_rules.setImage("http://jared.servehttp.com/img/src/white_checkmark.gif");
			}
			msg.channel.send(embed_rules);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,6) == prefix+"rule ") {
			rule_no = msg.content.slice(6, msg.content.length);
			embed_rule = new Discord.MessageEmbed();
			embed_rule.setColor(embed_colour_info);
			switch (rule_no) {
				case "1":
					embed_rule.addField("Rule 1", "Only post porn in the NSFW channels (please only softcore)");
					msg.channel.send(embed_rule);
					break;
				case "2":
					embed_rule.addField("Rule 2", "No phishing website links");
					msg.channel.send(embed_rule);
					break;
				case "3":
					embed_rule.addField("Rule 3", "No spamming the same repetitive message, over a short period of time (This rule applies to all channels excluding the `botspam` and `jared-bot` channels, feel free to spam as many bot commands as you want in botspam).");
					msg.channel.send(embed_rule);
					break;
				case "4":
					embed_rule.addField("Rule 4", "Don’t be a dick or bully others, be kind");
					msg.channel.send(embed_rule);
					break;
				case "5":
					embed_rule.addField("Rule 5", "Only post promotions in the advertisement channel");
					msg.channel.send(embed_rule);
					break;
				case "6":
					embed_rule.addField("Rule 6", "No raids (includes spamming lots of messages, pinging lots of people with @ tags)");
					msg.channel.send(embed_rule);
					break;
				case "7":
					embed_rule.addField("Rule 7", "No asking to be moderator");
					msg.channel.send(embed_rule);
					break;
				case "8":
					embed_rule.addField("Rule 8", "No sending offensive, or alarming messages with the intent to get a reaction out of others");
					msg.channel.send(embed_rule);
					break;
				default:
					embed_rule.setColor(embed_colour_error);
					embed_rule.addField("Error", "Invalid Rule! the Syntax for command is `-rule [1-8]`!");
					msg.channel.send(embed_rule);
					break;
			}
		}
	}
})

// report bug / make suggestion
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 11) == prefix+"reportbug " || msg.content.slice(0, 5) == prefix+"bug "
		|| msg.content.slice(0, 9) == prefix+"suggest " || msg.content.slice(0, 12) == prefix+"suggestion ") {
			type_dict = {"reportbug":"Bug", "bug":"Bug", "suggest":"Suggestion", "suggestion":"Suggestion"};
			type = type_dict[msg.content.slice(1, msg.content.split(" ")[0].length)];
			description = msg.content.split(/ (.+)/)[1];
			
			// user
			nametag = msg.member.user.tag.split("#")[0];
			profile_pic = msg.author.avatarURL();
			
			if (description != "") {
				// embed
				embed_suggestion = new Discord.MessageEmbed();
				embed_suggestion.setColor(embed_color_chat);
				embed_suggestion.setTitle(type);
				embed_suggestion.setAuthor(nametag + " | " + msg.guild.name, profile_pic, "");
				embed_suggestion.setDescription(description);
				embed_suggestion.setTimestamp();
				bot.channels.cache.get(suggestions_channel_ID).send(embed_suggestion);
				embed_info_reply(msg, "Your " + type + "has been posted in the Jared Network Suggestions channel, thank you for your feedback!");
				
			} else {
				embed_error(msg, "Your Description cannot be blank!");
			}
		}
	}
})

// self roles
bot.on("message", msg => {
	if (msg.content == prefix+"selfroles") {
		// only Jared can use selfroles command
		if (msg.author.id == "364787379518701569") {
			//relationship status
			embed_selfroles_relationship = new Discord.MessageEmbed();
			embed_selfroles_relationship.setColor(embed_color_chat);
			embed_selfroles_relationship.setTitle("Relationship Status");
			embed_selfroles_relationship.setDescription("Choose Your Relationship Status by reacting to this message");
			embed_selfroles_relationship.addFields(
				{name: "Single", value: "⭕️", inline:true},
				{name: "Taken", value: ":x:", inline:true},
				{name: "Married", value: "💍", inline:true},
			)
			
			msg.channel.send(embed_selfroles_relationship).then(function(msg){
				msg.react("⭕");
				msg.react("❌");
				msg.react("💍");
			})

			//Games
			embed_selfroles_games = new Discord.MessageEmbed();
			embed_selfroles_games.setColor(embed_color_chat);
			embed_selfroles_games.setTitle("Games");
			embed_selfroles_games.setDescription("Choose which games you play by reacting to this message");
			embed_selfroles_games.addFields(
				{name: "Minecraft", value: "⛏️", inline:true},
				{name: "CSGO", value: "🔫", inline:true},
				{name: "tetris", value: "🔽", inline:true},
				{name: "skyrim", value: "🗡️", inline:true},
				{name: "genshin", value: "💎", inline:true},
				{name: "Among Us", value: "🔪", inline:true},
				{name: "L4d2", value: "🧟", inline:true},
				{name: "Hearts of Iron 4", value: "🗺️", inline:true},
				{name: "GTAV", value: "🚔", inline:true},
				{name: "AC", value: "⚔️", inline:true},
			)
			
			msg.channel.send(embed_selfroles_games).then(function(msg){
				msg.react("⛏️"); //Minecraft
				msg.react("🔫"); //CSGO
				msg.react("🔽"); //Tetris
				msg.react("🗡️"); //Skyrim
				msg.react("💎"); //Genshin
				msg.react("🔪"); //Among Us
				msg.react("🧟"); //L4d2
				msg.react("🗺️"); //Hearts of Iron 4
				msg.react("🚔"); //GTAV
				msg.react("⚔️"); //AC
			})

			//Religion
			embed_selfroles_religion = new Discord.MessageEmbed();
			embed_selfroles_religion.setColor(embed_color_chat);
			embed_selfroles_religion.setTitle("Games");
			embed_selfroles_religion.setDescription("Choose which games you play by reacting to this message");
			embed_selfroles_religion.addFields(
				{name: "Christian", value: "✝️", inline:true},
				{name: "Muslim", value: "💣", inline:true},
				{name: "Buddhists", value: "🗿", inline:true},
				{name: "Hinduism", value: "🐲", inline:true},
				{name: "Jewish", value: "🕎", inline:true},
				{name: "Atheist", value: "🧪", inline:true},
				{name: "Other", value: "❓", inline:true},
			)
			
			msg.channel.send(embed_selfroles_religion).then(function(msg){
				msg.react("✝️"); //Christian
				msg.react("💣"); //Muslim
				msg.react("🗿"); //Buddhists
				msg.react("🐲"); //Hinduism
				msg.react("🕎"); //Jewish
				msg.react("🧪"); //Atheist
				msg.react("❓"); //other
			})
			
			//Religion (religion Christian/Catholic/Muslim/Buddhists/Hinduism/Jewish/Atheist/other)

			//Gender
			embed_selfroles.setTitle("Religion");
			embed_selfroles.setDescription("Choose which religion you are by reacting to this message");
			embed_selfroles.addFields(
				{name: "Male", value: "♂️", inline:true},
				{name: "Female", value: "♀️", inline:true},
				{name: "Other", value: "❓", inline:true},
			)
			
			msg.channel.send(embed_selfroles).then(function(msg){
				msg.react("♂️");
				msg.react("♀️");
				msg.react("❓");
			})

			//Country
			embed_selfroles.setTitle("Country");
			embed_selfroles.setDescription("Choose where in the world you are from by reacting to this message.");
			embed_selfroles.addFields(
				{name: "Africa", value: "🌍", inline:true},
				{name: "Asia", value: "🗾", inline:true},
				{name: "North America", value: "🌎", inline:true},
				{name: "South America", value: "🌐", inline:true},
				{name: "Europe", value: "🗺️", inline:true},
				{name: "Oceania", value: "🌏", inline:true},
			)
			
			msg.channel.send(embed_selfroles).then(function(msg){
				msg.react("🌍");
				msg.react("🗾");
				msg.react("🌎");
				msg.react("🌐");
				msg.react("🗺️");
				msg.react("🌏");
			})

			//Age
			embed_selfroles.setTitle("Age");
			embed_selfroles.setDescription("Choose your age by reacting to this message.");
			embed_selfroles.addFields(
				{name: "<13", value: "🕑", inline:true},
				{name: "14-15", value: "🕗", inline:true},
				{name: "16-17", value: "🕒", inline:true},
				{name: "17-18", value: "🕘", inline:true},
				{name: "19-20", value: "🕙", inline:true},
				{name: "21-25", value: "🕓", inline:true},
				{name: "26+", value: "🕔", inline:true},
			)
			
			msg.channel.send(embed_selfroles).then(function(msg){
				msg.react("🕑");
				msg.react("🕗");
				msg.react("🕒");
				msg.react("🕘");
				msg.react("🕙");
				msg.react("🕓");
				msg.react("🕔");
			})

			//Personality
			embed_selfroles.setTitle("Personality");
			embed_selfroles.setDescription("");
			embed_selfroles.addFields(
				{name: "Kind", value: "🎁", inline:true},
				{name: "Unkind", value: "🔪", inline:true},
				{name: "Honest", value: "👨‍👨‍👦", inline:true},
				{name: "Dishonest", value: "😱", inline:true},
				{name: "Intelligent", value: "💡", inline:true},
				{name: "Stupid", value: "💊", inline:true},
				{name: "Trustworthy", value: "👫", inline:true},
				{name: "Unreliable", value: "⏰", inline:true},
				{name: "Patient", value: "💺", inline:true},
				{name: "Impatient", value: "😠", inline:true},
				{name: "Quiet/Shy", value: "", inline:true},
				{name: "Sociable", value: "", inline:true},
			)
			
			msg.channel.send(embed_selfroles).then(function(msg){
				msg.react("🎁");
				msg.react("🔪");
				msg.react("👨‍👨‍👦");
				msg.react("😱");
				msg.react("💡");
				msg.react("💊");
				msg.react("👫");
				msg.react("⏰");
				msg.react("💺");
				msg.react("😠");
				msg.react("");
			})

			//Political Ideology
			embed_selfroles.setTitle("");
			embed_selfroles.setDescription("");
			embed_selfroles.addFields(
				{name: "", value: "", inline:true},
				{name: "", value: "", inline:true},
				{name: "", value: "", inline:true},
			)
			
			msg.channel.send(embed_selfroles).then(function(msg){
				msg.react("");
				msg.react("");
				msg.react("");
			})
			
		}
	}
	
	
})

// you will need to manually add the reaction IDs
bot.on("messageReactionAdd", async(reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log(error);
			return;
		}
	}
	
	console.log([reaction.message.author]);
	
})






// yes or no questions
bot.on("message", msg=> {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,5).toLowerCase() === prefix+"say ") {
			//msg.reply();
			embed_say = new Discord.MessageEmbed();
			embed_say.setColor(embed_color_chat);
			embed_say.setDescription(msg.content.slice(4, msg.content.length));
			embed_say.setAuthor("JaredBot", "http://jared.servehttp.com/img/lion.jpg", "");
			embed_say.setTimestamp();
			msg.channel.send(embed_say);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,8).toLowerCase() === prefix+"do you " || msg.content.slice(0,6) === prefix+"do u ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,4).toLowerCase() == prefix+"is ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,8).toLowerCase() == prefix+"should ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,8).toLowerCase() === prefix+"howgay " || msg.content === prefix+"howgay") {
			if (msg.content === prefix+"howgay") {
				embed_chat_reply_header(msg, "You are " + String(parseInt(Math.random()*100)) + "% gay!", "Gay Detector", pfp=false);
			} else {
				name = msg.content.replace(" is "," ").split(" ")[1];
				embed_chat_reply_header(msg, name + " is " + String(parseInt(Math.random()*100)) + "% gay!", "Gay Detector", pfp=false);
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,6).toLowerCase() === prefix+"will ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

// 8 ball
answers = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", 
"Concentrate and ask again.", "Don’t count on it.", "It is certain.", "It is decidedly so.", 
"Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", 
"Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", 
"Yes – definitely.", "You may rely on it."];

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 7) == prefix+"8ball ") {
			question = msg.content.slice(7, msg.content.length);
			embed_chat_reply(msg, answers[parseInt(Math.random() * 100) % answers.length]);
		}
	}
})

// post henati
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() === prefix+"hentai") {
			if (msg.channel.nsfw == true) { 
				if (hentai_user_python == true) {
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
					embed_image(msg, webserver_hentai_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % hentai_database_count).slice(-5) +".png", "hentai");
				}
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
			}
		}
	}
})

// post boobs
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"boob") {
			if (msg.channel.nsfw == true) {
				// databse size
				boobs_dataset_count = 1621;
				
				// send message
				url = webserver_boobs_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % boobs_dataset_count).slice(-5) + ".png";
				embed_image(msg, url, "Boobs!");
				
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
			}
		}
	}
})

// owo
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"owo ") {
			command = msg.content.slice(5, msg.content.length).toLowerCase().split(" ")[0];
			owo_datset = {
				"bite" : 1115, "blush" : 1111, "boop" : 1121, "bully" : 1121, "cry" : 974, "cuddle" : 1087, "dance" : 1115, "greet" : 1101,
				"grin" : 1110, "handholding" : 1003, "happy" : 991, "highfive" : 841, "hold" : 1115, "hug" : 1091, "kill" : 1122, "kiss" : 1051,
				"lewd" : 740, "lick" : 1113, "nom" : 1120, "pat" : 853, "poke" : 1116, "pout" : 1119, "punch" : 1119, "scoff" : 1103, "shrug" : 1017,
				"slap" : 959, "sleepy" : 1010, "smile" : 1114, "smug" : 1061, "snuggle" : 1097, "stare" : 1113, "thinking" : 1122, "thumbs" : 943,
				"thumbsup" : 1113, "tickle" : 9, "triggered" : 1042, "wag" : 1100, "wave" : 1119
			}
			
			if (Object.keys(owo_datset).indexOf(command) > -1) {
				file_name = ("00000" + (parseInt(Math.random() * 1000) % owo_datset[command])).slice(-5) + ".gif";
				embed_image(msg, webserver_owo_dataset + "/" + command + "/" + file_name, command);
			}
			
		} else if (msg.content == prefix+"owo") {
			commands = "`bite`, `blush`, `boop`, `bully`, `cry`, `cuddle`, `dance`, `greet`, `grin`, `handholding`, `happy`, `highfive`, "+
			"`hold`, `hug`, `kill`, `kiss`, `lewd`, `lick`, `nom`, `pat`, `poke`, `pout`, `punch`, `scoff`, `shrug`, `slap`, `sleepy`, `smile`, "+
			"`smug`, `snuggle`, `stare`, `thinking`, `thumbs`, `thumbsup`, `tickle`, `triggered`, `wag`, `wave`";
			
			embed_info_reply(msg, "The owo command allows you to show affection towards another user, for example `-owo hug @Jared` will show a "+
			"reaction gif of someone hugging. \n\nThe commands are " + commands + ".");
			
		}
	}
})

// hug
bot.on("message", msg => {
	if (msg.content.slice(0, 4) == prefix+"hug") {
		let member = msg.mentions.members.first();
		if (member != undefined) {
			user_receiver = member.user.tag.split("#")[0];
			user_sender = msg.member.user.tag.split("#")[0];
			hug_url = webserver_src_hug + "/" + ("00000" + parseInt(Math.random()*1000) % src_hug_count).slice(-5) + ".gif";
			embed_image_header(msg, hug_url, user_sender + " hugged " + user_receiver, "");
		} else if (msg.content == prefix+"hug") {
			embed_info_reply(msg, "You can't hug yourself lol :/");
		} else {
			embed_info_reply(msg, "receiving user couldn't be found");
		}
	}
})

// --- Auto Post ---
var hentai_intervals = {};
var nude_intervals = {};
var meme_intervals = {};

function post_auto_image(channel_file, webserver_dataset, database_count, dataset_description, intervals) {
	if (enable_auto_henati == true) {
		// check each authorised server ID
		hentai_authorised_fs = require('fs');
		for (i=0;i<authrosied_server_IDs.length;i++) {
			// get server name
			current_server_name2 = bot.guilds.cache.get(authrosied_server_IDs[i])
			if (current_server_name2 != undefined) {
				current_server_name2 = current_server_name2.name.replace(" ","_");
				// get directory
				hen_path = logging_path + "/" + current_server_name2 + "/" + channel_file;
				if (hentai_authorised_fs.existsSync(hen_path) == true) {
					// file exists for current server
					// read output file
					fs_output = require('fs');
					fs_output.readFile(hen_path, "utf8", function(err, data) {
						if (err) {
							return console.log(err);
						}
						// raw data
						hentai_raw_data = [];
						hentai_raw = data.split("\n").join("").split(";");
						for (i=0;i<hentai_raw.length;i++) {
							if (hentai_raw[i] != "") {
								if (isInt_without_error(hentai_raw[i].split(",")[0], 0, 10**20) == true) {
									hentai_raw_data.push(hentai_raw[i]);
								}
							}
						}
				
						// get ID
						if (data != "") {
							for (i=0;i<hentai_raw_data.length;i++) {
								hentai_current_ID = hentai_raw_data[i].split(",")[0];
								hentai_current_length = hentai_raw_data[i].split(",")[1];
								if (hentai_current_ID != "") {
									console.log("Set Auto"+dataset_description+" Interval for " + hentai_current_ID + "!");
									intervals[hentai_current_ID] = setInterval(function(hentai_current_ID) {
										// send random image
										hentai_fname = "/" + ("00000" + parseInt(Math.random() * 100000) % database_count).slice(-5) + ".png";
										current_hentai_channel = bot.channels.cache.get(hentai_current_ID);
										console.log("Auto"+dataset_description+" posted in "+hentai_current_ID+"!");
										embed_image(current_hentai_channel, webserver_dataset + "/" + hentai_fname, dataset_description, guild="channel");
									}, 1000*60*parseInt(hentai_current_length), hentai_current_ID);
								}
							}
						}
					})
				}
			}
		}
	}
} 

function auto_post_timeout(channel_file, webserver_dataset, database_count, dataset_description, intervals, timeout) {
	setTimeout(function() {
		post_auto_image(channel_file, webserver_dataset, database_count, dataset_description, intervals, nsfw=false);
	}, timeout*1000, channel_file, webserver_dataset, database_count, dataset_description, intervals)
}

bot.on("ready", msg => {
	auto_post_timeout(hentai_channel_file, webserver_hentai_dataset, hentai_database_count, "Hentai", hentai_intervals, 1);
	auto_post_timeout(nsfw_channel_file, webserver_nude_dataset, nude_database_count, "Nude", nude_intervals, 5);
	auto_post_timeout(igmemes_channel_file, webserver_igmemes_dataset, igmemes_dataset_count, "Meme", meme_intervals, 10, nsfw=false);
})

// configure channel to post images automatically
function configure_autopost(msg, commands, description, intervals, channel_file, webserver_dataset, database_count, nsfw=true) {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, commands.length+1) == prefix+commands) {
			if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
				if (msg.channel.nsfw == nsfw) {
					command = msg.content.slice(commands.length+1, commands.length+4);
					if (command == "on ") {
						autohenati_mins = msg.content.slice(commands.length+command.length, msg.content.length);
						ErrorMessageEnd = "The correct syntax for the command is `-auto"+description+" on {length}` for example `-auto"+description+" on 10` will post a new "+description+" photo every 10 mins!";
						if (isInt(msg, autohenati_mins, 1, 1440, "length", ErrorMessageEnd) == true) {
							create_file_then_append_data(msg, channel_file, msg.channel.id + "," + autohenati_mins + ";", endl="");
							embed_info_reply(msg, "Autohentai has been enabled, photos will be posted every " + autohenati_mins + " mins! You can type `-auto"+description+" off` to clear any autohentai rules!");
							
							// timeout
							console.log("Auto"+description+" Interval set for " + msg.channel.id);
							intervals[msg.channel.id] = setInterval(function() {
								// send random hentai image
								hentai_fname = ("00000" + parseInt(Math.random() * 100000) % database_count).slice(-5) + ".png";
								current_hentai_channel = bot.channels.cache.get(msg.channel.id);
								embed_image(current_hentai_channel, webserver_dataset + "/" + hentai_fname, description, guild="channel");
							}, 1000*60*parseInt(autohenati_mins), msg.channel.id);
							
						}
					} else if (command == "off") {
						// get directory
						current_server_name3 = msg.guild.name.replace(" ","_");
						hentai_path3 = logging_path + "/" + current_server_name3 + "/" + channel_file;
						
						// stop interval for all channels on server
						async function stop_hentai_interval() {
							fs_get_hentai = require('fs');
							fs_get_hentai.readFile(hentai_path3, "utf-8", function(err, data) {
								if (err) {
									return console.log(err);
								}
							
								// raw data
								hentai_raw2 = data.split("\n").join("").split(";");
								for (i=0;i<hentai_raw2.length;i++) {
									if (hentai_raw2[i] != "") {
										clear_current_interval = hentai_raw2[i].split(",")[0];
										if (isInt_without_error(clear_current_interval, 0, 10**20) == true) {
											if (intervals[clear_current_interval] != undefined) {
												clearInterval(intervals[clear_current_interval]);
												console.log("Auto"+description+" Interval " + clear_current_interval + " cleared!");
											}
										}
									}
								}
							})
						}
						
						// clear file
						async function clear_hentai_rules() {
							await stop_hentai_interval();
							setTimeout(function(){
								fs_clear_hentai = require('fs');
								fs_clear_hentai.writeFile(hentai_path3, "", function(err) {
									if (err) {
										return console.log(err);
									}
									embed_info_reply(msg, "All Auto"+description+" rules cleared for your server!");
								})
							}, autohentai_clear_delay);
						} clear_hentai_rules();
						
					} else {
						embed_error(msg, "Invalid Input, the syntax for the command is `-auto"+description+" on {length}` for example `-auto"+description+
						" 5` will post a meme every 5 mins. To turn off auto"+description+" you can type `-auto"+description+" off`.")
					}
				} else {
					embed_error(msg, "This command can only be used in NSFW channels!");
				}
			} else {
				embed_error(msg, "You dont have permission to use this command, " + mod_error_text + "Manage Channels permission!");
			}
		}
	}
}

bot.on("message", msg => {
	if (msg.content.slice(0, 12) == prefix+"autohentai ") {
		configure_autopost(msg, "autohentai ", "Hentai", hentai_intervals, hentai_channel_file, webserver_hentai_dataset, hentai_database_count, nsfw=true);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 10) == prefix+"autonude ") {
		configure_autopost(msg, "autonude ", "Nude", nude_intervals, nsfw_channel_file, webserver_nude_dataset, nude_database_count, nsfw=true);
	}
})

bot.on("message", msg => {
	if (msg.content.slice(0, 10) == prefix+"automeme ") {
		configure_autopost(msg, "automeme ", "Meme", nude_intervals, igmemes_channel_file, webserver_memes_dataset, meme_database_count, nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.content == prefix+"automeme" || msg.content == prefix+"autohentai" || msg.content == prefix+"autonude") {
		embed_autocommands_help = new Discord.MessageEmbed();
		embed_autocommands_help.setColor(embed_colour_info);
		embed_autocommands_help.setTitle("Auto Image Commands Help");
			
		embed_autocommands_help.addFields(
			{name: "AutoMeme", value: "Automatically posts a meme after a specified period of time, for example `-automeme on 5` will post a meme every 5 mins, to turn automeme off type `-automeme off`."},
			{name: "AutoNude", value: "Automatically posts a nude after a specified period of time, for example `-autonude on 5` will post a nude photo every 5 mins, to turn autonude off type `-autonude off`."},
			{name: "AutoHentai", value: "Automatically posts Hentai after a specified period of time, for example `-autohentai on 5` will post a Hentai photo every 5 mins, to turn autohentai off type `-autohentai off`."}
		)
			
		embed_autocommands_help.setTimestamp();
		msg.channel.send(embed_autocommands_help);
	}
})
			


// execute
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
					embed_execute = new Discord.MessageEmbed();
					embed_execute.setTitle("Python Output");
					embed_execute.setURL("https://www.python.org/"); // set this to URL of the message
					embed_execute.setColor(embed_color_chat);
					embed_execute.setDescription("This is the output from Python terminal");
					embed_execute.addFields(
						{name: "Input", value: "```"+input_code+"```"},
						{name: "Output", value: "``` "+data+" ```"}
					)
					embed_execute.setTimestamp();
					embed_execute.setFooter("JaredBot", "http://jared.servehttp.com/img/lion.jpg");
					msg.channel.send(embed_execute);
					
				});
			}, read_output_file_delay_execute, msg, input_code);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() === prefix+"imbored") {
			bored_dataset = require('fs');
			bored_dataset.readFile(dataset_imbored, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				//send message
				current_list = String(data).split("\n");
				current = current_list[parseInt(Math.random() * 1000) % current_list.length];
				embed_chat_reply(msg, current);
			});
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
					embed_chat_reply(msg, "Your random name is: `" + fname + " " + sname+"`");
				});
			});
		}
	}
})

// choose random item from list
function split_list_dot(data) {
	count = 0
	loop = true;
	items = [];

	while (loop == true) {
		count += 1
		if (data.indexOf((count+1) + ".") == -1) {
			items.push(data.slice(data.indexOf(count + "."), data.length));
			loop = false;
		} else {
			items.push(data.slice(data.indexOf(count + "."), data.indexOf((count+1) + ".")));
		}
	}
	
	// choose an option
	if (items.length == 1 && items[0].length == 1) {
		return "Invalid Format! Please seperate each item in your list with a number and dot!";
	} else {
		return items[parseInt(Math.random() * 100) % items.length];
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"choose " || msg.content.slice(0, 8) == prefix+"choice ") {
			data = msg.content.split("`").join("");
			if (data.indexOf(".") > -1) {
				answer = split_list_dot(data.slice(8, data.length));
				embed_chat_reply(msg, answer.slice(answer.indexOf(".")+1, answer.length));
			
			} else if (data.indexOf(",") > -1) {
				items = data.slice(8, data.length).split(",");
				embed_chat_reply(msg, items[parseInt(Math.random() * 100) % items.length])
			
			} else {
				embed_error(msg, "Invalid Format! Please seperate each item in your list with a number and dot!");
			}
		}
	}
})

// anouncment (need to fix this)
bot.on("message", msg => {
	if (msg.channel.type == 'dm') {
		if (msg.author.id === user_ID) {
			if (msg.content.toLowerCase().slice(0,10) === prefix+"announce ") {
				console.log("Message from Jared recived!");
				var TheMessage = msg.content.slice(10, msg.content.length);
			
				// send to multiple servers (announcements channel)!
				for (i=0;i<channel_IDs.length;i++) {
					try {
						bot.channels.cache.get(channel_IDs[i]).send(TheMessage);
					} catch {
						msg.reply("Failed to send announcement in " + channel_IDs[i]);
					}
				}
			}
		}
	}
})

// default dance
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 14) == prefix+"default dance") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				// message reply
				for (i=1;i<11;i++) {
					deafult_dance = require('fs')
					deafult_dance.readFile(default_dance_dir+i+".txt", "utf-8", function(err, data) {
						if (err) {
							return console.log(err);
						}
						
						// send message
						embed_default_dance = new Discord.MessageEmbed();
						embed_default_dance.setColor("FFA92D");
						embed_default_dance.setDescription(data);
						msg.channel.send(embed_default_dance);
					})
				}
			} else {
				embed_error(msg, "You can't run the default dance command!");
			}
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
					// send message to user
					console.log("Channel ID: ", channel_id, data);
					embed_cleverbot = new Discord.MessageEmbed();
					embed_cleverbot.setAuthor("AI", "http://jared.servehttp.com/img/ai.png");
					embed_cleverbot.setColor("00749D");
					embed_cleverbot.setDescription("```\u200B\u200B\u200B" +data+"\n\u200B                              ```");
					embed_cleverbot.setTimestamp();
					msg.channel.send(embed_cleverbot);
					console.log("message send to user!")
				}
			})
		} catch (err) {
			embed_chat_reply("...");
		}
	}, read_output_file_delay_clever_bot, msg, channel_id);
}

// clever bot
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,4) === prefix+"bot") {
			var input_code = msg.content.slice(5,msg.length);
		
			if (input_code == "restart") {
				// write code to file
				fs_restart = require('fs');
				fs_restart.writeFile(inputs_file_chatbot, "command_restart_node_js", function(err) {
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
	}
})

// Image commands
// random animal
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
	}
})

// post meme
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		var command = msg.content.toLowerCase()
		if (command === prefix+"catmeme" || command === prefix+"meme") {
			if (meme_source_from_python == true) {
				try {
					// write command to file
					if (command === prefix+"catmeme") {
						cat_input_writer = require('fs');
						cat_input_writer.writeFile(inputs_file_meme, "meme-cat", function(err) {
							if (err) {
								return console.log(err);
							}
							console.log("wrote command random animal to file!")
						});
					} else if (command === prefix+"meme") {
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
			} else {
				// post image
				if (command === prefix+"meme") {
					embed_image(msg, webserver_memes_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % meme_database_count).slice(-5) +".png", "meme");
				} else if (command === prefix+"catmeme") {
					embed_image(msg, webserver_catmemes_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % catmeme_database_count).slice(-5) +".png", "meme");
				}
			}
		}
	}
})

// post cat photo
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"cat" || msg.content == prefix+"meow") {
			// send message
			embed_image(msg, webserver_cats_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % cat_database_count).slice(-5) +".jpg", "cat");
		}
	}
})

// post dog photo
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"dog" || msg.content == prefix+"woof") {
			// send message
			embed_image(msg, webserver_dogs_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dog_database_count).slice(-5) +".png", "dog");
		}
	}
})

// post helicopter photo
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"heli" || msg.content.slice(0, 6) == prefix+"chpper") {
			// send message
			embed_image(msg, webserver_heli_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % heli_database_count).slice(-5) +".png", "helicopter");
		}
	}
})

// post a dog meme
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"dogmeme") {
			// send message
			embed_image(msg, webserver_dogmeme_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dogmeme_database_count).slice(-5) +".png", "dog meme");
		}
	}
})

// post nude
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"nude") {
			if (msg.channel.nsfw == true) {
				// send message
				embed_image(msg, webserver_nude_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % nude_database_count).slice(-5) +".png", "nude girl");
			} else {
				embed_error(msg, "The nude command can only be used in NSFW channels");
			}
		}
	}
})

// post car
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 4) == prefix+"car") {
			// send message
			embed_image(msg, webserver_car_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % car_dataset_count).slice(-5) +".jpg", "car");
		}
	}
})

// post snake
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"snake") {
			// send message
			embed_image(msg, webserver_snake_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % snake_dataset_count).slice(-5) +".jpg", "snake");
		}
	}
})



bot.on("message", msg => {
	if (msg.content.toLowerCase() === prefix+"invitelink") {
		msg.channel.send(perm_invite_link);
	}
})

bot.on("message", msg => {
	if (msg.content === prefix+"author") {
		embed_author_jared = new Discord.MessageEmbed();
		embed_author_jared.setTitle("Jared Info")
		embed_author_jared.setDescription("JaredBot is a multipurpose Discord bot created by Jared Turck, mainly to be used on the Jared Network Discord server.\n\u200B\n\u200B" +
			"It has a range of features from tools such as execute, which " +
			"allows you to run Python code directly on your discord server, " +
			"steaminfo which allows you to see other users steam stats, an AI " +
			"chat bot which you can talk an interact with, auto response chat " +
			"commands, random images and memes, to games like rock paper scissors, " +
			"higher lower and TickTackToe. The bot also has moderation commands " +
			"for managing your server, like announce, warn, mute, unmute, kick, " +
			"ban, unban, to logging which saves a copy of every message allowing " +
			"you to retrieve messages even after they have been deleted.\n\u200B" +
			"\n\u200BFor information on how to use the bot type `-help`! If you have any " +
			"suggestions, improvements, or you just want to talk to me, feel free to contact me using the links below."
		)
		embed_author_jared.setColor(embed_colour_info);
		embed_author_jared.setThumbnail("http://jared.servehttp.com/img/cat1.jpg");
		embed_author_jared.addFields(
			{name : "\n\u200BSocial links", value: "Steam:\thttps://steamcommunity.com/id/jaredcat\n\u200BDiscord:\thttps://discord.gg/QDeUXq4" +
			"\n\u200BGitHub:\thttps://github.com/JaredTurck"}
		)
		embed_author_jared.setTimestamp();
		embed_author_jared.setFooter("Jared Turck", "http://jared.servehttp.com/img/cat1.jpg")
		msg.channel.send(embed_author_jared);
	}
})

// member count
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content === prefix+"membercount") {
			embed_chat_reply(msg, "There are " + msg.guild.memberCount + " members on the server!");
		}
	}
})

// server count
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"servercount") {
			embed_chat_reply(msg, "The bot is currently in " + bot.guilds.cache.size + " servers, and has been authorised on "+
			authrosied_server_IDs.length + " servers in total!");
		}
	}
})

// chat replys
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,13) == prefix+"replychance ") {
			value = parseInt(msg.content.toLowerCase().slice(13, msg.content.length));
			if (value != NaN) {
				if (value > 0) {
					reply_chance = value;
					embed_chat_reply(msg, "reply chance set to " + parseInt((1 / reply_chance)*100)+"%!");
				} else if (value == 0) {
					embed_error(msg, "You can't set the reply chance to 0%! please use -stop instead to turn the bot auto response off!");
				} else if (value < 0) {
					embed_error(msg, "Negative percentages not allowed!");
				}
			}
		} else if (msg.content.toLowerCase() == prefix+"replychance") {
			embed_chat_reply(msg, "The current replychance is " + (parseInt((1/reply_chance)*100 ))+"%!");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix+"stop") {
			DoReply = false;
			embed_chat_reply(msg, "Auto response is turned off! Sorry if I was spamming :(");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix+"autoresponse") {
			DoReply = true;
			embed_chat_reply(msg, "Auto response turned on!");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (DoReply == true) {
			// responses
			if (msg.content.toLowerCase() == "f") {
				msg.channel.send("f ");
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
		
			if (msg.content.toLowerCase() == "Ã¶") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg.channel.send("Ã¶ ");
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
			
			if (msg.content.toLowerCase() == "kek") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg.channel.send("kek ");
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
				},1000);
			}
		
			if (msg.content.toLowerCase() == "1 second" || msg.content.toLowerCase() == "1 sec" || msg.content.toLowerCase() == "sec ") {
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
	}
})

// fancy text
var fonts = [];
file_reader = require('fs')
file_reader.readFile(dataset_fonts, "utf-8", function(err, data) {
	if (err) {
		return console.log(err);
	} else {
		raw_datat = data.split("\n");
		for (i=0;i<raw_datat.length;i++) {
			if (raw_datat[i] != "") {
				fonts.push(raw_datat[i]);
			}
		}
	}
})

// font
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"font ") {
			command = msg.content.slice(6, msg.content.length);
			num = command.split(" ", 1);
			if (isNaN(parseInt(num)) == false) {
				if (num >= 1 && num <= fonts.length) {
					txt = command.slice(command.indexOf(" ")+1, command.length);
					font_output = [];
					console.log(fonts);
					for (i=0;i<txt.length;i++) {
						current_char = ASCII.indexOf(txt[i])
						if (current_char != -1) {
							font_output.push(fonts[num][current_char]);
						}
					}
					embed_chat_reply(msg, font_output.join(""));
				} else {
					embed_error(msg, "Invalid Font! Please make sure the font number is between 1 and "+fonts.length+"!");
				}
			} else {
				embed_error(msg, "Invalid Format! The command Syntax is `-font {num} {text}`!");
			}
		}
	}
})

// killed by
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 6) == prefix+"kill ") {
			let member = msg.mentions.members.first();
			animals_reader = require('fs')
			animals_reader.readFile(dataset_methods_of_death, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				death_method = data.split("\n")[parseInt(Math.random() * 1000) % data.split("\n").length]
				embed_chat_reply(msg, "<@" + member + "> " + death_method);
			})
		}
	}
})

// Rock, Paper, Scissors
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 10) == prefix+"remind me") {
			try {
				if (msg.content.toLowerCase().indexOf(" second") > -1) {
					user_input = msg.content.toLowerCase().replace(prefix+"remind me ","").split(" sec")[0]
					time = user_input.split(" ")[user_input.split(" ").length -1];
					reminder = msg.content.toLowerCase().replace(prefix+"remind me ","")
			
					setTimeout(function() {
						embed_chat_reply(msg, "Reminder! "+ reminder.split(" sec")[0]);
						msg.reply("\u200B");
					}, 1000*parseInt(time), msg);
					embed_chat_reply(msg, "Ok i will remind you!");
			
				} else if (msg.content.toLowerCase().indexOf(" min") > -1) {
					user_input = msg.content.toLowerCase().replace(prefix+"remind me ","").split(" min")[0]
					time = user_input.split(" ")[user_input.split(" ").length -1];
					reminder = msg.content.toLowerCase().replace(prefix+"remind me ","")
			
					setTimeout(function() {
						embed_chat_reply(msg, "Reminder! "+ reminder.split(" min")[0]);
						msg.reply("\u200B");
					}, 1000*parseInt(time)*60, msg);
					embed_chat_reply(msg, "Ok i will remind you!");
				}
			} catch (error) {
				embed_error(msg, "Reminder failed!")
				console.log(error)
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,7) == prefix+"timer ") {
			time = msg.content.toLowerCase().replace(prefix+"timer ","").split(":");
			if (time.length == 3) {
				if (parseInt(time[0]) != NaN && parseInt(time[1]) != NaN && parseInt(time[2]) != NaN) {
					secs = parseInt(time[2])
					mins = parseInt(time[1])
					hour = parseInt(time[0])
					total = secs + (mins*60) + (hour*3600)
					embed_chat_reply(msg, "Timer set for "+total+" seconds !");
				
					setTimeout(function(){
						msg.reply("Timer Finished!");
					}, (secs + (mins*60) + (hour*3600))*1000, msg)
				} else {
					embed_error(msg, "Invalid Format!")
				}
			} else {
				embed_error(msg, "Please use the format Hours:Mins:Seconds (HH:MM:SS)!")
			}
		}
	}
})

//botup time
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"uptime") {
			current_time = new Date();
			run_sec = (current_time - up_time)/1000;
			formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
			console.log(run_sec, formatted);
			embed_chat_reply(msg, "The bot has been online for " + formatted + " seconds");
		}
	}
})

//stopwatch
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,11) == prefix+"stopwatch ") {
			if (msg.content.toLowerCase().split(prefix+"stopwatch ")[1] == "start") {
				stopwatch_start = new Date();
				stopwatch_on = true;
				embed_chat_reply(msg, "Stopwatch started! type '"+prefix+"stopwatch stop' to end!");
			} 
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,11) == prefix+"stopwatch ") {
			if (msg.content.toLowerCase().split(prefix+"stopwatch ")[1] == "stop") {
				if (stopwatch_on == true) {
					var stopwatch_stop = new Date();
					run_sec = (stopwatch_stop - stopwatch_start)/1000;
					formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
					console.log(run_sec, formatted);
					embed_chat_reply(msg, "Stopwatch stopped!\nRunning time: " + formatted + " seconds!");
					stopwatch_on = false;
				} else {
					embed_chat_reply(msg, "You have not started the stopwatch, type '"+prefix+"stopwatch start' to start!");
				}
			}
		}
	}
})

// Higher or Lower
function higher_lower_show_leaderboard(msg) {
	if (make_server_folder_file(msg, filenames_higherlower) == true) {
		// read leaderboard
		leaderboard_file = logging_path +"/"+ msg.guild.name.replace(" ","_") +"/" + filenames_higherlower;
		leaderboard_reader_2 = require('fs');
		leaderboard_reader_2.readFile(leaderboard_file, "utf-8", function(err, data) {
			if (err) {
				return console.log(err);
			}
			
			// sort data
			output_data_array = [];
			output_data_array2 = [];
			hl_leaderboard_array = data.replace(/:/g,": ").split("\n").filter(function(n){return n != ""});
			for (i=0;i<hl_leaderboard_array.length;i++) {
				output_current_part = hl_leaderboard_array[i].split(":");
				output_data_array.push([output_current_part[1], output_current_part[0]]);
			}
			output_data_array.sort();
			
			// convert back to string
			for (i=0;i<output_data_array.length;i++) {
				output_data_array2.push(output_data_array[i][1] + ":" + output_data_array[i][0])
			}
			
			hl_leaderboard_first = output_data_array2[0];
			hl_leaderboard_rest = output_data_array2.slice(1, output_data_array2.length).join("\n") + "\u200B";
		
			// send message
			try {
				embed_higherlower_leaderboard = new Discord.MessageEmbed();
				embed_higherlower_leaderboard.setTitle("Leaderboard");
				embed_higherlower_leaderboard.setColor(embed_color_chat);
				embed_higherlower_leaderboard.addField(hl_leaderboard_first, hl_leaderboard_rest);
				embed_higherlower_leaderboard.setTimestamp();
				msg.channel.send(embed_higherlower_leaderboard);
			} catch {
				embed_chat_reply(msg, "The scoreboard is currently blank, play a game of higher lower to add a score!");
			}
		})
	} else {
		embed_error(msg, "The Higher Lower scoreboard does not exist for your server, you can create a new scoreboard by" +
		" playing a game of higher lower, type `-higherlower` to start the game.");
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix+"higherlower") {
			start_game = true;
			random_num = parseInt(Math.random() * 100) % 100;
			embed_chat_reply(msg, "Im thinking of a number between 1 and 100! Guess the number!");
			setTimeout(function(){
				if (start_game == true) {
					embed_chat_reply(msg, "Time is up! My number was " + random_num, footer=["", ""]);
					start_game = false;
					user_counter = 0;
				}
			}, higher_lower_end_game_delay, start_game);
		} else if (msg.content.toLowerCase() == prefix+"higherlower leaderboard") {
			higher_lower_show_leaderboard(msg);
		} else if (msg.content.toLowerCase() == prefix+"higherlower scoreboard") {
			higher_lower_show_leaderboard(msg);
		} else if (msg.content.toLowerCase().slice(0, 13) == prefix+"higherlower ") {
			if (msg.content.slice(13, msg.content.length).length > 0) {
				embed_error(msg, "Invalid parameter, please type `-higherlower` to start the game, "+
				"or if you would like to see the scoreboard type `-higherlower scoreboard` or `-higherlower leaderboard`!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (start_game == true) {
			if (parseInt(msg.content) != NaN) {
				var guess = parseInt(msg.content);
				if (guess < random_num) {
					embed_chat_reply(msg, "Higher!", footer=["", ""]);
					user_counter += 1;
				} else if (guess > random_num) {
					embed_chat_reply(msg, "Lower!", footer=["", ""]);
					user_counter += 1;
				} else if (guess == random_num) {
					start_game = false;
					embed_chat_reply_header(msg, "You took " + user_counter + " guesses!", "Welldone my number was " + random_num);
					setTimeout(function() {
						higher_lower_show_leaderboard(msg);
					}, 1000);
					current_usercount = user_counter;
					user_counter = 0;
					
					// update leaderboard
					make_server_folder_file(msg, filenames_higherlower);
					var leaderboard_file = logging_path +"/"+ msg.guild.name.replace(" ","_") +"/" + filenames_higherlower;
					
					// read leaderboard
					leaderboard_reader = require('fs');
					leaderboard_reader.readFile(leaderboard_file, "utf-8", function(err, data) {
						if (err) {
							return console.log(err);
						}
						// leaderboard data
						current_higherlower_leaderboard = [];
						higherlower_data_array = [];
						higherlower_raw_data = data.split("\n");
						
						// read file contents as an array
						for (i=0;i<higherlower_raw_data.length;i++) {
							higherlower_current_line = higherlower_raw_data[i].split(":");
							if (higherlower_current_line.length == 2) {
								higherlower_data_array.push(higherlower_current_line);
								
								// add user to leaderboard
								if (higherlower_current_line[0] == msg.author.username) {
									if (isNaN(parseInt(higherlower_current_line[1])) == false) {
										// user score > scoreboard score
										if (current_usercount < higherlower_current_line[1]) {
											higherlower_data_array[i][1] = current_usercount;
										}
									}
								}
							} else {
								if (String(higherlower_data_array).indexOf(msg.author.username) == -1) {
									higherlower_data_array.push([msg.author.username, current_usercount]);
								}
							} 
						}
						
						// format data
						higher_lower_output = "";
						for (ii=0;ii<higherlower_data_array.length;ii++) {
							higher_lower_output = higher_lower_output + higherlower_data_array[ii].join(":") + "\n";
						}
						
						// write scoreboard to file
						higherlower_writer = require('fs');
						higherlower_writer.writeFile(leaderboard_file, higher_lower_output, function(err) {
							if (err) {
								return console.log(err);
							}
							console.log("wrote higherlower score to scoreboard!");
						})
					})
				}
			}
		}
	}
})

// TicTacToe
function draw_board(msg) {
	if (TicTacToe_draw_board == true) {
		embed_chat_reply(msg, "```   A   B   C\n" +
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
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
	}
})

// flip a coin
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"flipcoin") {
			coin = [flip_coin_tails, flip_coin_heads][parseInt(Math.random() * 10) % 2];
			name = coin[0].toUpperCase() + coin.slice(1,coin.length).replace(flip_coin_file_extension, "") + "!";
			embed_image(msg, "http://jared.servehttp.com/img/src/coins/" + coin, name);
			console.log("Coin fliped!");
		}
	}
})

// roll a dice
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == "-roll") {
			num = (parseInt(Math.random() * 100) % 6)+1;
			embed_image(msg, "http://jared.servehttp.com/img/src/dice/dice" + num + ".png", num);
		}
	}
})

// text memes
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
	}
})

// steam info
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
					
					embed_steamdata = new Discord.MessageEmbed();
					embed_steamdata.setTitle("Steam Profile Stats");
					embed_steamdata.setColor(embed_colour_info);
					
					// format data
					raw = data.split("\n");
					for (i=0;i<raw.length;i++) {
						if (raw[i].indexOf(":") > -1) {
							current_sdata = raw[i].split(":");
							embed_steamdata.addField(current_sdata[0], current_sdata[1]+"\u200B", true);
							if (current_sdata[0] == "steamID64") {
								embed_steamdata.setURL("https://steamcommunity.com/profiles/" + current_sdata[1]);
							} else if (current_sdata[0] == "realname") {
								embed_steamdata.setTitle(current_sdata[1]);
							}
							
						}
					}
					
					//send message
					embed_steamdata.setTimestamp();
					embed_steamdata.setFooter("Steam Info", "");
					embed_steamdata.setThumbnail("http://jared.servehttp.com/img/src/steam_icon1.png");
					msg.channel.send(embed_steamdata);
					
				})
			}, read_output_file_delay_steam_info, msg);
		}
	}
})

// change prefix
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"prefix ") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				new_prefix = msg.content.slice(8, msg.content.length);
				if (new_prefix.length == 1) {
					if (ASCII.indexOf(new_prefix) > -1) {
						old_prefix = prefix;
						prefix = new_prefix;
						embed_chat_reply(msg, "["+tag_tag_output+"] Prefix changed from `" + old_prefix + "` to `" + prefix + "`!")
					} else {
						embed_error(msg, "Prefix must be an ASCII character!");
					}
				} else {
					embed_error(msg, "Prefix must be a single character!");
				}
			} else {
				embed_error(msg, "Your discord ID is not authorised, only moderators and admins can change the bpt prefix!");
			}
		}
	}
})

// show current prefix
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"prefix") {
			embed_chat_reply(msg, "JaredBot's prefix is `" + prefix + "`")
			show_prefix = false;
			setTimeout(function(){
				show_prefix = true;
			}, anti_spam_delay);
		}
	}
})

// get user info
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"userinfo") {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				joined = new Date(member.joinedTimestamp).toGMTString();
				userid = member.id;
				userName = member.user.tag.split("#")[0];
				userTag = member.user.tag;
				nickname = String(member.displayName).replace(null, "None");
				avatar_url = member.user.avatarURL();
				boosting_since = new Date(member.premiumSinceTimestamp).toGMTString();
				joined_discord = new Date(member.user.createdAt).toGMTString();
				current_user_roles = member._roles;
				if (avatar_url == null) {
					avatar_url = "http://jared.servehttp.com/img/src/blank_avatar.png";
				}
			} else {
				joined = new Date(msg.member.joinedTimestamp).toGMTString();
				userid = msg.author.id;
				userName = msg.member.user.tag.split("#")[0];
				userTag = msg.member.user.tag;
				nickname = String(msg.member.displayName).replace(null, "None");
				avatar_url = msg.author.avatarURL();
				boosting_since = new Date(msg.member.premiumSinceTimestamp).toGMTString();
				joined_discord = new Date(msg.member.user.createdAt).toGMTString();
				current_user_roles = msg.member._roles;
			}
		
			// get roles
			server_guild = bot.guilds.cache.get(msg.guild.id);
			current_roles = [];
			for (i=0;i<current_user_roles.length;i++) {
				current_roles.push(server_guild.roles.cache.get(current_user_roles[i]).name);
			} 
			roles = current_roles.join("\n");
		
			embed_user_info = new Discord.MessageEmbed();
			embed_user_info.setTitle(userName + " Stats");
			embed_user_info.setColor(embed_color_chat);
			embed_user_info.setURL("https://discordapp.com/users/" + userid);
			embed_user_info.setDescription("These are a list of user stats for " + userName + "\u200B");
			embed_user_info.setAuthor(userName + " | " + msg.guild.name, avatar_url);
			embed_user_info.setThumbnail(avatar_url);
			embed_user_info.addFields(
				{name: "User Name", value: userName + "\n\u200B", inline: true},
				{name: "\n\u200B", value: "\n\u200B", inline: true},
				{name: "Nickname", value: nickname + "\n\u200B", inline: true},
				{name: "Roles", value: roles + "\n\u200B", inline: true},
				{name: "\n\u200B", value: "\n\u200B", inline: true},
				{name: "User ID", value: userid + "\n" + userTag + "\n<@" + userid + ">\n\u200B", inline: true},
				{name: "Joined Server", value: joined + "\n\u200B"},
				{name: "Joined Discord", value: joined_discord + "\n\u200B"},
				{name: "Boosting Since", value: boosting_since + "\n\u200B"}
			)
		
			embed_user_info.setTimestamp();
			embed_user_info.setFooter(userid);
			msg.channel.send(embed_user_info);
		}
	}
})




// Check Permissions
function check_perm(member, perm, url) {
	try {
		return "["+["Yes", "No"][[true, false].indexOf(member.hasPermission(perm))]+"]("+url+")";
	} catch {
		return "[?]("+url+")";
	}
}

bot.on("message", msg => {
	if (msg.content.slice(0, 5) == prefix+"perm") {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				message = member;
				avatar_url = member.user.avatarURL();
				if (avatar_url == null) {
					avatar_url = "http://jared.servehttp.com/img/src/blank_avatar.png";
				}
			} else {
				message = msg.member;
				avatar_url = msg.author.avatarURL();
			}
		
			username = message.user.tag.split("#")[0];
			servername = msg.guild.name;
		
			// embed
			embed_perm_check = new Discord.MessageEmbed();
			embed_perm_check.setColor(embed_colour_info);
			embed_perm_check.setTitle(username + " Permission's");
			embed_perm_check.setAuthor(username + " | " + servername, avatar_url, "");
			embed_perm_check.setThumbnail(avatar_url);
			embed_perm_check.setDescription("These are a list of permissions "+username+" has on the "+servername+" server!");
		
			perm_url = "https://discordapp.fandom.com/wiki/Permissions";
		
			// Fields
			embed_perm_check.addFields(
				{name: "Admin", value: check_perm(message, "ADMINISTRATOR", perm_url)+"\n\u200B", inline: true},
				{name: "\u200B", value: "\u200B", inline: true},
				{name: "Mute", value: check_perm(message, "MUTE_MEMBERS", perm_url)+"\n\u200B", inline: true},
				{name: "Kick", value: check_perm(message, "KICK_MEMBERS", perm_url)+"\n\u200B", inline: true},
				{name: "\u200B", value: "\u200B", inline: true},
				{name: "Ban", value: check_perm(message, "BAN_MEMBERS", perm_url)+"\n\u200B", inline: true},
			)
		
			embed_perm_check.addFields(
				{name: "Manage", value: 
					"Manage Roles: " + check_perm(message, "MANAGE_ROLES", perm_url) + "\n" +
					"Manage Permissions: " + check_perm(message, "MANAGE_ROLES_OR_PERMISSIONS", perm_url) + "\n" +
					"Manage Channels: " + check_perm(message, "MANAGE_CHANNELS", perm_url) + "\n" +
					"Manage Messages: " + check_perm(message, "MANAGE_MESSAGES", perm_url) + "\n" +
					"Manage Emojis: " + check_perm(message, "MANAGE_EMOJIS", perm_url) + "\n" +
					"Manage Guild: " + check_perm(message, "MANAGE_GUILD", perm_url) + "\n" +
					"Manage Nicknames: " + check_perm(message, "MANAGE_NICKNAMES", perm_url) + "\n" +
					"Manage WebHooks: " + check_perm(message, "MANAGE_WEBHOOKS", perm_url) + "\n" +
					"Manage AuditLogs: " + check_perm(message, "VIEW_AUDIT_LOG", perm_url) + "\n\u200B", inline: true},
				{name: "\u200B", value: "\u200B", inline: true},
				{name: "Member", value:
					"View Channels: " + check_perm(message, "VIEW_CHANNEL", perm_url) + "\n" +
					"Add Message Reaction: " + check_perm(message, "ADD_REACTIONS", perm_url) + "\n" +
					"Read Message History: " + check_perm(message, "READ_MESSAGE_HISTORY", perm_url) + "\n" +
					"Read Messages: " + check_perm(message, "READ_MESSAGES", perm_url) + "\n" +
					"Send Messages: " + check_perm(message, "SEND_MESSAGES", perm_url) + "\n" +
					"Send Files: " + check_perm(message, "ATTACH_FILES", perm_url) + "\n\u200B", inline: true},
				{name: "Voice Channel", value:
					"Speak: " + check_perm(message, "SPEAK", perm_url) + "\n" +
					"Connect: " + check_perm(message, "CONNECT", perm_url) + "\n" +
					"Move Members: " + check_perm(message, "MOVE_MEMBERS", perm_url) + "\n" +
					"Deafen Members: " + check_perm(message, "DEAFEN_MEMBERS", perm_url) + "\n" +
					"Text To Speach: " + check_perm(message, "SEND_TTS_MESSAGES", perm_url) + "\n" +
					"Voice Detection: " + check_perm(message, "USE_VAD", perm_url) + "\n\u200B", inline: true},
				{name: "\u200B", value: "\u200B", inline: true},
				{name: "Other", value:
					"Use External Emojis: " + check_perm(message, "USE_EXTERNAL_EMOJIS", perm_url) + "\n" +
					"External Emojis: " + check_perm(message, "EXTERNAL_EMOJIS", perm_url) + "\n" +
					"Change Nickname: " + check_perm(message, "CHANGE_NICKNAME", perm_url) + "\n" +
					"Create Invite: " + check_perm(message, "CREATE_INSTANT_INVITE", perm_url) + "\n" +
					"Tag Everyone: " + check_perm(message, "MENTION_EVERYONE", perm_url) + "\n" +
					"Embed Links: " + check_perm(message, "EMBED_LINKS", perm_url) + "\n\u200B", inline: true}
			)
		
			// send message
			embed_perm_check.setTimestamp();
			embed_perm_check.setFooter(msg.author.id);
			msg.channel.send(embed_perm_check);
		}
	}
})

// moderation
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"warn ") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				if (msg.author.id != bot_ID) {
					let member = msg.mentions.members.first();
					if (member != undefined) {
						if (member.hasPermission("MANAGE_MESSAGES") == false) {
							embed_modderation(msg, msg.content.slice(5, msg.length), "WARNING!");
							on_warning(msg, 9, msg.content.slice(5, msg.length));
							console.log("user warned!");
						} else {
							embed_error(msg, "You can't warn mods/admins!");
						}
					} else {
						embed_error(msg, "Failed to warn! The specified User could not be found!");
					}
				}
			} else {
				embed_error(msg, "You dont have permission to warn, "+mod_error_text+" manage messages permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"mute") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					if (member.hasPermission("MUTE_MEMBERS") == false) {
						member.roles.add(muted_role_ID);
						embed_modderation(msg, "<@"+ member + "> This user can no longer talk!", "User Muted!");
					} else {
						embed_error(msg, "Admins and Moderators cannot be muted!");
					}
				} else {
					embed_error(msg, "Failed to mute! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to mute, "+mod_error_text+" mute members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 7) == prefix+"unmute") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					member.roles.remove(muted_role_ID);
					embed_modderation(msg, "<@"+ member + "> They can talk again in text and voice channels!", "User Unmuted!");
				} else {
					embed_error(msg, "Failed to unmute! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to unmute, "+mod_error_text+" mute members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"tempmute") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					message = msg.content.split(" ")
					if (message.length == 3 && message[0] == prefix+"tempmute" && parseInt(message[2]) != NaN) {
						if (message[2] > 0) {
							if (message[2] < 1440) {
								if (member.hasPermission("MUTE_MEMBERS") == false) {
									// mute user
									member.roles.add(muted_role_ID);
									embed_modderation(msg, "<@"+ member + "> This user can no longer talk, they have been muted for "+message[2]+" mins!", "User Temporarily Muted!");
					
									//unmute user
									setTimeout(function(){
										member.roles.remove(muted_role_ID);
										embed_modderation(msg, "<@"+ member + "> This user can talk again, they have been automatically unmuted!", "User Unmuted!");
									}, parseInt(message[2]) * 1000 * 60, member, msg);
								} else {
									embed_error(msg, "Admins and Moderators cannot be muted!");
								}
							} else {
								embed_error(msg, "Mute Length too large, must be less than 24 hours (1440 mins)!");
							}
						} else {
							if (parseInt(message[2]) < 0) {
								embed_error(msg, "Mute Length cant be a negative number!");
							} else {
								embed_error(msg, "Invalid Format! Mute length must be a number!");
							}
						}
					} else {
						embed_error(msg, "Invalid Format! Please use -tempmute @user {length in mins}");
					}
				} else {
					embed_error(msg, "Failed to mute! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to tempmute, "+mod_error_text+" mute members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"kick") {
			if (msg.member.hasPermission("KICK_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					if (member.hasPermission("KICK_MEMBERS") == false) {
						member.kick();
						embed_modderation(msg, "<@"+ member + "> This user has been kicked!", "User Kicked!");
					} else {
						embed_error(msg, "Admins and Moderators cannot be kicked!");
					}
				} else {
					embed_error(msg, "Failed to kick! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to kick, "+mod_error_text+" kick members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 4) == prefix+"ban") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				custom_ID = msg.content.slice(5, msg.content.length);
				if (member != undefined) {
					if (member.hasPermission("BAN_MEMBERS") == false) {
						member.ban();
						embed_modderation(msg, "<@"+ member + "> This user has been Banned, they can't join back!", "User Banned!");
					} else {
						embed_error(msg, "Admins and Moderators cannot be banned!");
					}
				} else {
					embed_error(msg, "Failed to ban! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to ban, "+mod_error_text+" ban members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"tempban") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				let member2 = msg.mentions.members.first();
				if (member2 != undefined) {
					if (member2.hasPermission("BAN_MEMBERS") == false) {
						message2 = msg.content.split(" ");
						if (message2.length == 3 && message2[0] == prefix+"tempban" && parseInt(message2[2]) != NaN) {
							if (message2[2] > 0) {
								if (message2[2] < 1440) {
									// ban user
									member2.ban();
									embed_modderation(msg, "<@"+ member2 + "> This user has been temporerly banned, they can't join back!", "User Banned!");
					
									//unnaban user
									setTimeout(function(){
										msg.guild.members.unban(member2);
										embed_modderation(msg, "<@"+ member2 + "> This user can join again, they have been automatically unbaned!", "User Unbaned!");
									}, parseInt(message2[2]) * 1000 * 60, member2, msg);
								} else {
									embed_error(msg, "Ban Length too large, must be less than 24 hours (1440 mins)!");
								}
							} else {
								if (parseInt(message2[2]) < 0) {
									embed_error(msg, "Ban Length cant be a negative number!");
								} else {
									embed_error(msg, "Invalid Format! Ban length must be a number!");
								}
							}
						} else {
							embed_error(msg, "Invalid Format! Please use -tempban @user {length in mins}");
						}
					} else {
						embed_error(msg, "Admins and Moderators cannot be banned!");
					}
				} else {
					embed_error(msg, "Failed to ban! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to tempban, "+mod_error_text+" ban members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"unban") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				ID = msg.content.slice(7, msg.content.length);
				if (/^\d+$/.test(ID) == true) {
					msg.guild.members.unban(ID);
					embed_modderation(msg, "<@"+ ID + "> This user has been unbanned, they can join back!", "User Unbanned!");
				} else {
					embed_error(msg, "Please specify a User ID! " +
					"you can get the User ID by right clicking on a message the user has sent, then selecting Copy ID");
				}
			} else {
				embed_error(msg, "You dont have permission to unban, "+mod_error_text+" ban members permission!");
			}
		}
	}
})

// logging
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"logging ") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				command = msg.content.slice(9, msg.content.length);
				if (command == "on") {
					logging = true;
					embed_chat_reply(msg, "Logging turned on! All messages are now being logged!");
				} else if (command == "off") {
					logging = false;
					embed_chat_reply(msg, "Logging turned off! Messages are no longer being logged!");
				} else {
					embed_error(msg, "Invalid syntax! Please use -logging [on/off]!");
				}
			} else {
				embed_error(msg, "Your discord ID is not authorised, only Jared Network admins can manage logging!");
			}
		}
	}
})

bot.on("message", msg => {
	if (logging == true) {
		if (msg.channel.id != hentai_channel_ID) {
			try {
				// make directory if it does not exist
				var fs_folder = require('fs');
				var channel_name = msg.channel.name.replace(" ","_") + "_" + String(msg.channel.id);	// channel folder
				var server_name = msg.guild.name.replace(" ","_")									// server folder
				var dir = logging_path +"/"+ server_name +"/"+ channel_name;
				
				// check if server folder exists
				if (!fs_folder.existsSync(logging_path +"/"+ server_name)) {
					fs_folder.mkdirSync(logging_path +"/"+ server_name);
				}
				
				// check if channel folder exists
				if (!fs_folder.existsSync(dir)) {
					fs_folder.mkdirSync(dir);
				}
				
				// check if the log file exists
				date1 = new Date();
				log_current_file = dir + "/server_log_"+date1.getDate()+"-"+(date1.getMonth()+1)+"-"+date1.getFullYear()+".log";
				
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
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (sniping == true) {
			try {
				// write data to log file
				date = String(new Date()).split(" GMT")[0];
				user = msg.member.user.tag;
				channel = msg.channel.name;
				msg_content = msg.content.split("@everyone").join("{everyone}").split("@here").join("{here}").split("@").join("");
		
				fs_log_writer = require('fs');
				fs_log_writer.appendFile(deleted_messages_log_file, "["+channel+"]["+user+"]["+date+"] "+msg_content+"\n", function(err) {
					if (err) {
						console.log(err);
					}
				})
			} catch (err) {
				console.log("Failed to write deleted message to log file!" + err);
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"snipe") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				fs_output = require('fs');
				fs_output.readFile(deleted_messages_log_file, "utf8", function(err, data) {
					if (err) {
						return console.log(err);
					}
					// show deleted messages
					msg.channel.send("Deleted Messages:\n");
					lines = data.split("@everyone").join("{everyone}").split("@here").join("{here}").split("@").join("").split("\n");
					for (i=0;i<lines.length;i++) {
						msg.channel.send(lines[i]);
					}
				})
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,10) == prefix+"snipping ") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				command = msg.content.slice(10, msg.content.length);
				if (command == "on") {
					sniping = true;
					embed_chat_reply(msg, "Snipping has been turned on! Recently deleted messages will be logged!");
				} else if (command == "off") {
					snipping = false;
					embed_chat_reply(msg, "Snipping has been turned off! Deleted messages will no longer be logged!");
				}
			} else {
				embed_error(msg, "Your discord ID is not authorised, only moderators and admins can use the snipe command!");
			}
		}
	}
})

// clear deleted messages log
setInterval(function (){
	var current_time = new Date();
	if ((current_time.getHours() + ":" +  current_time.getMinutes()) == clear_message_time) {
		// clear the log file
		fs_log_clear = require('fs');
		fs_log_clear.writeFile(deleted_messages_log_file, "Log File cleared on " + String(current_time) + "\n", function(err) {
			if (err) {
				return console.log(err);
			}
		})
	}
}, 20*1000);

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"clearlog") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				// clear deleted messages log
				var current_time = new Date();
				fs_log_clear = require('fs');
				fs_log_clear.writeFile(deleted_messages_log_file, "Log File cleared on " + String(current_time) + "\n", function(err) {
					if (err) {
						return console.log(err);
					}
					embed_chat_reply(msg, "deleted messages log file cleared!");
				})
			} else {
				embed_error(msg, "Your not authorised to use this command!")
			}
		}
	}
})

// purge
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"purge" || msg.content.slice(0, 6) == prefix+"clear") {
			if (msg.content != prefix+"clearlog") {
				if (authorised_IDs.indexOf(msg.author.id) > -1) {
					purge_num = msg.content.slice(6, msg.content.length);
					if (isNaN(parseInt(purge_num)) == false) {
						if (purge_num >= 2 && purge_num <= max_purdge_amount) {
							if (purge_num.indexOf(".") == -1 && purge_num.indexOf("-") == -1) {
								// delete the messages
								async function delete_messages() {
									msg.delete();
									const fetched = await msg.channel.messages.fetch({limit: purge_num});
									msg.channel.bulkDelete(fetched);
								} delete_messages();
							
								// message server
								embed_info_reply(msg, purge_num + " messages deleted!");
							} else {
								embed_error(msg, "Decimals are not allowed, please enter an integer for the number of messages to purge!")
							}
						} else {
							if (purge_num > max_purdge_amount) {
								embed_error(msg, "Too many messages, you can delete up to " + max_purdge_amount + " max!");
							} else if (purge_num == 0 || purge_num == 1) {
								embed_error(msg, "Too few messages, please sepcify a larger number that is between 2 and " + max_purdge_amount + "!");
							} else if (purge_num < 0) {
								embed_error(msg, "You can't delete a negative number of messages silly, please enter a number between 2 and" + max_purdge_amount + "!");
							}
						}
					} else {
						if (msg.content.slice(0, 6) == prefix+"clear") {
							embed_error(msg, "Invalid Input, the number of messages to delete must be an integer! e.g. `-clear 10` will delete 10 messages!");
						} else {
							embed_error(msg, "Invalid Input, the number of messages to delete must be an integer! e.g. `-purge 10` will delete 10 messages!");
						}
					}
				} else {
					embed_error(msg, "Your discord ID is not authorised, only moderators and admins can use the purge command!")
				}
			}
		}
	}
})

// automod
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"automod" || msg.content == prefix+"automod help") {
			// automod help
			embed_automod_helpmenu = new Discord.MessageEmbed();
			embed_automod_helpmenu.setColor(embed_colour_info);
			embed_automod_helpmenu.setTitle("Automod Help");
			embed_automod_helpmenu.setDescription("Automod is a powerful tool that allows the bot to automatically mute, kick or ban users who " +
			"break specifically defined rules. When users spam, post porn links, or uses offensive language for example, JaredBot’s contenting " +
			"filtering feature will warn them. Automod is designed to run alongside content filtering, acting as a way to punish users who get to many " +
			"warnings. As well as counting contenting filtering warnings, it will also keep track of warnings moderators and admins give.");
			embed_automod_helpmenu.addFields(
				{name: "-automod help", value: "Shows this help menu.\n\u200B"},
				{name: "-automod rules", value: "Shows a list of the active rules applied to your server.\n\u200B"},
				{name: "-automod warnlist", value: "Shows a list of users with the most warnnings on the server.\n\u200B"},
				{name: "-automod", value: "lets you add an automod rule, The syntax for the command is `-automod {action} after {number of} warnings in {length} {mins/hours}`, for example `-automod mute after 10 warnings in 5 mins` will mute any users who recive 5 warnings within 10 mins!\n\u200B"},
				{name: "-automod remove", value: "lets you remove an automod rule, The syntax for the command is `-automod remove {rule number}`, for example `-automod remove 1` will remove the first active rule, i strongly suggest running `-automod rules` first to get a list of all of the rules currently on your sever, then use the automod remove command after.\n\u200B"}
			)
			
			// send message
			embed_automod_helpmenu.setTimestamp();
			msg.channel.send(embed_automod_helpmenu);
			
			
		} else if (msg.content == prefix+"automod rules") {
			try {
				// get dir
				automod_dir = msg.guild.name.replace(" ","_");
				automod_path = logging_path + "/" + automod_dir + "/" + automod_filename;
				
				// read automod file
				automode_reader = require('fs');
				if (automode_reader.existsSync(automod_path) == false) {
					throw "File not found!";
				}
				automode_reader.readFile(automod_path, "utf-8", function(err, data) {
					if (err) {
						return console.log(err);
					}
				
					// embed
					embed_automod_rules = new Discord.MessageEmbed();
					embed_automod_rules.setColor(embed_color_chat);
					embed_automod_rules.setTitle("Automod Active Rules")
					embed_automod_rules.setDescription("This is a list of all active automod rules currently applied to this server, " +
					"if you would like to remove a rule this can be done by typing `-automod remove {rule number}`!\n\u200B");
				
					// format data
					automod_raw_data = data.split(";");
					for (i=0;i<automod_raw_data.length;i++) {
						try {
							crnt_automod_rule = automod_raw_data[i].split(",");
							if (crnt_automod_rule.length == 3) {
								//automod_rule_time
								if (crnt_automod_rule[2] >= 3600) {
									automod_rule_time = parseInt(crnt_automod_rule[2]/60/60) + " hours";
								} else if (crnt_automod_rule[2] >= 60) {
									automod_rule_time = parseInt(crnt_automod_rule[2]/60) + " mins";
								} else {
									automod_rule_time = crnt_automod_rule[2] + " seconds";
								}
							
								automod_rule_text = "Users who get " + crnt_automod_rule[1] + " warnings after " + automod_rule_time + " will be " + crnt_automod_rule[0].replace("mute", "mut") + "ed";
								embed_automod_rules.addField("Rule " + (i+1), automod_rule_text + "\n\u200B");
							}
						} catch {
							console.log("failed to display automod rule on scoreboard!");
						}
					}
					
					if (automod_raw_data[0] == "") {
						embed_automod_rules.addField("No rules currently on the server!", "See the `-automod help` menu for information on how to add a rule!\n\u200B");
					}
				
					// send message
					embed_automod_rules.setTimestamp();
					msg.channel.send(embed_automod_rules);
				})
			} catch {
				embed_error(msg, "Failed to display automod rules, you may not have any rules setup on your server, please see the `-automod help` menu for information on how to create a rule.");
			}
		} else if (msg.content.slice(0, 16) == prefix+"automod remove ") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				rule_no = msg.content.slice(16, msg.content.length);
				// get dir
				automod_path = logging_path + "/" + msg.guild.name.replace(" ","_") + "/" + automod_filename;
			
				// read file
				automod_remove_reader = require('fs');
				automod_remove_reader.readFile(automod_path, "utf-8", function(err, data) {
					if (err) {
						console.log(err);
					}
					
					// check user input
					automod_data = data.split(";");
					if (automod_data.length > 0) {
						if (isNaN(parseInt(rule_no)) == false) {
							if (rule_no >= 1 && rule_no <= automod_data.length+1) {
								automod_data = (automod_data.slice(0, rule_no-1).concat(automod_data.slice(rule_no, automod_data.length)));
								
								if (data != "") {
									// write to file
									fs_writer = require('fs');
									fs_writer.writeFile(automod_path, automod_data.join(";"), function(err) {
										if (err) {
											return console.log(err);
										}
									})
									
									// message user
									embed_info_reply(msg, "Rule " + rule_no + " has been removed!");
								} else {
									embed_error(msg, "Failed to remove rule, no rules are currently setup on your server, please see the `-automod help` menu for more information on how to setup a rule.")
								}
							} else {
								embed_error(msg, "Invalid Input, the specific rule could not be found.");
							}
						} else {
							embed_error(msg, "Invalid Input, your rule number must a number.");
						}
					} else {
						embed_error(msg, "There are no rules currenly setup for this server, see `-automod help` for information on how to create a rule.");
					}
				})
			} else {
				embed_error(msg, "Your discord ID is not authorised, only moderators and admins can use the automod command!");
			}
		} else if (msg.content.slice(0, 17) == prefix+"automod warnlist") {
			// dir
			warnings_dir = msg.guild.name.replace(" ","_");
			warnings_path = logging_path + "/" + warnings_dir + "/" + warnings_filename;
			
			// read file
			automod_file_reader = logging_path +"/"+ msg.guild.name.replace(" ","_") +"/" + filenames_higherlower;
			leaderboard_reader_2 = require('fs');
			leaderboard_reader_2.readFile(warnings_path, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
				
				// scoreboard embed
				embed_automod_warns_list = new Discord.MessageEmbed();
				embed_automod_warns_list.setTitle("Warnings Scoreboard");
				embed_automod_warns_list.setDescription("shows a list of users with the most warnings on the server");
				embed_automod_warns_list.setColor(embed_color_chat);
			
				// format data
				warned_users = data.split("\n");
				warned_users_array = [];
				for (i=0;i<warned_users.length;i++) {
					current_warned_user_tag = warned_users[i].split("|")[0].split("-")[1].split("#")[0];
					current_warned_count = warned_users[i].split("|").length-1;
					warned_users_array.push([current_warned_count, current_warned_user_tag]);
				}
				warned_users_array.sort();
				
				// convert back to string
				warned_user_output = [];
				for (i=0;i<warned_users_array.length;i++) {
					if (i == 0) {
						user_most_warnings = warned_users_array[i][1] + ": " + warned_users_array[i][0]
					} else {
						warned_user_output.push(warned_users_array[i][1] + ": " + warned_users_array[i][0]);
					}
				}
				
				// send message
				embed_automod_warns_list.addField(user_most_warnings + "\u200B", warned_user_output.join("\n") + "\u200B");
				embed_automod_warns_list.setTimestamp();
				msg.channel.send(embed_automod_warns_list);
			})
			
		} else if (msg.content.slice(0, 9) == prefix+"automod ") {
			try {
				automod_error_text = "\n\nThe syntax for the command is `-automod {action} after {number of} warnings in {length} {mins/hours}`, " +
				"for example `-automod mute after 10 warnings in 5 mins` will mute any users who recive 5 warnings within 10 mins!";
				if (authorised_IDs.indexOf(msg.author.id) > -1) {
					// get rule
					// -automod mute after 5 warnings in 10 mins
				
					command = msg.content.slice(9, msg.content.length);
					action = command.split(" ")[0];
					no_warnings = command.split("after ")[1].split(" ")[0];
					lengthr = command.split("warnings in ")[1];
					length = lengthr.split(" ")[0];
					minSec = lengthr.split(" ")[1];
				
					if (action == "mute" || action == "kick" || action == "ban") {
						if (isNaN(parseInt(no_warnings)) == false) {
							if (no_warnings >= 1) {
								if (no_warnings <= 100) {
									if (no_warnings.indexOf("-") == -1 && no_warnings.indexOf(".") == -1) {
										if (isNaN(parseInt(length)) == false) {
											if (length >= 1) {
												if (length <= 1440) {
													if (length.indexOf("-") == -1 && length.indexOf(".") == -1) {
														if (minSec.slice(0,4) == "hour" || minSec.slice(0,3) == "min" || minSec.slice(0,3) == "sec") {
															// convert length value
															if (minSec.slice(0, 4) == "hour") {
																converted_length = length * 60 * 60;
															} else if (minSec.slice(0, 3) == "min") {
																converted_length = length * 60;
															} else {
																converted_length = length;
															}
															
															// get directory
															automod_rule = action + "," + no_warnings + "," + converted_length + ";";
															automod_dir = msg.guild.name.replace(" ","_");
															automod_path = logging_path + "/" + automod_dir + "/" + automod_filename;
															console.log(automod_rule);
														
															// make file
															async function make_file() {
																make_server_folder_file(msg, automod_filename);
																return;
															}
														
															// append automod rule to file
															async function write_automod_rule(){
																await make_file();
																automod_writer = require('fs');
																automod_writer.appendFile(automod_path, automod_rule, function(err) {
																	if (err) {
																		console.log(err);
																	}
																})
															} write_automod_rule();
														
															// message user
															embed_info_reply(msg, "Automod rule updated! Users who get " + no_warnings + " warnings" +
															" in " + length + " " + minSec + ", will now be " + action.replace("mute", "mut") + "ed!");
														} else {
															embed_error(msg, "Invalid Input, please sepcify `hours`, `mins` or `seconds` for your length of time!" + automod_error_text);
														}
													} else {
														embed_error(msg, "Invalid Input, your length value cannot be a decimal, " + automod_error_text);
													}
												} else {
													embed_error(msg, "Invalid Input, your length value is to large, please make sure the number is less than 1440!" + automod_error_text);
												}
											} else {
												embed_error(msg, "Invalid Input, your length value is to small it must be at least `1 min`!" + automod_error_text);
											}
										} else {
											embed_error(msg, "Invalid Input, your length value must be a number!" + automod_error_text);
										}
									} else {
										embed_error(msg, "Invalid Input, the number of warnings cannot be a decimal!" + automod_error_text);
									}
								} else {
									embed_error(msg, "Invalid Input, the number of warnings value is to large, it must be less than 1000!" + automod_error_text);
								}
							} else {
								embed_error(msg, "Invalid Input, the number of warnings value is to small it must be at least 1!" + automod_error_text);
							}
						} else {
							embed_error(msg, "Invalid Input, your number of warnings must be a number!" + automod_error_text);
						}
					} else {
						embed_error(msg, "Invalid Input, your action must be `mute`, `kick` or `ban`!" + automod_error_text);
					}
				} else {
					embed_error(msg, "Your discord ID is not authorised, only moderators and admins can use the automod command!")
				}
			} catch {
				embed_error(msg, "Failed to set automod rule! " + automod_error_text);
			}
		}
	}
})

// automod warning tracker
function on_warning(msg, warning_code, reason="") {
	// warning codes
	// 1 - NSFW content
	// 2 - phishing links
	// 3 - spam
	// 4 - being a dick / bullying
	// 5 - promotions
	// 6 - everyone and here tags
	// 7 - asking to be mod
	// 8 - sending offensive messages
	// 9 - custom warning from mod/admin
	
	try {
		at_user = msg.mentions.members.first();
		if (at_user == undefined) {
			warned_member = msg.author.id;
			warned_username = msg.member.user.tag;
			msg_guild = msg;
		} else {
			warned_member = at_user.user.id;
			warned_username = at_user.user.tag;
			msg_guild = at_user;
		}
	
		// -- take action on user --
		// get directory
		automod_dir = msg.guild.name.replace(" ","_");
		automod_path = logging_path + "/" + automod_dir + "/" + automod_filename;
	
		// read the warning rules file
		rules_files = require('fs');
		rules_files.readFile(automod_path, "utf-8", function(err, data) {
			if (err) {
				return console.log(err);
			}
		
			// add user to dict
			if (user_who_broke_rules_dict[warned_member] == undefined) {
				user_who_broke_rules_dict[warned_member] = 1;
			} else {
				user_who_broke_rules_dict[warned_member] += 1;
			}
		
			// check each rule
			rules_raw = data.split(";");
			for (i=0;i<rules_raw.length;i++) {
				current_server_rule = rules_raw[i].split(",");
				current_action = current_server_rule[0];
				current_warning_count = current_server_rule[1];
				current_warning_time = current_server_rule[2];
			
				// check if user has broken the rules
				if (user_who_broke_rules_dict[warned_member] >= current_warning_count) {
					// take action
					user_2_take_action_on = msg_guild.guild.members.cache.get(warned_member);
					if (current_action == "mute") {
						// mute the user
						user_2_take_action_on.roles.add(muted_role_ID);
						embed_modderation(msg, "<@"+ warned_member + "> AUTOMOD: This user has been automatically muted as they recived to many warnings!", "User Muted!");
					
					} else if (current_action == "kick") {
						// kick the user
						user_2_take_action_on.kick();
						embed_modderation(msg, "<@"+ warned_member + "> AUTOMOD: This user has been automatically kicked as they recived to many warnings!", "User Kicked!");
					
					} else if (current_action == "ban") {
						// ban the user
						user_2_take_action_on.ban();
						embed_modderation(msg, "<@"+ warned_member + "> AUTOMOD: This user has been automatically banned as they recived to many warnings!", "User Banned!");
					}
				}
			
				// send final warning message
				if (user_who_broke_rules_dict[warned_member] == current_warning_count-1) {
					embed_modderation(msg, "<@"+ warned_member + "> AUTOMOD: You will be "+current_action.replace("mute","mut")+"ed if this continues!", "Final Warning!");
				}
			
				// clear warning from dict after specified time
				if (user_who_broke_rules_dict[warned_member] == 1) {
					if (current_warning_time != undefined) {
						setTimeout(function(){
							user_who_broke_rules_dict[warned_member] = 0;
							console.log("user_who_broke_rules_dict cleared:", user_who_broke_rules_dict);
						}, 1000*parseInt(current_warning_time));
					}
				}
			}
		})
	
		// -- write to log --
		// get directory
		warnings_dir = msg.guild.name.replace(" ","_");
		warnings_path = logging_path + "/" + warnings_dir + "/" + warnings_filename;
	
		// make file
		async function make_file() {
			make_server_folder_file(msg, warnings_filename);
				return;
		}
	
		// read file
		async function read_file() {
			await make_file();
			warned_users = [];
			fs_output = require('fs');
			fs_output.readFile(warnings_path, "utf-8", function(err, data) {
				if (err) {
					return console.log(err);
				}
			
				// get date time
				current_datetime = new Date();
				day = ("00" + current_datetime.getDate()).slice(-2);
				month = ("00" + (current_datetime.getMonth()+1)).slice(-2);
				year = ("0000" + current_datetime.getFullYear()).slice(-4);
				hour = ("00" + current_datetime.getHours()).slice(-2);
				min = ("00" + current_datetime.getMinutes()).slice(-2);
				warn = ("0" + warning_code).slice(-1);
			
				// format reason
				if (reason.indexOf("<@") > -1) {
					reason = reason.split("<@")[1].split(">")[1];
				}
			
				// format is {date}{time}{warning code}
				// DDMMYYYYHHMMW
				datetime_formatted = day + month + year + hour + min + warn;
			
				// add reason if user already in database
				warnings_data = data.split("\n");
				if (data != "") { 
					for (i=0;i<warnings_data.length;i++) {
						current_warned_user = warnings_data[i].split("|");
						if (current_warned_user[0].split("-")[0] == warned_member) {
							// add the warnning reason to array
							if (warning_code == 9) {
								current_warned_user.push(datetime_formatted + "=" + reason);
							} else {
								current_warned_user.push(datetime_formatted);
							}
						}
						warned_users.push(current_warned_user.join("|"))
					}
				}
			
				// add user if they not in database
				if (data.indexOf(warned_member) == -1) {
					if (warning_code == 9) {
						warned_users.push(warned_member + "-" + warned_username + "|" + datetime_formatted + "=" + reason);
					} else {
						warned_users.push(warned_member + "-" + warned_username + "|" + datetime_formatted);
					}
				}
			
				// write to file
				warnings_writer = require('fs');
				warnings_writer.writeFile(warnings_path, warned_users.join("\n"), function(err) {
					if (err) {
						console.log(err);
					}
				})
			})
		} read_file();
	} catch {
		console.log("Failed to take action on the user!");
	}
}





// exit
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"exit") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				embed_chat_reply(msg, "JaredBot has been terminated!");
				setTimeout(function(){
					process.exit(1);
				},100);
			} else {
				embed_error(msg, "Your discord ID is not authorised, only moderators and admins can shutdown the bot!");
			}
		}
	}
})

// write to delete messages log
function write_2_log(msg, data) {
	try {
		// write data to log file
		date = String(new Date()).split(" GMT")[0];
		user = msg.member.user.tag;
		channel = msg.channel.name;
		msg_content = data.split("@everyone").join("{everyone}").split("@here").join("{here}").split("@").join("");
		
		fs_log_writer = require('fs');
		fs_log_writer.appendFile(deleted_messages_log_file, "[*Content Filter*]["+channel+"]["+user+"]["+date+"] "+msg_content+"\n", function(err) {
			if (err) {
				console.log(err);
			}
		})
	} catch (err) {
		console.log("Failed to write deleted message to log file!" + err);
	}
}

// Rules
// rule 1 (Only post porn in the NSFW channels)
var porn_links = ['xvideos', 'pornhub', 'xhamster', 'xnxx', 'youporn', 'hclips', 'tnaflix', 'tube8', 'spankbang', 'drtuber', 
'spankwire', 'keezmovies', 'nuvid', 'ixxx', 'sunporno', 'pornhd', 'porn300', 'pornone', 'sexvid', 'thumbzilla', 'zbporn', 'fuq', 'xxxbunker', 
'3movs', 'cumlouder', 'xbabe', 'porndroids', 'alohatube', 'maturetube', 'tubev', '4tube', 'bestfreetube', 'shameless', 'megatube', 'porntube', 
'porndig', 'pornburst', 'bigporn', 'fapster', 'porn.biz', 'bobs-tube', 'redporn', 'pornrox', 'pornmaki', 'pornid', 'slutload', 'proporn', 
'pornhost', 'xxxvideos247', 'handjobhub', 'dansmovies', 'porn7', 'forhertube', 'maxiporn', 'pornheed', 'orgasm', 'pornrabbit', 'tiava', 
'fux', 'h2porn', 'metaporn', 'pornxio', 'pornerbros', 'youjizz', 'iporntv', 'mobilepornmovies', 'watchmygf.mobi', 'pornplanner', 'mypornbible', 
'badjojo', 'findtubes', 'pornmd', 'nudevista', 'jasmin', 'imlive', 'liveprivates', 'joyourself', 'stripchat', 'firecams', 'luckycrush', 
'slutroulette', 'sexedchat', 'jerkmate', 'watchmyexgf', 'fantasti', 'watchmygf.me', 'watch-my-gf.com', 'watchmygf.tv', 'lovehomeporn', 
'iknowthatgirl', 'assoass', 'bigassporn', 'punishtube', 'stufferdb', 'pornpics', 'viewgals', 'jpegworld', 'pichunter', 'nakedpornpics', 
'nakedgirls', '18asiantube', 'zenra', 'bdsmstreak', 'punishbang', 'clips4sale', 'zzcartoon', 'hentaihaven', 'hentaicore', 'hentaigasm', 
'fakku', 'gelbooru', 'hentaisea', 'hentaipulse', 'porcore', 'cartoonporno', 'sankakucomplex', 'hentai-foundry', 'eggporncomics', 'vrporn', 
'vrbangers', 'vrsmash', 'badoinkvr', 'wankzvr', 'czechvr', 'sexlikereal', 'virtualrealporn', 'ddfnetworkvr', 'gaymaletube', 'manporn', 
'youporngay', 'gayfuror', 'zzgays', 'justusboys', 'myporngay', 'iptorrents', 'pussytorrent', 'suicidegirls', 'fashiongirls', 'top live sex cams', 
'freeones', 'barelist', 'babepedia', 'kindgirls', 'tubepornstars', 'bellesa', 'stasyq', 'thechive', 'hotsouthindiansex', 'milfporn', 'shemalehd', 
'anyshemale', 'ashemaletube', 'tranny', 'tgtube', 'besttrannypornsites', 'nutaku', '69games', 'gamcore', 'gamesofdesire', 'jerkdolls','hooligapps',
'lifeselector', 'brazzers', 'the gf network', 'reality kings', 'digital playground', 'mofos', 'adulttime', 'twistys', 'teamskeet', 'bangbros', 
'21sextury', 'elegantangel', 'videosz', 'hustler', 'jav hd', 'newsensations', 'pornpros', 'perfect gonzo', 'clubtug', 'bukkake', 
'all japanese pass', '18videoz', 'nubiles', 'kinkyfamily', 'dorcelclub', 'localhussies', 'meetwives', 'adultfriendfinder', 'freelocalsex',
'onlinefreechat', 'perezhilton', 'nakednews', 'avn', 'maxim', 'menshealth', 'forum.xnxx', 'forumophilia', 'jdforum', 'siliconwives', 
'yourdoll', 'sexysexdoll', 'sexyrealsexdolls', 'dollbobo', 'otonajp', 'joylovedolls', 'siliconesexworld', 'acesexdoll', 
'kikdolls', 'yououdoll', 'absolutesexdoll', 'kanadoll', 'sexdollgenie', 'sexdolls-usa', 'nhentai', 'czechvideo', 'mrporn', 'porngeek', 
'xrares', 'fap1', 'pvideo', 'freevidea.cz', 'porncz', 'pornoland', 'porna', 'pornb', 'pornc', 'pornd', 'porne', 'pornf', 'porng', 'pornh', 
'porni', 'pornj', 'pornk', 'pornl', 'pornm', 'pornn', 'porno', 'pornp', 'pornq', 'pornr', 'porns', 'pornt', 'pornu', 'pornv', 'pornw', 'pornx', 
'porny', 'pornz', 'aporn', 'bporn', 'cporn', 'dporn', 'eporn', 'fporn', 'gporn', 'hporn', 'iporn', 'jporn', 'kporn', 'lporn', 'mporn', 'nporn',
'oporn', 'pporn', 'qporn', 'rporn', 'sporn', 'tporn', 'uporn', 'vporn', 'wporn', 'xporn', 'yporn', 'zporn', 'porn.com', 'tubesafari','axxx', 
'bxxx', 'cxxx', 'dxxx', 'exxx', 'fxxx', 'gxxx', 'hxxx', 'ixxx', 'jxxx', 'kxxx', 'lxxx', 'mxxx', 'nxxx', 'oxxx', 'pxxx', 'qxxx', 'rxxx', 'sxxx', 
'txxx', 'uxxx', 'vxxx', 'wxxx', 'xxxx', 'yxxx', 'zxxx', 'xxxa', 'xxxb', 'xxxc', 'xxxd', 'xxxe', 'xxxf', 'xxxg', 'xxxh', 'xxxi', 'xxxj', 'xxxk', 
'xxxl', 'xxxm', 'xxxn', 'xxxo', 'xxxp', 'xxxq', 'xxxr', 'xxxs', 'xxxt', 'xxxu', 'xxxv', 'xxxw', 'xxxx', 'xxxy', 'xxxz', 'webcamsa', 'webcamsb', 
'webcamsc', 'webcamsd', 'webcamse', 'webcamsf', 'webcamsg', 'webcamsh', 'webcamsi', 'webcamsj', 'webcamsk', 'webcamsl', 'webcamsm', 'webcamsn', 
'webcamso', 'webcamsp', 'webcamsq', 'webcamsr', 'webcamss', 'webcamst', 'webcamsu', 'webcamsv', 'webcamsw', 'webcamsx', 'webcamsy', 'webcamsz', 
'awebcams', 'bwebcams', 'cwebcams', 'dwebcams', 'ewebcams', 'fwebcams', 'gwebcams', 'hwebcams', 'iwebcams', 'jwebcams', 'kwebcams', 'lwebcams', 
'mwebcams', 'nwebcams', 'owebcams', 'pwebcams', 'qwebcams', 'rwebcams', 'swebcams', 'twebcams', 'uwebcams', 'vwebcams', 'wwebcams', 'xwebcams', 
'ywebcams', 'zwebcams', 'pornoa', 'pornob', 'pornoc', 'pornod', 'pornoe', 'pornof', 'pornog', 'pornoh', 'pornoi', 'pornoj', 'pornok', 'pornol', 
'pornom', 'pornon', 'pornoo', 'pornop', 'pornoq', 'pornor', 'pornos', 'pornot', 'pornou', 'pornov', 'pornow', 'pornox', 'pornoy', 'pornoz', 'aporno', 
'bporno', 'cporno', 'dporno', 'eporno', 'fporno', 'gporno', 'hporno', 'iporno', 'jporno', 'kporno', 'lporno', 'mporno', 'nporno', 'oporno', 'pporno', 
'qporno', 'rporno', 'sporno', 'tporno', 'uporno', 'vporno', 'wporno', 'xporno', 'yporno', 'zporno', 'ahentai', 'bhentai', 'chentai', 'dhentai', 'ehentai', 
'fhentai', 'ghentai', 'hhentai', 'ihentai', 'jhentai', 'khentai', 'lhentai', 'mhentai', 'nhentai', 'ohentai', 'phentai', 'qhentai', 'rhentai', 'shentai', 
'thentai', 'uhentai', 'vhentai', 'whentai', 'xhentai', 'yhentai', 'zhentai', 'hentaia', 'hentaib', 'hentaic', 'hentaid', 'hentaie', 'hentaif', 'hentaig', 
'hentaih', 'hentaii', 'hentaij', 'hentaik', 'hentail', 'hentaim', 'hentain', 'hentaio', 'hentaip', 'hentaiq', 'hentair', 'hentais', 'hentait', 'hentaiu', 
'hentaiv', 'hentaiw', 'hentaix', 'hentaiy', 'hentaiz', 'dinotube', 'dlouha-videa', 'nejlepsipecko', 'ceskekundy', 'pvideo', 'zaprachy', 'dameporno',
'ceskeloznice', 'free-tv'];

bot.on("message", msg => {
	if (content_filtering == true){
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			for (i=0;i<porn_links.length;i++) {
				if (msg.content.toLowerCase().indexOf(porn_links[i]) > -1) {
					write_2_log(msg, msg.content);
					msg.delete();
					embed_modderation(msg, "<@" + msg.author.id + "> Do not post links to pornographic content!", "WARNING!");
					on_warning(msg, 1);
				}
			}
		}
	}
})

// rule 2 (No phishing website links)
/*function http_request() {
	request = require('request');
	site_checker = "https://transparencyreport.google.com/safe-browsing/search?url=";
	phishing_url = "https://www.google.co.uk/?gws_rd=ssl";
			
	// format data
	url2check = site_checker + phishing_url.replace("https://", "http://").split("http://")[1].split("/");
	
	request({uri: url2check}, function(err, res, body) {
		return body;
	})
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"getdata") {
			
		}
	}
})*/


// rule 3 (No spamming the same repetitive message)
var max_spam_count = 5;
var user_spam_dict = {}

bot.on("message", msg => {
	if (content_filtering == true) {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.author.bot == false) {
				// add user to dict
				if (user_spam_dict[msg.author.id] == undefined) {
					user_spam_dict[msg.author.id] = [1, msg.content, ""]; // count, previous message, new message
				} else {
					user_spam_dict[msg.author.id] = [user_spam_dict[msg.author.id][0], user_spam_dict[msg.author.id][2], msg.content];
					if (user_spam_dict[msg.author.id][1] == user_spam_dict[msg.author.id][2]) {
						user_spam_dict[msg.author.id] = [user_spam_dict[msg.author.id][0]+1, user_spam_dict[msg.author.id][2], msg.content];
					} else {
						user_spam_dict[msg.author.id] = [0, user_spam_dict[msg.author.id][2], msg.content];
					}
				}
				
				// check counter
				if (user_spam_dict[msg.author.id][0] >= max_spam_count) {
					embed_modderation(msg, "<@" + msg.author.id + "> Don't spam the same message!", "WARNING!");
					user_spam_dict[msg.author.id] = [0, user_spam_dict[msg.author.id][2], msg.content];
					on_warning(msg, 3);
				}
			}
		}
	}
})

// rule 4 (Don’t be a dick or bully others, be kind)
// rule 5 (Only post promotions in the advertisement channel)
bot.on("message", msg => {
	if (content_filtering == true) {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.content.indexOf("https://discord.gg/") > -1) {
				if (msg.channel.id != adds_channel_ID) {
					if (msg.author != bot_ID) {
						if (authorised_IDs.indexOf(msg.author.id) == -1) {
							write_2_log(msg, msg.content);
							msg.delete();
							embed_modderation(msg, "<@" + msg.author.id + "> Only post promotions in the adds channel!", "WARNING!");
							on_warning(msg, 5);
						}
					}
				}
			}
		}
	}
})

// rule 6 (No raids, such as pinging everyone)
bot.on("message", msg => {
	if (content_filtering == true) {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.author.id != bot_ID) {
				if (msg.content.indexOf("@everyone") > -1) {
					write_2_log(msg, msg.content);
					msg.delete();
					embed_modderation(msg, "<@" + msg.author.id + "> Dont use everyone tag!", "WARNING!");
					on_warning(msg, 6);
		
				} else if (msg.content.indexOf("@here") > -1) {
					write_2_log(msg, msg.content);
					msg.delete();
					embed_modderation(msg, "<@" + msg.author.id + "> Dont use here tag!", "WARNING!");
					on_warning(msg, 6);
				}
			}
		}
	}
})

// rule 7 (No asking to be moderator)
var give_mod = ["can i be mod", "add me as mod", "give me mod", "give mod", "plz mod", "please mod", 
"i want mod", "i want to be mod", "add me to mod"];
var give_adm = ["can i be admin", "add me as admin", "give me admin", "give admin", 
"plz admin", "please admin", "i want admin", "i want to be admin", "add me to admin"];
bot.on("message", msg => {
	if (content_filtering == true) {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (authorised_IDs.indexOf(msg.author.id) == -1) {
				// mod
				for (i=0;i<give_mod.length;i++) {
					if (msg.content.indexOf(give_mod[i]) > -1) {
						embed_modderation(msg, "<@" + msg.author.id + "> No asking to be Moderator!", "WARNING!");
						on_warning(msg, 7);
					}
				}
		
				// admin
				for (i=0;i<give_adm.length;i++) {
					if (msg.content.indexOf(give_adm[i]) > -1) {
						embed_modderation(msg, "<@" + msg.author.id + "> No asking to be Admin!", "WARNING!");
						on_warning(msg, 7);
					}
				}
			}
		}
	}
})

// rule 8 (No sending offensive messages)
var trigger_word = ['kill your self', 'kys', 'go fuck', 'fucking die', 'stupid bitch', 'hey bitch', 'nice try bitch', 
'are you a retard', 'fucking retard', 'go fuck yourself', 'of shit', 'nigger', 'nigga', 'fucking kill', 'fucking bitch', 'poor fuck', 
'dickhead', 'ur mom a hoe', 'dick head', 'motherfucker', 'fuck of', 'fuck you', 'fuck u', 'fucking hoe', 'i will rape', 
"negr", "buzna"];

bot.on("message", msg => {
	if (content_filtering == true) {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			for (i=0;i<trigger_word.length;i++) {
				// Format text
				msg_content = msg.content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() // replace accents with letters
				msg_content = msg_content.replace(" ","").replace("\n","").replace("\t",""); // removes spaces and tabs
				msg_content = msg_content.replace("1","i").replace("2","s").replace("5","s").replace("0","o") // replace numbers with letters
				
				if (msg_content.indexOf(trigger_word[i]) > -1) {
					write_2_log(msg, msg.content);
					msg.delete();
					embed_modderation(msg, "<@" + msg.author.id + "> No sending offensive or alarming messages!", "WARNING!");
					on_warning(msg, 8);
				}
			}
		}
	}
})

// toggle content filtering
bot.on("message", msg => {
	if (msg.content.toLowerCase() == prefix+"filter on") {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				content_filtering = true;
				embed_info_reply(msg, "Content Filtering turned on!");
			} else {
				embed_error(msg, "Only mods/admins can turn content filtering on or off!")
			}
		}
	} else if (msg.content.toLowerCase() == prefix+"filter off") {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				content_filtering = false;
				embed_info_reply(msg, "Content Filtering turned off!");
			} else {
				embed_error(msg,"Only mods/admins can turn content filtering on or off!");
			}
		}
	} else if (msg.content.slice(0,7).toLowerCase() == prefix+"filter") {
		embed_error(msg, "Invalid Format! Correct format is `-filter [on/off]`!");
	}
})

// send message if server is not authroised to run command
bot.on("message", msg => {
	if (msg.author.id != bot_ID) {
		if (msg.content.slice(0,1) == prefix) {
			if (msg.content != prefix+"authorise" && msg.content != prefix+"help") {
				var error_text = "[Authorization Error]";
				if (authrosied_server_IDs.indexOf(msg.guild.id) == -1 && msg.content.indexOf(error_text) == -1) {
					embed_error(msg, error_text+" Your Server is not authorised to run this command! Please type `-authorise` to authorise your server ID!");
				}
			}
		}
	}
})

// authorise server
bot.on("message", msg => {
	if (msg.content == "-authorise") {
		// get the server ID
		Server_ID = msg.guild.id;
		
		if (authrosied_server_IDs.indexOf(Server_ID) > -1) {
			embed_info_reply(msg, "Your Server has already been authorised!");
		} else {
			// write server ID to file
			fs_writer = require('fs');
			fs_writer.appendFile(authorised_servers, Server_ID + ";\n", function(err) {
				if (err) {
					return console.log(err);
					embed_error(msg, "Failed to authorise your server ID!");
				} else {
					embed_info_reply(msg, "Your Server ID has been authorised!");
				
					// update variable
					authrosied_server_IDs.push(Server_ID);
				}
			})
		}
	}
})

// previous adds channel message
var previous_message = "";

// remove duplicate adds from add channel
bot.on("message", msg => {
	if (remove_duplicate_adds == true) {
		if (msg.channel.id == adds_channel_ID) {
			if (msg.author != bot_ID) {
				if (msg.content.indexOf("https://discord.gg/") > -1) {
					current_message = msg.content.split("https://discord.gg/")[1].split(" ")[0].replace("\n","");
					console.log("CURRENT: " + current_message);
					console.log("PREVIOUS: " + previous_message);
						
					// check if new and previous message are the same
					if (current_message == previous_message) {
						write_2_log(msg, msg.content);
						msg.delete();
						embed_info_reply(msg, "You already posted the same invite link in the previous message!");
					}
				}
			}
		}
	}
})

// delete Spotify invite links
bot.on("message", msg => {
	if (content_filtering == true) {
		if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.channel.id != adds_channel_ID) {
				if (msg.author.bot == false) {
					if (msg.activity != null) {
						try {
							InviteURL = msg.activity.partyID;
							if (InviteURL.indexOf("spotify:") > -1) {
								if (msg.channel.id != music_sharring_channel) {
									write_2_log(msg, msg.content);
									msg.delete();
									embed_modderation(msg, "<@" + msg.author.id + "> Only post Spotify connect links in music-sharing!", "WARNING!");
									on_warning(msg, 5);
								}
							} else if (msg.application.name != null) {
								if (msg.channel.id != game_invite_channel) {
									write_2_log(msg, msg.content);
									msg.delete();
									embed_modderation(msg, "<@" + msg.author.id + "> Only post game invite links in game-invites!", "WARNING!");
									on_warning(msg, 5);
								}
							}
							
							//console.log([msg.application.name, msg.channel.id]);
						} catch {
							console.log("Application Invite link detected!");
						}
					}
				}
			}
		}
	}
})

bot.on("message", msg => {
	let add_channel_temp = bot.channels.cache.get(adds_channel_ID);
	add_channel_temp.messages.fetch({ limit: 1}).then(message => {
		try {
			previous_message = message.first().content.split("https://discord.gg/")[1].split(" ")[0].replace("\n","");
		} catch {}
	})
})

// translate
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,11) == prefix+"translate ") {
			src = msg.content.slice(11,msg.content.length)
		
			// write to file
			fs_writer = require('fs');
			fs_writer.writeFile(input_file_translate, src, function(err) {
				if (err) {
					return console.log(err);
				}
			})
		
			// read output file
			setTimeout(function() {
				fs_output = require('fs');
				fs_output.readFile(output_file_translate, "utf-8", function(err, data) {
					if (err) {
						return console.log(err);
					}
				
					// send message to user
					translate_description = "Output from Translate API";
					translate_URL = "https://translate.google.com/"
					input_data = msg.content.slice(11, msg.content.length);
					embed_input_output_reply(msg, input_data, data, "Translation", translate_description, url=translate_URL);
					
				})
			}, 2000, msg);
		}
	}
})

// base (convert to hex, oct, bin)
function hex_oct_bin(msg, base, base_name) {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0,5) == prefix+base_name+" ") {
			value = msg.content.slice(5, msg.content.length);
			if (isNaN(parseInt(value))) {
				hex_string = "";
				for (i=0;i<value.length;i++) {
					hex_string = hex_string + String(value.charCodeAt(i).toString(base)) + " ";
				}
				embed_input_output_reply(msg, value, hex_string, "Calculator", "type -help math for list of commands");
			} else {
				calc_output_data = parseInt(value).toString(base);
				embed_input_output_reply(msg, value, calc_output_data, "Calculator", "type -help math for list of commands");
			}
		}
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		hex_oct_bin(msg, 16, "hex");
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		hex_oct_bin(msg, 8, "oct");
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		hex_oct_bin(msg, 2, "bin");
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"base") {
			value = msg.content.slice(5, msg.content.length).split(" ");
			if (value.length == 2) {
				base = value[0];
				num = value[1];
				if (isNaN(parseInt(base)) == false && isNaN(parseInt(num)) == false) {
					if (base <= 36 && base >= 2) {
						calc_output_data = parseInt(num).toString(parseInt(base));
						embed_input_output_reply(msg, num, calc_output_data, "Calculator", "type -help math for list of commands");
					} else {
						embed_error(msg, "Your base value must be within the rage 2-36!");
					}
				} else {
					embed_error(msg, "Invalid Format! both your base and num values must be integers!");
				}
			} else {
				embed_error(msg, "Invalid Format! correct format is `"+prefix+"base{num1} {num2}` e.g. `"+prefix+"base10 50`")
			}
		}
	}
})

// backwards conversion bin2int, oct2int, hex2int
function base2int(msg, content, command, base_name, base, base_charset) {
	if (content.slice(0, command.length+2) == prefix+command+" ") {
		value = content.slice(9, content.length);
		for (i=0;i<value.length;i++) {
			if (base_charset.indexOf(value[i]) == -1) {
				embed_error(msg, "Invalid Number! Make sure that your number is in " + base_name + "!");
				return;
			}
		}
		// number is fine
		embed_input_output_reply(msg, value, parseInt(value, base), "Calculator", "type -help math for list of commands");
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"bin2int ") {
			base2int(msg, msg.content, "bin2int", "binary", 2, "01");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"oct2int ") {
			base2int(msg, msg.content, "oct2int", "octodecimal", 8, "01234567");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"hex2int ") {
			base2int(msg, msg.content, "hex2int", "hexadecimal", 16, "0123456789abcdef");
		}
	}
})

// bin2text, oct2text, hex2text
function base2text(msg, base_charset, base) {
	values = msg.content.slice(10, msg.content.length).split(" ");
	base_names = {2 : "Binary", 8 : "Octal Decimal", 16 : "Hexadecimal"};
	output = "";
	
	for (n=0;n<values.length;n++) {
		// itter through each digit in string
		digits = values[n];
		for (i=0;i<digits.length;i++) {
			if (base_charset.indexOf(digits[i]) == -1) {
				embed_error(msg, "Invalid Input make sure that your number is in "+base_names[base]+"!");
				return true;
			}
		}
	
		// number is fine
		output = output + String.fromCharCode(parseInt(digits, base));
	}
	// send user message
	//msg.reply(output);
	embed_input_output_reply(msg, values.join(" "), output, "Calculator", "type -help math for list of commands");
	
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 10) == prefix+"bin2text ") {
			base2text(msg, "01", 2);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 10) == prefix+"oct2text ") {
			base2text(msg, "01234567", 8);
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 10) == prefix+"hex2text ") {
			base2text(msg, "0123456789abcdef", 16);
		}
	}
})


// int to roman numberal
function int2roman(msg, num) {
	units = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
	tens = ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
	hundreds = ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
	thousands = ["M", "MM", "MMM", "MMMM"];
	
	if (isNaN(parseInt(num)) == false) {
		if (parseInt(num) < 5000 && parseInt(num) > 0) {
			switch (num.length) {
				case 4:
					answer = (thousands[num[0]-1] + hundreds[num[1]-1] + tens[num[2]-1] + units[num[3]-1]).split("undefined").join("");
					break;
				case 3:
					answer = (hundreds[num[0]-1] + tens[num[1]-1] + units[num[2]-1]).split("undefined").join("");
					break;
				case 2:
					answer = (tens[num[0]-1] + units[num[1]-1]).split("undefined").join("");
					break;
				case 1:
					answer = (units[num[0]-1]).split("undefined").join("");
					break;
			}
			// send message
			//msg.reply(answer);
			embed_input_output_reply(msg, num, answer, "Calculator", "type -help math for list of commands");
		} else {
			embed_error(msg, "Invalid Range! Make sure that your number is between 0 and 4999!");
		}
	} else {
		embed_error(msg, "Invalid Input! make sure that your number is an integer!");
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 7) == prefix+"roman ") {
			int2roman(msg, msg.content.slice(7, msg.content.length));
		}
	}
})

// periodic table
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"element ") {
			element_no = msg.content.slice(9, msg.content.length);
			element_names = {
				"hydrogen" : 1, "helium" : 2, "lithium" : 3, "beryllium" : 4, "boron" : 5, "carbon" : 6, "nitrogen" : 7, "oxygen" : 8,
				"fluorine" : 9, "neon" : 10, "sodium" : 11, "magnesium" : 12, "aluminum" : 13, "silicon" : 14, "phosphorus" : 15, "sulfur" : 16, 
				"chlorine" : 17, "argon" : 18, "potassium" : 19, "calcium" : 20, "scandium" : 21, "titanium" : 22, "vanadium" : 23, "chromium" : 24,
				"manganese" : 25, "iron" : 26, "cobalt" : 27, "nickel" : 28, "copper" : 29, "zinc" : 30, "gallium" : 31, "germanium" : 32, "arsenic" : 33,
				"selenium" : 34, "bromine" : 35, "krypton" : 36, "rubidium" : 37, "strontium" : 38, "yttrium" : 39, "zirconium" : 40, "niobium" : 41,
				"molybdenum" : 42, "technetium" : 43, "ruthenium" : 44, "rhodium" : 45, "palladium" : 46, "silver" : 47, "cadmium" : 48, "indium" : 49,
				"tin" : 50, "antimony" : 51, "tellurium" : 52, "iodine" : 53, "xenon" : 54, "cesium" : 55, "barium" : 56, "lanthanum" : 57, "cerium" : 58,
				"praseodymium" : 59, "neodymium" : 60, "promethium" : 61, "samarium" : 62, "europium" : 63, "gadolinium" : 64, "terbium" : 65, "dysprosium" : 66,
				"holmium" : 67, "erbium" : 68, "thulium" : 69, "ytterbium" : 70, "lutetium" : 71, "hafnium" : 72, "tantalum" : 73, "tungsten" : 74, "rhenium" : 75,
				"osmium" : 76, "iridium" : 77, "platinum" : 78, "gold" : 79, "mercury" : 80, "thallium" : 81, "lead" : 82, "bismuth" : 83, "polonium" : 84,
				"astatine" : 85, "radon" : 86, "francium" : 87, "radium" : 88, "actinium" : 89, "thorium" : 90, "protactinium" : 91, "uranium" : 92, "neptunium" : 93,
				"plutonium" : 94, "americium" : 95, "curium" : 96, "berkelium" : 97, "californium" : 98, "einsteinium" : 99, "fermium" : 100, "mendelevium" : 101,
				"nobelium" : 102, "lawrencium" : 103, "rutherfordium" : 104, "dubnium" : 105, "seaborgium" : 106, "bohrium" : 107, "hassium" : 108, "meitnerium" : 109
			}
			
			if (isNaN(parseInt(element_no)) == true) {
				element_no = element_names[element_no.toLowerCase()];
			}
			
			
			if (isNaN(parseInt(element_no)) == false) {
				if (element_no >= 1 && element_no <= 109) {
					// read dataset
					fs_output = require('fs');
					fs_output.readFile(dataset_elements, "utf8", function(err, data) {
						if (err) {
							return console.log(err);
						}
						//get element
						headers = [	'Number', 'Atomic Weight', 'Name', 'Symbol', 'Melting Point (°C)', 'Boiling Point (°F)', 'Density* (g/cm3)', 
						'Earth crust (%)*', 'Discovery (Year)', 'Group', 'Electron configuration', 'Ionization energy (eV)', 'Description'];
						data_array = data.split("\n")[element_no-1].split("|");
						info = "";
						
						// message
						embed_element = new Discord.MessageEmbed();
						embed_element.setColor(embed_colour_info);
					
						for (i=0;i<headers.length;i++) {
							try {
								if (headers[i] == "Description") {
									embed_element.setDescription(data_array[i]);
								} else {
									embed_element.addField(headers[i], data_array[i], true);
								}
								
								if (headers[i] == "Name") {
									embed_element.setTitle(data_array[i]);
									embed_element.setURL("https://en.wikipedia.org/wiki/" + data_array[i]);
								}
								
							} catch {
								//info = info + (headers[i] + ":\t" + data_array[i]) + "\n";
							}
						}
					
						// send message to user
						embed_element.setTimestamp();
						embed_element.setFooter(element_no);
						embed_element.setImage(webserver_elms_dataset + "/" + element_no + ".jpg");
						msg.channel.send(embed_element);
					
					})
				} else {
					embed_error(msg, "Not a valid element number! make sure the number is within range 1 to 109!");
				}
			} else {
				embed_error(msg, "Invalid Format! the correct format is `-element {element No.}` or `-element {name}`, " +
				"For example `-element 94` will display information on Plutonium or `-element gold` will display information on Gold!");
			}
		} else if (msg.content.slice(0, 9) == prefix+"element") {
			embed_error(msg, "Invalid Format! the correct format is `-element {element No.}` or `-element {name}`, " +
			"For example `-element 94` will display information on Plutonium or `-element gold` will display information on Gold!");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix+"periodictable" || msg.content == prefix+"table") {
			reply_text = "You can type `-element {elm no.}` to get more speific information about an element!";

			// Send Message
			embed_periodic_table = new Discord.MessageEmbed();
			embed_periodic_table.setColor(embed_colour_info);
			embed_periodic_table.setTitle("Periodic Table");
			embed_periodic_table.setDescription(reply_text);
			embed_periodic_table.setImage(periodic_table);
			embed_periodic_table.setTimestamp();
			msg.channel.send(embed_periodic_table);
			
		}
	}
})

// Pokemon
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 9) == prefix+"pokemon ") {
			poke_index = msg.content.slice(9, msg.content.length);
			
			// check if poke index is a name
			if (isNaN(parseInt(poke_index)) == true) {
				fs_pokemon_output = require('fs');
				fs_pokemon_output.readFile(dataset_pokemon, "utf8", function(err, data) {
					if (err) {
						return console.log(err);
					}
					
					//get data
					raw_data_names = data.split("\n");
					raw_data_names_array = [];
					for (i=0;i<raw_data_names.length;i++) {
						try {
							raw_data_names_array.push(raw_data_names[i].split("Name:")[1].split("|")[0].split(" ").join("").toLowerCase());
						} catch {
							console.log("failed to add pokemon '" + raw_data_names[i] + "' to list");
						}
					}
				
					// check if poke index is in the file
					if (raw_data_names_array.indexOf(poke_index.toLowerCase().split(" ").join("")) > -1) {
						poke_index = raw_data_names_array.indexOf(poke_index.toLowerCase().split(" ").join("")) +1;
					}
				})
			}
			
			
			
			// display pokemon card
			setTimeout(function() {
				if (isNaN(parseInt(poke_index)) == false) {
					if (poke_index >= 1 && poke_index <= 893) {
						if (String(poke_index).lastIndexOf(".") == -1 && String(poke_index).indexOf("-") == -1) {
							// read file
							fs_pokemon_output = require('fs');
							fs_pokemon_output.readFile(dataset_pokemon, "utf8", function(err, data) {
								if (err) {
									return console.log(err);
								}
					
								// embed
								embed_pokemon = new Discord.MessageEmbed();
								embed_pokemon.setColor(embed_colour_info);
								
								try {
									// format data
									pokemons = [];
									basic_stats = ["HP", "Attack", "Defense", "Special Attack", "Special Defense", "Speed"];
									pokemon_raw_data = data.split("\n")[poke_index-1].split("|");
									poke_description = "";
									poke_basic_stats = "";
					
									for (i=0;i<pokemon_raw_data.length;i++) {
										poke_current_line = pokemon_raw_data[i].split("\r").join("").split("\n").join("");
										poke_header = poke_current_line.split(":")[0];
										poke_value = poke_current_line.split(":")[1];
						
										if (poke_header == "Name") {
											embed_pokemon.setTitle(poke_value + "\u200B");
											embed_pokemon.setURL("https://www.pokemon.com/uk/pokedex/" + poke_value);
										} else if (poke_header == "Description_X") {
											poke_description = poke_description + "X: " + poke_value + "\n\u200B";
										} else if (poke_header == "Description_Y") {
											poke_description = poke_description + "Y: " + poke_value + "\n\u200B";
										} else if (poke_header == "Number") {
											embed_pokemon.setFooter(poke_value + "\u200B");
											embed_pokemon.setTimestamp();
										} else if (basic_stats.indexOf(poke_header) > -1) {
											// padding var
											current_padding =  "🟦".repeat(poke_value);
											footer_poke_paddings = [8, 6, 5, 1, 0, 6];
											footer_poke_spaces = [2, 1, 1, 1, 1, 2];
							
											// padding
											invisible_chars = "\u2800".repeat(footer_poke_paddings[basic_stats.indexOf(poke_header)]);
											space_chars = " ".repeat(footer_poke_spaces[basic_stats.indexOf(poke_header)]);
											poke_header_padding =  invisible_chars + space_chars + poke_header;
							
											poke_basic_stats = poke_basic_stats + poke_header_padding + ": " + current_padding + "\n";
										} else {
											if (poke_header != "") {
												embed_pokemon.addField(poke_header + "\u200B", poke_value + "\u200B", true);
											}
										}
									}
					
									// send message
									embed_pokemon.setDescription(poke_description + "\u200B");
									embed_pokemon.setAuthor("Pokemon Card");
									embed_pokemon.setFooter(""+poke_basic_stats + "\n" + poke_index);
									embed_pokemon.setImage(webserver_pokemon_dataset + "/" + poke_index + ".jpg");
									msg.channel.send(embed_pokemon);
								} catch {
									embed_error(msg, "Failed to get pokemon info for unknown reason!");
								}
							})
						} else {
							embed_error(msg, "Decimal indexs are not allowd, please make sure you enter a whole number!");
						}
					} else {
						embed_error(msg, "Pokemon index out of range, please make sure your number is between 1 and 893!");
					}
				} else {
					embed_error(msg, "The specified pokemon could not be found, you can specify a pokemon by index, " +
					"for example `-pokemon 39` will show info for Jigglypuff , or by name e.g. `-pokemon Pikachu` for info on Pikachu!")
				}
			}, read_input_file_pokemon_dataset);
		} else if (msg.content == prefix+"pokemon") {
			embed_error(msg, "Please Specify a pokemon, you can specify a pokemon by index, " +
			"for example `-pokemon 39` will show info for Jigglypuff , or by name e.g. `-pokemon Pikachu` for info on Pikachu!")
		}
	}
})

// maths functions
function is_leap(msg, year) {
	if ((year % 4 && (year % 100 != 0 || year % 400 == 0)) == true) {
		leapyear_output = "false " + year + " is not a leap year!";
		embed_input_output_reply(msg, year, leapyear_output, "Calculator", "type -help math for list of commands");
	} else {
		leapyear_output = "true " + year + " is a leap year!";
		embed_input_output_reply(msg, year, leapyear_output, "Calculator", "type -help math for list of commands");
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"isleap ") {
			year = msg.content.slice(8, msg.content.length);
			if (isNaN(parseInt(year)) == false) {
				if (year % 1 == 0) {
					is_leap(msg, year);
				} else {
					embed_error(msg, "Year must be a whole number!");
				}
			} else {
				embed_error(msg, "Invalid Format! The correct format is `-isleap {year}`!");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"bmi ") {
			input_text = msg.content.slice(5, msg.content.length).split(" ");
			if (input_text.length == 2) {
				if (isNaN(parseInt(input_text[0])) == false && isNaN(parseInt(input_text[1])) == false) {
					bmi =  parseInt(input_text[1]) / ( (parseInt(input_text[0])/100) ** 2);
					reply_text = "\nHeight: "+input_text[0]+"cm\nWeight: "+input_text[1]+"kg\nBMI: "  +bmi.toFixed(2);
					if (bmi <= 18.5) {
						reply_text = reply_text + "\nWeight Status: Underweight";
					} else if (bmi >= 18.5 && bmi <= 24.9) {
						reply_text = reply_text + "\nWeight Status: Normal Weight";
					} else if (bmi >= 25.0 && bmi <= 29.0) {
						reply_text = reply_text + "\nWeight Status: Overweight";
					} else if (bmi >= 30.0 && bmi <= 34.9) {
						reply_text = reply_text + "\nWeight Status: Obesity Class 1";
					} else if (bmi >= 35.0 && bmi <= 39.9) {
						reply_text = reply_text + "\nWeight Status: Obesity Class 2";
					} else if (bmi >= 40) {
						reply_text = reply_text + "\nWeight Status: Obesity Class 3";
					}
				
					// send message
					embed_info_reply(msg, reply_text+"\n\nPlease be aware that BMI is not an accurate representation of a persons health, as it does not take into account fat or muscle."+
					" For example a person who does a lots of sport, may have a higher BMI then someone that is inactive, but be a lot healthier.");
				} else {
					embed_error(msg, "Invalid Input! Your height and weight must be numbers!");
				}
			} else {
				embed_error(msg, "Invalid format! should be `-bmi {height in cm} {weight in kg}`");
			}
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 3) == prefix+"c " || msg.content.toLowerCase().slice(0, 3) == prefix+"f ") {
			temp = msg.content.slice(3, msg.content.length);
			if (isNaN(parseInt(temp)) == false) {
				if (msg.content.toLowerCase().slice(0, 3) == prefix+"c ") {
					temp_output = String(((temp * (9/5)) + 32).toFixed(1)).replace(".0","");
					embed_input_output_reply(msg, temp+"°C", temp_output+"°F", "Calculator", "type -help math for list of commands");
					
				} else if (msg.content.toLowerCase().slice(0, 3) == prefix+"f ") {
					temp_output = String(((temp - 32) * (5/9)).toFixed(1)).replace(".0","");
					embed_input_output_reply(msg, temp+"°F", temp_output+"°C", "Calculator", "type -help math for list of commands");
				}
			} else {
				embed_error(msg, "Invalid Input! your temperature must be a number!");
			}
		}
	}
})

// calc
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"calc ") {
			// format the string
			command = msg.content.slice(6, msg.content.length).split(" ").join("") + "+0";
			command = command.split("<<").join("l").split(">>").join("r").split("**").join("p");
			operators = "+-*/%&|^lrp";
			syntax_error = false;
			
			last_op = 0
			parts = [];
			
			// get each part
			for (i=0;i<command.length;i++) {
				current_part = command.slice(last_op, i);
				if (operators.indexOf(command[i]) > -1) {
					// current char is an operator
					parts.push(current_part);
					last_op = i;
				}
			}
			
			// check parts for non numeric char
			for (i=0;i<parts.length;i ++) {
				if (i != 0) {
					cpart = parts[i].slice(1, parts[i].length);
				} else {
					cpart = parts[i];
				} if (isNaN(cpart) == true) {
					syntax_error = true;
				}
			}
			
			// do the math
			answer = 0;
			part_count = 0;
			
			for (i=0;i<parts.length;i++) {
				operator = parts[i].slice(0, 1);
				number = parts[i].slice(1, parts[i].length);
				
				// operators
				if (part_count > 0) {
					switch (operator) {
						case "+":	// add
							answer += parseFloat(number);
							break;
						case "-":	// subtract
							answer -= parseFloat(number);
							break;
						case "*":	// times
							answer *= parseFloat(number);
							break;
						case "/":	// divide
							answer /= parseFloat(number);
							break;
						case "%":	// modulus
							answer %= parseFloat(number);
							break;
						case "&":	// AND (bitwise)
							answer &= parseFloat(number);
							break;
						case "|":	// OR (bitwise)
							answer |= parseFloat(number);
							break;
						case "^":	// XOR (bitwise)
							answer ^= parseFloat(number);
							break;
						case "l":	// Left Shift (bitwise)
							answer <<= parseFloat(number);
							break;
						case "r":	// Right Shift (bitwise)
							answer >>= parseFloat(number);
							break;
						case "p":	// Power
							answer **= parseFloat(number);
							break;
					}
					part_count += 1;
				} else {
					answer = parseFloat(parts[0]);
					part_count += 1;
				}
			}
			
			// send message to user
			if (syntax_error == false) {
				if (isNaN(answer) == true) {
					embed_error(msg, "Error! Failed to calculate!");
				} else if (answer == Infinity) {
					embed_error(msg, "Infinity Error! Answer is to big!");
				} else {
					calc_output = msg.content.slice(6, msg.content.length);
					embed_input_output_reply(msg, calc_output, answer, "Calculator", "type -help math for list of commands");
				}
			} else {
				embed_error(msg, "Syntax Error! The calculation could not be preformed!");
			}
			
		}
	}
})

// calc help
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix+"calc") {
			embed_calc_help = new Discord.MessageEmbed();
			embed_calc_help.setTitle("Calculator");
			embed_calc_help.setColor(embed_colour_info);
			embed_calc_help.setDescription("to use the calculator type `-calc {equation}`! For example: `-calc 2**10-24` Will return `1000`! " +
				"Be aware the order of operation is not compliant to BIDMAS, calculations are preformed in the order they are typed! " +
				"When using the calculator all of the following operators are valid");
			embed_calc_help.addFields(
				{name: "+", value: "Addition, adds number together, 56 + 44 = 100", inline: true},
				{name: "-", value: "Subtraction, subtract numbers, 100 - 10 = 90", inline: true},
				{name: "*", value: "Times, times numbers together, 91*10 = 910", inline: true},
				{name: "/", value: "Division, divide numbers, 66 / 3 = 22", inline: true},
				{name: "%", value: "Modules, modula numbers together, 69 % 2 = 1", inline: true},
				{name: "**", value: "Power, raise a number to the power of, 2 ** 10 = 1024", inline: true},
				{name: "&", value: "AND, use the AND bitwise AND operator on a number, 8 & 8 = 8", inline: true},
				{name: "|", value: "OR, use the OR bitwise operator on a number, 34 | 89 = 123", inline: true},
				{name: "^", value: "XOR, use the XOR bitwise operator on a number, 2 ^ 8 = 10", inline: true},
				{name: "<<", value: "Left Shift bitwise operator, shift the binary bits in a number left, 2 << 10 = 2048", inline: true},
				{name: ">>", value: "Right Shift bitwise operator, shift the binary bits in a number right, 343434 >> 10 = 335", inline: true}
			)
			msg.channel.send(embed_calc_help);
		}
	}
})

// int2num
function hundred(n) {
	units = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
	tens = ["ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];
	teens = ["eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
	
	if (n >= 1 && n <= 19) {
		return (units + [",ten,"] + teens).split(",")[n-1];
	} else if (String(n).length == 2 && n % 10 == 0) {
		return tens[String(n)[0]-1];
	} else if (String(n).length == 2) {
		return tens[String(n)[0]-1] + " " + units[String(n)[1]-1];
	} else if (String(n).length == 3 && String(n)[1] == 1 && String(n)[2] == 0) {
		return units[String(n)[0]-1] + " hundred and ten";
	} else if (String(n).length == 3 && n % 100 == 0) {
		return units[String(n)[0]-1] + " hundred";
	} else if (String(n).length == 3 && String(n)[1] == 1) {
		return (units[String(n)[0]-1] + " hundred and " + teens[String(n)[2]-1]).replace("undefined","").replace("  "," ");
	} else if (String(n).length == 3) {
		return (units[String(n)[0]-1] + " hundred and " + tens[String(n)[1]-1] + " " + units[String(n)[2]-1]).replace("undefined","").replace("  "," ");
	} else if (n == 0) {
		return "zero";
	}
}

function int2num(msg, n, doReply) {
	scale = ["", "thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion",
	"Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion", "Tredecillion", "Quattuordecillion",
	"Quindecillion", "Sexdecillion", "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Unvigintillion",
	"Duovigintillion", "Trevigintillion", "Quattuorvigintillion", "Quinvigintillion", "Sexvigintillion", "Septenvigintillion",
	"Octovigintillion", "Novemvigintillion", "Trigintillion", "Untrigintillion", "Duotrigintillion"];
	
	values = [];
	num = String(n).split("").reverse().join("").replace("-","");
	for (i=0;i<(num.length/3);i++) {
		values.push( num.slice(i*3, (i*3)+3).split("").reverse().join("") );
	}
	
	for (i=0;i<values.length;i++) {
		if (values[i] == "000" || values[i] == "0") {
			values[i] = "";
		} else {
			values[i] = hundred(parseInt(values[i])) + " " + scale[i];
		}
		
	}
	
	values = values.filter(function(item) {
		return item != "";
	})
	
	output = values.reverse().join(", ").replace("  "," ");
	if (n < 0) {
		output = "minus " + output;
	}
	
	// send message
	if (doReply == true) {
		embed_info_reply(msg, output);
	} else {
		return output;
	}
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"saynum ") {
			num = msg.content.slice(8, msg.content.length);
			if (isNaN(parseInt(num)) == false) {
				if (num > (10**99) == false) {
					if (num.indexOf(".") == -1) {
						int2num(msg, parseInt(num), true);
					} else {
						// decimal number
						units = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
						output = [];
						for (i=0;i<num.split(".")[1].length;i++) {
							output.push(units[ num.split(".")[1][i]]);
						}
					
						decimal_part = output.join(" ");
						int_part = int2num(msg, parseInt(num), false);
					
						// send message
						embed_info_reply(msg, (int_part + " point " + decimal_part).replace("  "," "));
					}
				} else {
					embed_error(msg, "Invalid Range Number to large! Make sure your number is < 10^99!");
				}
			} else {
				embed_error(msg, "Invalid Input! Make sure that you type a number!")
			}
		}
	}
})

// hash
function hash(msg, hashName){
	var cryp = require("crypto");
	var sum = cryp.createHash(hashName);
	
	sum.update(msg.content.slice(5, msg.content.length));
	hash_input_text = msg.content.slice(5, msg.content.length);
	embed_input_output_reply(msg, hash_input_text, sum.digest('hex'), "Calculator", "type -help math for list of commands");
}

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"hash") {
			embed_info_reply(msg, "Please specify the hash function you would like to use, the format for the command is `-{hash function name} {data}`, " + 
			"all of the following hash functions are supported `md4`, `md5`, `sha1`, `sha224`, `sha256`, `sha384` and `sha512`! " +
			"\n\nFor example to produce an MD5 hash of the string `HelloWorld` the command would be:" + 
			"```-md5 HelloWorld``` would produce the hash ```68e109f0f40ca72a15e05cc22786f8e6```");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"md4 ") {
			hash(msg, "md4");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 5) == prefix+"md5 ") {
			hash(msg, "md5");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"sha1 ") {
			hash(msg, "sha1");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"sha224 ") {
			hash(msg, "sha224");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"sha256 ") {
			hash(msg, "sha256");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"sha384 ") {
			hash(msg, "sha384");
		}
	}
})

bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 8) == prefix+"sha512 ") {
			hash(msg, "sha512");
		}
	}
})

// Caesar Cipher
function shift(msg, txt, places) {
	chars = String(txt).split("");
	output = [];
	for (i=0;i<chars.length;i++) {
		if (places >= 0) {
			output.push(ASCII[(ASCII.indexOf(chars[i]) + places) % ASCII.length]);
		} else if (places < 0) {
			output.push(ASCII[(ASCII.indexOf(chars[i]) + ASCII.length + places.replace("-","")) % ASCII.length]);
		}
		
	}
	msg.reply(output.join(""));
}

// check the text is all alpha and numbers only
bot.on("message", msg => {
	if (authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 6) == prefix+"shift") {
			if (msg.content == prefix+"shift") {
				msg.reply("The syntax for the command is `-shift{places} {text}` " +
				"for example `-shift8 Hello World` will produce the message digest `PWttX.X6tM`, " +
				"to get back the original string we can then do `-shift-8 PWttX.X6tM`");
			
			} else {
				places = msg.content.slice(6, msg.content.length).split(" ")[0];
				txt = msg.content.slice(6 + places.length, msg.content.length);
		
				if (isNaN(parseInt(places)) == false && places.indexOf(".") == -1) {
					shift(msg, txt, places);
				} else {
					msg.reply("Invalid Input! the correct format is '-shift{No. places} {text}'!");
				}
			}
		}
	}
})

