function main() {
	local player = null;
	while(player = Entities.FindByClassname(player, "player")) {
		player.SetTeam(3);
	}
}