@echo off
D:
cd %cd%
for %%v in ("*.asm") do "C:\Program Files\NASM\NASM.exe" -f win32 %%v -o object.o
for %%v in ("*.o") do "C:\Users\Jared\WinWG\bin\ld.exe" -m i386pe %%v -o a.exe
pause