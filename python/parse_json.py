"""
    author: Suhas Vittal
"""

import numpy as np
import json
import requests
import matplotlib.pyplot as plt
import sklearn
import hdb_scan

from interpret_data import compute_distance_matrix, cluster_tsne

#loaded_json = json.loads(requests.get("API").json())

"""
    The json schema should generally be:
    {
        "volunteers" : [...],
        "events" : [...]
    }
"""


def generate_constraints(json):
    # collect volunteer constraints and relations
    constraints = ["endorsements"]
    relations = ["zipcode", "events"]
    enumeration = {"endorsements":0, "zipcode":1, "events":2}

    cnst_N = [0 for _ in constraints]
    rel_N = [0 for _ in relations]

    T = {"shape":(3, 3)}
    T[(0, 0)] = []
    for t in constraints:
        tmp_dict = {}
        uuids = []
        N = 0
        for p in json["volunteers"]:
            uuid = p["UUID"]
            tmp_dict[uuid] = p[t]
            uuids.append(uuid)
            N += 1

        mat = np.zeros(N, N)
        for i in range(N):
            for j in range(N):
                if uuids[j] == tmp_dict[uuids[i]][0]:
                    tmp_dict.pop(0)
                    mat[i, j] = 1
        T[(0, 0)].append(mat)

    return T

def generate_relations(json):
    R = {"shape": (3, 3)}
    from_nodes = ["volunteers", "events"]
    to_nodes = ["zipcode", "events"]

    for a in range(len(from_nodes)):
        s = from_nodes[a]
        for b in range(len(to_nodes)):
            r = to_nodes[b]
            if r == s:
                continue

            tmp_dict = {}
            names = []
            properties = set() # do not want duplicates
            N = 0
            for p in json[s]:
                if s == "volunteers":
                    name = p["UUID"] # uuid of volunteer
                else:
                    name = p["name"]

                property = p[r] # relationship property of volunteer (i.e. their zipcode)
                # check if property is a list
                if type(property) is list:
                    tmp = property # convert to list to make analysis easier
                    for x in property:
                        zipcodes.add(x)
                else:
                    tmp = [property]
                    zipcodes.add(property)

                tmp_dict[name] = tmp
                names.append(name)
                N += 1

            # now create matrix
            properties = list(properties)
            M = len(properties)
            mat = np.zeros(N, M)
            for i in range(N):
                for j in range(M):
                    x = tmp_dict[names[i]]
                    if properties[j] in x:
                        mat[i, j] = 1
            R[(enumeration[s], enumeration[r])] = mat
            R[(enumeration[r], enumeration[s])] = mat.T

def send_embedding():
    T = generate_constraints(json)
    R = generate_constraints(json)

    C = compute_distance_matrix(R, T)
    y1, y2 = cluster_tsne(C)

def synth_dfmf_test(N, upper_size=1000, lower_size=50):
    sizes = np.random.randint(lower_size, high=upper_size, size=N)

    T = {"shape": (N, N)}
    R = {"shape": (N, N)}
    for i in range(N):
        for j in range(N):
            if i == j:
                T[(i, i)] = [np.random.rand(sizes[i], sizes[i])-1.0]
            else:
                R_ij = np.round(np.random.rand(sizes[i], sizes[j]))
                R[(i, j)] = R_ij
                R[(j, i)] = R_ij.T

    C = compute_distance_matrix(R, T)
    print("FINISHED COMPUTING C")
    ydata = cluster_tsne(C, dim=2)
    print("FINISHED TSNE")
    plt.plot(ydata[:,0],ydata[:,1], "ro")
    plt.title("FIGURE 2")
    plt.show()
    print("CLUSTERING")
    data = hdb_scan.hdb_scan(ydata)
    plt.plot(data, "ro")
    plt.title("HDB SCAN")
    plt.show()

if __name__ == "__main__":
    synth_dfmf_test(5)
