
from medusa import dfmf
from sklearn.manifold import TSNE
import numpy as np

def compute_rank_and_size(T):
    """
        Takes a dictionary of constraint matrices, as specified in "interpret".
        Computes matrix rank for all constraint matrices and the number of objects
        in each matrix.

        Returns tuple: (counts, ranks)
    """

    keys = T.keys()

    counts = [0 for _ in keys]
    ranks = [0 for _ in keys]

    keys = T.keys()
    for key in keys:
        i, _ = key # constraints only have keys of the form (n, n).

        rnk = np.linalg.matrix_rank(T[key])
        count = T[key][0].shape[0]
        counts[i] = count
        ranks[i] = rnk

    return counts, ranks

def compute_distance_matrix(R, T, loop=[1, 2, 3]):
    """
        R is a dictionary of relational matrices, such that R[(m, n)] corresponds to the
        relational matrix between node m and n.
        T is a dictionary of an array of constraint matrices, such that T[(n, n)]
        corresponds to the array of constraint matrices for node n.

        We first run the DFMF algorithm (in Zitnik and Zupan's paper Data Fusion by Matrix
        Factorization available on Arxiv) which returns a set of factored matrices. We
        then compute a distance matrix by using a loop on the factored matrices, effectively
        collecting the data in the graph database and finding a euclidean distance matrix, which
        is the output.

        The output can be used in any way, but we choose to use the output for clustering.
    """

    ns, cs = compute_rank_and_size(T)
    G, S = dfmf.dfmf(R, T, ns, cs)

    # compute a loop
    for k in range(1, len(path) + 1):
        I = path[k-1]
        J = path[k % len(path)]

        G_I = G[(I, I)]
        S_IJ = S[(I, J)]
        G_Jt = G[(J, J)].T

        C = G_I * S_IJ * G_Jt

    for i in range(C.shape[0]): # make it a
        d = C[i, i]
        C[i] = C[i] - diag/2.0
        C[:, i] = C[:, i] - diag/2.0

    return C

def cluster_tsne(D, dim=2, THRESHOLD=10000):
    """
        TSNE clusters the data using a matrix D.
        Returns the cluster's coordinate pairs in the low dimensional embedding.
    """
    cost_func = "barnes_hut" if D.shape[0] > THRESHOLD else "exact"
    tsne = TSNE(n_components=dim, method=cost_func)
    embedding = tsne.fit_transform(D) # gets the embedding
    return embedding
