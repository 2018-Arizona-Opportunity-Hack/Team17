import numpy as np

import medusa
import time
import resource

np.random.seed(0)


def toy_cpe(row, col):
    n = row
    ndim = col
    s0 = np.arange(5)
    ns0 = len(s0)

    a = 0.8*np.random.rand(ns0+1, ns0+1)
    cov = np.dot(a, a.T)
    C = np.random.rand(n, ndim)
    dat = np.random.multivariate_normal(10*np.ones(ns0+1), cov, ndim).T
    # correlated profiles of the pivots
    C[s0] = dat[:len(s0)]
    idxr = np.delete(np.arange(n), s0)
    # here are candidates coming from a different data distribution than the pivots
    C[idxr] = np.random.randn(len(idxr), ndim) + 10
    # here is a candidate object coming from the same distribution as the pivots
    C[10] = dat[len(s0)]
    # two candidates with obscure profiles
    C[30] = 0
    C[30, 2] = 1.
    
    t = time.time()
    S, P, exectimes = medusa.medusa_cpe(C, s0, nk=1, alpha=0.7, q=0.25)
    u = time.time()
    
    print("\nTime Taken: " + str(u - t) + "s")
    
    return u - t


def toy_cpi(row, col):
    n = row
    ndim = col
    s0 = np.arange(10)

    C = np.random.rand(n, ndim)
    # simulate objects with strong associations that match the pivots
    C[50:60, s0] = 1
    # simulate (near) duplicates to study module diversity
    C[50] = np.copy(C[58])
    # simulate object with very strong associations matching the pivots
    C[20, s0] = 100
    # simulate object with very strong but unspecific (relative to the pivots) associations
    C[80] = 100

    t = time.time()
    S, P, exectimes = medusa.medusa_cpi(C, s0, nk=1)
    u = time.time()
     
    print("\nTime Taken: " + str(u - t) + "s")
    
    return u - t

ROW = {100, 150, 200, 250, 300}
COL = {40, 80, 120, 160, 200}

writer = open("/Users/SuhasVittal/Desktop/time_analysis_CPI.csv", "a")

writer.write("Number of Rows,Number of Columns,Time Taken(s)")

for r in ROW:
    for c in COL:
        print(r,c)
        for i in range(10):
            T = toy_cpi(r, c)
            writer.write("\n" + str(r) + "," + str(c) + "," + str(np.round(T, decimals=6)))
            print("\n" + str(r) + "," + str(c) + "," + str(np.round(T, decimals=6)))
        
writer.close();

