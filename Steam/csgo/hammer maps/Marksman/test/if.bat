@echo off

set /a n=1

:main
set /a n+=1
if %n% lss 10 @goto end

pause
goto main

:end
echo hello
goto main