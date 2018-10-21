"""
  Author: Suhas Vittal
"""

import sys
import parse_json
import hdb_scan

json = sys.argv[1]
ydata = parse_json.get_embedding(json)
# get clusters, compute reliable candidates
clusters = hdb_scan.hdb_scan(ydata)
str_output = ",".join(clusters)
print(str_output)
sys.stdout.flush()
