; program to print hello world

; make start entry point an identifier accessible to the linker
global _start

; lets us inline data into the program, that we can reference
; in the code ny name
section .data
	; creates string of bytes called msg
	; which contains Hello World 0xoa, 0x0a is new line character
	; 0a is hex for 10, 10 is ASCII value for new line \n
	msg db "Hello, world", 0x0a
	
	; determine length of string by subtracting the location
	; of the start of the string, from the location after the string (end)
	len equ $ - msg

; define label .txt
section .text
; _start shows entry point of the program
_start:
	; system call that writes string to standard output
	; setting eax to 4 to denote that it's a system write call
	mov eax, 4 ; setting eax to 4 means write call
	
	; set ebx to 1 becuase that's the file descriptor for standard out
	mov ebx, 1 ; making write call on standard out, 1 means standard out
	
	; ecx holds the string pointer "Hello World"
	mov ecx, msg ; the bytes to write to standard stream
	
	; edx holds the length of the string
	mov edx, len ; number of bytes to write
	
	; interupt for system call
	int 0x80 ; preform system call
	
	; exit program
	mov eax, 1 ; system call to exit the program, end of program reached
	mov ebx, 0 ; exit status 0, 0 means program ran successfully no errors
	int 0x80 ; preform system call