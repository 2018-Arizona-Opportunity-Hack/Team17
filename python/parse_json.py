import numpy as np
import json
import requests

loaded_json = json.loads(requests.get("API").json())


def constraint(constraint_key):
    """First, the constraint function will create a dictionary,
    and place the ID (volunteer)'s endorsement in a dictionary, while also counting
    the number of volunteers."""
    adict = {}
    N = 0
    for x in loaded_json:
        adict[x['id']] = x[constraint_key]
        N += 1
    """Now, make a Numpy 2D array that places the value 0 if there are no endorsements,
     and 1 if there are."""
    T = np.zeros(N, N)
    for i in range(N):
        for j in range(N):
            if j in adict[i]:
                T[i,j] = 1
    return T

def relationship(relationship_key):
    adict = {}
    key_types = []
    N = 0
    for x in loaded_json:
        val = x[relationship_key]
        adict[x['id']] = val
        N+= 1
        if val not in key_types:
            key_types.append(val)
    R = np.zeros(N, len(key_types))
    for i in range(N):
        j = key_types.index(adict[i])
        R[i, j] = 1
    return R
