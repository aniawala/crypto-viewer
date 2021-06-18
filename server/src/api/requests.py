import os
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL", "https://pro-api.coinmarketcap.com/v1/cryptocurrency")

async def get_latest_listings(session, params):
    url = API_BASE_URL + f'/listings/latest'
    async with session.get(url, params=params) as response:
        payload = await response.json()
        return payload


async def get_cryptocurrencies_info(session, ids):
    url = API_BASE_URL + '/info'
    params = {"id": ids}
    async with session.get(url, params=params) as response:
        payload = await response.json()
        return payload
