import socket

def check_email(email):
    char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" +\
    "abcdefghijklmnopqrstuvwxyz!#$%&'*+-/=?^_`{|}~."
    try:
        # Check Local in email
        local, domain = email.split("@")
        Dict = ["@"in email, len(email.split("@")) == 2,
                0 < len(local) <= 64 and 0 < len(domain) <= 254,
                [False not in [i in char for i in local]][0]]
        local = [True if False not in Dict else False][0]

        # Check server/Domain in email
        s = socket.socket()
        s.connect((domain, 80)), s.close()

    except:
        return False
        
    return local
