@echo off
D:
cd %cd%
for %%v in ("*.c") do C:\Users\Jared\WinWG\bin\g++.exe %%v -static-libgcc -static-libstdc++
pause