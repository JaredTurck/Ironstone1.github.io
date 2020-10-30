if( GetDeveloperLevel() > 0 ) 
	printl( "Initializing vtut_1_intro.nut" );

function ButtonPressed()
{
	// Do stuff when the button is pressed!
	
	// Send a message to the chat.
	ScriptPrintMessageChatAll("You are a watermelon now!");

	// Change the model of the player that uses the button!
	activator.SetModel("models/props_junk/watermelon01.mdl");

	// Send a command to the console.
	SendToConsole("sv_cheats 1");
	SendToConsole("thirdperson");

	// Send a message to the console. (useful for debugging!)
	printl("ButtonPressed() has been executed!")
}