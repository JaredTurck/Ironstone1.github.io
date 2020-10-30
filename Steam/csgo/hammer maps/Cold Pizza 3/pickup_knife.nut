function get_knife() {
	while(entity = Entities.FindByClassname(entity, "weapon_knife")) {
		entity.__KeyValueFromString("classname", "weapon_knifegg");
	}
}