from sklearn.metrics.pairwise import pairwise_distances
import numpy as np
import hdbscan


def hdb_scan(D):
    matrix = np.zeros((D.shape[0], D.shape[0]))
    for i in range(D.shape[0]):
        for j in range(D.shape[0]):
            dist =  np.linalg.norm(D[i] - D[j])
            matrix[i, j] = dist
            matrix[j, i] = dist
    print(matrix.shape)
    clusterer = hdbscan.HDBSCAN(metric='precomputed')
    clusterer.fit(matrix)
    return clusterer.labels_
