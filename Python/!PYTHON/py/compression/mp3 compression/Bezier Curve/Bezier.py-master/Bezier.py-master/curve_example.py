from Bezier import Bezier
import matplotlib.pyplot as plot
import numpy as np


t_points = np.arange(0, 1, 0.01)
points = np.array([[0,0], [2.5,5], [5,0]])
curve = Bezier.Curve(t_points, points)

# plot
plot.figure()
plot.plot(
    curve[:,0], # x
    curve[:,1], # y
)

plot.grid()
plot.show()
