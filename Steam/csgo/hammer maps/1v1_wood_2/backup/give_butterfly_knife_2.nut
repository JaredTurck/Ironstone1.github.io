function give_the_knife() {
	local entity = null;
	while(entity = Entities.FindByClassname(entity, "weapon_knife")) {
		entity.__KeyValueFromString("classname", "weapon_knifegg");
	}
}