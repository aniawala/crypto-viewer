import aiohttp
import os
from sanic import Sanic, Blueprint
from sanic.response import json
from dotenv import load_dotenv
from src.api.requests import *
from src.helpers import *

load_dotenv()

app = Sanic("App")
api = Blueprint("api", url_prefix="/api")

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

@api.get('/cryptocurrencies')
async def get_cryptocurrencies(request):
    async with aiohttp.ClientSession(headers=REQUEST_HEADERS) as session:
        params = parse_query_params(request.query_args)
        latest_listings = await get_latest_listings(session, params)
        cryptocurrencies = format_data(latest_listings)

        ids = get_ids(cryptocurrencies)
        cryptocurrencies_info = await get_cryptocurrencies_info(session, ids)

        for cryptocurrency in cryptocurrencies["data"]:
            info = extract_required_info(
                cryptocurrencies_info["data"][str(cryptocurrency["id"])])
            cryptocurrency.update(info)

        return json(cryptocurrencies, headers=RESPONSE_HEADERS)


app.blueprint(api)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3001)
