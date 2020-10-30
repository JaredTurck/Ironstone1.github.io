@echo off

set /a map_index=5
set /a n=0

set map[0]=de_shorttrain.bsp
set map[1]=de_shortdust.bsp
set map[2]=de_bank.bsp
set map[3]=de_sugarcane.bsp
set map[4]=de_safehouse.bsp
set map[5]=de_stmarc.bsp
set map[6]=de_lake.bsp
set map[7]=ar_shoots.bsp
set map[8]=ar_monastery.bsp
set map[9]=ar_dizzy.bsp
set map[10]=ar_baggage.bsp

goto end
:main
call echo %%map[%map_index%]%%
set /a n+=1
pause
goto main

:end


for /f "tokens=* delims= " %%a in ('call echo %%map[%map_index%]%%') do (set current_BSP=%%a)

echo %current_BSP%

pause