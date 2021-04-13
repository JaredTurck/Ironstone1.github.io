global _start

section .text
_start:
	mov ebx, 42
	mov eax, 1
	
	; jmp is for jump operation
	; skip is a label to jump to
	jmp skip
	
	; check if the jump is working by issuing a move instruction
	; the mov instruction won't be executed due to the jump
	mov ebx, 13

skip:
	; interupt to exit the program
	int 0x80