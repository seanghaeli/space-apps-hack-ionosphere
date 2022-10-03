# -*- coding: utf-8 -*-
"""space-apps-iss-data-extraction.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1cJJ4SsObt_CS7w7mAWNMBxnue8jM-rmN
"""

import os
os.environ["CDF_LIB"] = "C:\Program Files\CDF_Distribution"

from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir('./iss_data') if isfile(join('./iss_data', f))]
print(onlyfiles)

from spacepy import pycdf

altitude = []
latitude = []
longitude = []
time = []
electronDensity = []

trackerIndex = 1

for filename in onlyfiles:
    litStr = "C:/Users/mrgha/OneDrive/Documents/gitProj/space-apps-hack-ionosphere-front-end/src/iss_data/"+filename
    cdf = pycdf.CDF(litStr)
    print(trackerIndex)
    trackerIndex+=1

    for i in range(len(cdf["Altitude"])):
        altitude.append(cdf["Altitude"][i]);
        latitude.append(cdf["Latitude"][i]);
        longitude.append(cdf["Longitude"][i]);
        time.append(cdf["Epoch"][i]);
        electronDensity.append(cdf["N_i"][i]);

    import json

    dataDict = {
        "altitude": altitude,
        "latitude": latitude,
        "longitude": longitude,
        "time": time,
        "electronDensity": electronDensity
    }
print("writing json file");
jsonObj = json.dumps(dataDict, indent = 4, default=str)

with open("dat.json", "w") as outfile:
    outfile.write(jsonObj)