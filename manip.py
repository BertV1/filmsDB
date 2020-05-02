#!/usr/bin/env python
import numpy as np
from PIL import Image
import requests
import json

def calc_RGBavg(url):
    im = Image.open(requests.get(url, stream=True).raw)
    w,h = im.size
    pixel_values = np.array(list(im.getdata())).reshape((w,h,-1))
    return [int(round(np.mean(pixel_values[:,:,0]))),int(round(np.mean(pixel_values[:,:,1]))),int(round(np.mean(pixel_values[:,:,2])))]

base_URL = "https://image.tmdb.org/t/p/w370_and_h556_bestv2"
with open('readthispls.txt') as json_file:
    data = json.load(json_file)
    for movie in data:
        if data[movie]['poster_path'] == None:
            print("movie "+movie+" has no IMG, setting RGB to white.")
            data[movie]['RGB_avg'] = [255,255,255]
        else:
            data[movie]['RGB_avg'] = calc_RGBavg(base_URL+data[movie]['poster_path'])

with open('jsonFilmListdataCollection_with_RGB', 'w') as outfile:
    json.dump(data, outfile)
