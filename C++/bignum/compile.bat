@echo off
D:
cd %cd%
for %%v in ("*.cpp") do C:\Users\Jared\WinWG\bin\g++.exe %%v -static-libgcc -static-libstdc++
pause