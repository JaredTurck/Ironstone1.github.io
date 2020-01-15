def convert(From, To, n):
    Data = {"kilometres" : 100000,
            "metres" : 100,
            "milimetres" : 0.1,
            "micrometres" : 0.0001,
            "nanometres" : 0.0000001,
            "miles" : 160934,
            "yards" : 91.44,
            "foot" : 30.48,
            "inchs" : 2.54,
            "centimetres" : 1,
            "nautical mile" : 185200}

    return (n * Data[From]) / Data[To]
