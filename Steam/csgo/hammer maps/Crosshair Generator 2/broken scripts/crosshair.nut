
/*function crosshair_generator = {
	crosshair_hidden = false;

	function hideCrosshair() {
		if (crosshair_hidden == true) {
			// Hide the crosshair 
			SendToConsole("crosshair 0");
			printl("crosshair hidden!");
			crosshair_hidden = false;
		
		} else if (crosshair_hidden == false) {
			// Show the crosshair
			SendToConsole("crosshair 1");
			printl("crosshair shown!")
			crosshair_hidden = true;
		
		}
	}

	function alpha(Add) {
		// cl_crosshairalpha
	}
}*/

/*function crosshair_generator(operation) {
	//init
	crosshair_hidden = false;
	
	switch(operation) {
		// Hide/Show the crosshair
		case 0:
			if (crosshair_hidden == true) {
				// Hide the crosshair 
				SendToConsole("crosshair 0");
				printl("crosshair hidden!");
				crosshair_hidden = false;
		
			} else if (crosshair_hidden == false) {
				// Show the crosshair
				SendToConsole("crosshair 1");
				printl("crosshair shown!")
				crosshair_hidden = true;
			}
	}
}*/

/*var a = 0;*/

function a() {
	local entity = null;
	while(entity = Entities.FindByClassname(entity, "weapon_knife")) {
		entity.__KeyValueFromString("classname", "weapon_knifegg");
	}
}