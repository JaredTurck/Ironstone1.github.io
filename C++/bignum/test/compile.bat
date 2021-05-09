@echo off
D:
cd %cd%
C:\Users\Jared\WinWG\bin\g++.exe *.cpp -static-libgcc -static-libstdc++ -o output
pause