#SingleInstance force

CoordMode, ToolTip, Screen
if not A_IsAdmin
{
    Run *RunAs "%A_ScriptFullPath%"
    ExitApp
}
#NoEnv
Sendmode input
Suspend
f7::Suspend
*LButton::
 
loop
{
   if(GetKeyState(LButton,P))
      Sleep 1
      MouseClick, left
 
      Sleep 1
      MouseClick, left				 
      MouseMove, -1.2, 5, 0, R 									
      Sleep 1
      GetKeyState, state, LButton, P
      if state = U
            break
 
      Sleep 1
      MouseClick, left				
      MouseMove, 0, 7, 0, R 									
      Sleep 1
      GetKeyState, state, LButton, P
      if state = U
            break 
 
      Sleep 1
      MouseClick, left				
      MouseMove, -1, 8, 0, R 									
      Sleep 1
      GetKeyState, state, LButton, P
      if state = U
            break 
 
      Sleep 1
      MouseClick, left				
      MouseMove, -2, 6, 0, R 									
      Sleep 1
      GetKeyState, state, LButton, P
      if state = U
            break
 
      Sleep 1
      MouseClick, left				
      MouseMove, 6, 10, 0, R 									
      Sleep 1
      GetKeyState, state, LButton, P
      if state = U
            break
 
      Sleep 1
      MouseClick, left				
      MouseMove, 8, 10, 0, R 									
      Sleep 1
      GetKeyState, state, LButton, P
      if state = U
            break
 
      Sleep 80
      	       
}