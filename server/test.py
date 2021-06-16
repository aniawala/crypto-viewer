import requests
import json

api_url = "http://localhost:3001/api"

res = requests.get(api_url+"/cryptocurrencies").json()

# res = requests.get(api_url+"/cryptocurrency/2010/info").json()

print(json.dumps(res, indent=4, sort_keys=True))