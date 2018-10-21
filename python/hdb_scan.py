from sklearn.metrics.pairwise import pairwise_distances
import numpy as np
import hdbscan

def hdb_scan(y):
    clusterer = hdbscan.HDBSCAN(min_samples=30)
    clusterer.fit(y)
    return clusterer.labels_
