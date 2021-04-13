;entry point into the program
; this is where the processor will start executing instructions from
; global keywords is used to make an identifier accessible to the linker
global _start
; the identifier is start, start followed by a colon will create a label
; labels are used to name locations in code
_start:
	; mov is used to move data into a register
	; here the move instruction moves the integer 1 into the register eax
	mov eax, 1
	
	; moves integer into ebx register
	mov ebx, 42
	
	; preform interrupt, processor transfers control to interrupt handler
	; that we have specified by the value. in this case 0x80 is the interrupt
	; handler for system calls. the system call that it makes is determened by the eax
	; register. the value 1 means that we're making an exit call, system exit call
	; this will signal the end of our program
	int 0x80
	
	; the value stored in ebx is the exit status for our program
	; used 42 for exmaple but this could be any integer
	
	; sub preforms a subtraction, subtracts 29 from 42 stored in ebx
	; 42-29=13 the answer of 13 is stored in ebx
	; the exit status is now 13
	sub ebx, 29

; to compile on Linux:
; nasm -f elf32 filename.asm -o objectname.o
; -f elf32 means build 32 bit elf object file
; elf stands for executable and linking format
; executable format used by linux

; to compile on windows
; nasm -f win32 filename.asm -o objectname.o
; win32 in executable format for windows

; instructions
; mov - preforms a move, moving data into register
; sub - preforms a subtraction
; int - preforms an interupt

; operation on the left mov, sub, int
; operand on the right seperated by comma e.g. a value like 29
; sub ebx, 29
;     |     |
; operation operand

mov ebx, 123 ; assign value of 123 to register ebx
mov eax, ebx ; takes the value from ebx and put it in eax register
add ebx, ecx ; adds ecx to ebx then assigns answer to ebx register
sub ebx, edx ; subtract value of edx from ebx and assin answer to ebx

; multiplication is always applied to the eax register
mul ebx ; multiplies ebx into eax

div edx ; divide eax by edx, value stored in eax