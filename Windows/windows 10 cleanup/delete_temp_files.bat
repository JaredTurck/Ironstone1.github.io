@echo off

del /f /q "%temp%"
del /f /q "%windir%\Temp"
del /f /q "%windir%\Prefetch"
del /f /q "%windir%\SoftwareDistribution\Download

del /f /q "%windir%\Downloaded Program Files"
del /f /q "%LocalAppData%\Microsoft\Windows\INetCache"
del /f /q "%LocalAppData%\Microsoft\Windows\Temporary Internet Files\Content.IE5"
del /f /q "%LocalAppData%\Microsoft\Windows\Temporary Internet Files"
del /f /q "%LocalAppData%\Temp"

pause >nul