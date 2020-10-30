function check_health() {
	local player = null;
	while(player = Entities.FindByClassname(player, "player")) {
		local health = player.GetHealth();
		if (health <= 9) {
			EntFire("trigger_equip_nothing", "Enable");
			SendToConsole(true);
		}
	}
}