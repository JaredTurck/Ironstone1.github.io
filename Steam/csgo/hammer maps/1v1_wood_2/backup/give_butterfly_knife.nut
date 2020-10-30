
function init() {
	printl("Script Start!");
	weapon <- "weapon_awp";
}

function give_the_knife() {
	local entity = null;
	while(entity = Entities.FindByClassname(entity, "weapon_knife")) {
		entity.__KeyValueFromString("classname", "weapon_knifegg");
	}
}

function set_weapon(wep) {
	switch(wep) {
		case 0:
			// AK47
			weapon <- "weapon_ak47";
			printl("weapon set to AK47");
			return true;
		
		case 1:
			// AWP
			weapon <- "weapon_awp";
			printl("weapon set to AWP");
			return true;
		
		case 2:
			// M4
			weapon <- "weapon_m4a1";
			printl("weapon set to M4");
			return true;
		
		case 3:
			// AUG
			weapon <- "weapon_aug";
			printl("weapon set to AUG");
			return true;
		
		case 4:
			// SSG 08
			weapon <- "weapon_ssg08";
			printl("weapon set to SSG 08");
			return true;
		
		case 5:
			// USP-S
			weapon <- "weapon_usp_silencer";
			printl("weapon set to USP-S");
			return true;
		
		case 6:
			// Glock 18
			weapon <- "weapon_glock";
			printl("weapon set to Glock 18");
			return true;
		
		case 7:
			// Desert Eagle
			weapon <- "weapon_deagle";
			printl("weapon set to Desert Eagle");
			return true;
	}
}

function give_the_weapon() {
	SendToConsole("give " + weapon);
}