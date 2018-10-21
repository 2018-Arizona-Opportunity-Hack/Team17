import numpy as np
import json
import requests

loaded_json = json.loads(requests.get("API").json())


def constraint(constraint_key):
    """First, the constraint function will create a dictionary,
    and place the ID (volunteer)'s endorsement in a dictionary, while also counting
    the number of volunteers."""
    N = 0
    adict = constraint_dict(constraint_key)
    for x in loaded_json:
        N += 1
    """Now, make a Numpy 2D array that places the value 0 if there are no endorsements,
     and 1 if there are."""
    T = np.zeros(N, N)
    for i in range(N):
        for j in range(N):
            if j in adict[i]:
                T[i,j] = 1
    return T

def rel_vol_x(relationship_key):
    key_types = []
    N = 0
    adict = constraint_dict(relationship_key)
    for x in loaded_json:
        adict[x['id']] = val
        N+= 1
        if val not in key_types:
            key_types.append(val)
    R = np.zeros(N, len(key_types))
    for i in range(N):
        j = key_types.index(adict[i])
        R[i, j] = 1
    return R

def constraint_dict(constraint_key):
    adict = {}
    for x in loaded_json:
        adict[x['id']] = x[constraint_key]
    return adict

def rel_vol_x_dict(relationship_key):
    adict = {}
    key_types = []
    for x in loaded_json:
        val = x[relationship_key]
        adict[x['id']] = val
    return adict

if __name__ == "__main__":
    return Merge(constraint_dict(constraint_key), rel_vol_x_dict(relationship_key))
