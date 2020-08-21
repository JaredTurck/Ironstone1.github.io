chkdsk /f /r /b /scan /perf C:
chkdsk /f /r /b /scan /perf D:
sfc /scannow C:
sfc /scannow D:
DISM /Online /Cleanup-Image /RestoreHealth
