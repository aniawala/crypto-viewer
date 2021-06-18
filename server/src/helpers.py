def extract_required_data(data):
    return {
        "id": data["id"],
        "name": data["name"],
        "symbol": data["symbol"],
        "price": data["quote"]["USD"]["price"],
        "market_cap": data["quote"]["USD"]["market_cap"],
        "volume_24h": data["quote"]["USD"]["volume_24h"]
    }


def extract_required_info(info):
    website = info["urls"]["website"][0] if info["urls"]["website"] else ""
    return {
        "logo": info["logo"],
        "website": website
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


def parse_query_params(query_params):
    params = {}
    for key, value in query_params:
        params[key] = value
    return params

