$-::
	While (GetKeyState("-","P") = true) {
		Sleep, 100
		Send, {i Down}
		Sleep, 100
		Send, {i Up}
		
		Sleep, 100
		Click Down
		Sleep, 100
		Click Up
	}
return