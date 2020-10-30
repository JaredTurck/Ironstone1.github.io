/*
Copyright © Jared Turck
I grant the user a full license to store, copy, 
share, edit, and distribute this code as they like
as long as they do not claim it as there own and
make sure to reference my name.
*/


// --- Initialize ---
crosshair_hidden <- false;
crosshair_alpha <- 200;
crosshair_custom_colour_red <- 0;
crosshair_custom_colour_green <- 0;
crosshair_custom_colour_blue <- 0;
crosshair_gap_size <- 0;
crosshair_size <- 0;
crosshair_style <- 0;
crosshair_thickness <- 0;

// --- Crosshair functions ---

function hideCrosshair() {
	if (crosshair_hidden == false) {
		// Show the crosshair 
		SendToConsole("crosshair 1");
		printl("crosshair shown!");
		crosshair_hidden = true;
		
	} else if (crosshair_hidden == true) {
		// Hide the crosshair
		SendToConsole("crosshair 0");
		printl("crosshair hidden!")
		crosshair_hidden = false;
	}
}

function AddAlpha(Add) {
	// Changes how transparent the crosshair is
	switch(Add) {
		case true:
			crosshair_alpha += 10;
			if (crosshair_alpha > 255) {
				crosshair_alpha = 255;
			}
			SendToConsole("cl_crosshairalpha " + crosshair_alpha);
			printl("crosshairalpha changed to " + crosshair_alpha);
			return true;
			
		case false:
			crosshair_alpha -= 10;
			if (crosshair_alpha < 0) {
				crosshair_alpha = 0;
			}
			SendToConsole("cl_crosshairalpha " + crosshair_alpha);
			printl("crosshairalpha changed to " + crosshair_alpha);
			return true;
	}
}

/*
cl_crosshaircolor - changes the colour of the cross hair:
0 - red
1 - green
2 - yellow
3 - dark blue
4 - light blue
5 - custom RGB color
*/

function SetColour(color) {
	// Sets the colour of the crosshair
	switch(color) {
		case 0:
			SendToConsole("cl_crosshaircolor 0");
			printl("crosshair colour changed to Red!");
			//set RGB to red
			crosshair_custom_colour_red = 255;
			crosshair_custom_colour_green = 0;
			crosshair_custom_colour_blue = 0;
			
			return true;
			
		case 1:
			SendToConsole("cl_crosshaircolor 1");
			printl("crosshair colour changed to Green!");
			//set RGB to green
			crosshair_custom_colour_red = 0;
			crosshair_custom_colour_green = 128;
			crosshair_custom_colour_blue = 0;
			
			return true;
		
		case 2:
			SendToConsole("cl_crosshaircolor 2");
			printl("crosshair colour changed to Yellow!");
			//set RGB to yellow
			crosshair_custom_colour_red = 255;
			crosshair_custom_colour_green = 255;
			crosshair_custom_colour_blue = 0;
			
			return true;
		
		case 3:
			SendToConsole("cl_crosshaircolor 3");
			printl("crosshair colour changed to Dark Blue!");
			//set RGB to dark blue
			crosshair_custom_colour_red = 0;
			crosshair_custom_colour_green = 0;
			crosshair_custom_colour_blue = 255;
			
			return true;
		
		case 4:
			SendToConsole("cl_crosshaircolor 4");
			printl("crosshair colour changed to Light Blue!");
			//set RGB to light blue
			crosshair_custom_colour_red = 0;
			crosshair_custom_colour_green = 191;
			crosshair_custom_colour_blue = 255;
			
			return true;
	}
}

/*
	custom colors:
		- cl_crosshaircolor 5;
		- cl_crosshaircolor_r [0 to 255]
		- cl_crosshaircolor_g [0 to 255]
		- cl_crosshaircolor_b [0 to 255]
*/

function SetColourCustom_Red(Add) {
	// sets a custom RGB red colour for the crosshair
	SendToConsole("cl_crosshaircolor 5");
	
	switch(Add) {
		case true:
			crosshair_custom_colour_red += 10;
			if (crosshair_custom_colour_red > 255) {
				crosshair_custom_colour_red = 255;
			}
			SendToConsole("cl_crosshaircolor_r " + crosshair_custom_colour_red);
			SendToConsole("cl_crosshaircolor_g " + crosshair_custom_colour_green);
			SendToConsole("cl_crosshaircolor_b " + crosshair_custom_colour_blue);
			printl("crosshair colour [R]GB = " + crosshair_custom_colour_red);
			return true;
		
		case false:
			crosshair_custom_colour_red -= 10;
			if (crosshair_custom_colour_red < 0) {
				crosshair_custom_colour_red = 0;
			}
			SendToConsole("cl_crosshaircolor_r " + crosshair_custom_colour_red);
			SendToConsole("cl_crosshaircolor_g " + crosshair_custom_colour_green);
			SendToConsole("cl_crosshaircolor_b " + crosshair_custom_colour_blue);
			printl("crosshair colour [R]GB = " + crosshair_custom_colour_red);
			return true;
	}
}

