Sleep, 5000

While (true) {
	Loop, 6 {
		Send, {- Down}
		Sleep, 500
		Send, {- Up}
		Sleep, 1000
	}
	
	Send, {/ Down}
	Sleep, 500
	Send, {/ Up}
	
}