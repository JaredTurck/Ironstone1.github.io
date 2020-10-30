
//Kill 250 enemies with headshots
//Kill 100 enemies with enemy weapons
//Hip Shot	Kill an enemy with an un-zoomed sniper rifle
//The Unstoppable Force	Kill four enemies within a single round
//Head Shred Redemption	Kill five enemy players with headshots in a single round

// main executes as soon as deathmatch round starts, and again once the bot dies
// - counter increase after every bot kill

counter <- 0;

function eqp_wep(Wname) {
	SendToConsole("give " + Wname);
}

function main() {
	//Kill 10 enemies with the Zeus x27
	if (counter == 10) {
		eqp_wep("weapon_taser");
	}
	//Kill 25 enemies with the Dual Berettas
	if (counter == 35) {
		eqp_wep("weapon_elite")
	}
	//Kill 25 enemies with the Five-SeveN
	if (counter == 60) {
		eqp_wep("weapon_fiveseven");
	}
	//Kill 25 enemies with the P250
	if (counter == 85) {
		eqp_wep("weapon_p250");
	}
	//Kill 50 enemies with the MAG-7
	if (counter == 135) {
		eqp_wep("weapon_mag7");
	}
	//Kill 50 enemies with the Sawed-Off
	if (counter == 185) {
		eqp_wep("weapon_sawedoff");
	}
	//Kill 100 enemies with the FAMAS
	if (counter == 285) {
		eqp_wep("weapon_famas");
	}
	//Kill 100 enemies with the G3SG1
	if (counter == 385) {
		eqp_wep("weapon_gs3sg1");
	}
	//Kill 100 enemies with the Glock-18
	if (counter == 485) {
		eqp_wep("weapon_glock");
	}
	//Kill 100 enemies with the P2000 or USP
	if (counter == 585) {
		eqp_wep("weapon_hkp2000;give weapon_usp_silencer");
	}
	//Kill 100 enemies with the Tec-9
	if (counter == 685) {
		eqp_wep("weapon_tec9");
	}
	//Kill 100 enemies with the MAC-10
	if (counter == 785) {
		eqp_wep("weapon_mac10");
	}
	//Kill 100 enemies with the M249
	if (counter == 885) {
		eqp_wep("weapon_m249");
	}
	//Kill 100 enemies with the SCAR-20
	if (counter == 985) {
		eqp_wep("weapon_scar20");
	}
	//Kill 100 enemies with the SG553
	if (counter == 1085) {
		eqp_wep("weapon_sg556");
	}
	//Kill 100 enemies with the SSG 08
	if (counter == 1185) {
		eqp_wep("weapon_ssg08");
	}
	//Kill 100 enemies with the MP9
	if (counter == 1285) {
		eqp_wep("weapon_mp9");
	}
	//Kill 100 enemies with the Nova
	if (counter == 1385) {
		eqp_wep("weapon_nova");
	}
	//Kill 100 enemies with the Negev
	if (counter == 1485) {
		eqp_wep("weapon_negev");
	}
	//Kill 200 enemies with the Desert Eagle
	if (counter == 1685) {
		eqp_wep("weapon_deagle");
	}
	//Kill 200 enemies with the XM1014
	if (counter == 1885) {
		eqp_wep("weapon_xm1014");
	}
	//Kill 250 enemies with the AUG
	if (counter == 2135) {
		eqp_wep("weapon_aug");
	}
	//Kill 250 enemies with the UMP-45
	if (counter == 2385) {
		eqp_wep("weapon_ump45");
	}
	//Kill 250 enemies with the PP-Bizon
	if (counter == 2635) {
		eqp_wep("weapon_bizon");
	}
	//Kill 250 enemies with the MP7
	if (counter == 2885) {
		eqp_wep("weapon_mp7");
	}
	//Kill 250 enemies with the Galil AR
	if (counter == 3135) {
		eqp_wep("weapon_galilar");
	}
	//Kill 500 enemies with the AWP
	if (counter == 3635) {
		eqp_wep("weapon_awp");
	}
	//Kill 500 enemies with the P90
	if (counter == 4135) {
		eqp_wep("weapon_p90");
	}
	//Kill 1,000 enemies with the AK-47
	if (counter == 5135) {
		eqp_wep("weapon_ak47");
	}
	//Kill 1,000 enemies with an M4 Assault Rifle
	if (counter == 6135) {
		eqp_wep("weapon_m4a1");
	}
	
	// increase counter
	counter += 1;
	SendToConsole("echo Counter = " + counter.tostring());
	
}