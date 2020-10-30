//give weapon_knife_butterfly;
//ent_fire weapon_knife addoutput "classname weapon_knifegg"

//give weapon_bayonet;ent_fire weapon_knife addoutput "classname weapon_knifegg"
//give weapon_knife_butterfly;ent_fire weapon_knife addoutput "classname weapon_knifegg"

//give weapon_knife_butterfly;
//ent_fire weapon_knife addoutput "classname weapon_knifegg"



//function a() {
//	printl("If you can see this in the console the function has executed!");
//	
//	//EntFire(target, action, value, delay, activator, caller)
//	//EntFire("!self", "addoutput", "classname weapon_knifegg", 0, "weapon_knife", "weapon_knife")
//	EntFire("!self", "addoutput", "classname weapon_knifegg", 0, self, self)
//}

function a() {
	local entity = null;
	while(entity = Entities.FindByClassname(entity, "weapon_knife")) {
		entity.__KeyValueFromString("classname", "weapon_knifegg");
	}
}