if( GetDeveloperLevel() > 0 ) 
	printl( "Initializing vtut_2_button_toggle.nut" );

// The state of the button [0 = OFF // 1 = ON]
buttonState	<- 0;

function ButtonPressed()
{
	// Do stuff when the button is pressed!
	
	// Check the state of the button.
	if (buttonState == 0) {
	
		// The button is OFF, so let's turn it back ON!
		
		// Change the model of the player that uses the button!
		activator.SetModel("models/props_junk/watermelon01.mdl");

		// Send a command to the console.
		SendToConsole("sv_cheats 1; thirdperson");
		
		// Send a message to the chat.
		ScriptPrintMessageChatAll("You are a watermelon now!");
		
		// Change the variable to 1 (ON)
		buttonState = 1;
		
	} else if (buttonState == 1) {
		
		// The button is ON, time to turn it OFF!
		
		// Change the model of the player that uses the button!
		activator.SetModel("models/player/tm_leet_varianta.mdl");

		// Send a command to the console.
		SendToConsole("sv_cheats 1; firstperson");
		
		// Send a message to the chat.
		ScriptPrintMessageChatAll("You are a huuuuuman now!");
		
		// Change the variable to 0 (OFF)
		buttonState = 0;
	}
	
	// Send a message to the console. (useful for debugging!)
	printl("ButtonPressed() has been executed!")
}






