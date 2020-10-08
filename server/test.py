import requests

BASE = "http://127.0.0.1:5000/"


response = requests.get(BASE + "artworks/2")
print(response)

response = requests.put(BASE + "artworks", {"name": "Art 2", "type": "Picture", "creator": "Johnny"})
print(response.json())
artwork_id = response.json()["_id"]

response = requests.get(BASE + "artworks/{0}".format(artwork_id))
print(response)

response = requests.delete(BASE + "artworks/{0}".format(artwork_id))
print(response)