function SetColourCustom_Green(Add) {
	// sets a custom RGB green colour for the crosshair
	SendToConsole("cl_crosshaircolor 5");
	
	switch(Add) {
		case true:
			crosshair_custom_colour_green += 10;
			if (crosshair_custom_colour_green > 255) {
				crosshair_custom_colour_green = 255;
			}
			SendToConsole("cl_crosshaircolor_r " + crosshair_custom_colour_red);
			SendToConsole("cl_crosshaircolor_g " + crosshair_custom_colour_green);
			SendToConsole("cl_crosshaircolor_b " + crosshair_custom_colour_blue);
			printl("crosshair colour R[G]B = " + crosshair_custom_colour_green);
			return true;
		
		case false:
			crosshair_custom_colour_green -= 10;
			if (crosshair_custom_colour_green < 0) {
				crosshair_custom_colour_green = 0;
			}
			SendToConsole("cl_crosshaircolor_r " + crosshair_custom_colour_red);
			SendToConsole("cl_crosshaircolor_g " + crosshair_custom_colour_green);
			SendToConsole("cl_crosshaircolor_b " + crosshair_custom_colour_blue);
			printl("crosshair colour R[G]B = " + crosshair_custom_colour_green);
			return true;
	}
}

function SetColourCustom_Blue(Add) {
	// sets a custom RGB blue colour for the crosshair
	SendToConsole("cl_crosshaircolor 5");
	
	switch(Add) {
		case true:
			crosshair_custom_colour_blue += 10;
			if (crosshair_custom_colour_blue > 255) {
				crosshair_custom_colour_blue = 255;
			}
			SendToConsole("cl_crosshaircolor_r " + crosshair_custom_colour_red);
			SendToConsole("cl_crosshaircolor_g " + crosshair_custom_colour_green);
			SendToConsole("cl_crosshaircolor_b " + crosshair_custom_colour_blue);
			printl("crosshair colour RG[B] = " + crosshair_custom_colour_blue);
			return true;
		
		case false:
			crosshair_custom_colour_blue -= 10;
			if (crosshair_custom_colour_blue < 0) {
				crosshair_custom_colour_blue = 0;
			}
			SendToConsole("cl_crosshaircolor_r " + crosshair_custom_colour_red);
			SendToConsole("cl_crosshaircolor_g " + crosshair_custom_colour_green);
			SendToConsole("cl_crosshaircolor_b " + crosshair_custom_colour_blue);
			printl("crosshair colour RG[B] = " + crosshair_custom_colour_blue);
			return true;
	}
}

function EnableDot(Dot) {
	// enables/disables the crosshair dot
	switch (Dot) {
		case true:
			SendToConsole("cl_crosshairdot 1");
			printl("Crosshair dot enabled");
			return true;
			
		case false:
			SendToConsole("cl_crosshairdot 0");
			printl("Crosshair dot disabled!");
			return true;
	}
}

// sets the crosshair gap
function SetGapSizeIncrease(yes) {
	// normal crosshair adjustments size
	switch (yes) {
		case true:
			crosshair_gap_size += 1;
			SendToConsole("cl_crosshairgap " + crosshair_gap_size);
			printl("crosshair gap size " + crosshair_gap_size);
			return true;
		
		case false:
			crosshair_gap_size -= 1;
			SendToConsole("cl_crosshairgap " + crosshair_gap_size);
			printl("crosshair gap size " + crosshair_gap_size);
			return true;
	}
}

function SetGapSizeIncrease_finer_adjustments(yes) {
	// finer crosshair adjustments size
	switch (yes) {
		case true:
			crosshair_gap_size += 0.1;
			SendToConsole("cl_crosshairgap " + crosshair_gap_size);
			printl("crosshair gap size " + crosshair_gap_size);
			return true;
		
		case false:
			crosshair_gap_size -= 0.1;
			SendToConsole("cl_crosshairgap " + crosshair_gap_size);
			printl("crosshair gap size " + crosshair_gap_size);
			return true;
	}
}

function SetGapSizeIncrease_larger_adjustments(yes) {
	// larger crosshair adjustments size
	switch (yes) {
		case true:
			crosshair_gap_size += 10;
			SendToConsole("cl_crosshairgap " + crosshair_gap_size);
			printl("crosshair gap size " + crosshair_gap_size);
			return true;
		
		case false:
			crosshair_gap_size -= 10;
			SendToConsole("cl_crosshairgap " + crosshair_gap_size);
			printl("crosshair gap size " + crosshair_gap_size);
			return true;
	}
}

//cl_crosshairsize [0, onwards]
function SetSizeIncrease(yes) {
	// changes the crosshair size
	switch (yes) {
		case true:
			crosshair_size += 1;
			SendToConsole("cl_crosshairsize " + crosshair_size);
			printl("crosshair size is " + crosshair_size);
			return true;
		
		case false:
			crosshair_size -= 1;
			if (crosshair_size < 0) {
				crosshair_size = 0;
			}
			SendToConsole("cl_crosshairsize " + crosshair_size);
			printl("crosshair size is " + crosshair_size);
			return true;
	}
}

