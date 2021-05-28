
class engine():
    def __init__(self):
        self.matProj_m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        self.matRotZ_m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        self.matRotX_m = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

    def multiply_matrix(self):
        pass
    
    def OnUserCreate(self):
        # mesh cube tris
        self.tris = [
            # South
            [0, 0, 0,   0, 1, 0,    1, 1, 0],
            [0, 0, 0,   1, 1, 0,    1, 0, 0],

            # East
            [1, 0, 0,   1, 1, 0,    1, 1, 1],
            [1, 0, 0,   1, 1, 1,    1, 0, 1],

            # North
            [1, 0, 1,   1, 1, 1,    0, 1, 1],
            [1, 0, 1,   0, 1, 1,    0, 0, 1],

            # West
            [0, 0, 1,   0, 1, 1,    0, 1, 0],
            [0, 0, 1,   0, 1, 0,    0, 0, 0],

            # Top
            [0, 1, 0,   0, 1, 1,    1, 1, 1],
            [0, 1, 0,   1, 1, 1,    1, 1, 0],

            # Bottom
            [1, 0, 1,   0, 0, 1,    0, 0, 0],
            [1, 0, 1,   0, 0, 0,    1, 0, 0],
        ]

        # projection matrix
        self.fNear = 0.1
        self.fFar = 1000
        self.fFov = 90
        # aspect ratio H/W
        self.fAspectRatio = win32api.GetSystemMetrics(1) / win32api.GetSystemMetrics(0)
        self.fFovRad = 1 / math.tan(self.fFpv * 0.5 / 180 * math.pi)
        
        self.matProj_m[0][0] = self.fAspectRatio * self.fFovRad
        self.matProj_m[1][1] = self.fFovRad
        self.matProj_m[2][2] = self.fFar / (self.fFar - self.fNear)
        self.matProj_m[3][2] = (-self.fFar * self.fNear) / (self.fFar - self.fNear)
        self.matProj_m[2][3] = 1
        self.matProj_m[3][3] = 0

    def onUserUpdate(self, fElapsedTime):
        # Clear screen

        # Setup rotation matrices
        self.fTheta += 1 * fElapsedTime

        # Rotation Z
        self.matRotZ_m[0][0] = math.cos(self.fTheta)
        self.matRotZ_m[0][1] = math.sin(self.fTheta)
        self.matRotZ_m[1][0] = -math.sin(self.fTheta)
        self.matRotZ_m[1][1] = math.cos(self.fTheta)
        self.matRotZ_m[2][2] = 1
        self.matRotZ_m[3][3] = 1

        # Rotation X
        self.matRotX_m[0][0] = 1
        self.matRotX_m[1][1] = math.cos(self.fTheta)
        self.matRotX_m[1][2] = math.sin(self.fTheta)
        self.matRotX_m[2][1] = -math.sin(self.fTheta)
        self.matRotX_m[2][2] = math.cos(self.fTheta)
        self.matRotX_m[3][3] = 1

        # Draw Triangles
        
