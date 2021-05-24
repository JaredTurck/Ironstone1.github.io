import math, win32api

"""
W = increase cube in size
S = decrease cube in size
A = move cube right
D = move cube left

move mouse left
- right side of cube is skewed

move mouse right
- left side of cube is skewed

move mouse up
- bottom part of cube is skewed

move mouse down
- top part of cube is skewed

refrence point for the cube is center of the screen
- cube is vector of numbers
- cube is drawn from center of screen as refrence point

"""

# any 2D shape can be created by drawing triangles

"""
normlaise the screen, center of the screen is 0,0

      w-1
   ________
   |      |
h-1|   0  |h+1
   |______|
      w+1

projection - object getting larger or smaller
as you walk towards or away from it

field of view = feta

[(h/w)Fx, Fy, z]
      |
      \/
      1/tan(feta / 2)

projection formula:
[((w/h)*(1/tan(feta/2))*x)/z,
 ((1/tan(feta/2))*y)/\,
  z*(Zfar/(Zfar-Znear)) - ((zfar*znear)/(zfar-znear))]

simpilar formula:
a = aspect ratio
f = field of fiew
q = z normalization

[(a*f*x)/z, (f*y)/z, (z*q) - (Znear*q)]

"""

# multiply matrix
def multiply_matrix_vector(i, m):
    x = i.x * m[0][0] + i.y * m[1][0] + i.z * m[2][0] + m[3][0]
    y = i.x * m[0][1] + i.y * m[1][1] + i.z * m[2][1] + m[3][1]
    z = i.x * m[0][2] + i.y * m[1][2] + i.z * m[2][2] + m[3][2]
    w = i.x * m[0][3] + i.y * m[1][3] + i.z * m[2][3] + m[3][3]

    if w != 0:
        x /= w
        y /= w
        z /= w

    return [x, y, z, w]

matProj = []

# projection matrix
Fnear = 0.1
Ffar = 1000
Ffov = 90
FaspectRatio = win32api.GetSystemMetrics(1) / win32api.GetSystemMetrics(0) # aspect ratio H/W
FfovRad = 1 / math.tan(Ffov * 0.5 / 180 * math.pi) # tangent calculation

matProj[0][0] = FaspectRatio * FfovRad
matProj[1][1] = FfovRad
matProj[2][2] = Ffar / (Ffar - Fnear)
matProj[3][2] = (-Ffar * Fnear) / (Ffar - Fnear)
matProj[2][3] = 1
matProj[3][3] = 0
