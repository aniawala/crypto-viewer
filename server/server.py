import aiohttp
import os
from sanic import Sanic, Blueprint
from sanic.response import json
from dotenv import load_dotenv

load_dotenv()

app = Sanic("App")
api = Blueprint("api", url_prefix="/api")

API_BASE_URL = os.getenv(
    'API_BASE_URL', "https://pro-api.coinmarketcap.com/v1/cryptocurrency")

API_KEY = os.getenv("API_KEY")

if not API_KEY:
    raise RuntimeError("Env variable API_KEY is required")

REQUEST_HEADERS = {
    'Accepts': 'application/json',
    'X-CMC_PRO_API_KEY': API_KEY,
}

RESPONSE_HEADERS = {
    'Access-Control-Allow-Origin': '*'
}


def extract_required_data(data):
    return {
        "id": data["id"],
        "name": data["name"],
        "symbol": data["symbol"],
        "price": data["quote"]["USD"]["price"],
        "marketCap": data["quote"]["USD"]["market_cap"],
        "volume": data["quote"]["USD"]["volume_24h"]
    }


def extract_required_info(info):
    return {
        "logo": info["logo"],
        "website": info["urls"]["website"][0]
    }


def format_data(payload):
    return {
        "data": [extract_required_data(data) for data in payload["data"]]
    }


def get_ids(cryptocurrencies):
    ids = ""
    counter = 0
    for cryptocurrency in cryptocurrencies["data"]:
        counter += 1
        ids += str(cryptocurrency["id"])
        if counter != len(cryptocurrencies["data"]):
            ids += ","
    return ids


async def get_latest_listings(session):
    url = API_BASE_URL + '/listings/latest'
    async with session.get(url) as response:
        payload = await response.json()
        return payload


async def get_cryptocurrencies_info(session, ids):
    url = API_BASE_URL + '/info'
    params = {"id": ids}
    async with session.get(url, params=params) as response:
        payload = await response.json()
        return payload


@api.get('/cryptocurrencies')
async def get_cryptocurrencies(request):
    async with aiohttp.ClientSession(headers=REQUEST_HEADERS) as session:
        latest_listings = await get_latest_listings(session)
        cryptocurrencies = format_data(latest_listings)

        ids = get_ids(cryptocurrencies)
        cryptocurrencies_info = await get_cryptocurrencies_info(session, ids)
        
        for cryptocurrency in cryptocurrencies["data"]:
            info = extract_required_info(cryptocurrencies_info["data"][str(cryptocurrency["id"])])
            cryptocurrency.update(info)
        
        return json(cryptocurrencies, headers=RESPONSE_HEADERS)


app.blueprint(api)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001)
