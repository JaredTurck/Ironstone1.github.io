def convert(From, To, n):
    sec = {"milliseconds" : .001,
           "seconds" : 1,
           "minutes" : 60,
           "hours" : 3600,
           "days" : 86400,
           "weeks" : 604800}

    return (n * sec[From]) / sec[To]
