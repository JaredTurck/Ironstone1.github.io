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

The bot also includes features such as Automod: Automod is a powerful tool 
that allows the bot to automatically mute, kick or ban users who break 
specifically defined rules. When users spam, post porn links, or uses 
offensive language for example, JaredBot’s contenting filtering feature 
will warn them. Automod is designed to run alongside content filtering, 
acting as a way to punish users who get to many warnings.

Content filtering is a feature that allows the bot to automatically remove 
and warn users who post, porn, phishing links, spam, promotions, tags, and 
use offensive language.
*/

// --- Requires ---
const Discord = require("discord.js");
const cityTimezones = require('city-timezones');
const request = require('request');
const fs_append = require('fs');
const fs_write = require('fs');
const fs_read = require('fs');
const cryp = require('crypto');
const ytdl = require('ytdl-core');
const youtube = require('scrape-youtube').default;
const jimp = require('jimp');
const {exec} = require('child_process');
const net = require('net');
const node_fetch = require('node-fetch');
const zip_extract = require('extract-zip');

// --- Init Vars ---
// IDs Pez, Skittle, Jared, Elyxia
const authorised_IDs = ["497067274428219423", "268394063550611456", "364787379518701569", "714207191573463102"]; 
const user_ID = "364787379518701569"; // Jared ID
const hentai_channel_ID = "756291926277357600"; // hentai channel ID
const channel_IDs = ["751827086137622658", "762103168061538315", "667882044134653983"]; // announcement channel IDs
const bot_ID = "767561850404864071";
const adds_channel_ID = "751825387243307059";
const suggestions_channel_ID = "775846419306381403";
const music_sharring_channel = "747884314204700752";
const game_invite_channel = "751782587382628372";
const selfroles_channel_ID = "780212725388673036";
const img_only_channel_id = "784604713244688454";
var user_who_broke_rules_dict = {};
var authrosied_server_IDs = [];

// some of these values should be configured on a per server basis
var logging = true;				// turn logging on or off
var sniping = true;				// records recently deleted messages
var reply_chance = 16;			// message reply chance
var prefix = {};				// prefix dictonary
var tag_tag_output = "Admin"; 	// Display tag when mod commands are run
var perm_invite_link = "https://discord.com/invite/QDeUXq4"; // permanent invite link
var clear_message_time = "1:00"; // time to clear the deleted messages log at
var content_filtering = true;	// turn content filtering on/off
var remove_duplicate_adds = true; // removes duplicate adds in the adds channel
var meme_source_from_python = false; // toggle between sourcing meme images from py script or web server
var hentai_user_python = false; // toggle between using python to source images or using the webserver
var rules_include_footer = true; // shows the footer text in the -rules command
var enable_auto_henati = true; // turn auto hentai on or off
var audio_test_video_url = "https://youtu.be/9daq_eG09ik"; // test video for -audiotest command
const xp_per_msg = 20; // amount of XP awarded per message
const xp_per_level = 100; // amount of messages to send before reaching next level
const bot_invite_link = "https://discord.com/oauth2/authorize?client_id=767561850404864071&permissions=201849927&scope=bot";
const user_agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:38.0) Gecko/20100101 Firefox/38.0";

// Tokens
const token_file_name = log_var("Token File", "TOKEN_DO_NOT_SHARE.txt");
const safe_browsing_filename = log_var("Safe Browsing API", "API/SAFE_BROWSING_API_KEY.txt");
const youtube_data_filename = log_var("YouTube Data API", "API/YOUTUBE_DATA_API_KEY.txt");

// file names
const output_file_henati = log_var("Hentai output file", "InputOutput/output.txt");
const inputs_file_henati = log_var("Hentai input file", "InputOutput/commands.txt");
const output_file_execute = log_var("Execute output file", "InputOutput/execute_output.txt");
const inputs_file_execute = log_var("Execute input file", "execute.py");
const output_file_chatbot = log_var("ChatBot output file", "InputOutput/chat_bot_output.txt");
const inputs_file_chatbot = log_var("ChatBot input file", "InputOutput/chat_bot_input.txt");
const output_file_animals = log_var("Animals output file", "InputOutput/animal_output.txt");
const inputs_file_animals = log_var("Animals input file", "InputOutput/animal_input.txt");
const output_file_steaminfo = log_var("Steam Info output file", "InputOutput/steam_data_output.txt");
const inputs_file_steaminfo = log_var("Steam Info input file", "InputOutput/steam_info_input.txt");
const output_file_random_animal_png = log_var("Random Animal output image", "./current_image.png");
const inputs_file_meme = log_var("Meme input file", "InputOutput/meme_input.txt");
const outputs_file_meme = log_var("Meme output image", "./meme.png");
const input_file_translate = log_var("Translate input", "InputOutput/translate_input.txt");
const output_file_translate = log_var("Translate output", "InputOutput/translate_output.txt");

const dataset_imbored = log_var("Im Bored dataset", "datasets/imbored.txt");
const dataset_firstname = log_var("First Name dataset", "datasets/firstname.txt");
const dataset_surname = log_var("Surname dataset", "datasets/surname.txt");
const default_dance_dir = log_var("Default Dance Directory", "datasets/deafult_dance/");
const dataset_methods_of_death = log_var("Methods of Death dataset", "datasets/methods_of_death.txt");
const dataset_coins_dir = log_var("Coins dataset", "datasets/coins/");
const dataset_dice_dir = log_var("Dice dataset", "datasets/dice/");
const dataset_elements = log_var("Elements dataset", "datasets/elements.txt");
const dataset_fonts = log_var("Fonts dataset", "datasets/fonts.txt");
const dataset_pokemon = log_var("Pokemon dataset", "datasets/pokemon.txt");
const dataset_medicine = log_var("Medicine dataset", "datasets/medicines.txt");
const words_dataset = log_var("Just One Words", + "datasets/words.txt");
const py_challenges_dataset = log_var("Python Challenges dataset", "datasets/py_challenges.txt");
const auto_py_challenge_filename = log_var("Python Challenge filename", "auto_py_channel_ID.txt");
const justone_members_fname = log_var("Just One Members file name", "justone_members.txt");
const justone_global_members_fname = log_var("Just One Global Members file name", "justone_global_members.txt");
const justone_channel_id_fname = log_var("Just One Channel ID file name", "justone_channel_ID.txt");
const justone_clues_fname = log_var("Just One Clues file name", "just_one_clues.txt");
const justone_words_fname = log_var("Just One Words file name", "just_one_words.txt");

// Webserver dataset locations
const webserver_root_address = log_var("Webserver root", "https://jaredbot.uk/");
const webserver_memes_dataset = log_var("Webserver memes dataset", webserver_root_address + "img/dataset_memes");
const webserver_catmemes_dataset = log_var("Webserver catmemes dataset", webserver_root_address + "img/dataset_catmemes");
const webserver_cats_dataset = log_var("Webserver cats dataset", webserver_root_address + "img/dataset_cats");
const webserver_boobs_dataset = log_var("Webserver boobs dataset", webserver_root_address + "img/dataset_boobs");
const webserver_dogs_dataset = log_var("Webserver dogs dataset", webserver_root_address + "img/datasets_dogs");
const webserver_heli_dataset = log_var("Webserver helicopters dataset", webserver_root_address + "img/datasets_helicopters/");
const webserver_elms_dataset = log_var("Webserver element photos directory", webserver_root_address + "img/src/elm_photos");
const webserver_pokemon_dataset = log_var("Webserver pokemon dataset", webserver_root_address + "img/src/pokemon");
const webserver_dogmeme_dataset = log_var("Webserver dogmemes dataset", webserver_root_address + "img/datasets_dogmeme");
const webserver_nude_dataset = log_var("Webserver nudes dataset", webserver_root_address + "img/dataset_nudes");
const webserver_hentai_dataset = log_var("Webserver hentai dataset", webserver_root_address + "img/dataset_hentai");
const webserver_car_dataset = log_var("Webserver cars dataset", webserver_root_address + "img/dataset_cars");
const webserver_owo_dataset = log_var("Webserver owo dataset", webserver_root_address + "img/src/emotion");
const webserver_snake_dataset = log_var("Webserver snakes dataset", webserver_root_address + "img/dataset_snake");
const webserver_igmemes_dataset = log_var("Webserver igmemes dataset", webserver_root_address + "img/datasets_igmemes/2020");
const webserver_src_hug = log_var("Webserver hug dataset", webserver_root_address + "img/src/hug");
const webserver_src_kiss = log_var("Webserver kiss dataset", webserver_root_address + "img/src/kiss");
const webserver_birds_dataset = log_var("Webserver birds dataset", webserver_root_address + "img/dataset_birds");
const webserver_racoon_dataset = log_var("Webserver racoon dataset", webserver_root_address + "img/datasets_racoon");
const webserver_medicines_dataset = log_var("Webserver medicines dataset", webserver_root_address + "img/src/medicine_imgs");
const webserver_photography_dataset = log_var("Photography dataset", webserver_root_address + "img/dataset_photography");
const webserver_bird_dataset = log_var("Bird dataset", webserver_root_address + "img/dataset_birds");
const webserver_cars_dataset = log_var("Cars dataset", webserver_root_address + "img/dataset_cars");
const webserver_leaderboard_dir = log_var("Leaderboard dir", webserver_root_address + "leaderboard");
const webserver_ass_dataset = log_var("Webserver ass dataset", webserver_root_address + "img/nsfw_datasets/dataset_ass");
const webserver_pussy_dataset = log_var("Webserver pussy dataset", webserver_root_address + "img/nsfw_datasets/dataset_pussy");
const webserver_anal_dataset = log_var("Webserver Anal dataset", webserver_root_address + "img/nsfw_datasets/dataset_anal");
const webserver_blowjob_dataset = log_var("Webserver Blowjob dataset", webserver_root_address + "img/nsfw_datasets/dataset_blowjob");
const webserver_fingering_dataset = log_var("Webserver Fingering dataset", webserver_root_address + "img/nsfw_datasets/dataset_fingering");
const webserver_porngifs_dataset = log_var("Porn Gifs dataset", webserver_root_address + "img/nsfw_datasets/dataset_porngifs");

const flip_coin_tails = log_var("Flip Coin Tails", "tails.gif");
const flip_coin_heads = log_var("Flip Coin Heads", "heads.gif");
const flip_coin_file_extension = log_var("Flip Coin File Extension", ".gif");
const text_meme_thef = log_var("Meme thef", "datasets/text_memes/thef.txt");
const deleted_messages_log_file = log_var("Deleted messages log", "logs/deleted_messages.log");
const logging_path = log_var("Logging Path", "logs");
const periodic_table = log_var("Periodic Table", webserver_root_address + "img/src/periodic_table.png");
const mod_error_text = log_var("Mod Error Text", "If you feel this is a mistake please contact your server admin and ask them to grant you the ");
const authorised_servers = log_var("Authorised Servers file", "authorised_server_IDs.txt");
const filenames_higherlower = log_var("Higher Lower scoreboard", "higherlower_scoreboard.txt");
const automod_filename = log_var("Automod filename", "automod.txt");
const warnings_filename = log_var("Warnings filename", "warnings.txt");
const hentai_channel_file = log_var("Hentai channel filename", "hentai_channel_ID.txt");
const nsfw_channel_file = log_var("NSFW channel IDs filename", "nsfw_channel_ID.txt");
const porngif_channel_filename = log_var("Porn Gif filename", "porngif_channel_ID.txt");
const igmemes_channel_file = log_var("Igmemes channel filename", "igmemes_channel_ID.txt");
const photography_channel_file = log_var("photography channel filename", "photo_channel_ID.txt");
const bird_channel_file = log_var("Bird channel filename", "bird_channel_ID.txt");
const car_channel_filename = log_var("Car channel filename", "car_channel_ID.txt");
const cat_channel_filename = log_var("Cat channel filename", "cat_channel_ID.txt");
const dog_channel_filename = log_var("Dogs channel filename", "dog_channel_ID.txt");
const snake_channel_filename = log_var("Snakes channel filename", "snake_channel_ID.txt");
const banned_emoji_filename = log_var("Banned Emojis channel filename", "banned_emojis.txt");
const selfrole_filename = log_var("Selfrole Filename", "logs/Jared_Network/selfrole.txt");
const filter_filename = log_var("Filter filename", "filter.txt");
const letteremoji_filename = log_var("Letter Emoji channel filename", "letteremoji.txt")
const emoji_id_url = log_var("Emoji ID URL", webserver_root_address + "img/src/banemoji.gif");
const cat_profile_pic = log_var("Cat profile pic file", webserver_root_address + "img/cat1.png");
const lion_profile_pic = log_var("Lion profile pic", webserver_root_address + "img/lion.png");
const py_logo = log_var("Python Logo", webserver_root_address + "img/src/py_logo.png");
const message_count_channel_file = log_var("Message Count log file", "msg_count.txt");
const banned_urls_channel_file = log_var("Banned URLs file name", "banned_urls.txt");
const welcome_channel_name = log_var("Welcome channel file name", "welcome_channel_ID.txt");
const leaderboard_raw = log_var("Raw leaderboard channel file name", "raw_ranks.txt");
const shotcut_melt_location = log_var("ShotCut melt.exe local file path", "C:/Program Files/Shotcut/melt.exe");
const online_hash_log = log_var("Online file and text Hash log", webserver_root_address + "docs/src/crypto.txt");

// Delays (milliseconds)
const read_output_file_delay_henati = log_var("Delay Hentai", 1000);				// Henati
const read_output_file_delay_execute = log_var("Delay Execute", 5000);				// Execute python code
const read_output_file_delay_clever_bot = log_var("Delay CleverBot", 1000);			// Initial clever bot delay
const read_output_file_delay_clever_bot_2 = log_var("Delay 2 CleverBot", 1000);		// Check again for output delay
const read_output_file_delay_random_animal = log_var("Delay Random Animal", 5000);	// Random animal delay
const read_output_file_delay_random_meme = log_var("Delay Random Name", 1000);		// Delay for -catmeme and -meme
const read_output_file_delay_steam_info = log_var("Delay Steam Info", 3000);		// Get steam info delay
const higher_lower_end_game_delay = log_var("Delay Higher Lower", 120*1000);		// Higher or lower end game delay
const read_input_file_pokemon_dataset = log_var("Delay Pokemon", 1000);				// Pokemon read dataset timeout
const anti_spam_delay = log_var("Delay anti-spam", 1000);							// Delay between chat replys (prevents bot from spamming)
const hash_delay = log_var("Delay Hash", 100);										// Delay between hashing file and reading checksum
const auto_henati_delay = log_var("Delay Auto Hentai", 10*60*1000);					// Auto henati delay
const max_purdge_amount = log_var("Delay Purdge amount", 50);						// Maximum number of messages you can purdge at a time
const purge_timeout = log_var("Delay Purge timeout", 1000);							// Cooldown for purge command
const autohentai_clear_delay = log_var("Delay Clear Auto Hentai", 500);				// Clear Autohentai timeout
const autopost_init_timeout = log_var("Init timeout for Autopost", 5000);			// For long to wait before setting the autopost timeouts
const just_one_check_clues_timeout = log_var("Just One Clues timeout", 30000);		// How long to check if the clues file has changed
const just_one_channel_id_timeout = log_var("Just One Channel ID timeout", 60000);	// How long before checking channel ID has changed
const write_msg_cache_timeout = log_var("Message Cache write timeout", 60000);		// timeout between writing server msg cache to file
const leader_autoupdate_timeout = log_var("Auto Update LeaderBoard", 30000);		// time before leaderboard is automatically updated
const leaderboard_cooldown_timeout = log_var("Leaderboard Cooldown", 30000);		// cool down on leaderboard timeout
const max_render_time = log_var("Max Render time", 5*60*1000);						// maximum amount of CPU time for render
const yt_autodelete_timeout = log_var("Auto Delete", 60*60*1000);					// amount of file a yt file stays on the server for

// Local Database locations
const server_folder_location = log_var("Web Server Root", "C:/WebServer/");
const jaredbot_folder_location = log_var ("Absolute JaredBot folder path", "C:\OneDrive\Backup\Jared's Desktop 2\Desktop\Discord bot");
const local_memes_dataset = log_var("Local memes dataset", server_folder_location + "img/dataset_memes");
const local_catmemes_dataset = log_var("Local catmemes dataset", server_folder_location + "img/dataset_catmemes");
const local_cats_dataset = log_var("Local cats dataset", server_folder_location + "img/dataset_cats");
const local_boobs_dataset = log_var("Local boobs dataset", server_folder_location + "img/dataset_boobs");
const local_dogs_dataset = log_var("Local dogs dataset", server_folder_location + "img/datasets_dogs");
const local_heli_dataset = log_var("Local Helicopters dataset", server_folder_location + "img/datasets_helicopters");
const local_elms_dataset = log_var("Local Elements dataset", server_folder_location + "img/src/elm_photos");
const local_pokemon_dataset = log_var("Local Pokemon dataset", server_folder_location + "img/src/pokemon");
const local_dogmeme_dataset = log_var("Local dogmemes dataset", server_folder_location + "img/datasets_dogmeme");
const local_nude_dataset = log_var("Local nudes dataset", server_folder_location + "img/dataset_nudes");
const local_hentai_dataset = log_var("Local Hentai dataset", server_folder_location + "img/dataset_hentai");
const local_car_dataset = log_var("Local cars dataset", server_folder_location + "img/dataset_cars");
const local_owo_dataset = log_var("Local owo dataset", server_folder_location + "img/src/emotion");
const local_snake_dataset = log_var("Local snakes dataset", server_folder_location + "img/dataset_snake");
const local_igmemes_dataset = log_var("Local igmemes dataset", server_folder_location + "img/datasets_igmemes/2020");
const local_src_hug = log_var("Local hug dataset", server_folder_location + "img/src/hug");
const local_src_kiss = log_var("Local kiss dataset", server_folder_location + "img/src/kiss");
const local_birds_dataset = log_var("Local birds dataset", server_folder_location + "img/dataset_birds");
const local_racoon_dataset = log_var("Local racoon dataset", server_folder_location + "img/datasets_racoon");
const local_medicines_dataset = log_var("Local medicines dataset", server_folder_location + "img/src/medicine_imgs");
const local_photography_dataset = log_var("Photography dataset", server_folder_location + "img/dataset_photography");
const local_msg_template = log_var("Message LeaderBoard Template", server_folder_location + "leaderboard_template.html");
const local_leaderboard_dir = log_var("LeaderBoard Directory", server_folder_location + "leaderboard");
const local_ass_dataset = log_var("Local ass dataset", server_folder_location + "img/nsfw_datasets/dataset_ass");
const local_pussy_dataset = log_var("Local pussy dataset", server_folder_location + "img/nsfw_datasets/dataset_pussy");
const local_anal_dataset = log_var("Local anal dataset", server_folder_location + "img/nsfw_datasets/dataset_anal");
const local_blowjob_dataset = log_var("Local blowjob dataset", server_folder_location + "img/nsfw_datasets/dataset_blowjob");
const local_fingering_dataset = log_var("Local fingering dataset", server_folder_location + "img/nsfw_datasets/dataset_fingering");
const local_porngifs_dataset = log_var("Local porngifs dataset", server_folder_location + "img/nsfw_datasets/dataset_porngifs");
const local_hash_log = log_var("Local file and text Hash log", server_folder_location + "docs/src/crypto.txt");

// Dont change these variables
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
var dataset_counts = {};			// Dont change value
var n = [[".",".","."],[".",".","."],[".",".","."]];
const ASCII = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+1234567890-=[]{}\|,.<>/?`~ ";
const average_download = 40;

// Hashs
var md5_sum_of_meme_original = "";
var md5_sum_of_meme_updated = "";
var md5_sum_of_current_img_original = "";
var md5_sum_of_current_img_updated = "";
var File_hash = "";

// imbed colours
const embed_colour_info = log_var("Chat Colour Info", "#d5a865");	// blue
const embed_colour_error = log_var("Chat Colour Error", "#FF0000");	// red
const embed_color_chat = log_var("Chat Colour Chat", "#d5a865");	// orange
const embed_colour_img = log_var("Chat Colour Image", "#696969");	// grey
const embed_colour_green = log_var("Chat Colour Green", "#13FF00")	// green

// --- functions ---

function console_log(txt, error=false, mod=false) {
	current_time = new Date().toTimeString().split(" ")[0];
	if (error == true && mod == false) {
		console.log("\x1b[31m["+current_time+"][-]\x1b[0m", txt);
	} else if (mod == true && error == false) {
		console.log("\x1b[36m["+current_time+"][*]\x1b[0m", txt);
	} else {
		console.log("\x1b[32m["+current_time+"][+]\x1b[0m", txt);
	}
}

// log variable to console
function log_var(varname, value) {
	// Key
	// Strings Green
	// Integers Red
	// Info White
	// errors Red
	
	if (isNaN(parseInt(value)) == false) {
		// Integers are Red
		console.log("\x1b[36m"+varname+"\x1b[0m", "set as", "\x1b[31m"+value+"\x1b[0m");
	} else {
		// Strings are Green
		console.log("\x1b[36m"+varname+"\x1b[0m", "set as", "\x1b[32m"+value+"\x1b[0m");
	} 
	return value;
}

// generates a hash of specified file
function get_md5(msg, file_name, callback) {
	try {
		// hashs
		sum_md4 = cryp.createHash("md4");
		sum_md5 = cryp.createHash("md5");
		sum_sha1 = cryp.createHash("sha1");
		sum_sha224 = cryp.createHash("sha224");
		sum_sha256 = cryp.createHash("sha256");
		sum_sha384 = cryp.createHash("sha384");
		sum_sha512 = cryp.createHash("sha512");
	
		// read file
		file = fs_read.ReadStream(file_name);
		file.on('data', function(data) {
			sum_md4.update(data);
			sum_md5.update(data);
			sum_sha1.update(data);
			sum_sha224.update(data);
			sum_sha256.update(data);
			sum_sha384.update(data);
			sum_sha512.update(data);
		})

		// update hash
		file.on('end', function() {
			File_hash = sum_md5.digest('hex');
			return callback ({
				"md4" : sum_md4.digest('hex'),
				"md5" : File_hash,
				"sha1" : sum_sha1.digest('hex'),
				"sha224" : sum_sha224.digest('hex'),
				"sha256" : sum_sha256.digest('hex'),
				"sha384" : sum_sha384.digest('hex'),
				"sha512" : sum_sha512.digest('hex')
			})
		})
		file.on('error', function(err) {
			console_log("Failed to read file in function get_md5! " + err, error=true);
			if (msg != null) {
				embed_error(msg, "Failed to read file, please try again! " + err);
			}
		})
		
	} catch (err) {
		console_log("Error thrown in get_md5 " + err, error=true);
	}
}

// checks if a file has changed by comparing hashs
function check_if_file_changed(outputs_file, msg, continued, delay, IsFile) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to check if file has changed, guild is undefined or null!", error=true);
			return false;
		}
	
		// read output
		// get file check sum
		if (continued == true) {
			get_md5(msg, outputs_file)
			setTimeout(function() {
				md5_sum_of_meme_original = File_hash;
				console_log("updated = " + md5_sum_of_meme_updated+" ["+md5_sum_of_meme_original == md5_sum_of_meme_updated+"]!");
			}, hash_delay);
		}
	
		// wait until the file check sum has changed, then send message
		FileSent = false;
		setTimeout(function() {
			get_md5(msg, outputs_file);
			setTimeout(function() {
				md5_sum_of_meme_updated = File_hash;
				if (md5_sum_of_meme_original != md5_sum_of_meme_updated) {
					console_log(" = " + md5_sum_of_meme_updated)
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
							msg_channel_send(msg, "", { files: [outputs_file] }).then (msg => {
								console_log("uploaded meme to discord!");
								FileSent = true;
							}).catch(err => {
								console_log("Error thrown in check MD5 msg_channel_send function!", error=true);
							})
						} else if (IsFile == false) {
							// open output file
							fs_read.readFile(output_file_henati, "utf8", function(err, data) {
								if (err) {
									return console_log("Failed to read file", error=true);
								}
								// send message
								msg_channel_send(msg, data);
							});
						}
					}
				}
			}, hash_delay);
		}, delay, msg);
	
		// file sent change back to false
		FileSent = false;
	} catch (err) {
		console_log("Error thrown in check_if_file_changed function! " + err, error=true);
	}
}

// creates a file if it does not exist
function make_server_folder_file(msg, the_current_file) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to make server folder file, guild is undefined or null!", error=true);
			return false;
		}
	
		// make directory if it does not exist
		var server_name_2 = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id; // server folder
		var server_file_2 = logging_path +"/"+ server_name_2 +"/" + the_current_file;
				
		// check if server folder exists
		if (!fs_read.existsSync(logging_path +"/"+ server_name_2)) {
			fs_read.mkdirSync(logging_path +"/"+ server_name_2);
		}
				
		// check if the file exists	
		return_value = true;
		try {
			if (!fs_read.existsSync(server_file_2)) {
				// create file
				fs_write.writeFile(server_file_2, "", function(err) {
					if (err) {
						return console_log("Failed to write to file " + the_current_file, error=true);
					}
					console_log("File created!");
					return_value = false;
				})
			}
		} catch (err) {
			console_log("Failed to create file!", error=true);
		}
		return return_value;
	} catch (err) {
		console_log("Error thrown in make_server_folder_file function! " + err, error=true);
	}
}

// creates a file if it doesn't exist in custom path
function make_server_root_file(msg, the_current_file) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to make server root file, guild is undefined!", error=true);
			return false;
		}
	
		// check if the file exists	
		return_value = true;
		try {
			if (!fs_read.existsSync(the_current_file)) {
				// create file
				fs_write.writeFile(the_current_file, "", function(err) {
					if (err) {
						return console_log("Failed to write to file " + the_current_file, error=true);
					}
					console_log("File created!");
					return_value = false;
				})
			}
		} catch (err) {
			console_log("Failed to create file!", error=true);
		}
		return return_value;
	} catch (err) {
		console_log("Error thrown in make_server_root_file function! " + err, error=true);
	}
}

// creates file if it does not exist in logs/servername, then appends data
function create_file_then_append_data(msg, auto_filename, data, endl="\n", overwrite=false) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to create file then append data, guild is undefined or null!", error=true);
			return false;
		}
	
		// get directory
		auto_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
		auto_path = logging_path + "/" + auto_dir + "/" + auto_filename;
	
		// make file
		async function make_file() {
			make_server_folder_file(msg, auto_filename);
				return;
			}
		
		// append data to file
		async function write_automod_rule(){
			await make_file();
			if (overwrite == true) {
				fs_write.writeFile(auto_path, data, function(err) {
					if (err) {
						return console_log("Failed to append data to file " + auto_filename, error=true);
					}
				})
			} else {
				fs_append.appendFile(auto_path, data + endl, function(err) {
					if (err) {
						console_log("Failed to append data to file " + auto_filename, error=true);
					}
				})
			}
		} write_automod_rule();
	} catch (err) {
		console_log("Error thrown in create_file_then_append_data function! " + err, error=true);
	}
}

// creates file if it does not exist in server root, then appends data
function create_file_then_append_data_custom_path(msg, fname, data, endl="\n") {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to create file then append data with custom path, guild is undefined or null!", error=true);
			return false;
		}
	
		// make file
		async function make_file() {
			make_server_root_file(msg, fname);
				return;
			}
		
		// append data to file
		async function write_automod_rule(){
			await make_file();
			fs_append.appendFile(fname, data + endl, function(err) {
				if (err) {
					console_log("Failed to append data to file " + fname, error=true);
				}
			})
		} write_automod_rule();
	} catch (err) {
		console_log("Error thrown in create_file_then_append_data_custom_path function! " + err, error=true);
	}
}

// clears a file, deletes all of its data
function clear_file(msg, channel_filename) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to clear file, guild is undefined or null!", error=true);
			return false;
		}
	
		async function make_file() {
			// make file
			await make_server_folder_file(msg, channel_filename);
		
			// get directory
			file_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			file_path = logging_path + "/" + file_dir + "/" + channel_filename;
		
			// clear file
			fs_append.writeFile(file_path, "", function(err) {
				if (err) {
					console_log("Failed to clear file " + channel_filename, error=true);
				}
			})
		} make_file().then(function() {
			console_log(channel_filename + " cleared for server " + msg.guild.id);
		}).catch(err => {
			console_log("Error thrown in clear_file make_file function! " + err, error=true);
		});
	} catch (err) {
		console_log("Error thrown in clear_file function! " + err, error=true);
	}
}

// returns true if a string contains only digits, sends error mmessage to user if it does not
function isInt(msg, n, range_start, range_end, varDescription, ErrorMessageEnd="") {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to check if num is int, guild is undefined or null!", error=true);
			return false;
		}
	
		if (isNaN(parseInt(n)) == false) {
			if (n > range_start) {
				if (n < range_end) {
					if (n.indexOf(".") == -1) {
						if (n.indexOf("-") == -1) {
							return true;
						} else {
							embed_error(msg, "your " + varDescription + " number cannot be a negative! " + ErrorMessageEnd);
							return false;
						}
					} else {
						embed_error(msg, "your " + varDescription + " number cannot be a decimal! " + ErrorMessageEnd);
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
	} catch (err) {
		console_log("Error thrown in isInt function! " + err, error=true);
	}
}

// checks if a string contains only digits (no error is sent to user)
function isInt_without_error(n, range_start, range_end) {
	try {
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
	} catch (err) {
		console_log("Error thrown in isInt_without_error function! " + err, error=true);
	}
}

// reads the contents of channel file, then updates it in global var
function read_file(channel_file, intervals, allow_non_int=false, sep="", remove_dupes=false, single_item=false) {
	try {
		// check each authorised server ID
		for (i=0;i<authrosied_server_IDs.length;i++) {
			// get server name
			current_server_name2 = bot.guilds.cache.get(authrosied_server_IDs[i])
			current_server_id = authrosied_server_IDs[i];
		
			function do_itteration(current_server_id) {
				if (current_server_name2 != undefined) {
					current_server_name2 = current_server_name2.name.replace(" ","_")+"_"+ current_server_name2.id;
					// get directory
					f_path = logging_path + "/" + current_server_name2 + "/" + channel_file;
					if (fs_read.existsSync(f_path) == true) {
						// file exists for current server
						// read output file
						fs_read.readFile(f_path, "utf8", function(err, data) {
							if (err) {
								return console_log("Failed to read file " + channel_file, error=true);
							}
							// raw data
							raw_data = [];
							raw = data.split("\n").join("").split(";");
							for (i=0;i<raw.length;i++) {
								if (raw[i] != "") {
									if (isInt_without_error(raw[i], 0, 10**20) == true) {
										raw_data.push(raw[i]);
									}
								
									// allow non-ints
									else if (allow_non_int == true) {
										// remove duplicates
										if (remove_dupes == true) {
											if (check_for_dupes(raw_data, raw[i].split(sep)) == -1) {
												raw_data.push(raw[i].split(sep));
											
											}
										} else {
											raw_data.push(raw[i].split(sep));
										}
									}
								}
							}
							
							// update global var
							try {
								if (single_item == true) {
									intervals[current_server_id] = raw_data[0][0];
								} else {
									intervals[current_server_id] = raw_data;
								}
							} catch (err) {
								console_log("Failed to set interval for " + current_server_id + "! " + err, error=true);
							}
						});
					}
				}
			} do_itteration(current_server_id);
		}
	} catch (err) {
		console_log("Error thrown in read_file function! " + err, error=true);
	}
}

// checks an array contaning subarrays for duplicates
function check_for_dupes(array, sub_array) {
	try {
		list = [];
		for (i=0;i<array.length;i++) {
			list.push(String(array[i]));
		}
	
		return list.indexOf(String(sub_array));
	} catch (err) {
		console_log("Error thrown in check_for_dupes function! " + err, error=true);
	}
}

// counts the number of files in a directory, and adds to global dataset_count var
function count_dir(dir, dataset_name) {
	try {
		fs_read.readdir(dir, (err, files) => {
			if (err) {
				console_log("Failed to count number of files in '" + dir + "'!", error=true);
			} else {
				// add value to global var;
				dataset_counts[dataset_name] = files.length;
				console_log("Counted "+files.length+" files in "+dataset_name);
			}
		})
	} catch (err) {
		console_log("Error thrown in count_dir function! " + err, error=true);
	}
}

async function get_html(url, callback) {
	// get html
	await request(url, {
		headers: {
			"User-Agent": user_agent
		},
		body: "",
		method: "GET"
	}, (err, res, html) => {
		if (res.statusCode == 200) {
			// process HTML
			return callback(html);
		} else {
			return callback("");
		}
	})
}

async function download(url, dest, callback) {
	res = await node_fetch(url);
	buffer = await res.buffer();
	fs_write.writeFile(dest, buffer, () => {
		console_log("finished downloading file", error=false, mod=true);
		return callback(true);
	})
}

// Dataset sizes
function get_dataset_sizes() {
	try {
		count_dir(local_memes_dataset, "memes");
		count_dir(local_catmemes_dataset, "catmemes");
		count_dir(local_cats_dataset, "cats");
		count_dir(local_dogs_dataset, "dogs");
		count_dir(local_heli_dataset, "helicopters");
		count_dir(local_dogmeme_dataset, "dogmemes");
		count_dir(local_nude_dataset, "nudes");
		count_dir(local_hentai_dataset, "hentai");
		count_dir(local_boobs_dataset, "boobs");
		count_dir(local_ass_dataset, "ass");
		count_dir(local_pussy_dataset, "pussy");
		count_dir(local_anal_dataset, "anal");
		count_dir(local_blowjob_dataset, "blowjob");
		count_dir(local_fingering_dataset, "fingering");
		count_dir(local_porngifs_dataset, "porngif");
		count_dir(local_car_dataset, "cars");
		count_dir(local_snake_dataset, "snakes");
		count_dir(local_igmemes_dataset, "igmemes");
		count_dir(local_src_hug, "hug");
		count_dir(local_birds_dataset, "birds");
		count_dir(local_racoon_dataset, "racoon");
		count_dir(local_src_kiss, "kiss");
		count_dir(local_photography_dataset, "photography");
	} catch (err) {
		console_log("Error thrown in get_dataset_sizes function! " + err, error=true);
	}
}

// embed functions
async function embed_chat_reply(msg, txt, footer=["JaredBot", webserver_root_address+"img/lion.png"]) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed chat reply, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			try {
				embed_chat = new Discord.MessageEmbed();
				embed_chat.setColor(embed_color_chat);
				embed_chat.setDescription(txt.slice(0, 2048));
				embed_chat.setFooter(footer[0], footer[1]);
				embed_chat.setTimestamp();
				return await msg_channel_send(msg, embed_chat);
			} catch {
				embed_error(msg, "Something went wrong!");
			}
		} else {
			console_log("Embed Chat Reply, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_chat_reply function! " + err, error=true);
	}
}

async function embed_info_reply(msg, txt, footer=["JaredBot", webserver_root_address+"img/lion.png"]) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed info reply, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			try {
				embed_chat = new Discord.MessageEmbed();
				embed_chat.setColor(embed_colour_info);
				embed_chat.setDescription(txt.slice(0, 2048));
				embed_chat.setFooter(footer[0], footer[1]);
				embed_chat.setTimestamp();
				return await msg_channel_send(msg, embed_chat);
			} catch {
				embed_error(msg, "Something went wrong!");
			}
		} else {
			console_log("Embed Info Reply, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_info_reply function! " + err, error=true);
	}
}

async function embed_chat_reply_header(msg, txt, header_text, pfp=true) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed chat reply header, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			try {
				embed_chat = new Discord.MessageEmbed();
				embed_chat.setColor(embed_color_chat);
				embed_chat.setDescription(txt.slice(0, 2048));
				if (pfp == true) {
					author = [header_text, webserver_root_address+"img/lion.png", ""]
				} else {
					author = [header_text, "", ""];
				}
				embed_chat.setAuthor(author[0], author[1], author[2]);
				embed_chat.setTimestamp();
				return await msg_channel_send(msg, embed_chat);
			} catch {
				return await embed_error(msg, "Something went wrong!");
			}
		} else {
			console_log("Embed Chat Reply Header, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_chat_reply_header function! " + err, error=true);
	}
}

async function embed_error(msg, err_txt, error_header="Error!") {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed error, guild is undefined or null!", error=true);
			return false;
		}
	
		try {
			if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
				embed_err = new Discord.MessageEmbed();
				embed_err.setColor(embed_colour_error);
				embed_err.addField(error_header, err_txt);
				if (msg != undefined && msg != null) {
					return await msg_channel_send(msg, embed_err);
				} else {
					console.log("Fatal Could not send error to user! msg is undefined!");
				}
			} else {
				console_log("Embed Error, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
			}
		} catch {
			console_log("Failed to send error message to guild!", error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_error function! " + err, error=true);
	}
}

async function embed_image(msg, img_url, footer_text, guild="msg", header="") {
	try {
		// check for undefined guild
		if (msg == undefined) {
			return false;
		} if (msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed image, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
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
					return await msg_channel_send(msg, embed_img);
				}
			} catch {
				if (msg == undefined) {
					console_log("Failed to send image to server!", error=true);
				} else if (msg.guild == undefined) {
					console_log("Failed to send image to server!", error=true);
				} else {
					console_log("Failed to send image to server " + msg.guild.id + "!", error=true);
				}
			}
		} else {
			console_log("Embed Image, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_image function! " + err, error=true);
	}
}

async function embed_image_header(msg, img_url, header, footer_text) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed image with header, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			embed_img = new Discord.MessageEmbed();
			embed_img.setColor(embed_colour_img);
			embed_img.setImage(img_url);
			embed_img.setTimestamp();
			embed_img.setFooter(footer_text + "\n\u200B", "");
			embed_img.setTitle(header);
			return await msg_channel_send(msg, embed_img);
		} else {
			console_log("Embed Image Header, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_image_header function! " + err, error=true);
	}
}

async function embed_modderation(msg, txt, header_txt, color="red") {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed modderation, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			try {
				// find @ tag
				txt_array = txt.replace("<@!","").replace("<@","").split(">");
				current_user_ID = txt_array[0].split(" ").join("");
	
				embed_mod = new Discord.MessageEmbed();
				if (color == "green") {
					embed_mod.setColor(embed_colour_green);
				} else {
					embed_mod.setColor(embed_colour_error);
				}
				embed_mod.setTitle(header_txt);
				embed_mod.addField(txt_array[1]+"\n\u200B", "<@"+current_user_ID+">");
				embed_mod.setTimestamp();
				return await msg_channel_send(msg, embed_mod);
			} catch {
				embed_error(msg, "Something went wrong!");
			}
		} else {
			console_log("Embed Modderation, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_modderation function! " + err, error=true);
	}
}

async function embed_input_output_reply(msg, input_data, output_data, title, description="", url="") {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed input reply, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			try {
				embed_IO = new Discord.MessageEmbed();
				embed_IO.setTitle(title);
				embed_IO.setURL(url); // set this to URL of the message
				embed_IO.setColor(embed_colour_info);
				if (description != "") {
					embed_IO.setDescription(description.slice(0, 2048));
				}
				embed_IO.addFields(
					{name: "Input", value: "```"+input_data+"```"},
					{name: "Output", value: "``` "+output_data+" ```"}
				)
				embed_IO.setTimestamp();
				embed_IO.setFooter("JaredBot", webserver_root_address+"img/lion.png");
				return await msg_channel_send(msg, embed_IO);
			} catch {
				embed_error(msg, "Something went wrong!");
			}
		} else {
			console_log("Embed Input Output Reply, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_input_output_reply function! " + err, error=true);
	}
}

async function embed_help_reply(msg, field) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to embed help reply, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			try {
				embed_help_commands = new Discord.MessageEmbed();
				embed_help_commands.setColor(embed_color_chat);
				embed_help_commands.setTitle("Command Help");
				embed_help_commands.addFields(field);
				embed_help_commands.setTimestamp();
				return await msg_channel_send(msg, embed_help_commands);
			} catch {
				embed_error(msg, "Something went wrong!");
			}
		} else {
			console_log("Embed Chat Reply, JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in embed_help_reply function! " + err, error=true);
	}
}

async function msg_channel_send(msg, msg_embed, file=false) {
	try {
		// check for undefined guild
		if (msg == undefined || msg.guild == undefined || msg.guild == null) {
			console_log("Failed to msg channel send, guild is undefined or null!", error=true);
			return false;
		}
	
		if (msg.guild.me.hasPermission("SEND_MESSAGES") == true) {
			if (file == false) {
				await msg.channel.send(msg_embed).then(object => {
					return object;
				}).catch(error => {
					return false;
				})
			} else {
				await msg.channel.send(msg_embed, file).then(object => {
					return object;
				}).catch(error => {
					return false;
				})
			}
		} else {
			console_log("Error JaredBot does not have permission to send messages on " + msg.guild.name, error=true);
		}
	} catch (err) {
		console_log("Error thrown in msg_channel_send function! " + err, error=true);
	}
}

// get authorised server IDs
fs_read.readFile(authorised_servers, "utf8", function(err, data) {
	if (err) {
		console_log("Failed to read authorised server IDs", error=true);
		process.exit(1); // shut the bot down if it cant read IDs file
			
	} else {
		// append each ID to authorised IDs array
		raw_data = data.split("\n").join("").split(";");
		for (i=0;i<raw_data.length;i++) {
			if (isNaN(parseInt(raw_data[i])) == false) {
				authrosied_server_IDs.push(raw_data[i]);
			}
		} 
		console_log("Successfully read authorised server IDs!");
	}
})

// --- Main ---
//login
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

fs_read.readFile(token_file_name, "utf-8", function(err, data) {
	if (err) {
		return console_log("Failed to read token! " + err, error=true);
	}
	
	const token = data;
	bot.login(token);
})

bot.on("ready", () => {
	console_log("This bot is online!");
	bot.user.setActivity("-help | JaredBot");
});

bot.on("ready", () => {
	get_dataset_sizes();
})

// log if JaredBot recieved a DM
bot.on("message", msg => {
	if (msg.guild == null) {
		console_log("JaredBot sent or recieved a DM!");
	}
})

// commands
bot.on("message", msg=> {
	if (msg.guild != null && msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if(msg.content === prefix[msg.guild.id]+"testbot" || msg.content === prefix[msg.guild.id]+"test") {
			testbot_embed = new Discord.MessageEmbed();
			testbot_embed.setColor(embed_colour_info);
			testbot_embed.setDescription("Jared Bot is online!");
			testbot_embed.setTimestamp();
			msg_channel_send(msg, testbot_embed);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content == prefix[msg.guild.id]+"help" || 
		msg.guild != null && msg.content == prefix[msg.guild.id]+"commands" || msg.guild != null && msg.content == "-help") {
		help_embed = new Discord.MessageEmbed();
		help_embed.setColor(embed_color_chat);
		help_embed.setThumbnail(lion_profile_pic);
		help_embed.setAuthor("JaredBot | Command list", lion_profile_pic);
		help_embed.addFields(
			{name: "Tools", value: "`-help tools`\n\u200B", inline: true},
			{name: "Info", value: "`-help info`\n\u200B", inline: true},
			{name: "Chat", value: "`-help chat`\n\u200B", inline: true},
			{name: "Image", value: "`-help img`\n\u200B", inline: true},
			{name: "Games", value: "`-help games`\n\u200B", inline: true},
			{name: "Maths", value: "`-help maths`\n\u200B", inline: true},
			{name: "Admin/Mod", value: "`-help mod`\n\u200B", inline: true},
			{name: "Music", value: "`-help music`\n\u200B", inline: true},
			{name: "Levels", value: "`-help levels`\n\u200B", inline: true}
		)
		msg_channel_send(msg, help_embed);
	}
})

// new line "\n\u200B"

bot.on("message", msg => {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.guild != null && msg.content.slice(0, 6) === prefix[msg.guild.id]+"help " ||
			msg.content == prefix[msg.guild.id]+"tools" || msg.content == prefix[msg.guild.id]+"info" || 
			msg.content == prefix[msg.guild.id]+"chat" || msg.content == prefix[msg.guild.id]+"chat commands" || msg.content == prefix[msg.guild.id]+"img" || msg.content == prefix[msg.guild.id]+"image" ||
			msg.content == prefix[msg.guild.id]+"image commands" || msg.content == prefix[msg.guild.id]+"games" || msg.content == prefix[msg.guild.id]+"game"|| msg.content == prefix[msg.guild.id]+"math" || 
			msg.content == prefix[msg.guild.id]+"maths"|| msg.content == prefix[msg.guild.id]+"admin" || msg.content == prefix[msg.guild.id]+"mod" || msg.content == prefix[msg.guild.id]+"admin/mod" || 
			msg.content == prefix[msg.guild.id]+"admin/mod commands" || msg.content == prefix[msg.guild.id]+"music") {
				module_name = msg.content.slice(6, msg.content.length).toLowerCase();
				help_module_embed = new Discord.MessageEmbed();
				help_module_embed.setColor(embed_color_chat);
				help_module_embed.setAuthor("JaredBot | Command list", lion_profile_pic);
				help_module_embed.setThumbnail(lion_profile_pic);
				help_module_embed.setTimestamp();
			} else {
				module_name = "";
			}
			// Tools
			if (module_name == "tools" || msg.content == prefix[msg.guild.id]+"tools") {
				help_module_embed.setTitle("Help Tools");
				help_module_embed.addFields (
					{name: "-timer {HH:MM:SS}", value: "`-help timer`\n\u200B", inline: true},
					{name: "-stopwatch {start/stop}", value: "`-help stopwatch`\n\u200B", inline: true},
					{name: "-remind me {txt} {min/sec}", value: "`-help remind me`\n\u200B", inline: true},
					{name: "-execute {code}", value: "`-help execute`\n\u200B", inline: true},
					{name: "-translate {text}", value: "`-help translate`\n\u200B", inline: true},
					{name: "-roman {num}", value: "`-help roman`\n\u200B", inline: true},
					{name: "-suggest -bug", value: "`-help suggest`\n\u200B", inline: true},
					{name: "-time {city}", value: "`-help time`\n\u200B", inline: true},
					{name: "-weather {city}", value: "`-help weather`\n\u200B", inline: true},
					{name: "-embed", value: "`-help embed`\n\u200B", inline: true},
					{name: "-avatar @user", value: "`-help avatar`\n\u200B", inline: true},
					{name: "-fancy", value: "`-help fancy`\n\u200B", inline: true},
					{name: "-pychallenge", value: "`-help pychallenge`", inline: true},
					{name: "-invite", value: "`-help invite`\n\u200B", inline: true},
					{name: "-network", value: "`-help network`\n\u200B", inline: true},
					{name: "-mp4", value: "`-help mp4`\n\u200B", inline: true},
					{name: "-download", value: "`-help download`\n\u200B", inline: true},
					{name: "\n\u200B", value: "\n\u200B", inline: true}
				)
				msg_channel_send(msg, help_module_embed);
			// Info
			} else if (module_name == "info" || msg.content == prefix[msg.guild.id]+"info") {
				help_module_embed.setTitle("Help Info");
				help_module_embed.addFields (
					{name: "-invitelink -invite", value: "`-help invitelink`\n\u200B", inline: true},
					{name: "-author", value: "`-help author`\n\u200B", inline: true},
					{name: "-membercount", value: "`-help membercount`\n\u200B", inline: true},
					{name: "-servercount", value: "`-help servercount`\n\u200B", inline: true},
					{name: "-serverinfo", value: "`-help serverinfo`\n\u200B", inline: true},
					{name: "-userinfo @user", value: "`-help userinfo`\n\u200B", inline: true},
					{name: "-roleinfo @role", value: "`-help roleinfo`\n\u200B", inline: true},
					{name: "-testbot", value: "`-help testbot`\n\u200B", inline: true},
					{name: "-uptime", value: "`-help uptime`\n\u200B", inline: true},
					{name: "-steaminfo {ID}", value: "`-help steaminfo`\n\u200B", inline: true},
					{name: "-steamsale", value: "`-help steamsale`\n\u200B", inline: true},
					{name: "-prefix", value: "`-help prefix`\n\u200B", inline: true},
					{name: "-rules", value: "`-help rules`\n\u200B", inline: true},
					{name: "-rule [1-8]", value: "`-help rule`\n\u200B", inline: true},
					{name: "-tos", value: "`-help tos`\n\u200B", inline: true},
					{name: "-table", value: "`-help table`\n\u200B", inline: true},
					{name: "-pokemon", value: "`-help pokemon`\n\u200B", inline: true},
					{name: "-perm @user", value: "`-help perm`\n\u200B", inline: true},
					{name: "-medicine {name}", value: "`-help medicine`\n\u200B", inline: true},
					{name: "-sl {Steam ID}", value: "`-help sl`\n\u200B", inline: true},
					{name: "-covid", value: "`-help covid`\n\u200B", inline: true},
				)
				msg_channel_send(msg, help_module_embed);
			// Chat
			} else if (module_name == "chat" || module_name == "chat commands" || msg.content == prefix[msg.guild.id]+"chat" || msg.content == prefix[msg.guild.id]+"chat commands") {
				help_module_embed.setTitle("Help Chat Commands");
				help_module_embed.addFields (
					{name: "-default dance", value: "`-help default dance`\n\u200B", inline: true},
					{name: "-say {text}", value: "`-help say`\n\u200B", inline: true},
					{name: "-do you/is/will {question}", value: "`-help do you`\n\u200B", inline: true},
					{name: "-howgay @user", value: "`-help howgay`\n\u200B", inline: true},
					{name: "-imbored", value: "`-help imbored`\n\u200B", inline: true},
					{name: "-random name", value: "`-help random name`\n\u200B", inline: true},
					{name: "-bot {message}", value: "`-help bot`\n\u200B", inline: true},
					{name: "-kill @user", value: "`-help kill`\n\u200B", inline: true},
					{name: "-stop", value: "`-help stop`\n\u200B", inline: true},
					{name: "-autoresponse", value: "`-help autoresponse`\n\u200B", inline: true},
					{name: "-replychance {num}", value: "`-help replychance`\n\u200B", inline: true},
					{name: "-choose or -choice", value: "`-help choose`\n\u200B", inline: true},
					{name: "-8ball {question}", value: "`-help 8ball`\n\u200B", inline: true},
					{name: "-font {font num} {text}", value: "`-help font`\n\u200B", inline: true},
					{name: "-letteremoji", value: "`-help letteremoji`\n\u200B", inline: true}
				)
				msg_channel_send(msg, help_module_embed);
			// Image commands
			} else if (module_name == "img" || module_name == "image" || module_name == "image commands" || 
						msg.content == prefix[msg.guild.id]+"img" || msg.content == prefix[msg.guild.id]+"image" || msg.content == prefix[msg.guild.id]+"image commands") {
				help_module_embed.setTitle("Help Image Commands");
				help_module_embed.setDescription("To see help for automatic image posting type `-help autopost`!\n\u200B");
				help_module_embed.addFields (
					{name: "Animals", value: "`-help animal`", inline: true},
					{name: "NSFW", value: "`-help nsfw`", inline: true},
					{name: "Meme", value: "`-help meme`", inline: true},
					{name: "Photo", value: "`-help photos`", inline: true},
					{name: "Reaction", value: "`-help reaction`", inline: true},
					{name: "\u200B", value: "\u200B", inline: true}
				)
				msg_channel_send(msg, help_module_embed);
			} else if (module_name == "animal" || msg.content == prefix[msg.guild.id]+"animal") {
				// animal
				help_module_embed.setTitle("Help Animal Image Commands");
				help_module_embed.setDescription("To see help for automatic image posting type `-help autopost`!\n\u200B");
				help_module_embed.addFields (
					{name: "-random animal", value: "`-help random animal`\n\u200B", inline: true},
					{name: "-cat -meow", value: "`-help cat`\n\u200B", inline: true},
					{name: "-dog -woof", value: "`-help dog`\n\u200B", inline: true},
					{name: "-snake", value: "`-help snake`\n\u200B", inline: true},
					{name: "-bird", value: "`-help bird`\n\u200B", inline: true},
					{name: "-racoon", value: "`-help racoon`\n\u200B", inline: true},
				)
				msg_channel_send(msg, help_module_embed);
			} else if (module_name == "nsfw" || msg.content == prefix[msg.guild.id]+"nsfw") {
				// nsfw
				help_module_embed.setTitle("Help NSFW Image Commands");
				help_module_embed.setDescription("To see help for automatic image posting type `-help autopost`!\n\u200B");
				help_module_embed.addFields (
					{name: "-hentai", value: "`-help hentai`\n\u200B", inline: true},
					{name: "-boob", value: "`-help boob`\n\u200B", inline: true},
					{name: "-nude", value: "`-help nude`\n\u200B", inline: true},
					{name: "-pussy", value: "`-help pussy`\n\u200B", inline: true},
					{name: "-ass", value: "`-help ass`\n\u200B", inline: true},
					{name: "-anal", value: "`-help anal`\n\u200B", inline: true},
					{name: "-blowjob", value: "`-help bj`\n\u200B", inline: true},
					{name: "-fingering", value: "`-help finger`\n\u200B", inline: true},
					{name: "-porngif", value: "`-help porngif`\n\u200B", inline: true},
				)
				msg_channel_send(msg, help_module_embed);
			} else if (module_name == "meme") {
				// meme
				help_module_embed.setTitle("Help Meme Image Commands");
				help_module_embed.setDescription("To see help for automatic image posting type `-help autopost`!\n\u200B");
				help_module_embed.addFields (
					{name: "-meme", value: "`-help meme`\n\u200B", inline: true},
					{name: "-catmeme", value: "`-help catmeme`\n\u200B", inline: true},
					{name: "-dogmeme", value: "`-help dogmeme`\n\u200B", inline: true},
				)
				msg_channel_send(msg, help_module_embed);
			} else if (module_name == "photos" || msg.content == prefix[msg.guild.id]+"photos") {
				// photo
				help_module_embed.setTitle("Help Photo Image Commands");
				help_module_embed.setDescription("To see help for automatic image posting type `-help autopost`!\n\u200B");
				help_module_embed.addFields (
					{name: "-heli -chpper", value: "`-help heli`\n\u200B", inline: true},
					{name: "-car", value: "`-help car`\n\u200B", inline: true},
					{name: "-photo", value: "`-help photo`\n\u200B", inline: true},
					{name: "-flipcoin", value: "`-help flipcoin`\n\u200B", inline: true},
					{name: "-roll", value: "`-help roll`\n\u200B", inline: true},
					{name: "-element {elm num}", value: "`-help element`\n\u200B", inline: true},
				)
				msg_channel_send(msg, help_module_embed);
			} else if (module_name == "reaction" || msg.content == prefix[msg.guild.id]+"reaction") {
				// reaction
				help_module_embed.setTitle("Help Reaction Image Commands");
				help_module_embed.setDescription("To see help for automatic image posting type `-help autopost`!\n\u200B");
				help_module_embed.addFields (
					{name: "-owo", value: "`-help owo`\n\u200B", inline: true},
					{name: "-hug @user", value: "`-help hug`\n\u200B", inline: true},
					{name: "-kiss @user", value: "`-help kiss`\n\u200B", inline: true},
				
				)
				msg_channel_send(msg, help_module_embed);
			// Games	
			} else if (module_name == "game" || module_name == "games" || msg.content == prefix[msg.guild.id]+"games" || msg.content == prefix[msg.guild.id]+"game") {
				help_module_embed.setTitle("Help Games");
				help_module_embed.addFields (
					{name: "-rock, -paper, -scissors", value: "`-help rock`\n\u200B"},
					{name: "-higherlower", value: "`-help higherlower`\n\u200B"},
					{name: "-ttt", value: "`-help ttt`\n\u200B"},
					{name: "-justone", value: "`-help justone`\n\u200B"},
					{name: "\u200B", value: "\u200B", inline: true},
					{name: "\u200B", value: "\u200B", inline: true},
				)
				msg_channel_send(msg, help_module_embed);
			// Math
			} else if (module_name == "math" || module_name == "maths" || msg.content == prefix[msg.guild.id]+"math" || msg.content == prefix[msg.guild.id]+"maths") {
				help_module_embed.setTitle("Help Maths");
				help_module_embed.addFields (
					{name: "-hex, -bin, -oct", value: "`-help hex`\n`-help bin`\n`-help oct`\n\u200B", inline: true},
					{name: "-bin2int, -oct2int, -hex2int", value: "`-help bin2int`\n`-help oct2int`\n`-help hex2int`\n\u200B", inline: true},
					{name: "-bin2text, -oct2text, -hex2text", value: "`-help bin2text`\n`-help oct2text`\n`-help hex2text`\n\u200B", inline: true},
					{name: "-base{base}", value: "`-help base`\n\u200B", inline: true},
					{name: "-isleap {year}", value: "`-help isleap`\n\u200B", inline: true},
					{name: "-bmi {height cm} {weight kg}", value: "`-help bmi`\n\u200B", inline: true},
					{name: "-c and -f", value: "`-help c`\n`-help f`\n\u200B", inline: true},
					{name: "-saynum {num}", value: "`-help saynum`\n\u200B", inline: true},
					{name: "-hash", value: "`-help hash`\n\u200B", inline: true},
					{name: "-shift{num} {text}", value: "`-help shift`\n\u200B", inline: true},
					{name: "-calc {equation}", value: "`-help calc`\n\u200B", inline: true},
					{name: "\u200B", value: "\u200B", inline: true}
				)
				msg_channel_send(msg, help_module_embed);
			// Admin/mod
			} else if (module_name == "admin" || module_name == "mod" || module_name == "admin/mod" || module_name == "admin/mod commands" || 
						msg.content == prefix[msg.guild.id]+"admin" || msg.content == prefix[msg.guild.id]+"mod" || msg.content == prefix[msg.guild.id]+"admin/mod" ||
						msg.content == prefix[msg.guild.id]+"admin/mod commands") {
				help_module_embed.setTitle("Help Admin/Mod commands");
				help_module_embed.addFields (
					{name: "-announce {text}", value: "`-help announce`\n\u200B", inline: true},
					{name: "-mute @user", value: "`-help mute`\n\u200B", inline: true},
					{name: "-unmute @user", value: "`-help unmute`\n\u200B", inline: true},
					{name: "-tempmute @user {length mins}", value: "`-help tempmute`\n\u200B", inline: true},
					{name: "-invisible @user", value: "`-help invisible`\n\u200B", inline: true},
					{name: "-visible @user", value: "`-help visible`\n\u200B", inline: true},
					{name: "-kick @user", value: "`-help kick`\n\u200B", inline: true},
					{name: "-ban @user", value: "`-help ban`\n\u200B", inline: true},
					{name: "-unban {User ID}", value: "`-help unban`\n\u200B", inline: true},
					{name: "-tempban @user {length mins}", value: "`-hlelp tempban`\n\u200B", inline: true},
					{name: "-logging [on/off]", value: "`-help logging`\n\u200B", inline: true},
					{name: "-prefix {prefix}", value: "`-help prefix`\n\u200B", inline: true},
					{name: "-snipe", value: "`-help snipe`\n\u200B", inline: true},
					{name: "-snipping [on/off]", value: "`-help snipping`\n\u200B", inline: true},
					{name: "-filter [on/off]", value: "`-help filter`\n\u200B", inline: true},
					{name: "-exit", value: "`-help exit`\n\u200B", inline: true},
					{name: "-clearlog", value: "`-help clearlog`\n\u200B", inline: true},
					{name: "-purge", value: "`-help purge`\n\u200B", inline: true},
					{name: "-automod", value: "`-help automod`", inline: true},
					{name: "-autopost", value: "`-autopost`\n\u200B", inline: true},
					{name: "-filter", value: "`-help filter`\n\u200B", inline: true},
					{name: "-slowmode {MM:SS}", value: "`-help slowmode`\u200B", inline: true},
					{name: "-banurl", value: "`-help banurl`", inline: true},
					{name: "\n\u200B", value: "\n\u200B"}
				)
				msg_channel_send(msg, help_module_embed);
			// Music
			} else if (module_name == "music" || msg.content == prefix[msg.guild.id]+"music") {
				help_music(msg);
			// Levels
			} else if (module_name == "levels" || module_name == "level" || module_name == "leaderboard" || module_name == "scoreboard" || 
				module_name == "score" || module_name == "msgcount" || module_name == "messagecount") {
				help_module_embed.setTitle("Help Admin/Mod commands");
				help_module_embed.addFields (
					{name: "Levels", value: "`-levels` shows the leaderboard for your server.\n\u200B"},
					{name: "Rank", value: "`-rank @user` shows a users rank card.\n\u200B"},
					{name: "Add Score", value: "`-help addscore`.\n\u200B"},
					{name: "Restore Backup", value: "`-help restorebackup`.\n\u200B"}
				)
				msg_channel_send(msg, help_module_embed);
			// Individual commands help
			
			// Tools
			} else if (module_name == "remind me" || msg.content == prefix[msg.guild.id]+"remind me") {
				embed_help_reply(msg, {name: "remind me {reminder} {No. min/sec}", value: "sets a reminder, the bot will ping you in the specified number of seconds. For example `-remind me to check steam in 10 mins`, will ping you in 10 mins telling you to check steam.\n\u200B"});
			} else if (module_name == "timer" || msg.content == prefix[msg.guild.id]+"timer") {
				embed_help_reply(msg, {name: "-timer {HH:MM:SS}", value: "sets a timer, the bot will ping you after the specified number of seconds, for example `-timer 00:10:30`, will ping you after 10 mins and 30 seconds.\n\u200B"});
			} else if (module_name == "stopwatch" || msg.content == prefix[msg.guild.id]+"stopwatch") {
				embed_help_reply(msg, {name: "-stopwatch {start/stop}", value: " `-stopwatch start` starts a stopwatch, to stop the stopwatch you can then type `-stopwatch stop`, the bot will then tell you how much time has passed between you starting and stopping the stopwatch.\n\u200B"});
			} else if (module_name == "execute" || msg.content == prefix[msg.guild.id]+"execute") {
				embed_help_reply(msg, {name: "-execute {code}", value: "executes some Python code, for example `-execute print(list(filter(None, [i if i%2==0 else '' for i in range(100)])))` will print all even number up to 100.\n\u200B"});
			} else if (module_name == "translate" || msg.content == prefix[msg.guild.id]+"translate") {
				embed_help_reply(msg, {name: "-translate {text}", value: "Translate text in other languages back into English, for example `-translate cómo estás` will display `how are you`.\n\u200B"});
			} else if (module_name == "roman" || msg.content == prefix[msg.guild.id]+"roman") {
				embed_help_reply(msg, {name: "-roman {num}", value: "Converts an integer into roman numerals, for example `-roman 2020` will display `MMXX`.\n\u200B"});
			} else if (module_name == "suggest" || msg.content == prefix[msg.guild.id]+"suggest" || module_name == "suggestion" || 
				msg.content == prefix[msg.guild.id]+"suggestion" || module_name == "bug" || msg.content == prefix[msg.guild.id]+"bug") {
				embed_help_reply(msg, {name: "-suggest -bug", value: "use this command to make a suggestion on how to improve the server, or to report a bug, syntax for the command is `-bug {text}` or `-suggest {text}`, your suggestion will automtically appear on the Jared Network suggestions channel.\n\u200B"});
			} else if (module_name == "time" || module_name == "timezone" || msg.content == prefix[msg.guild.id]+"time" || msg.content == prefix[msg.guild.id]+"timezone") {
				embed_help_reply(msg, {name: "-time {city}", value: "get the time in a current city.\n\u200B"});
			} else if (module_name == "weather") {
				embed_help_reply(msg, {name: "-weather {city}", value: "get the weather for a given city.\n\u200B"});
			} else if (module_name == "embed") {
				embed_help_reply(msg, {name: "-embed", value: "Embed generator, allows you to create custom embeds, type `-embed` for more information.\n\u200B"});
			} else if (module_name == "pychallenge") {
				embed_help_reply(msg, {name: "-pychallenge", value: "Gives you a random python challenge, useful if your stuck and dont know what to code.\n\u200B"});
		
			// Info
			} else if (module_name == "invitelink") {
				embed_help_reply(msg, {name: "-invitelink -invite", value: "`-invitelink` shows an invite link to the Jared Network discord server, `-invite` creates an invite for your server.\n\u200B"});
			} else if (module_name == "author") {	
				embed_help_reply(msg, {name: "-author", value: "Shows who the bot was created by Jared Turck, and displays links to steam account so you can contact me.\n\u200B"});
			} else if (module_name == "membercount") {	
				embed_help_reply(msg, {name: "-membercount", value: "Shows the total number of members on the server.\n\u200B"});
			} else if (module_name == "servercount") {	
				embed_help_reply(msg, {name: "-servercount", value: "Shows the total number of servers Jared bot is authorised on.\n\u200B"});
			} else if (module_name == "serverinfo") {
				embed_help_reply(msg, {name: "-serverinfo", value: "Shows statistic about the server.\n\u200B"});
			} else if (module_name == "testbot") {	
				embed_help_reply(msg, {name: "-testbot", value: "Checks if the bot is online, if you dont get a response then the bot is offline.\n\u200B"});
			} else if (module_name == "uptime") {	
				embed_help_reply(msg, {name: "-uptime", value: "Shows the amount of time the bot has been online for, since the last restart.\n\u200B"});
			} else if (module_name == "steaminfo" || msg.content == prefix[msg.guild.id]+"steaminfo") {	
				embed_help_reply(msg, {name: "-steaminfo {ID}", value: "Shows basic profile statistics for a steam user, for example `-steaminfo JaredCat` will shows the stats for my steam account, you can also specify a profile URL `-steaminfo https://steamcommunity.com/id/jaredcat` will also display my profile stats.\n\u200B"});
			} else if (module_name == "steamsale") {
				embed_help_reply(msg, {name: "-steamsale", value: "Shows when the next Steam Sale is.\n\u200B"});
			} else if (module_name == "prefix") {	
				embed_help_reply(msg, {name: "-prefix", value: "shows the current prefix used by the bot, the default prefix used by the bot is `-`.\n\u200B"});
			} else if (module_name == "rule" || msg.content == prefix[msg.guild.id]+"rule") {	
				embed_help_reply(msg, {name: "-rule [1-8]", value: "display a specific rule, for example `-rule 8` will display the 8th rule on the server.\n\u200B"});
			} else if (module_name == "tos") {	
				embed_help_reply(msg, {name: "-tos", value: "Shows the Discord Community Guidelines."});
			} else if (module_name == "element") {	
				embed_help_reply(msg, {name: "-element {elm num}", value: "displays statistics about a specific element on the periodic table, for example `-element 79` will displays stats on gold.\n\u200B"});
			} else if (module_name == "table" || module_name == "periodictable") {
				embed_help_reply(msg, {name: "-table", value: "displays a photo of the periodic table, you can use this command for example to get the number of an element, and then use the `-element` command to get more info on that element.\n\u200B"});
			} else if (module_name == "pokemon") {	
				embed_help_reply(msg, {name: "-pokemon", value: "displays information on pokemon, you can specify a pokemon by index, for example -pokemon 39 will show info for Jigglypuff , or by name e.g. `-pokemon Pikachu` for info on Pikachu!\n\u200B"});
			} else if (module_name == "perm") {	
				embed_help_reply(msg, {name: "-perm @user", value: "displays users permissions for the server they are currently on.\n\u200B"});
			} else if (module_name == "userinfo") {	
				embed_help_reply(msg, {name: "-userinfo @user", value: "displays information about a specific discord user.\n\u200B"});
			} else if (module_name == "medicine") {	
				embed_help_reply(msg, {name: "-medicine {name}", value: "displays information about a medicine, type `-medicine` for more information..\n\u200B"});
			} else if (module_name == "sl" || msg.content == prefix[msg.guild.id]+"sl") {
				embed_help_reply(msg, {name: "-sl {Steam ID}", value: "displays steam ladders stats for the specified account.\n\u200B"});
		
			// Chat
			} else if (module_name == "default dance") {
				embed_help_reply(msg, {name: "-default dance", value: "does the default dance.\n\u200B"});
			} else if (module_name == "say" || msg.content == prefix[msg.guild.id]+"say") {
				embed_help_reply(msg, {name: "-say {text}", value: "The bot will repeat whatever you say, for example `-say Hello` will make the bot will say `Hello` back.\n\u200B"});
			} else if (module_name == "do you" || module_name == "is" || module_name == "will" || 
				msg.content == prefix[msg.guild.id]+"do you" || msg.content == prefix[msg.guild.id]+"is" || msg.content == prefix[msg.guild.id]+"will") {
				embed_help_reply(msg, {name: "-do you/is/will {question}", value: "The bot will answer a yes or no question, for example `-do you think there will be a WW3?`, `-is the earth flat?`, `-will i ever get a gf?` the bot will then answer yes or no.\n\u200B"});
			} else if (module_name == "howgay") {
				embed_help_reply(msg, {name: "-howgay @user", value: "Gives a percentage of how gay you are `-howgay` or how gay another user is for example `-hoygay @Jared` will show hoy gay Jared is.\n\u200B"});
			} else if (module_name == "imbored") {
				embed_help_reply(msg, {name: "-imbored", value: "Gives you something random to do, use this command to get sugestions of stuff to do when you bored and dont know what to do.\n\u200B"});
			} else if (module_name == "random name") {
				embed_help_reply(msg, {name: "-random name", value: "Gives you a random first and last name, can be useful if you need a fake name for online form.\n\u200B"});
			} else if (module_name == "bot" || msg.content == prefix[msg.guild.id]+"bot") {
				embed_help_reply(msg, {name: "-bot {message}", value: "Lets you talk to an Artificial Intelligence (AI) powered chat bot.\n\u200B"});
			} else if (module_name == "kill" || msg.content == prefix[msg.guild.id]+"kill") {
				embed_help_reply(msg, {name: "-kill @user", value: "Kill the specified user, syntax for the command is kill then the users @ tag.\n\u200B"});
			} else if (module_name == "stop") {
				embed_help_reply(msg, {name: "-stop", value: "This disables the bots auto response, auto response is a feature where the bot will sometimes randomly repeat messages, for example you type hello and the bot responds hi. Use this command if the auto response feature is annoying or the bot is spamming."});
			} else if (module_name == "autoresponse") {
				embed_help_reply(msg, {name: "-autoresponse", value: "enabled autoresponse, the bot will begin randomly repeating messages again.\n\u200B"});
			} else if (module_name == "replychance") {
				embed_help_reply(msg, {name: "-replychance {num}", value: "sets how often the bots auto response will reply to messages, the higher the value the less the bot will respond to messages, for example `-replychance 2` the bot will respond 50% of the time, `-replychance 4` the bot will respond 25% of the time.\n\u200B"});
			} else if (module_name == "choose" || module_name == "choice" || msg.content == prefix[msg.guild.id]+"choose" || msg.content == prefix[msg.guild.id]+"choice") {
				embed_help_reply(msg, {name: "-choose or -choice", value: "the bot will randomly choose an option from a list, each item in your list can be seperated with commas or a number and dot, for example `-choose cat, dog, mouse, fish` or `-choice 1. cat 2. dog 3. mouse 4. fish` the bot will random pick of of those 4 animals.\n\u200B"});
			} else if (module_name == "8ball" || msg.content == prefix[msg.guild.id]+"8ball") {
				embed_help_reply(msg, {name: "-8ball {question}", value: "lets you ask the 8ball a question, and see what the response is.\n\u200B"});
			} else if (module_name == "font" || msg.content == prefix[msg.guild.id]+"font") {
				embed_help_reply(msg, {name: "-font {font num} {text}", value: "converts text into a fancy unicode font, for example `-font 1 Jared` will be converted to `𝓳𝓪𝓻𝓮𝓭`, the font number is the font you would like to use on the text. (im still working on this feature it's currently broken).\n\u200B"});
			} else if (module_name == "letteremoji" || msg.content == prefix[msg.guild.id]+"letteremoji") {
				help_letteremoji(msg);
		
			// Image
			} else if (module_name == "random animal") {
				embed_help_reply(msg, {name: "-random animal", value: "Shows a photo of a random animal.\n\u200B"});
			} else if (module_name == "hentai") {
				embed_help_reply(msg, {name: "-hentai", value: "Shows a random hentai photo, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "boob") {
				embed_help_reply(msg, {name: "-boob", value: "posts a photo of some boobs, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "nude") {
				embed_help_reply(msg, {name: "-nude", value: "posts a photo of a nude girl, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "ass") {
				embed_help_reply(msg, {name: "-ass", value: "posts a photo of a nude girls ass, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "pussy") {
				embed_help_reply(msg, {name: "-pussy", value: "posts a photo of a vagina, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "anal") {
				embed_help_reply(msg, {name: "-anal", value: "posts a photo of anal, or something being inserted into the ass, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "bj" || module_name == "blowjob") {
				embed_help_reply(msg, {name: "-bj", value: "posts a photo of a blowjob, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "finger" || module_name == "fingering") {
				embed_help_reply(msg, {name: "-fingering", value: "posts a photo of a girl fingering her pussy, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "porngif" || module_name == "porn") {
				embed_help_reply(msg, {name: "-porngif", value: "posts a porn gif, this is an NSFW command and can only be used in NSFW channels.\n\u200B"});
			} else if (module_name == "meme") {
				embed_help_reply(msg, {name: "-meme", value: "Shows a random meme.\n\u200B"});
			} else if (module_name == "catmeme") {
				embed_help_reply(msg, {name: "-catmeme", value: "Shows a random cat meme."});
			} else if (module_name == "flipcoin") {
				embed_help_reply(msg, {name: "-flipcoin", value: "Flips a coin, the coin could land on heads or tails.\n\u200B"});
			} else if (module_name == "roll") {
				embed_help_reply(msg, {name: "-roll", value: "rolls a dice, the dice could land on any face from 1-6.\n\u200B"});
			} else if (module_name == "cat" || module_name == "meow") {
				embed_help_reply(msg, {name: "-cat -meow", value: "shows a random cat photo.\n\u200B"});
			} else if (module_name == "dog" || module_name == "woof") {
				embed_help_reply(msg, {name: "-dog -woof", value: "shows a random dog photo.\n\u200B"});
			} else if (module_name == "heli" || module_name == "chpper") {
				embed_help_reply(msg, {name: "-heli -chpper", value: "shows a photo of a helicopter.\n\u200B"});
			} else if (module_name == "dogmeme") {
				embed_help_reply(msg, {name: "-dogmeme", value: "posts a random dog meme.\n\u200B"});
			} else if (module_name == "car") {
				embed_help_reply(msg, {name: "-car", value: "posts a random photo of a car.\n\u200B"});
			} else if (module_name == "snake") {
				embed_help_reply(msg, {name: "-snake", value: "posts a random photo of a snake.\n\u200B"});
			} else if (module_name == "bird") {
				embed_help_reply(msg, {name: "-bird", value: "posts a random photo of a bird.\n\u200B"});
			} else if (module_name == "racoon") {
				embed_help_reply(msg, {name: "-racoon", value: "posts a random photo of a racoon.\n\u200B"});
			} else if (module_name == "owo" || msg.content == prefix[msg.guild.id]+"owo") {
				help_owo(msg);
			} else if (module_name == "hug") {
				embed_help_reply(msg, {name: "-hug @user", value: "lets you hug another user.\n\u200B"});
			} else if (module_name == "photo") {
				embed_help_reply(msg, {name: "-photo", value: "posts a random photography photo.\n\u200B"});
		
			// Games
			} else if (module_name == "rock" || module_name == "paper" || module_name == "scissors" || module_name == "rps") {
				embed_help_reply(msg, {name: "-rock, -paper, -scissors", value: "Play a game of rock paper scissors with the bot, you can type `-rock` for rock, `-paper` for paper, or `-scissors` for scissors.\n\u200B"});
			} else if (module_name == "higherlower") {
				embed_help_reply(msg, {name: "-higherlower", value: "Play a game where you have to try and guess a secret number between 1 and 100 in as few tries as possible, after every guess the bot will tell you if your guess was higher or lower then there secret number.\n\u200B"});
			} else if (module_name == "ttt") {
				embed_help_reply(msg, {name: "-ttt", value: "Play a game of TicTacToe against the bot, take it in turns to place a mark on a 3x3 grid, first person to get 3 in a row wins (im still currently working on this game).\n\u200B"});
			
			// Maths
			} else if (module_name == "hex" || module_name == "bin" || module_name == "oct" || 
				msg.content == prefix[msg.guild.id]+"hex" || msg.content == prefix[msg.guild.id]+"bin" || msg.content == prefix[msg.guild.id]+"oct") {
				embed_help_reply(msg, {name: "-hex, -bin, -oct", value: "these commands convert a decimal integer to the base 2, 8 and 16 number system, i.e. `-hex` converts decimal to hexadecimal `-hex 4003` becomes `fa3`, `-oct` converts decimal to octal decimal `-oct 59` becomes `73`, `-bin` converts decimal to binary so `-bin 456` becomes `111001000`.\n\u200B"});
			} else if (module_name == "base") {
				embed_help_reply(msg, {name: "-base{base}", value: "This command converts a decimal integer to any specified number system, for example `-base24 258` becomes `ai`, or `-base14 69` becomes `4d`.\n\u200B"});
			} else if (module_name == "bin2int" || module_name == "oct2int" || module_name == "hex2int" || 
				msg.content == prefix[msg.guild.id]+"bin2int" || msg.content == prefix[msg.guild.id]+"oct2int" || msg.content == prefix[msg.guild.id]+"hex2int") {
				embed_help_reply(msg, {name: "-bin2int, -oct2int, -hex2int", value: "Converts a base 2, 8, or 16 integers to base 10 denary, for example `-bin2int 1010101101` becomes `685`, `-oct2int 25360` becomes `10992`, and `-hex2int ff2ac2` becomes `16722626`.\n\u200B"});
			} else if (module_name == "bin2text" || module_name == "oct2text" || module_name == "hex2text" || 
				msg.content == prefix[msg.guild.id]+"bin2text" || msg.content == prefix[msg.guild.id]+"oct2text" || msg.content == prefix[msg.guild.id]+"hex2text") {
				embed_help_reply(msg, {name: "-bin2text, -oct2text, -hex2text", value: "Converts base 2, 8, or 16 list of integers (seperated by spaces) to base 10 denary, then converts the integers to unicode characters. For example `-bin2text 1101000 1100101 1101100 1101100 1101111` becomes `hello`, `-oct2text 150 145 171` becomes `hey`, and `-hex2text 4a 61 72 65 64 20 69 73 20 61 77 65 73 6f 6d 65` becomes `Jared is awesome`.\n\u200B"});
			} else if (module_name == "isleap" || msg.content == prefix[msg.guild.id]+"isleap") {
				embed_help_reply(msg, {name: "-isleap {year}", value: "Checks if the specified year is a leap year, for example `-isleap 2020` returns `true`, or `-isleap 1966` returns `false`.\n\u200B"});
			} else if (module_name == "bmi" || msg.content == prefix[msg.guild.id]+"bmi") {
				embed_help_reply(msg, {name: "-bmi {height cm} {weight kg}", value: "calculates the bmi of the specified height and weight values, for example `-bmi 180 50` displays underweight.\n\u200B"});
			} else if (module_name == "c" || module_name == "f" || msg.content == prefix[msg.guild.id]+"c" || msg.content == prefix[msg.guild.id]+"f") {
				embed_help_reply(msg, {name: "-c and -f", value: "converts between Celsius (-c) and Fahrenheit (-f), for example `-c 24` becomes `75.2` Fahrenheit, or `-f 110` becomes `43.3` Celsius.\n\u200B"});
			} else if (module_name == "saynum" || module_name == "int2text" || msg.content == prefix[msg.guild.id]+"saynum" || msg.content == prefix[msg.guild.id]+"int2text") {
				embed_help_reply(msg, {name: "-saynum {num}", value: "converts a base 10 denary integer to written english, for example `-saynum 1` becomes `one`, and `-saynum -47623.9` becomes `minus fourty seven thousand, six hundred and twenty three point nine`.\n\u200B"});
			} else if (module_name == "shift" || module_name == "caesar" || module_name == "shift cipher" || 
				msg.content == prefix[msg.guild.id]+"shift" || msg.content == prefix[msg.guild.id]+"caesar" || msg.content == prefix[msg.guild.id]+"cipher") {
				embed_help_reply(msg, {name: "-shift{num} {text}", value: "Uses the Caesar Shift Cipher, to shift the characters in a string the specified number of times, for example `-shift2 aaa` becomes `ccc` (still working on this command).\n\u200B"});
			} else if (module_name == "calc" || module_name == "add" || module_name == "subtract" || module_name == "times" || module_name == "divide" ||
				msg.content == prefix[msg.guild.id]+"calc" || msg.content == prefix[msg.guild.id]+"add" || msg.content == prefix[msg.guild.id]+"subtract" || 
				msg.content == prefix[msg.guild.id]+"times" || msg.content == prefix[msg.guild.id]+"divide") {
				embed_help_reply(msg, {name: "-calc {equation}", value: "allows you to preform a mathimatical calculation, for example `-calc 2**10 + 4/7` returns `146.8`, type `-calc` for more information on the command.\n\u200B"});
			
			// Admin/Mod
			} else if (module_name == "announce" || msg.content == prefix[msg.guild.id]+"announce") {
				embed_help_reply(msg, {name: "-announce {text}", value: "Sends an announcement!\n\u200B"});
			} else if (module_name == "mute") {
				embed_help_reply(msg, {name: "-mute @user", value: "Mutes a user preventing them from speaking and messaging in channels, beaware that muted users can still read the chat, they just cannot respond or talk back. the syntax for the command is `-mute @user`, you can also specify a reason after the @ tag for the mute if you want too, for example `-mute @jared for spamming!`.\n\u200B"});
			} else if (module_name == "unmute") {
				embed_help_reply(msg, {name: "-unmute @user", value: "unmutes the user allowing them to talk again in both text and voice channels on the server, beaware that users that have been unmuted will be able to edit previos messages and fully interact within the channels channels again, the syntax for the command is `-unmute @user`.\n\u200B"});
			} else if (module_name == "tempmute") {
				embed_help_reply(msg, {name: "-tempmute @user {length mins}", value: "allows you to temporerly mute a user for a specified amount of time, the bot will then unmute that user after the specified length of time is complete, the syntax for the command is `-tempmute @user {length in mins}`, for example `-tempmute @jared 5` will mute jared for 5 mins. Make sure that your length is an integer, if you want to mute a user for an hour you would type 60, and 24 hours 1 day would be 1440 mins e.g. `-tempmute @user 1440`.\n\u200B"});
			} else if (module_name == "invisible") {
				embed_help_reply(msg, {name: "-invisible @user", value: "makes the user invisible, invisible users cannot see any channels on the server, the syntax for the command is `-invsible @user` for example `-invisible @jared` will make jared invisible.\n\u200B"});
			} else if (module_name == "visible") {
				embed_help_reply(msg, {name: "-visible @user", value: "makes the user visable so that they can see all the channels on the server after being made invisible, the syntax for the command is `-vsible @user` for example `-visible @jared` will make jared visible.\n\u200B"});
			} else if (module_name == "kick") {
				embed_help_reply(msg, {name: "-kick @user", value: "kicks a user from the server, beaware that once a user has been kicked from the server they can still join back if they have an invite link. Once a user is kicked all of there roles are lost, so if they do join back they wont have any of the previous roles they had. The syntax for the command is `-kick @user`, for example `-kick @jared` will kick Jared from the server, you can also sepcify a reason for the kick e.g. `-kick @jared for spamming`.\n\u200B"});
			} else if (module_name == "ban") {
				embed_help_reply(msg, {name: "-ban @user", value: "Bans a user from the server, once a user is banned they cannot join the server again even if they have an invite link, bans are also IP based which in most cases prevents from from joining the server again on an alt account. The syntax for the command is `-ban @user`, for example `-ban @jared` ban Jared from the server, you can also specify a reason for the ban e.g. `-ban @jared for organsing a raid`.\n\u200B"});
			} else if (module_name == "unban") {
				embed_help_reply(msg, {name: "-unban {User ID}", value: "Allows you to unban a user from the server, you can't @ someone who isn't in the server, so you will need to specify the users ID when unbanning them. You can get the banned users ID by right clicking on a previous message they have sent and clicking copy ID, for example to unban Jared from a server the command would be `-unban 738484352568262747`.\n\u200B"});
			} else if (module_name == "tempban") {
				embed_help_reply(msg, {name: "-tempban @user {length mins}", value: "Temporerly bans a user from the server for a specified length of time, then unbans them. Syntax is `-tempban @user {length in mins}` for example `-tempban @jared 60` would ban jared for 1 hour, for 24 hours 1 day you would type 1440 mins.\n\u200B"});
			} else if (module_name == "logging" || msg.content == prefix[msg.guild.id]+"logging") {
				embed_help_reply(msg, {name: "-logging [on/off]", value: "Toggle between turning logging on or off, logging is where messages are recorded in the server and saved to a log file, turning logging on will result in all messages being saved to a log file, this is very useful for looking at conversation history.\n\u200B"});
			} else if (module_name == "prefix") {
				embed_help_reply(msg, {name: "-prefix {prefix}", value: "Allows you to change the prefix of the bot, the syntax for this command is `-prefix {new prefix}` for example to change JaredBot's prefix to `.` you would type `-prefix .`.\n\u200B"});
			} else if (module_name == "snipe") {
				embed_help_reply(msg, {name: "-snipe", value: "This command shows all messages that have been recently deleted, please beaware the command could show some inappropriate or offensive content, as it also shows messages that where deleted by JaredBot's contenting filtering, as tell as message which where manually deleted by a user. also be beaware the log file is clear every 24 hours, so you wont be able to see deleted messages from a few days ago.\n\u200B"});
			} else if (module_name == "snipping" || msg.content == prefix[msg.guild.id]+"snipping") {
				embed_help_reply(msg, {name: "-snipping [on/off]", value: "turn snipping on or off, snipping is a feature that logs recently deleted messages, turnning snipping on `-snipping on` will result in all messages that where recently deleted being logged. You can then view the contents on this log file with the `-snipe` command.\n\u200B"});
			} else if (module_name == "filter") {
				filter_help(msg);
			} else if (module_name == "exit") {
				embed_help_reply(msg, {name: "-exit", value: "shuts the entire bot down, taking JaredBot offline. Only Jared can use this command, it's designed to be used during development incase something goes wrong Jared can shut the bot down for whatever reason.\n\u200B"});
			} else if (module_name == "clearlog") {
				embed_help_reply(msg, {name: "-clearlog", value: "clears the deleted messages log file, any messages that are stored in the log file will be removed.\n\u200B"});
			} else if (module_name == "purge" || module_name == "clear") {
				help_clear(msg);
			} else if (module_name == "automod") {
				automod_help(msg);
			} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"autonude" || msg.content == prefix[msg.guild.id]+"autophoto" || msg.content == prefix[msg.guild.id]+"autopost" ||
					msg.content == prefix[msg.guild.id]+"autobird" || msg.content == prefix[msg.guild.id]+"autocar" || msg.content == prefix[msg.guild.id]+"autocat" ||
					msg.content == prefix[msg.guild.id]+"autodog" || msg.content == prefix[msg.guild.id]+"autosnake" || msg.content == prefix[msg.guild.id]+"automeme" || 
					msg.content == prefix[msg.guild.id]+"autohentai" || msg.content == prefix[msg.guild.id]+"autonude" || msg.content == prefix[msg.guild.id]+"autopost" ||
					msg.content == prefix[msg.guild.id]+"autoporngif") {
				autopost_help(msg);
			} else if (module_name == "slowmode" || msg.content == prefix[msg.guild.id]+"slowmode") {
				embed_help_reply(msg, {name: "-slowmode", value: "Enables slow mode on the channel you type it in, the syntax for the command is `-slowmode {MM:SS}` for example `-slowmode 5:45` would set slowmode to 5 mins and 45 seconds.\n\u200B"});
			} else if (module_name == "banurl" || msg.content == prefix[msg.guild.id]+"banurl") {
				embed_help_reply(msg, {name: "-banurl", value: "Lets you ban a URL, preventing users from posting it. For example `-banurl http://reddit.com/r/boobs` would ban the boobs subreddit."});
			
			// hash
			} else if (module_name == "hash") {
				hash_help(msg);
			} else if (module_name == "md4" || msg.content == prefix[msg.guild.id]+"md4") {
				embed_help_reply(msg, {name: "-md4", value: "Generates an MD4 hash, for example `-md4 Hello` produces `a58fc871f5f68e4146474ac1e2f07419`.\n\u200B"});
			} else if (module_name == "md5" || msg.content == prefix[msg.guild.id]+"md5") {
				embed_help_reply(msg, {name: "-md5", value: "Generates an MD5 hash, for example `-md5 Hello` produces `8b1a9953c4611296a827abf8c47804d7`.\n\u200B"});
			} else if (module_name == "sha1" || msg.content == prefix[msg.guild.id]+"sha1") {
				embed_help_reply(msg, {name: "-sha1", value: "Generates an SHA1 hash, for example `-sha1 Hello` produces `2cb42271c614a1f32dee3a8cc7d7e4d62dc04be7`.\n\u200B"});
			} else if (module_name == "sha224" || msg.content == prefix[msg.guild.id]+"sha224") {
				embed_help_reply(msg, {name: "-sha224", value: "Generates an SHA224 hash, for example `-sha224 Hello` produces `3315a79f00f1179473f3b86aed44f7db56009d14b971d6361e705de2`.\n\u200B"});
			} else if (module_name == "sha256" || msg.content == prefix[msg.guild.id]+"sha256") {
				embed_help_reply(msg, {name: "-sha256", value: "Generates an SHA256 hash, for example `-sha256 Hello` produces `62fa62853835a432efe7c8e82723b5e66be7319780033746dcdce168f0ec8554`.\n\u200B"});
			} else if (module_name == "sha384" || msg.content == prefix[msg.guild.id]+"sha384") {
				embed_help_reply(msg, {name: "-sha384", value: "Generates an SHA384 hash, for example `-sha384 Hello` produces `6be6ea8b48cebdbf0cd1629b2203b5ba58f754948f2dadb6f006f4b49f89e8eefe1b6dfcd4cb2bbb458783d9e1f13a48`.\n\u200B"});
			} else if (module_name == "sha512" || msg.content == prefix[msg.guild.id]+"sha512") {
				embed_help_reply(msg, {name: "-sha512", value: "Generates an SHA512 hash, for example `-sha512 Hello` produces `f6317fb1129b48c616400af50db8b5b458e68eb08555a6289bbb858e91166ce8d51850ee9b4c77da8579f977fd22c2d627bbe471af628309bc1c023a9c4e3718`.\n\u200B"});
				
			// rules
			} else if (module_name == "rules") {
				embed_rules_help = new Discord.MessageEmbed();
				embed_rules_help.setColor(embed_colour_info);
				embed_rules_help.setTitle("Help Rules");
				embed_rules_help.addFields(
					{name: "-rules", value: "shows a list of the rules for the Jared Network discord server.\n\u200B"},
					{name: "-rule [1-8]", value: "display a specific rule, for example `-rule 8` will display the 8th rule on the server.\n\u200B"},
					{name: "-tos", value: "Shows the Discord Community Guidelines.\n\u200B"}
				)
				embed_rules_help.setTimestamp();
				msg_channel_send(msg, embed_rules_help);
			
			// automod
			} else if (module_name == "automod rules") {
				embed_help_reply(msg, {name: "-automod rules", value: "Shows a list of the active rules applied to your server.\n\u200B"});
			} else if (module_name == "warnlist" || module_name == "automod warnlist") {
				embed_help_reply(msg, {name: "-automod warnlist", value: "Shows a list of users with the most warnnings on the server.\n\u200B"});
			} else if (module_name == "automod remove" || module_name == "remove") {
				embed_help_reply(msg, {name: "-automod remove", value: "lets you remove an automod rule, The syntax for the command is `-automod remove {rule number}`, for example `-automod remove 1` will remove the first active rule, i strongly suggest running `-automod rules` first to get a list of all of the rules currently on your sever, then use the automod remove command after.\n\u200B"});
			
			// autopost
			} else if (module_name == "automeme") {
				embed_help_reply(msg, {name: "AutoMeme", value: "Automatically posts a meme after a specified period of time, for example `-automeme on 5` will post a meme every 5 mins, to turn automeme off type `-automeme off`.\n\u200B"});
			} else if (module_name == "autonude") {
				embed_help_reply(msg, {name: "AutoNude", value: "Automatically posts a nude after a specified period of time, for example `-autonude on 5` will post a nude photo every 5 mins, to turn autonude off type `-autonude off`.\n\u200B"});
			} else if (module_name == "autohentai") {
				embed_help_reply(msg, {name: "AutoHentai", value: "Automatically posts Hentai after a specified period of time, for example `-autohentai on 5` will post a Hentai photo every 5 mins, to turn autohentai off type `-autohentai off`.\n\u200B"});
			} else if (module_name == "autoporngif") {
				embed_help_reply(msg, {name: "AutoPornGif", value: "Automatically posts a porn gif after a specified period of time, for example `-autoporngif on 5` will post a Porn gif every 5 mins, to turn autoporngif off type `-autoporngif off`.\n\u200B"});
			} else if (module_name == "autophoto") {
				embed_help_reply(msg, {name: "AutoPhoto", value: "Automatically posts a photography image after a specified period of time, for example `-autophoto on 5` will post photo every 5 mins, to turn autophoto off type `-autophoto off`.\n\u200B"});
			} else if (module_name == "autobird") {
				embed_help_reply(msg, {name: "AutoBird", value: "Automatically posts a bird photo after a specified period of time, for example `-autobird on 5` will post a bird every 5 mins, to turn autobird off type `-autobird off`.\n\u200B"});
			} else if (module_name == "autocar") {
				embed_help_reply(msg, {name: "AutoCar", value: "Automatically posts a car photo after a specified period of time, for example `-autocar on 5` will post a car every 5 mins, to turn autocar off type `-autocar off`.\n\u200B"});
			} else if (module_name == "autocat") {
				embed_help_reply(msg, {name: "AutoCat", value: "Automatically posts a cat photo after a specified period of time, for example `-autocat on 5` will post a cat every 5 mins, to turn autocat off type `-autocat off`.\n\u200B"});
			} else if (module_name == "autodog") {
				embed_help_reply(msg, {name: "AutoDog", value: "Automatically posts a dog photo after a specified period of time, for example `-autodog on 5` will post a dog every 5 mins, to turn autodog off type `-autodog off`.\n\u200B"});
			} else if (module_name == "autosnake") {
				embed_help_reply(msg, {name: "AutoSnake", value: "Automatically posts a snake photo after a specified period of time, for example `-autosnake on 5` will post a snake every 5 mins, to turn autosnake off type `-autosnake off`.\n\u200B"});
			} else if (module_name == "autopost") {
				autopost_help(msg);
		
			// Music
			} else if (module_name == "play" || msg.content == prefix[msg.guild.id]+"play") {
				embed_help_reply(msg, {name: "-play {song name/URL}", value:"Adds a song to the queue, you can add a song via the name or YouTube URL for example `-play sicko mode` or `-play https://youtu.be/6ONRf7h3Mdk` Will add the song Sicko mode to the queue.\n\u200B"});
			} else if (module_name == "forceplay" || msg.content == prefix[msg.guild.id]+"forceplay") {
				embed_help_reply(msg, {name: "-forceplay {song name/URL}", value:"Forces a song to be played, stopping anything currently playing and ingoring the queue. The syntax for forceplay is the same as play, just specify a song via name or URL, e.g. `-forceplay the rich kid plug walk`.\n\u200B"});
			} else if (module_name == "skipplay" ||module_name == "playskip" ) {
				embed_help_reply(msg, {name: "-playskip {song name/URL}", value:"Forces a song to be played, stopping anything currently playing and ingoring the queue. The syntax for forceplay is the same as play, just specify a song via name or URL, e.g. `-playskip the rich kid plug walk`.\n\u200B"});
			} else if (module_name == "skip") {
				embed_help_reply(msg, {name: "-skip", value:"Skips to the next song in the queue.\n\u200B"});
			} else if ( module_name == "skipto") {
				embed_help_reply(msg, {name: "-skipto {index}", value:"Skips to a song at the specified index e.g. `-skipto 2` skips to the second song in the queue.\n\u200B"});
			} else if (module_name == "disconnect") {
				embed_help_reply(msg, {name: "-disconnect", value:"Disconnects JaredBot from the voice channel, the queue will also be cleared when the bot disconnects.\n\u200B"});
			} else if (module_name == "np") {
				embed_help_reply(msg, {name: "-np", value:"Now Playing, shows information about the current song that is playing.\n\u200B"});
			} else if (module_name == "ping") {
				embed_help_reply(msg, {name: "-ping", value:"`-ping` tests the bots response time to discord servers.\n\u200B"});
			} else if (module_name == "testaudio" || module_name == "audiotest") {
				embed_help_reply(msg, {name: "-testaudio", value:"The `testaudio` command will play a sound test, to check that the music features are functioning correctly.\n\u200B"});
			} else if (module_name == "queue") {
				embed_help_reply(msg, {name: "-queue", value:"Shows the queue, the queue is a list of all of the songs that have been requested, and what order they will be played in.\n\u200B"});
			} else if (module_name == "playtop" || module_name == "reverse") {
				embed_help_reply(msg, {name: "-playtop -reverse", value:"Reverses the queue, the last songs in the queue are played next, after the current song is finished.\n\u200B"});
			} else if (module_name == "remove" || msg.content == prefix[msg.guild.id]+"remove") {
				embed_help_reply(msg, {name: "-remove {index}", value:"Removes a song from the queue, for example `-remove 4` will remove the 4th song in the queue.\n\u200B"});
			} else if (module_name == "move" || msg.content == prefix[msg.guild.id]+"move") {
				embed_help_reply(msg, {name: "-move {index 1} {index 2}", value:"Moves a song in the queue to a diffrent position, for example `-move 1 5` would move the 1st song to the 5th position in the queue.\n\u200B"});
			} else if (module_name == "loop") {
				embed_help_reply(msg, {name: "-loop", value: "`-loop` loops the current song, repeating it endlessly until you toggle the loop off again with `-loop`.\n\u200B"});
			} else if (module_name == "loopq") {
				embed_help_reply(msg, {name: "-loopq", value: "The `-loopq` command will loop the entire queue, once the end of the queue is reached JaredBot will start playing the same songs in the queue from the beginning again.\n\u200B"});
			} else if (module_name == "clearq") {
				embed_help_reply(msg, {name: "-clearq", value: "Clears the song queue, removing all songs currently queued.\n\u200B"});
			} else if (module_name == "removedupes") {
				embed_help_reply(msg, {name: "-removedupes", value: "Removes all duplicate songs from the queue, usefull if someone has added the same song multiple times to the queue.\n\u200B"});
			} else if (module_name == "shuffle") {
				embed_help_reply(msg, {name: "-shuffle", value: "Randomly changes the order of songs in the queue, the queue is shuffled.\n\u200B"});
			} else if (module_name == "replay") {
				embed_help_reply(msg, {name: "-replay", value: "Replays the current song from the beginning.\n\u200B"});
			} else if (module_name == "pause") {
				embed_help_reply(msg, {name: "-pause", value: "`pause` pauses the song.\n\u200B"});
			} else if (module_name == "resume") {
				embed_help_reply(msg, {name: "-resume", value: "`resume` then resumes the song.\n\u200B"});
			} else if (module_name == "seek" || msg.content == prefix[msg.guild.id]+"seek") {
				embed_help_reply(msg, {name: "-seek {MM:SS}", value: "forwards to the specified time stamp, e.g. `-seek 1:05` will go to 1 min 5 seconds in the track.\n\u200B"});
			} else if (module_name == "songinfo") {
				embed_help_reply(msg, {name: "-songinfo", value: "Similar to np, but shows more detailed information about the current song playing.\n\u200B"});
			} else if (module_name == "streaminfo") {
				embed_help_reply(msg, {name: "-songinfo", value: "Similar to np, but shows more detailed information about the current song playing.\n\u200B"});
			} else if (module_name == "settings") {
				embed_help_reply(msg, {name: "-songinfo", value: "Similar to np, but shows more detailed information about the current song playing.\n\u200B"});
			} else if (module_name == "forward" || msg.content == prefix[msg.guild.id]+"forward") {
				embed_help_reply(msg, {name: "-forward {MM:SS}", value: "Fast forward the song the specified number of seconds.\n\u200B"});
			} else if (module_name == "rewind" || msg.content == prefix[msg.guild.id]+"rewind") {
				embed_help_reply(msg, {name: "-rewind {MM:SS}", value: "Rewind the song the specified number of seconds.\n\u200B"});
			} else if (module_name == "volume" || msg.content == prefix[msg.guild.id]+"volume") {
				embed_help_reply(msg, {name: "-volume %", value: "Lets you change the volume of the music, e.g. `-volume 50` sets the sound to 50%.\n\u200B"});
			} else if (module_name == "freeplay" || msg.content == prefix[msg.guild.id]+"freeplay") {
				embed_help_reply(msg, {name: "-freeplay [on/off]", value: "Freeplay is a feature where JaredBot will automatically play a random song after the end of the queue is reached."});
		
			// fancy
			} else if (module_name == "fancy") {
				help_fancy(msg);
			} else if (module_name == "flip" || msg.content == prefix[msg.guild.id]+"flip") {
				embed_help_reply(msg, {name: "-flip", value: "˙uʍop ǝpᴉsdn ʇxǝʇ ǝɥʇ sdᴉlɟ\n\u200B"});
			} else if (module_name == "tiny" || msg.content == prefix[msg.guild.id]+"tiny") {
				embed_help_reply(msg, {name: "-tiny", value: "ᵐᵃᵏᵉˢ ᵗʰᵉ ᵗᵉˣᵗ ʳᵉᵃˡˡʸ ˢᵐᵃˡˡ.\n\u200B"});
			} else if (module_name == "clap" || msg.content == prefix[msg.guild.id]+"clap") {
				embed_help_reply(msg, {name: "-clap", value: "puts👏between👏the👏words👏in👏the👏text.\n\u200B"});
			} else if (module_name == "width" || msg.content == prefix[msg.guild.id]+"width") {
				embed_help_reply(msg, {name: "-width", value: "makes the text really w   i   d   e\n\u200B"});
			} else if (module_name == "wiggle" || msg.content == prefix[msg.guild.id]+"wiggle" || module_name == "worm" || 
				msg.content == prefix[msg.guild.id]+"worm" || module_name == "twist" || msg.content == prefix[msg.guild.id]+"twist") {
				embed_help_reply(msg, {name: "-wiggle", value: "does the wiggle.\n\u200B"});
			} else if (module_name == "alter" || msg.content == prefix[msg.guild.id]+"alter") {
				embed_help_reply(msg, {name: "-alter", value: "alternates the caps.\n\u200B"});
		
			// just one
			} else if (module_name == "just one" || module_name == "justone" || msg.content == prefix[msg.guild.id]+"just one" || msg.content == prefix[msg.guild.id]+"justone") {
				help_justone(msg);
		
			// levels
			} else if (module_name == "addscore") {
				embed_help_reply(msg, {name: "Add Score", value: "`-addscore {User ID},{msg count}` admin command, lets you manually change or add a score on the leaderboard, for example `-addscore 364787379518701569,100` would set my message count to 100.\n\u200B"});
			} else if (module_name == "rank") {
				embed_help_reply(msg, {name: "Rank", value: "`-rank @user` shows your or another users rank, for example `-rank @jared` will shows Jareds rank.\n\u200B"});
			} else if (module_name == "restorebackup") {
				embed_help_reply(msg, {name: "Restore Backup", value: "`-restorebackup` Restores a backup copy of the leaderboard, from the last message that was sent on the server, up to 30 seconds ago.\n\u200B"});
		
			// invite
			} else if (module_name == "invite" || module_name == "invitelink" || module_name == "addbot" || 
				module_name == prefix[msg.guild.id]+"invitebot" || module_name == prefix[msg.guild.id]+"addbot" || module_name == prefix[msg.guild.id]+"botinvite") {
				help_module_embed.setTitle("Help Invite commands");
				help_module_embed.addFields (
					{name: "Invite", value: "`-invite` generates an invite link for your server.\n\u200B"},
					{name: "InviteLink", value: "`-invitelink` sends an invitelink to the Jared Network server.\n\u200B"},
					{name: "InviteBot", value: "`-invitebot` sends an invite link so you can add JaredBot to another server.\n\u200B"}
				)
				msg_channel_send(msg, help_module_embed);
		
			// network
			} else if (msg.guild != null && msg.content == msg.content == prefix[msg.guild.id]+"nslookup" || msg.content == prefix[msg.guild.id]+"tracert" || 
				msg.content == prefix[msg.guild.id]+"pathping" || msg.content == prefix[msg.guild.id]+"whois" || msg.content == prefix[msg.guild.id]+"echo" || msg.content == prefix[msg.guild.id]+"port" ||
				msg.content == prefix[msg.guild.id]+"network" || msg.content == prefix[msg.guild.id]+"help network" || msg.content == prefix[msg.guild.id]+"networking" || 
				msg.content == prefix[msg.guild.id]+"help networking" || msg.content == prefix[msg.guild.id]+"net" || msg.content == prefix[msg.guild.id]+"help net") {
				help_network_cmd(msg);
			} else if (module_name == "port") {
				embed_help_reply(msg, {name: "Port Scan", value: "`-port {port} {host}` checks if a specific port is open on the host, " +
				"for example `-port 80 jaredbot.uk` will check if port 80 is open on JaredBot servers. You can also enter port ranges e.g. " +
				"`-port 20-100 jaredbot.uk` will check all the ports between 20 and 100, be aware that entering a large port range could take " +
				"a long time to complete."});
		
			// welcome
			} else if (module_name == "welcome" || module_name == "welcomer" || msg.content == prefix[msg.guild.id]+"welcomer") {
				help_welcome(msg)
			
			// mov2mp4
			} else if (module_name == "mp4" || module_name == "mov" || module_name == "webm") {
				help_mp4(msg);
			
			// render
			} else if (module_name == "render") {
				help_render(msg);
				
			// download
			} else if (module_name == "download" || msg.content == prefix[msg.guild.id]+"download") {
				embed_help_reply(msg, {name: "-download", value: "Downloads a youtube video, the syntax for the command is `-download {URL}` for example `-download https://youtu.be/tvTRZJ-4EyI` will download the song Humble."});
		
			// not a valid module error
			} else {
				if (module_name != "") {
					embed_error(msg, "Not a valid module! Please type `-help` for a list of modules!");
				}
			}
		}
	} catch (err) {
		console_log("Failed to display help menu! " + err, error=true);
	}
})

// text commands
function text_sort(msg, txt, fancyASCII, append2end=false) {
	try {
		output = "";
		for (i=0;i<txt.length;i++) {
			if (ASCII.indexOf(txt[i]) != -1) {
				if (append2end == true) {
					output = fancyASCII[ASCII.indexOf(txt[i])] + output;
				} else {
					output = output + fancyASCII[ASCII.indexOf(txt[i])];
				}
			}
		}
		msg_channel_send(msg, output);
	} catch (err) {
		console_log("Error thrown in text_sort function! " + err, error=true);
	}
}

function do_the_wiggle(txt, reverse=false, size=10) {
	try {
		count = 0
		output = [];
		word = txt.slice(0, 30);
		for (i=0;i<size;i++) {
			output.push((" ".repeat(count)) + word + (" ".repeat(i-count)));
			count += 1;
		}
	
		if (reverse == true) {
			return output.reverse(-1).join("\n");
		} else {
			return output.join("\n");
		}
	} catch (err) {
		console_log("Error thrown in do_the_wiggle function! " + err, error=true);
	}
}

function help_fancy(msg) {
	try {
		embed_fancy = new Discord.MessageEmbed();
		embed_fancy.setColor(embed_color_chat);
		embed_fancy.setTitle("Help Fancy Text");
		embed_fancy.addFields(
			{name: "-fancy", value: "𝔠𝔬𝔫𝔴𝔢𝔯𝔱𝔰 𝔅𝔗𝔇𝔍𝔍 𝔠𝔥𝔞𝔯𝔞𝔠𝔱𝔢𝔯𝔰 𝔦𝔫𝔱𝔬 𝔣𝔞𝔫𝔠𝔷 𝔲𝔫𝔦𝔠𝔬𝔡𝔢 𝔣𝔬𝔫𝔱.\n\u200B"},
			{name: "-flip", value: "˙uʍop ǝpᴉsdn ʇxǝʇ ǝɥʇ sdᴉlɟ\n\u200B"},
			{name: "-tiny", value: "ᵐᵃᵏᵉˢ ᵗʰᵉ ᵗᵉˣᵗ ʳᵉᵃˡˡʸ ˢᵐᵃˡˡ.\n\u200B"},
			{name: "-clap", value: "puts👏between👏the👏words👏in👏the👏text.\n\u200B"},
			{name: "-width", value: "makes the text really w   i   d   e\n\u200B"},
			{name: "-wiggle", value: "does the wiggle.\n\u200B"},
			{name: "-alter", value: "AlTeRnAtEs tHe cApS In tHe tExT.\n\u200B"}
		)
		embed_fancy.setTimestamp();
		msg_channel_send(msg, embed_fancy);
	} catch (err) {
		console_log("Error thrown in help_fancy function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"fancy") {
			help_fancy(msg);
			
		} else if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"fancy ") {
			fancyASCII = ["𝔞","𝔟","𝔠","𝔡","𝔢","𝔣","𝔤","𝔥","𝔦","𝔧","𝔨","𝔩","𝔪","𝔫","𝔬","𝔭","𝔮","𝔯","𝔰","𝔱","𝔲","𝔴","𝔵",
			"𝔶","𝔷","𝔄","𝔅","ℭ","𝔇","𝔈","𝔉","𝔊","ℌ","ℑ","𝔍","𝔎","𝔏","𝔐","𝔑","𝔒","𝔓","𝔔","ℜ","𝔖","𝔗","𝔘","𝔙","𝔚","𝔛",
			"𝔜","ℨ","0","1","2","3","4","5","6","7","8","9","!","@","#","$","%","^","&","*","(",")","_","+","1","2","3",
			"4","5","6","7","8","9","0","-","=","[","]","{","}","|",",",".","<",">","/","?","`","~",""," "];
			text_sort(msg, msg.content.slice(7, msg.content.length), fancyASCII);
			
		} else if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"flip ") {
			fancyASCII = ["ɐ","q","ɔ","p","ǝ","ɟ","ƃ","ɥ","ᴉ","ɾ","ʞ","l","ɯ","u","o","d","b","ɹ","s","ʇ","n","ʌ","ʍ","x","ʎ","z","∀",
			"q","Ɔ","p","Ǝ","פ","H","I","ſ","ʞ","˥","W","N","O","Ԁ","Q","ɹ","S","┴","∩","Λ","M","X","⅄","Z","0","Ɩ","ᄅ","Ɛ","ㄣ",
			"ϛ","9","ㄥ","8","6","¡","@","#","$","%","^","⅋","*",")","(","‾","+","Ɩ","ᄅ","Ɛ","ㄣ","ϛ","9","ㄥ","8","6","0","-",
			"=","]","[","}","{","","","'","˙",">","<","/","¿",",","~"," "];
			text_sort(msg, msg.content.slice(6, msg.content.length), fancyASCII, append2end=true);
		
		} else if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"tiny ") {
			fancyASCII = ['ᵃ', 'ᵇ', 'ᶜ', 'ᵈ', 'ᵉ', 'ᶠ', 'ᵍ', 'ʰ', 'ᶦ', 'ʲ', 'ᵏ', 'ˡ', 'ᵐ', 'ⁿ', 'ᵒ', 'ᵖ', 'ᵠ', 'ʳ', 'ˢ', 'ᵗ', 'ᵘ', 'ᵛ', 
			'ʷ', 'ˣ', 'ʸ', 'ᶻ', 'ᴬ', 'ᴮ', 'ᶜ', 'ᴰ', 'ᴱ', 'ᶠ', 'ᴳ', 'ᴴ', 'ᴵ', 'ᴶ', 'ᴷ', 'ᴸ', 'ᴹ', 'ᴺ', 'ᴼ', 'ᴾ', 'ᵠ', 'ᴿ', 'ˢ', 'ᵀ', 'ᵁ',
			'ⱽ', 'ᵂ', 'ˣ', 'ʸ', 'ᶻ', '⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', 'ᵎ', '@', '#', '$', '%', '^', '&', '*', '⁽', '⁾', 
			'_', '⁺', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁰', '⁻', '⁼', '[', ']', '{', '}', '\\', '|', ',', '.', '<', '>', '/', 
			'ˀ', '`', ' '];
			text_sort(msg, msg.content.slice(6, msg.content.length), fancyASCII)
			
		} else if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"clap ") {
			msg_channel_send(msg, (" "+msg.content.slice(6, msg.content.length)).split(" ").join("👏"));
			
		} else if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"width ") {
			msg_channel_send(msg, msg.content.slice(7, msg.content.length).split("").join("   "));
			
		} else if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"wide ") {
			msg_channel_send(msg, msg.content.slice(6, msg.content.length).split("").join("   "));
			
		} else if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"wiggle " || msg.content.slice(0, 6) == prefix[msg.guild.id]+"worm " ||
			msg.content.slice(0, 7) == prefix[msg.guild.id]+"twist ") {
			word = msg.content.slice(msg.content.split(" ")[0].length, msg.content.length);
			output = do_the_wiggle(word) +"\n"+ do_the_wiggle(word, reverse=true) +"\n"+
					 do_the_wiggle(word) +"\n"+ do_the_wiggle(word, reverse=true) +"\n"+
					 do_the_wiggle(word) +"\n"+ do_the_wiggle(word, reverse=true);
			msg_channel_send(msg, output);
			
		} else if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"alter ") {
			word = msg.content.slice(7, msg.content.length);
			letters = []
			for (i=0;i<word.length;i++) {
				if (i % 2 == 0) {
					letters.push(word[i].toUpperCase());
				} else {
					letters.push(word[i]);
				}
			}
			msg_channel_send(msg, letters.join(""));
			
		}
	}
})

// Discord Community Guidlines
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"tos") {
			ToSURL = "http://jaredbot.uk";
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
					"[1]("+ToSURL+"). Do not organize, participate, or encourage **harassment** of others.\n"+
					"[2]("+ToSURL+"). Do not organize, promote, or coordinate servers around **hate speech**.\n"+
					"[3]("+ToSURL+"). Do not make threats of violence or **threaten to harm** others.\n"+
					"[4]("+ToSURL+"). Do not **evade user blocks** or server bans.\n"+
					"[5]("+ToSURL+"). Do not send others **viruses or malware**.\n\u200B"
				},
				{name : "Rules for content", value:
					"[6]("+ToSURL+"). You must apply the NSFW label to channels if there is **adult content** in that channel.\n"+
					"[7]("+ToSURL+"). Don't **sexualize minors** in any way.\n"+
					"[8]("+ToSURL+"). Don't share sexually **explicit content** of other people without their **consent**.\n"+
					"[9]("+ToSURL+"). Don't share content that **glorifies** or promotes suicide or **self-harm**.\n"+
					"[10]("+ToSURL+"). Don't share images of sadistic gore or **animal cruelty**.\n"+
					"[11]("+ToSURL+"). Don't use Discord for the organization, promotion, or support of **violent extremism**.\n"+
					"[12]("+ToSURL+"). Don't operate a server that **sells** prohibited or potentially **dangerous goods**.\n"+
					"[13]("+ToSURL+"). Don't promote, distribute, or provide access to content involving the **hacking**, cracking, or distribution "+
					"of **pirated software** or stolen accounts.\n"+
					"[14]("+ToSURL+"). In general, you should not promote, encourage or engage in any **illegal behavior**.\n\u200B"
				},
				{name : "Respect Discord itself", value:
					"[15]("+ToSURL+"). Don't **sell your account** or your server.\n"+
					"[16]("+ToSURL+"). Don't use **self-bots** or user-bots to access Discord.\n"+
					"[17]("+ToSURL+"). Don't share content that violates anyone's **intellectual property** or other rights.\n"+
					"[18]("+ToSURL+"). Don't **spam Discord**, especially our Customer Support and Trust & Safety teams.\n\u200B"
				},
			)
			embed_tos.setTimestamp();
			embed_tos.setFooter("If you see any activity that violates these guidelines, you can report it");
			msg_channel_send(msg, embed_tos);
		}
	}
})

// rules
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"rules") {
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
				embed_rules.setImage(webserver_root_address+"img/src/white_checkmark.gif");
			}
			msg_channel_send(msg, embed_rules);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,6) == prefix[msg.guild.id]+"rule ") {
			rule_no = msg.content.slice(6, msg.content.length);
			embed_rule = new Discord.MessageEmbed();
			embed_rule.setColor(embed_colour_info);
			switch (rule_no) {
				case "1":
					embed_rule.addField("Rule 1", "Only post porn in the NSFW channels (please only softcore)");
					msg_channel_send(msg, embed_rule);
					break;
				case "2":
					embed_rule.addField("Rule 2", "No phishing website links");
					msg_channel_send(msg, embed_rule);
					break;
				case "3":
					embed_rule.addField("Rule 3", "No spamming the same repetitive message, over a short period of time (This rule applies to all channels excluding the `botspam` and `jared-bot` channels, feel free to spam as many bot commands as you want in botspam).");
					msg_channel_send(msg, embed_rule);
					break;
				case "4":
					embed_rule.addField("Rule 4", "Don’t be a dick or bully others, be kind");
					msg_channel_send(msg, embed_rule);
					break;
				case "5":
					embed_rule.addField("Rule 5", "Only post promotions in the advertisement channel");
					msg_channel_send(msg, embed_rule);
					break;
				case "6":
					embed_rule.addField("Rule 6", "No raids (includes spamming lots of messages, pinging lots of people with @ tags)");
					msg_channel_send(msg, embed_rule);
					break;
				case "7":
					embed_rule.addField("Rule 7", "No asking to be moderator");
					msg_channel_send(msg, embed_rule);
					break;
				case "8":
					embed_rule.addField("Rule 8", "No sending offensive, or alarming messages with the intent to get a reaction out of others");
					msg_channel_send(msg, embed_rule);
					break;
				default:
					embed_rule.setColor(embed_colour_error);
					embed_rule.addField("Error", "Invalid Rule! the Syntax for command is `-rule [1-8]`!");
					msg_channel_send(msg, embed_rule);
					break;
			}
		}
	}
})

// letter emojis
function letter_emoji(msg, emojiname, emoji_letter, emojiID) {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.content == emojiname || msg.content.toLowerCase().slice(0, 1) == emoji_letter) {
				if (msg.content.toLowerCase().split(emoji_letter).length == msg.content.length+1) {
					msg_channel_send(msg, emojiID.repeat(msg.content.length).slice(0, 2000));
				} else if (msg.content.toLowerCase() == emoji_letter) {
					msg_channel_send(msg, emojiID);
				} else if (msg.content.toLowerCase() == emojiname) {
					msg_channel_send(msg, emojiID);
				}
			}
		}
	} catch (err) {
		console_log("Error thrown in letter_emoji function! " + err, error=true);
	}
}

function help_letteremoji(msg) {
	try {
		embed_letter = new Discord.MessageEmbed();
		embed_letter.setColor(embed_color_chat);
		embed_letter.setTitle("Letter Emoji Help");
		embed_letter.setDescription("Letter Emoji is a feature where JaredBot will automtically reply with an emoji when you type a single letter, " +
		"for example if you type the letter `p` JaredBot will send the popcat <a:popcat:786084522210099201> emoji!\n\u200B");
		embed_letter.addFields(
			{name: "Letter Emoji On", value: "`-letteremoji on` turns on letter emoji, JaredBot will reply to single letter messages.\n\u200B"},
			{name: "Letter Emjoi Off", value: "`-letteremoji off` turns off letter emoji, JaredBot will no logner respond to single letter messages.\n\u200B"},
		)
		embed_letter.setTimestamp();
		msg_channel_send(msg, embed_letter);
	} catch (err) {
		console_log("Error thrown in help_letteremoji function! " + err, error=true);
	}
}

var letter_emojis = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (letter_emojis[msg.guild.id] == "true") {
			// allow for custom emojis
			
			// default emojis
			letter_emoji(msg, "sissyvac", "s", "<a:sissyvacuum:779507117185826867>");
			letter_emoji(msg, "popcat", "p", "<a:popcat:786084522210099201>");
			letter_emoji(msg, "frog", "r", "<a:daa_frogedance:779738708844609597>");
			letter_emoji(msg, "polishcow", "h", "<a:polishcow:777247300481056768>");
			letter_emoji(msg, "disco", "b", "<a:disco_cat:777208095914590240>");
			letter_emoji(msg, "fortnite", "o", "<a:Orange_justice:791403867216150548>");
			letter_emoji(msg, "fish", "g", "<a:pogfish:791404557338935296>");
			letter_emoji(msg, "corn", "t", "<a:TcCattoCorn:791405211520335923>");
			letter_emoji(msg, "kangaroo", "j", "<a:NM_peepoRideKangaroo:779738949832671272>");
			letter_emoji(msg, "cattono", "n", "<a:TcCattoNo:791407268180000768>");
			letter_emoji(msg, "cattoplay", "q", "<a:TcCattoPlay:791407697978589185>");
			letter_emoji(msg, "cat", "e", "<a:catsadden:791408181427044352>");
			letter_emoji(msg, "crab", "c", "<a:Crabrave:791408606338613298>");
			letter_emoji(msg, "cap", "i", "<a:Cap:791409381807357952>");
			letter_emoji(msg, "rub", "z", "<a:Pepe_rub:791409723693989890>");
			letter_emoji(msg, "lick", "l", "<a:c_licklicklick:791410104171626526>");
			letter_emoji(msg, "duck", "d", "<a:ducky:791410642249711676>");
			letter_emoji(msg, "horny", "a", "<a:no_horny:780625969462509609>");
			letter_emoji(msg, "hacker", "k", "<a:hack:768252926249664523>");
			letter_emoji(msg, "stonks", "w", "<a:stonks:767916835362177054>");
			letter_emoji(msg, "verynice", "v", "<a:verynice:772532981793423391>");
			letter_emoji(msg, "dog", "u", "<a:im_dog:777203754972741682>");
			letter_emoji(msg, "simp", "y", "<a:im_dog:777203754972741682>");
			letter_emoji(msg, "hacker", "x", "<a:hacker_man:768253254886359052>");
			
			// abcdefghijklmnopqrstuvwxyz
		}
	}
})

bot.on("ready", msg => {
	// update global var with letter emoji rules
	read_file(letteremoji_filename, letter_emojis, allow_non_int=true, sep="\n", remove_dupes=false);
})

// temporterly turn feature off, while the bot is being verified!
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"letteremoji on") {
			//if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				// write guild ID to file
				create_file_then_append_data(msg, letteremoji_filename, "true", endl="", overwrite=true);
				embed_chat_reply(msg, "turned letter emojis on, type `-letteremoji off` to turn off!");
				letter_emojis[msg.guild.id] = "true";
				
			} else {
				//embed_error(msg, "You dont have permission to turn on letter emojis, " + mod_error_text + " manage messages permission!");
				embed_error(msg, "This feature is still in development and can only be used by Jared! I hope to get it complete soon");
			}
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"letteremoji off") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				// turn letter emoji off
				create_file_then_append_data(msg, letteremoji_filename, "", endl="", overwrite=true);
				embed_chat_reply(msg, "turned letter emojis off, type `-letteremoji on` to turn back on!");
				letter_emojis[msg.guild.id] = "false";
				
			} else {
				embed_error(msg, "You dont have permission to turn on letter emojis, " + mod_error_text + " manage messages permission!");
			}
		}
	}
})

// report bug / make suggestion
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 11) == prefix[msg.guild.id]+"reportbug " || msg.content.slice(0, 5) == prefix[msg.guild.id]+"bug "
		|| msg.content.slice(0, 9) == prefix[msg.guild.id]+"suggest " || msg.content.slice(0, 12) == prefix[msg.guild.id]+"suggestion ") {
			type_dict = {"reportbug":"Bug", "bug":"Bug", "suggest":"Suggestion", "suggestion":"Suggestion"};
			type = type_dict[msg.content.slice(1, msg.content.split(" ")[0].length)];
			description = msg.content.split(/ (.+)/)[1];
			
			// user
			nametag = msg.member.user.tag.split("#")[0];
			//profile_pic = msg.author.avatarURL();
			profile_pic = msg.author.displayAvatarURL({dynamic: true});
			
			if (description != "") {
				// embed
				embed_suggestion = new Discord.MessageEmbed();
				embed_suggestion.setColor(embed_color_chat);
				embed_suggestion.setTitle(type);
				embed_suggestion.setAuthor(nametag + " | " + msg.guild.name, profile_pic, "");
				embed_suggestion.setDescription(description);
				embed_suggestion.setTimestamp();
				bot.channels.cache.get(suggestions_channel_ID).send(embed_suggestion);
				embed_info_reply(msg, "Your " + type + " has been posted in the Jared Network Suggestions channel, thank you for your feedback!");
				console_log("User " + msg.member.user.tag + " has posted a suggestion from server " + msg.guild.id);
				
			} else {
				embed_error(msg, "Your Description cannot be blank!");
			}
		}
	}
})

// test message
reaction_emojis = [];

function add_reaction_role(msg, emoji, roleID) {
	try {
		msg.react(emoji).then(function(guild) {
			reaction_emojis.push(guild.message.id +","+ guild._emoji.name +","+ roleID);
			console_log([reaction_emojis.length]);
		}).catch(err => {
			console_log("Error thrown in add_reaction_role function! " + err, error=true);
		})
	} catch (err) {
		console_log("Error thrown in add_reaction_role function! " + err, error=true);
	}
}

// self roles
bot.on("message", msg => {
	if (msg.guild != null && msg.content == prefix[msg.guild.id]+"selfroles") {
		async function selfroles() {
			// only Jared can use selfroles command
			if (msg.author.id == "364787379518701569") {
				//relationship status
				embed_selfroles_relationship = new Discord.MessageEmbed();
				embed_selfroles_relationship.setColor(embed_color_chat);
				embed_selfroles_relationship.setTitle("Relationship Status");
				embed_selfroles_relationship.setDescription("Choose Your Relationship Status by reacting to this message");
				embed_selfroles_relationship.addFields(
					{name: "Single", value: "🔴", inline:true},
					{name: "Taken", value: "❌", inline:true},
					{name: "Married", value: "💍", inline:true},
				)
			
				// msg, emoji, role ID
				msg_channel_send(msg, embed_selfroles_relationship).then(function(msg){
					add_reaction_role(msg, "🔴", "780289306329350153");
					add_reaction_role(msg, "❌", "780289432199757884");
					add_reaction_role(msg, "💍", "780289637938888725");
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});

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
			
				msg_channel_send(msg, embed_selfroles_games).then(function(msg){
					add_reaction_role(msg, "⛏️", "780852424730607688"); //Minecraft
					add_reaction_role(msg, "🔫", "780852483173122088"); //CSGO
					add_reaction_role(msg, "🔽", "780852523547754547"); //Tetris
					add_reaction_role(msg, "🗡️", "780852628498284585"); //Skyrim
					add_reaction_role(msg, "💎", "780852676316889119"); //Genshin
					add_reaction_role(msg, "🔪", "780852724514291713"); //Among Us
					add_reaction_role(msg, "🧟", "780852766297423912"); //L4d2
					add_reaction_role(msg, "🗺️", "780852854566420482"); //Hearts of Iron 4
					add_reaction_role(msg, "🚔", "780852906747363369"); //GTAV
					add_reaction_role(msg, "⚔️", "780852954366083093"); //AC
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});

				//Religion
				embed_selfroles_religion = new Discord.MessageEmbed();
				embed_selfroles_religion.setColor(embed_color_chat);
				embed_selfroles_religion.setTitle("Religion");
				embed_selfroles_religion.setDescription("Choose which religion you are by reacting to this message");
				embed_selfroles_religion.addFields(
					{name: "Christian", value: "✝️", inline:true},
					{name: "Muslim", value: "☪️", inline:true},
					{name: "Buddhists", value: "☸️", inline:true},
					{name: "Hinduism", value: "🕉️", inline:true},
					{name: "Jewish", value: "✡️", inline:true},
					{name: "Atheist", value: "⚛️", inline:true},
					{name: "Other", value: "❓", inline:true},
				)
			
				msg_channel_send(msg, embed_selfroles_religion).then(function(msg){
					add_reaction_role(msg, "✝️", "780853500116336680"); //Christian
					add_reaction_role(msg, "☪️", "780853558459367436"); //Muslim
					add_reaction_role(msg, "☸️", "780853668329160714"); //Buddhists
					add_reaction_role(msg, "🕉️", "780853720338006076"); //Hinduism
					add_reaction_role(msg, "✡️", "780853774766833686"); //Jewish
					add_reaction_role(msg, "⚛️", "780853816367120424"); //Atheist
					add_reaction_role(msg, "❓", "780853863577026600"); //other
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});
			
				//Religion (religion Christian/Catholic/Muslim/Buddhists/Hinduism/Jewish/Atheist/other)

				//Gender
				embed_selfroles_gender = new Discord.MessageEmbed();
				embed_selfroles_gender.setColor(embed_color_chat);
				embed_selfroles_gender.setTitle("Gender");
				embed_selfroles_gender.setDescription("Choose which gender you are by reacting to this message");
				embed_selfroles_gender.addFields(
					{name: "Male", value: "♂️", inline:true},
					{name: "Female", value: "♀️", inline:true},
					{name: "Other", value: "❓", inline:true},
				)
			
				msg_channel_send(msg, embed_selfroles_gender).then(function(msg){
					add_reaction_role(msg, "♂️", "780854160555245628");
					add_reaction_role(msg, "♀️", "780854202200358932");
					add_reaction_role(msg, "❓", "780854257594269739");
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});

				//Country
				embed_selfroles_country = new Discord.MessageEmbed();
				embed_selfroles_country.setColor(embed_color_chat);
				embed_selfroles_country.setTitle("Country");
				embed_selfroles_country.setDescription("Choose where in the world you are from by reacting to this message.");
				embed_selfroles_country.addFields(
					{name: "Africa", value: "🌍", inline:true},
					{name: "Asia", value: "🗾", inline:true},
					{name: "North America", value: "🌎", inline:true},
					{name: "South America", value: "🌐", inline:true},
					{name: "Europe", value: "🗺️", inline:true},
					{name: "Oceania", value: "🌏", inline:true},
				)
			
				msg_channel_send(msg, embed_selfroles_country).then(function(msg){
					add_reaction_role(msg, "🌍", "780854833283727370"); //Africa
					add_reaction_role(msg, "🗾", "780854866988892221"); //Asia
					add_reaction_role(msg, "🌎", "780854906176536577"); //North America
					add_reaction_role(msg, "🌐", "780854946144059403"); //South America
					add_reaction_role(msg, "🗺️", "780854980818370601"); //Europe
					add_reaction_role(msg, "🌏", "780855036841689138"); //Oceania
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});

				//Age
				embed_selfroles_age = new Discord.MessageEmbed();
				embed_selfroles_age.setColor(embed_color_chat);
				embed_selfroles_age.setTitle("Age");
				embed_selfroles_age.setDescription("Choose your age by reacting to this message.");
				embed_selfroles_age.addFields(
					{name: "<13", value: "🕑", inline:true},
					{name: "14-15", value: "🕗", inline:true},
					{name: "16-17", value: "🕒", inline:true},
					{name: "18-19", value: "🕘", inline:true},
					{name: "20-25", value: "🕙", inline:true},
					{name: "26-30", value: "🕓", inline:true},
					{name: "30+", value: "🕔", inline:true},
				)
			
				msg_channel_send(msg, embed_selfroles_age).then(function(msg){
					add_reaction_role(msg, "🕑", "780855304866758716"); //<13
					add_reaction_role(msg, "🕗", "780855354217070602"); //14-15
					add_reaction_role(msg, "🕒", "780855413267628032"); //16-17
					add_reaction_role(msg, "🕘", "780855452639559712"); //18-19
					add_reaction_role(msg, "🕙", "780855487452938251"); //20-25
					add_reaction_role(msg, "🕓", "780855524471078923"); //26-30
					add_reaction_role(msg, "🕔", "780855559326007348"); //30+
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});

				//Personality
				embed_selfroles_personality = new Discord.MessageEmbed();
				embed_selfroles_personality.setColor(embed_color_chat);
				embed_selfroles_personality.setTitle("Personality");
				embed_selfroles_personality.setDescription("Choose your personality traits by reacting to this message.");
				embed_selfroles_personality.addFields(
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
					{name: "Quiet/Shy", value: "🤫", inline:true},
					{name: "Sociable", value: "🍷", inline:true},
				)
			
				msg_channel_send(msg, embed_selfroles_personality).then(function(msg){
					add_reaction_role(msg, "🎁", "780864196781932554"); //Kind
					add_reaction_role(msg, "🔪", "780864250335854602"); //Unkind
					add_reaction_role(msg, "👨‍👨‍👦", "780864291157966858"); //Honest
					add_reaction_role(msg, "😱", "780864323378610237"); //Dishonest
					add_reaction_role(msg, "💡", "780864367058354196"); //Intelligent
					add_reaction_role(msg, "💊", "780864402647285831"); //Stupid
					add_reaction_role(msg, "👫", "780864434914328576"); //Trustworthy
					add_reaction_role(msg, "⏰", "780864468473085992"); //Unreliable
					add_reaction_role(msg, "💺", "780864508293414973"); //Patient
					add_reaction_role(msg, "😠", "780864539712815114"); //Impatient
					add_reaction_role(msg, "🤫", "780864577096122368"); //Quiet/Shy
					add_reaction_role(msg, "🍷", "780864616132509746"); //Sociable
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});

				//Political Ideology
				embed_selfroles_ideology = new Discord.MessageEmbed();
				embed_selfroles_ideology.setColor(embed_color_chat);
				embed_selfroles_ideology.setTitle("Political Ideology");
				embed_selfroles_ideology.setDescription("Choose your Political Ideology by reacting to this message.");
				embed_selfroles_ideology.addFields(
					{name: "Anarchist", value: "🔥", inline:true},
					{name: "Communist", value: "🤐", inline:true},
					{name: "Socialist", value: "📱", inline:true},
					{name: "Democrat", value: "🐎", inline:true},
					{name: "Liberal", value: "⚖️", inline:true},
					{name: "Republican", value: "🐘", inline:true},
					{name: "Environmentalist", value: "🌍", inline:true},
					{name: "Humanist", value: "🧍", inline:true},
					{name: "Facist", value: "👺", inline:true},
				)
			
				msg_channel_send(msg, embed_selfroles_ideology).then(function(msg){
					add_reaction_role(msg, "🔥", "780864978533351494");
					add_reaction_role(msg, "🤐", "780865023639289856");
					add_reaction_role(msg, "📱", "780865058975907930");
					add_reaction_role(msg, "🐎", "780865096900673538");
					add_reaction_role(msg, "⚖️", "780865133026213919");
					add_reaction_role(msg, "🐘", "780865168053764098");
					add_reaction_role(msg, "🌍", "780865210143211532");
					add_reaction_role(msg, "🧍", "780865246180016148");
					add_reaction_role(msg, "👺", "780865281466957864");
				}).catch(err => {
					console_log("Error thrown in selfroles msg_channel_send! " + err, error=true);
				});
			}
		}
		
		// write selfrole IDs to file
		async function selfrole_writer() {
			try {
				await selfroles();
				setTimeout(function(){
					data = reaction_emojis.join(";\n");
					console_log("Selfroles data written to file!");
			
					// write IDs to file
					fs_write.writeFile(selfrole_filename, data, function(err) {
						if (err) {
							return console_log("Failed to write self roles IDs to file", error=true);
						}
					})
				},60*1000);
			} catch (err) {
				console_log("Error thrown in selfrole_writer function! " + err, error=true);
			}
		} selfrole_writer();
		
		
	}
})

// you will need to manually add the reaction IDs
// cache messages
var self_roles_dict = {};

bot.on("ready", msg => {
	// cache channel
	guild = bot.channels.cache.get(selfroles_channel_ID);
	
	// read selfroles file
	fs_read.readFile(selfrole_filename, "utf8", function(err, data) {
		if (err) {
			return console_log("Failed to read selfroles file!", error=true);
		}
		
		// format data
		raw = data.split("\n").join("").split(";");
		for (i=0;i<raw.length;i++) {
			current_line = raw[i].split(",");
			if (current_line.length == 3) {
				if (self_roles_dict[current_line[0]] == undefined) {
					self_roles_dict[current_line[0]] = {};
				} else {
					self_roles_dict[current_line[0]][current_line[1]] = current_line[2];
				}
			}
		}
		console_log("Selfroles files read!");
	})
})

bot.on("messageReactionAdd", async(reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console_log("error");
		}
	} else {
		// give user role
		if (self_roles_dict[reaction.message.id] != undefined) {
			if (self_roles_dict[reaction.message.id][reaction._emoji.name] != undefined) {
				current_role = self_roles_dict[reaction.message.id][reaction._emoji.name];
				
				channel_guild = bot.channels.cache.get(selfroles_channel_ID);
				channel_guild.guild.members.fetch(user.id).then(function(members) {
					members.guild.members.fetch(user.id).then(function(member) {
						member.roles.add(current_role);
						console_log("Gave " + member.name + " role " + current_role + "!");
					})
				}).catch(err => {
					console_log("Error thrown in message reaction add, give user role! " + err, error=true);
				})
			}
		}
	}
})

bot.on("messageReactionRemove", async(reaction, user) => {
	//remove role from user
	if (self_roles_dict[reaction.message.id] != undefined) {
		if (self_roles_dict[reaction.message.id][reaction._emoji.name] != undefined) {
			current_role = self_roles_dict[reaction.message.id][reaction._emoji.name];
			
			channel_guild = bot.channels.cache.get(selfroles_channel_ID);
			channel_guild.guild.members.fetch(user.id).then(function(members) {
				members.guild.members.fetch(user.id).then(function(member) {
					member.roles.remove(current_role);
					console_log("Removed "+ current_role + " from " + member.name + "!");
				})
			}).catch(err => {
				console_log("Error thrown in message reaction remove, remove role! " + err, error=true);
			});
		}
	}
	
})

// time
US_states = {
'alabama' : 'montgomery','alaska' : 'juneau','arizona' : 'phoenix','arkansas' : 'little rock','california' : 'sacramento','colorado' : 'denver','connecticut' : 'hartford','delaware' : 'dover','florida' : 'tallahassee','georgia' : 'atlanta','hawaii' : 'honolulu','idaho' : 'boise',
'illinois' : 'springfield','indiana' : 'indianapolis','iowa' : 'des moines','kansas' : 'topeka','kentucky' : 'frankfort','louisiana' : 'baton rouge','maine' : 'augusta','maryland' : 'annapolis','massachusetts' : 'boston','michigan' : 'lansing','minnesota' : 'minneapolis','mississippi' : 'jackson',
'missouri' : 'jefferson city','montana' : 'helena','nebraska' : 'lincoln','nevada' : 'carson city','new hampshire' : 'concord','new jersey' : 'trenton','new mexico' : 'santa fe','new york' : 'new york','north carolina' : 'raleigh','north dakota' : 'bismarck','ohio' : 'columbus','oklahoma' : 'oklahoma city',
'oregon' : 'salem','pennsylvania' : 'harrisburg','rhode island' : 'providence','south carolina' : 'columbia','south dakota' : 'pierre','tennessee' : 'nashville','texas' : 'austin','utah' : 'salt lake city','vermont' : 'montpelier','virginia' : 'richmond','washington' : 'olympia',
'west virginia' : 'charleston','wisconsin' : 'madison','wyoming' : 'cheyenne','afghanistan' : 'kabul', 'albania' : 'tirana', 'algeria' : 'algiers', 'andorra' : 'andorra la vella', 'angola' : 'luanda', 'antigua and barbuda' : 'saint john’s', 'argentina' : 'buenos aires', 'armenia' : 'yerevan', 
'australia' : 'canberra', 'austria' : 'vienna', 'azerbaijan' : 'baku', 'the bahamas' : 'nassau', 'bahrain' : 'manama', 'bangladesh' : 'dhaka', 'barbados' : 'bridgetown', 'belarus' : 'minsk', 'belgium' : 'brussels', 'belize' : 'belmopan', 'benin' : 'porto-novo', 'bhutan' : 'thimphu', 
'bolivia' : 'la paz, sucre', 'bosnia and herzegovina' : 'sarajevo', 'botswana' : 'gaborone', 'brazil' : 'brasilia', 'brunei' : 'bandar seri begawan', 'bulgaria' : 'sofia', 'burkina faso' : 'ouagadougou', 'burundi' : 'bujumbura', 'cambodia' : 'phnom penh', 'cameroon' : 'yaounde', 'canada' : 'ottawa', 
'cape verde' : 'praia', 'central african republic' : 'bangui', 'chad' : 'n’djamena', 'chile' : 'santiago', 'china' : 'beijing', 'colombia' : 'bogota', 'comoros' : 'moroni', 'congo, republic of the' : 'brazzaville', 'congo, democratic republic of the' : 'kinshasa', 'costa rica' : 'san jose', 
'cote d’ivoire' : 'yamoussoukro', 'croatia' : 'zagreb', 'cuba' : 'havana', 'cyprus' : 'nicosia', 'czech republic' : 'prague', 'denmark' : 'copenhagen', 'djibouti' : 'djibouti', 'dominica' : 'roseau', 'dominican republic' : 'santo domingo', 'east timor (timor-leste)' : 'dili', 'ecuador' : 'quito', 
'egypt' : 'cairo', 'el salvador' : 'san salvador', 'equatorial guinea' : 'malabo', 'eritrea' : 'asmara', 'estonia' : 'tallinn', 'ethiopia' : 'addis ababa', 'fiji' : 'suva', 'finland' : 'helsinki', 'france' : 'paris', 'gabon' : 'libreville', 'the gambia' : 'banjul', 'georgia' : 'tbilisi', 'germany' : 'berlin', 
'ghana' : 'accra', 'greece' : 'athens', 'grenada' : 'saint george’s', 'guatemala' : 'guatemala city', 'guinea' : 'conakry', 'guinea-bissau' : 'bissau', 'guyana' : 'georgetown', 'haiti' : 'port-au-prince', 'honduras' : 'tegucigalpa', 'hungary' : 'budapest', 'iceland' : 'reykjavik', 'india' : 'new delhi', 
'indonesia' : 'jakarta', 'iran' : 'tehran', 'iraq' : 'baghdad', 'ireland' : 'dublin', 'israel' : 'jerusalem*', 'italy' : 'rome', 'jamaica' : 'kingston', 'japan' : 'tokyo', 'jordan' : 'amman', 'kazakhstan' : 'astana', 'kenya' : 'nairobi', 'kiribati' : 'tarawa atoll', 'korea, north' : 'pyongyang', 'korea, south' : 'seoul', 
'kosovo' : 'pristina', 'kuwait' : 'kuwait city', 'kyrgyzstan' : 'bishkek', 'laos' : 'vientiane', 'latvia' : 'riga', 'lebanon' : 'beirut', 'lesotho' : 'maseru', 'liberia' : 'monrovia', 'libya' : 'tripoli', 'liechtenstein' : 'vaduz', 'lithuania' : 'vilnius', 'luxembourg' : 'luxembourg', 'macedonia' : 'skopje', 
'madagascar' : 'antananarivo', 'malawi' : 'lilongwe', 'malaysia' : 'kuala lumpur', 'maldives' : 'male', 'mali' : 'bamako', 'malta' : 'valletta', 'marshall islands' : 'majuro', 'mauritania' : 'nouakchott', 'mauritius' : 'port louis', 'mexico' : 'mexico city', 'micronesia, federated states of' : 'palikir', 
'moldova' : 'chisinau', 'monaco' : 'monaco', 'mongolia' : 'ulaanbaatar', 'montenegro' : 'podgorica', 'morocco' : 'rabat', 'mozambique' : 'maputo', 'myanmar (burma)' : 'naypyidaw', 'namibia' : 'windhoek', 'nauru' : 'yaren district', 'nepal' : 'kathmandu', 'netherlands' : 'amsterdam', 'new zealand' : 'wellington', 
'nicaragua' : 'managua', 'niger' : 'niamey', 'nigeria' : 'abuja', 'norway' : 'oslo', 'oman' : 'muscat', 'pakistan' : 'islamabad', 'palau' : 'melekeok', 'panama' : 'panama city', 'papua new guinea' : 'port moresby', 'paraguay' : 'asuncion', 'peru' : 'lima', 'philippines' : 'manila', 'poland' : 'warsaw', 
'portugal' : 'lisbon', 'qatar' : 'doha', 'romania' : 'bucharest', 'russia' : 'moscow', 'rwanda' : 'kigali', 'saint kitts and nevis' : 'basseterre', 'saint lucia' : 'castries', 'saint vincent and the grenadines' : 'kingstown', 'samoa' : 'apia', 'san marino' : 'san marino', 'sao tome and principe' : 'sao tome', 
'saudi arabia' : 'riyadh', 'senegal' : 'dakar', 'serbia' : 'belgrade', 'seychelles' : 'victoria', 'sierra leone' : 'freetown', 'singapore' : 'singapore', 'slovakia' : 'bratislava', 'slovenia' : 'ljubljana', 'solomon islands' : 'honiara', 'somalia' : 'mogadishu', 'south africa' : 'cape town', 
'south sudan' : 'juba', 'spain' : 'madrid', 'sri lanka' : 'colombo, sri jayewardenepura kotte', 'sudan' : 'khartoum', 'suriname' : 'paramaribo', 'swaziland' : 'mbabane', 'sweden' : 'stockholm', 'switzerland' : 'bern', 'syria' : 'damascus', 'taiwan' : 'taipei', 'tajikistan' : 'dushanbe', 'tanzania' : 'dodoma', 
'thailand' : 'bangkok', 'togo' : 'lome', 'tonga' : 'nuku alofa', 'trinidad and tobago' : 'port-of-spain', 'tunisia' : 'tunis', 'turkey' : 'ankara', 'turkmenistan' : 'ashgabat', 'tuvalu' : 'funafuti', 'uganda' : 'kampala', 'ukraine' : 'kyiv', 'united arab emirates' : 'abu dhabi', 'united kingdom' : 'london', 
'united states of america' : 'seattle', 'america' : 'seattle', 'us' : 'seattle', 'uruguay' : 'montevideo', 'uzbekistan' : 'tashkent', 'vanuatu' : 'port-vila', 'venezuela' : 'caracas', 'vietnam' : 'hanoi', 'yemen' : 'sanaa', 'zambia' : 'lusaka', 'zimbabwe' : 'harare', 'uk' : 'london',
};

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"time " || msg.content.slice(0, 10) == prefix[msg.guild.id]+"timezone ") {
			is_US_state = false;
			
			// get city
			if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"timezone ") {
				city = msg.content.slice(10, msg.content.length);
			} else {
				city = msg.content.slice(6, msg.content.length);
			}
			
			if (US_states[city.toLowerCase()] != undefined) {
				city = US_states[city.toLowerCase()];
				is_US_state = true;
			}
			
			timezone = cityTimezones.lookupViaCity(city);
			if (timezone.length > 0) {
				if (timezone.length > 1) {
					for (i=0;i<timezone.length;i++) {
						if (timezone[i]["timezone"].indexOf(timezone[i]["city"].split(" ").join("_")) > -1) {
							timezone_name = [timezone[i]["timezone"]];
							city_name = timezone[i]["city"];
							info_dict = timezone[i];
						}
					}
				} else {
					timezone_name = [timezone[0]["timezone"]];
					city_name = timezone[0]["city"];
					info_dict = timezone[0];
				}
			
				time = new Intl.DateTimeFormat([], {
					timeZone: timezone_name,
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
				}).format(new Date());
			
				dateF = time.split(", ")[0];
				timeF = time.split(",")[1];
			
				// embed
				embed_time = new Discord.MessageEmbed();
				embed_time.setColor(embed_color_chat);
				
				if (is_US_state == true) {
					if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"timezone ") {
						city = msg.content.slice(10, msg.content.length);
					} else {
						city = msg.content.slice(6, msg.content.length);
					}
					embed_time.setTitle("Time in " + city[0].toUpperCase() + city.slice(1, city.length));
				} else {
					embed_time.setTitle("Time in " + city_name);
				}
				
				embed_time.setDescription("The current time in " + city_name + " is " + timeF + " on the " + dateF);
				embed_time.addFields(
					{name: timeF+"\u200B", value: dateF+"\u200B"},
					{name: "City", value: info_dict["city"]+"\n\u200B", inline:true},
					{name: "Country", value: info_dict["country"]+"\n\u200B", inline:true},
					{name: "\u200B", value: "\u200B", inline:true},
					{name: "latitude", value: info_dict["lat"]+"\u200B", inline:true},
					{name: "longitude", value: info_dict["lng"]+"\u200B", inline:true},
					{name: "ISO", value: info_dict["iso3"] + "("+info_dict["iso2"]+")\u200B", inline:true},
					{name: "Province", value: info_dict["province"]+"\u200B", inline:true},
					{name: "State", value: String(info_dict["state_ansi"]+"\u200B").replace("undefined", "-"), inline:true},
					{name: "Timezone", value: info_dict["timezone"]+"\u200B", inline:true},
				)
				
				console_log("Time in " + info_dict["city"] + " fetched!");
				embed_time.setTimestamp();
				embed_time.setFooter(info_dict["iso3"]);
				msg_channel_send(msg, embed_time);
			} else {
				embed_error(msg, "Unable to find the specified city, please make sure you spelt it correctly, " +
				"the format for the command is `-time {city}`, for example `-time London` will show the current time in London UK!");
			}
		}
	}
})

// weather
days_of_week = {"Mon" : "Monday", "Tue" : "Tuesday", "Wed" : "Wednesday", "Thu" : "Thursday", "Fri" : "Friday", "Sat" : "Saturday", "Sun" : "Sunday"};

function remove_tags(elm) {
	txt = [];
	for (i=1;i<elm.split("<").length+1;i++) {
		current = elm.split("<")[i]
		if (current != undefined) {
			txt.push(current.split(">")[1]);
		}
	}
	return txt.join("").replace(/&thinsp;/g,"").replace(/&deg;/g, "°").replace(/  /g," ").replace(/&ndash;/g, "-");
}

function weather_get_elem(html, index) {
	// catch error
	function e(elms) {
		try {
			current_elm = html;
			for (n=0;n<elms.length;n++) {
				current_elm = current_elm.split(elms[n][0])[elms[n][1]];
			}
			current_elm = current_elm.replace("partially cloudy", "⛅").replace("cloudy", "☁️").replace("clear", "☀️").replace("Night", "🌙");
			current_elm = current_elm.replace("Low", "⬇️").replace("None", "↔️").replace("Snow", "❄️").replace("snow showers", "🌨️").replace(/">/g,"");
			current_elm = current_elm.replace("light rain", "🌧️");
			if (current_elm.indexOf("⛅") > -1 || current_elm.indexOf("☀️") > -1 || current_elm.indexOf("a") > -1) {
				return current_elm;
			} else if (days_of_week[current_elm] != undefined) {
				return days_of_week[current_elm];
			} else {
				return ("  " + current_elm).slice(-2);
			}
		} catch {
			return " -";
		}
	}
	
	// return dict;
	return {
		"cloudy" : e([['<th class="b-forecast__table-header', 1], ['<td class="b-forecast__table-weather-cell', index], ['<img alt="', 1], ['" src', 0, true]]),
		"wind" : e([['<th class="b-forecast__table-header', 2], ['<text class="wind-icon-val"', index], ['data-precise="', 1], ['"', 0]]),
		"map" : "https://" + e([['<div class="b-forecast__table-maps-container"', 1], ['</div>', 0], ['url(https://', 1], [')', 0]]),
		"rain" : e([['<span class="rain b-forecast__table-value', index], ['</span>', 0]]),
		"snow" : e([['<span class="snow b-forecast__table-value', index], ['</span>', 0]]),
		"temp_high" : e([['<span class="temp b-forecast__table-value', index], ['</span>', 0]]),
		"temp_low" : e([['<div class="b-forecast__table-header-value">Low', 1], ['<span class="temp b-forecast__table-value">', index], ['</span>', 0]]),
		"chill" : e([['<div class="b-forecast__table-header-value">Chill', 1], ['<span class="temp b-forecast__table-value">', index], ['</span>', 0]]),
		"humidity" : e([['<span class="b-forecast__table-header-units">%', 1], ['<span class="b-forecast__table-value">', index], ['</span>', 0]]),
		"uv" : e([['<div class="b-forecast__table-header-value b-forecast__table-float">UV', 1], ['<span class="b-forecast__table-value">', index], ['</span>', 0]]),
		"am_pm" : e([['<tr class="b-forecast__table-time js-daytimes">', 1], ['</tr>', 0], ['<span class="b-forecast__table-value">', index], ['</span>', 0]]),
		"day" : e([['<div class="b-forecast__table-days-name', parseInt((index-1) / 3)+1], ['</div>', 0]]),
	}
}

function weather_week_embed(msg, html) {
	// HTML
	title = html.split('<h1 class="main-title__header">')[1].split("</span>")[0].split(">")[1];
	description = remove_tags(html.split('<p class="large-loc">')[1].split("</p>")[0]);
	description_title = remove_tags(html.split('<div class="b-forecast__table-description-title">')[1].split("</div>")[0]);
	weather_description = remove_tags(html.split('<p class="b-forecast__table-description-content">')[1].split("</span>")[0]);
	
	// when does day 2 start
	day1_p1 = weather_get_elem(html, 1);
	day2_start = {"AM" : 4, "PM" : 3, "N" : 2}[day1_p1["am_pm"]];
	
	// embed
	embed_weather = new Discord.MessageEmbed();
	embed_weather.setColor(embed_color_chat);
	embed_weather.setTitle(description_title);
	embed_weather.setDescription(description + "\n\u200B\n" + weather_description);
	
	// week days
	for (x=0;x<6;x++) {
		AM = weather_get_elem(html, day2_start + (x*3) + 0);
		PM = weather_get_elem(html, day2_start + (x*3) + 1);
		Night = weather_get_elem(html, day2_start + (x*3) + 2);
		
		// current day data
		embed_weather.addField(AM["day"], "`       " + AM["am_pm"] + " " + PM["am_pm"] + " " + Night["am_pm"] + "\n" +
			"Cloud: " + AM["cloudy"] + " " + PM["cloudy"] + " " + Night["cloudy"] + "\n" +
			" Wind: " + AM["wind"] + " " + PM["wind"] + " " + Night["wind"] + "\n" +
			" Rain: " + AM["rain"] + " " + PM["rain"] + " " + Night["rain"] + "\n" +
			" Snow: " + AM["snow"] + " " + PM["snow"] + " " + Night["snow"] + "\n" +
			" High: " + AM["temp_high"] + " " + PM["temp_high"] + " " + Night["temp_high"] + "\n" +
			"  Low: " + AM["temp_low"] + " " + PM["temp_low"] + " " + Night["temp_low"] + "\n" +
			" Chil: " + AM["chill"] + " " + PM["chill"] + " " + Night["chill"] + "\n" +
			"Humid: " + AM["uv"] + " " + PM["uv"] + " " + Night["uv"] + "`\n\u200B", 
		true);
	}
	
	// send message
	embed_weather.setTimestamp();
	msg.channel.send(embed_weather);
	
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"weather ") {
			// URL
			command = msg.content.slice(9, msg.content.length);
			if (US_states[command] != undefined) {
				command = US_states[command].replace(/ /g, "-");
			} else {
				command = command.replace(/ /g, "-");
			}
			
			url = "https://www.weather-forecast.com/locations/" +command+ "/forecasts/latest";
			
			// get html
			request(url, {
				headers: {
					"User-Agent": user_agent
				},
				body: "",
				method: "GET"
			}, (err, res, html) => {
				if (res.statusCode == 200) {
					// Process Week
					weather_week_embed(msg, html);
					
				} else if (res.statusCode == 404) {
					embed_error(msg, "Could not find the city! Please make sure you entered the name correctly!");
				} else {
					console_log("Error status code " + res.statusCode + " in weather!", error=true);
				}
			})
		}
	}
})

// yes or no questions
bot.on("message", msg=> {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,5).toLowerCase() === prefix[msg.guild.id]+"say " || msg.content.slice(0, 8) == prefix[msg.guild.id]+"repeat ") {
			embed_say = new Discord.MessageEmbed();
			embed_say.setColor(embed_color_chat);
			if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"say ") {
				embed_say.setDescription(msg.content.slice(4, msg.content.length));
			} else {
				embed_say.setDescription(msg.content.slice(8, msg.content.length));
			}
			embed_say.setAuthor("JaredBot", webserver_root_address+"img/lion.png", "");
			embed_say.setTimestamp();
			msg_channel_send(msg, embed_say);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,8).toLowerCase() === prefix[msg.guild.id]+"do you " || msg.content.slice(0,6) === prefix[msg.guild.id]+"do u ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,4).toLowerCase() == prefix[msg.guild.id]+"is ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,8).toLowerCase() == prefix[msg.guild.id]+"should ") {
			embed_chat_reply(msg, ["Yes", "No"][parseInt(Math.random() * 100) % 2]);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,8).toLowerCase() === prefix[msg.guild.id]+"howgay " || msg.content === prefix[msg.guild.id]+"howgay") {
			if (msg.content === prefix[msg.guild.id]+"howgay") {
				embed_chat_reply_header(msg, "You are " + String(parseInt(Math.random()*100)) + "% gay!", "Gay Detector", pfp=false);
			} else {
				name = msg.content.replace(" is "," ").split(" ")[1];
				embed_chat_reply_header(msg, name + " is " + String(parseInt(Math.random()*100)) + "% gay!", "Gay Detector", pfp=false);
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,6).toLowerCase() === prefix[msg.guild.id]+"will ") {
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"8ball ") {
			question = msg.content.slice(7, msg.content.length);
			embed_chat_reply(msg, answers[parseInt(Math.random() * 100) % answers.length]);
		}
	}
})

// post henati
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() === prefix[msg.guild.id]+"hentai") {
			if (msg.channel.nsfw == true) { 
				if (hentai_user_python == true) {
					// write command to file
					fs_write.writeFile(inputs_file_henati, "get-henati", function(err) {
						if (err) {
							return console_log("Failed to write hentai command to file!", error=true);
						}
					console_log("wrote command -get-henati to file!")
					});
	
					// output image
					check_if_file_changed(output_file_henati, msg, true, read_output_file_delay_henati, false);
				
				} else {
					embed_image(msg, webserver_hentai_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["hentai"]).slice(-5) +".png", "hentai");
					console_log("Hentai image sent to " + msg.guild.id);
				}
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// post boobs
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"boob" || msg.content.slice(0, 5) == prefix[msg.guild.id]+"nsfw" || msg.content.slice(0, 5) == prefix[msg.guild.id]+"tity" ||
		msg.content.slice(0, 6) == prefix[msg.guild.id]+"titty" || msg.content.slice(0, 4) == prefix[msg.guild.id]+"tit") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_boobs_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["boobs"]).slice(-5) + ".png";
				embed_image(msg, url, "Boobs!");
				console_log("Boobs photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// ass
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 4) == prefix[msg.guild.id]+"ass" || msg.content.slice(0, 8) == prefix[msg.guild.id]+"asshole" || msg.content.slice(0, 4) == prefix[msg.guild.id]+"but") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_ass_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["ass"]).slice(-5) + ".png";
				embed_image(msg, url, "Ass!");
				console_log("Ass photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// vagina
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"pussy" || msg.content.slice(0, 7) == prefix[msg.guild.id]+"vagina" || msg.content.slice(0, 6) == prefix[msg.guild.id]+"fanny" ||
		msg.content.slice(0, 4) == prefix[msg.guild.id]+"vag" || msg.content.slice(0, 7) == prefix[msg.guild.id]+"thingy" || msg.content.slice(0, 5) == prefix[msg.guild.id]+"muff") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_pussy_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["pussy"]).slice(-5) + ".png";
				embed_image(msg, url, "Pussy!");
				console_log("Pussy photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// anal
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"anal") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_anal_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["anal"]).slice(-5) + ".png";
				embed_image(msg, url, "Anal!");
				console_log("Anal photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// blowjob
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"blowjob" || msg.content.slice(0, 3) == prefix[msg.guild.id]+"bj" || 
		msg.content.slice(0, 8) == prefix[msg.guild.id]+"handjob" || msg.content.slice(0, 3) == prefix[msg.guild.id]+"hj") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_blowjob_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["blowjob"]).slice(-5) + ".png";
				embed_image(msg, url, "Blowjob!");
				console_log("Blowjob photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// fingering
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"finger" || msg.content.slice(0, 6) == prefix[msg.guild.id]+"touch") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_fingering_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["fingering"]).slice(-5) + ".png";
				embed_image(msg, url, "Fingering!");
				console_log("Fingering photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// porngif
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"porn" || msg.content.slice(0, 8) == prefix[msg.guild.id]+"porngif") {
			if (msg.channel.nsfw == true) {
				// send message
				url = webserver_porngifs_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["porngif"]).slice(-5) + ".gif";
				embed_image(msg, url, "Porn Gif!");
				console_log("Porn Gif photo sent to " + msg.guild.id);
			} else {
				embed_error(msg, "This command can only be used in NSFW channels!");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// other NSFW commands
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.author.bot == false) {
			// dick
			if (msg.guild != null && msg.content == prefix[msg.guild.id]+"dick" || msg.content == prefix[msg.guild.id]+"milf" || msg.content == prefix[msg.guild.id]+"theesome" || 
			msg.content == prefix[msg.guild.id]+"bondage" || msg.content == prefix[msg.guild.id]+"trans" || msg.content == prefix[msg.guild.id]+"creampie" || 
			msg.content == prefix[msg.guild.id]+"bigdick" || msg.content == prefix[msg.guild.id]+"gangbang" || msg.content == prefix[msg.guild.id]+"orgy" || 
			msg.content == prefix[msg.guild.id]+"fisting" || msg.content == prefix[msg.guild.id]+"sfw" || msg.content == prefix[msg.guild.id]+"cock" || 
			msg.content == prefix[msg.guild.id]+"errect" || msg.content == prefix[msg.guild.id]+"balls" || msg.content == prefix[msg.guild.id]+"foursome" || 
			msg.content == prefix[msg.guild.id]+"beastiality" || msg.content == prefix[msg.guild.id]+"ruffsex" || msg.content == prefix[msg.guild.id]+"ruff" ||
			msg.content.slice(0, 7) == prefix[msg.guild.id]+"wiener") {
				if (msg.channel.nsfw == true) {
					msg_channel_send(msg, "EWW No!");
				} else {
					embed_error(msg, "This command can only be used in NSFW channels!");
					console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
				}
			}
		}
	}
})

// owo
function help_owo(msg) {
	try {
		embed_owo = new Discord.MessageEmbed();
		embed_owo.setColor(embed_color_chat); //\n\u200B
		embed_owo.setTitle("Help OwO");
		embed_owo.setAuthor("JaredBot | Command list", lion_profile_pic);
		embed_owo.setThumbnail(lion_profile_pic);
		embed_owo.addFields(
			{name: "\u200B", value: "`-owo bite`\n`-owo blush`", inline: true},
			{name: "\u200B", value: "`-owo boop`\n`-owo bully`", inline: true},
			{name: "\u200B", value: "`-owo cry`\n`-owo cuddle`", inline: true},
			{name: "\u200B", value: "`-owo dance`\n`-owo greet`", inline: true},
			{name: "\u200B", value: "`-owo grin`\n`-owo handholding`", inline: true},
			{name: "\u200B", value: "`-owo happy`\n`-owo highfive`", inline: true},
			{name: "\u200B", value: "`-owo hold`\n`-owo hug`", inline: true},
			{name: "\u200B", value: "`-owo kill`\n`-owo kiss`", inline: true},
			{name: "\u200B", value: "`-owo lewd`\n`-owo lick`", inline: true},
			{name: "\u200B", value: "`-owo nom`\n`-owo pat`", inline: true},
			{name: "\u200B", value: "`-owo poke`\n`-owo pout`", inline: true},
			{name: "\u200B", value: "`-owo punch`\n`-owo scoff`", inline: true},
			{name: "\u200B", value: "`-owo shrug`\n`-owo thinking`", inline: true},
			{name: "\u200B", value: "`-owo smile`\n`-owo smug`", inline: true},
			{name: "\u200B", value: "`-owo thumbs`\n`-owo thumbsup`", inline: true},
			{name: "\u200B", value: "`-owo slap`\n`-owo sleepy`", inline: true},
			{name: "\u200B", value: "`-owo snuggle`\n`-owo stare`", inline: true},
			{name: "\u200B", value: "`-owo tickle`\n`-owo triggered`", inline: true},
			{name: "\u200B", value: "`-owo wag`\n`-owo wave`\n\u200B", inline: true},
		)
		embed_owo.setTimestamp();
		msg_channel_send(msg, embed_owo);
	} catch (err) {
		console_log("Error thrown in help_owo function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"owo ") {
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
				console_log("owo image sent to " + msg.guild.id);
			}
		}
	}
})

// hug
bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 4) == prefix[msg.guild.id]+"hug") {
		let member = msg.mentions.members.first();
		if (member != undefined) {
			user_receiver = member.user.tag.split("#")[0];
			user_sender = msg.member.user.tag.split("#")[0];
			hug_url = webserver_src_hug + "/" + ("00000" + parseInt(Math.random()*1000) % dataset_counts["hug"]).slice(-5) + ".gif";
			embed_image_header(msg, hug_url, user_sender + " hugged " + user_receiver, "");
			console_log("hug hig sent to server " + msg.guild.id);
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"hug") {
			embed_info_reply(msg, "You can't hug yourself lol :/");
		} else {
			embed_info_reply(msg, "receiving user couldn't be found");
		}
	}
})

// kiss
bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"kiss") {
		let member = msg.mentions.members.first();
		if (member != undefined) {
			user_receiver = member.user.tag.split("#")[0];
			user_sender = msg.member.user.tag.split("#")[0];
			kiss_url = webserver_src_kiss + "/" + ("00000" + parseInt(Math.random()*1000) % dataset_counts["kiss"]).slice(-5) + ".gif";
			embed_image_header(msg, kiss_url, user_sender + " kissed " + user_receiver, "");
			console_log("kiss gif sent to server " + msg.guild.id);
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"kiss") {
			embed_info_reply(msg, "You can't kiss yourself lol :/");
		} else {
			embed_info_reply(msg, "receiving user couldn't be found");
		}
	}
})

// --- Auto Post ---
var hentai_intervals = {};
var nude_intervals = {};
var meme_intervals = {};
var photo_intervals = {};
var bird_intervals = {};
var car_intervals = {};
var cat_intervals = {};
var dog_intervals = {};
var snake_intervals = {};
var porngif_intervals = {};

const autopost_filetypes = {
	"Hentai" : ".png", "Nude" : ".png", "memes" : ".png", "photography" : ".png", "Birds" : ".png",
	"Cars" : ".png", "Cats" : ".png", "Dogs" : ".png", "Snakes" : ".png", "PornGif" : ".gif"
}

function post_auto_image(channel_file, webserver_dataset, database_count, dataset_description, intervals) {
	try {
		if (enable_auto_henati == true) {
			// check each authorised server ID
			for (i=0;i<authrosied_server_IDs.length;i++) {
				// get server name
				current_server_name2 = bot.guilds.cache.get(authrosied_server_IDs[i])
				if (current_server_name2 != undefined) {
					current_server_name2 = current_server_name2.name.replace(" ","_")+"_"+ current_server_name2.id;
					// get directory
					hen_path = logging_path + "/" + current_server_name2 + "/" + channel_file;
					if (fs_read.existsSync(hen_path) == true) {
						// file exists for current server
						// read output file
						fs_read.readFile(hen_path, "utf8", function(err, data) {
							if (err) {
								return console_log("Failed to read output file in autopost image function!", error=true);
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
										console_log("Set Auto"+dataset_description+" Interval for " + hentai_current_ID + "!");
										intervals[hentai_current_ID] = setInterval(function(hentai_current_ID) {
											// send random image
											if (autopost_filetypes[dataset_description] != undefined) {
												hentai_fname = "/" + ("00000" + parseInt(Math.random() * 100000) % database_count).slice(-5) + autopost_filetypes[dataset_description];
											} else {
												hentai_fname = "/" + ("00000" + parseInt(Math.random() * 100000) % database_count).slice(-5) + ".png";
											}
											current_hentai_channel = bot.channels.cache.get(hentai_current_ID);
											console_log("Auto"+dataset_description+" posted in "+hentai_current_ID+"!");
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
	} catch (err) {
		console_log("Error thrown in post_auto_image function! " + err, error=true);
	}
} 

function auto_post_timeout(channel_file, webserver_dataset, database_count, dataset_description, intervals, timeout) {
	try {
		setTimeout(function() {
			post_auto_image(channel_file, webserver_dataset, database_count, dataset_description, intervals, nsfw=false);
		}, timeout*1000, channel_file, webserver_dataset, database_count, dataset_description, intervals);
	} catch (err) {
		console_log("Error thrown in auto_post_timeout function! " + err, error=true);
	}
}

bot.on("ready", msg => {
	setTimeout(function(){
		auto_post_timeout(hentai_channel_file, webserver_hentai_dataset, dataset_counts["hentai"], "Hentai", hentai_intervals, 1);
		auto_post_timeout(nsfw_channel_file, webserver_nude_dataset, dataset_counts["nudes"], "Nude", nude_intervals, 5);
		auto_post_timeout(igmemes_channel_file, webserver_igmemes_dataset, dataset_counts["igmemes"], "Meme", meme_intervals, 10, nsfw=false);
		auto_post_timeout(photography_channel_file, webserver_photography_dataset, dataset_counts["photography"], "Photography", photo_intervals, nsfw=false);
		auto_post_timeout(bird_channel_file, webserver_bird_dataset, dataset_counts["birds"], "Birds", bird_intervals, nsfw=false);
		auto_post_timeout(car_channel_filename, webserver_cars_dataset, dataset_counts["cars"], "Cars", car_intervals, nsfw=false);
		auto_post_timeout(cat_channel_filename, webserver_cats_dataset, dataset_counts["cats"], "Cats", cat_intervals, nsfw=false);
		auto_post_timeout(dog_channel_filename, webserver_dogs_dataset, dataset_counts["dogs"], "Dogs", dog_intervals, nsfw=false);
		auto_post_timeout(snake_channel_filename, webserver_snake_dataset, dataset_counts["snakes"], "Snakes", snake_intervals, nsfw=false);
		auto_post_timeout(porngif_channel_filename, webserver_porngifs_dataset, dataset_counts["porngif"], "PornGif", porngif_intervals);
		console_log("Autopost timeouts set!");
	}, autopost_init_timeout);
})

// configure channel to post images automatically
function configure_autopost(msg, commands, description, intervals, channel_file, webserver_dataset, database_count, nsfw=true) {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.guild != null && msg.content.slice(0, commands.length+1) == prefix[msg.guild.id]+commands) {
				if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
					if (msg.channel.nsfw == nsfw) {
						command = msg.content.slice(commands.length+1, commands.length+4);
						if (command == "on ") {
							autohenati_mins = msg.content.slice(commands.length+command.length, msg.content.length);
							ErrorMessageEnd = "The correct syntax for the command is `-auto"+description+" on {length}` for example `-auto"+description+" on 10` will post a new "+description+" photo every 10 mins!";
							if (isInt(msg, autohenati_mins, 1, 1440, "length", ErrorMessageEnd) == true) {
								create_file_then_append_data(msg, channel_file, msg.channel.id + "," + autohenati_mins + ";", endl="");
								embed_info_reply(msg, "Auto"+description+" has been enabled, photos will be posted every " + autohenati_mins + " mins! You can type `-auto"+description+" off` to clear any Auto"+description+" rules!");
								console_log("Auto"+description+" has been enabled for server " + msg.guild.id, error=false, mod=true);
							
								// timeout
								console_log("Auto"+description+" Interval set for " + msg.channel.id);
								intervals[msg.channel.id] = setInterval(function() {
									// send random hentai image
									hentai_fname = ("00000" + parseInt(Math.random() * 100000) % database_count).slice(-5) + ".png";
									current_hentai_channel = bot.channels.cache.get(msg.channel.id);
									embed_image(current_hentai_channel, webserver_dataset + "/" + hentai_fname, description, guild="channel");
									console_log("Autohentai image sent to server " + msg.guild.id);
								}, 1000*60*parseInt(autohenati_mins), msg.channel.id);
							
							}
						} else if (command == "off") {
							// get directory
							current_server_name3 = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
							hentai_path3 = logging_path + "/" + current_server_name3 + "/" + channel_file;
						
							// stop interval for all channels on server
							async function stop_hentai_interval() {
								fs_read.readFile(hentai_path3, "utf-8", function(err, data) {
									if (err) {
										return console_log("Failed to read hentai channel file!", error=true);
									}
							
									// raw data
									hentai_raw2 = data.split("\n").join("").split(";");
									for (i=0;i<hentai_raw2.length;i++) {
										if (hentai_raw2[i] != "") {
											clear_current_interval = hentai_raw2[i].split(",")[0];
											if (isInt_without_error(clear_current_interval, 0, 10**20) == true) {
												if (intervals[clear_current_interval] != undefined) {
													clearInterval(intervals[clear_current_interval]);
													console_log("Auto"+description+" Interval " + clear_current_interval + " cleared!");
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
									fs_write.writeFile(hentai_path3, "", function(err) {
										if (err) {
											return console_log("Failed to clear file in autopost function!", error=true);
										}
										embed_info_reply(msg, "All Auto"+description+" rules cleared for your server!");
										console_log("All Auto"+description+" rules cleared for server " + msg.guild.id);
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
	} catch (err) {
		console_log("Error thrown in configure_autopost function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 12) == prefix[msg.guild.id]+"autohentai ") {
		configure_autopost(msg, "autohentai ", "Hentai", hentai_intervals, hentai_channel_file, webserver_hentai_dataset, dataset_counts["hentai"], nsfw=true);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"autonude ") {
		configure_autopost(msg, "autonude ", "Nude", nude_intervals, nsfw_channel_file, webserver_nude_dataset, dataset_counts["nudes"], nsfw=true);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"automeme ") {
		configure_autopost(msg, "automeme ", "Meme", meme_intervals, igmemes_channel_file, webserver_memes_dataset, dataset_counts["memes"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 11) == prefix[msg.guild.id]+"autophoto ") {
		configure_autopost(msg, "autophoto ", "Photography", photo_intervals, photography_channel_file, webserver_photography_dataset, dataset_counts["photography"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"autobird ") {
		configure_autopost(msg, "autobird ", "Birds", bird_intervals, bird_channel_file, webserver_bird_dataset, dataset_counts["birds"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"autocar ") {
		configure_autopost(msg, "autocar ", "Cars", car_intervals, car_channel_filename, webserver_cars_dataset, dataset_counts["cars"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"autocat ") {
		configure_autopost(msg, "autocat ", "Cats", cat_intervals, cat_channel_filename, webserver_cats_dataset, dataset_counts["cats"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"autodog ") {
		configure_autopost(msg, "autodog ", "Dogs", dog_intervals, dog_channel_filename, webserver_dogs_dataset, dataset_counts["dogs"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 11) == prefix[msg.guild.id]+"autosnake ") {
		configure_autopost(msg, "autosnake ", "Snakes", snake_intervals, snake_channel_filename, webserver_snake_dataset, dataset_counts["snakes"], nsfw=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.slice(0, 13) == prefix[msg.guild.id]+"autoporngif ") {
		configure_autopost(msg, "autoporngif ", "porngif", porngif_intervals, porngif_channel_filename, webserver_porngifs_dataset, dataset_counts["porngif"], nsfw=true);
	}
})

function autopost_help(msg) {
	try {
		embed_autocommands_help = new Discord.MessageEmbed();
		embed_autocommands_help.setColor(embed_colour_info);
		embed_autocommands_help.setTitle("Auto Image Commands Help");
		embed_autocommands_help.setThumbnail(lion_profile_pic);
		embed_autocommands_help.addFields(
			{name: "AutoMeme", value: "`-help automeme`.\n\u200B", inline:true},
			{name: "AutoPhoto", value: "`-help autophoto`.\n\u200B", inline:true},
			{name: "AutoCar", value: "`-help autocar`.\n\u200B", inline:true},
			{name: "AutoNude", value: "`-help autonude`.\n\u200B", inline:true},
			{name: "AutoHentai", value: "`-help autohentai`.\n\u200B", inline:true},
			{name: "AutoPornGif", value: "`-help autoporngif`.\n\u200B", inline: true},
			{name: "AutoBird", value: "`-help autobird`.\n\u200B", inline:true},
			{name: "AutoCat", value: "`-help autocat`.\n\u200B", inline:true},
			{name: "AutoDog", value: "`-help autodog`.\n\u200B", inline:true},
			{name: "AutoSnake", value: "`-help autosnake`.\n\u200B", inline:true},
			{name: "\u200B", value: "\n\u200B", inline: true},
			{name: "\u200B", value: "\n\u200B", inline: true},
		)
			
		embed_autocommands_help.setTimestamp();
		msg_channel_send(msg, embed_autocommands_help);
	} catch (err) {
		console_log("Error thrown in autopost_help function! " + err, error=true);
	}
}

// execute
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,9) === prefix[msg.guild.id]+"execute ") {
			var input_code = msg.content.slice(9,msg.length);
			input_code = input_code.split("```").join("").split("`").join("");
		
			// write code to file
			fs_write.writeFile(inputs_file_execute, input_code, function(err) {
				if (err) {
					return console_log("Failed to write execute code to file!", error=true);
				}
				console_log("wrote python code to file successfully!");
			});
		
			// read code output
			setTimeout(function(){
				fs_read.readFile(output_file_execute, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read execute output!", error=true);
					}
			
					// send message
					embed_execute = new Discord.MessageEmbed();
					embed_execute.setTitle("Python Output");
					embed_execute.setURL("https://www.python.org/"); // set this to URL of the message
					embed_execute.setColor(embed_color_chat);
					embed_execute.setDescription("This is the output from Python terminal");
					embed_execute.addFields(
						{name: "Input", value: "```"+input_code.slice(0, 1000)+"```"},
						{name: "Output", value: "``` "+data.slice(0, 1000)+" ```"}
					)
					embed_execute.setTimestamp();
					embed_execute.setFooter("JaredBot", webserver_root_address+"img/lion.png");
					msg_channel_send(msg, embed_execute);
					
				});
			}, read_output_file_delay_execute, msg, input_code);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() === prefix[msg.guild.id]+"imbored") {
			fs_read.readFile(dataset_imbored, "utf-8", function(err, data) {
				if (err) {
					return console_log("Failed to read imbored dataset!", error=true);
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() === prefix[msg.guild.id]+"random name") {
			fs_read.readFile(dataset_firstname, "utf-8", function(err, data) {
				if (err) {
					return console_log("Failed to read random name dataset!", error=true);
				}
			
				//get first name
				first_names_list = String(data).split("\n");
				firstname = first_names_list[parseInt(Math.random() * 1000) % first_names_list.length];
			
				//surname
				fs_read.readFile(dataset_surname, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read surname dataset!", error=true);
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
	try {
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
	} catch (err) {
		console_log("Error thrown in split_list_dot function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"choose " || msg.content.slice(0, 8) == prefix[msg.guild.id]+"choice ") {
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

// anouncment
bot.on("message", msg => {
	if (msg.guild != null && msg.content.toLowerCase().slice(0,10) === prefix[msg.guild.id]+"announce ") {
		if (msg.channel.type == 'dm') {
			if (msg.author.id === user_ID) {
				console_log("Message from Jared recived!");
				var TheMessage = msg.content.slice(10, msg.content.length);
			
				// send to multiple servers (announcements channel)!
				for (i=0;i<channel_IDs.length;i++) {
					try {
						bot.channels.cache.get(channel_IDs[i]).send(TheMessage);
					} catch {
						embed_error(msg, "Failed to send announcement in " + channel_IDs[i]);
					}
				}
			}
		} else {
			embed_error(msg, "The announce command can only be used by Jared Network admins, it's used to post announcments in the Jared Network server announcment channel!");
		}
	}
})

// default dance
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 14) == prefix[msg.guild.id]+"default dance") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				// message reply
				for (i=1;i<11;i++) {
					fs_read.readFile(default_dance_dir+i+".txt", "utf-8", function(err, data) {
						if (err) {
							return console_log("Failed to read default dance file!", error=true);
						}
						
						// send message
						embed_default_dance = new Discord.MessageEmbed();
						embed_default_dance.setColor("FFA92D");
						embed_default_dance.setDescription(data);
						msg_channel_send(msg, embed_default_dance);
					})
				}
			} else {
				embed_error(msg, "Only Jared can run this command!");
			}
		}
	}
})

// wait 1 second then get output again
function get_output(msg, channel_id) {
	try {
		setTimeout(function() {
			try {
				fs_read.readFile(output_file_chatbot, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read CleverBot output file!", error=true);
					}
					if (data == "") {
						get_output(msg, channel_id);
					} else {
						// send message to user
						console_log("Channel ID: ", channel_id, data);
						embed_cleverbot = new Discord.MessageEmbed();
						embed_cleverbot.setAuthor("AI", webserver_root_address+"img/ai.png");
						embed_cleverbot.setColor("00749D");
						embed_cleverbot.setDescription("```\u200B\u200B\u200B" +data+"\n\u200B                              ```");
						embed_cleverbot.setTimestamp();
						msg_channel_send(msg, embed_cleverbot);
						console_log("message send to user!")
					}
				})
			} catch (err) {
				embed_chat_reply("...");
			}
		}, read_output_file_delay_clever_bot, msg, channel_id);
	} catch (err) {
		console_log("Error thrown in get_output function! " + err, error=true);
	}
}

// clever bot
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) === prefix[msg.guild.id]+"bot ") {
			var input_code = msg.content.slice(5,msg.length);
		
			// write code to file
			fs_write.writeFile(inputs_file_chatbot, input_code, function(err) {
				if (err) {
					return console_log("Failed to write input to CleverBot input file!", error=true);
				}
				console_log("[cleverbot input] " + input_code);
			});
		
			// read code output
			setTimeout(function(){
				fs_read.readFile(output_file_chatbot, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read CleverBot output file!", error=true);
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() === prefix[msg.guild.id]+"random animal") {
			// write command to file
			fs_write.writeFile(inputs_file_animals, "random-animal", function(err) {
				if (err) {
					return console_log("Failed to write random animal to file!", error=true);
				}
				console_log("wrote command random animal to file!")
			});
	
			// read file after 5 second
			setTimeout(function(){
				fs_read.readFile(output_file_animals, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read random animal from file!", error=true);
					}
				
					//send message
					msg_channel_send(msg, data, { files: [output_file_random_animal_png] }).then (msg => {
						console_log("uploaded random animal image to discord!")
					}).catch(err => {
						console_log("Error thrown in msg_channel_send random animal function! " + err, error=true);
					})
				})
			
			}, read_output_file_delay_random_animal, msg);
		}
	}
})

// post meme
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		var command = msg.content.toLowerCase()
		if (command === prefix[msg.guild.id]+"catmeme" || command === prefix[msg.guild.id]+"meme") {
			if (meme_source_from_python == true) {
				try {
					// write command to file
					if (command === prefix[msg.guild.id]+"catmeme") {
						fs_write.writeFile(inputs_file_meme, "meme-cat", function(err) {
							if (err) {
								return console_log("Failed to write catmeme input to file!", error=true);
							}
							console_log("wrote command random animal to file!")
						});
					} else if (command === prefix[msg.guild.id]+"meme") {
						fs_write.writeFile(inputs_file_meme, "meme", function(err) {
							if (err) {
								return console_log("Failed to write meme input to file!", error=true);
							}
						console_log("wrote command random meme to file!")
						});
					}
		
					// send message
					check_if_file_changed(outputs_file_meme, msg, true, read_output_file_delay_random_meme, true);
			
				} catch (error) {
					console_log("an error was throw when trying to post a cat/catmeme!");
				}
			} else {
				// post image
				if (command === prefix[msg.guild.id]+"meme") {
					embed_image(msg, webserver_memes_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["memes"]).slice(-5) +".png", "meme");
					console_log("Meme sent to server " + msg.guild.id);
				} else if (command === prefix[msg.guild.id]+"catmeme") {
					embed_image(msg, webserver_catmemes_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["catmemes"]).slice(-5) +".png", "meme");
					console_log("Catmeme sent to server " + msg.guild.id);
				}
			}
		}
	}
})

// post cat photo
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"cat" || msg.content == prefix[msg.guild.id]+"meow") {
			// send message
			embed_image(msg, webserver_cats_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["cats"]).slice(-5) +".png", "cat");
			console_log("cat photo sent to server " + msg.guild.id);
		}
	}
})

// post dog photo
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"dog" || msg.content == prefix[msg.guild.id]+"woof") {
			// send message
			embed_image(msg, webserver_dogs_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["dogs"]).slice(-5) +".png", "dog");
			console_log("dog photo sent to server " + msg.guild.id);
		}
	}
})

// post helicopter photo
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"heli" || msg.content.slice(0, 6) == prefix[msg.guild.id]+"chpper") {
			// send message
			embed_image(msg, webserver_heli_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["helicopters"]).slice(-5) +".png", "helicopter");
			console_log("helicopter photo sent to server " + msg.guild.id);
		}
	}
})

// post a dog meme
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"dogmeme") {
			// send message
			embed_image(msg, webserver_dogmeme_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["dogmemes"]).slice(-5) +".png", "dog meme");
			console_log("dogmeme sent to server " + msg.guild.id);
		}
	}
})

// post nude
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"nude") {
			if (msg.channel.nsfw == true) {
				// send message
				embed_image(msg, webserver_nude_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["nudes"]).slice(-5) +".png", "nude girl");
				console_log("nude photo sent in server " + msg.guild.id);
			} else {
				embed_error(msg, "The nude command can only be used in NSFW channels");
				console_log("User " + msg.member.user.tag + " tried to run an NSFW command in a non NSFW channel in server " + msg.guild.id, error=true);
			}
		}
	}
})

// post car
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 4) == prefix[msg.guild.id]+"car") {
			// send message
			embed_image(msg, webserver_car_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["cars"]).slice(-5) +".png", "car");
			console_log("Car image sent to server " + msg.guild.id);
		}
	}
})

// post snake
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"snake") {
			// send message
			embed_image(msg, webserver_snake_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["snakes"]).slice(-5) +".png", "snake");
			console_log("snake image sent to server " + msg.guild.id);
		}
	}
})

// post bird
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"bird") {
			// send message
			embed_image(msg, webserver_birds_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["birds"]).slice(-5) +".png", "bird");
			console_log("bird image sent to server " + msg.guild.id);
		}
	}
})

// post racoon
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"racoon") {
			// send message
			embed_image(msg, webserver_racoon_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["racoon"]).slice(-5) +".png", "racoon");
			console_log("racoon image sent to server " + msg.guild.id);
		}
	}
})

// post photography
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"photo") {
			// send message
			embed_image(msg, webserver_photography_dataset + "/" + ("00000" + parseInt(Math.random() * 10000) % dataset_counts["photography"]).slice(-5) +".png", "photography");
			console_log("racoon image sent to server " + msg.guild.id);
		}
	}
})

// avatar
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"avatar") {
			let member = msg.mentions.members.first();
			
			// embed
			avatar_embed = new Discord.MessageEmbed();
			avatar_embed.setTimestamp();
			avatar_embed.setColor(embed_color_chat);
			
			if (member != undefined) {
				avatar_embed.setTitle(member.user.tag.split("#")[0] + "'s Avatar");
				avatar_embed.setImage(member.user.displayAvatarURL({dynamic: true}));
				avatar_embed.setFooter(member.user.tag);
				
			} else {
				avatar_embed.setTitle(msg.member.user.tag.split("#")[0] + "'s Avatar");
				avatar_embed.setImage(msg.author.displayAvatarURL({dynamic: true}));
				avatar_embed.setFooter(msg.member.user.tag);
			}
			
			// send message
			msg_channel_send(msg, avatar_embed);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content.toLowerCase() === prefix[msg.guild.id]+"invitelink") {
		embed_chat_reply_header(msg, perm_invite_link, "Jared Network Invite Link", pfp=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content == prefix[msg.guild.id]+"invitebot" || msg.content == prefix[msg.guild.id]+"addbot" || msg.content == prefix[msg.guild.id]+"botinvite") {
		embed_chat_reply_header(msg, bot_invite_link, "Jared Bot Invite Link", pfp=false);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"invite") {
			if (msg.guild.me.hasPermission("CREATE_INSTANT_INVITE") == true) {
				async function create_invite(msg) {
					try {
						//embed
						invite_embed = new Discord.MessageEmbed();
						invite_embed.setColor(embed_color_chat);
						invite_embed.setTitle("Invite link for " + msg.guild.name);
				
						let invite = await msg.channel.createInvite ({
							maxAge: 600,
							maxUsers: 1
						}).catch(err => {
							console_log("Failed to create Invite! " + err);
						})
						invite_embed.setDescription("https://discord.gg/" + invite);
						invite_embed.setTimestamp();
						msg_channel_send(msg, invite_embed);
					} catch (err) {
						console_log("Error thrown in create_invite function! " + err, error=true);
					}
				}
				create_invite(msg);
			} else {
				embed_error(msg, "Failed to create invite link for " + msg.guild.name + ", JaredBot does not have the right permissions! " +
				"Please go to server settings --> roles, and give JaredBot permission to create invites.");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content === prefix[msg.guild.id]+"author") {
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
			"suggestions, improvements, or you just want to talk to me, feel free to contact me using the links below.\n\u200B"
		)
		embed_author_jared.setColor(embed_colour_info);
		embed_author_jared.setThumbnail(cat_profile_pic);
		embed_author_jared.addFields(
			{name : "\n\u200BSocial links", value: "Steam:\thttps://steamcommunity.com/id/jaredcat\n\u200BDiscord:\thttps://discord.gg/QDeUXq4" +
			"\n\u200BGitHub:\thttps://github.com/JaredTurck\n\u200B"},
			{name: "Bot website", value: "Website: https://jaredbot.uk/\n\u200B"}
		)
		embed_author_jared.setTimestamp();
		embed_author_jared.setFooter("Jared Turck", cat_profile_pic);
		msg_channel_send(msg, embed_author_jared);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && msg.content == prefix[msg.guild.id]+"web" || 
		msg.guild != null && msg.content == prefix[msg.guild.id]+"website") {
		embed_chat_reply_header(msg, "https://jaredbot.uk/", "Bot Website", pfp=false);
	}
})

// about server
bot.on("message", msg => {
	if (msg.guild != null && msg.content === prefix[msg.guild.id]+"about") {
		embed_chat_reply(msg, "Jared Network is a discord server created and owned by Jared Turck, I originally created it to test out bot commands, "+
		"as I was planning to one day develop a discord bot. Jared Network was a test server to try out different bot commands, and also a "+
		"place to interact with other discord bots to get ideas. \n\u200B\n"+

		"Since the creation of this server, it has developed a lot and is so much more than just a testing server, it’s now a place where "+
		"friends can chat with each other, ask for help with anything, give improvements for workshop maps, give new ideas on how to improve "+
		"JaredBot, a place to share gameplay, videos, images, or just chat about random stuff.");
	}
})

// member count
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content === prefix[msg.guild.id]+"membercount") {
			embed_chat_reply(msg, "There are " + msg.guild.memberCount + " members on the server!");
		}
	}
})

// server count
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"servercount") {
			embed_chat_reply(msg, "The bot is currently in " + bot.guilds.cache.size + " servers, and has been authorised on "+
			authrosied_server_IDs.length + " servers in total!");
		}
	}
})

// chat replys
DoAutoReply = {};

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,13) == prefix[msg.guild.id]+"replychance ") {
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
		} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"replychance") {
			embed_chat_reply(msg, "The current replychance is " + (parseInt((1/reply_chance)*100 ))+"%!");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix[msg.guild.id]+"stop") {
			DoAutoReply[msg.guild.id] = false;
			embed_chat_reply(msg, "Auto response is turned off! Sorry if I was spamming :(");
			console_log("Auto Response turned off for " + msg.guild.id);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix[msg.guild.id]+"autoresponse") {
			DoAutoReply[msg.guild.id] = true;
			embed_chat_reply(msg, "Auto response turned on!");
			console_log("Auto Response turned on for " + msg.guild.id);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (DoAutoReply[msg.guild.id] == true && msg.author.bot == false) {
			// responses
			if (msg.content.toLowerCase() == "f") {
				msg_channel_send(msg, "f ");
			}

			if (msg.content.toLowerCase().indexOf("jared") > -1) {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "Jared ");
				}
			}

			if (msg.content.toLowerCase() == "lol") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "lol ");
				}
			}

			if (msg.content.toLowerCase() =="xd") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "xD ");
				}
			}

			if (msg.content.toLowerCase() == ":3") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, ":3 ");
				}
			}

			if (msg.content.toLowerCase() == ":)") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, ":) ");
				}
			}

			if (msg.content.toLowerCase() == "what") {
				if (new Date().getMilliseconds() % (reply_chance+5) == 0) {
					msg_channel_send(msg, "what ");
				}
			}

			if (msg.content.toLowerCase() == "no u") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "no u ");
				}
			}

			if (msg.content.toLowerCase() == "no you") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "no you ");
				}
			}

			if (msg.content.toLowerCase() == ":o") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, ":o ");
				}
			}
		
			if (msg.content.toLowerCase() == ":v") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, ":v ");
				}
			}

			if (msg.content.toLowerCase() == "owo") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "owo ");
				}
			}

			if (msg.content.toLowerCase() == "yeah") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "yeah ");
				}
			}
		
			if (msg.content.toLowerCase() == "ye") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "ye ");
				}
			}
		
		
			if (msg.content.toLowerCase() == "ah ok") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "ah ok ");
				}
			}

			if (msg.content.toLowerCase() == "nice") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "nice ");
				}
			}

			if (msg.content.toLowerCase() == "o") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "o ");
				}
			}
		
			if (msg.content.toLowerCase() == "Ã¶") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "Ã¶ ");
				}
			}

			if (msg.content.toLowerCase() == "thanks") {
				if (new Date().getMilliseconds() % (reply_chance+1) == 0) {
					msg_channel_send(msg, "thanks ");
				}
			}

			if (msg.content.toLowerCase() == "ty") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "ty ");
				}
			}

			if (msg.content.toLowerCase() == "oof") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "oof ");
				}
			}

			if (msg.content.toLowerCase() == "ok") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg_channel_send(msg, "ok ");
				}
			}

			if (msg.content.toLowerCase() == "bruh") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "bruh ");
				}
			}
		
			if (msg.content.toLowerCase() == "you") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "no you ");
				}
			}
		
			if (msg.content.toLowerCase() == "u") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "no u ");
				}
			}
		
			if (msg.content.toLowerCase() == "?") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "? ");
				}
			}

			if (msg.content.toLowerCase() == ":d") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, ":D ");
				}
			}

			if (msg.content.toLowerCase() == "rip") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "rip ");
				}
			}
		
			if (msg.content.toLowerCase().slice(0,3) == "ree") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "ree ");
				}
			}
		
			if (msg.content.toLowerCase().slice(0,4) == "haha") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "haha ");
				}
			}
		
			if (msg.content.toLowerCase() == "lmao") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "lmao ");
				}
			}
		
			if (msg.content.toLowerCase() == "yes") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "yes ");
				}
			}
		
			if (msg.content.toLowerCase() == "no") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "no ");
				}
			}
		
			if (msg.content.toLowerCase() == "yay") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "yay ");
				}
			}
		
			if (msg.content.toLowerCase() == "friend") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "im your friend! ");
				}
			}
		
			if (msg.content.toLowerCase() == "i love you" || msg.content.toLowerCase() == "i love u") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "I love you too! ");
				}
			}
		
			if (msg.content.toLowerCase() == "ily") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "I love you too! ");
				}
			}
		
			if (msg.content.toLowerCase() == "wow") {
				if (new Date().getMilliseconds() % reply_chance == 0) {
					msg_channel_send(msg, "wow!");
				}
			}
		
			if (msg.content.toLowerCase() == "brb") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg_channel_send(msg, "no you wont");
				}
			}
		
			if (msg.content.toLowerCase() == ":/") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg_channel_send(msg, ":/ ");
				}
			}
		
			if (msg.content.toLowerCase() == ":)") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg_channel_send(msg, ":) ");
				}
			}
		
			if (msg.content.toLowerCase() == ":(") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg_channel_send(msg, ":( ");
				}
			}
			
			if (msg.content.toLowerCase() == "kek") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					msg_channel_send(msg, "kek ");
				}
			}
		
			if (msg.content.toLowerCase() == "hello" || msg.content.toLowerCase() == "hi") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					if (parseInt(Math.random() * 10) % 3 == 0) {
						msg_channel_send(msg, "Hello ");
					} else if (parseInt(Math.random() * 10) % 3 == 1) {
						msg_channel_send(msg, "Hey ");
					} else {
						msg_channel_send(msg, "Hi ");
					}
				}
			}
		
			if (msg.content.toLowerCase().slice(0,3) == "hey") {
				if (new Date().getMilliseconds() % (reply_chance+2) == 0) {
					if (parseInt(Math.random() * 10) % 3 == 0) {
						msg_channel_send(msg, "Hello ");
					} else if (parseInt(Math.random() * 10) % 3 == 1) {
						msg_channel_send(msg, "Hey ");
					} else {
						msg_channel_send(msg, "Hi ");
					}
				}
			}
		
			if (msg.content.toLowerCase().indexOf("penis") > -1) {
				penis_replys = ["Ewww NO!", "gross!", "Ewww", "Ewww Penis", "Penis No", "🤮"];
				penis_reply2 = ["fuck me harder daddy", ";)", "yes please", "you make me so wet ;)", "yes daddy"];
				if (new Date().getMilliseconds() % 10 == 0) {
					msg_channel_send(msg, penis_reply2[parseInt(Math.random()*10) % penis_replys.length]);
				} else {
					msg_channel_send(msg, penis_replys[parseInt(Math.random()*10) % penis_reply2.length]);
				}
			}
		
			if (msg.content.toLowerCase().indexOf("fuck me") > -1) {
				fuckme_replies = ["Ok daddy ;)", "Sounds good", "Yes plz"];
				msg_channel_send(msg, fuckme_replies[parseInt(Math.random()*10) % fuckme_replies.length]);
			}
		
			if (msg.content.toLowerCase().indexOf("fuck you") > -1 || msg.content.toLowerCase().indexOf("fuck u") > -1) {
				msg_channel_send(msg, "no you");
			}
		
			if (msg.content.toLowerCase().indexOf("fuck off") > -1) {
				msg_channel_send(msg, "NO!");
			}
		
			if (msg.content.toLowerCase() === "fuck") {
				if (parseInt(Math.random() * 10) % (reply_chance+5) == 0) {
					msg_channel_send(msg, "why you mad bruh?");
				}
			}
		
			if (msg.content.toLowerCase() === "random") {
				msg_channel_send(msg, "your random");
			}
		
			if (msg.content.toLowerCase() === "night") {
				if (parseInt(Math.random() * 10) % 3 == 0) {
					msg_channel_send(msg, "Night!");
				} else if (parseInt(Math.random() * 10) % 3 == 1) {
					msg_channel_send(msg, "Sleep Well!");
				} else {
					msg_channel_send(msg, "Good Night!");
				}
			}
		
			if (msg.content.toLowerCase() === "morning") {
				if (parseInt(Math.random() * 10) % 3 == 0) {
					msg_channel_send(msg, "Morning!");
				} else if (parseInt(Math.random() * 10) % 3 == 1) {
					msg_channel_send(msg, "How did you sleep?");
				} else {
					msg_channel_send(msg, "Good Morning!");
				}
			}
		
			if (msg.content.toLowerCase() == "one second" || msg.content.toLowerCase() == "one sec") {
				setTimeout(function(){
					msg_channel_send(msg, "It's been one Second!");
				},1000);
			}
		
			if (msg.content.toLowerCase() == "1 second" || msg.content.toLowerCase() == "1 sec" || msg.content.toLowerCase() == "sec ") {
				setTimeout(function(){
					msg_channel_send(msg, "It's been one Second!");
				},1000);
			}
		
			if (msg.content.toLowerCase() == "give me a sec" || msg.content.toLowerCase() == "give me a second") {
				setTimeout(function(){
					msg_channel_send(msg, "It's been one Second!");
				},1000);
			}
		
			if (msg.content.toLowerCase() == "one min" || msg.content.toLowerCase() == "1 min") {
				setTimeout(function(){
					msg_channel_send(msg, "It's been one min!");
				},60*1000);
			}
		
		
			// turn off
			DoAutoReply[msg.guild.id] = false;
			setTimeout(function(){
				DoAutoReply[msg.guild.id] = true;
			}, anti_spam_delay);
		}
	}
})

// fancy text
var fonts = [];
fs_read.readFile(dataset_fonts, "utf-8", function(err, data) {
	if (err) {
		return console_log("Failed to read fancy text fonts database!", error=true);
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"font ") {
			command = msg.content.slice(6, msg.content.length);
			num = command.split(" ", 1);
			if (isNaN(parseInt(num)) == false) {
				if (num >= 1 && num <= fonts.length) {
					txt = command.slice(command.indexOf(" ")+1, command.length);
					font_output = [];
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 6) == prefix[msg.guild.id]+"kill ") {
			let member = msg.mentions.members.first();
			fs_read.readFile(dataset_methods_of_death, "utf-8", function(err, data) {
				if (err) {
					return console_log("Failed to read methods of death database!", error=true);
				}
				death_method = data.split("\n")[parseInt(Math.random() * 1000) % data.split("\n").length]
				embed_chat_reply(msg, "<@" + member + "> " + death_method);
			})
		}
	}
})

// Rock, Paper, Scissors
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if ([prefix+"rock", prefix+"paper", prefix+"scissors"].indexOf (msg.content.toLowerCase()) > -1) {
			bot_answer = ["Rock!", "Paper!", "Scissors!"][parseInt(Math.random() * 10) % 3];
			winning_text = "";
		
			console_log(msg.content.toLowerCase())
			console_log(bot_answer)
		
			// conditions
			if (msg.content.toLowerCase() == prefix[msg.guild.id]+"rock" && bot_answer == "Rock!") {
				winning_text = "Draw!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"rock" && bot_answer == "Paper!") {
				winning_text = "HAHA I win!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"rock" && bot_answer == "Scissors!") {
				winning_text = "You Win!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"paper" && bot_answer == "Rock!") {
				winning_text = "You Win!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"paper" && bot_answer == "Paper!") {
				winning_text = "Draw!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"paper" && bot_answer == "Scissors!") {
				winning_text = "HAHA I Win!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"scissors" && bot_answer == "Rock!") {
				winning_text = "HAHA I Win!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"scissors" && bot_answer == "Paper!") {
				winning_text = "You Win!";
			} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"scissors" && bot_answer == "Scissors!") {
				winning_text = "Draw!";
			}
		
			// winning text
			msg_channel_send(msg, bot_answer)
			setTimeout(function() {
				msg_channel_send(msg, winning_text);
			}, 1000);
		}
	}
})

// Just One
//-justone join (lets people join the game)
//bot sends message, please type yes to join the game

//once everyone is ready, admin types -justone start
//- bot reads database of words
//- bot sends same word to each peron

//bot wait for everyone to reply
//- once all users have replied then:
//  - send message in server channel

// get the just one channel ID when the bot starts

justone_guild = {};

function help_justone(msg) {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			embed_justone_help = new Discord.MessageEmbed();
			embed_justone_help.setColor(embed_color_chat);
			embed_justone_help.setTitle("Help Just One");
			embed_justone_help.setThumbnail(lion_profile_pic);
			embed_justone_help.setAuthor("JaredBot | Command list", lion_profile_pic);
			embed_justone_help.addFields(
				{name: "start", value: "`-justone start` will start the just one game, opning a lobby allowing players to join. This is the first command that should be run before using any of the just one commands. anyone can start a game.\n\u200B"},
				{name: "join", value: "`-justone join` use this command to join the just one lobby, all players that wish to participate in the game will need to run this command.\n\u200B"},
				{name: "ready", value: "`-justone ready` once all players have joined the lobby, an admin can run the ready command, this will close the lobby preventing other players from joining, and will begin the game.\n\u200B"},
				{name: "endgame", value: "`-justone endgame` an admin can run this command to end the just one game, the just one memeber list will be clearned as well as any words/clues.\n\u200B"},
				{name: "clues", value: "`-justone clues {clues}` once the bot has sent you the list of words in a dm, use this command to reply with your clues.\n\u200B"}
			)
			embed_justone_help.setTimestamp();
			msg_channel_send(msg, embed_justone_help);
		}
	} catch (err) {
		console_log("Error thrown in help_justone function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"justone start") {
			// start game
			justone_guild[msg.guild.id] = msg.channel.id;
			
			// get directory
			justone_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			justone_path = logging_path + "/" + justone_dir + "/" + justone_channel_id_fname;
			
			// write channel ID to file
			fs_write.writeFile(justone_path, justone_guild[msg.guild.id], function(err) {
				if (err) {
					return console_log("Failed to write justone channel ID to file!", error=true);
				}
			})
		
			// message user
			embed_chat_reply(msg, "Just one game started on "+msg.guild.name+" in channel "+msg.channel.name+", " +
			"type `-justone join` to join the game! Once all of the user have joined the game, ask an admin to type `-justone ready` " +
			"this will beging sending the words to the users");
			
			// to do:
			// - send just one rules
			
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"justone join") {
			
			// get directory
			justone_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			justone_path = logging_path + "/" + justone_dir + "/" + justone_channel_id_fname;
			
			// check if file exists
			if (fs_read.existsSync(justone_path) == false) {
				embed_chat_reply(msg, "Unable to join just one game, there is no game currently setup on the server, " +
				"please type `-justone start` to start a new game!");
				return false;
			}
			
			// read just one channel ID file
			fs_read.readFile(justone_path, "utf-8", function(err, data) {
				if (err) {
					return console_log("Failed to read just one channel file ID!", error=true);
				}
				
				// check if the file has an ID
				if (isInt_without_error(data, 0, 10**18) == true) {
					data = msg.member.id + "," + data; // channel ID
					user = msg.member.id +","+ msg.member.user.tag + ";";
				
					// write user to file
					create_file_then_append_data(msg, justone_members_fname, user, endl="\n");
					
					// write user to global file
					current_user = msg.member.id + "," + msg.guild.id + "," + msg.member.user.tag + ";";
					create_file_then_append_data_custom_path(msg, logging_path+"/"+justone_global_members_fname, current_user, endl="\n")
				
					// send message that user has joined
					embed_chat_reply(msg, msg.member.user.tag + " joined the just one game!");
				}
			})
			
		}
	}
})

// all user are stored in text file		done
// channel ID is stored in file			done
// choose a random word					done
// send the word to all of the users	done
// wait for users clues					done
// stores clues in file					done

// next word command
// \n\u200B

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"justone ready") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				// choose word
				//words_dataset
				fs_read.readFile("datasets/words.txt", "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read justone words database!", error=true);
					}
					
					// get directory
					member_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
					member_path = logging_path + "/" + member_dir + "/" + justone_members_fname;
					
					// read members
					fs_read.readFile(member_path, "utf-8", function(err, data2) {
						if (err) {
							return console_log("Failed to read justone members database!", error=true);
						}
						
						raw_members = data2.replace(/[\r\n]/g,"").split(";");
						member_dict = {};
						for (i=0;i<raw_members.length;i++) {
							current_user_ID = raw_members[i].split(",")[0];
							current_user_tag = raw_members[i].split(",")[1];
							if (current_user_ID != "") {
								if (member_dict[current_user_ID] == undefined) {
									member_dict[current_user_ID] = current_user_tag;
								}
							}
						}
						
						// member list
						member_list = Object.keys(member_dict);
						
						// choose word
						raw_words_dataset = data.replace(/[\r]/g,"").split("\n");
						word_list = [];
						for (i=0;i<member_list.length;i++) {
							// make sure the word is not duplicated
							current_word = raw_words_dataset[parseInt(Math.random() * 1000) % raw_words_dataset.length];
							while (word_list.indexOf(current_word) > -1) {
								current_word = raw_words_dataset[parseInt(Math.random() * 1000) % raw_words_dataset.length];
							}
							
							// add word to list
							word_list.push(current_word);
						}
						
						// write words to file
						server_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
						words_path = logging_path + "/" + server_dir + "/" + justone_words_fname;
						
						fs_write.writeFile(words_path, word_list.join(","), function(err) {
							if (err) {
								return console_log("Failed to write justone words to file!", error=true);
							}
						})
						
						// message
						embed_chat_reply(msg, "Random words have been chosen!");
						console_log("Random word chosen for Just One game on server " + msg.guild.id);
						
						// send words to users
						async function send_messages() {
							try {
								members = Object.keys(member_dict);
							
								for (i=0;i<members.length;i++) {
									await new Promise(next => {
										// embed
										embed_justone = new Discord.MessageEmbed();
										embed_justone.setColor(embed_color_chat);
										embed_justone.setAuthor("JaredBot", lion_profile_pic);
										embed_justone.setTitle("Just One");
										embed_justone.setDescription("Hi! Welcome to the game: Just One! Below is the list of you words, please reply to " + 
										"this message with a word clue for each word listed. \n\u200B\n\u200B" +
										"How to Reply? Use the `-justone clues` command, you need to give a one word clue for each of the " +
										"words listed. Make sure to separate your clues with a comma `,` if any of your clues contains spaces ` ` e.g. " +
										"multiple words, then your clues will be reject and you will be asked to give your clues again.\n\u200B" +
										"\n\u200BLets say for example your words are `apple`, `coat`, `toothpaste`, then you could reply something like this " +
										"`-justone clues fruit,clothing,tube`.\n\u200B");
										embed_justone.addFields(
											{name: "Words", value: word_list.join("\n\u200B") + "\n\u200B"},
										)
							
										// dm user
										msg.guild.members.fetch(members[i]).then(current_member => {
											console_log("Just One DM sent!");
											current_member.user.send(embed_justone).then(() => {
												next();
											})
										}).catch(err => {
											console_log("Error thrown in justone ready members.fetch! " + err, error=true);
										})
									})
								}
							} catch (err) {
								console_log("Error thrown in send_messages function! " + err, error=true);
							}
						}
						send_messages().then(() => {
							console_log("All Just One words sent to users!");
						}).catch(err => {
							console_log("Error thrown in justone ready send_messages function! " + err, error=true);
						})
					})	
				})
			} else {
				embed_error(msg, "You dont have mod/admin permissions, so can't begin the game!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"justone endgame") {
			// clear files
			clear_file(msg, justone_channel_id_fname); 	// clear channel ID
			clear_file(msg, justone_members_fname);		// clear members list
			clear_file(msg, justone_clues_fname);		// clear clues
			clear_file(msg, justone_words_fname);		// clear words
			
			// message
			embed_chat_reply(msg, "Just one game has ended! Members database cleared, type `-justone start` to start a new game!");
		}
	}
})

bot.on("message", msg => {
	if (msg.channel.type == "dm") {
		if (msg.guild != null && msg.content.slice(0, 15) == prefix[msg.guild.id]+"justone clues ") {
			clues = msg.content.slice(15, msg.content.length);
			if (clues.length > 0) {
				if (clues.indexOf(" ") == -1) {
					if (/^[ -~]+$/.test(clues) == true) {
						// read global users file
						fs_read.readFile(logging_path+"/" + justone_global_members_fname, "utf-8", function(err, data) {
							if (err) {
								return console_log("Failed to read justone clues global users file!", error=true);
							}
							
							// ---- check the users clue ----
							if (clues.indexOf(" ") == -1) {
								
							} else {
								msg.author.send("Please make sure that your clues contain no spaces, try again!");
								return false;
							}
							
							// check users clues against dict
								
							// read members
							raw_members = data.replace(/[\n\r]/g, "").split(";");
							for (i=0;i<raw_members.length;i++) {
								current_user = raw_members[i].split(",");
								if (current_user.length == 3) {
									current_user_id = current_user[0];
									current_guild_id = current_user[1];
									current_user_tag = current_user[2];
									
									// check if user is in global just one member dataset
									if (msg.channel.recipient.id == current_user_id) {
										// get server name
										current_guild = bot.guilds.cache.get(current_guild_id);
										current_guild_name = current_guild.name.replace(" ", "_");
										
										fname = logging_path +"/"+ current_guild_name + "/" + justone_clues_fname;
										data = current_user_id + "*" + current_user_tag + "*" + clues + ";";
									
										// write user clues to a file in server folder
										create_file_then_append_data_custom_path(msg, fname, data, endl="\n");
										
										// message user
										embed_clues = new Discord.MessageEmbed();
										embed_clues.setColor(embed_color_chat);
										embed_clues.setDescription("Thank you for your clues, once all of the users have sent there clues, " + 
										"they will be posted in the " + current_guild.name + " server!");
										embed_clues.setTimestamp();
										msg_channel_send(msg, embed_clues);
									}
								}
							}
						})	
					}
				}
			}
		}
	}
})

var justone_members_dict = {};
var justone_clues_dict = {};

bot.on("ready", msg => {
	// read members list, update global var
	read_file(justone_members_fname, justone_members_dict, allow_non_int=true, sep=",", remove_dupes=true);
	
	// read clues file, update global var
	read_file(justone_clues_fname, justone_clues_dict, allow_non_int=true, sep="*", remove_dupes=true);
	
})

// checks if lists are the same
function check_if_lists_same(list1, list2) {
	try {
		if (list1 != undefined && list2 != undefined) {
			if (list1.length > 0 && list2.length > 0) {
				for (i=0;i<list1.length;i++) {
					if (list2.indexOf(list1[i]) == -1) {
						return false;
					}
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch (err) {
		console_log("Error thrown in check_if_lists_same function! " + err, error=true);
	}
}

var justone_channel_IDs = {};
bot.on("ready", msg => {
	setInterval(function() {
		
		async function check() {
			try {
				server_IDs = Object.keys(justone_members_dict);
		
				for (i=0;i<server_IDs.length;i++) {
					await new Promise(next => {
						// current itteration
						async function process() {
							// read dicts
							member = justone_members_dict[server_IDs[i]];
							clues = justone_clues_dict[server_IDs[i]];
							guild = bot.guilds.cache.get(server_IDs[i]);
						
							if (member != undefined && clues != undefined) {
						
								// member
								list = [];
								for (i=0;i<member.length;i++) {
									list.push(member[i][0]);
								}
								justone_members_list = list;
						
								// clues
								list = [];
								for (i=0;i<clues.length;i++) {
									list.push(clues[i][0]);
								}
								justone_clues_list = list;
							
								// check if all the members have sent there clues
								if (check_if_lists_same(justone_members_list, justone_clues_list) == true) {
								
									// embed
									embed_clues = new Discord.MessageEmbed();
									embed_clues.setColor(embed_color_chat);
									embed_clues.setDescription("All users have responded to the DM and sent there clues, below is a list of the clues");
									embed_clues.setTitle("Just One Clues");
									embed_clues.setAuthor("JaredBot | " + guild.name, guild.iconURL());
								
									// get clues for specific word
									for (i=0;i<clues.length;i++) {
										//current_clue = clues[i][2].split(",")[i];
										current_clue_list = [];
										for (x=0;x<clues.length;x++) {
											current_clue_list.push(clues[i][2].split(",")[x]);
										}
									
										embed_clues.addField(clues[i][1], current_clue_list.join(", ") + "\n\u200B");
									
									}
								
									// get channel file path
									justone_dir = guild.name.replace(" ","_")+"_"+ guild.id;
									justone_path = logging_path + "/" + justone_dir + "/" + justone_channel_id_fname;
									
									// read channel file
									fs_read.readFile(justone_path, "utf-8", function(err, data) {
										if (err) {
											return console_log("Failed to read justone channel file!", error=true);
										}
										
										// send message to channel
										current_justone_channel = guild.channels.cache.get(data);
										if (current_justone_channel != undefined) {
											current_justone_channel.send(embed_clues);
										}
									})
								
								
									// clear clues file
								
								
								}
							
								// next itteration
								next();
							}
						} process();
					})
				}
			} catch (err) {
				console_log("Error thrown in check function! " + err, error=true);
			}
		}
		
		// run for loop
		check().then(() => {
			console_log("checked just one clues for all servers!");
		}).catch(err => {
			console_log("Error thrown in justone channel IDs! " + err, error=true);
		})
		
	}, just_one_check_clues_timeout);
})

// update the just one channel IDs, every 5 mins
bot.on("ready", msg => {
	read_file(justone_channel_id_fname, justone_channel_IDs);
	setInterval(function() {
		// read channel ID file
		read_file(justone_channel_id_fname, justone_channel_IDs);
		console_log("Updated just One channel IDs dict!");
		
		// read members list, update global var
		read_file(justone_members_fname, justone_members_dict, allow_non_int=true, sep=",", remove_dupes=true);
	
		// read clues file, update global var
		read_file(justone_clues_fname, justone_clues_dict, allow_non_int=true, sep="*", remove_dupes=true);
		
	}, just_one_channel_id_timeout);
})

// update global justone var
//bot.on("ready", msg => {
//	read_file(justone_channel_id_fname, justone_guild[msg.guild.id], allow_non_int=false, sep="", remove_dupes=false);
//	console_log("Just One channel IDs dataset read!");
//})


bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 10) == prefix[msg.guild.id]+"remind me") {
			try {
				if (msg.content.toLowerCase().indexOf(" second") > -1) {
					user_input = msg.content.toLowerCase().replace(prefix[msg.guild.id]+"remind me ","").split(" sec")[0]
					time = user_input.split(" ")[user_input.split(" ").length -1];
					reminder = msg.content.toLowerCase().replace(prefix[msg.guild.id]+"remind me ","").split(" in ").slice(0, -1).join(" in ");
			
					setTimeout(function() {
						embed_chat_reply(msg, "<@"+msg.author.id+"> Reminder! "+ reminder.split(" sec")[0]);
					}, 1000*parseInt(time), msg);
					embed_chat_reply(msg, "Ok i will remind you!");
			
				} else if (msg.content.toLowerCase().indexOf(" min") > -1) {
					user_input = msg.content.toLowerCase().replace(prefix[msg.guild.id]+"remind me ","").split(" min")[0]
					time = user_input.split(" ")[user_input.split(" ").length -1];
					reminder = msg.content.toLowerCase().replace(prefix[msg.guild.id]+"remind me ","").split(" in ").slice(0, -1).join(" in ");
			
					setTimeout(function() {
						embed_chat_reply(msg, "<@"+msg.author.id+"> Reminder! "+ reminder.split(" min")[0]);
					}, 1000*parseInt(time)*60, msg);
					embed_chat_reply(msg, "Ok i will remind you!");
				} else if (msg.content != prefix[msg.guild.id]+"remind me") {
					embed_help_reply(msg, {name: "remind me {reminder} {No. min/sec}", value: "sets a reminder, the bot will ping you in the " +
					"specified number of seconds. For example `-remind me to check steam in 10 mins`, will ping you in 10 mins telling you to " +
					"check steam.\n\u200B"});
				}
			} catch (error) {
				embed_error(msg, "Reminder failed!")
				console_log("an error was throw when running the remind me command!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,7) == prefix[msg.guild.id]+"timer ") {
			time = msg.content.toLowerCase().replace(prefix+"timer ","").split(":");
			if (time.length == 3) {
				if (parseInt(time[0]) != NaN && parseInt(time[1]) != NaN && parseInt(time[2]) != NaN) {
					secs = parseInt(time[2])
					mins = parseInt(time[1])
					hour = parseInt(time[0])
					total = secs + (mins*60) + (hour*3600)
					embed_chat_reply(msg, "Timer set for "+total+" seconds !");
				
					setTimeout(function(){
						embed_chat_reply(msg, "<@"+msg.author.id+"> Timer Finished!");
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"uptime") {
			current_time = new Date();
			run_sec = (current_time - up_time)/1000;
			formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
			console_log(run_sec, formatted);
			embed_chat_reply(msg, "The bot has been online for " + formatted + " seconds");
		}
	}
})

//stopwatch
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,11) == prefix[msg.guild.id]+"stopwatch ") {
			if (msg.content.toLowerCase().split(prefix+"stopwatch ")[1] == "start") {
				stopwatch_start = new Date();
				stopwatch_on = true;
				embed_chat_reply(msg, "Stopwatch started! type '"+prefix+"stopwatch stop' to end!");
			} 
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0,11) == prefix[msg.guild.id]+"stopwatch ") {
			if (msg.content.toLowerCase().split(prefix+"stopwatch ")[1] == "stop") {
				if (stopwatch_on == true) {
					var stopwatch_stop = new Date();
					run_sec = (stopwatch_stop - stopwatch_start)/1000;
					formatted = parseInt(run_sec / 3600) + " hours, " + parseInt(run_sec % 3600 / 60) + " mins, " + parseInt(run_sec % 3600 % 60);
					console_log(run_sec, formatted);
					embed_chat_reply(msg, "Stopwatch stopped!\nRunning time: " + formatted + " seconds!");
					stopwatch_on = false;
				} else {
					embed_chat_reply(msg, "You have not started the stopwatch, type '"+prefix+"stopwatch start' to start!");
				}
			}
		}
	}
})

// Image Only channel
bot.on("message", msg => {
	if (msg.channel.id == img_only_channel_id) {
		if (msg.content.length > 0) {
			msg.delete();
		}
	}
})

// Higher or Lower
function higher_lower_show_leaderboard(msg) {
	try {
		if (make_server_folder_file(msg, filenames_higherlower) == true) {
			// read leaderboard
			leaderboard_file = logging_path +"/"+ msg.guild.name.replace(" ","_")+"_"+ msg.guild.id +"/" + filenames_higherlower;
			fs_read.readFile(leaderboard_file, "utf-8", function(err, data) {
				if (err) {
					return console_log("Failed to read higher lower leaderboard file!", error=true);
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
					msg_channel_send(msg, embed_higherlower_leaderboard);
				} catch {
					embed_chat_reply(msg, "The scoreboard is currently blank, play a game of higher lower to add a score!");
				}
			})
		} else {
			embed_error(msg, "The Higher Lower scoreboard does not exist for your server, you can create a new scoreboard by" +
			" playing a game of higher lower, type `-higherlower` to start the game.");
		}
	} catch (err) {
		console_log("Error thrown in higher_lower_show_leaderboard function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix[msg.guild.id]+"higherlower") {
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
		} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"higherlower leaderboard") {
			higher_lower_show_leaderboard(msg);
		} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"higherlower scoreboard") {
			higher_lower_show_leaderboard(msg);
		} else if (msg.content.toLowerCase().slice(0, 13) == prefix[msg.guild.id]+"higherlower ") {
			if (msg.guild != null && msg.content.slice(13, msg.content.length).length > 0) {
				embed_error(msg, "Invalid parameter, please type `-higherlower` to start the game, "+
				"or if you would like to see the scoreboard type `-higherlower scoreboard` or `-higherlower leaderboard`!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
					var leaderboard_file = logging_path +"/"+ msg.guild.name.replace(" ","_")+"_"+ msg.guild.id +"/" + filenames_higherlower;
					
					// read leaderboard
					fs_read.readFile(leaderboard_file, "utf-8", function(err, data) {
						if (err) {
							return console_log("Failed to read higher lower leaderboard file!", error=true);
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
						fs_write.writeFile(leaderboard_file, higher_lower_output, function(err) {
							if (err) {
								return console_log("Failed to write higher lower score to file!", error=true);
							}
							console_log("wrote higherlower score to scoreboard!");
						})
					})
				}
			}
		}
	}
})

// TicTacToe
function draw_board(msg) {
	try {
		if (TicTacToe_draw_board == true) {
			embed_chat_reply(msg, "```   A   B   C\n" +
			"1  "+n[0][0]+" | "+n[0][1]+" | "+n[0][2] + "\n  -----------\n" +
			"2  "+n[1][0]+" | "+n[1][1]+" | "+n[1][2] + "\n  -----------\n" +
			"3  "+n[2][0]+" | "+n[2][1]+" | "+n[2][2] + "```");
		}
	} catch (err) {
		console_log("Error thrown in draw_board function! " + err, error=true);
	}
}

function winning_condition(chk, msg) {
	try {
		TicTacToe_start_game = false;
		n = [[".", ".", "."], [".", ".", "."],[".", ".", "."]];
		setTimeout(function(){
			msg_channel_send(msg, ["You Win!", "I win!"]["XO".indexOf(chk)]);
		}, 1000);
	} catch (err) {
		console_log("Error thrown in winning_condition function! " + err, error=true);
	}
}

function condition_draw(msg) {
	try {
		current = "";
		for (i=0;i<3;i++) {
			for (ii=0;ii<3;ii++) {
				current += n[i][ii]
			}
		} if (current.indexOf(".") > -1) {
			msg_channel_send(msg, "Draw!");
			TicTacToe_start_game = false;
		}
	} catch (err) {
		console_log("Error thrown in condition_draw function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && msg.content == prefix[msg.guild.id]+"ttt") {
		TicTacToe_start_game = true;
		draw_board(msg);
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (TicTacToe_start_game == true) {
			if (msg.content.length == 2 ) {
				if ("abc".indexOf(msg.content.toLowerCase()[0]) > -1 && "123".indexOf(msg.content.toLowerCase()[1]) > -1 ) {
					console_log(msg.content);
					// user place
					X = "abc".indexOf(msg.content.toLowerCase()[0]);
					Y = "123".indexOf(msg.content.toLowerCase()[1]);
					if (n[Y][X] == "X" || n[Y][X] == "O") {
						embed_chat_reply(msg, "This spot is already taken!");
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
							console_log("bot place taken!");
							count += 1;
							if (count > 99) {
								console_log("bot failed to place!");
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

// covid
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix[msg.guild.id]+"covid") {
			// get html
			request("https://www.worldometers.info/coronavirus/", {
				headers: {
					"User-Agent": user_agent
				},
				body: "",
				method: "GET"
			}, (err, res, html) => {
				if (res.statusCode == 200) {
					// process HTML
					cases = html.split('<div class="maincounter-number">')[1].split('</span>')[0].split('#aaa">')[1];
					deaths = html.split('<h1>Deaths:</h1>')[1].split('</span>')[0].split('<span>')[1];
					recovered = html.split('<h1>Recovered:</h1>')[1].split('</span>')[0].split('<span>')[1];
					updated = html.split('color:#999; margin-top:5px; text-align:center">')[1].split('</div>')[0];
					
					infected_current = html.split('<div class="number-table-main">')[1].split('</div>')[0];
					infected_mild = html.split('<span class="number-table" style="color:#8080FF">')[1].split('</span>')[0];
					infected_serious = html.split('<span class="number-table" style="color:red ">')[1].split('</span>')[0];
					
					closed_cases = html.split('Closed Cases</span>')[1].split('<div class="number-table-main">')[1].split('</div>')[0];
					closed_recovered = html.split('Closed Cases</span>')[1].split('<span class="number-table" style="color:#8ACA2B">')[1].split('</span>')[0];
					closed_deaths = html.split('Closed Cases</span>')[1].split('<span class="number-table">')[1].split('</span>')[0];
					
					// embed
					embed_covid = new Discord.MessageEmbed();
					embed_covid.setColor(embed_color_chat);
					embed_covid.setTitle("Coronavirus Statistics");
					embed_covid.setDescription("This counter was last updated on " + updated  + "\n\u200B");
					embed_covid.addFields(
						{name: "Cases", value: "[" + cases + "]("+webserver_root_address+")\n\u200B", inline: true},
						{name: "Deaths", value: "[" + deaths + "]("+webserver_root_address+")\n\u200B", inline: true},
						{name: "Recovered", value: "[" + recovered + "]("+webserver_root_address+")\n\u200B", inline: true},
						{name: "Active Cases", value: infected_current + "\n\u200B", inline: true},
						{name: "Mild", value: infected_mild + "\n\u200B", inline: true},
						{name: "Critical", value: infected_serious + "\n\u200B", inline: true},
						{name: "Closed Cases", value: closed_cases + "\n\u200B", inline: true},
						{name: "Recovered", value: closed_recovered + "\n\u200B", inline: true},
						{name: "Dead", value: closed_deaths + "\n\u200B", inline: true}
					)
					
					// send message
					msg.channel.send(embed_covid);
					
				} else {
					console_log("Failed to get covid status, server return status code " + res.statusCode + "!", error=true);
				}
			})
		}
	}
})

// sissyvac
bot.on("message", msg => {
	if (new Date() == new Date("2020-12-20")) {
		msg_channel_send(msg, ":sissyvacuum:");
	}
})

// flip a coin
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"flipcoin") {
			coin = [flip_coin_tails, flip_coin_heads][parseInt(Math.random() * 10) % 2];
			name = coin[0].toUpperCase() + coin.slice(1,coin.length).replace(flip_coin_file_extension, "") + "!";
			embed_image(msg, webserver_root_address+"img/src/coins/" + coin, name);
			console_log("Coin fliped for server " + msg.guild.id);
		}
	}
})

// roll a dice
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix[msg.guild.id]+"roll") {
			num = (parseInt(Math.random() * 100) % 6)+1;
			embed_image(msg, webserver_root_address+"img/src/dice/dice" + num + ".png", num);
			console_log("Dice rolled for server " + msg.guild.id);
		}
	}
})

// text memes
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix[msg.guild.id]+"killjaredbot") {
			if (msg.author.id == "364787379518701569") {
				fs_read.readFile(text_meme_thef, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read text meme file!", error=true);
					}
					embed_chat_reply(msg, data);
				})
			}
		}
	}
})

// steam info
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 11) == prefix[msg.guild.id]+"steaminfo ") {
			
			// get user data
			async function get_user_data(msg, callback) {
				current_user_id = msg.content.slice(11, msg.content.length);
				if (isInt_without_error(current_user_id, 0, 10**20) == true) {
					get_html("https://steamcommunity.com/profiles/" + current_user_id + "?xml=1", function(html) {
						return callback(html);
					})
				} else {
					get_html("https://steamcommunity.com/id/" + current_user_id + "?xml=1", function(html) {
						if (html.indexOf("The specified profile could not be found.") == -1) {
							return callback(html);
							
						} else {
							embed_error(msg, "Could not find user!");
							return false;
						}
					})
				}
			}
			
			function format_user_data(elm) {
				text_replace = [['<![CDATA[', ''], ['<a class="bb_link" href="', ''], ['https://steamcommunity.com/linkfilter/?url=', ''], 
				['" target="_blank" rel="noreferrer" >', ''], ['</br>', ''], ['<br>', '\n\u200B'], ['</a>', ''], [']]>', ''], ['&nbsp;', ''], 
				['&lt;', '<'], ['&gt;', '>'], ['&amp;', '&'], ['&quot;', '"'], ['&apos;', "'"], ['&cent;', '¢'], ['&pound;', '£'], 
				['&yen;', '¥'], ['&euro;', '€'], ['&copy;', '©'], ['&reg;', '®']];
				
				current_text = elm;
				for (i=0;i<text_replace.length;i++) {
					current_text = current_text.split(text_replace[i][0]).join(text_replace[i][1]);
				}
				return current_text;
			}
			
			// get stats
			get_user_data(msg, function(xml) {
				SteamID64 = format_user_data(xml.split('<steamID64>')[1].split('</steamID64>')[0]);
				SteamID = format_user_data(xml.split('<steamID>')[1].split('</steamID>')[0]);
				CustomURL = format_user_data(xml.split('<customURL>')[1].split('</customURL>')[0]);
				OnlineState = format_user_data(xml.split('<onlineState>')[1].split('</onlineState>')[0]);
				PrivacyState = format_user_data(xml.split('<privacyState>')[1].split('</privacyState>')[0]);
				VisibilityState = format_user_data(xml.split('<visibilityState>')[1].split('</visibilityState>')[0].replace("3", "Public").replace("2", "Friends Only").replace("1", "Private"));
				VacBanned = format_user_data(xml.split('<vacBanned>')[1].split('</vacBanned>')[0].replace("0", "No").replace("1", "Yes"));
				TradeBanState = format_user_data(xml.split('<tradeBanState>')[1].split('</tradeBanState>')[0]);
				IsLimitedAccount = format_user_data(xml.split('<isLimitedAccount>')[1].split('</isLimitedAccount>')[0].replace("0", "No").replace("1", "Yes"));
				MemberSince = format_user_data(xml.split('<memberSince>')[1].split('</memberSince>')[0]);
				UserLocation = format_user_data(xml.split('<location>')[1].split('</location>')[0]);
				RealName = format_user_data(xml.split('<realname>')[1].split('</realname>')[0]);
				Summary = format_user_data(xml.split('<summary>')[1].split('</summary>')[0]);
				profile_pic = format_user_data(xml.split('<avatarFull>')[1].split('</avatarFull>')[0].replace(/ /g, ''));
				
				// remove double links from summary
				for (i=0;i<5;i++) {
					http_index = Summary.indexOf("https");
					current_link = Summary.slice(http_index, Summary.slice(http_index).indexOf(" ") + http_index);
					link_split = current_link.split("https");
					if (link_split.length == 3) {
						if (link_split[1] == link_split[2]) {
							Summary = Summary.replace(current_link, "[{HT}"+link_split[1]+"]({HT}"+link_split[1]+")");
						}
					}
				}
				
				// embed
				embed_steamdata = new Discord.MessageEmbed();
				embed_steamdata.setTitle(SteamID);
				embed_steamdata.setColor(embed_colour_info);
				embed_steamdata.setURL("https://steamcommunity.com/profiles/" + SteamID64);
				embed_steamdata.setThumbnail(profile_pic);
				embed_steamdata.setAuthor(SteamID, profile_pic);
				embed_steamdata.addFields(
					{name: "Steam ID", value: SteamID64 + "\n\u200B", inline: true},
					{name: "Steam Name", value: SteamID + "\n\u200B", inline: true},
					{name: "Custom URL", value: CustomURL + "\n\u200B", inline: true},
					{name: "Online Status", value: OnlineState + "\n\u200B", inline: true},
					{name: "Visability", value: VisibilityState + "\n\u200B", inline: true},
					{name: "Privacy", value: PrivacyState + "\n\u200B", inline: true},
					{name: "VAC Banned", value: VacBanned + "\n\u200B", inline: true},
					{name: "Trade Banned", value: TradeBanState + "\n\u200B", inline: true},
					{name: "Limmited Account", value: IsLimitedAccount + "\n\u200B", inline: true},
					{name: "Joined Steam", value: MemberSince + "\n\u200B", inline: true},
					{name: "Location", value: UserLocation + "\n\u200B", inline: true},
					{name: "Real Name", value: RealName + "\n\u200B", inline: true},
					{name: "Summary", value: Summary.replace(/{HT}/g, "https") + "\u200B"},
				)
				
				// send message
				embed_steamdata.setTimestamp();
				msg_channel_send(msg, embed_steamdata);
			})
		}
	}
})

// steam ladder stats
// to do
// - accept custom steam IDs and profile URLs
// - have seperate smaller menus for `sl profile` and `sl value`
// - show most played game

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 4) == prefix[msg.guild.id]+"sl ") {
			sl_url = "https://steamladder.com/profile/";
			avatar_url = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/";
			game_badge_url = "https://static.steamladder.com/static/img/game_collector/";
			
			// check for custom ID
			async function get_user_id(msg, callback) {
				current_user_id = msg.content.slice(4, msg.content.length);
				if (isInt_without_error(current_user_id, 0, 10**20) == false) {
					get_html("https://steamcommunity.com/id/" + current_user_id + "?xml=1", function(html) {
						if (html.indexOf("The specified profile could not be found.") == -1) {
							current_user_id = html.split('<steamID64>')[1].split('</steamID64>')[0];
							return callback(current_user_id);
							
						} else {
							embed_error(msg, "Could not find user!");
							return false;
						}
					})
				} else {
					return callback(current_user_id);
				}
			}
			
			// check for error
			function e(html, elms) {
				try {
					current_elm = html;
					for (n=0;n<elms.length;n++) {
						current_elm = current_elm.split(elms[n][0])[elms[n][1]];
					}
					return current_elm;
				} catch {
					return "?";
				}
			}
			
			get_user_id(msg, function(current_user_id) {
				if (current_user_id != false) {
					// steam ID
					if (isInt_without_error(current_user_id, 0, 10**20) == true) {
						// get html
						get_html(sl_url +current_user_id, function(html) {
							try {
								// process HTML
								player_name = html.split('<div class="long-name" itemprop="name">')[1].split("</div>")[0];
						
								// profile info
								player_name = e(html, [['<div class="long-name" itemprop="name">', 1], ["</div>", 0]]);
								Avatar_URL = e(html, [['<div class="profile-header">', 1], ['class="steam-avatar">', 0], ['<img itemprop="image" src="', 1]]).replace(/[ \n]/g, "");
								Custom_ID = e(html, [['<th scope="row">Steam ID</th>', 1], ["</td>", 0], [">", 1]]).replace(/[ \n]/g, "");
								Reputation = e(html, [['<th scope="row">Reputation</th>', 1], ["</td>", 0], [">", 1]]).replace(/[ \n]/g, "");
								Public = e(html, [['<i class="material-icons', 1], ["</i>", 0]]).replace(/[ \n]/g, "");
								Country = e(html, [['<th scope="row">Country</th>', 1], ["</a>", 0], ['">', 1]]).replace(/[ \n]/g, "");
								Years = e(html, [['<th scope="row">Steam years ', 1], ["</td>", 0], ["<td>", 1]]).replace(/[ \n]/g, "");
								Donator = e(html, [['<th scope="row">Donator</th>', 1], ["</i>", 0], ['">', 1]]).replace(/[ \n]/g, "");
								Friends = e(html, [['<th scope="row">Friends</th>', 1], ["</a>", 0], ['">', 1]]).replace(/[ \n]/g, "");
								
								// level stats
								Est_cost = e(html, [['<h5>Level stats</h5>', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "");
								Next_lvl_cost = e(html, [['<th scope="row">Next Level Cost ', 1], ["</a>", 0], ['blank">', 1]]).replace(/[ \n]/g, "");
								world_lvl = e(html, [['<th scope="row">World Rank</th>', 1], ["</a>", 0], ['xp/">', 1]]).replace(/[ \n]/g, "");
								region_lvl = e(html, [['<th scope="row">Region Rank</th>', 1], ["</span>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ") + ")";
								country_lvl = e(html, [['<th scope="row">Country Rank</th>', 1], ["</span>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ") + ")";
								best_lvl = e(html, [['<div class="long">World</div>', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ");
						
								// playtime stats
								playtime = e(html, [['<th scope="row">Total Playtime</th>', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "").replace("hours", " hours");
								avg_playtime = e(html, [['<th scope="row">Avg. Playtime ', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "").replace("min", " min");
								world_playtime = e(html, [["<h5>Playtime stats</h5>", 1], ['<th scope="row">World Rank</th>', 1], ["</td>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ").replace("</span>","");
								region_playtime = e(html, [["<h5>Playtime stats</h5>", 1], ['<th scope="row">Region Rank</th>', 1], ["</td>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ").replace("</span>","");
								country_playtime = e(html, [["<h5>Playtime stats</h5>", 1], ['<th scope="row">Country Rank</th>', 1], ["</td>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ").replace("</span>","");
								best_playtime = e(html, [["<h5>Playtime stats</h5>", 1], ['<div class="long">World</div>', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "");
						
								// game stats
								game_badge = game_badge_url + e(html, [['src="'+game_badge_url, 1], [">", 0]]);
								games_owned = e(html, [['class="game-text-stats"', 1], ["</div>", 0]]).replace(/[ \n>]/g, "").replace("Games"," Games");
								Est_game_cost = e(html, [['<h5>Games stats</h5>', 1], ['<th scope="row">Estimated Cost ', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "");
								world_games = e(html, [["<h5>Games stats</h5>", 1], ['<th scope="row">World Rank</th>', 1], ["</td>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ").replace("</span>","");
								region_games = e(html, [["<h5>Games stats</h5>", 1], ['<th scope="row">Region Rank</th>', 1], ["</td>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ").replace("</span>","");
								country_games = e(html, [["<h5>Games stats</h5>", 1], ['<th scope="row">Country Rank</th>', 1], ["</td>", 0], ['/">', 1]]).replace(/[ \n]/g, "").replace('</a><spanclass="percentage">'," ").replace("</span>","");
								best_games = e(html, [["<h5>Games stats</h5>", 1], ['<div class="long">World</div>', 1], ["</td>", 0], ['<td>', 1]]).replace(/[ \n]/g, "");
						
								// format
								total_cost = "$" + String(parseFloat(Est_cost.replace(/[$,]/g,"")) + parseFloat(Est_game_cost.replace(/[$,]/g,""))).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								Public = Public.replace("check_circle", "yes").replace("cancel", "no").replace('pos">', "").replace('neg">', "");
								Donator = Donator.replace("cancel", "no");
								avg_playtime = avg_playtime.replace("minutes", "mins");
						
								if (Country.indexOf('Steamyears<iclass="material-iconsinfo"data-') > -1) {
									Country = "Not Specified";
								}
								if (Friends.indexOf('Status</th><tdclass="td_status') > -1) {
									Friends = "Private";
								}
						
								// embed
								embed_sl = new Discord.MessageEmbed();
								embed_sl.setColor(embed_color_chat);
								embed_sl.setAuthor(player_name + "'s Steam Ladders Stats", Avatar_URL, sl_url+current_user_id);
								embed_sl.setThumbnail(encodeURI(Avatar_URL));
								embed_sl.addFields(
									{name: "Level Value", value: "["+Est_cost+"](https://jaredbot.uk/)\n\u200B", inline: true},
									{name: "\n\u200B", value: "\n\u200B", inline: true},
									{name: "Games Value", value: "["+Est_game_cost+"](https://jaredbot.uk/)\n\u200B", inline: true},
									{name: "Total Value", value: "["+total_cost+"](https://jaredbot.uk/)\n\u200B", inline: true},
									{name: "\n\u200B", value: "\n\u200B", inline: true},
									{name: "Games Owned", value: "["+games_owned+"](https://jaredbot.uk/)\n\u200B", inline: true},
							
									{name: "Profile", value: "Name: " + player_name + "\nCustom ID: " + Custom_ID + "\nReputation: " + Reputation +
										"\nPublic: " + Public + "\nCountry: " + Country + "\nAccount Age: " + Years + "\nSL Donator: " + Donator +
										"\nFriends: " + Friends + "\n\u200B", inline: true},
									{name: "\n\u200B", value: "\n\u200B", inline: true},
									{name: "Games", value: "World Rank: " + world_games + "\nRegion Rank: " + region_games + "\nCountry Rank: " + 
										country_games + "\nBest World Rank: " + best_games + "\n\u200B", inline: true},
									{name: "Level", value: "Level Value: " + Est_cost + "\nNext Level Cost: " + Next_lvl_cost + "\nWorld: " +
										world_lvl + "\nRegion: " + region_lvl + "\nCountry: " + country_lvl + "\nBest World Rank: " + 
										best_lvl + "\n\u200B", inline: true},
									{name: "\n\u200B", value: "\n\u200B", inline: true},
									{name: "Playtime", value: "Total Playtime: " + playtime + "\nAvg Playtime: " + avg_playtime + "\nWorld: " +
										world_playtime + "\nRegion: " + region_playtime + "\nCountry: " + country_playtime + "\nBest Playtime: " +
										best_playtime + "\n\u200B", inline: true},
								)
								embed_sl.setTimestamp();
								embed_sl.setFooter(current_user_id);
								msg_channel_send(msg, embed_sl);
							} catch (err) {
								embed_error(msg, "Failed to get user info!");
								console_log("Failed to get steam ladder info! " + err, error=true);
							}
						})
					}
				} else {
					embed_error(msg, "You must enter in the Users steam64 ID");
				}
			})
		}
	}
})

// next steam sale
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix[msg.guild.id]+"steamsale") {
			get_html("https://steamdb.info/sales/history/", html => {
				// get data
				seconds = html.split('<span id="js-sale-countdown" role="tab" data-target="')[1].split('"')[0] - Date.now();
				sale_name = html.split('<span class="sale-name">')[1].split('</h')[0].replace('</span>', "");
				sale_name = "[" + sale_name.replace(/\n/g, "") + "]("+webserver_root_address+")";
				days = parseInt(seconds / 86400000);
				hours = parseInt((seconds % 86400000) / 3600000);
				mins = parseInt((seconds % 3600000) / 60000);
				secs = parseInt((seconds % 60000) / 1000);
				
				console.log([sale_name]);
				
				// embed
				embed_steamsale = new Discord.MessageEmbed();
				embed_steamsale.setColor(embed_color_chat);
				embed_steamsale.setTitle("Next Steam sale is in...");
				embed_steamsale.addFields(
					{name: "" +days + " days, " + hours + " hours, " + mins + " mins, " + secs + " seconds!", value: sale_name + "\u200B"},
				)
				embed_steamsale.setTimestamp();
				msg_channel_send(msg, embed_steamsale);
			})
		}
	}
})

// change prefix
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == "-prefix " || msg.content.slice(0, 8) == prefix[msg.guild.id]+"prefix ") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				new_prefix = msg.content.slice(8, msg.content.length);
				if (new_prefix.length == 1) {
					if (ASCII.indexOf(new_prefix) > -1) {
						old_prefix = prefix[msg.guild.id];
						prefix[msg.guild.id] = new_prefix;
						create_file_then_append_data(msg, custom_prefix_filename, prefix[msg.guild.id], endl="", overwrite=true);
						embed_chat_reply(msg, "["+tag_tag_output+"] Prefix changed from `" + old_prefix + "` to `" + prefix[msg.guild.id] + "`!");
						console_log("Prefix changed from '" + old_prefix + "' to '" + "' for " + msg.guild.id, error=false, mod=true);
					} else {
						embed_error(msg, "Prefix must be an ASCII character!");
					}
				} else {
					embed_error(msg, "Prefix must be a single character!");
				}
			} else {
				embed_error(msg, "You need manage messages permission to change the bots prefix!");
			}
		}
	}
})

// show current prefix
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"prefix") {
			embed_chat_reply(msg, "JaredBot's prefix is `" + prefix[msg.guild.id] + "`");
			show_prefix = false;
			setTimeout(function(){
				show_prefix = true;
			}, anti_spam_delay);
		}
	}
})

// read custom prefixs
var custom_prefix_filename = "prefix.txt";
bot.on("ready", msg => {
	// get prefix
	read_file(custom_prefix_filename, prefix, allow_non_int=true, sep="", remove_dupes=false, single_item=true);
})

// check for blank prefix
bot.on("message", msg => {
	if (prefix[msg.guild.id] == undefined) {
		create_file_then_append_data(msg, custom_prefix_filename, "-", endl="", overwrite=true);
		prefix[msg.guild.id] = "-";
		console_log("Set Deafult prefix for server " + msg.guild.name + " !", error=false, mod=true);
	}
})

// get user info
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"userinfo") {
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
				guild = member;
				if (avatar_url == null) {
					avatar_url = webserver_root_address+"img/src/blank_avatar.png";
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
				guild = msg.member;
			}
			
			// check for non-nitro user
			if (boosting_since.indexOf("1970") > -1) {
				boosting_since = "Not Boosting";
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
			msg_channel_send(msg, embed_user_info);
		}
	}
})

// server info
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"serverinfo") {
			creation_date = msg.guild.joinedTimestamp;
			
			// get roles
			roles = [];
			msg.guild.roles.cache.forEach(role => {
				roles.push(role.name);
			})
			total_roles = roles.length;
			roles_list = roles.join(", ").replace("@everyone","").slice(0, 1020);
			if (roles_list.length == 1020) {
				roles_list += "...";
			}
			
			// member counts
			member_count = msg.guild.members.cache.filter(member => !member.user.bot).size;
			bot_count = msg.guild.members.cache.filter(member => member.user.bot).size;
			total_members = msg.guild.memberCount;
			
			// status
			online = msg.guild.members.cache.filter(member => member.user.presence.status == "online").size;
			offline = msg.guild.members.cache.filter(member => member.user.presence.status == "offline").size;
			idle = msg.guild.members.cache.filter(member => member.user.presence.status == "idle").size;
			
			// channels
			text_channels = msg.guild.channels.cache.filter(channel => channel.type == "text").size;
			voice_channels = msg.guild.channels.cache.filter(channel => channel.type == "voice").size;
			total_channels = text_channels + voice_channels;
			
			// embed
			embed_serverinfo = new Discord.MessageEmbed();
			embed_serverinfo.setColor(embed_color_chat);
			embed_serverinfo.setTitle("Server Info");
			embed_serverinfo.setDescription("stats for " + msg.guild.name);
			embed_serverinfo.setThumbnail(msg.guild.iconURL());
			embed_serverinfo.setTimestamp();
			embed_serverinfo.addFields(
				{name: "Total Members", value: "["+total_members+"]("+webserver_root_address+")\n\u200B", inline: true},
				{name: "Total Channels", value: "["+total_channels+"]("+webserver_root_address+")\n\u200B", inline: true},
				{name: "Total Roles", value: "["+total_roles+"]("+webserver_root_address+")\n\u200B", inline: true},
				{name: "Member Count", value: "Members: ["+member_count+"]("+webserver_root_address+")\n\u200BBot Count: ["+bot_count+"]("+webserver_root_address+")\n\u200B", inline: true},
				{name: "Status", value: "Online: ["+online+"]("+webserver_root_address+")\n\u200BOffline: ["+offline+"]("+webserver_root_address+")\n\u200BIdle: ["+idle+"]("+webserver_root_address+")\n\u200B", inline: true},
				{name: "Channels", value: "Text Channels: ["+text_channels+"]("+webserver_root_address+")\n\u200BVoice Channels: ["+voice_channels+"]("+webserver_root_address+")\n\u200B", inline: true},
				{name: "Roles", value: roles_list + "\n\u200B", inline: false},
			)
			msg_channel_send(msg, embed_serverinfo);
		}
	}
})

// role info
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"roleinfo") {
			// get role ID
			if (msg.content.indexOf("<@&") > -1) {
				role_id = msg.content.split("<@&")[1].split(">")[0];
			} else if (msg.content.split(" ").length == 2) {
				role_id = msg.content.split(" ")[1];
			} else {
				embed_error(msg, "The role could not be found, please specify a mentionable role, e.g. `-roleinfo @member`, be aware this will " +
				"ping all members with the specified role, to avoid this you can enter a role ID instead `-roleinfo {ID}`");
				return false;
			}
			
			// role
			role = msg.guild.roles.cache.get(role_id);
			members = role.members.map(member => member.user.tag);
			
			// member list
			if (members.join(", ").length > 1000) {
				member_list = members.join(", ").slice(0, 1000) + "...";
			} else {
				member_list = members.join(", ");
			}
			
			// creation date for role
			
			// embed
			embed_role = new Discord.MessageEmbed();
			embed_role.setColor(embed_color_chat);
			embed_role.setDescription("Information for the "+role.name+" on the "+msg.guild.name+" server!");
			embed_role.setTitle("Role Info");
			embed_role.setThumbnail(msg.guild.iconURL());
			embed_role.setTimestamp();
			embed_role.addFields(
				{name: "Name", value: role.name+"\n\u200B", inline: true},
				{name: "\n\u200B", value: "\n\u200B", inline: true},
				{name: "Total Members", value: members.length, inline: true},
				
				{name: "ID", value: role.id+"\n\u200B", inline: true},
				{name: "Color", value: "#"+role.color.toString(16)+"\n\u200B", inline: true},
				{name: "Mentionable", value: role.mentionable+"\n\u200B", inline: true},
				
				{name: "Managed", value: role.managed+"\n\u200B", inline: true},
				{name: "Deleted", value: role.deleted+"\n\u200B", inline: true},
				{name: "Index", value: role.rawPosition+"\n\u200B", inline: true},
				
				{name: "Members", value: member_list+"\n\u200B", inline: false},
			)
			msg_channel_send(msg, embed_role);
		}
	}
})

// networking
function check_string(str, chrList) {
	try {
		returnType = false;
		for (i=0;i<chrList.length;i++) {
			if (str.indexOf(chrList[i]) > -1) {
				returnType = true;
			}
		}
		return returnType;
	} catch (err) {
		console_log("Error thrown in check_string function! " + err, error=true);
	}
}

port_scan_results = {};
function check_port(msg, port, host, reply=true) {
	try {
		// declare array
		url = "https://en.wikipedia.org/wiki/Open_port";
		if (port_scan_results[msg.guild.id] == undefined) {
			port_scan_results[msg.guild.id] = {};
			port_scan_results[msg.guild.id]["open"] = [];
			port_scan_results[msg.guild.id]["closed"] = [];
		}
	
		// check port
		return new Promise(function(resolve, reject) {
			// timeout
			timer = setTimeout(function() {
				reject("timeout");
				s.end();
			}, 2000);
	
			// connection
			s = net.createConnection(port, host, function() {
				clearTimeout(timer);
				resolve();
				s.end();
			})
	
			// error
			s.on("error", function(err) {
				clearTimeout(timer);
				reject(err);
			})
	
		// result
		}).then(function(promise) {
			if (reply == true) {
				embed_chat_reply_header(msg, "port " + port + " is [**open**]("+url+") on " + host + "!", "Port Scan", pfp=true);
			} else {
				port_scan_results[msg.guild.id]["open"].push(port);
			}
		}).catch(function(err) {
			if (reply == true) {
				embed_chat_reply_header(msg, "port " + port + " is [**closed**]("+url+") on " + host + "!", "Port Scan", pfp=true);
			} else {
				port_scan_results[msg.guild.id]["closed"].push(port);
			}
		})
	} catch (err) {
		console_log("Error thrown in check_port function! " + err, error=true);
	}
}

// geoip
function geoip_lookup(msg) {
	try {
		ip = msg.content.slice(7, msg.content.length);
		url = "https://www.ultratools.com/tools/geoIpResult?&ipAddress=" + ip;
	
		// check if IP is valid
		if (check_string(ip, " abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-={}[]|;':<>,\/") == true) {
			embed_error(msg, "Invalid IP address, please enter a valid IPv4 address, for example `-geoip 216.58.205.46`!");
			return false;
		}
	
		// get html
		request(url, {
			headers: {
				"User-Agent": user_agent
			},
			body: "",
			method: "GET"
		}, (err, res, html) => {
			if (res.statusCode == 200) {
				// check for error
				if (html.indexOf('<strong>Sorry, there was a problem.</strong>') > -1) {
					embed_error(msg, "The server returned invalid IP address error!");
					return false;
				}
			
				// process HTML
				table = html.split('class="tool-results-container"')[1].split('<iframe')[0].replace(/[\n\r\t ]/g, "");
				tag_count = table.split('</span></div>').length;
				output = {};
			
				for (i=0;i<tag_count;i++) {
					if (table.split('class="label">').length > 1) {
						row = table.split('class="label">')[1].split('</span></div>')[0].replace('</span><spanclass="value">', '');
						table = table.slice(table.indexOf('</div>')+6, table.length);
						row = row.replace("&nbsp;", "").split(":");
						output[row[0]] = row[1];
					}
				}
			
				// check for error
				if (output.length == 0) {
					embed_error(msg, "Failed to get Geoip information for " +ip+"!");
					return false;
				}
			
				// google maps url
				google_maps = "https://www.google.com/maps/search/?api=1&query=" + output.Latitude + "," + output.Longitude;
			
				// embed
				embed_whois = new Discord.MessageEmbed();
				embed_whois.setColor(embed_color_chat);
				embed_whois.setTitle("WhoIS " + ip);
				embed_whois.setDescription("The Geo-location and country lookup tool performs real-time lookups for an IP to return you " +
				"the geographical location of the specific IP. Here is the location information for ["+ip+"]("+google_maps+")\n\u200B");
				embed_whois.addFields(
					{name: "Continent", value: output.Continent+"\u200B", inline: true},
					{name: "Country", value: output.Country+"\u200B", inline: true},
					{name: "Country Code", value: output.CountryCode+"\u200B", inline: true},
					{name: "Country CF", value: output.CountryCF+"\u200B", inline: true},
					{name: "Region", value: output.Region+"\u200B", inline: true},
					{name: "State", value: output.State+"\u200B", inline: true},
					{name: "State Code", value: output.StateCode+"\u200B", inline: true},
					{name: "State CF", value: output.StateCF+"\u200B", inline: true},
					{name: "DMA", value: output.DMA+"\u200B", inline: true},
					{name: "MSA", value: output.MSA+"\u200B", inline: true},
					{name: "City", value: output.City+"\u200B", inline: true},
					{name: "Postal Code", value: output.PostalCode+"\u200B", inline: true},
					{name: "Timezone", value: output.Timezone+"\u200B", inline: true},
					{name: "Area Code", value: output.AreaCode+"\u200B", inline: true},
					{name: "City CF", value: output.CityCF+"\u200B", inline: true},
					{name: "Latitude", value: output.Latitude+"\n\u200B", inline: true},
					{name: "Longitude", value: output.Longitude+"\n\u200B", inline: true},
					{name: "\n\u200B", value: "\n\u200B", inline: true}
				)
				embed_whois.setTimestamp();
				msg_channel_send(msg, embed_whois);
			
			}
		})
	} catch (err) {
		console_log("Error thrown in geoip_lookup function! " + err, error=true);
	}
}

var execute_cooldown = {};
function execute_cmd(msg, cmd_name, msg_content) {
	try {
		// cooldown
		if (execute_cooldown[msg.guild.id] == undefined) {
			execute_cooldown[msg.guild.id] = false;
		}
	
		// command
		if (execute_cooldown[msg.guild.id] == false) {
			// send initial message
			execute_cooldown[msg.guild.id] = true;
			command = msg_content.slice(cmd_name.length+2, msg_content.length);
			msg_channel_send(msg, "Executing " + cmd_name + " please wait!").then(reply_msg => {
				// run command
				if (check_string(command, "!@#$%^&*()_+-=;:'|,\/<>") == false) {
					exec(cmd_name + " " + command, (err, stdout, stderr) => {
						if (stdout != undefined) {
							try {
								if (reply_msg != undefined) {
									reply_msg.delete();
								}
								execute_cooldown[msg.guild.id] = false;
								stdout = stdout.replace(/[\r\t\b\f]/g, "");
								embed_chat_reply_header(msg, stdout.slice(0, 2048), cmd_name + " Results", pfp=true);
							} catch (err) {
								console_log("Error thrown in execute_cmd function! " + err, error=true);
							}
						}
					})
				} else {
					embed_error(msg, "Failed to run, forbidden characters detected in command!");
					execute_cooldown[msg.guild.id] = false;
					reply_msg.delete();
				}
			}).catch(err => {
				console_log("Error thrown in execute_cmd msg_channel_send! " + err, error=true);
			})
		} else {
			embed_error(msg, "Please wait for the first command to finish executing before issuing another");
		}
	} catch (err) {
		console_log("Error thrown in execute_cmd function! " + err, error=true);
	}
}

function help_network_cmd(msg) {
	try {
		embed_network = new Discord.MessageEmbed();
		embed_network.setTitle("Help Networking commands");
		embed_network.setColor(embed_color_chat);
		embed_network.setAuthor("JaredBot | Command list", lion_profile_pic);
		embed_network.setThumbnail(lion_profile_pic);
		embed_network.setTimestamp();
		embed_network.addFields (
			{name: "Ping", value: "`-ping {host/IP}` test network connection to a server.\n\u200B", inline: true},
			{name: "Nslookup", value: "`-nslookup {host/IP}` gets Name Server information.\n\u200B", inline: true},
			{name: "Tracert", value: "`-tracert {host/IP}` trace packet route through network.\n\u200B", inline: true},
			{name: "Pathping", value: "`-pathping {host/IP}` trade packet route and ping node.\n\u200B", inline: true},
			{name: "Ipconfig", value: "`-ipconfig` show IP address of network adapters.\n\u200B", inline: true},
			{name: "Whois", value: "`-whois {host/IP}` lookup registered info for domain.\n\u200B", inline: true},
			{name: "Speedtest", value: "`-speedtest` measures upload/download speed of JaredBot servers.\n\u200B", inline: true},
			{name: "Geoip", value: "`-geoip {IP}` gets geographical location data for IP.\n\u200B", inline: true},
			{name: "Port Scan", value: "`-help port`.\n\u200B", inline: true}
		)
		msg_channel_send(msg, embed_network);
	} catch (err) {
		console_log("Error thrown in help_network_cmd function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"ping ") {
			execute_cmd(msg, "Ping", msg.content);
		} else if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"nslookup ") {
			execute_cmd(msg, "Nslookup", msg.content);
		} else if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"tracert ") {
			execute_cmd(msg, "Tracert", msg.content);
		} else if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"pathping ") {
			execute_cmd(msg, "Pathping", msg.content);
		} else if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"ipconfig") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				execute_cmd(msg, "Ipconfig", msg.content);
			} else {
				embed_error(msg, "Only Jared can run the ipconfig command, ipconfig is used to display the IP configuration information " +
				"for the JaredBot servers, knowing the IP would make it easier for an attacker to locate the exact computer the " +
				"server is running on. To prevent aiding an attacker, the command has been locked. Why have this command in the bot at all? " +
				"Sometimes i need to know the IP address of the server, so that i can remotly connect to the machine using a remote desktop " +
				"application, to do maintenance. The server is 'headless' this means it does not have a screen, keyboard, or mouse. The only " +
				" way to interact with it is using remote desktop software, and you have to know the IP in order to connect to the server.");
			}
		} else if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"whois ") {
			execute_cmd(msg, "Whois", msg.content);
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"speedtest") {
			execute_cmd(msg, "Speedtest", msg.content);
		} else if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"echo ") {
			execute_cmd(msg, "Echo", msg.content);
		} else if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"geoip ") {
			geoip_lookup(msg);
		}
	}
})

port_scan_timeout = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"port ") {
			command = msg.content.split(" ");
			if (command.length == 3) {
				port = command[1];
				host = command[2];
				
				// single port
				if (isInt_without_error(port, 0, 65535) == true) {
					if (isInt(msg, port, 0, 65535, "port") == true) {
						if (check_string(host, "!@#$%^&*()_+-= <>,\/?`~") == false) {
							// check port
							check_port(msg, parseInt(port), host, reply=true);
						} else {
							embed_error(msg, "Invalid host, please make sure to enter a valid domain, for example `-port 80 google.com`!");
						}
					}
				
				// port range
				} else {
					if (port.split("-").length == 2) {
						start_port = port.split("-")[0];
						end_port = port.split("-")[1];
						
						// check for undefined
						if (port_scan_timeout[msg.guild.id] == undefined) {
							port_scan_timeout[msg.guild.id] = false;
						}
						
						// run port scan
						if (port_scan_timeout[msg.guild.id] == false) {
							if (isInt(msg, start_port, 0, 65535, "start port") == true) {
								if (isInt(msg, end_port, 0, 65535, "end port") == true) {
									if (end_port > start_port) {
										// timeout
										port_scan_timeout[msg.guild.id] = true;
										mins = parseInt(((end_port - start_port) * 2) / 60);
										secs = parseInt(((((end_port - start_port) * 2) / 60) % 1) * 60);
										embed_chat_reply(msg, "port scan started, the scan is estimated to take "+mins+" mins, and "+secs+" seconds!");
									
										// run port scan over port range
										async function port_range() {
											try {
												port_scan_results[msg.guild.id] = {};
												port_scan_results[msg.guild.id]["open"] = [];
												port_scan_results[msg.guild.id]["closed"] = [];
												for (current_port=start_port;current_port<end_port;current_port++) {
													// check port
													await check_port(msg, parseInt(current_port), host, reply=false);
												}
											} catch (err) {
												console_log("Error thrown in port_range function! " + err, error=true);
											}
										}
										port_range().then(() => {
											// embed
											embed_results = new Discord.MessageEmbed();
											embed_results.setColor(embed_color_chat);
											embed_results.setTitle("Port Scan");
											embed_results.setDescription("Port scan results for " + host + ", " +
											"of the ports that where scanned within the range "+start_port+"-"+end_port+"! " + 
											port_scan_results[msg.guild.id]["open"].length + " where found to be open and " + 
											port_scan_results[msg.guild.id]["closed"].length + " closed!");
											embed_results.addFields(
												{name: "Open", value: port_scan_results[msg.guild.id]["open"].join(", ").slice(0, 1000)+"\n\u200B"},
												{name: "Closed", value: port_scan_results[msg.guild.id]["closed"].join(", ").slice(0, 1000)+"\n\u200B"},
											)
											msg_channel_send(msg, embed_results);
											port_scan_timeout[msg.guild.id] = false;
										}).catch(err => {
											console_log("Error thrown in port_range function! " + err, error=true);
										})
									} else {
										embed_error(msg, "your end port must be larger then your start port!");
									}
								}
							}
						} else {
							embed_error(msg, "Please wait for the current port scan to finish before starting another!");
						}
					}
				}
				
			} else {
				embed_error(msg, "Invalid Syntax! please make sure to use the correct format `-port {port} {host}` for example "+
				"`-port 80 google.com` will check if port 80 is open on the host google");
			}
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
	if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"perm") {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			let member = msg.mentions.members.first();
			if (member != undefined) {
				message = member;
				avatar_url = member.user.avatarURL();
				if (avatar_url == null) {
					avatar_url = webserver_root_address+"img/src/blank_avatar.png";
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
			msg_channel_send(msg, embed_perm_check);
		}
	}
})

// moderation
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"warn ") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				if (msg.author.id != bot_ID) {
					let member = msg.mentions.members.first();
					if (member != undefined) {
						if (member.hasPermission("MANAGE_MESSAGES") == false) {
							embed_modderation(msg, msg.content.slice(5, msg.length), "WARNING!");
							on_warning(msg, 9, msg.content.slice(5, msg.length));
							console_log("user "+member.user.tag+" warned on server "+msg.guild.id+"!", error=false, mod=true);
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

// mute
async function generate_mute_role(msg, member, take_action=true, doReply=true) {
	try {
		let old_mute = msg.guild.roles.cache.find(role => role.name == "mute");
		let old_invisible = msg.guild.roles.cache.find(role => role.name == "invisible");
		if (old_mute == undefined || old_invisible == undefined) {
			try {
				// the mute role doesn't exist create it
				mute_role = await msg.guild.roles.create({
					data: {
						name: "mute",
						color: "#000000",
						permissions: []
					}
				})
			
				// create invisible role
				let invisible_role = msg.guild.roles.cache.find(role => role.name == "invisible");
				if (invisible_role == undefined) {
					invisible_role = await msg.guild.roles.create({
						data: {
							name: "invisible",
							color: "#000000",
							permissions: []
						}
					})
				}
		
				// update mute role permissions on every channel
				await msg.guild.channels.cache.forEach(channel => {
					channel.updateOverwrite(mute_role, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					}).then(function() {
						console_log("Updated mute role permissions for " + channel.name + " on " + msg.guild.name, error=false, mod=true);
					}).catch(err => {
						console_log("Failed to update mute role for" + channel.name + " on " + msg.guild.name, error=true);
					})
				})
			
				// add invisible role
				await msg.guild.channels.cache.forEach(channel => {
					channel.updateOverwrite(invisible_role, {
						VIEW_CHANNEL: false,
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					}).then(function() {
						console_log("Updated invisible role for " + channel.name + " on " + msg.guild.name, error=false, mod=true);
					}).catch(err => {
						console_log("Failed to update invisible role for" + channel.name + " on " + msg.guild.name, error=true);
					})
				})
			
				// update role for user
				if (take_action == true) {
					await member.roles.add(mute_role);
					if (doReply == true) {
						await embed_modderation(msg, "<@"+ member + "> This user can no longer talk!", "User Muted!");
					}
					console_log("user "+member.user.tag+" muted on server "+msg.guild.id+"!", error=false, mod=true);
				}
				return true;
			
			} catch (err) {
				console_log("Failed to create mute role for " + msg.guild.name + "! "  +err, error=true);
				if (doReply == true) {
					embed_error(msg, "Failed to mute user, JaredBot might not have the right permissions to preform the requested action! " +
					"Please go to server settings --> roles, then assign the mute and manage role permissions to JaredBot! JaredBot requires " +
					"the manage roles permission in order to create the mute and invisible roles!");
				}
			}
		} else {
			// take action on user
			if (take_action == true) {
				await member.roles.add(old_mute);
				if (doReply == true) {
					await embed_modderation(msg, "<@"+ member + "> This user can no longer talk!", "User Muted!");
				}
				console_log("user "+member.user.tag+" muted on server "+msg.guild.id+"!", error=false, mod=true);
			}
			return true;
		}
	} catch (err) {
		console_log("Error thrown in generate_mute_role function! " + err, error=true);
	}
}

async function remove_muted_role(msg, member) {
	try {
		// generate the role
		await generate_mute_role(msg, member, take_action=false);
	
		// remove mute role from user
		let old_mute = msg.guild.roles.cache.find(role => role.name == "mute");
		if (old_mute != undefined) {
			member.roles.remove(old_mute);
			embed_modderation(msg, "<@"+ member + "> They can talk again in text and voice channels!", "User Unmuted!", color="green");
			console_log("user "+member.user.tag+" unmuted on server "+msg.guild.id+"!", error=false, mod=true);
		} else {
			embed_error(msg, "Failed to remove mute role!");
		}
	} catch (err) {
		console_log("Error thrown in remove_muted_role function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"mute") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					if (member.hasPermission("MUTE_MEMBERS") == false) {
						if (msg.guild.me.hasPermission("MANAGE_ROLES") == true) {
							// mute user
							generate_mute_role(msg, member);
						} else {
							embed_error(msg, "Failed to mute the user, JaredBot does not have the right permissions, " +
							"please go to server settings --> roles, then assign JaredBot the manage roles permission and mute permission! "+
							"JaredBot requires the manage roles permission in order to create the mute and invisible roles!");
						}
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"unmute") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					if (msg.guild.me.hasPermission("MUTE_MEMBERS") == true) {
						// find muted role
						let old_mute = msg.guild.roles.cache.find(role => role.name == "mute");
						if (old_mute != undefined) {
							member.roles.remove(old_mute);
							embed_modderation(msg, "<@"+ member + "> They can talk again in text and voice channels!", "User Unmuted!", color="green");
							console_log("user "+member.user.tag+" unmuted on server "+msg.guild.id+"!", error=false, mod=true);
						} else {
							// messge mute role doesn't exist create it
							remove_muted_role(msg, member);
						}
					} else {
						embed_error(msg, "Failed to unmute member, JaredBot does not have the right permissions, please go to server settings " +
						"--> roles, then assign JaredBot the mute members permission!");
					}
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"tempmute") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					message = msg.content.split(" ")
					if (message.length == 3 && message[0] == prefix[msg.guild.id]+"tempmute" && parseInt(message[2]) != NaN) {
						if (message[2] > 0) {
							if (message[2] < 1440) {
								if (member.hasPermission("MUTE_MEMBERS") == false) {
									if (msg.guild.me.hasPermission("MUTE_MEMBERS") == true) {
										// take action
										let old_mute = msg.guild.roles.cache.find(role => role.name == "mute");
										if (old_mute != undefined) {
											// mute user
											member.roles.add(old_mute);
											embed_modderation(msg, "<@"+ member + "> This user can no longer talk, they have been muted for "+message[2]+" mins!", "User Temporarily Muted!");
											console_log("user "+member.user.tag+" temp muted on server "+msg.guild.id+"!", error=false, mod=true);
										} else {
											// generate muted role
											generate_mute_role(msg, member);
										}
									
										//unmute user
										setTimeout(function(){
											let old_mute = msg.guild.roles.cache.find(role => role.name == "mute");
											if (old_mute != undefined) {
												member.roles.remove(old_mute);
												embed_modderation(msg, "<@"+ member + "> This user can talk again, they have been automatically unmuted!", "User Unmuted!", color="green");
												console_log("user "+member.user.tag+" temp unmuted on server "+msg.guild.id+"!", error=false, mod=true);
											} else {
												// messge mute role doesn't exist create it
												remove_muted_role(msg, member);
											}
										}, parseInt(message[2]) * 1000 * 60, member, msg);
									} else {
										embed_error(msg, "Failed to tempmute the specified user, JaredBot does not have the right permissions," +
										"please go to server settings --> roles, then assign JaredBot the mute members permission!");
									}
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

// kick
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"kick") {
			if (msg.member.hasPermission("KICK_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					if (member.hasPermission("KICK_MEMBERS") == false) {
						if (msg.guild.me.hasPermission("KICK_MEMBERS") == true) {
							member.kick();
							embed_modderation(msg, "<@"+ member + "> This user has been kicked!", "User Kicked!");
							console_log("user "+member.user.tag+" kicked from server "+msg.guild.id+"!", error=false, mod=true);
						} else {
							embed_error(msg, "Failed to kick specified user, JaredBot does not have the right permissions, please go to server " +
							"settings --> roles, then assign JaredBot the kick members permission!");
						}
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

// ban
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 4) == prefix[msg.guild.id]+"ban" && msg.content.slice(0, 9) != prefix+"banemoji" && msg.content.slice(0, 7) != prefix+"banurl") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				custom_ID = msg.content.slice(5, msg.content.length);
				if (member != undefined) {
					if (member.hasPermission("BAN_MEMBERS") == false) {
						if (msg.guild.me.hasPermission("BAN_MEMBERS") == true) {
							member.ban();
							embed_modderation(msg, "<@"+ member + "> This user has been Banned, they can't join back!", "User Banned!");
							console_log("user "+member.user.tag+" banned from server "+msg.guild.id+"!", error=false, mod=true);
						} else {
							embed_error(msg, "Failed to ban the specified user, JaredBot does not have the right permissions, please go to " +
							"server settings --> roles, then assign the ban members permission to JaredBot.");
						}
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"tempban") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				let member2 = msg.mentions.members.first();
				if (member2 != undefined) {
					if (member2.hasPermission("BAN_MEMBERS") == false) {
						message2 = msg.content.split(" ");
						if (message2.length == 3 && message2[0] == prefix[msg.guild.id]+"tempban" && parseInt(message2[2]) != NaN) {
							if (message2[2] > 0) {
								if (message2[2] < 1440) {
									if (msg.guild.me.hasPermission("BAN_MEMBERS") == true) {
										// ban user
										if (member2.user != undefined) {
											member2.ban();
											embed_modderation(msg, "<@"+ member2 + "> This user has been temporerly banned, they can't join back!", "User Banned!");
											console_log("user "+member2.user.tag+" temp banned from server "+msg.guild.id+"!", error=false, mod=true);
					
											//unnaban user
											setTimeout(function() {
												msg.guild.members.unban(member2);
												embed_modderation(msg, "<@"+ member2 + "> This user can join again, they have been automatically unbaned!", "User Unbaned!");
											}, parseInt(message2[2]) * 1000 * 60, member2, msg);
										}
									} else {
										embed_error(msg, "Failed to tempban the specified user, JaredBot does not have the right permissions, " +
										"please go to server settings --> roles, then assign JaredBot the ban members permission!");
									}
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"unban" && msg.content.slice(0, 11) != prefix+"unbanemoji") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				if (msg.guild.me.hasPermission("BAN_MEMBERS") == true) {
					ID = msg.content.slice(7, msg.content.length);
					if (/^\d+$/.test(ID) == true) {
						msg.guild.members.unban(ID);
						embed_modderation(msg, "<@"+ ID + "> This user has been unbanned, they can join back!", "User Unbanned!", color="green");
						console_log("user unbaned from server "+msg.guild.id+"!", error=false, mod=true);
					} else {
						embed_error(msg, "Please specify a User ID! " +
						"you can get the User ID by right clicking on a message the user has sent, then selecting Copy ID");
					}
				} else {
					embed_error(msg, "Failed to unban the specified user, JaredBot does not have the right permissions, please go to server " +
					"settings --> roles, then assign JaredBot the ban members permission!");
				}
			} else {
				embed_error(msg, "You dont have permission to unban, "+mod_error_text+" ban members permission!");
			}
		}
	}
})

// invisible
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"invisible") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				let member = msg.mentions.members.first();
				if (member != undefined) {
					if (member.hasPermission("MUTE_MEMBERS") == false) {
						if (msg.guild.me.hasPermission("MANAGE_ROLES") == true) {
							let invisible_role = msg.guild.roles.cache.find(role => role.name == "invisible");
							if (invisible_role != undefined) {
								member.roles.add(invisible_role);
								embed_modderation(msg, "<@"+ member + "> This user can no longer talk or see any channels!", "User Invisible!");
								console_log("user "+member.user.tag+" invisible on server "+msg.guild.id+"!", error=false, mod=true);
							} else {
								embed_error(msg, "Failed to make the user invisible!");
							}
						} else {
							embed_error(msg, "Failed to make the specific user invisible, JaredBot does not have the right permissions, " +
							"please go to server settings --> roles, then assign JaredBot the manage roles permission! "+
							"JaredBot requires the manage roles permission in order to create the mute and invisible roles!");
						}
					} else {
						embed_error(msg, "Admins and Moderators cannot be invisible!");
					}
				} else {
					embed_error(msg, "Failed to invisible! The specified User could not be found!");
				}
			} else {
				embed_error(msg, "You dont have permission to use invisible, "+mod_error_text+" mute members permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"visible") {
			if (msg.member.hasPermission("MUTE_MEMBERS") == true) {
				if (msg.guild.me.hasPermission("MANAGE_ROLES") == true) {
					let member = msg.mentions.members.first();
					if (member != undefined) {
						let invisible_role = msg.guild.roles.cache.find(role => role.name == "invisible");
						if (invisible_role != undefined) {
							member.roles.remove(invisible_role);
							embed_modderation(msg, "<@"+ member + "> They can talk again in text and voice channels!", "User Visible!", color="green");
							console_log("user "+member.user.tag+" visible on server "+msg.guild.id+"!", error=false, mod=true);
						} else {
							embed_error(msg, "Failed to make the user visable!");
						}
					} else {
						embed_error(msg, "Failed to visible! The specified User could not be found!");
					}
				} else {
					embed_error(msg, "Failed to make the specified user visable, JaredBot does not have the right permissions, " +
					"please go to server settings --> roles, then assign JaredBot the manage roles permission! JaredBot requires "+
					"the manage roles permissions in order to create the mute and invisible roles!");
				}
			} else {
				embed_error(msg, "You dont have permission to use visible, "+mod_error_text+" mute members permission!");
			}
		}
	}
})

// logging
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"logging ") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				command = msg.content.slice(9, msg.content.length);
				if (command == "on") {
					logging = true;
					embed_chat_reply(msg, "Logging turned on! All messages are now being logged!");
					console_log("Logging turned on! All messages are now being logged!", error=false, mod=true);
				} else if (command == "off") {
					logging = false;
					embed_chat_reply(msg, "Logging turned off! Messages are no longer being logged!");
					console_log("Logging turned off! Messages are no longer being logged!", error=false, mod=true);
				} else {
					embed_error(msg, "Invalid syntax! Please use -logging [on/off]!");
				}
			} else {
				embed_error(msg, "Currently only Jared can manage logging, as this feature is still in development!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && logging == true) {
		if (msg.channel.id != hentai_channel_ID) {
			try {
				// make directory if it does not exist
				var channel_name = msg.channel.name.replace(" ","_") + "_" + String(msg.channel.id);	// channel folder
				var server_name = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;					// server folder
				var dir = logging_path +"/"+ server_name +"/"+ channel_name;
				
				// check if server folder exists
				if (!fs_read.existsSync(logging_path +"/"+ server_name)) {
					fs_read.mkdirSync(logging_path +"/"+ server_name);
				}

				// check if channel folder exists
				if (!fs_read.existsSync(dir)) {
					fs_read.mkdirSync(dir);
				}
				
				// log file name
				date1 = new Date();
				log_current_file = dir + "/server_log_"+date1.getDate()+"-"+(date1.getMonth()+1)+"-"+date1.getFullYear()+".log";
				
				// check for embed
				msg_content = msg.content;
				embed_data = [];
				msg.embeds.forEach(embd => {
					//embed_data = [embd.title, embd.author, embd.description, embd.fields]
					if (embd.description != undefined) {
						embed_data.push("[description] "+embd.description+" [/description]");
					} if (embd.author != undefined) {
						embed_data.push("[author]"+[embd.author.name, embd.author.url, embd.author.iconURL].join(", ")+"[/author]");
					} if (embd.title != undefined) {
						embed_data.push("[title] "+embd.title+" [/title]");
					} if (embd.color != undefined) {
						embed_data.push("[color]"+embd.color+"[/color]");
					} if (embd.thumbnail != undefined) {
						embed_data.push("[thumbnail]"+embd.thumbnail+"[/thumbnail]");
					} if (embd.image != undefined) {
						embed_data.push("[image]"+embd.image.url+"[/image]");
					} if (embd.fields.length > -1) {
						for (i=0;i<embd.fields.length;i++) {
							embed_data.push("[field]"+embd.fields[i].name+"[/field][value]"+String(embd.fields[i].value)+"[/value]");
						}
					} msg_content = embed_data.join(" ").replace(/\n/g, "");
				})
				
				// check for attachment
				msg.attachments.forEach(attch => {
					msg_content += ("<attachment>"+attch.url+"</attachment>".replace(/\n/g, ""));
				})
				
				// check for null
				if (msg.member == null) {
					return false;
				}
				
				// append data
				data = "["+msg.channel.name+"]["+msg.member.user.tag+"]["+String(date1).split(" GMT")[0]+"] "+msg_content;
				create_file_then_append_data_custom_path(msg, log_current_file, data, endl="\n");
				
			} catch (err) {
				if (msg.guild == null) {
					console_log("Failed to write to log file for server! ", error=true);
				} else {
					console_log("Failed to write to log file for server "+msg.guild.id+"! ", error=true);
				}
			}
		}
	}
})

// Snipe (log deleted messages)
bot.on("messageDelete", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (sniping == true) {
			try {
				// write data to log file
				date = String(new Date()).split(" GMT")[0];
				if (msg.member != null) {
					user = msg.member.user.tag;
					channel = msg.channel.name;
					msg_content = msg.content.split("@everyone").join("{everyone}").split("@here").join("{here}").split("@").join("");
		
					fs_append.appendFile(deleted_messages_log_file, "["+channel+"]["+user+"]["+date+"] "+msg_content+"\n", function(err) {
						if (err) {
							console_log("Failed to read deleted messages snipe log file!", error=true);
						}
					})
				} else {
					console_log("Failed to write deleted message to log file!", error=true)
				}
			} catch (err) {
				console_log("Failed to write deleted message to log file!" + err, error=true);
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"snipe") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				fs_read.readFile(deleted_messages_log_file, "utf8", function(err, data) {
					if (err) {
						return console_log("Failed to read deleted messages snipe log file!", error=true);
					}
					// show deleted messages
					msg_channel_send(msg, "Deleted Messages:\n");
					lines = data.split("@everyone").join("{everyone}").split("@here").join("{here}").split("@").join("").split("\n");
					console_log("Sniping command was issued", error=false, mod=true);
					for (i=0;i<lines.length;i++) {
						msg_channel_send(msg, lines[i]);
					}
				})
			} else {
				embed_error(msg, "Currently only Jared can use the snipe command, as this feature is still in development!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,10) == prefix[msg.guild.id]+"snipping ") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				command = msg.content.slice(10, msg.content.length);
				if (command == "on") {
					sniping = true;
					embed_chat_reply(msg, "Snipping has been turned on! Recently deleted messages will be logged!");
					console_log("Snipping has been turned on! Recently deleted messages will be logged!", error=false, mod=true);
				} else if (command == "off") {
					snipping = false;
					embed_chat_reply(msg, "Snipping has been turned off! Deleted messages will no longer be logged!");
					console_log("Snipping has been turned off! Deleted messages will no longer be logged!", error=false, mod=true);
				}
			} else {
				embed_error(msg, "Currently only Jared can use the snipping command, as this feature is still in development!");
			}
		}
	}
})

// clear deleted messages log
setInterval(function (){
	var current_time = new Date();
	if ((current_time.getHours() + ":" +  current_time.getMinutes()) == clear_message_time) {
		// clear the log file
		fs_write.writeFile(deleted_messages_log_file, "Log File cleared on " + String(current_time) + "\n", function(err) {
			if (err) {
				return console_log("Failed to clear deleted messages log file!", error=true);
			}
		})
	}
}, 20*1000);

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"clearlog") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				// clear deleted messages log
				var current_time = new Date();
				fs_write.writeFile(deleted_messages_log_file, "Log File cleared on " + String(current_time) + "\n", function(err) {
					if (err) {
						return console_log("Failed to clear deleted messages log file!", error=true);
					}
					embed_chat_reply(msg, "deleted messages log file cleared!");
					console_log("deleted messages log file cleared!", error=false, mod=true);
				})
			} else {
				embed_error(msg, "This command can only be used by Jared!");
			}
		}
	}
})

// purge
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		// show help menu
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"purge") {
			help_clear(msg);
			return;
		}
		
		// do clear
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"purge " || msg.content.slice(0, 7) == prefix[msg.guild.id]+"clear ") {
			if (msg.content != prefix+"clearlog") {
				if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
					purge_num = msg.content.slice(6, msg.content.length);
					if (isNaN(parseInt(purge_num)) == false) {
						if (purge_num >= 2 && purge_num <= max_purdge_amount) {
							if (purge_num.indexOf(".") == -1 && purge_num.indexOf("-") == -1) {
								// delete the messages
								async function delete_messages() {
									try {
										if (msg.guild.me.hasPermission("MANAGE_MESSAGES") == true) {
											// delete messages
											msg.delete();
											const fetched = await msg.channel.messages.fetch({limit: purge_num});
											msg.channel.bulkDelete(fetched).then(function() {
												// message server
												embed_info_reply(msg, purge_num + " messages deleted by <@"+msg.member.id+">!");
												console_log(purge_num + " messages deleted in server " + msg.guild.id, error=false, mod=true);
											}).catch(err => {
												console_log("Error thrown in purge when trying to bulk delete messages! " + err, error=true);
											})
										} else {
											embed_error(msg, "JaredBot does not have permission to delete messages, please go to server settings --> "+
											"roles, then assign JaredBot the manage messages permission!");
										}
									} catch (err) {
										console_log("Error thrown in delete_messages function! " + err, error=true);
									}
								} delete_messages().catch(error => {
									embed_error(msg, "Failed to delete messages!");
								})
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
						if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"clear") {
							embed_error(msg, "Invalid Input, the number of messages to delete must be an integer! e.g. `-clear 10` will delete 10 messages!");
						} else {
							embed_error(msg, "Invalid Input, the number of messages to delete must be an integer! e.g. `-purge 10` will delete 10 messages!");
						}
					}
				} else {
					embed_error(msg, "You dont have permission to use the purge command, " + mod_error_text + " manage messages permission!");
				}
			}
		}
	}
})

// automod
function automod_help(msg) {
	try {
		// automod help
		embed_automod_helpmenu = new Discord.MessageEmbed();
		embed_automod_helpmenu.setColor(embed_colour_info);
		embed_automod_helpmenu.setTitle("Automod Help");
		embed_automod_helpmenu.setDescription("Automod is a powerful tool that allows the bot to automatically mute, kick or ban users who " +
		"break specifically defined rules. When users spam, post porn links, or uses offensive language for example, JaredBot’s contenting " +
		"filtering feature will warn them. Automod is designed to run alongside content filtering, acting as a way to punish users who get to many " +
		"warnings. As well as counting content filtering warnings, it will also keep track of warnings moderators and admins give. " +
		"Make sure to enable contant filtering else your automod rules wont be enforced, type `-help filter` for more info!\n\u200B");
		embed_automod_helpmenu.addFields(
			{name: "-automod help", value: "Shows this help menu.\n\u200B"},
			{name: "-automod rules", value: "Shows a list of the active rules applied to your server.\n\u200B"},
			{name: "-automod warnlist", value: "Shows a list of users with the most warnnings on the server.\n\u200B"},
			{name: "-automod", value: "lets you add an automod rule, The syntax for the command is `-automod {action} after {number of} warnings in {length} {mins/hours}`, for example `-automod mute after 10 warnings in 5 mins` will mute any users who recive 5 warnings within 10 mins!\n\u200B"},
			{name: "-automod remove", value: "lets you remove an automod rule, The syntax for the command is `-automod remove {rule number}`, for example `-automod remove 1` will remove the first active rule, i strongly suggest running `-automod rules` first to get a list of all of the rules currently on your sever, then use the automod remove command after.\n\u200B"}
		)
	
		// send message
		embed_automod_helpmenu.setTimestamp();
		msg_channel_send(msg, embed_automod_helpmenu);
	} catch (err) {
		console_log("Error thrown in automod_help function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"automod" || msg.content == prefix[msg.guild.id]+"automod help") {
			automod_help(msg);
			
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"automod rules") {
			try {
				// get dir
				automod_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
				automod_path = logging_path + "/" + automod_dir + "/" + automod_filename;
				
				// read automod file
				if (fs_read.existsSync(automod_path) == false) {
					throw "File not found!";
				}
				fs_read.readFile(automod_path, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read automod file", error=true);
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
								console_log("Automod rule updated for server " + msg.guild.id, error=false, mod=true);
							}
						} catch {
							console_log("Failed to display automod rule on scoreboard!", error=true);
						}
					}
					
					if (automod_raw_data[0] == "") {
						embed_automod_rules.addField("No rules currently on the server!", "See the `-automod help` menu for information on how to add a rule!\n\u200B");
					}
				
					// send message
					embed_automod_rules.setTimestamp();
					msg_channel_send(msg, embed_automod_rules);
				})
			} catch {
				embed_error(msg, "Failed to display automod rules, You don't have any rules setup on your server, please see the `-automod help` menu for information on how to create a rule.");
			}
		} else if (msg.guild != null && msg.content.slice(0, 16) == prefix[msg.guild.id]+"automod remove ") {
			if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
				rule_no = msg.content.slice(16, msg.content.length);
				// get dir
				automod_path = logging_path + "/" + msg.guild.name.replace(" ","_")+"_"+ msg.guild.id + "/" + automod_filename;
			
				// read file
				fs_read.readFile(automod_path, "utf-8", function(err, data) {
					if (err) {
						console_log("Failed to read automod file when running remove command", error=true);
					}
					
					// check user input
					automod_data = data.split(";");
					if (automod_data.length > 0) {
						if (isNaN(parseInt(rule_no)) == false) {
							if (rule_no >= 1 && rule_no <= automod_data.length+1) {
								automod_data = (automod_data.slice(0, rule_no-1).concat(automod_data.slice(rule_no, automod_data.length)));
								
								if (data != "") {
									// write to file
									fs_write.writeFile(automod_path, automod_data.join(";"), function(err) {
										if (err) {
											return console_log("Failed to write user input to file when running automod remove command", error=true);
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
				embed_error(msg, "You dont have permission to use the automod commands, " + mod_error_text + " manage messages permission!");
			}
		} else if (msg.guild != null && msg.content.slice(0, 17) == prefix[msg.guild.id]+"automod warnlist") {
			// dir
			warnings_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			warnings_path = logging_path + "/" + warnings_dir + "/" + warnings_filename;
			
			// read file
			automod_file_reader = logging_path +"/"+ msg.guild.name.replace(" ","_")+"_"+ msg.guild.id +"/" + filenames_higherlower;
			fs_read.readFile(warnings_path, "utf-8", function(err, data) {
				if (err) {
					embed_error(msg, "Failed to read automod warnlist, this could be as a result of no one having had a warning, " +
					"if you have recently added JaredBot to your server, please wait for a few people to break the rules then run this command!");
					return console_log("Failed to read automod warnings file!", error=true);
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
				embed_automod_warns_list.addField(user_most_warnings + "\u200B", warned_user_output.join("\n").slice(0, 2000) + "\u200B");
				embed_automod_warns_list.setTimestamp();
				msg_channel_send(msg, embed_automod_warns_list);
			})
			
		} else if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"automod ") {
			try {
				automod_error_text = "\n\nThe syntax for the command is `-automod {action} after {number of} warnings in {length} {mins/hours}`, " +
				"for example `-automod mute after 10 warnings in 5 mins` will mute any users who recive 5 warnings within 10 mins!";
				if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
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
															automod_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
															automod_path = logging_path + "/" + automod_dir + "/" + automod_filename;
															console_log(automod_rule);
														
															// make file
															async function make_file() {
																make_server_folder_file(msg, automod_filename);
																return;
															}
														
															// append automod rule to file
															async function write_automod_rule(){
																try {
																	await make_file();
																	fs_append.appendFile(automod_path, automod_rule, function(err) {
																		if (err) {
																			console_log("Failed to append data to automod rules file", error=true);
																		}
																	})
																} catch (err) {
																	console_log("Error thrown in write_automod_rule function! " + err, error=true);
																}
															} write_automod_rule();
														
															// message user
															embed_info_reply(msg, "Automod rule updated! Users who get " + no_warnings + " warnings" +
															" in " + length + " " + minSec + ", will now be " + action.replace("mute", "mut") + "ed! " +
															"Please make sure to turn on content filtering in order for these rules to take effect " +
															"type the `-filter on` to turn all filters on, or see `-help filter` for help on configuring filters.");
															console_log("Audomod rule updated for " + msg.guild.id);
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
					embed_error(msg, "You dont have permission to use the automod commands, " + mod_error_text + " manage channels permission!");
				}
			} catch {
				embed_error(msg, "Failed to set automod rule! " + automod_error_text);
			}
		}
	}
})

// automod warning tracker
onwarning_cooldown = {};
function on_warning(msg, warning_code, reason="") {
	try {
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
	
		// check for undefined
		if (onwarning_cooldown[msg.guild.id] == undefined) {
			onwarning_cooldown[msg.guild.id] = false;
		}
	
		// check if function already running
		if (onwarning_cooldown[msg.guild.id] == false) {
	
			// run function
			try {
				onwarning_cooldown[msg.guild.id] = true;
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
				automod_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
				automod_path = logging_path + "/" + automod_dir + "/" + automod_filename;
	
				// read the warning rules file
				fs_read.readFile(automod_path, "utf-8", function(err, data) {
					if (err) {
						return console_log("Failed to read automod rules file!", error=true);
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
								generate_mute_role(msg, msg.member);
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
									console_log("user_who_broke_rules_dict cleared:", user_who_broke_rules_dict);
								}, 1000*parseInt(current_warning_time));
							}
						}
					}
				})
	
				// -- write to log --
				// get directory
				warnings_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
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
					fs_read.readFile(warnings_path, "utf-8", function(err, data) {
						if (err) {
							return console_log("Failed to read wanrings file in on warning function!", error=true);
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
						try {
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
							fs_write.writeFile(warnings_path, warned_users.join("\n"), function(err) {
								if (err) {
									console_log("Failed to write warnings to file!", error=true);
								}
								// clear timeout
								onwarning_cooldown[msg.guild.id] = false;
							})
						} catch {
							console_log("Failed to wrte warnings to file", error=true);
						}
					})
				} read_file();
			} catch {
				console_log("Failed to take action on the user!", error=true);
				onwarning_cooldown[msg.guild.id] = false;
			}
		} else {
			setTimeout(function() {
				on_warning(msg, warning_code, reason);
			}, 100, msg, warning_code, reason);
		}
	} catch (err) {
		console_log("Error thrown in on_warning function! " + err, error=true);
	}
}

// exit
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"exit") {
			if (authorised_IDs.indexOf(msg.author.id) > -1) {
				embed_chat_reply(msg, "JaredBot has been terminated!");
				console_log("JaredBot has been terminated!", error=false, mod=true);
				setTimeout(function(){
					process.exit(1);
				},100);
			} else {
				embed_error(msg, "This command shuts the bot down, for obvious reasons it can only be used by Jared!");
			}
		}
	}
})

// write to delete messages log
function write_2_log(msg, data) {
	try {
		// write data to log file
		date = String(new Date()).split(" GMT")[0];
		if (msg.member != null) {
			user = msg.member.user.tag;
			channel = msg.channel.name;
			msg_content = data.split("@everyone").join("{everyone}").split("@here").join("{here}").split("@").join("");
		
			fs_append.appendFile(deleted_messages_log_file, "[*Content Filter*]["+channel+"]["+user+"]["+date+"] "+msg_content+"\n", function(err) {
				if (err) {
					console_log("Failed to message to log!", error=true);
				}
			})
		} else {
			console_log("Failed to write deleted message to log file!", error=true);
		}
	} catch (err) {
		console_log("Failed to write deleted message to log file!" + err, error=true);
	}
}

// Rules
rule_timeout = {}

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
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (filter_onoff[msg.guild.id].indexOf("101") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
			if (msg.author.id != bot_ID) {
				for (i=0;i<porn_links.length;i++) {
					if (msg.content.toLowerCase().indexOf(porn_links[i]) > -1) {
						if (msg.content.indexOf(".") > -1) {
							write_2_log(msg, msg.content);
							msg.delete();
							embed_modderation(msg, "<@" + msg.author.id + "> Do not post links to pornographic content!", "WARNING!");
							console_log("user " + msg.member.user.tag + " has been warned for posting pornographic content", error=false, mod=true);
							on_warning(msg, 1);
							return;
						}
					}
				}
			}
		}
	}
})

// rule 2 (No phishing website links)
var Safe_Browsing_API = "";
var phishing_timeouts = {};

function capitalise(txt) {
	try {
		parts = txt.replace(/_/g, " ").split(" ");
		output = [];
		for (i=0;i<parts.length;i++) {
			output.push(parts[i].toUpperCase()[0] + parts[i].toLowerCase().slice(1, parts[i].length));
		}
		return output.join(" ");
	} catch (err) {
		console_log("Error thrown in capitalise function! " + err, error=true);
	}
}

function phishing_link_checker(msg, phishing_url) {
	try {
		url = "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=" + Safe_Browsing_API;
	
		body =  {
			"client": {
				"clientId": "JaredBot", "clientVersion": "1.0.0"},
			"threatInfo": {
				"threatTypes": ["SOCIAL_ENGINEERING", "MALWARE"],
				"platformTypes":    ["ANY_PLATFORM"],
				"threatEntryTypes": ["URL"],
				"threatEntries": [{"url": phishing_url}]
			}
		}
	
		request(url, {
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body),
			method: "POST"
		}, (err, res, body) => {
			if (res.statusCode == 200) {
				response = JSON.parse(body);
				if (Object.keys(response).length == 0) {
					// URL is safe
					console_log("URL is safe!");
				
				} else {
					// URL is unsafe
					console_log("Dangerous URL identified!");
				
					// delete the message
					msg.delete();
				
					// delay on command to prevent warning spam
					if (phishing_timeouts[msg.guild.id] == undefined) {
						phishing_timeouts[msg.guild.id] = -1;
					}
				
					// message user
					if (phishing_timeouts[msg.guild.id] != new Date().getSeconds()) {
						phishing_timeouts[msg.guild.id] = new Date().getSeconds();
					
						// get URL info
						current_type = response["matches"][0]["threatType"];
						current_platform = response["matches"][0]["platformType"];
						current_cache = response["matches"][0]["cacheDuration"];
						current_entry_type = response["matches"][0]["threatEntryType"];
						current_url = response["matches"][0]["threat"]["url"];
				
						domain = phishing_url.replace("https://", "http://").split("http://")[1].split("/")[0];
				
						// embed
						embed_phishing = new Discord.MessageEmbed();
						embed_phishing.setColor(embed_colour_error);
						embed_phishing.setTitle("Phishing Link Detected!");
						embed_phishing.setDescription("Attackers on "+domain+" may trick you into doing something dangerous like "+
						"installing software or revealing your personal information (for example, passwords, phone numbers, or credit cards).\n\u200B");
						embed_phishing.addFields(
							{name: "Domain", value: capitalise(domain) + "\n\u200B", inline: true},
							{name: "\n\u200B", value: "\n\u200B", inline: true},
							{name: "Threat Type", value: capitalise(current_type) + "\n\u200B", inline: true},
							{name: "Effects", value: capitalise(current_platform.replace("ANY_PLATFORM","Multiple Web Browsers"))+"\n\u200B",inline: true},
							{name: "\u200B", value: "\n\u200B", inline: true},
							{name: "Threat Entry Type", value: current_entry_type+"\n\u200B", inline: true},
							{name: "Action", value: "The user <@" + msg.author.id + "> has recvied a warning!\n\u200B"},
						)
						embed_phishing.setTimestamp();
						msg_channel_send(msg, embed_phishing);
						console_log("user " + msg.member.user.tag + " has been warned for posting a phishing link", error=false, mod=true);
					}
				}
			} else {
				console_log("The server returned status code " + res.statusCode + "!");
			}
		})
	} catch (err) {
		console_log("Error thrown in phishing_link_checker function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		// check if URL in message
		content = msg.content;
		for (i=0;i<(content.match(/http/g) || []).length;i++) {
			if (content.indexOf("http") > -1) {
				content = content.split("https").join("http") + " ";
				content_p1 = content.slice(content.indexOf("http"), content.length);
				current_url = content_p1.slice(0, content_p1.indexOf(" "));
				content = content_p1.slice(current_url.length+1, content_p1.length);
				
				// check URL
				phishing_link_checker(msg, current_url);
				write_2_log(msg, msg.content);
				on_warning(msg, 2);
			}
		}
	}
})

bot.on("ready", msg => {
	fs_read.readFile(safe_browsing_filename, "utf-8", function(err, data) {
		if (err) {
			return console_log("Failed to read safe browsing API file!", error=true);
		}
		Safe_Browsing_API = data;
		console_log("Read Safe Browsing API Key!");
	})
})


// rule 3 (No spamming the same repetitive message)
var max_spam_count = 5;
var user_spam_dict = {};

bot.on("message", msg => {
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (filter_onoff[msg.guild.id].indexOf("103") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
			if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
						console_log("user " + msg.member.user.tag + " has been warned for spamming!", error=false, mod=true);
						on_warning(msg, 3);
					}
				}
			}
		}
	}
})

// rule 4 (Don’t be a dick or bully others, be kind - emoji detection, link remover)
var banned_emojis = {};

bot.on("ready", msg => {
	setTimeout(function(){
		read_file(banned_emoji_filename, banned_emojis);
		console_log("Banned Emoji file read!");
	}, 5000);
})

bot.on("message", msg => {
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (filter_onoff[msg.guild.id].indexOf("104") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
			if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
				if (msg.author != bot_ID) {
					contents = msg.content.split(" ");
					for (i=0;i<contents.length;i++) {
						if (contents[i].slice(0,2) == "<:" && contents[i].slice(-1) == ">") {
							current_emoji_ID = contents[i].split(":")[2].replace(/\D/g, "");
							if (isNaN(parseInt(current_emoji_ID)) == false) {
								if (banned_emojis[msg.guild.id] != undefined) {
									if (banned_emojis[msg.guild.id].indexOf(current_emoji_ID) > -1) {
										write_2_log(msg, msg.content);
										msg.delete();
										embed_modderation(msg, "<@" + msg.author.id + "> Don't use this emoji!", "WARNING!");
										console_log("user " + msg.member.user.tag + " has been warned for using a banned emoji!", error=false, mod=true);
										on_warning(msg, 4);
										return;
									}
								}
							}
						}
					}
				}
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"banemoji ") {
				if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
					emoji_id = msg.content.slice(10, msg.content.length);
					// list banned emojis
					if (emoji_id == "list") {
						// get directory
						banemoji_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
						banemoji_path = logging_path + "/" + banemoji_dir + "/" + banned_emoji_filename;
						
						// read banned emoji list
						fs_read.readFile(banemoji_path, "utf-8", function(err, data) {
							if (err) {
								return console_log("Failed to read banned emojis file!", error=true);
							}
							
							// embed
							embed_banemoji = new Discord.MessageEmbed();
							embed_banemoji.setColor(embed_color_chat);
							embed_banemoji.setTitle("Banned Emoji list");
							embed_banemoji.setDescription("All of the following emoji IDs have been banned on the " + 
							msg.guild.name + " server!\n" + data.replace(/;/g, "\n").slice(0, 2000));
							msg_channel_send(msg, embed_banemoji);
						})
						
					// clear banned emojis
					} else if (emoji_id == "clearall") {
						banemoji_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
						banemoji_path = logging_path + "/" + banemoji_dir + "/" + banned_emoji_filename;
						
						// clear banned emoji list
						fs_write.writeFile(banemoji_path, "", function(err) {
							if (err) {
								return console_log("Failed to clear banned emojis list!", error=true);
							}
							embed_chat_reply(msg, "All emoji bans have been cleared!");
						})
						
					}
					
					// ban emoji
					else {
						if (isInt_without_error(emoji_id, 0, 10**20) == true) {
							create_file_then_append_data(msg, banned_emoji_filename, emoji_id, endl=";");
							if (banned_emojis[msg.guild.id] == undefined) {
								banned_emojis[msg.guild.id] = [];
							} banned_emojis[msg.guild.id].push(emoji_id);
							embed_info_reply(msg, "Successfully banned the emoji!");
							console_log("Emoji has been banned for server " + msg.guild.id, error=false, mod=true);
						} else {
							embed_error(msg, "Invalid emoji ID!");
						}
					}
				} else {
					embed_error(msg, "You dont have permission to ban emoji's, " + mod_error_text + "Manage Messages permission!");
				}
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.guild != null && msg.content.slice(0, 12) == prefix[msg.guild.id]+"unbanemoji ") {
				if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
					emoji_id = msg.content.slice(12, msg.content.length);
					if (isInt_without_error(emoji_id, 0, 10**20) == true) {
						// read the emoji ban file
						current_server_name = bot.guilds.cache.get(msg.guild.id);
						current_server_name = current_server_name.name.replace(" ","_")+"_"+ current_server_name.id;
						f_path = logging_path + "/" + current_server_name + "/" + banned_emoji_filename;
					
						// remove ID from dict
						output = [];
						console_log(banned_emojis[msg.guild.id]);
						for (i=0;i<banned_emojis[msg.guild.id].length;i++) {
							if (banned_emojis[msg.guild.id][i] != emoji_id) {
								output.push(banned_emojis[msg.guild.id][i]);
							}
						}
						banned_emojis[msg.guild.id] = output;
						console_log(output);
					
						//  write to file
						fs_write.writeFile(f_path, output.join(";") + ";", function(err) {
							if (err) {
								return console_log("Failed to write emojis to file after unbanned!", error=true);
							}
						})
					
						// message user
						emoji = bot.emojis.cache.get(emoji_id);
						embed_info_reply(msg, "Emoji ${emoji} unbanned!");
						console_log("Emoji unbanned for server " + msg.guild.id, error=false, mod=true);
					}
				}
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"emoji" || msg.content == prefix[msg.guild.id]+"banemoji" || msg.content == prefix[msg.guild.id]+"unbanemoji") {
			// embed
			embed_emoji = new Discord.MessageEmbed();
			embed_emoji.setColor(embed_colour_info);
			embed_emoji.setTitle("Emoji Filter Help");
			embed_emoji.setDescription("The emoji filter allows you to ban specific emojis, "+
			"the bot will delete messages that contain the banned emoji and warn the user who posted the message.");
			embed_emoji.addFields(
				{name: "-emoji help", value: "Shows this help menu.\n\u200B"},
				{name: "-banemoji list", value: "Shows a list of the banned emojis IDs for the server.\n\u200B"},
				{name: "-banemoji clearall", value: "Removes all emoji bans from the server.\n\u200B"},
				{name: "-banemoji {emoji ID}", value: "bans the specified emoji by ID, you can get the ID of an emoji by simply right clicking "+
				"on the emoji you would like to ban inside of a message, then clicking *open link*. the emoji source URL will be opened up in "+
				"a web browser, the URL will be `cdn.discordapp.com/emojis/` followed by an ID, simply copy the ID part of the URL "+
				"(refer to the image below), then paste that ID into discord when using the banemoji command, for example "+
				"`-banemoji 779738708844609597` will ban an emoji of a rainbow cat.\n\u200B"},
				{name: "-unbanemoji {emoji ID}", value: "Allows you to unban an emoji, for example `-unbanemoji 779738708844609597` "+
				"will unban an emoji of a rainbow cat. prefer to the banemoji command description above, for information on how to get the "+
				"emoji ID, or look at the image below.\n\u200B"},
			)
			embed_emoji.setImage(emoji_id_url);
			embed_emoji.setTimestamp();
			msg_channel_send(msg, embed_emoji);
			
		}
	}
})

// ban url
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
			if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"banurl ") {
				if (filter_onoff[msg.guild.id].indexOf("104") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
					if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
						url = msg.content.slice(8, msg.content.length);
						if (url.indexOf(".") > -1) {
							// add URL to banned list
							create_file_then_append_data(msg, banned_urls_channel_file, url, endl=";\n");
							embed_chat_reply(msg, "The URL has been black listed!");
							
							// add URL to dict
							setTimeout(function() {
								if (banned_urls[msg.guild.id] == undefined) {
									banned_urls[msg.guild.id] = [];
									banned_urls[msg.guild.id].push(url);
								} else {
									banned_urls[msg.guild.id].push(url);
								}
							}, 1000);
						} else {
							embed_error(msg, "That is not a valid URL!");
						}
					} else {
						embed_error(msg, "Your not authorised to run the banurl command" + mod_error_text + " manage messages permission!");
					}
				} else {
					embed_error(msg, "Ban URL is part of the emoji spam filter, please turn on the emoji spam filter inorder to use this feature, "+
					"type `-filter on emojispam`, or `-filter` for more information!");
				}
			}
		}
	}
})

var banned_urls = {};
bot.on("ready", msg => {
	// read banned urls list
	read_file(banned_urls_channel_file, banned_urls, allow_non_int=true, sep=";", remove_dupes=true);
	console_log("Banned URLs database read!");
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.author.bot == false) {
			if (banned_urls[msg.guild.id] != undefined && filter_onoff[msg.guild.id] != undefined) {
				if (filter_onoff[msg.guild.id].indexOf("104") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
					// check message content for each URL
					do_warning = false;
					for (i=0;i<banned_urls[msg.guild.id].length;i++) {
						if (msg.content.indexOf("http://") > -1 || msg.content.indexOf("https://") > -1) {
							if (msg.content.indexOf(banned_urls[msg.guild.id][i]) > -1) {
								do_warning = true;
							}
						}
					}
					// take action
					if (do_warning == true) {
						write_2_log(msg, msg.content);
						msg.delete();
						embed_modderation(msg, "<@" + msg.author.id + "> You cannot use this URL!", "WARNING!");
						console_log("user " + msg.member.user.tag + " has been warned for using a banned URL!", error=false, mod=true);
						on_warning(msg, 4);
					}
				}
			}
		}
	}
})

// rule 5 (Only post promotions in the advertisement channel)
bot.on("message", msg => {
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (filter_onoff[msg.guild.id].indexOf("105") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
			if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
				if (msg.content.indexOf("https://discord.gg/") > -1) {
					if (msg.channel.id != adds_channel_ID) {
						if (msg.author != bot_ID) {
							if (msg.member.hasPermission("MANAGE_MESSAGES") == false) {
								write_2_log(msg, msg.content);
								msg.delete();
								embed_modderation(msg, "<@" + msg.author.id + "> Only post promotions in the adds channel!", "WARNING!");
								console_log("user " + msg.member.user.tag + " has been warned for promotions!", error=false, mod=true);
								on_warning(msg, 5);
							}
						}
					}
				}
			}
		}
	}
})

// rule 6 (No raids, such as pinging everyone)
bot.on("message", msg => {
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (filter_onoff[msg.guild.id].indexOf("106") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
			if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
				if (msg.author.id != bot_ID) {
					if (msg.member != null) {
						if (msg.content.indexOf("@everyone") > -1) {
							write_2_log(msg, msg.content);
							msg.delete();
							embed_modderation(msg, "<@" + msg.author.id + "> Dont use everyone tag!", "WARNING!");
							console_log("user " + msg.member.user.tag + " has been warned for using the everyone tag!", error=false, mod=true);
							on_warning(msg, 6);
		
						} else if (msg.content.indexOf("@here") > -1) {
							write_2_log(msg, msg.content);
							msg.delete();
							embed_modderation(msg, "<@" + msg.author.id + "> Dont use here tag!", "WARNING!");
							console_log("user " + msg.member.user.tag + " has been warned for using the here tag!", error=false, mod=true);
							on_warning(msg, 6);
						}
					}
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
	if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
		if (filter_onoff[msg.guild.id].indexOf("107") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
			if (msg.guild != null && msg.member != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
				if (msg.member.hasPermission("MANAGE_MESSAGES") == false) {
					// mod
					for (i=0;i<give_mod.length;i++) {
						if (msg.content.indexOf(give_mod[i]) > -1) {
							embed_modderation(msg, "<@" + msg.author.id + "> No asking to be Moderator!", "WARNING!");
							console_log("user " + msg.member.user.tag + " has been warned for asking to be mod!", error=false, mod=true);
							on_warning(msg, 7);
						}
					}
		
					// admin
					for (i=0;i<give_adm.length;i++) {
						if (msg.content.indexOf(give_adm[i]) > -1) {
							embed_modderation(msg, "<@" + msg.author.id + "> No asking to be Admin!", "WARNING!");
							console_log("user " + msg.member.user.tag + " has been warned for asking to be admin!", error=false, mod=true);
							on_warning(msg, 7);
						}
					}
				}
			}
		}
	}
})

// rule 8 (No sending offensive messages)
var trigger_word = ['kill your self', 'kys', 'go fuck', 'fucking die', 'stupid bitch', 'hey bitch', 'nice try bitch', 
'are you a retard', 'fucking retard', 'go fuck yourself', 'of shit', 'nigger', 'nigga', 'niger', 'niga', 'fucking kill', 'fucking bitch', 'poor fuck', 
'dickhead', 'ur mom a hoe', 'dick head', 'motherfucker', 'fuck of', 'fuck you', 'fuck u', 'fucking hoe', 'i will rape', 
"negr", "buzna"];

function check_msg_for_swear(msg, doReply=true, deleteMsg=true, textInput="") {
	try {
		// check for undefined
		if (msg != undefined) {
			if (msg.guild == null || msg.guild == undefined) {
				console_log("Failed to check msg content for swear words, msg is undefined!", error=true);
				return false;
			}
		}
	
		// check message
		if (msg.guild != null && filter_onoff[msg.guild.id] != undefined) {
			if (filter_onoff[msg.guild.id].indexOf("108") > -1 || filter_onoff[msg.guild.id].indexOf("199") > -1) {
				if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
					for (i=0;i<trigger_word.length;i++) {
						// check for text input
						if (textInput.length > 0) {
							msg_content = textInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() // replace accents with letters
						} else {
							msg_content = msg.content.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() // replace accents with letters
						}
					
						// Format text
						msg_content = msg_content.replace(" ","").replace("\n","").replace("\t",""); // removes spaces and tabs
						msg_content = msg_content.replace("1","i").replace("2","s").replace("5","s").replace("0","o") // replace numbers with letters
				
						if (msg_content.indexOf(trigger_word[i]) > -1) {
							write_2_log(msg, msg.content);
							// delete message
							if (deleteMsg == true) {
								msg.delete().catch(error => {
									console_log("Failed to delete message!", error=true);
								})
							}
						
							// reply
							if (doReply == true) {
								embed_modderation(msg, "<@" + msg.author.id + "> No sending offensive or alarming messages!", "WARNING!");
							}
							console_log("user " + msg.member.user.tag + " has been warned for sending offensive messages!", error=false, mod=true);
							on_warning(msg, 8);
							return true;
						}
					}
				}
			}
		}
	} catch (err) {
		console_log("Error thrown in check_msg_for_swear function! " + err, error=true);
	}
}

bot.on("message", msg => {
	check_msg_for_swear(msg);
})

// toggle content filtering
var filter_onoff = {};

/*
Key Codes:
199 - all filters on
100 - all filters off
101 - rule 1 porn
102 - rule 2 phishing
103 - rule 3 spam
104 - rule 4 emojispam
105 - rule 5 promotions
106 - rule 6 tags
107 - rule 7 mod
108 - rule 8 language
*/

function do_filter(msg, filter_key_code, message_text) {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				// append the filter to file
				create_file_then_append_data(msg, filter_filename, filter_key_code, endl=";");
				embed_info_reply(msg, message_text);
				console_log(message_text + " for " + msg.guild.name, error=false, mod=true);
			
				if (filter_onoff[msg.guild.id] == undefined) {
					filter_onoff[msg.guild.id] = [];
				}
				filter_onoff[msg.guild.id].push(filter_key_code);
			} else {
				embed_error(msg, "You dont have permission to use the content filtering commands, " + mod_error_text + " manage messages permission!");
			}
		}
	} catch (err) {
		console_log("Error thrown in do_filter function! " + err, error=true);
	}
}

function filter_help(msg) {
	try {
		// embed
		embed_filter = new Discord.MessageEmbed();
		embed_filter.setColor(embed_colour_info);
		embed_filter.setTitle("Content Filtering Help");
		embed_filter.setDescription("Content filtering is a feature that allows the bot to automatically remove and warn users who post, "+
		"porn, phishing links, spam, promotions, tags, and use offensive language.");
		embed_filter.addFields(
			{name: "-filter help", value: "Shows this help menu.\n\u200B"},
			{name: "-filter on", value: "Turns on all contenting filters, including porn, phishing links, spam, promotions, tags and the offensive language filter.\n\u200B"},
			{name: "-filter on porn", value: "Turns on the porn links content filter, any links to porn sites will be removed with this filter.\n\u200B"},
			{name: "-filter on phishing", value: "Turns on the phishing links content filter, any links to phishing sites will be removed.\n\u200B"},
			{name: "-filter on spam", value: "Turns on the anti-spam content filter, users will be warned for typing the same message multiple times.\n\u200B"},
			{name: "-filter on emojispam", value: "Turns on the emoji content filter, this filter will automtically ban specific emojis, type `-emoji` for more info.\n\u200B"},
			{name: "-filter on promotion", value: "Turns on the anti-promotion filter, this filter will automatically delete discord invites to other servers.\n\u200B"},
			{name: "-filter on tag", value: "Turns on the anti-tag filter, this filter will automatically delete here and everyone tags.\n\u200B"},
			{name: "-filter on mod", value: "Turns on the anti-admin filter, this filter deletes messages where users beg for admin or mod.\n\u200B"},
			{name: "-filter on language", value: "Turns on the language filter, this filter will automatically delete messages that contain offensive language.\n\u200B"},
			{name: "-filter off", value: "This will remove all filters currently setup for your server.\n\u200B"},
		)
		embed_filter.setTimestamp();
		msg_channel_send(msg, embed_filter);
	} catch (err) {
		console_log("Error thrown in filter_help function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"filter") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				if (msg.content.toLowerCase() == prefix[msg.guild.id]+"filter on") {
					do_filter(msg, "199", "All filters have been turned on!");
		
				} else if (msg.content.toLowerCase() == prefix[msg.guild.id]+"filter off") {
					// get directory
					auto_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
					auto_path = logging_path + "/" + auto_dir + "/" + filter_filename;
		
					// write file
					fs_write.writeFile(auto_path, "", function(err) {
						if (err) {
							return console_log("Failed to write to filter file!", error=true);
						}
					})
		
					// clear filters from dir
					filter_onoff[msg.guild.id] = [];
		
					// message user
					embed_info_reply(msg, "All filters has been turned off!");
					console_log("All filters turned off for server " + msg.guild.id, error=false, mod=true);
		
				} else if (msg.guild != null && msg.content.slice(0, 15).toLowerCase() == prefix[msg.guild.id]+"filter on porn") {
					do_filter(msg, "101", "The porn links filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 19).toLowerCase() == prefix[msg.guild.id]+"filter on phishing") {
					do_filter(msg, "102", "The phishing links filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 15).toLowerCase() == prefix[msg.guild.id]+"filter on spam") {
					do_filter(msg, "103", "The spam filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 20).toLowerCase() == prefix[msg.guild.id]+"filter on emojispam") {
					do_filter(msg, "104", "The emoji spam filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 20).toLowerCase() == prefix[msg.guild.id]+"filter on promotion") {
					do_filter(msg, "105", "The promotions filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 14).toLowerCase() == prefix[msg.guild.id]+"filter on tag") {
					do_filter(msg, "106", "The everyone and here tags filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 14).toLowerCase() == prefix[msg.guild.id]+"filter on mod") {
					do_filter(msg, "107", "The asking to be mod filter has been turned on!");
		
				} else if (msg.guild != null && msg.content.slice(0, 19).toLowerCase() == prefix[msg.guild.id]+"filter on language") {
					do_filter(msg, "108", "The offensive language filter has been turned on!");
				} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"filter" || msg.content == prefix[msg.guild.id]+"filter help") {
					filter_help(msg);
				}
			} else {
				embed_error(msg, "You dont have permission to use the filter command, " + mod_error_text + " manage messages permission!");
			}
		}
	}
})

bot.on("ready", msg => {
	setTimeout(function(){
		read_file(filter_filename, filter_onoff);
		console_log("content filtering rules read!");
	}, 5000);
})

// send message if server is not authroised to run command
bot.on("message", msg => {
	if (msg.author.id != bot_ID) {
		if (msg.guild != null && msg.content.slice(0,1) == prefix) {
			if (msg.content != prefix+"authorise" && msg.content != prefix+"help") {
				var error_text = "[Authorization Error]";
				if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) == -1 && msg.content.indexOf(error_text) == -1) {
					embed_error(msg, error_text+" Your Server is not authorised to run this command! Please type `-authorise` to authorise your server ID!");
				}
			}
		}
	}
})

// authorise server

function authorise_server(msg, reply=true) {
	try {
		// get the server ID
		Server_ID = msg.guild.id;
		
		if (authrosied_server_IDs.indexOf(Server_ID) > -1) {
			if (reply == true) {
				embed_info_reply(msg, "Your Server has already been authorised!");
			}
		} else {
			// write server ID to file
			fs_append.appendFile(authorised_servers, Server_ID + ";\n", function(err) {
				if (err) {
					if (reply == true) {
						embed_error(msg, "Failed to authorise your server ID!");
					}
					return console_log("Failed to authorise server ID", error=true);
				} else {
					if (reply == true) {
						embed_info_reply(msg, "Your Server ID has been authorised!");
					}
					console_log("Server " + msg.guild.id + " has been authorised!");
				
					// update variable
					authrosied_server_IDs.push(Server_ID);
				}
			})
		}
	} catch (err) {
		console_log("Failed to Authorise server, error thrown in authorise_server function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && msg.content == prefix[msg.guild.id]+"authorise") {
		authorise_server(msg, reply=true);
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
					console_log("CURRENT: " + current_message);
					console_log("PREVIOUS: " + previous_message);
						
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
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
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
							
							//console_log([msg.application.name, msg.channel.id]);
						} catch {
							console_log("Application Invite link detected!");
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
	}).catch(err => {
		console_log("Error thrown in spotify adds link detector! " + err, error=true);
	})
})

// change nickname
/*bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 16) == prefix[msg.guild.id]+"changenickname " || msg.content.slice(0, 12) == prefix[msg.guild.id]+"changenick ") {
			if (msg.member.hasPermission("CHANGE_NICKNAME") == true) {
				if (!msg.guild.me.hasPermission("CHANGE_NICKNAME")) {
					embed_error(msg, "The bot doesn't have permission to change the users nickname!");
				} else {
					let member = msg.mentions.members.first();
					if (member == undefined) {
						msg.member.setNickname(msg.content.split(/ (.+)/)[1]);
					
					} else {
						member.setNickname(msg.content.split(/ (.+)/)[1]);
					}
				}
				
			}
		}
	}
})*/

// slowmode
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"slowmode off") {
			msg.channel.setRateLimitPerUser("0");
			embed_chat_reply(msg, "slow mode has been turned off!");
			
		} else if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"slowmode ") {
			if (msg.member.hasPermission("MANAGE_MESSAGES") == true) {
				command = msg.content.slice(10, msg.content.length);
				
				// check for 0 interval
				if (command == "0") {
					msg.channel.setRateLimitPerUser(0);
					embed_chat_reply(msg, "Slowmode has been turned off!");
					return true;
				}
				
				// allow MM:SS format
				if (command.indexOf(":") > -1) {
					mins = command.split(":")[0];
					secs = command.split(":")[1];
					if (isInt_without_error(mins, -1, 361) == true) {
						if (isInt_without_error(secs, -1, 61) == true) {
							time = String((parseInt(mins)*60) + parseInt(secs));
						} else {
							if (secs > 60) {
								embed_error(msg, "There are 60 seconds in a min, your seconds value can't be larger then 60!");
							} else {
								embed_error(msg, "Invalid format your specified seconds is not an integer between 0 and 60! The syntax for the command is `-slowmode {MM:SS}`");
							}
							return false;
						}
					} else {
						embed_error(msg, "Invalid format your specified mins is not an integer! The syntax for the command is `-slowmode {MM:SS}`");
						return false;
					}
				} else {
					time = command;
				}
				
				if (isInt(msg, time, 0, 21601, "interval", ErrorMessageEnd="The syntax for the command is `-slowmode {MM:SS}`") == true) {
					msg.channel.setRateLimitPerUser(parseInt(time));
					embed_chat_reply(msg, "Slowmode has been set to " + time + " seconds!");
				}
				
			} else {
				embed_error(msg, "You dont have permission to use slowmode, "+mod_error_text+" manage messages permission!");
			}
		}
	}
})

// Custom Embed Generator
function get_tag_value(txt, tag) {
	try {
		if (commands.indexOf("["+tag+"]") > -1 && commands.indexOf("[/"+tag+"]") > -1) {
			current = commands.split("["+tag+"]")[1].split("[/"+tag+"]");
			if (current.length == 2) {
				return current[0];
			}
		}
	} catch (err) {
		console_log("Error thrown in get_tag_value function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"embed ") {
			commands = msg.content.slice(7, msg.content.length);
			color_codes = {
				"red" : "#FF0000", "cyan" : "#00FFFF", "blue" : "#0000FF", "dark blue" : "#0000A0", "light blue" : "#ADD8E6", "purple" : "#800080",
				"yellow" : "#FFFF00", "lime" : "#00FF00", "magenta" : "#FF00FF", "white" : "	#FFFFFF", "silver" : "#C0C0C0", "grey" : "#808080",
				"black" : "#000000", "orange" : "#FFA500", "brown" : "#A52A2A", "maroon" : "#800000", "green" : "#008000", "olice" : "#808000"
			}
			
			// embed
			embed_custom = new Discord.MessageEmbed();
			
			// setColor - [color]hex color[/color]
			color = get_tag_value(commands, "color");
			if (color != undefined) {
				if (Object.keys(color_codes).indexOf(color) > -1) {
					embed_custom.setColor(color_codes[color]);
				}
			}
			
			// setTitle - [title]text[/title]
			title = get_tag_value(commands, "title");
			if (title != undefined) {
				embed_custom.setTitle(title);
			}
			
			// setDescription - [description]text[/description]
			description = get_tag_value(commands, "description");
			if (description != undefined) {
				embed_custom.setDescription(description);
			}
			
			// setThumbnail - [thumb]url[/thumb]
			thumbnail = encodeURI(get_tag_value(commands, "thumb"));
			if (thumbnail != "undefined") {
				embed_custom.setThumbnail(thumbnail);
			}
			
			// setURL - [url]url[/url]
			url = encodeURI(get_tag_value(commands, "url"));
			if (url != "undefined") {
				embed_custom.setURL(url);
			}
			
			// setImage - [image]url[/image]
			img = encodeURI(get_tag_value(commands, "image"));
			if (img != "undefined") {
				embed_custom.setImage(img);
			}
			
			// setTimestamp - [timestamp]
			if (commands.indexOf("[timestamp]") > -1) {
				embed_custom.setTimestamp();
			}
			
			// setAuthor - [author]text, url, url[/author]
			author = String(get_tag_value(commands, "author")).split(", ").join("").split(",");
			if (author != "undefined") {
				if (author.length == 3) {
					author_text = author[0];
					author_url = encodeURI(author[1]);
					author_url2 = encodeURI(author[2]);
					if (author_url.replace(/s/g, "").indexOf("http://") > -1) {
						if (author_url2.replace(/s/g, "").indexOf("http://") > -1) {
							embed_custom.setAuthor(author_text, author_url, author_url2);
						} else {
							embed_custom.setAuthor(author_text, author_url);
						}
					} else {
						embed_custom.setAuthor(author_text);
					}
				} else if (author.length == 2) {
					if (author[1].replace(/s/g, "").indexOf("http://") > -1) {
						embed_custom.setAuthor(author[0], encodeURI(author[1]));
					} else {
						embed_custom.setAuthor(author[0]);
					}
				} else {
					embed_custom.setAuthor(author[0]);
				}
			}
			
			// addField - [field]header[field] [value]value [inline][/value]
			output = commands;
			
			for (i=0;i<(commands.match(/field/g) || []).length;i++) {
				current_field_index = output.indexOf("[field]");
				if (current_field_index != -1) {
					output = output.slice(current_field_index, output.length);
					field = String(output.slice(output.indexOf("[field]")+7, output.indexOf("[/field]")));
					output = output.slice(field.length, output.length);
					value = String(output.slice(output.indexOf("[value]")+7, output.indexOf("[/value]")));
					
					if (field != "" && value != "") {
						if (i <= 25) {
							if (field.length <= 256 && value.length <= 1024) {
								field_name = field.replace(/\\n/g, "\n\u200B").replace(/\\b/g, "\u200B");
								field_value = value.replace(/\\n/g, "\n\u200B").replace(/\\b/g, "\u200B");
								if (field_value.indexOf("[inline]") > -1) {
									embed_custom.addField(field_name, field_value, true);
								} else {
									embed_custom.addField(field_name, field_value, false);
								}
							}
						}
					}
				}
			}
			
			// setFooter - [footer]text, url[/footer]
			footer = String(get_tag_value(commands, "footer")).split(", ").join(",").split(",");
			if (footer != "undefined") {
				if (footer.length == 2) {
					if (footer[1].replace(/s/g, "").indexOf("http://") == 0) {
						embed_custom.setFooter(footer[0], encodeURI(footer[1]));
					} else {
						embed_custom.setFooter(footer[0]);
					}
				} else {
					embed_custom.setFooter(footer[0]);
				}
			}
			
			// send message
			msg.channel.send(embed_custom).catch(err => {
				embed_error(msg, "Failed to create embed, you likely entered Invalid data, please refer to `-help embed` for information on how to use the command! " + err);
			})
			
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"embed") {
			embed_custom_help = new Discord.MessageEmbed();
			embed_custom_help.setColor(embed_colour_info);
			embed_custom_help.setTitle("Embed Generator");
			embed_custom_help.setDescription("With the embed command you can create your own custom embeds, "+
			"the syntax for the command is `-embed [tags]`, you can use any and all of the specified tags below.\n\u200B");
			embed_custom_help.addFields(
				{name: "[color][/color]", value: "Embed colour e.g. `[color]blue[/color]`.\n\u200B"},
				{name: "[title][/title]", value: "Title e.g. `[title]Server Rules[/title]`.\n\u200B"},
				{name: "[url][/url]", value: "Title Hyperlink e.g. `[url]https://a.com[/url]`.\n\u200B"},
				{name: "[description][/description]", value: "Description e.g. `[description]text[/description]`.\n\u200B"},
				{name: "[thumb][/thumb]", value: "Thumbnail e.g. `[thumb]https://a.com/cat.png[/thumb]`.\n\u200B"},
				{name: "[image][/image]", value: "Image e.g. `[image]https://a.com/cat.png[/image]`.\n\u200B"},
				{name: "[author][/author]", value: "Author e.g. `[author]Jared, https://a.com/cat.png, https://a.com[/author]`.\n\u200B"},
				{name: "[field][/field]", value: "Add Field e.g. `[field]a field[/field]`.\n\u200B"},
				{name: "[value][/value]", value: "Add Field Value e.g. `[value]Some value here[/value]`.\nYou can put fields on same line with `[inline]` tag.\n\u200B"},
				{name: "[timestamp]", value: "Add Timestamp e.g. `[timestamp]`.\n\u200B"},
				{name: "[footer][/footer]", value: "Add Footer e.g. `[footer]text, url, url[/footer]`.\n\u200B"},
				{name: "Special Chars", value: "To add a new line anywhere in your embed type `\\n`, to create blank field type `\\b`."}
			)
			embed_custom_help.setTimestamp();
			msg_channel_send(msg, embed_custom_help);
			
		}
	}
})

// translate
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0,11) == prefix[msg.guild.id]+"translate ") {
			src = msg.content.slice(11,msg.content.length);
			
			async function process_lan() {
				try {
					url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";
					source_lan = "auto"
					destin_lan = "eng"
					url_encode = encodeURI(url + source_lan + "&tl=" + destin_lan + "&dt=t&q=" + src);
			
					// get html
					request(url_encode, {
						headers: {
							"User-Agent": user_agent
						},
						body: "",
						method: "GET"
					}, (err, res, html) => {
						if (res.statusCode == 200) {
							// process HTML
							decoded = JSON.parse(html)[0][0][0];
							console_log("Google Translate API translated text on " + msg.guild.name);
						
							// check user input for swear
							if (check_msg_for_swear(msg, doReply=false, deleteMsg=false) != true) {
								// check bot reply
								if (check_msg_for_swear(msg, doReply=false, deleteMsg=false, textInput=decoded) == true) {
									embed_modderation(msg, "<@" + msg.author.id + "> No translating offensive or alarming messages!", "WARNING!");
								
									// try to delete message
									msg.delete().catch(error => {
										console_log("Failed to delete message on guild " + msg.guild.name);
									})
								
								} else {
									// embed
									translate_description = "Output from Translate API";
									translate_URL = "https://translate.google.com/";
									embed_input_output_reply(msg, src, decoded, "Translation", translate_description, url=translate_URL);
								}
							}
						}
					})
				} catch (err) {
					console_log("Error throw in process_lan function! " + err, error=true);
				}
			} process_lan().catch(error => {
				console_log("error thrown in process_lan function! " + error, error=true);
			})
		}
	}
})

// base (convert to hex, oct, bin)
function hex_oct_bin(msg, base, base_name) {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.guild != null && msg.content.slice(0,5) == prefix[msg.guild.id]+base_name+" ") {
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
	} catch (err) {
		console_log("Error thrown in hex_oct_bin function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		hex_oct_bin(msg, 16, "hex");
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		hex_oct_bin(msg, 8, "oct");
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		hex_oct_bin(msg, 2, "bin");
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"base") {
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
	try {
		if (content.slice(0, command.length+2) == prefix[msg.guild.id]+command+" ") {
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
	} catch (err) {
		console_log("Error thrown in base2int function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"bin2int ") {
			base2int(msg, msg.content, "bin2int", "binary", 2, "01");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"oct2int ") {
			base2int(msg, msg.content, "oct2int", "octodecimal", 8, "01234567");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"hex2int ") {
			base2int(msg, msg.content, "hex2int", "hexadecimal", 16, "0123456789abcdef");
		}
	}
})

// bin2text, oct2text, hex2text
function base2text(msg, base_charset, base) {
	try {
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
		embed_input_output_reply(msg, values.join(" "), output, "Calculator", "type -help math for list of commands");
	} catch (err) {
		console_log("Error thrown in base2text function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"bin2text ") {
			base2text(msg, "01", 2);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"oct2text ") {
			base2text(msg, "01234567", 8);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"hex2text ") {
			base2text(msg, "0123456789abcdef", 16);
		}
	}
})


// int to roman numberal
function int2roman(msg, num) {
	try {
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
				embed_input_output_reply(msg, num, answer, "Calculator", "type -help math for list of commands");
			} else {
				embed_error(msg, "Invalid Range! Make sure that your number is between 0 and 4999!");
			}
		} else {
			embed_error(msg, "Invalid Input! make sure that your number is an integer!");
		}
	} catch (err) {
		console_log("Error thrown in int2roman function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 7) == prefix[msg.guild.id]+"roman ") {
			int2roman(msg, msg.content.slice(7, msg.content.length));
		}
	}
})

// mov2mp4
function help_mp4(msg) {
	embed_mp4 = new Discord.MessageEmbed();
	embed_mp4.setColor(embed_color_chat);
	embed_mp4.setTitle("Help File Converter");
	embed_mp4.setDescription("Converts a video file to another format format, type any of the commands below when uploading an attachment to discord to convert the file.\n\u200B");
	embed_mp4.addFields(
		{name: "-mp4", value: "Converts to mp4 (file will be under 8MB).\n\u200B"},
		{name: "-mov", value: "Converts tp mov (file will be under 8MB).\n\u200B"},
		{name: "-webm", value: "Converts to webm (file will be under 8MB).\n\u200B"},
		{name: "-mp4hd", value: "Converts to mp4 (produces HD file, size will be under 100MB).\n\u200B"},
		{name: "-movhd", value: "Converts to mov (produces HD file, size will be under 100MB).\n\u200B"},
		{name: "-webmhd", value: "Converts to webm (produces HD file, size will be under 100MB).\n\u200B"},
		{name: "-render", value: "`-help render`"}
	)
	embed_mp4.setTimestamp();
	msg.channel.send(embed_mp4);
}

function help_render(msg) {
	embed_render = new Discord.MessageEmbed();
	embed_render.setColor(embed_color_chat);
	embed_render.setTitle("Help Render");
	embed_render.setDescription("The render command is used to automatically render MLT files, `.mlt` is the project file extension of the "+
	"[Shotcut](https://shotcut.org/) video editor. This feature is very useful for people who want to get into video editing but don’t have "+
	"computers powerful enough to render there own videos. Below are instructions on how to use the render engine.\n\u200B");
	embed_render.addFields(
		{name: "1. Copy Files", value: "The first thing you are going to want to do is copy all of your project files into a single folder, this inclues the `.mlt` file, and any video, audio or other files you have used in the project.\n\u200B"},
		{name: "2. Create Zip", value: "Next, create a zip file of all of your project files (you can use a program like [WinRar](https://www.rarlab.com/download.htm) or [7-Zip](https://www.7-zip.org/) to do this), make sure that the files are located in the root of the zip, i.e. they are not in any sub folder.\n\u200B"},
		{name: "3. Upload File", value: "Now that you have your zip file ready, upload the file to discord and type the comand `-render` to begin rendering the video file.\n\u200B"},
		{name: "4. Wait", value: "Finaly after the file has been successfully uploaded to discord, simply wait for the render to finish, JaredBot will post a link to the file when it is done.\n\u200B"},
		{name: "Further help", value: "Please feel free to [watch this video](https://youtu.be/DV0tHwlGD_M) for more information!\n\u200B"}
	)
	embed_render.setTimestamp();
	msg_channel_send(msg, embed_render);
}

mov2mp4_timeout = {};
run_command = {};
mov2mpt_start_time = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 4) == prefix[msg.guild.id]+"mp4" || msg.content.slice(0, 4) == prefix[msg.guild.id]+"mov" || 
		msg.content.slice(0, 5) == prefix[msg.guild.id]+"webm" || msg.content.slice(0, 6) == prefix[msg.guild.id]+"mp4hd" || 
		msg.content.slice(0, 6) == prefix[msg.guild.id]+"movhd" || msg.content.slice(0, 7) == prefix[msg.guild.id]+"webmhd") {
			url = undefined;
			if (msg.content.split(" ").length == 2) {
				if (msg.content.split(" ")[1].replace("https","http").slice(0, 38) == "http://cdn.discordapp.com/attachments/") {
					url = msg.content.split(" ")[1];
				}
			} else {
				msg.attachments.forEach(function(attachment) {
					url = attachment.url;
				})
			}
			
			// check for undefined URL
			if (url == undefined) {
				embed_error(msg, "Not a valid URL or attachment!");
				return false;
			}
			
			// check for undefined timeout
			if (mov2mp4_timeout[msg.guild.id] == undefined) {
				mov2mp4_timeout[msg.guild.id] = false;
			}
			
			if (mov2mp4_timeout[msg.guild.id] == false) {
				// set bitrate
				if (msg.content.slice(0, 6) == prefix[msg.guild.id]+"mp4hd" || msg.content.slice(0, 6) == prefix[msg.guild.id]+"movhd" ||
				msg.content.slice(0, 7) == prefix[msg.guild.id]+"webmhd") {
					// bit rate
					audio_bitrate = 200;
					target_size = 90;
					max_file_size = 100;
					flags = ' -af "volumedetect" -vn -sn -dn -f null -c:v h264_nvenc';
				
					// web server location
					extension = msg.content.split(".")[msg.content.split(".").length-1].replace(prefix[msg.guild.id],"");
					filename = msg.guild.id+"_"+parseInt((new Date().getTime()) / 1024)+"_output." + extension;
					output_file = server_folder_location + "videos/src/" + filename;
				
				} else {
					// bitrate
					audio_bitrate = 50;
					target_size = 7;
					max_file_size = 8;
					flags = ' -af "volumedetect" -vn -sn -dn -f null -c:v h264_nvenc -r 8 -filter:v fps=fps=8';
				
					// server folder path
					extension = msg.content.split(".")[msg.content.split(".").length-1].replace(prefix[msg.guild.id],"");
					server_name = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id; // server folder
					filename = msg.guild.id+"_"+parseInt((new Date().getTime()) / 1024)+"_output." + extension;
					output_file = server_folder_location + "videos/src/" + filename;
				}
			
				// encode video
				if (url != undefined) {
					mov2mp4_timeout[msg.guild.id] = true;
					mov2mpt_start_time[msg.guild.id] = new Date();
					file2large = false;
					if (url.slice(0, 39) == "https://cdn.discordapp.com/attachments/" && url.indexOf(" ") == -1) {
						if (url.indexOf(".mov") > -1 || url.indexOf(".avi") > -1 || url.indexOf(".webm") > -1 || url.indexOf(".mp4") > -1) {
							// get video length
							console_log("getting file meta data " + msg.guild.name + "!", error=false, mod=true);
							msg_channel_send(msg, "Getting file meta data!");
							exec('ffprobe -i "'+url+'" -show_entries format=duration -v quiet -of csv="p=0"', (err, stdout_size, stderr) => {
								if (err) {
									embed_error("Failed to get video meta data!");
									console_log("Failed to get video meta data!", error=true);
								}
							
								// calc bitrate
								bitrate = parseInt((((target_size * 1024 * 1024 * 8) / stdout_size.replace('\r\n','')) / 1024) - audio_bitrate) + "k";
								cmd = 'ffmpeg -y -i "' + url + '" -b:v '+bitrate+' -b:a '+audio_bitrate+'k -qscale 0 "' + output_file + '"' + flags;
							
								// process video
								msg.channel.send("Encoding video please wait!").then(reply_msg => {
									console_log("File Encoding started on " + msg.guild.name + "!", error=false, mod=true);
									
									// edit message
									edit_interval = setInterval(function(){
										fs_read.stat(output_file, function(err, stats) {
											percnt = parseInt(((stats.size / 1024 / 1024) / max_file_size)*100);
											reply_msg.edit("Encoding video please wait! ["+percnt+"% complete]!");
											
											// check if file is to large for discord
											if (stats.size > (max_file_size*1024*1024) || (new Date() - mov2mpt_start_time[msg.guild.id])/1000 > max_render_time) {
												if ((new Date() - mov2mpt_start_time[msg.guild.id]) > max_render_time) {
													embed_error(msg, "Stopped processing file as it is taking to long to encode!");
												} else {
													embed_error(msg, "Error this file can't be uploaded to discord as it is to large! Max file size is 8MB!");
												}
												
												reply_msg.edit("Encoding video please wait! [100% complete]!");
												clearInterval(edit_interval);
												mov2mp4_timeout[msg.guild.id] = false;
												file2large = true;
												
												// kill ffmpeg process
												if (run_command[msg.guild.id] != undefined && run_command[msg.guild.id]._handle != null) {
													try {
														for (i=0;i<5;i++) {
															exec("taskkill /f /im ffmpeg.exe", (err, stdout, stderr) => {
																console_log("ffmpeg process terminated!", error=false, mod=true);
																mov2mp4_timeout[msg.guild.id] = false;
															})
														}
													} catch (err) {
														console_log("Error failed to shutdown ffmpeg process!", error=true);
													}
												}
												
												// delete file
												setTimeout(function() {
													fs_read.unlink(output_file, function(err) {
														if (err) {
															console_log("Failed to delete output.mp4 on " + msg.guild.name + "! " + err, error=true);
														}
														console_log("Deleted output.mp4 on " + msg.guild.name + "!", error=false, mod=true);
													})
												}, 5000)
											}
										})
									}, 2000, output_file, msg);
									
									// encode
									run_command[msg.guild.id] = exec(cmd, (err, stdout, stderr) => {
										console_log("Finished encoding file for " + msg.guild.name + "!", error=false, mod=true);
								
										// check if file exists
										if (fs_read.existsSync(output_file) == true) {
											if (msg.content.slice(0, 4) == prefix[msg.guild.id]+"mp4" || msg.content.slice(0, 4) == prefix[msg.guild.id]+"mov" || 
												msg.content.slice(0, 5) == prefix[msg.guild.id]+"webm") {
												if (file2large == false) {
													msg_channel_send(msg, "Uploading file to discord servers!").then(uploading_reply => {
														input_extension = url.split(".")[url.split(".").length-1].replace(prefix[msg.guild.id],"");
														msg.channel.send("Converted `"+input_extension+"` to `"+extension+"`", { files: [output_file] }).then (sent_file => {
															console_log("File sent to server " + msg.guild.name + "!");
															mov2mp4_timeout[msg.guild.id] = false;
															clearInterval(edit_interval);
															reply_msg.edit("Encoding video please wait! [100% complete]!");
											
															// delete file
															fs_read.unlink(output_file, function(err) {
																if (err) {
																	console_log("Failed to delete output file on " + msg.guild.name + "! " + err, error=true);
																}
																console_log("Deleted output file on " + msg.guild.name + "!", error=false, mod=true);
															})
														}).catch(err => {
															embed_error(msg, "Failed to upload file! " + err);
															mov2mp4_timeout[msg.guild.id] = false;
															clearInterval(edit_interval);
														})
													})
												} else {
													mov2mp4_timeout[msg.guild.id] = false;
													clearInterval(edit_interval);
												}
											} else if (msg.content.slice(0, 6) == prefix[msg.guild.id]+"mp4hd" || 
												msg.content.slice(0, 6) == prefix[msg.guild.id]+"movhd" ||
												msg.content.slice(0, 7) == prefix[msg.guild.id]+"webmhd") {
												// link to file on web server
												msg_channel_send(msg, webserver_root_address + "videos/src/" + filename);
												reply_msg.edit("Encoding video please wait! [100% complete]!");
												mov2mp4_timeout[msg.guild.id] = false;
												clearInterval(edit_interval);
											}
										} else {
											embed_error(msg, "Failed to encode the file!");
											mov2mp4_timeout[msg.guild.id] = false;
											clearInterval(edit_interval);
										}
									})
								})
							})
						} else {
							embed_error(msg, "Invalid file type, please make sure to provide a valid file format such as: `.mov`, `.webm`, `.avi`!");
							mov2mp4_timeout[msg.guild.id] = false;
						}
					} else {
						embed_error(msg, "Not as valid discord attachment!");
						mov2mp4_timeout[msg.guild.id] = false;
					}
				} else {
					help_mp4(msg);
				}
			} else {
				embed_error(msg, "Please wait for the first video file to finish encoding before trying to encode another!");
			}
		}
	}
})

// render project
render_timeout = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix[msg.guild.id]+"render") {
			url = undefined;
			msg.attachments.forEach(function(attachment) {
				url = attachment.url.replace("https", "http");
			})
			
			// check for undefined timeout
			if (mov2mp4_timeout[msg.guild.id] == undefined) {
				mov2mp4_timeout[msg.guild.id] = false;
			}
			
			if (mov2mp4_timeout[msg.guild.id] == false) {
				if (url != undefined) {
					mov2mp4_timeout[msg.guild.id] = true;
					if (url.indexOf(" ") == -1 && url.indexOf("http://cdn.discordapp.com/attachments/") > -1) {
						if (url.indexOf(".zip") > -1) {
							// file name
							fname = "project_" + msg.guild.id + "_" + parseInt((new Date().getTime())/1000) + ".zip";
							mlt_local = server_folder_location + "videos/mlt/" + fname;
							mlt_dir = server_folder_location + "videos/mlt/" + fname.replace(".zip","");
							mlt_name = mlt_dir + "/" + fname.replace(".zip", ".mlt");
							mp4_output = server_folder_location + "videos/src/" + fname.replace(".zip", ".mp4");
							online_output = webserver_root_address + "videos/src/" + fname.replace(".zip", ".mp4");
							
							async function extract_zip(file_name, target_dir) {
								await fs_append.promises.mkdir(target_dir, {recursive: true});
								try {
									// extract file
									await zip_extract(file_name, {dir: target_dir});
									console_log("Finished extracting zip file!", error=false, mod=true);
									
									// rename files
									fs_append.readdirSync(target_dir).forEach(file => {
										if (file.split(".")[file.split(".").length -1] == "mlt") {
											fs_append.rename(target_dir +"/"+file, mlt_name, function(err) {
												console_log("Renamed mlt file!", error=false, mod=true);
											});
										}
									})
								} catch (err) {
									console_log("Failed to extract zip file! " + err, error=true);
								}
							}
							
							// kill melt process
							render_timeout[msg.guild.id] = setTimeout(function(){
								if (run_command[msg.guild.id] != undefined && run_command[msg.guild.id]._handle != null) {
									try {
										exec("taskkill /f /im melt.exe", (err, stdout, stderr) => {
											console_log("melt process terminated!", error=false, mod=true);
											mov2mp4_timeout[msg.guild.id] = false;
											clearTimeout(render_timeout);
											msg_channel_send(msg, "Script terminated as it ran for too long, max CPU time is " + parseInt(max_render_time/1000/60) + " mins!");
											
											// delete output file
											setTimeout(function(){
												try {
													fs_append.unlinkSync(mp4_output);
												} catch (err) {
													console_log("Failed to delete output file " + mp4_output + "!", error=true);
												}
											}, 1000, mp4_output);
										})
									} catch (err) {
										console_log("Error failed to shutdown ffmpeg process!", error=true);
									}
								}
							}, max_render_time, msg, mp4_output);
							
							// download zip
							msg_channel_send(msg, "Downloading Zip file!");
							download(url, mlt_local, function(fobject) {
								// extract zip
								msg_channel_send(msg, "Extracting zip!");
								extract_zip(mlt_local, mlt_dir).then(function() {
									// render video
									msg.channel.send("Rendering video file!").then(render_msg => {
										cmd = '"' + shotcut_melt_location + '" "' + mlt_name + '" -consumer avformat:'+mp4_output+' f=mp4 -silent -quiet';
										run_command[msg.guild.id] = exec(cmd, (err, stdout, stderr) => {
											console_log("Finished rendering file file for " + msg.guild.name + "!", error=false, mod=true);
											
											// delete files (cleanup)
											try {
												fs_append.rmdirSync(mlt_dir, {recursive: true});
												fs_append.unlinkSync(mlt_local);
												
											} catch (err) {
												console_log("Failed to remove MLT files! " + err, error=true);
											}
										
											// check if file exists
											if (fs_read.existsSync(mp4_output) == true) {
												// message user
												msg_channel_send(msg, online_output);
												mov2mp4_timeout[msg.guild.id] = false;
												clearTimeout(render_timeout);
											} else {
												embed_error(msg, "Failed to render video!");
												mov2mp4_timeout[msg.guild.id] = false;
												clearTimeout(render_timeout);
											}
										})
									})
								})
							})
						} else {
							embed_error(msg, "Please provide a zip file, containg your `.mlt` file and other video files.");
							mov2mp4_timeout[msg.guild.id] = false;
							clearTimeout(render_timeout);
						}
					} else {
						embed_error(msg, "Not a valid discord attachment!", error=true);
						mov2mp4_timeout[msg.guild.id] = false;
						clearTimeout(render_timeout);
					}
				} else {
					help_render(msg);
				}
			} else {
				embed_error(msg, "Please wait for the first video file to finish rendering before trying to render another!");
				mov2mp4_timeout[msg.guild.id] = false;
				clearTimeout(render_timeout);
			}
		}
	}
})

// YouTube download
function max_number(num){
	if (num > 100) {
		return "video taking longer then expected to download (file might be very large)...";
	} else {
		return num + "%";
	}
}

var yt_download_time = {};
var yt_download_interval = {};
var yt_download_start_time = {};
var yt_timeout = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.slice(0, 10) == prefix[msg.guild.id]+"download ") {
			url = msg.content.slice(10, msg.content.length).replace("http://", "https://");
			if (url.indexOf(" ") == -1) {
				if (url.indexOf("https://youtu.be") == 0 || url.indexOf("https://www.youtube.com") == 0) {
					// check for undefined
					if (yt_timeout[msg.guild.id] == undefined) {
						yt_timeout[msg.guild.id] = false;
					}
					
					if (yt_timeout[msg.guild.id] == false) {
						yt_timeout[msg.guild.id] = true;
					
						// file names
						fname =  msg.guild.id + "_" + parseInt((new Date().getTime())/1000);
						output_video = server_folder_location + 'videos/src/temp_vid_'+fname+'.mp4';
						output_audio = server_folder_location + 'videos/src/temp_audio_'+fname+'.wav';
						mered_video = server_folder_location + 'videos/src/output_'+fname+'.mp4';
						online_url = webserver_root_address + 'videos/src/output_'+fname+'.mp4';
					
						// download time
						async function get_download_time() {
							data = await ytdl.getBasicInfo(url);
							yt_download_time[msg.guild.id] = parseInt(data.videoDetails.lengthSeconds / average_download);
						} get_download_time();
					
						// process video
						msg.channel.send("Downloading please wait...").then(msg_reply => {
							// timeout
							yt_download_interval[msg.guild.id] = setInterval(function() {
								if (yt_download_start_time[msg.guild.id] != undefined) {
									yt_download_start_time[msg.guild.id] += 2;
									if (yt_download_time[msg.guild.id] != undefined) {
										if (yt_download_time[msg.guild.id] > yt_download_start_time[msg.guild.id]) {
											current_prct = parseInt((yt_download_start_time[msg.guild.id] / yt_download_time[msg.guild.id])*100);
											msg_reply.edit("Downloading please wait... " + max_number(current_prct)).catch(err => {
												console_log("Failed to edit message! " + err, error=true);
											})
										}
									}
								}
							}, 2000, msg, msg_reply);
							
							try {
								// download video
								yt_download_time[msg.guild.id] = 1;
								yt_download_start_time[msg.guild.id] = 0;
								current_prct = max_number(parseInt((yt_download_start_time[msg.guild.id] / yt_download_time[msg.guild.id])*100));
								msg_reply.edit("Downloading video... " + current_prct);
								ytdl(url, {quality: "highestvideo", filter: "video"}).pipe(fs_write.createWriteStream(output_video)
								).on("finish", vid => {
									console_log("Downloaded video!", error=false, mod=true);
						
									// download audio
									current_prct = max_number(parseInt((yt_download_start_time[msg.guild.id] / yt_download_time[msg.guild.id])*100));
									msg_reply.edit("Downloading audio... " + current_prct);
									ytdl(url, {filter:"audioonly", quality:"highestaudio"}).pipe(fs_write.createWriteStream(output_audio)
									).on("finish", aud => {
										console_log("Downloaded Audio!", error=false, mod=true);
							
										// merge with ffmpeg
										current_prct = max_number(parseInt((yt_download_start_time[msg.guild.id] / yt_download_time[msg.guild.id])*100));
										msg_reply.edit("merging video and audio... " + current_prct);
										cmd = 'ffmpeg -i "' + output_video + '" -i "' + output_audio + '" -c:v copy -c:a aac "' + mered_video + '"';
										exec(cmd, (err, stdout, stderr) => {
											if (err) {
												console_log("Error thrown when merging video and audio! " + err, error=true);
											}
											console_log("Merged video and audio!", error=false, mod=true);
								
											// delete temp files
											fs_append.unlink(output_video, file1 => {
												fs_append.unlink(output_audio, file2 => {
													console_log("Deleted temp files!", error=false, mod=true);
												})
											})
								
											// message user
											tm = parseInt(yt_autodelete_timeout / 60 / 60 / 1000);
											msg_channel_send(msg, "The file will be automatically deleted from the server in "+tm+" hour! " + online_url);
											msg_reply.edit("Finished processing video!");
											
											// autodelete file
											setTimeout(function() {
												try {
													fs_write.unlinkSync(mered_video)
													console_log("Deleted file " + mered_video + "!");
												} catch (err) {
													console_log("Failed to delete file " + mered_video + "! " + err);
												}
												console_log("Deleted file " + mered_video + "!");
											}, yt_autodelete_timeout, mered_video);
									
											// cleanup
											clearInterval(yt_download_interval[msg.guild.id]);
											yt_download_start_time[msg.guild.id] = 0;
											yt_download_time[msg.guild.id] = 0;
											yt_timeout[msg.guild.id] = false;
										})
									})
								})
							} catch (err) {
								embed_error(msg, "Failed to download video!");
								console_log("Failed to download video! " + err, error=true);
								clearInterval(yt_download_interval[msg.guild.id]);
								yt_download_start_time[msg.guild.id] = 0;
								yt_download_time[msg.guild.id] = 0;
								yt_timeout[msg.guild.id] = false;
							}
						})
					} else {
						embed_error(msg, "Please wait for the first video to finish download before trying to download another!");
					}
				} else {
					embed_error(msg, "Not a valid YouTube URL!");
				}
			} else {
				embed_error(msg, "Not a valid URL!");
			}
		}
	}
})

// python challenges
var python_challenges = [];

function send_py_challenge(msg, is_channel=false) {
	try {
		// random challenge
		challenge = python_challenges[parseInt(Math.random() * 1000) % python_challenges.length];
		challenge = challenge.replace(/\r/g,"").replace(/\n\n/g, "").replace(/\n\n\n/g, "");
			
		// embed
		embed_py_challenge = new Discord.MessageEmbed();
		embed_py_challenge.setColor(embed_color_chat);
		embed_py_challenge.setTitle("Python Challenge");
		embed_py_challenge.setThumbnail(py_logo);
			
		// check for example
		if (challenge.indexOf("Example:") > -1) {
			example = challenge.split("Question:")[1].split("Example:")[1].split("Hints:")[0];
			question = challenge.split("Question:")[1].split("Example:")[0];
			hint = challenge.split("Hints:")[1];
			embed_py_challenge.addFields(
				{name: "Question", value: question + "\n\u200B"},
				{name: "Example", value: example + "\n\u200B"},
				{name: "Hint", value: hint + "\n\u200B"},
			)
		} else {
			question = challenge.split("Question:")[1].split("Hints:")[0];
			hint = challenge.split("Hints:")[1];
			embed_py_challenge.addFields(
				{name: "Question", value: question + "\n\u200B"},
				{name: "Hint", value: hint + "\n\u200B"},
			)
		}
		
		// send message
		embed_py_challenge.setTimestamp();
		embed_py_challenge.setFooter("py");
		if (is_channel == true) {
			channel.send(embed_py_challenge);
		} else {
			msg_channel_send(msg, embed_py_challenge);
		}
		
	} catch {
		console_log(msg, "Failed to send challenge to server!", error=true);
		embed_chat_reply(msg, "Failed to fetch challenge, please try again!");
	}
}

bot.on("ready", msg => {
	// read the python challenges dataset
	fs_read.readFile(py_challenges_dataset, "utf8", function(err, data) {
		if (err) {
			return console_log("Failed to read python challenges file!", error=true);			
		}
		
		// add data to python challenges variable
		python_challenges = data.split("[SEPERATOR]");
		console_log("Read Python Challenges dataset!");
		
	})
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"pychallenge" || msg.content == prefix[msg.guild.id]+"py challenge") {
			send_py_challenge(msg);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"autopy" || msg.content == prefix[msg.guild.id]+"autopychallenge") {
			// embed
			embed_autopy = new Discord.MessageEmbed();
			embed_autopy.setColor(embed_colour_info);
			embed_autopy.setTitle("Help AutoPyChallenges");
			embed_autopy.setDescription("AutoPyChallenge will automatically post a new Python challenge every 24 hours!");
			embed_autopy.addFields(
				{name: "-autopy on", value: "Turns on autopy posting a new challenge every 24 hours.\n\u200B"},
				{name: "-autopy off", value: "Turns off autopy, it will no longer post daily challenges.\n\u200B"}
			)
			embed_autopy.setTimestamp();
			msg_channel_send(msg, embed_autopy);
		
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"autopychallenge on" || msg.content == prefix[msg.guild.id]+"autopy on") {
			// get directory
			auto_dir = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			auto_path = logging_path + "/" + auto_dir + "/" + auto_py_challenge_filename;
			
			// write channel ID to file
			fs_write.writeFile(auto_path, msg.channel.id, function(err) {
				if (err) {
					return console_log("Failed to write channel ID to autopy file!", error=true);
				}
			})
			embed_chat_reply(msg, "Auto Python Challenge enabled, a new challenge will be posted every 24 hours in this channel!" +
				"Type the `-autopychallenge off` to turn off!");
				
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"autopychallenge off" || msg.content == prefix[msg.guild.id]+"autopy off") {
			// clear file
			clear_file(msg, auto_py_challenge_filename);
			
			// message user
			embed_chat_reply(msg, "Auto Python Challenge disabled");
		}
	}
})

// for guild in authorised servers
// if guild has autopy enabled, add guild to sent_pychallenge dict
// [cooldown, autopy enabled, channel ID]

var sent_pychallenge = {};
bot.on("ready", msg => {
	// read 
	read_file(auto_py_challenge_filename, sent_pychallenge);
})


bot.on("ready", msg => {
	setInterval(function() {
		keys = Object.keys(sent_pychallenge);
		for (i=0;i<keys.length;i++) {
			if (sent_pychallenge[keys[i]] != undefined) {
				current_time = new Date();
				if (current_time.getHours() == 4 && current_time.getMinutes() == 39) {
					// send message
					channel = bot.channels.cache.get(sent_pychallenge[keys[i]]);
					send_py_challenge(channel, is_channel=true);
				
				}
			}
		}
		
	}, 5000);
})


// periodic table
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"element ") {
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
					fs_read.readFile(dataset_elements, "utf8", function(err, data) {
						if (err) {
							return console_log("Failed to read elements database!", error=true);
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
						embed_element.setImage(webserver_elms_dataset + "/" + element_no + ".png");
						msg_channel_send(msg, embed_element);
					
					})
				} else {
					embed_error(msg, "Not a valid element number! make sure the number is within range 1 to 109!");
				}
			} else {
				embed_error(msg, "Invalid Format! the correct format is `-element {element No.}` or `-element {name}`, " +
				"For example `-element 94` will display information on Plutonium or `-element gold` will display information on Gold!");
			}
		} else if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"element") {
			embed_error(msg, "Invalid Format! the correct format is `-element {element No.}` or `-element {name}`, " +
			"For example `-element 94` will display information on Plutonium or `-element gold` will display information on Gold!");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"periodictable" || msg.content == prefix[msg.guild.id]+"table") {
			reply_text = "You can type `-element {elm no.}` to get more speific information about an element!";

			// Send Message
			embed_periodic_table = new Discord.MessageEmbed();
			embed_periodic_table.setColor(embed_colour_info);
			embed_periodic_table.setTitle("Periodic Table");
			embed_periodic_table.setDescription(reply_text);
			embed_periodic_table.setImage(periodic_table);
			embed_periodic_table.setTimestamp();
			msg_channel_send(msg, embed_periodic_table);
			
		}
	}
})

// Pokemon
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"pokemon ") {
			poke_index = msg.content.slice(9, msg.content.length);
			
			// check if poke index is a name
			if (isNaN(parseInt(poke_index)) == true) {
				fs_read.readFile(dataset_pokemon, "utf8", function(err, data) {
					if (err) {
						return console_log("Failed to read pokemon database!", error=true);
					}
					
					//get data
					raw_data_names = data.split("\n");
					raw_data_names_array = [];
					for (i=0;i<raw_data_names.length;i++) {
						try {
							raw_data_names_array.push(raw_data_names[i].split("Name:")[1].split("|")[0].split(" ").join("").toLowerCase());
						} catch {
							console_log("Failed to add pokemon '" + raw_data_names[i] + "' to list", error=true);
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
							fs_read.readFile(dataset_pokemon, "utf8", function(err, data) {
								if (err) {
									return console_log("Failed to read pokemon database!", error=true);
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
									embed_pokemon.setImage(webserver_pokemon_dataset + "/" + poke_index + ".png");
									msg_channel_send(msg, embed_pokemon);
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
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"pokemon") {
			embed_error(msg, "Please Specify a pokemon, you can specify a pokemon by index, " +
			"for example `-pokemon 39` will show info for Jigglypuff , or by name e.g. `-pokemon Pikachu` for info on Pikachu!")
		}
	}
})

// Medicine
var medicines = {};

bot.on("ready", msg => {
	// read file
	fs_read.readFile(dataset_medicine, "utf8", function(err, data) {
		if (err) {
			return console_log("Failed to read medicines database!", error=true);
		}
		
		lines = data.split(";");
		for (i=0;i<lines.length;i++) {
			current_line = lines[i].split("\t");
			if (current_line.length == 4) {
				name = current_line[0].replace(/[^\x00-\x7F]/g, "").replace(/\r/g,"").replace(/\n/g, "");
				description = current_line[1];
				common_side_effects = current_line[2];
				
				// add to dict
				medicines[name.toLowerCase()] = [name, description, common_side_effects];
			}
		}
		console_log("Medicines dataset read!");
	})
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"medicine ") {
			med_name = medicines[msg.content.slice(10, msg.content.length).toLowerCase()];
			
			if (med_name != undefined) {
				// embed
				embed_medicine = new Discord.MessageEmbed();
				embed_medicine.setColor(embed_color_chat);
				embed_medicine.setImage(webserver_medicines_dataset + "/" + med_name[0] + ".png");
				embed_medicine.setTitle(med_name[0]);
				embed_medicine.setDescription(med_name[1]);
				embed_medicine.addFields(
					{name: "\u200B\nCommon Side Effects", value: med_name[2]},
				)
				embed_medicine.setTimestamp();
				msg_channel_send(msg, embed_medicine);
				
			} else {
				embed_error(msg, "The specified medicine could not be found in the database!");
			}
			
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"medicine") {
			// keys
			medicines_AZ = {};
			keyset = Object.keys(medicines);
			for (i=0;i<keyset.length;i++) {
				current_key = keyset[i].replace(/[^\x00-\x7F]/g, "").replace(/\r/g,"");
				if (medicines_AZ[current_key[0]] == undefined) {
					medicines_AZ[current_key[0]] = [];
				}
				medicines_AZ[current_key[0]].push(current_key);
			}
			
			// embed
			embed_medicine_help = new Discord.MessageEmbed();
			embed_medicine_help.setColor(embed_colour_info);
			embed_medicine_help.setTitle("Medicine Help");
			embed_medicine_help.setDescription("To use the medicine command type `-medicine {name}` for example `-medicine ibuprofen` "+
			"will show information on the Ibuprofen medicine, such as a description of what the medicine does and it's common side effects. "+
			"Below is a list of all medicine names currently in the database:\n\u200B");
			
			medicines_AZ_keyset = Object.keys(medicines_AZ);
			for (i=0;i<medicines_AZ_keyset.length;i++) {
				if (medicines_AZ_keyset[i] != undefined) {
					if (medicines_AZ_keyset[i].indexOf("undefined") == -1) {
						current_value = medicines_AZ[medicines_AZ_keyset[i]].join(", ") + "\u200B";
						embed_medicine_help.addField(medicines_AZ_keyset[i]+ "\u200B", current_value, true);
					}
				}
			}
			embed_medicine_help.addField("\u200B", "\u200B", true);
			
			msg_channel_send(msg, embed_medicine_help);
			
		}
	}
})

// --- Play Music ---
// commands to add
// - soundcloud {song name}		- search soundcloud for a song
// - search	{song name}			- searches YouTube for a song and displays list of search results
// - lyrics	{song name}			- get lyrics of current playing song
// - clean						- deleted the bots message and commands in channel
// - leavecleanup				- removes absent user's songs from the queue

var YouTube_Data_API;
var song_queus = {};
var song_player = {};
var channel_guild = {};
var stream = {};
var forced_song = {};
var loop = {};
var loopq = {};
var backup_queue = {};
var dj = {};
var steamOptions = {};
var freeplay = {};

bot.on("ready", msg => {
	fs_read.readFile(youtube_data_filename, "utf-8", function(err, data) {
		if (err) {
			return console_log("Failed to read youtube data API key file!", error=true);
		}
		YouTube_Data_API = data;
		console_log("Read YouTube Data API Key!");
	})
})

function check_youtube_url(url) {
	try {
		url = url.replace("https", "http");
		if (url.slice(0, 12) == "http://youtu" || url.slice(0, 18) == "http://www.youtube") {
			if (url.indexOf(".") > -1 && url.indexOf(" ") == -1) {
				return true;
			}
		}
		return false;
	} catch (err) {
		console_log("Error thrown in check_youtube_url function! " + err, error=true);
	}
}

async function freeplay_get_next(msg, channel, forceplay_url, seek, volume, connection, current_song) {
	try {
		// check for undefined
		if (msg == undefined || msg == null || msg.guild == undefined || msg.guild == null) {
			console_log("Error throw in song manager, msg is null or undefined!", error=true);
		}
	
		// get html
		await request(current_song[0], {
			headers: {
				"User-Agent": user_agent
			},
			body: "",
			method: "GET"
		}, (err, res, html) => {
			if (res.statusCode == 200) {
				// process HTML
				links = html.split('watch?v=');
				urls = [];
				for (i=0;i<links.length;i++) {
					current_url = links[i].split('"')[0].split('\\')[0].split('&amp')[0];
					if (current_url.length == 11) {
						if (current_song[0].indexOf(current_url) == -1) {
							if (urls.indexOf(current_url) == -1) {
								urls.push(current_url);
							}
						}
					}
				}
			
				// pick a random song
				rand_song = urls[parseInt(Math.random() * 100) % urls.length];
				upnext = "https://youtube.com/watch?v=" + rand_song;
			
				song_url = encodeURI(upnext);
				song_id = song_url.replace("watch?v=","").split("/").slice(-1).slice(0, 20);
			
				// check for empty queue
				if (song_queus[msg.guild.id] == undefined) {
					song_queus[msg.guild.id] = [];
				}
			
				// add song to queue
				song_queus[msg.guild.id].push([song_url, bot_ID]);
				console_log("Freeplay added song '" + song_id + "' to queue on server " + msg.guild.name);
			
				// play song
				song_manager(msg, channel, forceplay_url, seek, volume, connection);
			
			
			} else {
				console_log("Freeplay failed to get song, youtube returned status code "+res.statusCode+"!", error=true);
			}
		})
	} catch (err) {
		console_log("Error throw in freeplay_get_next function! " + err, error=true);
	}
}

function song_manager(msg, channel, forceplay_url, seek, volume, connection) {
	try {
		// check for undefined
		if (msg == undefined || msg == null || msg.guild == undefined || msg.guild == null) {
			console_log("Error throw in song manager, msg is null or undefined!", error=true);
		}
	
		// - forceplay - forces the song to play (ignores everything else in queue)
		if (forceplay == true) {
			console_log("Forceplayed song for server " + msg.guild.id);
			stream[msg.guild.id] = ytdl(forceplay_url, {filter:"audioonly", quality:"highestaudio"});
			dj[msg.guild.id] = connection.play(stream[msg.guild.id], steamOptions[msg.guild.id]);
		} else {
			if (seek == 0) {
				console_log("Queue started for server " + msg.guild.id);
			}
			stream[msg.guild.id] = ytdl(song_queus[msg.guild.id][0][0], {filter:"audioonly", quality:"highestaudio"});
			dj[msg.guild.id] = connection.play(stream[msg.guild.id], steamOptions[msg.guild.id]);
		}
			
		// leave channel if the users leave
		dj[msg.guild.id].on("end", end => {
			channel.leave();
		})
				
		// check if queue is empty
		if (song_queus[msg.guild.id] == undefined) {
			return false;
		}
	
		// go to next song in queue
		dj[msg.guild.id].on("finish", song_finished => {
			if (loop[msg.guild.id] == true) {
				// loop song
				song_manager(msg, channel, forceplay_url, seek, volume, connection);
			} else {
				// remove song from queue
				last_song = song_queus[msg.guild.id][0];
				song_queus[msg.guild.id] = song_queus[msg.guild.id].slice(1, song_queus[msg.guild.id].length);
				// play next song
				if (song_queus[msg.guild.id][0] == undefined) {
					// check for loop queue
					if (loopq[msg.guild.id] == true) {
						song_queus[msg.guild.id] = backup_queue[msg.guild.id];
						song_manager(msg, channel, forceplay_url, seek, volume, connection);
						console_log("The queue will be looped for " + msg.guild.id);
					} else {
						// queue ended
						if (freeplay[msg.guild.id] == true) {
							// freeplay is on, choose another song to add to queue
							async function await_get_song() {
								song_queus[msg.guild.id] = song_queus[msg.guild.id].slice(1, song_queus[msg.guild.id].length);
								await freeplay_get_next(msg, channel, forceplay_url, seek, volume, connection, last_song);
								console_log("Queue ended on server " + msg.guild.name + " freeplay playing random song!");
							
							} await_get_song();
						} else {
							// queue ended, leave voice channel
							channel.leave();
							song_player[msg.guild.id] = false;
							song_queus[msg.guild.id] = [];
							console_log("queue ended for " + channel);
						}
					}
				} else {
					song_manager(msg, channel, forceplay_url, seek, volume, connection);
				}
			}
		})
	} catch (err) {
		console_log("Error thrown in song_manager function! " + err, error=true);
	}
}

function play_song(msg, channel, forceplay=false, forceplay_url="", seek=0, volume=1) {
	try {
		steamOptions[msg.guild.id] = {seek: seek, volume: volume};
		if (channel != null && channel != undefined) {
			// when the user joins the channel
			try {
				channel.join().then(connection => {
					try {
						// play song
						song_manager(msg, channel, forceplay_url, seek, volume, connection);
				
					} catch (err) {
						console_log("an error was throw in the play song song manager function!", error=true);
					}
				}).catch(err => {
					console_log("JaredBot failed to join voice channel an error was thrown in the join vc function!", error=true);
				})
			} catch {
				console_log("Failed to join channel!", error=true);
			}
		}
	} catch (err) {
		console_log("Error thrown in play_song function! " + err, error=true);
	}
}

function song_info(msg, response, yt_url) {
	try {
		// song info
		song_name = response.videos[0].title;
		song_description = response.videos[0].description.slice(0, 2048);
		song_thumbnail = response.videos[0].thumbnail;
	
		// get requested by
		if (forced_song[msg.guild.id] == undefined) {
			request_by = bot.users.cache.get(song_queus[msg.guild.id][0][1]).tag;
		} else {
			request_by = forced_song[msg.guild.id][1];
		} if (request_by == null) {
			request_by = "Unknown";
		}
	
		// embed
		embed_music_info = new Discord.MessageEmbed();
		embed_music_info.setColor(embed_color_chat);
		embed_music_info.setTitle(song_name);
		embed_music_info.setURL(yt_url);
		embed_music_info.setDescription(song_description);
		embed_music_info.setAuthor("Now playing 🎵", cat_profile_pic);
		embed_music_info.setThumbnail(song_thumbnail);
		embed_music_info.setFooter("Requested by: " + request_by + "\u200B");
		msg_channel_send(msg, embed_music_info);
		
	} catch (err) {
		console_log("Error thrown in song_info function! " + err, error=true);
	}
}

function disconnect(msg, customMessage="") {
	try {
		// get bots voice channel
		channel = channel_guild[msg.guild.id];
		if (channel == undefined) {
			embed_error(msg, "Your not connected to any voice channel!");
			return false;
		}
			
		// check if user is in bots voice channel
		user_channel = msg.member.voice.channel;
		if (user_channel == channel) {
			channel.leave();
			song_player[msg.guild.id] = false;
			song_queus[msg.guild.id] = [];
			channel_guild[msg.guild.id] = undefined;
			loop[msg.guild.id] = false;
			loopq[msg.guild.id] = false;
			if (customMessage.length == 0) {
				embed_info_reply(msg, "Successfully disconnected from voice channel!");
			} else {
				embed_info_reply(msg, customMessage)
			}
		} else {
			embed_error(msg, "Your not connected to same voice channel as the bot!");
		}
	} catch (err) {
		console_log("Error thrown in disconnect function! " + err, error=true);
	}
}

function help_music(msg) {
	try {
		embed_music = new Discord.MessageEmbed();
		embed_music.setColor(embed_color_chat);
		embed_music.setTitle("Help Music");
		embed_music.setAuthor("JaredBot | Command list", lion_profile_pic);
		embed_music.setThumbnail(lion_profile_pic);
		embed_music.addFields(
			{name: "-play", value:"`-help play`\n\u200B", inline: true},
			{name: "-forceplay -playskip", value:"`-help foreplace`\n\u200B", inline: true},
			{name: "-skip", value:"`-help skip`\n\u200B", inline: true},
			{name: "-skipto", value: "`-help skipto`\n\u200B", inline: true},
			{name: "-disconnect", value:"`-help disconnect`\n\u200B", inline: true},
			{name: "-np", value:"`-help np`\n\u200B", inline: true},
			{name: "-ping -testaudio", value:"`-help ping`\n`-help testaudio`\n\u200B", inline: true},
			{name: "-queue", value:"`-help queue`\n\u200B", inline: true},
			{name: "-playtop -reverse", value:"`-help playtop`\n\u200B", inline: true},
			{name: "-remove {index}", value:"`-help remove`\n\u200B", inline: true},
			{name: "-move", value:"`-help move`\n\u200B", inline: true},
			{name: "-loop -loopq", value: "`-help loop`\n`-help loopq`\n\u200B", inline: true},
			{name: "-clearq", value: "`-help clearq`\n\u200B", inline: true},
			{name: "-removedupes", value: "`-help removedupes`\n\u200B", inline: true},
			{name: "-shuffle", value: "`-help shuffle`\n\u200B", inline: true},
			{name: "-replay", value: "`-help replay`\n\u200B", inline: true},
			{name: "-join", value: "`-help join`\n\u200B", inline: true},
			{name: "-pause -resume", value: "`-help pause`\n`-help resume`\n\u200B", inline: true},
			{name: "-songinfo", value: "`-help songinfo`\n\u200B", inline: true},
			{name: "-seek {MM:SS}", value: "`-help seek`\n\u200B", inline: true},
			{name: "-forward {MM:SS}", value: "`-help forward`\n\u200B", inline: true},
			{name: "-rewind {MM:SS}", value: "`-help rewind`\n\u200B", inline: true},
			{name: "-volume %", value: "`-help volume`\n\u200B", inline: true},
			{name: "-freeplay", value: "`-help freeplay`\n\u200B", inline: true}
		)
		embed_music.setTimestamp();
		msg_channel_send(msg, embed_music);
	} catch (err) {
		console_log("Error thrown in help_music function! " + err, error=true);
	}
}

function help_clear(msg) {
	try {
		embed_clear_help = new Discord.MessageEmbed();
		embed_clear_help.setColor(embed_colour_info);
		embed_clear_help.setTitle("Help Clear");
		embed_clear_help.addFields(
		{name: "-clear {no messages}", value: "`clear` is a mod/admin command that delete messages, it is the same as `purge`, "+
		"the syntax for the command is `-clear {no messages}` for example `-clear 10` will delete 10 messages.\n\u200B"},
		{name: "-clearq", value: "If you are listenning to music and would like to clear the song queue, then use the music "+
		"command `-clearq`, clearq will clear the song queue removing any songs in the queue."}
		)
		embed_clear_help.setTimestamp();
		msg_channel_send(msg, embed_clear_help);
	} catch (err) {
		console_log("Error thrown in help_clear function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"music help" || msg.content == prefix[msg.guild.id]+"aliases") {
			// embed
			help_music(msg);
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		// - play {song name / URL} (plays song with given name or url)
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"play " || msg.content.slice(0, 11) == prefix[msg.guild.id]+"forceplay " || 
			msg.content == prefix[msg.guild.id]+"skip" || msg.content.slice(0, 7) == prefix[msg.guild.id]+"skipto" || msg.content.slice(0, 10) == prefix[msg.guild.id]+"playskip "
			|| msg.content.slice(0, 6) == prefix[msg.guild.id]+"seek " || msg.content.slice(0, 6) == prefix[msg.guild.id]+"seek " || msg.content.slice(0, 9) == prefix[msg.guild.id]+"forward "
			|| msg.content.slice(0, 8) == prefix[msg.guild.id]+"rewind " || msg.content.slice(0, 8) == prefix[msg.guild.id]+"volume " || msg.content == prefix[msg.guild.id]+"fs") {
			command = msg.content.slice(6, msg.content.length);
			
			// check for forceplay
			if (msg.guild != null && msg.content.slice(0, 11) == prefix[msg.guild.id]+"forceplay " || msg.content.slice(0, 10) == prefix[msg.guild.id]+"playskip ") {
				forceplay = true;
			} else {
				forceplay = false;
			}
			
			// freeplay default
			if (song_queus[msg.guild.id] == undefined) {
				freeplay[msg.guild.id] = true;
			}
			
			// get users voice channel
			channel = msg.member.voice.channel;
			if (channel == undefined) {
				embed_error(msg, "Your not connected to any voice channel!");
				return false;
			} else {
				// check if the bot is already in voice channel
				if (channel_guild[msg.guild.id] != undefined) {
					user_channel = msg.member.voice.channel;
					bot_channel = msg.guild.voice;
					
					// check if the bot is in a voice channel
					if (bot_channel == null) {
						channel_guild[msg.guild.id] = channel;
						
					// check if user is in same channel as bot
					} else {
						if (bot_channel.connection != null) {
							if (user_channel == bot_channel.connection.channel) {
								channel_guild[msg.guild.id] = channel;
								
								// seek, forward, rewind
								if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"seek " || msg.content.slice(0, 9) == prefix[msg.guild.id]+"forward " || 
									msg.content.slice(0, 8) == prefix[msg.guild.id]+"rewind " || msg.content.slice(0, 8) == prefix[msg.guild.id]+"volume ") {
									
									// check if song is actully playing
									if (dj[msg.guild.id] == undefined) {
										embed_error(msg, "Please make sure a song is actully playing!");
										return false;
									}
									
									// get length of the song
									song_length = dj[msg.guild.id]._writableState.length;
									
									// check if volume is being changed
									if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"volume ") {
										// max volume
										song_length = 101;
									}
									
									// split command
									seek = msg.content.split(" ")[1];
									
									// check if command is in format MM:SS
									if (seek.split(":").length == 2) {
										seek_amount = String(parseInt((seek.split(":")[0]*60)) + parseInt(seek.split(":")[1]));
									} else {
										seek_amount = seek;
									}
									
									// check if seek amount is an int
									command_name = msg.content.split(" ")[0].slice(1, msg.content.length);
									if (isInt(msg, seek_amount, 0, song_length, command_name, ErrorMessageEnd="") == true) {
										//play song
										
										// - seek (seeks to a certain point in the curent track)
										if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"seek ") {
											play_song(msg, channel, forceplay=false, forceplay_url="", seek=parseInt(seek_amount), volume=1);
										
										// - forward {sec} (fast forward by a certain number of seconds)
										} else if (msg.guild != null && msg.content.slice(0, 9) == prefix[msg.guild.id]+"forward ") {
											forward_amount = parseInt(dj[msg.guild.id].streamTime/1000) + parseInt(seek_amount) + steamOptions[msg.guild.id].seek;
											if (forward_amount < dj[msg.guild.id]._writableState.length) {
												play_song(msg, channel, forceplay=false, forceplay_url="", seek=forward_amount, volume=1);
											} else {
												embed_error(msg, "You can't fast forward this far!");
												return false;
											}
										
										// - rewind {sec} (rewinds by specified amount in track)
										} else if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"rewind ") {
											backwards_amount = parseInt(dj[msg.guild.id].streamTime/1000) - parseInt(seek_amount) + steamOptions[msg.guild.id].seek;
											if (backwards_amount > 0) {
												play_song(msg, channel, forceplay=false, forceplay_url="", seek=backwards_amount, volume=1);
											} else {
												embed_error(msg, "You can't rewind this far back!");
												return false;
											}
											
										// - volume {no} (change the volume of the music)
										} else if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"volume ") {
											current_timestamp = parseInt(dj[msg.guild.id].streamTime/1000);
											volume = parseInt(msg.content.slice(8, msg.content.length))/100;
											play_song(msg, channel, forceplay=false, forceplay_url="", seek=current_timestamp, volume=volume);
											embed_info_reply(msg, "Volume changed to " + volume*100 + "%!");
											return true;
										}
										
										seek_mins = ("00"+String(seek_amount / 60).split(".")[0]).slice(-2);
										seek_secs = ("00"+String(Math.round(("0." + String(seek_amount / 60).split(".")[1])*60)).replace("NaN", "0")).slice(-2);
										embed_chat_reply(msg, "Seeked to " + seek_mins+":"+seek_secs + " in the track!");
									} else {
										return false;
									}
									return true;
								}
							} else {
								embed_error(msg, "Your not in the same voice channel as the bot!");
								return false;
							}
						} else {
							console_log("The bot is not in a voice channel!");
						}
					}
				} else {
					channel_guild[msg.guild.id] = channel;
				}
			}
			
			// seek
			if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"seek " || msg.content.slice(0, 9) == prefix[msg.guild.id]+"forward " || 
				msg.content.slice(0, 8) == prefix[msg.guild.id]+"rewind " || msg.content.slice(0, 8) == prefix[msg.guild.id]+"volume ") {
				command_name = msg.content.split(" ")[0].slice(1, msg.content.length);
				embed_error(msg, "Failed to "+command_name+", make sure that the bot is connected to a voice channel and playing a song!");
				return false;
			}
			
			// skip (skips the current playing song)
			if (msg.guild != null && msg.content == prefix[msg.guild.id]+"skip" || msg.content.slice(0, 7) == prefix[msg.guild.id]+"skipto" || msg.content == prefix[msg.guild.id]+"fs") {
				// check if queue is undefined
				if (song_queus[msg.guild.id] == undefined) {
					embed_error(msg, "Unable to skip song, there are no songs in the queue");
					return;
				}
				
				if (msg.guild != null && msg.content == prefix[msg.guild.id]+"skip" || msg.content == prefix[msg.guild.id]+"fs") {
					// remove song from queue
					song_queus[msg.guild.id] = song_queus[msg.guild.id].slice(1, song_queus[msg.guild.id].length);
				
				// skipto {index} (skip to certain point in queue)
				} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"skipto") {
					embed_error(msg, "Unable to skip to song, invalid input, the syntax for the command is `-skipto {song index}`!")
					return false;
				} else if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"skipto ") {
					// check if queue contains less than 2 songs
					queue_length = Object.keys(song_queus[msg.guild.id]).length;
					if (queue_length < 2) {
						embed_error(msg, "There needs to be atleast 2 songs in the queue in order to skip to!");
						return false;
					}
					
					// check if user input is valid index
					skipto_index = msg.content.slice(8, msg.content.length);
					if (isInt(msg, skipto_index, 1, queue_length+1, "index", ErrorMessageEnd="") == true) {
						// remove song from queue
						song_queus[msg.guild.id] = song_queus[msg.guild.id].slice(parseInt(skipto_index)-1, song_queus[msg.guild.id].length);
						
					} else {
						return false;
					}
				}
				
				// check if queue is empty
				if (song_queus[msg.guild.id].length == 0) {
					disconnect(msg, customMessage="End of queue reached, to play another song type `-play {song name / URL}`!");
					return;
					
				} else {
					// play next song
					play_song(msg, channel);
					embed_chat_reply(msg, "Song skipped!");
				}
				return;
			}
			
			// find song by URL
			part_url = command.replace("https://","http://");
			if (part_url.slice(0, 12) == "http://youtu" || part_url.slice(0, 18) == "http://www.youtube") {
				if (part_url.indexOf(".") > -1 && part_url.indexOf(" ") == -1) {
					// YouTube URL
					song_url = encodeURI(command);
					song_id = song_url.replace("watch?v=","").split("/").slice(-1).slice(0, 20);
					if (forceplay == false) {
						if (song_queus[msg.guild.id] == undefined) {
							song_queus[msg.guild.id] = [[song_url, msg.author.id]];
						} else {
							song_queus[msg.guild.id].push([song_url, msg.author.id]);
						}
						forced_song[msg.guild.id] = undefined;
						console_log("Added song '" + song_id + "' to queue on server " + msg.guild.id + "!");
					} else if (forceplay == true) {
						forced_song[msg.guild.id] = [song_url, msg.author.id];
						console_log("Force playing song '" + song_id + "' on server " + msg.guild.id + "!");
					}
				} else {
					embed_error(msg, "Not a valid YouTube URL!");
					return false;
				}
				
				// play the song
				if (song_player[msg.guild.id] != true) {
					song_player[msg.guild.id] = true;
					play_song(msg, channel, forceplay=forceplay, forceplay_url=song_url);
				}
				
			// find song by name
			} else {
				// GET info on song
				youtube.search(command).then(response => {
					if (response != []) {
						// check if song exists
						if (response.videos[0] == undefined) {
							embed_error(msg, "Unable to find the song! Make sure you spelt the song name correctly, "+
								"also try make your search more specific, for example by entering in the song name and artist.");
							return false;
						} else {
							song_id = response.videos[0].id;
							if (song_id == undefined) {
								embed_error(msg, "Unable to find the song! Make sure you spelt the song name correctly, "+
								"also try make your search more specific, for example by entering in the song name and artist.");
								return false;
							}
						}
						
						song_url = "https://youtube.com/watch?v=" + song_id;
						
						// add song to queue
						if (forceplay == false) {
							if (song_queus[msg.guild.id] == undefined) {
								song_queus[msg.guild.id] = [[song_url, msg.author.id]];
							} else {
								song_queus[msg.guild.id].push([song_url, msg.author.id]);
							}
							console_log("Added song '" + song_id + "' to queue on server " + msg.guild.id + "!");
						} else if (forceplay == true) {
							forced_song[msg.guild.id] = [song_url, msg.author.id];
							console_log("Force playing song '" + song_id + "' on server " + msg.guild.id + "!");
						}
						
						// play the song
						if (song_player[msg.guild.id] != true || forceplay == true) {
							song_player[msg.guild.id] = true;
							play_song(msg, channel, forceplay=forceplay, forceplay_url=song_url);
						}
						
						// embed
						song_info(msg, response, song_url);
					}
				}).catch(err => {
					console_log("Error thrown in find song by name youtube search! " + err, error=true);
				})
			}
			
		// - disconnect (disconnects bot from channel)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"disconnect") {
			// disconnect user
			disconnect(msg);
		
		// - np (now playing)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"np") {
			// check if current song is YouTube URL
			if (song_queus[msg.guild.id] != undefined) {
				if (song_queus[msg.guild.id][0] != undefined) {
					if (check_youtube_url(song_queus[msg.guild.id][0][0]) == true) {
						// get song URL
						if (forced_song[msg.guild.id] == undefined) {
							song_url = song_queus[msg.guild.id][0][0];
						} else {
							song_url = forced_song[msg.guild.id][0];
						}
					
						// get song ID
						if (song_url.indexOf("watch?v=") > -1) {
							song_ID = song_url.split("watch?v=")[1].split("/")[0];
						} else {
							song_ID = song_url.split("://youtu")[1].split("/")[1];
						}
				
						// format URL
						yt_url = "https://youtube.com/watch?v=" + song_ID;
						youtube.search(song_ID).then(response => {
							if (response != undefined) {
								// embed
								song_info(msg, response, yt_url);
							}
						}).catch(err => {
							console_log("Error thrown in now playing youtube search! " + err, error=true);
						})
					}
				} else {
					embed_error(msg, "No song is currently playing!");
				}
			} else {
				embed_error(msg, "There are no songs currently in the queue! type `-play {url / name}` to play a song");
			}
		
		// - ping (checks the bots response time to discord)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"ping") {
			msg_channel_send(msg, "Pinging...").then(res => {
				// measure response time
				ping = res.createdTimestamp - msg.createdTimestamp;
				res.delete();
				
				// embed
				embed_ping = new Discord.MessageEmbed();
				embed_ping.setColor(embed_color_chat);
				embed_ping.setDescription("🏓 The bots response time to the server is " + ping + "ms!");
				embed_ping.setTimestamp();
				msg_channel_send(msg, embed_ping);
			}).catch(err => {
				console_log("Error thrown in music ping! " + err, error=true);
			})
			
		// - queue (lets you view the queue)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"queue") {
			// embed
			embed_queue = new Discord.MessageEmbed();
			embed_queue.setColor(embed_color_chat);
			embed_queue.setTitle("Song Queue");
			embed_queue.setTimestamp();
			embed_queue.setFooter("🎶");
			embed_queue.setDescription("This is a list of the songs currently in the queue, to remove a song type `-remove {song index}`, "+
			"for example `-remove 1` will remove the first song in the queue.\n\u200B");
			
			// check if queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "There are no songs currently in the queue, to add a song to the queue type `-play {song name or URL}`");
				return false;
			} else if (song_queus[msg.guild.id].length == 0) {
				embed_error(msg, "There are no songs currently in the queue, to add a song to the queue type `-play {song name or URL}`")
				return false;
			}
			
			// get info on the songs
			async function get_song_info() {
				try {
					for (i=0;i<song_queus[msg.guild.id].length;i++) {
						await new Promise(next => {
							// get song ID
							song_url = song_queus[msg.guild.id][i][0];
							if (song_url.indexOf("watch?v=") > -1) {
								song_ID = song_url.split("watch?v=")[1].split("/")[0];
							} else {
								song_ID = song_url.split("://youtu")[1].split("/")[1];
							}
						
							// get song
							if (i < 25) {
								youtube.search(song_ID).then(response => {
									song_name = response.videos[0].title;
									if (i == 0) {
										embed_queue.addField("__Currently Playing:__\n"+song_name, "Index: " + (i+1) + "\nSong ID: " + song_ID + "\n\u200B");
									} else if (i == 1){
										embed_queue.addField("__Queue:__\n"+song_name, "Index: " + (i+1) + "\nSong ID: " + song_ID + "\n\u200B");
									} else {
										embed_queue.addField(song_name, "Index: " + (i+1) + "\nSong ID: " + song_ID + "\n\u200B");
									}
									next();
								}).catch(err => {
									console_log("Error thrown in get_song_info youtube search! " + err, error=true);
								})
							}
						})
					}
				} catch (err) {
					console_log("Error thrown in get_song_info function! " + err, error=true);
				}
			}
			
			// send message
			get_song_info().then(() => {
				msg_channel_send(msg, embed_queue);
			}).catch(err => {
				console_log("Error thrown in get_song_info! " + err, error=true);
			})
		
		// - remove	{index in queue} (removes a song from the queue)
		} else if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"remove ") {
			command = msg.content.slice(8, msg.content.length);
			
			// check if the queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "The queue is empty you can't remove a song!");
				return false;
			} else if (song_queus[msg.guild.id].length == 0) {
				embed_error(msg, "The queue is empty you can't remove a song!");
				return false;
			}
			
			// check is input is valid index, then remove the song from queue
			if (isInt(msg, command, 0, song_queus[msg.guild.id].length+2, "index", ErrorMessageEnd="") == true) {
				// make song at specified index undefined
				song_queus[msg.guild.id][parseInt(command)-1] = undefined;
				
				// remove the song from list
				current_songs = [];
				for (i=0;i<song_queus[msg.guild.id].length;i++) {
					if (song_queus[msg.guild.id][i] != undefined) {
						current_songs.push(song_queus[msg.guild.id][i]);
					}
				}
				song_queus[msg.guild.id] = current_songs;
				
				// message user
				embed_info_reply(msg, "The song at index " + command + " was removed from the queue!");
				
			}
		
		// - playtop (reverses the order of the queue to play the last song first)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"playtop" || msg.content == prefix[msg.guild.id]+"reverse") {
			// check if the queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "The queue is empty you can't reverse an empty queue!");
				return false;
			} else if (song_queus[msg.guild.id].length == 0) {
				embed_error(msg, "The queue is empty you can't reverse an empty queue!");
				return false;
			}
			
			// reverse
			current_song = [song_queus[msg.guild.id][0]];
			reversed_songs = [];
			
			current_queue = song_queus[msg.guild.id].slice(1, song_queus[msg.guild.id].length);
			for (i=0;i<current_queue.length;i++) {
				reversed_songs.push(current_queue[current_queue.length - i -1]);
			}
			
			// message user
			song_queus[msg.guild.id] = current_song.concat(reversed_songs);
			embed_info_reply(msg, "The song queue has been reversed, the last song will be played first after this current song finishes");
		
		// - move {old pos} {new pos} (move a song to diffrent position in queue)
		} else if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"move ") {
			// check if the queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "The queue is empty you can't reverse an empty queue!");
				return false;
			} else if (song_queus[msg.guild.id].length < 2) {
				embed_error(msg, "There needs to be atleast 2 songs in the queue to use the move command!");
				return false;
			}
			
			command = msg.content.slice(6, msg.content.length).split(" ");
			if (command.length == 2) {
				first_index = command[0];
				second_index = command[1];
				
				if (isInt(msg, first_index, 0, song_queus[msg.guild.id]+2, "first index", ErrorMessageEnd="") == true) {
					if (isInt(msg, second_index, 0, song_queus[msg.guild.id]+2, "second index", ErrorMessageEnd="") == true) {
						// update positions in array
						first_pos = song_queus[msg.guild.id][parseInt(first_index)-1];
						second_pos = song_queus[msg.guild.id][parseInt(second_index)-1];
						
						song_queus[msg.guild.id][parseInt(second_index)-1] = first_pos;
						song_queus[msg.guild.id][parseInt(first_index)-1] = second_pos;
						
						// message user
						embed_info_reply(msg, "The song at index " + first_index + " has been moved to index " + second_index + " in the queue!");
						
					}
				}
			} else {
				embed_error(msg, "Invalid Syntax, the format for the command is `-move {index 1} {index 2}`.");
			}
		
		// - loop (loops the current song)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"loop") {
			// toggle loop
			if (loop[msg.guild.id] == undefined || loop[msg.guild.id] == false) {
				loop[msg.guild.id] = true;
				embed_info_reply(msg, "Loop enabled, the current song will be looped, type `-loop` to toggle it off.");
			} else {
				loop[msg.guild.id] = false;
				embed_info_reply(msg, "Loop disable, the current song will no longer be looped, type `-loop` to toggle it on.");
			}
		
		// - loopqueue (loops the whole queue)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"loopq") {
			// backup queue
			backup_queue[msg.guild.id] = song_queus[msg.guild.id];
			
			// toggle loop queue
			if (loopq[msg.guild.id] == undefined || loopq[msg.guild.id] == false) {
				loopq[msg.guild.id] = true;
				embed_info_reply(msg, "Loop Queue enabled, the queue will be looped, type `-loopq` to toggle it off.");
			} else {
				loopq[msg.guild.id] = false;
				embed_info_reply(msg, "Loop Queue disabled, the queue will not longer be looped, type `-loopq` to toggle it on.");
			}
			
			
		// - clear (clears the queue, removing all queued songs)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"clearq") {
			song_queus[msg.guild.id] = [];
			embed_chat_reply(msg, "The song queue has been cleared by "+msg.member.user.tag+"!");
			
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"clear") {
			help_clear(msg);
			
		// - removedupes (removes duplicate songs from queue)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"removedupes") {
			// check if the queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "The queue is empty you can't remove duplicates on an empty queue!");
				return false;
			} else if (song_queus[msg.guild.id].length < 2) {
				embed_error(msg, "There needs to be atleast 2 songs in the queue to use the remove duplicatess command!");
				return false;
			}
			
			
			// remove values be addign to dict
			temp_dict = {};
			for (i=0;i<song_queus[msg.guild.id].length;i++) {
				if (temp_dict[song_queus[msg.guild.id][i]] == undefined) {
					temp_dict[song_queus[msg.guild.id][i][0]] = song_queus[msg.guild.id][i][1];
				}
			}
			
			// convert dict to list
			temp_list = [];
			for (i=0;i<Object.keys(temp_dict).length;i++) {
				temp_list.push([Object.keys(temp_dict)[i], temp_dict[Object.keys(temp_dict)[i]]]);
			}
			
			// message user
			song_queus[msg.guild.id] = temp_list;
			embed_chat_reply(msg, "All duplicate songs have been removed from the queue!");
		
		// - shuffle (randomly shuffles the queue)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"shuffle") {
			// check if queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "Failed to shuffle, the queue is empty!");
				return false;
			} else if (Object.keys(song_queus[msg.guild.id]).length < 2) {
				embed_error(msg, "There needs to be atleast 2 songs in the queue in order to shuffle!");
				return false;
			}
			
			// get first song
			current_song = song_queus[msg.guild.id][0];
			current_queue = song_queus[msg.guild.id].slice(1, song_queus[msg.guild.id].length);
			
			// random order
			queue_order = [];
			for (i=0;i<current_queue.length;i++) {
				rand_index = parseInt(Math.random()*100) % current_queue.length;
				while (queue_order.indexOf(rand_index) > -1) {
					rand_index = parseInt(Math.random()*100) % current_queue.length;
				}
				queue_order.push(rand_index);
			}
			
			// shuffle queue
			temp_queue = [current_song];
			for (i=0;i<queue_order.length;i++) {
				temp_queue.push(current_queue[queue_order[i]]);
			}
			
			// message user
			song_queus[msg.guild.id] = temp_queue;
			embed_chat_reply(msg, "The queue has been randomly shuffled!");
		
		// - replay (replays the current song from beginning)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"replay") {
			// check if queue is empty
			if (song_queus[msg.guild.id] == undefined) {
				embed_error(msg, "Failed to replay song, the queue is empty!");
				return false;
			} else if (Object.keys(song_queus[msg.guild.id]).length < 1) {
				embed_error(msg, "There needs to be atleast 1 song in the queue in order to replay!");
				return false;
			}
			
			// replay song
			play_song(msg, channel_guild[msg.guild.id]);
			embed_chat_reply(msg, "The current song has been replayed from the beginning!");
		
		// - testaudio (tests that ytdl is functional and can play a youtube video)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"testaudio") {
			console_log("Audio test started on server " + msg.guild.id);
			// get users voice channel
			channel = msg.member.voice.channel;
			if (channel == undefined) {
				embed_error(msg, "Your not connected to any voice channel!");
				return false;
			} else {
				forced_song[msg.guild.id] = [audio_test_video_url, msg.author.id];
			}
			
			// play the song
			if (song_player[msg.guild.id] != true) {
				song_player[msg.guild.id] = true;
				play_song(msg, channel, forceplay=true, forceplay_url=audio_test_video_url);
			}
			
		// - join (make the bot join the voice channel of the message sender)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"join") {
			// get users voice channel
			channel = msg.member.voice.channel;
			if (channel == undefined) {
				embed_error(msg, "Your not connected to any voice channel!");
				return false;
			} else {
				try {
					channel.join().then(connection => {
						embed_info_reply(msg, "JaredBot has joined voice channel " +msg.channel.id+ "!");
					}).catch(error => {
						console.log("Failed to join voice channel on guild " + msg.guild.name);
					})
				} catch {
					console_log("Failed to join channel on " + msg.guild.name);
				}
			}
		
		// - pause (pause the current playing track)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"pause") {
			dj[msg.guild.id].pause();
			embed_info_reply(msg, "The song has been paused!");
		
		// - resume (resume paused music)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"resume") {
			dj[msg.guild.id].resume();
			embed_info_reply(msg, "The has been resumed!");
		
		// - settings (shows the music player settings, volume, loop, queue length)
		} else if (msg.guild != null && msg.content == prefix[msg.guild.id]+"settings" || msg.content == prefix[msg.guild.id]+"songinfo" || msg.content == prefix[msg.guild.id]+"streaminfo") {
			if (dj[msg.guild.id] != undefined && song_queus[msg.guild.id] != undefined) {
				// check if queue is empty
				if (song_queus[msg.guild.id] == undefined) {
					embed_error(msg, "There are no songs currently in the queue, to add a song to the queue type `-play {song name or URL}`");
					return false;
				} else if (song_queus[msg.guild.id].length == 0) {
					embed_error(msg, "There are no songs currently in the queue, to add a song to the queue type `-play {song name or URL}`")
					return false;
				}
				
				// stream stats
				song_length = dj[msg.guild.id]._writableState.length;
				seek = dj[msg.guild.id].streamOptions.seek;
				volume = dj[msg.guild.id].streamOptions.volume;
				bitrate = dj[msg.guild.id].streamOptions.bitrate;
				start_time = dj[msg.guild.id].startTime;
				pause_time = dj[msg.guild.id].pausedSince;
			
				// youtube stats
				song_id = song_queus[msg.guild.id][0][0].replace("watch?v=","").split("/").slice(-1);
				youtube.search(song_id).then(response => {
					if (response != []) {
						// check if song exists
						if (response.videos[0] != undefined) {
							video = response.videos[0]
							song_id = video.id;
							song_title = video.title;
							song_link = video.link;
							song_thumbnail = video.thumbnail;
							song_description = video.description;
							song_views = video.views;
							song_date = video.uploaded;
							
							channel_name = video.channel.name;
							channel_verified = video.channel.verified;
							channel_link = video.channel.link;
							channel_thumbnail = video.channel.thumbnail;
							
							// embed
							settings_embed = new Discord.MessageEmbed();
							settings_embed.setColor(embed_colour_info);
							settings_embed.setURL(song_link);
							settings_embed.setTitle("Stream Information");
							settings_embed.setAuthor(channel_name, channel_thumbnail, channel_link);
							settings_embed.setDescription("Currently playing **" + song_title + "** by " + channel_name);
							settings_embed.setThumbnail(song_thumbnail);
							
							// times
							if (pause_time == null) {
								format_pause_time = "Not Paused";
							} else {
								format_pause_time = new Date(pause_time).toLocaleTimeString()+"\n\u200B";
							}
							
							// format MM:SS
							length_mins = ("00"+String(song_length / 60).split(".")[0]).slice(-2);
							length_secs = ("00"+String(Math.round(("0." + String(song_length / 60).split(".")[1])*60)).replace("NaN", "0")).slice(-2);
							seek_mins = ("00"+String(seek / 60).split(".")[0]).slice(-2);
							seek_secs = ("00"+String(Math.round(("0." + String(seek / 60).split(".")[1])*60)).replace("NaN", "0")).slice(-2);
							
							// add fields
							settings_embed.addFields(
								{name: "Song Length", value: length_mins+":"+length_secs, inline:true},
								{name: "Volume", value: (volume*100)+"%\n\u200B", inline:true},
								{name: "Bitrate", value: bitrate+"kbps\n\u200B", inline:true},
								{name: "Start Time", value: new Date(start_time).toLocaleTimeString()+"\n\u200B", inline:true},
								{name: "Paused Since", value: format_pause_time, inline:true},
								{name: "Seek", value: seek_mins+":"+seek_secs+"\n\u200B", inline:true},
								{name: "Song Name", value: channel_name+"\n\u200B", inline:true},
								{name: "Views", value: String(song_views).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"\n\u200B", inline:true},
								{name: "Published", value: song_date+"\n\u200B", inline:true},
							)
							settings_embed.setFooter(song_id);
							settings_embed.setTimestamp();
							msg_channel_send(msg, settings_embed);
						}
					}
				}).catch(err => {
					console_log("Error thrown in msuic settings! " + err, error=true);
				})
			} else {
				embed_error(msg, "Unable to get song info, make sure the bot is connected to a voice channel and a song is currently playing!");
			}
			
		// free play (instead of disconnecting, randomly choose another song once the queue ends)
		} else if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"freeplay ") {
			command = msg.content.slice(10, msg.content.length);
			if (command == "on") {
				freeplay[msg.guild.id] = true;
				embed_chat_reply(msg, "Freeplay turned on, JaredBot will automatically choose a new song once the queue as ended!");
				
			} else if (command == "off") {
				freeplay[msg.guild.id] = false;
				embed_chat_reply(msg, "Freeplay turned off, JaredBot will now only play the songs in the queue, once the queue reaches the end, "+
				"JaredBot will leave the voice channel.");
				
			} else {
				embed_error(msg, "Invalid option, the syntax for the command is `-freeplay [on/off]`, to turn freeplay on type `-freeplay on`" +
				", to turn it off type `-freeplay off`");
			}
			
		}
	}
})

function dict2string(dict) {
	output = [];
	for (i in dict) {
		if (dict.hasOwnProperty(i)) {
			output.push("'" + i + "' : '" + dict[i]);
		}
	}
	return "{" + output.join(", ") + "}";
}

bot.on("message", msg => {
	try {
		if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
			if (msg.guild != null && msg.content == prefix[msg.guild.id]+"globaldicts") {
				if (authorised_IDs.indexOf(msg.author.id) > -1) {
					output = "";
				
					// Music Dicts
					output += "\n// --- Music Dicts ---\n";
					output += "\n\n// song_queus\n" + dict2string(song_queus);
					output += "\n\n// song_player\n" + dict2string(song_player);
					output += "\n\n// channel_guild\n" + dict2string(channel_guild);
					output += "\n\n// stream\n" + dict2string(stream);
					output += "\n\n// forced_song\n" + dict2string(forced_song);
					output += "\n\n// loop\n" + dict2string(loop);
					output += "\n\n// loopq\n" + dict2string(loopq);
					output += "\n\n// backup_queue\n" + dict2string(backup_queue);
					output += "\n\n// dj\n" + dict2string(dj);
					output += "\n\n// steamOptions\n" + dict2string(steamOptions);
					output += "\n\n// freeplay\n" + dict2string(freeplay);
				
					// Other
					output += "\n// --- Other ---\n";
					output += "\n\n// user_who_broke_rules_dict\n" + dict2string(user_who_broke_rules_dict);
					output += "\n\n// dataset_counts\n" + dict2string(dataset_counts);
					output += "\n\n// letter_emojis\n" + dict2string(letter_emojis);
					output += "\n\n// self_roles_dict\n" + dict2string(self_roles_dict);

					// auto post
					output += "\n// --- Auto Post ---";
					output += "\n\n// hentai_intervals\n" + dict2string(hentai_intervals);
					output += "\n\n// nude_intervals\n" + dict2string(nude_intervals);
					output += "\n\n// meme_intervals\n" + dict2string(meme_intervals);
					output += "\n\n// photo_intervals\n" + dict2string(photo_intervals);
					output += "\n\n// bird_intervals\n" + dict2string(bird_intervals);
					output += "\n\n// car_intervals\n" + dict2string(car_intervals);
					output += "\n\n// cat_intervals\n" + dict2string(cat_intervals);
					output += "\n\n// dog_intervals\n" + dict2string(dog_intervals);
					output += "\n\n// snake_intervals\n" + dict2string(snake_intervals);
					output += "\n\n// porngif_intervals\n" + dict2string(porngif_intervals);

					// justone
					output += "\n// --- JustOne ---";
					output += "\n\n// justone_guild\n" + dict2string(justone_guild);
					output += "\n\n// justone_members_dict\n" + dict2string(justone_members_dict);
					output += "\n\n// justone_clues_dict\n" + dict2string(justone_clues_dict);
					output += "\n\n// justone_channel_IDs\n" + dict2string(justone_channel_IDs);

					// networking
					output += "\n// --- Networking ---";
					output += "\n\n// justone_members_dict\n" + dict2string(port_scan_results);
					output += "\n\n// justone_members_dict\n" + dict2string(port_scan_timeout);

					// execute
					output += "\n// --- Execute ---";
					output += "\n\n// execute_cooldown\n" + dict2string(execute_cooldown);

					// rules
					output += "\n// --- Rules ---";
					output += "\n\n// rule_timeout\n" + dict2string(rule_timeout);
					output += "\n\n// phishing_timeouts\n" + dict2string(phishing_timeouts);
					output += "\n\n// user_spam_dict\n" + dict2string(user_spam_dict);
					output += "\n\n// banned_emojis\n" + dict2string(banned_emojis);
					output += "\n\n// banned_urls\n" + dict2string(banned_urls);
					output += "\n\n// filter_onoff\n" + dict2string(filter_onoff);
				
					// Py Challenges
					output += "\n// --- Py Challenges ---";
					output += "\n\n// sent_pychallenge\n" + dict2string(sent_pychallenge);

					// Levels
					output += "\n// --- levels ---";
					output += "\n\n// updating_leaderboard\n" + dict2string(updating_leaderboard);
					output += "\n\n// leaderboard_cooldown\n" + dict2string(leaderboard_cooldown);
					output += "\n\n// leaderboard_intervals\n" + dict2string(leaderboard_intervals);
				
					// Welcome
					output += "\n// --- Welcome ---";
					output += "\n\n// welcome_channel_ids\n" + dict2string(welcome_channel_ids);
					output += "\n\n// first_time_join\n" + dict2string(first_time_join);
					
					// prefix
					output += "\n// --- Prefix ---";
					output += "\n\n// Prefix\n" + dict2string(prefix);
		
					// write dicts to file
					fs_write.writeFile("logs/global_dicts.txt", output, function(err) {
						if (err) {
							return console_log("Failed to write Global dicts to file! ", error=true);
						}
					})
				
					// message user
					embed_chat_reply(msg, "Wrote Global Dicts to file!");
				
				} else {
					embed_error(msg, "You dont have permission to use this command, this command can only be used by Jared!");
				}
			}
		}
	} catch (err) {
		console_log("Error thrown in globaldicts! " + err, error=true);
	}
})


// maths functions
function is_leap(msg, year) {
	try {
		if ((year % 4 && (year % 100 != 0 || year % 400 == 0)) == true) {
			leapyear_output = "false " + year + " is not a leap year!";
			embed_input_output_reply(msg, year, leapyear_output, "Calculator", "type -help math for list of commands");
		} else {
			leapyear_output = "true " + year + " is a leap year!";
			embed_input_output_reply(msg, year, leapyear_output, "Calculator", "type -help math for list of commands");
		}
	} catch (err) {
		console_log("Error thrown in is_leap function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"isleap ") {
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"bmi ") {
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase().slice(0, 3) == prefix[msg.guild.id]+"c " || msg.content.toLowerCase().slice(0, 3) == prefix[msg.guild.id]+"f ") {
			temp = msg.content.slice(3, msg.content.length);
			if (isNaN(parseInt(temp)) == false) {
				if (msg.content.toLowerCase().slice(0, 3) == prefix[msg.guild.id]+"c ") {
					temp_output = String(((temp * (9/5)) + 32).toFixed(1)).replace(".0","");
					embed_input_output_reply(msg, temp+"°C", temp_output+"°F", "Calculator", "type -help math for list of commands");
					
				} else if (msg.content.toLowerCase().slice(0, 3) == prefix[msg.guild.id]+"f ") {
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"calc ") {
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
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content.toLowerCase() == prefix[msg.guild.id]+"calc") {
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
			msg_channel_send(msg, embed_calc_help);
		}
	}
})

// int2num
function hundred(n) {
	try {
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
	} catch (err) {
		console_log("Error thrown in hundred function! " + err, error=true);
	}
}

function int2num(msg, n, doReply) {
	try {
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
	} catch (err) {
		console_log("Error thrown in int2num function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"saynum " || msg.content.slice(0, 10) == prefix[msg.guild.id]+"int2text ") {
			if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"int2text ") {
				num = msg.content.slice(10, msg.content.length);
			} else {
				num = msg.content.slice(8, msg.content.length);
			}
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
function hash(msg, hashName) {
	try {
		var sum = cryp.createHash(hashName);
	
		sum.update(msg.content.slice(5, msg.content.length));
		hash_input_text = msg.content.slice(5, msg.content.length);
		embed_input_output_reply(msg, hash_input_text, sum.digest('hex'), "Calculator", "type -help math for list of commands");
	} catch (err) {
		console_log("Error thrown in hash function! " + err, error=true);
	}
}

function hash_help(msg) {
	try {
		embed_help_hash = new Discord.MessageEmbed();
		embed_help_hash.setColor(embed_colour_info);
		embed_help_hash.setTitle("Help Hash");
		embed_help_hash.addFields(
			{name: "-hash", value: "Generates checksums for a file, add the comment `-hash` when uploading a file to discord to display hashs.\n\u200B"},
			{name: "-md4", value: "Generates an MD4 hash, for example `-md4 Hello` produces `a58fc871f5f68e4146474ac1e2f07419`.\n\u200B"},
			{name: "-md5", value: "Generates an MD5 hash, for example `-md5 Hello` produces `8b1a9953c4611296a827abf8c47804d7`.\n\u200B"},
			{name: "-sha1", value: "Generates an SHA1 hash, for example `-sha1 Hello` produces `2cb42271c614a1f32dee3a8cc7d7e4d62dc04be7`.\n\u200B"},
			{name: "-sha224", value: "Generates an SHA224 hash, for example `-sha224 Hello` produces `3315a79f00f1179473f3b86aed44f7db56009d14b971d6361e705de2`.\n\u200B"},
			{name: "-sha256", value: "Generates an SHA256 hash, for example `-sha256 Hello` produces `62fa62853835a432efe7c8e82723b5e66be7319780033746dcdce168f0ec8554`.\n\u200B"},
			{name: "-sha384", value: "Generates an SHA384 hash, for example `-sha384 Hello` produces `6be6ea8b48cebdbf0cd1629b2203b5ba58f754948f2dadb6f006f4b49f89e8eefe1b6dfcd4cb2bbb458783d9e1f13a48`.\n\u200B"},
			{name: "-sha512", value: "Generates an SHA512 hash, for example `-sha512 Hello` produces `f6317fb1129b48c616400af50db8b5b458e68eb08555a6289bbb858e91166ce8d51850ee9b4c77da8579f977fd22c2d627bbe471af628309bc1c023a9c4e3718`.\n\u200B"},
		)
		embed_help_hash.setTimestamp();
		msg_channel_send(msg, embed_help_hash);
	} catch (err) {
		console_log("Error thrown in hash_help function! " + err, error=true);
	}
}

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"md4 ") {
			hash(msg, "md4");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"md5 ") {
			hash(msg, "md5");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"sha1 ") {
			hash(msg, "sha1");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"sha224 ") {
			hash(msg, "sha224");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"sha256 ") {
			hash(msg, "sha256");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"sha384 ") {
			hash(msg, "sha384");
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 8) == prefix[msg.guild.id]+"sha512 ") {
			hash(msg, "sha512");
		}
	}
})

// hash file
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.content == prefix[msg.guild.id]+"hash") {
			url = undefined;
			msg.attachments.forEach(function(attachment) {
				url = attachment.url.replace("https", "http");
			})
			
			if (url == undefined) {
				hash_help(msg);
			} else {
				try {
					// download file
					fname = msg.guild.id + "_" + parseInt(new Date().getTime() / 1000) + ".data";
					dest = server_folder_location + "videos/src/" + fname;
					download(url, dest, function(fobject) {
						// hash file
						get_md5(msg, dest, function(digest_dict) {
							// check for error
							if (digest_dict == false) {
								embed_error(msg, "Failed to hash the file, please try again! " + err);
								return false;
							}
							
							// checksums
							digest_string = "MD4: `" + digest_dict["md4"] + "`\n\u200B" +
								"MD5: `" + digest_dict["md5"] + "`\n\u200B" +
								"SHA1: `" + digest_dict["sha1"] + "`\n\u200B" +
								"SHA224: `" + digest_dict["sha224"] + "`\n\u200B" +
								"SHA256: `" + digest_dict["sha256"] + "`\n\u200B" +
								"SHA384: `" + digest_dict["sha384"] + "`\n\u200B" +
								"SHA512: `" + digest_dict["sha512"] + "`\n\u200B"
						
							// meta data
							stats = fs_append.statSync(dest);
							file_size = (stats.size/1024/1024).toFixed(1)+"MB (" + String(stats.size).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " bytes)";
						
							// delete file
							fs_write.unlink(dest, err => {
								if (err) {
									console_log("Failed to delete file! " + err, error=true);
								}
							
								// append hash to file
								data = "\n--- " + new Date().toGMTString() + " ---\n" + url.split("/")[url.split("/").length-1] + "\n" + digest_string;
								fs_append.appendFile(local_hash_log, data.replace(/`/g, ""), function(err) {
									if (err) {
										console_log("Failed to append hash to crypto.txt! " + err, error=true);
									}
								
									// embed
									embed_hash = new Discord.MessageEmbed();
									embed_hash.setColor(embed_color_chat);
									embed_hash.setTitle("Hash Info");
									embed_hash.setDescription("Below is the cryptographic information for [this]("+url+") file, SHA and MD checksums have been generated. You can also find plain text copy of the hashs [here]("+online_hash_log+").\n\u200B");
									embed_hash.addFields(
										{name: "File Name", value: url.split("/")[url.split("/").length-1] + "\n\u200B", inline: true},
										{name: "Size", value:  file_size + "\n\u200B", inline: true},
										{name: "Checksums", value: digest_string}
									)
									embed_hash.setTimestamp();
									msg_channel_send(msg, embed_hash);
								
								})
							})
						})
					})
				} catch (err) {
					console_log("An error was thrown when hasing a file! " + err, error=true);
					embed_error(msg, "Failed to hash the file, please try again!");
				}
			}
		}
	}
})

// Caesar Cipher
function shift(msg, txt, places) {
	try {
		chars = String(txt).split("");
		output = [];
		for (i=0;i<chars.length;i++) {
			if (places >= 0) {
				output.push(ASCII[(ASCII.indexOf(chars[i]) + places) % ASCII.length]);
			} else if (places < 0) {
				output.push(ASCII[(ASCII.indexOf(chars[i]) + ASCII.length + places.replace("-","")) % ASCII.length]);
			}
		
		}
		embed_chat_reply(msg, output.join(""));
	} catch (err) {
		console_log("Error thrown in shift function! " + err, error=true);
	}
}

// check the text is all alpha and numbers only
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"shift") {
			if (msg.guild != null && msg.content == prefix[msg.guild.id]+"shift") {
				embed_chat_reply(msg, "The syntax for the command is `-shift{places} {text}` " +
				"for example `-shift8 Hello World` will produce the message digest `PWttX.X6tM`, " +
				"to get back the original string we can then do `-shift-8 PWttX.X6tM`");
			
			} else {
				places = msg.content.slice(6, msg.content.length).split(" ")[0];
				txt = msg.content.slice(6 + places.length, msg.content.length);
		
				if (isNaN(parseInt(places)) == false && places.indexOf(".") == -1) {
					shift(msg, txt, places);
				} else {
					embed_error(msg, "Invalid Input! the correct format is '-shift{No. places} {text}'!");
				}
			}
		}
	}
})

// --- levels ---
var levels = {};

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (levels[msg.guild.id] != undefined) {
			if (msg.member != null) {
				if (msg.author.bot == false) {
					if (levels[msg.guild.id][msg.member.id] == undefined) {
						levels[msg.guild.id][msg.member.id] = 1;
					} else {
						levels[msg.guild.id][msg.member.id] += 1;
					}
				}
			}
		} else {
			// add user to dict
			levels[msg.guild.id] = {};
			if (msg.member != null) {
				if (msg.author.bot == false) {
					levels[msg.guild.id][msg.member.id] = 1;
				}
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 10) == prefix[msg.guild.id]+"addscore ") {
			if (msg.member.hasPermission("BAN_MEMBERS") == true) {
				command = msg.content.slice(10, msg.content.length).split(",");
				if (command.length == 2) {
					user_id = command[0];
					msg_count = command[1];
					if (isInt(msg, user_id, 0, 10**18, "User ID", ErrorMessageEnd="") == true) {
						if (isInt(msg, msg_count, 0, 10**18, "User ID", ErrorMessageEnd="") == true) {
							// add the user
							levels[msg.guild.id][user_id] = parseInt(msg_count);
							embed_chat_reply(msg, "Added user " + user_id + " to the global dictionary!");
						}
					}
				}
			} else {
				embed_error(msg, "You don't have permission to manually add members to the scoreboard!");
			}
		}
	}
})

// write cached msg counts to file
var write_msg_log = true;
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (write_msg_log == true) {
			// timeout
			write_msg_log = false;
			setTimeout(function() {
				write_msg_log = true;
			}, write_msg_cache_timeout);
		
			// make file
			make_server_folder_file(msg, message_count_channel_file);
		
			// get directory
			server_name = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			f_path = logging_path + "/" + server_name + "/" + message_count_channel_file;
		
			// check if file exists
			if (fs_read.existsSync(f_path) == true) {
				// read message count file
				fs_read.readFile(f_path, "utf8", function(err, data) {
					if (err) {
						return console_log("Failed to read message counts file!", error=true);
					}
				
					// format data
					current_data = {};
					file_line = data.replace(/\n/g,"").split(";");
					for (i=0;i<file_line.length;i++) {
						current_line = file_line[i].split(",");
						if (current_line.length == 2) {
							current_data[current_line[0]] = parseInt(current_line[1]);
						}
					
					}
				
					// add new counts
					current_counts = levels[msg.guild.id];
					current_count_keys = Object.keys(current_counts);
				
					for (i=0;i<current_count_keys.length;i++) {
						// add users to dict
						if (current_data[current_count_keys[i]] == undefined) {
							current_data[current_count_keys[i]] = parseInt(current_counts[current_count_keys[i]]);
						} else {
							current_data[current_count_keys[i]] += parseInt(current_counts[current_count_keys[i]]);
						}
					}
				
					// clear counts
					levels[msg.guild.id] = {};
				
					// convert dict to string
					current_keys = Object.keys(current_data);
					output = [];
					for (i=0;i<current_keys.length;i++) {
						output.push(current_keys[i] + "," + current_data[current_keys[i]] + ";");
					}
				
					// write data to file
					fs_write.writeFile(f_path, output.join("\n"), function(err) {
						if (err) {
							return console_log("Failed to write to message counts file!", error=true);
						}
					})
				})
			}
		}
	}
})

// create leaderboard
const leaderboard_row_html = `
<div class="row">
	<div class="left-colm">
		<div class="rank-div">
			<div class="#Rank_Class#">#User_Rank#</div>
		</div>
		<div class="user-avatar-div">
			<img class="user-avatar" src="#User_Avatar_URL#"></img>
		</div>
		<p class="user-name">#User_Name#</p>
	</div>
	<div class="right-colm">
		<div class="level-circle">
			<div class="lvl-cl-div">
				<span class="lvl-cl-header">Level</span>
				<span class="lvl-cl-value">#User_Level#</span>
			</div>
		</div>
		<div class="colm-cnt-msg">
			<span class="com-cnt-header">Experiance</span>
			<p class="com-cnt-value">#User_XP#</p>
		</div>
		<div class="colm-cnt-xp">
			<span class="com-cnt-header">Messages</span>
			<p class="com-cnt-value">#User_Message_Count#</p>
		</div>
	</div>
</div>
`

function sort_array(array, sublist=false) {
	try {
		// sort
		sorted = [];
		for (x=0;x<array.length;x++) {
			highest = ["", 0];
			for (i=0;i<array.length;i++) {
				current_id = array[i].split(",")[0].replace(/\D/g, "");
				current_count = array[i].split(",")[1];
				if (String(sorted).indexOf(current_id) == -1) {
					if (parseInt(current_count) > highest[1]) {
						highest = [current_id, current_count];
					}
				}
			}
			if (highest[0].length > 0) {
				sorted.push(highest);
			}
		}
	
		// convert back to string
		if (sublist == false) {
			sorted_str = [];
			for (i=0;i<sorted.length;i++) {
				sorted_str.push(sorted[i].join(","));
			}
			return sorted_str;
		} else {
			return sorted;
		}
	} catch (err) {
		console_log("Error thrown in sort_array function! " + err, error=true);
	}
}

function ab_num(n) {
	try {
		n = String(n);
		if (n.length <= 3) {
			return n;
		} else if (n.length > 3 && n.length < 6) {
			return n.slice(0, n.length-3) + "." + n.slice(n.length-3, n.length-2) + "k";
		} else if (n.length == 6) {
			return n.slice(0, n.length-3) + "k";
		} else if (n.length > 6 && n.length < 9) {
			return n.slice(0, n.length-6) + "." + n.slice(n.length-6, n.length-5) + "m";
		} else if (n.length == 9) {
			return n.slice(0, n.length-6) + "m";
		} else if (n.length > 9) {
			return "Too Big";
		}
	} catch (err) {
		console_log("Error thrown in ab_num function! " + err, error=true);
	}
}

// -- leaderboard --
// check if user is in guild
async function check_member(msg, user_ID) {
	try {
		msg.guild.members.fetch(user_ID).then(user => {
			return true;
		}).catch(error => {
			return false;
		})
	} catch (err) {
		console_log("Error thrown in check_member function! " + err, error=true);
	}
}

var updating_leaderboard = {};
function update_leaderboad(msg) {
	try {
		// get directory
		server_name = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
		f_path = logging_path + "/" + server_name + "/" + message_count_channel_file;
		updating_leaderboard[msg.guild.id] = true;
		
		// check if file exists
		if (fs_read.existsSync(f_path) == true) {
			// read message count file
			fs_read.readFile(f_path, "utf8", function(err, data_members) {
				if (err) {
					return console_log("Failed to read message counts file!", error=true);
				}
			
				// backup file
				create_file_then_append_data(msg, message_count_channel_file + ".backup.txt", data_members, endl="", overwrite=true);
			
				// backup after hour min
				if (new Date().getMinutes() == 0) {
					setTimeout(function() {
						create_file_then_append_data(msg, message_count_channel_file + ".backup1.txt", data_members, endl="", overwrite=true);
					}, 5000);
				}
			
				// read HTML template
				fs_read.readFile(local_msg_template, "utf8", function(err, data_template) {
					if (err) {
						return console_log("Failed to read message template file!", error=true);
					}
				
					new_template = data_template.replace("#Server_Name#", msg.guild.name).replace("#Server_Avatar_URL#", msg.guild.iconURL());
						
					// sort the data
					current_members = data_members.split(";");
					current_members = sort_array(current_members);
					console_log("Updating leaderboard for " + msg.guild.name + "!");
						
					// create rows
					rows = [];
					rows_raw = [];
					async function generate_rows() {
						try {
							for (var i=0;i<current_members.length;i++) {
								current_user = current_members[i].split(",");
								current_user_id = current_user[0].replace(/\D/, "");
								if (current_user.length == 2) {
							
									if (true) {
										await new Promise(next => {
											// get user guild
											msg.guild.members.fetch(current_user_id).then(current_guild => {
												if (current_guild != undefined) {
													// get user info
													current_user_msg_count = current_user[1];
													current_user_lvl = parseInt(parseInt(current_user_msg_count) / xp_per_level);
													current_user_xp = parseInt(current_user_msg_count) * xp_per_msg;
													current_user_rank = i+1;
													current_user_avatar_URL = current_guild.user.avatarURL();
													current_username = current_guild.user.username;
											
													// raw data
													rows_raw.push([current_user_id, current_username, current_user_rank, current_user_msg_count, current_user_lvl, current_user_xp]);
								
													// update row
													current_user_row = leaderboard_row_html.replace("#User_Name#", current_username);
													current_user_row = current_user_row.replace("#User_Level#", current_user_lvl);
													current_user_row = current_user_row.replace("#User_XP#", ab_num(current_user_xp));
													current_user_row = current_user_row.replace("#User_Message_Count#", current_user_msg_count.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
								
													current_user_row = current_user_row.replace("#User_Rank#", current_user_rank);
													current_user_row = current_user_row.replace("#User_Avatar_URL#", current_user_avatar_URL);
								
													// rank colours
													if (current_user_rank == 1) {
														current_user_row = current_user_row.replace("#Rank_Class#", "rank-gold");
													} else if (current_user_rank == 2) {
														current_user_row = current_user_row.replace("#Rank_Class#", "rank-silver");
													} else if (current_user_rank == 3) {
														current_user_row = current_user_row.replace("#Rank_Class#", "rank-bronze");
													} else {
														current_user_row = current_user_row.replace("#Rank_Class#", "rank");
													}
								
													// add row to rows list
													rows.push(current_user_row);
										
													// next
													next();
												}
											}).catch(error => {
												// skip to next user
												next();
											})
										})
									}
								}
							}
						} catch (err) {
							console_log("Error thrown in generate_rows function! " + err, error=true);
						}
					}
				
					// generate HTML
					generate_rows().then(() => {
						// raw leaderboard
						raw_output = [];
						rows_length = 0;
						for (i=0;i<rows_raw.length;i++) {
							raw_output.push(rows_raw[i].join(","));
							rows_length = rows_raw[i].length;
						}
					
						// write rank data
						create_file_then_append_data(msg, leaderboard_raw, raw_output.join(";\n"), endl="", overwrite=true);
					
						// format data
						server_name = msg.guild.name.replace(/ /g, "_");
						leaderboard_path = local_leaderboard_dir + "/" + server_name + msg.guild.id + ".html";
						final_output = new_template.replace("#rows#", rows.join("\n"));
					
						// write data
						console_log("wrote HTML to file!");
						fs_write.writeFile(leaderboard_path, final_output, function(err) {
							if (err) {
								return console_log("Failed to write HTML to leaderboard file!", error=true);
							}
						})
						
						// console
						console_log("updated leaderboard for " + msg.guild.name);
						setTimeout(function() {
							updating_leaderboard[msg.guild.id] = false;
						}, 5000);
					})
				})
			})
		}
	} catch (err) {
		console_log("Error thrown in update_leaderboad function! " + err, error=true);
	}
}

var leaderboard_cooldown = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 6) == prefix[msg.guild.id]+"level" || msg.content.slice(0, 12) == prefix[msg.guild.id]+"leaderboard" || 
			msg.content.slice(0, 11) == prefix[msg.guild.id]+"scoreboard" || msg.content.slice(0, 6) == prefix[msg.guild.id]+"score" || 
			msg.content.slice(0, 9) == prefix[msg.guild.id]+"msgcount" || msg.content.slice(0, 13) == prefix[msg.guild.id]+"messagecount") {
			// send leaderboard
			embed_chat_reply(msg, webserver_leaderboard_dir + "/" + msg.guild.name.replace(/ /g, "_") + msg.guild.id + ".html");
		}
	}
})

var leaderboard_intervals = {};
bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (leaderboard_intervals[msg.guild.id] == undefined) {
			leaderboard_intervals[msg.guild.id] = true;
		} else if (leaderboard_intervals[msg.guild.id] == true) {
			if (msg.content != prefix+"levels") {
				// timeout to stop leaderboard updating on every message
				leaderboard_intervals[msg.guild.id] = false;
				guild_id = msg.guild.id;
				setTimeout(function() {
					leaderboard_intervals[guild_id] = true;
				}, leader_autoupdate_timeout, guild_id);
			
				// update leaderboard
				update_leaderboad(msg);
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content.slice(0, 5) == prefix[msg.guild.id]+"rank") {
			
			async function generate_rank_card(message, rank, lvl, progress, statusName, current_user_id) {
				try {
					// check for undefined
					if (msg.guild == undefined || msg.guild == null) {
						console_log("Failed to send rank card, guild is undefined!", error=true);
						return false;
					}
				
					// local file locations
					bg = server_folder_location + "img/src/web/rank/bg1.png";
					ly2 = server_folder_location + "img/src/web/rank/ly2.png";
					lvl_txt = server_folder_location + "img/src/web/rank/level_text.png";
					rank_txt = server_folder_location + "img/src/web/rank/rank_text.png";
					blank = server_folder_location + "img/src/web/rank/blank.png";
					custom_font_path = server_folder_location + "img/src/web/rank/font.fnt";
					status1 = server_folder_location + "img/src/web/rank/status/" + statusName + ".png";
				
					// web server locations
					rand_num = parseInt(Math.random() * 1000000);
					local_output_img = server_folder_location + "rank_cards/"+current_user_id+rand_num+".png";
					webserver_location = webserver_root_address + "rank_cards/"+current_user_id+rand_num+".png";
					avatar_img = message.displayAvatarURL().replace(".webp", ".png");
				
					// load images
					img_bg = await jimp.read(bg);
					img_ly2 = await jimp.read(ly2);
					img_lvl_txt = await jimp.read(lvl_txt);
					img_rank_txt = await jimp.read(rank_txt);
					img_avatar = await jimp.read(avatar_img);
					blank = await jimp.read(blank);
				
					statuso = await jimp.read(status1);
				
					// load numbers
					nums = {};
					for (i=0;i<10;i++) {
						nums[i] = await jimp.read(server_folder_location + "img/src/web/rank/nums_32/"+String(i)+".png");
					}
				
					// fonts
					font1 = await jimp.loadFont(custom_font_path);
					font2 = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
					font3 = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
				
					// add images
					await img_bg.blit(img_ly2, 15, 15).write(local_output_img);
					await img_bg.blit(img_avatar.resize(50, 50), 40, 35).write(local_output_img);
					await img_bg.blit(statuso.resize(20, 20), 72, 70).write(local_output_img);
				
					// add progress bar
					progress = String(parseInt(progress) % 30)
					if (isNaN(progress) == false && progress != undefined) {
						progress_bar = await jimp.read(server_folder_location + "img/src/web/rank/progress_bar_blue/"+progress+".png")
						await img_bg.blit(progress_bar, 90, 70).write(local_output_img);
					}
				
					// add username
					username = [message.tag.split("#")[0], message.tag.split("#")[1]];
					await img_bg.print(font2, 100, 35, username[0]).write(local_output_img);
				
					// add username numbers
					await img_bg.print(font3, (username[0].length*20)+90, 50, username[1]).write(local_output_img);
				
					// add rank
					await img_bg.blit(img_rank_txt.resize(40, 10), 210, 30).write(local_output_img);
					await img_bg.print(font2, 250, 10, "#"+String(rank)).write(local_output_img);
				
					// add level
					await img_bg.blit(img_lvl_txt.resize(40, 10), (String(rank).length*18)+265, 30).write(local_output_img);
					await img_bg.print(font2, (String(rank).length*18)+265+40, 10, String(lvl)).write(local_output_img);
				
					// send message
					if (msg.guild.me.hasPermission("ATTACH_FILES") == true) {
						msg_channel_send(msg, "\u200B", {files: [webserver_location]});
				
						// delete file
						setTimeout(function(){
							try {
								fs_write.unlink(local_output_img, (err) => {
									console_log("Failed to delete file " + local_output_img, err=true);
								})
							} catch {
								console_log("Failed to delete rank card!", err=true);
							}
						}, 5000);
					} else {
						console_log("JaredBot does not have permission to attach files on " + msg.guild.name + "!");
						embed_error("JaredBot does not have permission to attach files, please go to server settings --> roles, then " +
						"assign JaredBot the attach files role!");
					}
				} catch (err) {
					console_log("Error thrown in generate_rank_card function! " + err, error=true);
				}
			}
			
			// get directory
			server_name = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
			f_path = logging_path + "/" + server_name + "/" + leaderboard_raw;
		
			// check if file exists
			if (fs_read.existsSync(f_path) == true) {
				// read message count file
				fs_read.readFile(f_path, "utf8", function(err, data) {
					if (err) {
						return console_log("Failed to read raw leaderboard file!", error=true);
					}
					
					
					// get user
					let member = msg.mentions.members.first();
					if (member != undefined) {
						user_id = member.id;
						member_o = member.user;
						
						// check if user is bot
						if (member.bot == true) {
							embed_chat_reply(msg, "Bots don't have ranks");
							return false;
						}
					} else {
						user_id = msg.author.id;
						member_o = msg.author;
					}
					
					if (data.indexOf(user_id) > -1) {
						// format data
						current_user_data = data.split(user_id)[1].split(";")[0].split(",");
						
						// fetch member
						channel_guild = bot.channels.cache.get(msg.channel.id);
						channel_guild.guild.members.fetch(user_id).then(function(members) {
							members.guild.members.fetch(user_id).then(function(member) {
								// get info
								name = current_user_data[1];
								rank = current_user_data[2];
								msg_count = current_user_data[3];
								user_lvl = current_user_data[4];
								user_xp = current_user_data[5];
								statusName = member.user.presence.status;
								progress = parseInt((parseInt(msg_count) % xp_per_level) / 3);
								
								// generate rank card
								generate_rank_card(member_o, rank, user_lvl, progress, statusName, user_id);
								
							}).catch(error => {
								embed_chat_reply(msg, "Failed to fetch info on the requested user.");
								return false;
							})
						})
						
					} else {
						embed_error(msg, "Failed to fetch info on the requested user! they might not have sent enough messages, " +
						"could be a bot, or could be new to the server so don't have a rank yet.");
						return false;
					}
				})
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"restorebackup") {
			if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
				// get directory
				server_name = msg.guild.name.replace(" ","_")+"_"+ msg.guild.id;
				f_path = logging_path + "/" + server_name + "/" + message_count_channel_file + ".backup.txt";
				updating_leaderboard[msg.guild.id] = true;
		
				// check if file exists
				if (fs_read.existsSync(f_path) == true) {
					// read message count backup file
					fs_read.readFile(f_path, "utf8", function(err, data_members) {
						if (err) {
							return console_log("Failed to read file " + message_count_channel_file + "on restore backup!", error=true);
						}
			
						// write backup data to msg count
						create_file_then_append_data(msg, message_count_channel_file, data_members, endl="", overwrite=true);
						
						// clear cached messages
						levels[msg.guild.id] = {};
						
						// update leaderboard
						update_leaderboad(msg);
						
						// message user
						embed_chat_reply(msg, "Backup scoreboard restored!");
						
					})
				}
			}
		}
	}
})

// Wellcome
var welcome_channel_ids = {};
var welcome_backgrounds = [];
var welcome_asets = {};

function help_welcome(msg) {
	try {
		// embed
		embed_welcome = new Discord.MessageEmbed();
		embed_welcome.setColor(embed_color_chat);
		embed_welcome.setTitle("Welcomer Help");
		embed_welcome.setDescription("Welcomer is a feature that will automatically post a message when a user joins or leaves the server!\n\u200B");
		embed_welcome.addFields(
			{name: "Welcome", value: "`-welcome` sets the channel the command is run in as the welcome channel, when users leave or join the server, a message will be automtically posted in the welcome channel.\n\u200B"},
			{name: "Clear welcome", value: "`-clearwelcome` clears the welcome channel, leave/join messages will no longer be posted in the welcome channel.\n\u200B"},
		)
		embed_welcome.setTimestamp();
		msg_channel_send(msg, embed_welcome);
	} catch (err) {
		console_log("Error thrown in help_welcome function! " + err, error=true);
	}
}

bot.on("ready", msg => {
	// update channel IDs global var
	read_file(welcome_channel_name, welcome_channel_ids, allow_non_int=false, sep="", remove_dupes=false);
	console_log("Read welcome channel IDs");
	
	// load backgrounds
	bg_location = server_folder_location + "img/src/web/welcome/backgrounds";
	
	fs_read.readdir(bg_location, (err, files) => {
		async function read_bg_files() {
			try {
				for (var i=0;i<files.length;i++) {
					await new Promise(next => {
						// load image
						fname = "bg" + ((parseInt(Math.random() * 100) % files.length)+1) + ".png";
						jimp.read(bg_location + "/" + fname).then(current_bg => {
							welcome_backgrounds.push(current_bg);
							next();
						})
					}).catch(error => {
						console_log("Failed to load background file " +i, err=error);
					})
				}
			} catch (err) {
				console_log("Error thrown in read_bg_files function! " + err, error=true);
			}
		}
		read_bg_files().then(function() {
			console_log("Loaded all welcome backgrounds!");
		})
	})
	
	// load other welcome background files
	async function load_assets() {
		try {
			welcome_asets["blank"] = await jimp.read(server_folder_location + "img/src/web/welcome/blank.png");
			welcome_asets["white"] = await jimp.read(server_folder_location + "img/src/web/welcome/white.png");
			welcome_asets["font1"] = await jimp.loadFont(jimp.FONT_SANS_32_WHITE);
			welcome_asets["font2"] = await jimp.loadFont(jimp.FONT_SANS_16_WHITE);
		} catch (err) {
			console_log("Error thrown in load_assets function! " + err, error=true);
		}
	}
	load_assets().then(function() {
		console_log("Loaded all other welcome assets!");
	})
})

// Welcome card
bot.on("guildMemberAdd", member => {
	// user info
	username = member.user.username;
	user_avatar = member.user.displayAvatarURL();
	guild_id = member.guild.id;
	
	// read channel file
	if (welcome_channel_ids[guild_id] != undefined) {
		// send message
		bot.channels.fetch(welcome_channel_ids[guild_id]).then(channel => {
			
			// welcome card
			async function welcome_card() {
				try {
					// read files
					img_bg = welcome_backgrounds[parseInt(Math.random() * 10) % welcome_backgrounds.length];
					user_pfp = await jimp.read(user_avatar.replace(".webp", ".png"));
				
					// locations
					rand_num = parseInt(Math.random() * 1000000);
					local_output_img = server_folder_location + "img/src/web/welcome/welcome_cards"+username.replace(/[ #]/g,"_")+rand_num+".png";
					webserver_location = server_folder_location + "img/src/web/welcome/welcome_cards"+username.replace(/[ #]/g,"_")+rand_num+".png";
				
					// add avatar
					await img_bg.blit(welcome_asets["blank"].resize(380, 140), 10, 10).write(local_output_img);
					await img_bg.blit(welcome_asets["white"].resize(84, 84), 158, 28).write(local_output_img);
					await img_bg.blit(user_pfp.resize(80, 80), 160, 30).write(local_output_img);
				
					// add text
					await img_bg.print(welcome_asets["font2"], 75, 120, username + " just joined the server!").write(local_output_img);
					
					// send message
					channel.send("Hey **"+username+"** welcome to " + member.guild.name+"!", {files: [webserver_location]});
				
					// delete welcome card
					setTimeout(function(){
						try {
							fs_write.unlink(local_output_img, (err) => {
								console_log("Failed to delete welcome card file " + local_output_img, err=true);
							})
						} catch {
							console_log("Failed to delete rank card!", err=true);
						}
					}, 5000);
				} catch (err) {
					console_log("Error thrown in welcome_card function! " + err, error=true);
				}
				welcome_card().then(function() {
					console_log("User " + username + " joined server " + guild_id, error=false, mod=true);
				});
			}
		})
	}
})

// Leave
bot.on("guildMemberRemove", member => {
	// read channel file
	username = member.user.username;
	guild_id = member.guild.id;
	
	if (welcome_channel_ids[guild_id] != undefined) {
		// send message
		bot.channels.fetch(welcome_channel_ids[guild_id]).then(channel => {
			channel.send("**"+username + "** just left the server!");
			console_log(username + " just left the server " + guild_id, err=false, mod=true);
			
		}).catch (error => {
			console_log("error raised when user left server!", err=true);
		})
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"welcome") {
			if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
				create_file_then_append_data(msg, welcome_channel_name, msg.channel.id, endl="", overwrite=true);
				embed_chat_reply(msg, "welcome messages will now be posted in " + msg.channel.name + " when a user joins the server!");
				console_log("Welcome channel set for server " + msg.guild.name + "!", error=false, mod=true);
			} else {
				embed_error(msg, "You dont have permission to set the welcome channel, " + mod_error_text + " manage messages permission!");
			}
		}
	}
})

bot.on("message", msg => {
	if (msg.guild != null && authrosied_server_IDs.indexOf(msg.guild.id) > -1) {
		if (msg.guild != null && msg.content == prefix[msg.guild.id]+"clearwelcome") {
			if (msg.member.hasPermission("MANAGE_CHANNELS") == true) {
				// clear file
				clear_file(msg, welcome_channel_name);
				
				// message user
				embed_chat_reply(msg, "Welcome file cleared!");
			} else {
				embed_error(msg, "You dont have permission to set the welcome channel, " + mod_error_text + " manage messages permission!");
			}
		}
	}
})

// send message when bot is added to server (join server)
bot.on("guildCreate", guild => {
	try {
		// check for undefined
		if (guild == undefined || guild == null) {
			return false;
		}
	
		// find text channel
		console_log("JaredBot joined server " + guild.name, error=false, mod=true);
		first_channel = "";
		guild.channels.cache.forEach(channel => {
			if (channel.type == "text" && first_channel == "") {
				if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
					first_channel = channel;
				}
			}
		})
	
		first_time_join[guild.id] = true;
	
		// embed
		embed_join = new Discord.MessageEmbed();
		embed_join.setColor(embed_color_chat);
		embed_join.setTitle("Welcome");
		embed_join.setDescription("Thanks for adding JaredBot to your server, the default prefix for the bot is `-` (you can change this with `-prefix`), "+
		"you can type `-help` for a list of commands! Below are some recommendations on features to setup for your server.\n\u200B");
		embed_join.setThumbnail(lion_profile_pic);
		embed_join.setAuthor("JaredBot", lion_profile_pic);
		embed_join.addFields(
			{name: "AutoMod", value: "Setup JaredBot to automatically warn, mute, kick, and ban users who break the rules (anti-raid protection) type `-help automod` for more info.\n\u200B"},
			{name: "Content Filters", value: "Setup contenting filtering to automatically remove, bad language, phishing, porn links, promotions, and spam. type `-help filter` for more info.\n\u200B"},
			{name: "Welcomer", value: "set a welcome channel for your server, type `-help welcome` for more info.\n\u200B"},
			{name: "Autopost", value: "setup JaredBot to automatically posts images in a channel, type `-help autopost` for more info.\n\u200B"},
		)
		embed_join.setTimestamp();
		first_channel.send(embed_join).catch(err => {
			console_log("Failed to send message to new server! " + err, error=true);
		});
	} catch (err) {
		console_log("Error thrown when joining server, failed to display welcome screen! " + err, error=true);
	}
})

first_time_join = {};
bot.on("message", msg => {
	if (msg.guild != null) {
		if (first_time_join[msg.guild.id] == true) {
			first_time_join[msg.guild.id] = false;
			
			try {
				// authorise server
				authorise_server(msg, reply=false);
				console_log("Authorised server " +  guild.id, error=false, mod=true);
				
				// prefix
				create_file_then_append_data(msg, custom_prefix_filename, "-", endl="", overwrite=true);
	
				// generate msg count files
				update_leaderboad(msg);
				console_log("Generating leaderboard files!");
		
				// generate mute role
				console_log("Generating mute roles on server "+msg.guild.name+"!", error=false, mod=true);
				generate_mute_role(msg, msg.member, take_action=false, doReply=false).then(function() {
					console_log("Finished generating mute and invisible roles on "+msg.guild.name+"!", error=false, mod=true);
				}).catch(error => {
					console.log("Failed to generate mute and invisible roles on "+msg.guild.name+"!");
				})
			
				// update leaderboard
				update_leaderboad(msg);
				
			} catch (err) {
				console_log("Error was thrown when bot joined server! " + err, error=true);
			}
		}
	}
})

bot.on("error", error => {
	console_log("An error was thrown somewhere in the code! " + err, error=true);
})

