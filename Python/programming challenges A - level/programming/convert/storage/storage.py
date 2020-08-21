def convert(From, To, n):
    Data = {"bits" : 1,
            "bytes" : 8,
            "kilobytes" : 8192,
            "megabytes" : 8388608,
            "gigabytes" : 8589934592,
            "terabytes" : 8796093022208}

    return (n * Data[From]) / Data[To]
