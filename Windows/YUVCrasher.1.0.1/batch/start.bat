@echo off

REM Get Files
SET /p file1="Enter File path: "
SET file2="data.bin"
SET join="join.txt"
SET output="output.mp4"

REM Create joiner
ECHO file '%file1%'\nfile %file2%>%join%

REM Encode Video
ffmpeg.exe -y -f concat -safe 0 -i %join% -codec copy %output%

REM Delete joiner
rem del /f /q %join%