//cl_crosshairstyle [0, to 6]
function SetStyle(style_number) {
	switch (style_number) {
		case 0:
			SendToConsole("cl_crosshairstyle 0");
			printl("crosshair style is 0");
			return true;
		
		case 1:
			SendToConsole("cl_crosshairstyle 1");
			printl("crosshair style is 1");
			return true;
			
		case 2:
			SendToConsole("cl_crosshairstyle 2");
			printl("crosshair style is 2");
			return true;
			
		case 3:
			SendToConsole("cl_crosshairstyle 3");
			printl("crosshair style is 3");
			return true;
		
		case 4:
			SendToConsole("cl_crosshairstyle 4");
			printl("crosshair style is 4");
			return true;
		
		case 5:
			SendToConsole("cl_crosshairstyle 5");
			printl("crosshair style is 5");
			return true;
		
		case 6:
			SendToConsole("cl_crosshairstyle 6");
			printl("crosshair style is 6");
			return true;
	}
}

//cl_crosshairusealpha [0, 1]
function EnableAlpha(yes) {
	switch (yes) {
		case true:
			SendToConsole("cl_crosshairusealpha 0");
			printl("alpha is being used");
			return true;
		
		case false:
			SendToConsole("cl_crosshairusealpha 1");
			printl("alpha is not being used");
			return true;
	}
}

//cl_crosshairthickness [0, to onwards]
function IncreaseThickness(yes) {
	switch (yes) {
		case true:
			crosshair_thickness += 1;
			SendToConsole("cl_crosshairthickness " + crosshair_thickness);
			printl("crosshair thickness is" + crosshair_thickness);
			return true;
		
		case false:
			crosshair_thickness -= 1;
			if (crosshair_thickness < 0) {
				crosshair_thickness = 0;
			}
			SendToConsole("cl_crosshairthickness " + crosshair_thickness);
			printl("crosshair thickness is" + crosshair_thickness);
			return true;
	}
}

//cl_crosshair_drawoutline [0, 1]
function DrawOutline(yes) {
	switch (yes) {
		case true:
			SendToConsole("cl_crosshair_drawoutline 1");
			printl("outline enabled");
			return true;
			
		case false:
			SendToConsole("cl_crosshair_drawoutline 0");
			printl("outline disabled");
			return true;
	}
}

function DefaultCrosshair() {
	// default CSGO crosshair reset
	SendToConsole("cl_crosshair_dynamic_maxdist_splitratio 0.35");
	SendToConsole("cl_crosshair_dynamic_splitalpha_innermod 1");
	SendToConsole("cl_crosshair_dynamic_splitalpha_outermod 0.5");
	SendToConsole("cl_crosshair_dynamic_splitdist 7");
	SendToConsole("cl_crosshair_outlinethickness 1");
	SendToConsole("cl_crosshairalpha 200");
	SendToConsole("cl_crosshaircolor 1");
	SendToConsole("cl_crosshaircolor_b 255");
	SendToConsole("cl_crosshaircolor_g 255");
	SendToConsole("cl_crosshaircolor_r 50");
	SendToConsole("cl_crosshairdot 0");
	SendToConsole("cl_crosshairgap 1");
	SendToConsole("cl_crosshairgap_useweaponvalue 0");
	SendToConsole("cl_crosshairscale 0");
	SendToConsole("cl_crosshairsize 7");
	SendToConsole("cl_crosshairstyle 2");
	SendToConsole("cl_crosshairthickness 1");
	SendToConsole("cl_crosshairusealpha 1");
	SendToConsole("cl_fixedcrosshairgap 3");
	SendToConsole("cl_crosshair_drawoutline 1");
	
	crosshair_hidden <- false;
	crosshair_alpha <- 200;
	crosshair_custom_colour_red <- 0;
	crosshair_custom_colour_green <- 0;
	crosshair_custom_colour_blue <- 0;
	crosshair_gap_size <- 0;
	crosshair_size <- 0;
	crosshair_style <- 0;
	crosshair_thickness <- 0;
	
}


// -- Other Functions ---

function rgb2hex(red, green, blue) {
	function dec2hex(num) {
		hex_digits = "0123456789ABCDEF";
		x = (num % 16);
		r = num / 16;
		
		if (r == 0) {
			return hex_digits[x];
		}	
		return dec2hex(r) + hex_digits[x];
	}
	return tostring(dec2hex(red)) + tostring(dec2hex(green)) + tostring(dec2hex(blue));
}

function give_the_knife() {
	local entity = null;
	while(entity = Entities.FindByClassname(entity, "weapon_knife")) {
		entity.__KeyValueFromString("classname", "weapon_knifegg");
	}
}